'use strict'
//aquí se carga el modelo
var User = require('../models/user')
//bcrrypt sirve para guardar la contraseña directamente encriptada
var bcrypt = require('bcrypt-nodejs')
var jwt = require('../services/jwt')
//con bcript podremos encriptar contraseñas
function pruebas (req, res){
	res.status(200).send({
		message: 'Probando una acción del controlador de usuarios'})}

function saveUser (req, res){
	// aquí tenemos una instancia del modelo de usuario. Podremos setear las propiedades.
	var user = new User();
	var params =req.body
	//aquí recojeremos los datos enviados por post
	user.name= params.name
	user.surname=params.surname
	user.email= params.email
	user.role ='ROLE_USER'
	user.image ='null'
	// console.log(params)

	//ahora guardaremos estos datos en la bbdd con el método save de mongoose
	//Encripta contraseña y guardad datos
	if(params.password){
		//encriptar contraseña y guardar datos
		bcrypt.hash(params.password, null, null, function(err,hash){
			user.password = hash
			if(user.name!=null && user.surname != null && user.email != null){
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
		res.status(500).send({message:'Introduce la contraseña'})
	}
}
//este método comprobará que los datos que lleguen por post, el cuerpo de la petición, el email y la contraseña 
//coinciden con el de la bbdd
function loginUser(req, res){
	//con body parser los datos son convertidos a un objeto json
	var params = req.body
	var email = params.email
	var password = params.password
	// //saca todo los usuarios de la colección de objetos users que coincidan con el  email
    //método de mongoose

	User.findOne({email: email.toLowerCase()}, (err, user)=>{
		if(err){
			req.status(500).send({message: 'Error en la petición'})
		}else{
			if(!user){
				res.status(404).send({message: 'El usuario no existe'})
			}else{
				//comprobar la contraseña. el método de bcrypt compara la contraseña que llega por post
// 				// con la que hay guardada en la base de datos
				bcrypt.compare(password, user.password, (err, check)=>{
					if(check){
						if(params.gethash){
							res.status(200).send({token: jwt.createToken(user)})

						}else{res.status(200).send({user})}

					}else{res.status(404).send({message: 'El usuario no ha podido loguearse'})}
				})

			}

		}


	})

}
//este método nos servirá para actualizar los datos de un usuario ya registrado 
//recojerá el id del usuario q le llegará en el cuerpo de la petición "updateUser/:id" en req.params 
function updateUser(req, res){
	//esta variable la recojemos de la url(params)
	var userId = req.params.userId
	//aquí recojemos el body de la petición, todos los datos que llegarán del usuario
	var update = req.body
	//este método se va a encargar de actualizar los datos de un usuario "en este caso" dado un id y los datos a actualizar
	User.findByIdAndUpdate( userId, update, (err, userUpdated) =>{
		//si nos devuelve un error
		if(err){
			res.status(500).send({message: 'Error al actualizar el usuario'})
		}else{
			if(!userUpdated){
				res.status(404).send({message: 'No se a podido actualizar el usuario'})
			}else{
				res.status(200).send({user: 'El usuario no ha podido loguearse'})
			}
			
		}


	})
}
	module.exports = {pruebas,saveUser,loginUser, updateUser}
	//de esta manera exportamos el método pruebas