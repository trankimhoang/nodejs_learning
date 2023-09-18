var express = require('express');
var router = express.Router();

const itemModel = require('../../schemas/items');
// const item = require('../../schemas/item');
const UtilsHelpers = require('../../helpers/utils');
const ParamsHelpers = require('../../helpers/params');



/* GET users listing. */
router.get('(/:status)?', async function(req, res, next) {
  let objWhere = {};
  let currentStatus = ParamsHelpers.getParam(req.params, 'status', 'all');


  if(currentStatus !== 'all') {
    objWhere = {status: currentStatus};
  }
  const listItem = await itemModel.find(objWhere);
  
  let statusFilter = UtilsHelpers.createFilterStatus(currentStatus);
  
  res.render('pages/items/list', { 
    pageTitle: 'Item List Page', 
    listItem: listItem, 
    statusFilter: statusFilter
  });
});

/* GET users listing. */
router.get('/:status', function(req, res, next) {
  res.write();
  res.end();
});

router.get('/add', function(req, res, next) {
  res.render('pages/items/add', { pageTitle: 'Add Item Page' });
});


module.exports = router;
