'use strict'
const User = require('../models/user')
const bcrypt = require('bcrypt-nodejs')
//con bcript podremos encriptar contraseñas
function pruebas (req,res){
	res.status(200).send({
		message: 'Probando una acción del controlador de usuarios'})}

function saveUser (req,res){
	var user = new User();
	// aquí tenemos una instancia del modelo de usuario. Podremos setear las propiedades.
	var params =req.body

	console.log(params)
	//aqui recojeremos los datos enviados por post
	user.name= params.name
	user.surname=params.surname
	user.email= params.email
	user.role ='ROLE_USER'
	user.image ='null'

	//ahora guardaremos estos datos en la bbdd con el método save de mongoose

	if(params.password){
		//encriptar contraseña y guardar datos
		bcrypt.hash(params.password, null, null, function(err,hash){
			user.password= hash
			if(user.name!=null&& user.surname != null && user.email != null){
				//Guardar el usuario con el método save de mongoose
				user.save((err,userStored) => {
					if(err){
						res.status(500).send({message:'Error al guardar el usuario'})
					}else{
						if(!userStored){res.status(404).send({message:'No se ha registrado el usuario'})}
						else{
							res.status(200).send({user: userStored})
						}	
						
					}

				})

			}else {
				res.status(200).send({message:'Rellena todo los campos'})
			}
		})

	}else{
		res.status(200).send({message:'Introduce la contraseña'})
	}
}

	module.exports = {pruebas,saveUser}
	//de esta manera exportamos el método pruebas