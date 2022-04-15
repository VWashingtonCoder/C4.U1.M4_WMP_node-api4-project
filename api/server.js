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

server.get('/users', (req, res) => {
    Users.findAll()
        .then(users => {
           res.status(200).json(users)
        }) 
        .catch(err => {
            console.log(err)
            res.status(500).json('Users could not be retrieved')
        })
})

server.post('/register', (req, res) => {
    const { userName, password } = req.body
    if(!userName || !password){
        res.status(400).json("userName and password required to register")
    } else {
        Users.create(req.body)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json("New user could not be registered")
            })
    }
})

server.post('/login', (req, res) => {
    const userName = req.body.userName.toUpperCase();
    const password = req.body.password;

    if(!req.body.userName || !password){
        res.status(400).json("userName and password required to register");
    } else {
        Users.validate({ userName, password })
            .then(user => {
                if(!user){
                    res.status(404).json("userName or password is invalid")
                } else{
                    res.status(200).json(`Welcome ${user.userName}`)
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json("New user could not be registered")
            })
    }
})

module.exports = server