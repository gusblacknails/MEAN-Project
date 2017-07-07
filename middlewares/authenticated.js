'use strict'
var jwt = require('jwt-simple')
var moment = require('moment')
//esta es a clave secreta con la que hashearemos el objeto payload
var secret = 'clave_secreta_curso'

//creamos el middleware
exports.ensureAuth = function(req, res, next){
	if(!req.headers.authorization){
		return res.status(403).send({message: 'La petición no tiene la cabezera de autentificación'})

	}
	//con este método eliminamos las comillas que puedan haber en el token
	var token = req.headers.authorization.replace(/[' "]+/g, '')

	try{
		var payload = jwt.decode(token, secret)
		if(payload.exp <=moment().unix()){
			res.status(401).send({message: 'El token ha expirado'})
		}

	}catch(ex){
		console.log(ex)
		return res.status(404).send({message: 'Token no válido'})
	}
	req.user = payload

	next()
}