const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
require('dotenv').config();
const controller = require('./controllers/file.controller')

const app = express();

app.use(cors());
app.use(express.static('public'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'))

const FILE_PATH = 'uploads'
app.use(express.static(FILE_PATH))

const upload = multer({
    dest: `${FILE_PATH}`,
    limits: {
        files: 10, // 10files
        fileSize: 10 * 1024 * 1024 //10MB
    }
})

const port = process.env.PORT || 8003;

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
});

app.delete("/delete/:id", (req, res)=> {
    controller.deleteFile(req, res)
})

app.get('/', (req, res) => {
    controller.getFiles(req, res)
})

app.post('/upload-files', upload.array('files', 10), async(req, res) => {
    controller.upload(req, res)
});