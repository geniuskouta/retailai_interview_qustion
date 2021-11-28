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

exports.createRecipe = async (req, res) => {
    const recipe = new Recipe(
        req.body.title,
        req.body.making_time,
        req.body.serves,
        req.body.ingredients,
        req.body.cost
    );
    return await recipe.create().then(data => {
        res.send(JSON.stringify(data));
    });
}

exports.updateRecipe = (recipe) => {
    // const recipe = new Recipe();
}

exports.deleteRecipeById = async (req, res) => {
    const { id } = req.params;
    const recipe = new Recipe();
    return await recipe.deleteById(id).then(data => {
        res.send(JSON.stringify(data));
    });
}
