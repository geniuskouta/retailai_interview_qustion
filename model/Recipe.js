const db = require('../database/db.js');

class Recipe {
    constructor(title, making_time, serve, ingridients, cost, id) {
        this.title = title; // string
        this.making_time = making_time; // "45min"
        this.serve = serve; // "4 people"
        this.ingridients = ingridients; // "onion, water, chicken"
        this.cost = cost; // "1000"
        this.id = id ? id : null;
    }

    async get() {
        return await db.getRecipe();
    }

    create() {
        db.createRecipe(this);
    }

    update() {
        db.updateRecipe(this);
    }

    async getById(id) {
        return await db.getRecipeById(id);
    }

    deleteById(id) {
        db.deleteRecipeById(id);
    }
}

module.exports = Recipe;
