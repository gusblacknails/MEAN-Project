'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema

var SongSchema =  Schema ({
	number: String,
	//este es el orden que va a tener dentro del album
	name: String,
	duration: String,
	file: String,
	album: {type: Schema.ObjectId, ref:'Album'}
	
	
})

module.exports = mongoose.model('Song', SongSchema)