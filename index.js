import express from "express";
import data from "./data/mock.json";

const app = express();
const PORT = 5000;

//public folder
app.use(express.static("public"));

//images folder
app.use("/images", express.static("images"));

//Express Middlewares, express.json() and express.urlencoded()
//app.use(express.urlencoded({extended: true}))
app.use(express.json());

//GET
app.get("/", (req, res) => {
	res.json(data);
});

//POST for express.json()
app.post("/item", (req, res) => {
	console.log(req.body);
	res.send(req.body);
});

//GET with redirect
app.get("/redirect", (req, res) => {
	res.redirect("https://www.google.co.in");
});

//GET with routing parameters
app.get("/class/:id", (req, res) => {
	const studentId = Number(req.params.id);
	const student = data.filter((student) => student.id === studentId);
	res.send(student);
});

//Get with next()
app.get(
	"/next/:id",
	(req, res, next) => {
		console.log("Routed to next function");
		next();
	},
	(req, res, next) => {
		const studentId = Number(req.params.id);
		const student = data.filter((student) => student.id === studentId);
		res.send(student);
		next();
	},
	(req, res) => {
		console.log("Last");
	}
);

//Route chaining
app
	.route("/class")
	.get((req, res) => res.send("GET class info"))
	.post((req, res) => res.send("POST class info"))
	.put((req, res) => res.send("PUT class info"));

//GET Error handling
app.get("/error", (req, res) => {
	throw new Error();
});

//POST
app.post("/create", (req, res) => {
	res.send("This is a POST request at /create");
});

//UPDATE
app.put("/update", (req, res) => {
	res.send("This is a PUT request at /update");
});

//DELETE
app.delete("/delete", (req, res) => {
	res.send("This is a DELETE request at /delete");
});

//Error handling
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.send("Something went wrong!!!");
});

app.listen(PORT, () => {
	console.log("The server is running on port:", PORT);
	//console.log("Mock data", data);
});
