const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId, CURSOR_FLAGS } = require('mongodb');
const sendGrid = require('sendgrid');
const PORT = process.env.PORT || 5000;

const userCol= "users";
const recipeCol = "recipes";
const countryCol = "countries";

// Setting up Express and cors.
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connecting to our MongoDB database.
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:dumEPassword@cluster0.os1jz.mongodb.net/LargeProjDB?retryWrites=true&w=majority"
const client = new MongoClient(url);
client.connect();

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

// LOGIN ENDPOINT
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

    res.status(200).json(result);
});

// REGISTER ENDPOINT
app.post('/api/register', async (req, res, next) => 
{
    const { username, password, email } = req.body;
    const db = client.db();

    const usernameTaken = db.collection(userCol).find( { username: username } );

    // If there's a result the username is taken.
    if (await usernameTaken.hasNext())
    {
        res.status(500).json( { error: "Username taken." } );
        return;
    }

    // Add user to users collection
    let newUser = {
        username: username,
        password: password,
        email: email,
        profilePic: "",
        favorites: [],
        created: [],
        likes: []
    };

    db.collection(userCol).insertOne(newUser);
    res.status(200).json( { error: "" } );
});


// TODO: fix
// app.post('/api/register', async (req, res, next) =>
// {
//     // Input  = username, password
//     const { username, password, firstName, lastName, profilePic, email } = req.body;

//     const db = client.db();
//     const results = db.collection('users').find({username:username}).toArray();

//     // First we check to see if the username is already being used.
//     if( results.length > 0 )
//     {
//         // Then return an error if it is.
//         var ret = { error:'User already exists.' };
//         res.status(400).json(ret);
//     }
//     else
//     {
//         sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

//         // Create authentication code for user.
//         let authCode = createAuthCode();

//         const msg = {
//             to: email, // Change to your recipient
//             from: 'test@example.com', // Change to your verified sender
//             subject: 'Verify your email',
//             text: 'Copy and paste this authentication code to verify your email: ' + authCode + '.'
//         }

//         // Send the authentication code in an email.
//         sendGrid.send(msg)
//         .then((response) => {
//             // If the email successfully sent, return the user info for registering.
//             let ret = {
//                 username:username, password:password, firstName:firstName,
//                 lastName:lastName, profilePic:profilePic, email:email, authCode:authCode, error:''
//             };
//             res.status(200).json(ret);
//         })
//         .catch((error) => {
//             let ret = { error:'Error occured while sending email.' };
//             res.status(400).json(ret);
//         })
//     }
// });

// VERIFY ENDPOINT
app.post('/api/verify', async (req, res, next) =>
{
    // Input  = username, password, firstName, lastName, profilePic, email.
    const { username, password, firstName, lastName, profilePic, email } = req.body;

    // Creating user object to insert into collection.
    var user = {
        username:username, password:password, firstName:firstName,
        lastName:lastName, profilePic:profilePic, email:email
    };

    const db = client.db();

    db.collection(userCol).insertOne(user, function(err, res) {
        if (err)
        {
            let ret = { error:'Error while registering user.' };
            res.status(400).json(ret);
        }
        else
        {
            let ret = { error:'' };
            res.status(200).json(ret);
        }
    });
});

// CREATE RECIPE ENDPOINT
app.post('/api/createRecipe', async (req, res, next) =>
{
    // Input  = recipe name, description, country, text, userID, coordinates, picLink
    const { name, description, country, text, id, coordinates, picLink } = req.body;

    // Creating user object to insert into collection.
     var recipe = {
        name:name, desc:description, picURL:picLink,
        country:country, recipeText:text, creator:id, coordinate: coordinates
    };

    const db = client.db();

	// Add recipe to collection
    db.collection(recipeCol).insertOne(recipe, function(err, res) {
        if (err)
        {
            let ret = { error:'Error while creating recipe.' };
            res.status(400).json(ret);
        }
        else
        {
			// After successfully creating the recipe we add it to the user's created array.
			db.collection(userCol).updateOne(
				{ _id: id },
				{ $push: { created: recipe._id }}
			)

			const results = db.collection('countries').find({name:country}).toArray();

			// If the country already exists we just append the recipe to the recipes array.
			if ( results.length > 0 )
			{
				db.collection("countries").updateOne(
			        { _id: results[0]._id },
			        { $push: { recipes: recipe._id } }
			    );
			}
			// If the country doesn't already exist, we add it with the recipe.
			else
			{
				var country = { name:country, recipes:[recipe._id] };

				db.collection("countries").insertOne(country);
			}

            let ret = { error:'' };
            res.status(200).json(ret);
        }
    });
});

// DELETE RECIPE ENDPOINT
app.post('/api/deleteRecipe', async (req, res, next) =>
{
    // Input = recipeID, country name
    const { recipeID, country } = req.body;

    const db = client.db();

    // Delete recipe from recipes collection.
    db.collection(recipeCol).deleteOne( { _id: ObjectId(recipeID) } );

	// Removing recipe from the country's list of recipes.
	db.collection("countries").updateOne(
		{ name: country },
		{ $pull: { recipes: ObjectId(recipeID) } }
	);

	// Removing the recipe from both the favorited and liked arrays for each user
	// VERY INEFFICIENT GOTTA FIND A BETTER WAY
	db.collection(userCol).updateMany(
		{ },
		{
			$pull: { favorites:recipeID, liked:recipeID }
		}
	);

    // Okay status
    res.status(200);
});

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
    res.status(200);
});

// GET FAVORITE ENDPOINT
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

    res.status(200).json(favs);
});

// ADD FAVORITE ENDPOINT
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

        if (!userExists)
            errors.push("userID");
        
        if (!recipeExists)
            errors.push("recipeID");

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
        { $inc: { numFavorites: 1 } }
    );

    // Okay status
    res.status(200).json( { error: "" } );
});

// DELETE FAVORITE ENDPOINT
app.post('/api/deleteFavorite/', async (req, res, next) =>
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

        if (!userExists)
            errors.push("userID");
        
        if (!recipeExists)
            errors.push("recipeID");

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
    res.status(200).json( { error: "" } );
});

// ADD LIKE ENDPOINT
app.post('/api/addLike/', async (req, res, next) =>
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

        if (!userExists)
            errors.push("userID");
        
        if (!recipeExists)
            errors.push("recipeID");

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
    res.status(200).json( { error: "" } );
});

// DELETE LIKE ENDPOINT
app.post('/api/deleteLike/', async (req, res, next) =>
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

        if (!userExists)
            errors.push("userID");
        
        if (!recipeExists)
            errors.push("recipeID");

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
    res.status(200).json( { error: "" } );
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

// Used when generating the code a user needs to enter to verify their account.
function createAuthCode() {
    return Math.floor(Math.random() * (99999 - 11111) + 11111);
}

app.listen(5000); // Start Node + Express server on port 5000.
