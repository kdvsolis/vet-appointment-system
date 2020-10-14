const { MongoClient, ObjectID  } = require('mongodb');
const express = require('express');
const petAppointment = express.Router();
const uri = "mongodb://localhost:27017/vet_app";//"mongodb+srv://root:root@cluster0.zh6yh.mongodb.net/vet_app?retryWrites=true&w=majority";


petAppointment.get('/pet-appointment/all', async function(req, res) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    let db = client.db('vet_app');
    let result = await db.collection('pet_appoint').find().toArray();
    console.log(result);
    client.close();
    res.status(200).send(result);
});

petAppointment.get('/pet-appointment/:id', async function(req, res) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    let db = client.db('vet_app');
    let result = await db.collection('pet_appoint').findOne({_id: new ObjectID(req.params.id)});
    console.log(result);
    client.close();
    res.status(200).send(result);
});

petAppointment.post('/pet-appointment/new', async function(req, res) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    let db = client.db('vet_app');
    let result = await db.collection('pet_appoint').insertOne(req.body);
    console.log(result.ops);
    client.close();
    res.status(200).send(result);
});

petAppointment.put('/pet-appointment/edit/:id', async function(req, res) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    let db = client.db('vet_app');
    delete req.body._id;
    let result = await db.collection('pet_appoint').updateOne({_id: new ObjectID(req.params.id)}, 
                                                                { $set: req.body},
                                                                { upsert: false });
    client.close();
    res.status(200).send(result);
});

petAppointment.delete('/pet-appointment/delete/:id', async function(req, res) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    let db = client.db('vet_app');
    let result = await db.collection('pet_appoint').deleteOne({_id: new ObjectID(req.params.id)});
    client.close();
    res.status(200).send(result);
});

module.exports = petAppointment;