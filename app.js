var express = require('express');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", req.header('origin'));
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    var dir = path.join(__dirname, req.query.dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    var fileName = req.query.name + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
    cb(null, fileName);
  }
});

var upload = multer({
  storage: storage
}).single('file');





//get tree of path
app.get('/tree', function (req, res) {
  var tree = [];
  var dir = "dir";
  if (req.query.dir) {
    dir = req.query.dir
  }
  var dirname = path.join(__dirname, dir);
  try {
    var files = fs.readdirSync(dirname);
    files.forEach(function (element) {
      stats = fs.lstatSync(path.join(dirname, element))
      tree.push({ name: element, isDir: stats.isDirectory(), path: dir + "/" + element })
    }, this);
    res.json(tree)
  } catch (error) {
    res.json({ error: "Path Not Found" })
  }
});

//create folder
app.post("/tree", function (req, res) {
  var dir = req.query.dir;
  var dirname = path.join(__dirname, dir);
  try {
    fs.mkdirSync(dirname);
    res.json({ path: dir })
  } catch (error) {
    res.json({ error: error })
  }
});

//delete folder
app.delete("/tree", function (req, res) {
  var dir = req.query.dir;
  var dirname = path.join(__dirname, dir);
  try {
    stats = fs.lstatSync(dirname)
    if (stats.isDirectory()) {
      fs.rmdirSync(dirname);
    } else {
      fs.unlinkSync(dirname);
    }
    res.json({ path: dir })
  } catch (error) {
    res.json({ error: error })
  }
});
// upload file
app.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      res.json({ error: err })
    } else {
      res.json({ path: req.query.dir })
    }
  });
});

//get file
app.get('/upload', function (req, res) {
  var dir = req.query.dir;
  var dirname = path.join(__dirname, dir);
  try {
    stats = fs.lstatSync(dirname);
    if (stats.isFile()) {
      res.sendFile(dirname);
    } else {
      res.json({ error: "Path not found" })
    }
  } catch (error) {
    res.json({ error: "Path not found" })
  }

});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


