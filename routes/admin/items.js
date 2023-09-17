var express = require('express');
var router = express.Router();

const itemModel = require('../../schemas/items');


/* GET users listing. */
router.get('/', async function(req, res, next) {
  const listItem = await itemModel.find();

  res.render('pages/items/list', { pageTitle: 'Item List Page', listItem: listItem});
});

router.get('/add', function(req, res, next) {
  res.render('pages/items/add', { pageTitle: 'Add Item Page' });
});


module.exports = router;
