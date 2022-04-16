const app = require('./app');
const request = require("supertest");

// Testing the login endpoint
describe("Testing Login", () => {
	test("Wrong username should return not found", async () => {
		await request(app).post("http:/localhost:5000/api/login")
		.send({
			username: "wrong",
			password: "12398123"
		})
		.expect((res) => {
			res.body.status = 500;
	        res.body.error = "Username not found."
	     })
	})
	test("Wrong password should return not match", async () => {
		await request(app).post("http:/localhost:5000/api/login")
		.send({
			username: "patrick",
			password: "12398123"
		})
		.expect((res) => {
			res.body.status = 500;
	        res.body.error = "Passwords do not match."
	     })
	})
	test("Correct login info returns 200 status", async () => {
		await request(app).post("http:/localhost:5000/api/login")
		.send({
			username: "test",
			password: "test"
		})
		.expect((res) => {
			res.body.status = 200
	     })
	})
})

describe("Testing Create Recipe", () => {
	test("Adding a recipe to the database", async () => {
		await request(app).post("http:/localhost:5000/api/createRecipe")
		.send({
			name: "Unit Testing Recipe",
			desc: "Unit Testing Recipe",
	        pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
	        country: "Italy",
	        text: "Unit Testing Recipe",
	        creator: "6254ff2797bf1f078987ac0e",
	        coordinates: [0,0]
		})
		.expect((res) => {
			res.body.status = 200;
	        res.body.error = ""
	     })
	})
})

describe("Testing Edit Recipe", () => {
	test("Editing a recipe", async () => {
		await request(app).post("http:/localhost:5000/api/editRecipe")
		.send({
			name: "Unit Testing Recipe",
			desc: "Unit Testing Recipe",
	        pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
	        text: "Unit Testing Recipe",
			recipeID: "6254ff2797bf1f078987ac0e"
		})
		.expect((res) => {
			res.body.status = 200;
	        res.body.error = ""
	     })
	})
})

describe("Testing User Likes and Favorites", () => {
	test("Getting favorites with invalid userID returns error", async () => {
		await request(app).post("http:/localhost:5000/api/getFavorites")
		.send({
			userID: "6254ff2797bf1f078987ac0k"
		})
		.expect((res) => {
			res.body.status = 500;
	        res.body.error = "Invalid UserID"
	     })
	})
	test("Getting favorites with valid userID returns 200 status", async () => {
		await request(app).post("http:/localhost:5000/api/getFavorites")
		.send({
			userID: "6254ff2797bf1f078987ac0e"
		})
		.expect((res) => {
			res.body.status = 200;
		})
	})
	test("Getting likes with invalid userID returns error", async () => {
		await request(app).post("http:/localhost:5000/api/getLikes")
		.send({
			userID: "6254ff2797bf1f078987ac0k"
		})
		.expect((res) => {
			res.body.status = 500;
	        res.body.error = "Invalid UserID"
	     })
	})
	test("Getting likes with valid userID returns 200 status", async () => {
		await request(app).post("http:/localhost:5000/api/getLikes")
		.send({
			userID: "6254ff2797bf1f078987ac0e"
		})
		.expect((res) => {
			res.body.status = 200;
		})
	})
})

describe("Testing Getting Country Recipes", () => {
	test("Getting country recipes with invalid country returns error", async () => {
		await request(app).post("http:/localhost:5000/api/getCountryRecipes")
		.send({
			country: "InvalidCountry"
		})
		.expect((res) => {
			res.body.status = 500;
			res.body.error = "Country not found"
	     })
	})
	test("Getting country recipes with valid country returns 200 status code", async () => {
		await request(app).post("http:/localhost:5000/api/getCountryRecipes")
		.send({
			country: "Italy"
		})
		.expect((res) => {
			res.body.status = 200;
	     })
	})
})

describe("Testing Edit User", () => {
	test("Trying to edit a user with invalid userID returns error", async () => {
		await request(app).post("http:/localhost:5000/api/updateUser")
		.send({
			userID: "62564608c467830dcfad30f4",
			password: "test",
			profilePic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
			email: "newEmail@gmail.com"
		})
		.expect((res) => {
			res.body.status = 404,
			res.body.error = "User does not exist."
	     })
	})
	test("Trying to edit a user with valid userID returns 200 status and empty error", async () => {
		await request(app).post("http:/localhost:5000/api/updateUser")
		.send({
			userID: "62564608c467830dcfad30f5",
			password: "test",
			profilePic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
			email: "newEmail@gmail.com"
		})
		.expect((res) => {
			res.body.status = 200,
			res.body.error = ""
	     })
	})
})

describe("Testing View Recipe", () => {
	test("Trying to view a recipe with an invalid recipeID returns an error", async () => {
		await request(app).post("http:/localhost:5000/api/viewRecipe")
		.send({
			recipeID: "62564608c467830dcfas8jdu"
		})
		.expect((res) => {
			res.body.status = 404,
			res.body.error = "Recipe not found"
	     })
	})
	test("Trying to view a recipe with a valid recipeID returns a 200 status code", async () => {
		await request(app).post("http:/localhost:5000/api/viewRecipe")
		.send({
			recipeID: "62564608c467830dcfas8jdu"
		})
		.expect((res) => {
			res.body.status = 200
	     })
	})
})
