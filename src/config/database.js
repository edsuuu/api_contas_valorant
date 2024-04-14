require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;

module.exports = {
     url: `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}.srj7emp.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=${dbHost}`
};