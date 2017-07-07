const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/Robots';

router.get('/', (request, response) => {
    MongoClient.connect(url, async (error, database) => {
        var robots = await database.collection('robots').find().toArray();
        // response.send({ users: robots });
        response.render('directory', { users: robots });
        database.close();
    });
});

router.get('/unemployed', (request, response) => {
    MongoClient.connect(url, async (error, database) => {
        var robots = await database.collection('robots').find( { company: null} ).toArray();
        response.render('directory', {users: robots });
        database.close();
    });
});

router.get('/employed', (request, response) => {
    MongoClient.connect(url, async (error, database) => {
        var robots = await database.collection('robots').find( {company: {$ne:null} } ).toArray();
        response.render('directory', {users: robots });
    });
});

router.get('/country/:country', (request, response) => {
    var selectedCountry = request.params.country;
    var filter = [{country: selectedCountry}];
    var model = {filters: filter}
    MongoClient.connect(url, async (error, database) => {
        var robots = await database.collection('robots').find( { "address.country": selectedCountry } ).toArray();
        model.users=robots;
        // response.send(model);
        response.render('directory', model);
    });
});

router.get('/skills/:skill', (request, response) => {
    var selectedSkill = request.params.skill;
    var filter = [{skill: selectedSkill}];
    var model = {filters: filter}
    MongoClient.connect(url, async (error, database) => {
        var robots = await database.collection('robots').find( {skills: selectedSkill } ).toArray();
        model.users=robots;
        // response.send(model);
        response.render('directory', model);
    });
});


module.exports = router;