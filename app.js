require('dotenv').config();
const express = require("express");
const path = require('path');
const db = require('./database/db.js');
const recipeController = require('./controller/recipeController');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/recipe/:id", recipeController.getRecipeById);
app.get("/recipe", recipeController.getRecipe);

app.post("/recipe", recipeController.createRecipe);

app.patch("/recipe/:id", recipeController.updateRecipe);
app.delete("/recipe/:id", recipeController.deleteRecipeById);


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

db.init();