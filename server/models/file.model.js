require('dotenv').config();
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
 process.env.MYSQLDB_DATABASE,
 process.env.MYSQLDB_USER,
 process.env.MYSQLDB_ROOT_PASSWORD,

  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql'
  }
);



sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

const File = sequelize.define("files", {
 filename: {
  type: DataTypes.STRING,
  allowNull: false
 },
 size:{
  type: DataTypes.STRING,
  allowNull: false
 },
 date:{
  type: DataTypes.DATEONLY,
 },
 location:{
  type: DataTypes.STRING,
  allowNull: false
 }
})

sequelize.sync().then(() => {
   console.log('File table created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});

module.exports = {
 File
}