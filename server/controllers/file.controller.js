const Sequelize = require("sequelize");
const {File} = require("../models/file.model");
const fs = require('node:fs')
require('dotenv').config();

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

const upload = (req, res) => {
 try{
  const files = req.files

  if (!files){
      res.status(400).send({
          status:false,
          data: 'No files uploaded'
      })
  } else{
      let data = []

      files.map(p => {
          sequelize.sync().then(() => {
           
              File.create({
                  filename: p.originalname,
                  date: Date.now(),
                  size: p.size,
                  location: `${p.filename}`
              }).then(res => {
                  console.log(res)
              }).catch((error) => {
                  console.error('Failed to create a new record : ', error);
              });
           
           }).catch((error) => {
              console.error('Unable to create table : ', error);
           });

          data.push({
              name: p.originalname,
              mimetype: p.mimetype,
              size: p.size
          })})

      res.send({
          status: true,
          message: 'files uploaded successfully',
          data: data
      })
  }
} catch(err) {
  res.status(500).send(err);
}
}

const getFiles = (req, res) => {
 sequelize.sync().then(() => {

     File.findAll().then(r => {
         res.send(r)
     }).catch((error) => {
         console.error('Failed to retrieve data : ', error);
     });

 }).catch((error) => {
     console.error('Unable to create table : ', error);
 });
}

const deleteFile = (req, res) => {
 const id = req.params.id;
    let location = null
    sequelize.sync().then(() => {

        File.findOne({
            where: {
                id : id
            }
        }).then(res => {
            console.log(res)
            location = res.location
        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
        });
        
        File.destroy({
            where: {
              id: id
            }
        }).then(() => {
            
            fs.unlink(`uploads/${location}`, function() {
                res.status(200).json({
                    message: 'deleted'
                })
            })
        }).catch((error) => {
            console.error('Failed to delete record : ', error);
        });
      
      }).catch((error) => {
          console.error('Unable to create table : ', error);
      });
}

module.exports = {
 upload: upload,
 getFiles: getFiles,
 deleteFile: deleteFile
}