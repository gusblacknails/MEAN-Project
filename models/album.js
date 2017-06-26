'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema

var AlbumSchema =  Schema ({
	title: String,
	description: String,
	year: Number,
	image: String,
	artist: {type: Schema.ObjectId, ref: 'Artist'}
	//el campo "artist" guarda un id de un objeto de la bd que va a ser del tipo Artist, MongoDB va a reconocer que el id esta en la colección Artist
})

module.exports = mongoose.model('Album', AlbumSchema)