const db = require('../database/db.js');

class Recipe {
    constructor(title, making_time, serve, ingredients, cost, id) {
        this.title = title; // string
        this.making_time = making_time; // "45min"
        this.serves = serve; // "4 people"
        this.ingredients = ingredients; // "onion, water, chicken"
        this.cost = cost; // "1000"
        this.id = id ? id : null;
    }

    async get() {
        return await db.getRecipe();
    }

    async create() {
        return await db.createRecipe(this);
    }

    async update() {
        return await db.updateRecipe(this);
    }

    async getById(id) {
        return await db.getRecipeById(id);
    }

    async deleteById(id) {
        return await db.deleteRecipeById(id);
    }
}

module.exports = Recipe;
