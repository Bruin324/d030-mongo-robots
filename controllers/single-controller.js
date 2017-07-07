const express = require('express');
const router = express.Router();

// const userData = require('../models/data.js');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/Robots';

router.get('/:robotId', function (request, response) {
    var id = parseInt(request.params.robotId)
    MongoClient.connect(url, async (error, database) => {
        var robot = await database.collection('robots').find({ id: id }).toArray();
        response.render('single', robot[0]);
    });

});

module.exports = router;