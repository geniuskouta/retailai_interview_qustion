const Recipe = require('../model/Recipe');

exports.getRecipe = async (req, res) => {
    const recipe = new Recipe();
    return await recipe.get().then(data => {
        res.send(JSON.stringify(data));
    });
}

exports.getRecipeById = async (req, res) => {
    const { id } = req.params;
    const recipe = new Recipe();
    return await recipe.getById(id).then(data => {
        res.send(JSON.stringify(data));
    });
}

exports.createRecipe = (recipe) => {
    // const recipe = new Recipe();
    
}

exports.updateRecipe = (recipe) => {
    // const recipe = new Recipe();
}

exports.deleteRecipeById = (id) => {
    // const recipe = new Recipe();

    // convert to json
}
