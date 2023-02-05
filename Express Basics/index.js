import express from "express";
import data from "./data/mock.json";

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
	res.send("This is a GET request at /");
});

app.post("/create", (req, res) => {
	res.send("This is a POST request at /create");
});

app.put("/update", (req, res) => {
	res.send("This is a PUT request at /update");
});

app.delete("/delete", (req, res) => {
	res.send("This is a DELETE request at /delete");
});

app.listen(PORT, () => {
	console.log("The server is running on port:", PORT);
	console.log("Mock data", data);
});
