const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const sendGrid = require('@sendgrid/mail');
const PORT = process.env.PORT || 5000;

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
    const results = await db.collection('users').find({username:username,password:password}).toArray();

    // If the length of the query is greater than one, we've found the user.
    if( results.length > 0 )
    {
        let id = results[0]._id;
        let fn = results[0].firstName;
        let ln = results[0].lastName;
        let pic = results[0].profilePic;
        let favs = results[0].favorites;

        let ret = { id:id, firstName:fn, lastName:ln, profilePic:pic, favorites:favs, error:''};
        res.status(200).json(ret);
    }
    else
    {
        // We didn't find the user, so we throw an error.
        let ret = { error:'User not found.' };
        res.status(404).json(ret);
    }
});

app.post('/api/register', async (req, res, next) =>
{
    // Input  = username, password
    const { username, password, firstName, lastName, profilePic, email } = req.body;

    const db = client.db();
    const results = await db.collection('users').find({username:username}).toArray();

    // First we check to see if the username is already being used.
    if( results.length > 0 )
    {
        // Then return an error if it is.
        var ret = { error:'User already exists.' };
        res.status(400).json(ret);
    }
    else
    {
        sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

        // Create authentication code for user.
        let authCode = createAuthCode();

        const msg = {
            to: email, // Change to your recipient
            from: 'test@example.com', // Change to your verified sender
            subject: 'Verify your email',
            text: 'Copy and paste this authentication code to verify your email: ' + authCode + '.',
        }

        // Send the authentication code in an email.
        sendGrid.send(msg)
        .then((response) => {
            // If the email successfully sent, return the user info for registering.
            let ret = {
                username:username, password:password, firstName:firstName,
                lastName:lastName, profilePic:profilePic, email:email, authCode:authCode, error:''
            };
            res.status(200).json(ret);
        })
        .catch((error) => {
            let ret = { error:'Error occured while sending email.' };
            res.status(400).json(ret);
        })
    }
});

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

    db.collection("users").insertOne(user, function(err, res) {
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
    db.collection("recipes").insertOne(recipe, function(err, res) {
        if (err)
        {
            let ret = { error:'Error while creating recipe.' };
            res.status(400).json(ret);
        }
        else
        {
			// After successfully creating the recipe we add it to the user's created array.
			db.collection("users").updateOne(
				{ _id: id },
				{ $push: { created: recipe._id }}
			)

			const results = await db.collection('countries').find({name:country}).toArray();

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
    db.collection("recipes").deleteOne({ _id:recipeID });

	// Removing recipe from the country's list of recipes.
	db.collection("countries").updateOne(
		{ name:country },
		{
			$pull: { recipes:recipeID }
		}
	);

	// Removing the recipe from both the favorited and liked arrays for each user
	// VERY INEFFICIENT GOTTA FIND A BETTER WAY
	db.collection("users").updateMany(
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

	// grab the db so we can access it
	const db = client.db();

	// store the recipe id that we receive
	const recipeId = req.body;

	// search the recipes collection and find all matching recipe ids
	let results = db.collection("recipes").find({ _id:recipeId }).toArray();

	// This recipe id does not exist in our database
	if (results.length != 1)
	{
		// return an error and 404 status
		let ret = { error: 'Recipe not found'}
		res.status(404).json(ret)
	}
	else
	{
		// return the json object of the recipe with this ID
		res.status(200).json(results[0]);
	}

    // Update recipe with new information.
    db.collection("recipes").updateOne(
        { _id: recipeID },
		{
			$set: { name:name, desc:description, picURL:picLink, recipeText:text }
		}
    );

    // Okay status
    res.status(200);
});

// ADD FAVORITE ENDPOINT
app.post('/api/addFavorite/', async (req, res, next) =>
{
    // Input  = User ID, Recipe ID
    const { userID, recipeID } = req.body;

    const db = client.db();

    // Add recipe to favorites array of user
    db.users.updateOne(
        { _id: userID },
        { $push: { favorites: recipeID } }
    );

    // Update favorite count for recipe
    db.recipes.updateOne(
        { _id: recipeID },
        { $inc: { numFavorites: 1 } }
    );

    // Okay status
    res.status(200);
});

// DELETE FAVORITE ENDPOINT
app.post('/api/deleteFavorite/', async (req, res, next) =>
{
    const { userID, recipeID } = req.body;
    const db = client.db();

    // Remove recipe from favorites array of user
    db.users.updateOne(
        { _id: userID },
        { $pull: { favorites: recipeID } }
    );

    // Update favorite count for recipe
    db.recipes.updateOne(
        { _id: recipeID },
        { $inc: { numFavorites: -1 } }
    );

    // Okay status
    res.status(200);
});

// ADD LIKE ENDPOINT
app.post('/api/addLike/', async (req, res, next) =>
{
    const { userID, recipeID } = req.body;
    const db = client.db();

    // Update like count for recipe
    db.recipes.updateOne(
        { _id: recipeID },
        { $inc: { likes: 1 } }
    );

    // Add recipe to likes array of user
    db.recipes.updateOne(
        { _id: userID },
        { $push: { likes: recipeID } }
    );

    // Okay status
    res.status(200);
});

// DELETE LIKE ENDPOINT
app.post('/api/deleteLike/', async (req, res, next) =>
{
    const { userID, recipeID } = req.body;
    const db = client.db();

    // Update like count for recipe
    db.recipes.updateOne(
        { _id: recipeID },
        { $inc: { likes: -1 } }
    );

    // Remove recipe from likes array of user
    db.users.updateOne(
        { _id: userID },
        { $pull: { likes: recipeID } }
    );

    // Okay status
    res.status(200);
});

app.post('/api/test', async (req, res, next) =>
{
    const str = req.body;
    res.status(200).json(str);
});

// Used when generating the code a user needs to enter to verify their account.
function createAuthCode() {
    return Math.floor(Math.random() * (99999 - 11111) + 11111);
}

app.listen(5000); // Start Node + Express server on port 5000.
