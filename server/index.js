const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./Models/User");

// Middleware//
const app = express();
app.use(cors());
app.use(express.json());

let dbConnection = mongoose
  .connect("mongodb://127.0.0.1:27017/crud")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.post("/create", (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params; // Corrected destructuring
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    },
    { new: true } // This option returns the updated document
  )
  .then((user) => res.json(user))
  .catch((err) => res.status(400).json(err));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params; // Correctly destructuring id from params
  UserModel.findByIdAndDelete(id) // Use findByIdAndDelete instead
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully", user });
    })
    .catch((err) => res.status(500).json(err));
});


app.listen(3000, () => {
  console.log("Server is running");
});
