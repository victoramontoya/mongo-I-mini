
const logger = require('../middleware.js');
const router = require('express').Router();

const Bear = require('./bearModel');

function error(params) {
  
}

router
  .route('/')
  .get(get)
  .post(post);

router
  .route('/:id')
   .get((req, res) => {
    const objId = req.params.id;
    Bear.findById(objId)
    .then(bear => {
      if (bear) {
        res.status(201).json({ bear })
      } else {
        return res.status(404).json({
          message: "The bear with the specified ID does not exist."
        })
      }
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "The bear information could not be retrieved." })
      })})
      .delete((req, res) => {
        const objId = req.params.id;
        Bear.findByIdAndDelete(objId)
        .then(deleted => {
          if (deleted) {
            res.status(201).json({ deleted })
          } else {
            return res.status(404).json({
              message: "The bear with the specified ID does not exist."
            })
          }
        })
          .catch(err => {
            res.status(500).json({
              errorMessage: "The bear could not be removed" })
          })
        })
      // .put(objId)
      // .then(bear => {
      //   res.status(200).json({ status: 'please implement PUT functionality' });
      // });

  

function get (req, res) {
  Bear.find().then(bears => {
    res.status(200).json(bears);
  })
    .catch(err => {
      res.status(500).json({ errorMessage: "The bear information could not be retrieved." });

    });
}

function post(req, res) {
  const bearData = req.body;

  const bear = new Bear(bearData);

  bear
  .save().then( bear => {
    res.status(201).json(bear)
  })
  .catch( err => {
    res.status(500).json({ errorMessage: "There was an error while saving the bear to the database" });
});
}


module.exports = router;
