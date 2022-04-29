'use strict'

var jwt = require("jsonwebtoken")
var moment = require("moment")
var secret = 'SECRETKEY'

exports.ensureAuth = function (req, res, next) {
    if(!req.headers.authorization){
        return res.status(403).send({ message: 'la peticion no tiene la cabecera de autenticacion' })
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, secret)
      //  console.log(payload);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({
                message: 'El Token ha expirado'
            })
        }
    } catch (ex) {
        return res.status(404).send({
            message: 'El token no es valido'
        })
    }

    req.user = payload;
    next();

}