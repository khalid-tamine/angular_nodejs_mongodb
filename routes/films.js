const express = require('express')
const router = express.Router()
const Film = require('../models/film')
const multer = require('multer');
//storage
const storage = multer.diskStorage({
  destination: function(req , file ,cb){
    cb(null, 'C:/Users/LOMEN/filmlisting/src/assets/');
  },
  filename: function(req , file , cb ){
    cb(null , file.originalname);
  }
});
const fileFilter = (req, file , cb ) =>{
  //reject file 
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null,true);
  }else{
    cb(null,false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter : fileFilter
});
// Getting all
router.get('/', async (req, res) => {
  try {
    const films = await Film.find()
    res.json(films)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getFilm, (req, res) => {
  res.json(res.film)
})
//name: req.body.name,
// Creating one
router.post('/',upload.single('productImage') ,async (req, res) => {
  console.log(req.file);
  const film = new Film({
    name: req.body.name,
    description: req.body.description,
    productImage: req.file.path.substring(38)
  })
  try {
    const newFilm = await film.save()
    res.status(201).json(newFilm)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getFilm, async (req, res) => {
  if (req.body.name != null) {
    res.film.name = req.body.name
  }
  if (req.body.description != null) {
    res.film.description = req.body.description
  }
  if (req.body.productImage != null) {
    res.film.productImage = req.body.productImage
  }
  try {
    const updatedFilm = await res.film.save()
    res.json(updatedFilm)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getFilm, async (req, res) => {
  try {
    await res.film.remove()
    res.json({ message: 'Deleted film' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getFilm(req, res, next) {
  let film
  try {
    film = await Film.findById(req.params.id)
    if (film == null) {
      return res.status(404).json({ message: 'Cannot find film' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.film = film
  next()
}

module.exports = router