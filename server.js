const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId, CURSOR_FLAGS } = require('mongodb');
const sendGrid = require('sendgrid');
const sgMail = require('@sendgrid/mail')
const PORT = process.env.PORT || 5000;
const senderEmail = 'recipes.code.verify@gmail.com';

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const userCol = "users";
const recipeCol = "recipes";
const countryCol = "countries";

// Setting up Express and cors.
const app = express();
app.use(cors());
app.use(bodyParser.json());

const baseURL = "http://localhost:5000"


// Connecting to our MongoDB database.
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:dumEPassword@cluster0.os1jz.mongodb.net/LargeProjDB?retryWrites=true&w=majority"
const client = new MongoClient(url);
client.connect();

// We send empty errors a lot.
let emptyErr = { error: "" };

// Retrieving the SendGrid API key from the environment variable.
// const apiKey = process.env.SENDGRID_API_KEY;

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
app.post('/api/login', async (req, res, next) =>
{
    // Input = username, password
    const { username, password } = req.body;

    // Connecting to Mongo and searching the Users collection for the given input.
    const db = client.db();
    const results = db.collection(userCol).find( { username: username, password: password } );

    // We didn't find the user, so we throw an error.
    if (!(await results.hasNext()))
    {
        let ret = { error: 'User not found.' };
        res.status(500).json(ret);
        return;
    }

    // Get user info, remove password from json object
    let result = await results.next();
    delete result.password;

    res.json(result);
});

// Tested: yes
// Register user endpoint
app.post('/api/register', async (req, res, next) =>
{
    const { username, password, email } = req.body;
    const db = client.db();
    let userCode = createAuthCode();

    const usernameTaken = db.collection(userCol).find( { username: username } );

    // If there's a result the username is taken.
    if (await usernameTaken.hasNext())
    {
        res.status(500).json( { error: "Username taken." } );
        return;
    }

    let verifyLink = "hostingLink/api/verify/usercode/username".replace("hostingLink", baseURL).replace("usercode", userCode).replace("username", username);

    let htmlToSend = `<html>
                         <div style="margin-top:50px;text-align: center; font-family: Arial;" container>
                             <h1> Welcome! </h1>
                             <p style="margin-bottom:30px;"> Verify your account by clicking the following link:</p>
                             <a clicktracking="off" href="verifyLink" style="background:blue;color:white;padding:10px;margin:200px;border-radius:5px;text-decoration:none;">VERIFY</a>
                         </div>
                         <div style="margin-top:50px;text-align: center; font-family: Arial; font-size: 13px">
                             <p> Alternatively, paste this link into your browser.  </p>
                             <a>verifyLink</a>
                         </div>
                      </html>`.replaceAll("verifyLink", verifyLink);

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
        password: password,             // TODO: Hash this
        email: email,
        profilePic: "",
        favorites: [],
        created: [],
        likes: [],
        verified: "no",
        auth: userCode
    };

    db.collection(userCol).insertOne(newUser);
    res.json(emptyErr);
});

// TODO: test this endpoint
// VERIFY ENDPOINT
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

    res.json(emptyErr);
});

// Tested: yes
// Create recipe endpoint
app.post('/api/createRecipe', async (req, res, next) =>
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
app.post('/api/deleteRecipe', async (req, res, next) =>
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

// TOOD: Test this endpoint
// EDIT RECIPE ENDPOINT
app.post('/api/editRecipe', async (req, res, next) =>
{
    // Input = recipe name, description, picture link, text, and Recipe ID.
    const { name, description, picLink, text, recipeID } = req.body;
    const db = client.db();

    // Update recipe with new information.
    db.collection(recipeCol).updateOne(
        { _id: recipeID },
		{
			$set: { name:name, desc:description, picURL:picLink, recipeText:text }
		}
    );

    // Okay status
    res.json( emptyErr );
});

// Tested: yes
// Get favorited recipes of user
app.post('/api/getFavorites', async (req, res, next) =>
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
app.post('/api/getLikes', async (req, res, next) =>
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
app.post('/api/addFavorite', async (req, res, next) =>
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

        res.status(500).json( { error: err } );
        return;
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
app.post('/api/deleteFavorite', async (req, res, next) =>
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

        res.status(500).json( { error: err } );
        return;
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
app.post('/api/addLike', async (req, res, next) =>
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

        res.status(500).json( { error: err } );
        return;
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
app.post('/api/deleteLike', async (req, res, next) =>
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

        res.status(500).json( { error: err } );
        return;
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

app.post('/api/getcountryrecipes', async (req, res, next) =>
{
	// grabbing db and storing the name of the country we receive
	const db = client.db();
	const country = req.body.name;

	// query the db and store in an array
	const temp = db.collection("countries").find({name:country});
    const result = await temp.toArray()

	// we didn't find any results for this country....is this even gonna be possible?
	if (result.length < 1)
	{
		// return an error and 404 status
		let ret = { error: 'Country not found' };
		res.status(404).json(ret);
	}
	else
	{
		// We found the country! Store its recipes and return that and 200 status
		let ret = result[0].recipes;
        console.log(ret)
		res.status(200).json(JSON.stringify(ret));
	}
});

app.post('/api/searchrecipe', async (req, res, next) =>
{
	let searchTerm = req.body.searchTerm;
	const db = client.db();
    ret = []
	const c = db.collection("recipes").find({name:searchTerm});
    while (await c.hasNext())
    {
        const doc = await c.next();
        ret.push(doc)
        console.log(JSON.stringify(doc));
    }

	res.status(200).json(ret)
});

app.post('/api/updateuser', async (req, res, next) =>
{
	const { id, password, profilePic, email } = req.body;
	const db = client.db();

    // Check to see if this user even exists in the database, just in case
    const check = await db.collection("users")
                    .countDocuments( { _id: ObjectId(id) }, { limit: 1 });
    if (!check)
    {
        // this user doesn't exist
        res.status(404).json({error: "User does not exist"})
        return;
    }
    else
    {
        db.collection("users").updateOne(
            {_id:ObjectId(id) },
            {
                $set:
                {
                    password:password, profilePic:profilePic, email:email
                }
            }
        );
        res.status(200).json({ error: 'all good!' })
    }
})

app.post('/api/viewrecipe', async (req, res, next) =>
{
    const id = req.body.id;
    const db = client.db();

    const check = await db.collection("recipes")
                    .countDocuments( { _id: ObjectId(id) }, { limit: 1 } )
    if (!check)
    {
        res.status(404).json({error: 'Recipe not found'})
    }
    else
    {
        let c = await db.collection("recipes").find( {_id: ObjectId(id)} ).toArray()
        console.log(JSON.stringify(c))

        res.status(200).json(JSON.stringify(c))
    }
});

// Used when generating the code a user needs to enter to verify their account.
function createAuthCode() {
    return Math.floor(Math.random() * (99999 - 11111) + 11111);
}

app.listen(5000); // Start Node + Express server on port 5000.
