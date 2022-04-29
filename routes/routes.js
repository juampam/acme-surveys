const controller = require('../controller/surveys.controller')
var md_auth = require('../middlewares/authenticated')
var express = require('express')
var cors = require('cors')
var bodyp = require('body-parser')
const { response } = require('express')
var app = express()



app.use(bodyp.urlencoded({extended:true}))
app.use(bodyp.json())
app.use(cors())

var api = express.Router()
app.use('/api', api)

api.get('/getsurveys',md_auth.ensureAuth,controller.getSurveys)
api.get('/findsurvey/:url',controller.findSurvey)
api.post('/newsurvey',md_auth.ensureAuth, controller.createSurvey)
api.put('/newfield/:survey_id',controller.createfields)
api.put('/answer/:field_id/:user_id',controller.answer)
api.put('/login',controller.authenticate)
api.get('/fields/:survey_id',controller.getFields)
api.post('/register',controller.createUser)

module.exports = api
