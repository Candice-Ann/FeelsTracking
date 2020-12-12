
var express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectId;

router.get('/feels', (req, res, next) => {
  req.collection.find({})
    .toArray() //transform to array
    .then(results => res.json(results))
    .catch(error => res.send(error))
})

router.post('/feels', (req, res, next) => {
  const { date, mood, details } = req.body;
  if(!mood) {
    return res.status(400).json({
      message: 'Mood descriptor is required',
    });
  }

  const payload = { date, mood, details }
  req.collection.insertOne(payload)
  .then(result => res.json(result.ops[0]))
  .catch(error => res.send(error));
});

router.delete('/feels/:id', (req, res, next) => {
  const { id } = req.params;
  const _id = ObjectID(id);

  req.collection.deleteOne({_id}) 
    .then(result => res.json(result)) //setting result
    .catch(error => res.send(error));
})

module.exports = router;

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
*/
