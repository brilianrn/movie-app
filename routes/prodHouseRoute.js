const express = require('express');
const router = express.Router();
const Controller = require('../controllers/prodHouseController.js')

router.get('/', Controller.listData);

// router.get('/add', Controller.add);
// router.post('/add', Controller.saveAdd);

// router.get('/edit/:id', Controller.edit);
// router.post('/edit/:id', Controller.saveEdit);

// router.get('/delete/:id', Controller.delete);

module.exports = router;