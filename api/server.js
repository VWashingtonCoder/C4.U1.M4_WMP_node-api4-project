const express = require('express');
const cors = require('cors');
const Users = require('./users-model')
const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    console.log('Sanity Check')
    res.status(200).json('Welcome!');
})

server.get('/users', (req, res, next) => {
    Users.findAll()
        .then(users => {
            res.status(200).json(users)
        }) 
        .catch(err => {
            console.log(err)
            res.status(500).json('Users could not be retrieved')
        })
})

module.exports = server