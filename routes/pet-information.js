const { MongoClient, ObjectID } = require('mongodb');
const express = require('express');
const petInformation = express.Router();
const uri = "mongodb://localhost:27017/vet_app";//"mongodb+srv://root:root@cluster0.zh6yh.mongodb.net/vet_app?retryWrites=true&w=majority";

petInformation.get('/pet-information/all', async function(req, res) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    let db = client.db('vet_app');
    let result = await db.collection('pet_info').find().toArray();
    console.log(result);
    client.close();
    res.status(200).send(result);
});

petInformation.get('/pet-information/:id', async function(req, res) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    let db = client.db('vet_app');
    let result = await db.collection('pet_info').findOne({_id: new ObjectID(req.params.id)});
    console.log(result);
    client.close();
    res.status(200).send(result);
});

petInformation.post('/pet-information/new', async function(req, res) {
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        await client.connect();
        let db = client.db('vet_app');
        let result = await db.collection('pet_info').insertOne(req.body);
        console.log(result.ops);
        client.close();
        res.status(200).send(result);
    } catch(e){
        console.log(e);
    }
});

petInformation.put('/pet-information/edit/:id', async function(req, res) {

    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    let db = client.db('vet_app');
    delete req.body._id;
    console.log(req.params.id)
    let result = await db.collection('pet_info').updateOne({_id: new ObjectID(req.params.id)}, 
                                                            { $set: req.body},
                                                            { upsert: false });
    client.close();
    res.status(200).send(result);
});

petInformation.delete('/pet-information/delete/:id', async function(req, res) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    let db = client.db('vet_app');
    let result = await db.collection('pet_info').deleteOne({_id: new ObjectID(req.params.id)});
    console.log(await db.collection('pet_appoint').deleteOne({patient_id: req.params.id}));
    client.close();
    res.status(200).send(result);
});

module.exports = petInformation;