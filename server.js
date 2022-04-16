const { Console } = require('console');
const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    path = require('path'),
    sendGrid = require('sendgrid'),
    sgMail = require('@sendgrid/mail'),
    auth = require("./middleware/auth"),
    jwt = require("jsonwebtoken"),
  { ObjectId, CURSOR_FLAGS } = require('mongodb');

const bcrypt = require('bcryptjs'),
    saltRounds = 10;

const PORT = process.env.PORT || 5000;

const emailPlatform = {
    "mobile": `<html>
              <div style="margin-top:50px;text-align: center; font-family: Arial;" container>
                <h1> Welcome! </h1>
                <p style="margin-bottom:30px;"> Here's your verification code!</p>
                <a clicktracking="off" href="verifyLink" style="background:blue;color:white;padding:10px;margin:200px;border-radius:5px;text-decoration:none;">usercode</a>
              </div>
            </html>`,
    "web": `<html>
            <div style="margin-top:50px;text-align: center; font-family: Arial;" container>
              <h1> Welcome! </h1>
              <p style="margin-bottom:30px;"> Verify your account by clicking the following link:</p>
              <a clicktracking="off" href="verifyLink" style="background:blue;color:white;padding:10px;margin:200px;border-radius:5px;text-decoration:none;">VERIFY</a>
            </div>
            <div style="margin-top:50px;text-align: center; font-family: Arial; font-size: 13px">
              <p> Alternatively, paste this link into your browser.  </p>
              <a>verifyLink</a>
            </div>
          </html>`
};

const successPage = `<html>
                     <p style="background-color:red;">Some text</p>
                     </html>`;

const senderEmail = process.env.SENDER_EMAIL;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Setting up Express and cors.
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get port
app.set('port', (process.env.PORT || 5000));

// Base URL 
// TODO: make this get heroku or localhost based on prod/local
const baseURL = "http://localhost:5000";

// Connecting to the MongoDB database
const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(process.env.MONGODB_URI);
client.connect();

// Collection names
const userCol = "users",
    recipeCol = "recipes",
    countryCol = "countries";

// We send empty errors a lot.
let emptyErr = { error: "" };

function hash(str)
{
    return bcrypt.hashSync(str, bcrypt.genSaltSync(saltRounds));
}

app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

// Tested: yes
// Login user endpoint
app.post('/api/login', async (req, res) =>
{
    // Input = username, password
    const { username, password } = req.body;

    // Connecting to Mongo and searching the Users collection for the given input.
    const db = client.db();
    const user = await db.collection(userCol).findOne( { username: username } );

    // User not found
    if (!user)
        return res.status(500).json( { error: 'User not found.' } );

    // Compare password
    if (!bcrypt.compareSync(password, user.password))
        return res.status(500).json( { error: 'Passwords do not match.' } );

    // Refresh token
    const token = jwt.sign(
        { userid: user._id, username },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );

    user.token = token;

    // Remove password from json before sending back
    delete user.password;

    res.json(user);
});

// Tested: yes
// Register user endpoint
app.post('/api/register/:platform', async (req, res) => 
{
    const { username, password, email } = req.body;
    const db = client.db();
    let userCode = createAuthCode();
    let platform = req.params.platform;

    const usernameTaken = await db.collection(userCol).findOne( { username: username } );

    // If there's a result the username is taken.
    if (usernameTaken != null)
        return res.status(500).json( { error: "Username taken." } );
    
    let verifyLink = "hostingLink/api/verify/usercode/username".replace("hostingLink", baseURL).replace("usercode", userCode).replace("username", username);

    // Set up web email content
    let htmlToSend = emailPlatform["web"].replaceAll("verifyLink", verifyLink);

    // Set up mobile email content
    if (platform === "mobile")
        htmlToSend = emailPlatform["mobile"].replaceAll("verifyLink", verifyLink).replaceAll("usercode", userCode);

    // Construct email
    const msg = {
        to: email,
        from: senderEmail,
        subject: 'Verify Your Account',
        text: ' ',   // THIS CANNOT BE THE EMPTY STRING. But it can be a space.
        html: htmlToSend
    };

    // Send auth code to given email 
    sgMail.send(msg).catch((error) => { console.error(error); });

    // Add user to users collection
    let newUser = {
        username: username,
        password: hash(password),
        email: email,
        profilePic: "",
        favorites: [],
        created: [],
        likes: [],
        verified: "no",
        auth: userCode
    };

    // Add token to user
    const token = jwt.sign(
        { userid: newUser._id, username },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );

    newUser.token = token;
    
    db.collection(userCol).insertOne(newUser);
    res.json(emptyErr);
});

// Tested: yes
// Given an authcode and username, sets the verified field in the user document to "yes"
// If authcode matches username in the users collection.
app.get('/api/verify/:auth/:username', async (req, res) =>
{
    // Check the database for a username that has a matching code.
    let [code, username] = [req.params.auth, req.params.username];

    // The code is stored as integer in the collection
    code = parseInt(code);

    const db = client.db();

    // Check collection for a document with username and auth matching
    const found = await db.collection(userCol)
                          .countDocuments( { username: username, auth: code },
                                           { limit: 1 } );

    // If document found redirect user to landing page and mark the document as verified
    if (found)
        db.collection(userCol).updateOne( { username: username, auth: code },
                                          { $set: { verified: "yes" } } );
    else 
        res.status(500).json( { error: "ID/User information invalid." } );

    res.send(successPage);
});

app.get('/api/getResetCode', auth, async (req, res) =>
{
    const { email } = req.body;
    const db = client.db();

    // Check that email is valid
    const valid = await db.collection(userCol).findOne( { email: email } );

    if (!valid) 
        return res.status(500).json( { error: "Invalid email address." } );

    // Construct email
    const htmlToSend = `<html>
                            <div style="margin-top:50px;text-align: center; font-family: Arial;" container>
                                <h1> Hello! </h1>
                                <p style="margin-bottom:30px;"> Reset your password by entering this code:</p>
                                <p style="background:blue;color:white;padding:10px;margin:200px;border-radius:5px;text-decoration:none;">CODE</p>
                            </div>
                        </html>`;

    const msg = {
        to: email,
        from: senderEmail,
        subject: 'Password Reset Request',
        text: ' ',
        html: htmlToSend
    };

    // Send email
    sgMail.send(msg).catch((error) => { console.error(error); });
});

// Tested: yes
// Create recipe endpoint
app.post('/api/createRecipe', auth, async (req, res) =>
{
    const { name, desc, pic, country,
            text, creator, coordinates } = req.body;

    const db = client.db();

    let recipe = {
        name: name,
        desc: desc,
        pic: pic,
        country: country,
        text: text,
        creator: ObjectId(creator),
        coordinates: coordinates,
        likes: 0,
        favorites: 0
    };

    // Check if the country is in the database
    let countryExists = await db.collection(countryCol)
                                .countDocuments( { name: country }, 
                                                 { limit: 1 });

    // Put country in database if it doesn't exist
    if (!countryExists)
        await db.collection(countryCol).insertOne( { name: country, recipes: [] } );

    // Add recipe to database and get the _id
    let recipeID = await db.collection(recipeCol).insertOne(recipe);
    recipeID = recipeID.insertedId;

    // Add recipe to country.recipes
    db.collection(countryCol).updateOne(
        { name: country },
        { $push: { recipes: recipeID}}
    );

    res.json( emptyErr );
});

// Tested: yes
// Delete recipe endpoint
app.post('/api/deleteRecipe', auth, async (req, res) =>
{
    // Input = recipeID
    const { recipeID } = req.body;
    const db = client.db();

    // Find the recipe from the recipes collection
    const recipe = await db.collection(recipeCol).findOne( { _id: ObjectId(recipeID) } );
    const country = recipe.country;

    // Delete recipe from recipes collection.
    db.collection(recipeCol).deleteOne( { _id: ObjectId(recipeID) } );

    // Removing recipe from the country's list of recipes.
    db.collection(countryCol).updateOne(
        { name: country },
        { $pull: { recipes: ObjectId(recipeID) } }
    );

    // Okay status
    res.json( emptyErr );
});

// Tested: yes
// EDIT RECIPE ENDPOINT
app.post('/api/editRecipe', auth, async (req, res) =>
{
    // Input = name, description, picture link, text, and Recipe ID (string).
    const { name, desc, pic, text, recipeID } = req.body;
    const db = client.db();

    // Update recipe with new information.
    await db.collection(recipeCol).updateOne(
        { _id: ObjectId(recipeID) },
        {
            $set: { name: name, desc: desc, picURL: pic, recipeText: text }
        }
    );

    // Okay status
    res.json( emptyErr );
});

// Tested: yes
// Get favorited recipes of user
app.get('/api/getFavorites', auth, async (req, res) =>
{
    const { userID } = req.body;
    const db = client.db();

    // Get documents that match UserID
    const c = db.collection(userCol).find( { _id: ObjectId(userID) } );

    // If db query results in empty cursor throw error
    if (!await c.hasNext())
        res.status(500).json( { error: "Invalid UserID" } );

    // Get users favorites and return
    const user = await c.next();
    const favs = user.favorites;

    // Iterate backwards so removing elements doesn't mess with indexing
    for (let i = favs.length; i >= 0; i--)
    {
        // If the recipe isn't in the database
        if (await atLeastOne(recipeCol, favs[i]) == 0)
        {
            // Remove recipe from user favorites list from database.
            db.collection(userCol).updateOne(
                  { _id: ObjectId(userID) },
                  { $pull: { favorites: ObjectId(favs[i]) } }
            )
            // Remove recipe from favs
            favs.splice(i, 1);
        }
    }

    res.json(favs);
});

// Tested: yes
// Get liked recipes of user
app.get('/api/getLikes', auth, async (req, res) =>
{
    const { userID } = req.body;
    const db = client.db();

    // Get documents that match UserID
    const c = db.collection(userCol).find( { _id: ObjectId(userID) } );

    // If db query results in empty cursor throw error
    if (!await c.hasNext())
        return res.status(500).json( { error: "Invalid UserID" } );

    // Get users favorites and return
    const user = await c.next();
    const likes = user.likes;

    // Iterate backwards so removing elements doesn't mess with indexing
    for (let i = likes.length; i >= 0; i--)
    {
        // If the recipe isn't in the database
        if (await atLeastOne(recipeCol, likes[i]) == 0)
        {
            // Remove recipe from user likes list from database.
            db.collection(userCol).updateOne(
                  { _id: ObjectId(userID) },
                  { $pull: { likes: ObjectId(likes[i]) } }
            )
            // Remove recipe from likes
            likes.splice(i, 1);
        }
    }

    res.json(likes);
});

// Tested: yes
// Add favorite endpoint
app.post('/api/addFavorite', auth, async (req, res) =>
{
    // Input  = User ID, Recipe ID
    const { userID, recipeID } = req.body;
    const db = client.db();

    // Check that user and recipe exists
    const userExists = await atLeastOne(userCol, userID);
    const recipeExists = await atLeastOne(recipeCol, recipeID);

    // If either user or recipe doesn't exist return error
    if (!userExists || !recipeExists)
    {
        let errors = [];

        if (!userExists) errors.push("userID");
        if (!recipeExists) errors.push("recipeID");
        let err = "Invalid " + errors.join(', ');

        return res.status(500).json( { error: err } );
    }

    // Add recipe to favorites array of user
    db.collection(userCol).updateOne(
        { _id: ObjectId(userID) },
        { $push: { favorites: ObjectId(recipeID) } }
    );

    // Update favorite count for recipe
    db.collection(recipeCol).updateOne(
        { _id: ObjectId(recipeID) },
        { $inc: { favorites: 1 } }
    );

    // Okay status
    res.json( emptyErr );
});

// Tested: yes
// Delete favorite endpoint
app.post('/api/deleteFavorite/', auth, async (req, res, next) =>
{
    const { userID, recipeID } = req.body;
    const db = client.db();

    // Check that user and recipe exists
    const userExists = await atLeastOne(userCol, userID);
    const recipeExists = await atLeastOne(recipeCol, recipeID);

    // If either user or recipe doesn't exist return error
    if (!userExists || !recipeExists)
    {
        let errors = [];

        if (!userExists) errors.push("userID");
        if (!recipeExists) errors.push("recipeID");
        let err = "Invalid " + errors.join(', ');

        return res.status(500).json( { error: err } );
    }

    // Remove recipe from favorites array of user
    db.collection(userCol).updateOne(
        { _id: ObjectId(userID) },
        { $pull: { favorites: ObjectId(recipeID) } }
    );

    // Update favorite count for recipe
    db.collection(recipeCol).updateOne(
        { _id: ObjectId(recipeID) },
        { $inc: { numFavorites: -1 } }
    );

    // Okay status
    res.json( emptyErr );
});

// Tested: yes
// Add like endpoint
app.post('/api/addLike/', auth, async (req, res, next) =>
{
    const { userID, recipeID } = req.body;
    const db = client.db();

    // Check that user and recipe exists
    const userExists = await atLeastOne(userCol, userID);
    const recipeExists = await atLeastOne(recipeCol, recipeID);

    // If either user or recipe doesn't exist return error
    if (!userExists || !recipeExists)
    {
        let errors = [];

        if (!userExists) errors.push("userID");
        if (!recipeExists) errors.push("recipeID");
        let err = "Invalid " + errors.join(', ');

        return res.status(500).json( { error: err } );
    }

    // Update like count for recipe
    db.collection(recipeCol).updateOne(
        { _id: ObjectId(recipeID) },
        { $inc: { likes: 1 } }
    );

    // Add recipe to likes array of user
    db.collection(userCol).updateOne(
        { _id: ObjectId(userID) },
        { $push: { likes: ObjectId(recipeID) } }
    );

    // Okay status
    res.json( emptyErr );
});

// Tested: yes
// Delete like endpoint 
app.post('/api/deleteLike/', auth, async (req, res, next) =>
{
    const { userID, recipeID } = req.body;
    const db = client.db();
    
    // Check that user and recipe exists
    const userExists = await atLeastOne(userCol, userID);
    const recipeExists = await atLeastOne(recipeCol, recipeID);

    // If either user or recipe doesn't exist return error
    if (!userExists || !recipeExists)
    {
        let errors = [];

        if (!userExists) errors.push("userID");
        if (!recipeExists) errors.push("recipeID");
        let err = "Invalid " + errors.join(', ');

        return res.status(500).json( { error: err } );
    }

    // Update like count for recipe
    db.collection(recipeCol).updateOne(
        { _id: ObjectId(recipeID) },
        { $inc: { likes: -1 } }
    );

    // Remove recipe from likes array of user
    db.collection(userCol).updateOne(
        { _id: ObjectId(userID) },
        { $pull: { likes: ObjectId(recipeID) } }
    );

    // Okay status
    res.json( emptyErr );
});

// Tested: yes
// Get recipes of a given country name
app.post('/api/getCountryRecipes', auth, async (req, res) => 
{
    const db = client.db();
    const country = req.body.name;

    // Query the db and store in an array
    const found = await db.collection(countryCol).findOne( { name: country } );
    
    if (found)
        res.json(found.recipes);
    else
        res.status(404).json( { error: "Country not found" } );
});

// Tested: yes
// Partial search for recipes by name given a search term
app.post('/api/searchRecipe', auth, async (req, res) => 
{
    let searchTerm = req.body.searchTerm;
    const db = client.db();

    // Regex to allow matches where the term is a substring of any result
    let term = ".*" + searchTerm + ".*";
    // "i" for insensitive search
    const recipesCursor = await db.collection(recipeCol).find( { name:
        { $regex: term, $options: "i" }
    } );

    const ret = await recipesCursor.toArray();

    res.json(ret);
});

// Tested: yes
// Updates a given user (by id) with new information
app.post('/api/updateUser', auth, async (req, res) => 
{
    const { id, password, profilePic, email } = req.body;
    const db = client.db();

    // Check if user exists in the database
    if (await !atLeastOne(userCol, id))
        return res.status(404).json( { error: "User does not exist." } );

    db.collection(userCol).updateOne(
        { _id: ObjectId(id) },
        { $set: { 
                password: hash(password),
                profilePic: profilePic,
                email: email 
            } }
    );

    res.json( emptyErr );
});

// Get a recipe document given an id string
app.post('/api/viewRecipe', auth, async (req, res) => 
{
    const id = req.body.id;
    const db = client.db();

    // If the recipe doesn't exist return bad status
    if (!(await atLeastOne(recipeCol, id)))
        return res.status(404).json( { error: "Recipe not found" } )

    // Find the document and return
    let recipeDoc = await db.collection(recipeCol).findOne( { _id: ObjectId(id) } );
    res.json(recipeDoc);
});

// Used when generating the code a user needs to enter to verify their account.
// Returns a 5-digit code as an int 
function createAuthCode() {
    return Math.floor(Math.random() * (99999 - 11111) + 11111);
}

// Given a collection name, object ID, returns 1 if the object is in the collection.
async function atLeastOne(col, id)
{
    const db = client.db();

    // 0 or 1 depending on if at least one document exists with the given id.
    const exists = await db.collection(col)
                           .countDocuments( { _id: ObjectId(id) },
                                            { limit: 1 } );
    return (exists == 1);
}

app.listen(PORT, () =>
{
    console.log('Server is listening on port ' + PORT);
});

if (process.env.NODE_ENV === 'production')
{
    app.use(express.static('web-frontend/build'));
    app.get('*', (req, res) =>
    {
        res.sendFile(path.resolve(__dirname, 'web-frontend', 'build', 'index.html'));
    });
}