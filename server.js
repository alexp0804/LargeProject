const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sendGrid = require('@sendgrid/mail')

// Setting up Express and cors.
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connecting to our MongoDB database.
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://admin:dumEPassword@cluster0.os1jz.mongodb.net/LargeProjDB?retryWrites=true&w=majority';
const client = new MongoClient(url);
client.connect();

// Retrieving the SendGrid API key from the environment variable.
const apiKey = process.env.SENDGRID_API_KEY;

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

app.listen(5000); // Start Node + Express server on port 5000.

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

// Used when generating the code a user needs to enter to verify their account.
function createAuthCode() {
	return Math.floor(Math.random() * (99999 - 11111) + 11111);
}







// bruh
