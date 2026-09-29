require("dotenv").config();

module.exports = {
    development: {//configuration for development environment
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql"
    }
};
//sequelize.config.cjs, is much easier to understand because that one actually
//  tells Sequelize how to connect to our MySQL database.