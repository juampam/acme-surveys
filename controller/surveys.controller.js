const database = require('../database/connection')
const sql = require('mssql')
const jwt = require('jsonwebtoken');  
const config = require('../services/jwt.json');


async function getSurveys(req, res){
  try{
       let  req = await sql.connect(database)
       const result = await req.request().query('select title,description,question,answer,name from surveys S,fields F, answers A, users U where S.survey_id=F.survey_id and A.field_id=F.field_id and A.user_id = U.user_id')
       console.log(res.recordsets)
       var response = result.recordsets[0]
       return res.status(200).json({response}).end()
      
         }
     catch (error) {
     console.log(error)
   }
   
}
async function findSurvey(req, res){
  try{
       var id =  req.params.url
       let  pet = await sql.connect(database)
       const result = await pet.request().query(`select name from surveys where survey_id = ${id}`)
        var response = result.recordsets[0]
       return res.status(200).json({response}).end()
         }
     catch (error) {
     console.log(error)
   }
   
}
async function createfields(req, res){
  try{
    var survey = req.params.survey_id
    var params = req.body
    var question = params.question
       let  pet = await sql.connect(database)
       const result = await pet.request().query(`insert into fields (question,survey_id) values ('${question}','${survey}')`)
        var response = result.recordsets[0]
        return res.status(200).send("succesfull").end()
         }
     catch (error) {
     console.log(error)
   }
   
}
async function getFields(req, res){
    try{
      var survey = req.params.survey_id
       let db = await sql.connect(database)
       const result = await db.request().query(`select * from fields where survey_id ='${survey}' `)
       console.log(res.recordsets)
       var response = result.recordsets[0]
       return res.status(200).json({response}).end()
      
         }
     catch (error) {
     console.log(error)
   }
}
async function getTitle(req, res){
  try{
    var survey = req.params.survey_id
     let  req = await sql.connect(database)
     const result = await req.request().query(`select name from surveys where survey_id ='${survey}' `)
     console.log(res.recordsets)
     var response = result.recordsets[0]
     return res.status(200).json({response}).end()
    
       }
   catch (error) {
   console.log(error)
 }
}

async function createUser(req, res){
  try{
        var params = req.body
        var title = params.name
       let  pet = await sql.connect(database)
       const result = await pet.request().query(`insert into users (name) values ('${title}')`)
       return res.status(200).send("succesfull").end()
         }
     catch (error) {
     console.log(error)
   }
}


async function answer(req, res){
  try{
    var user_id = req.params.user_id
  //  var survey = req.params.survey_id
    var field = req.params.field_id
    var params = req.body
    
      var answer = params.answer
       let  pet = await sql.connect(database)
       const result = await pet.request().query(`insert into answers (answer, field_id, user_id) values('${answer}','${field}','${user_id}' )`)
        var response = result.recordsets[0]
        return res.status(200).send("succesfull").end()
         }
     catch (error) {
     console.log(error)
   }  
}

async function createSurvey(req, res){
  try{
        var params = req.body
        var title = params.title
      var description = params.description
       let  pet = await sql.connect(database)
       const result = await pet.request().query(`insert into surveys (name,description) values ('${title}','${description}')`)
       return res.status(200).send("succesfull").end()
         }
     catch (error) {
     console.log(error)
   }
}

async function authenticate(req,res) {
  var params = req.body
  var password = params.password
  var users = JSON.stringify({ id: 1, username: 'test', password: 'test', })
  var obj = JSON.parse(users)
  try {
    if (password === obj.password) {
     
      const token = jwt.sign({ sub: users.id }, config.secret, { expiresIn: '7d' })
      console.log(token)
      return res.status(200).send(token).end()
      
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}


  

module.exports = {
    getSurveys: getSurveys,
    findSurvey: findSurvey,
    createSurvey: createSurvey,
    createfields:createfields,
    answer:answer,
    authenticate: authenticate,
    getTitle:getTitle,
    getFields:getFields,
    createUser:createUser
}