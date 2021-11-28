const mysql = require('mysql');

// promisify mysql for node application
// https://codeburst.io/node-js-mysql-and-promises-4c3be599909b

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err=> {
                if(err) return reject(err);
                resolve();
            });
        });
    }
}

exports.init = async () => {
    const connection = new Database(config);
    connection.query("DROP TABLE IF EXISTS recipes");
    connection.query(`
    CREATE TABLE IF NOT EXISTS recipes (
        id integer PRIMARY KEY AUTO_INCREMENT,
        title varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
        making_time varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
        serves varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
        ingredients varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
        cost integer NOT NULL,
        created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at datetime on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
    `);

    connection.query(`
    INSERT INTO recipes (
        id,
        title,
        making_time,
        serves,
        ingredients,
        cost,
        created_at,
        updated_at
    )
    VALUES (
        1,
        'Chicken Curry',
        '45 min',
        '4 people',
        'onion, chicken, seasoning',
        1000,
        '2016-01-10 12:10:12',
        '2016-01-10 12:10:12'
    )
    `);

    connection.query(`
    INSERT INTO recipes (
        id,
        title,
        making_time,
        serves,
        ingredients,
        cost,
        created_at,
        updated_at
    )
    VALUES (
        2,
        'Rice Omelette',
        '30 min',
        '2 people',
        'onion, egg, seasoning, soy sauce',
        700,
        '2016-01-11 13:10:12',
        '2016-01-11 13:10:12'
    )
    `);

    connection.close();
}

exports.getRecipe = async () => {
    try {
        const connection = new Database(config);
        const rows = await connection.query('SELECT * FROM recipes');
        return rows;
    } catch(err) {
        console.log(err);
    }
    connection.close();
}

exports.getRecipeById = async (id) => {
    try {
        const connection = new Database(config);
        const rows = await connection.query('SELECT * FROM recipes where id = ?', id);
        return rows;
    } catch(err) {
        console.log(err);
    }
}

exports.createRecipe = async (recipe) => {
    try {
        const connection = new Database(config);
        const response = await connection.query('INSERT INTO recipes set ?', {
            title: recipe.title,
            making_time: recipe.making_time,
            serves: recipe.serves,
            ingredients: recipe.ingredients,
            cost: recipe.cost,
        });
        return await connection.query('SELECT * FROM recipes where id = ?', response.insertId);
    } catch(err) {
        console.log(err);
    }
}

exports.deleteRecipeById = async (id) => {
    try {
        const connection = new Database(config);
        const response = await connection.query('DELETE FROM recipes where id = ?', id);
        console.log(response)
        return response["protocol41"] ?
        { message: "deleted the recipe successfully." } :
        { message: "failed to delete the recipe." };
    } catch(err) {
        console.log(err);
    }
}

exports.updateRecipe = async (recipe) => {
    try {
        const connection = new Database(config);
        await connection.query(`UPDATE recipes set ? where id = ${recipe.id}`, {
            title: recipe.title,
            making_time: recipe.making_time,
            serves: recipe.serves,
            ingredients: recipe.ingredients,
            cost: recipe.cost,
        });
        return await connection.query('SELECT * FROM recipes where id = ?', recipe.id);
    } catch(err) {
        console.log(err);
    }
}
