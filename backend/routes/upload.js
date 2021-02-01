const  express = require('express');
const bodyParser = require('body-parser');

const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '../uploads')
  },
  filename: (req, file, callBack) => {
    callBack(null, `ProductImage_${file.originalname}`)
  }
})

var upload = multer({ storage: storage})

router.post('', upload.single('file', (req, res, next) => {
  const file = req.file;
  console.log(file.filename);
  if(file){
    console.log("yeaah");
    res.send(file);
  }else{
    console.log("Noo");
  }
}));

module.exports = router;
