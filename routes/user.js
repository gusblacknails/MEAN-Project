'use strict'

const express = require("express")
const UserController= require("../controllers/user")

var api= express.Router()
var md_auth = require('../middlewares/authenticated')

api.get('/probando-controlador', md_auth.ensureAuth, UserController.pruebas)
api.post('/register', UserController.saveUser)
api.post('/login', UserController.loginUser)
//
api.put('/updateUser/:id', md_auth.ensureAuth, UserController.updateUser)

module.exports= api