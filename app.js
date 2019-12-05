const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var fs = require('fs');
const path = require('path')
const app = express();
const jsonParser = bodyParser.json({ limit: 1024 * 1024 * 100, type: 'application/json' });
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(jsonParser);
app.use(bodyParser.text());
app.use(urlencodedParser);
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://sharedParaRead:k07r4FDUpSedawJ6@sharedparramato-sy1qy.mongodb.net/shared-parramato?retryWrites=true&w=majority"
const dbName = "shared-parramato"
// var data1 = require('./data.json')


var name = 0
,mob = 0
,otp = 0
,dob = 0
,pin = 0
,pan = 0
,email = 0
,resType = 0
,empType = 0
,empName = 0
,address = 0
,oemail = 0
,thanks = 0
var obj = {}
//var objl = {}


app.listen(3000, () => console.log('Listening at 3000'));

//ejs settings
app.use(express.static('static'));

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/static'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('index', __dirname);

//rendering static html page
app.get('/analytics',function(req,res){
  //res.sendFile(path.join(__dirname+'/index.html'), { Mobile : mob});
  
  res.render('../static/index.html', obj)
});
  
app.post('/buttonData', function(req, res){
  if(req.body.button){
  //   let token = req.body.button
  //   console.log(token)
  //   res.send(getRecords(url))
  //  }

  // else{
    let token = req.body.button
    // console.log(token)
    res.send(processCallLater(parseInt(token)))
   }
})


app.post('/app/getData', verified, (req, res) => {
  // console.log(req.body)
  jwt.verify(req.token, 'jubiDeveloper123@', async (err, authData) => {
    if (err) {
      console.log(err)
      res.sendStatus(403);
    } else {
      res.send(await getRecords(url))
    }
  });
});

app.post('/app/login', (req, res) => {
  if (req.body.username == 'Jubi@623' && req.body.email == 'rise@jubi.ai') {
    //dummy user information that would in a general case be acquired from client
    let user = {
      username: 'Jubi@623',
      email: 'rise@jubi.ai' //client specifc email
    }
    //signing with a secret key using the generic alogorithm of HMAC SHA256
    jwt.sign({ user: user }, 'jubiDeveloper123@', { expiresIn: '45s' }, (err, token) => {
      res.send({
        token: token
      });
    });
  }else{
    res.sendStatus(403);
  }
});

function verified(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['auth'];
  req.token = bearerHeader;
  console.log(bearerHeader)
  // Next middleware
  next();

}

function getRecords(url) {
  return new Promise(async function (resolve, reject) {
    MongoClient.connect(url, { useNewUrlParser: true }, async function (err, db) {
      if (err) throw err;
      var dbo = db.db(dbName);
      const rec = await dbo.collection("analyticsStageCountSchema").find({ $and: [{ "projectId": "finservVoiceQa_011271007071" }, { "intentName": "NewEmiCard" },{"fromTimestamp" : { $gte : (Date.now()-86400000) }},{"toTimestamp" : { $lte : (Date.now())}}] }).toArray()
      const rec2 = await dbo.collection("analyticsStageCountSchema").find({ $and: [{ "projectId": "finservVoiceQa_011271007071" }, { "intentName": "NewEmiCard" },{"fromTimestamp" : { $gte : (Date.now()- 4*86400000) }},{"toTimestamp" : { $lte :  (Date.now()) }}] }).toArray()
  
    
      db.close()
      resolve(rec)
      fs.writeFileSync('data.json', JSON.stringify(rec2))
      console.log("done")
    })
  });
  }

// function processCall(url){
getRecords(url).then(data => {
  name = 0
,mob = 0
,otp = 0
,dob = 0
,pin = 0
,pan = 0
,email = 0
,resType = 0
,empType = 0
,empName = 0
,address = 0
,oemail = 0
,thanks = 0
  data.forEach(function(element){
      
      if(element.stageName == "name")
      {name = name + element.stageCount}

      if(element.stageName == "mobile")
      mob = mob + element.stageCount

      if(element.stageName == "otp")
      otp = otp + element.stageCount

      if(element.stageName == "dob")
      dob = dob + element.stageCount

      if(element.stageName == "pin")
      pin = pin + element.stageCount

      if(element.stageName == "address")
      address = address + element.stageCount
      
      if(element.stageName == "pan")
      pan = pan + element.stageCount

      if(element.stageName == "email")
      email = email + element.stageCount

      if(element.stageName == "residenceType")
      resType = resType + element.stageCount

      if(element.stageName == "empType")
      empType = empType + element.stageCount

      if(element.stageName == "empName")
      empName = empName + element.stageCount

      if(element.stageName == "ofcEmail")
      oemail = oemail + element.stageCount

      if(element.stageName == "thankYou")
      thanks = thanks + element.stageCount

  })
  obj = {}
  obj.name = "NAME: "+ name
  obj.mob = "MOB: "+ mob
  obj.otp = "OTP: "+ otp
  obj.dob = "DOB: " + dob
  obj.pin = "PIN: " + pin
  obj.address = "ADDRESS: "+ address
  obj.pan = "PAN: "+ pan
  obj.email = "EMAIL: "+ email
  obj.resType = "RESIDENCE TYPE: " + resType
  obj.empType = "EMPLOYMENT TYPE: " + empType
  obj.empName = "EMPLOYMENT NAME: " + empName   
  obj.oemail = "OFFICIAL EMAIL: " + oemail
  obj.thanks = "THANK YOU: " + thanks
  console.log(obj) 

  
  // console.log(Date.now() - 86400000)
  

});

function processCallLater(token){
name = 0
,mob = 0
,otp = 0
,dob = 0
,pin = 0
,pan = 0
,email = 0
,resType = 0
,empType = 0
,empName = 0
,address = 0
,oemail = 0
,thanks = 0

  fs.readFile('data.json', (err, data) => {
    data1 = (JSON.parse((data)))
    console.log(data1)
    data1.forEach(function(element){
      if(element.toTimestamp <= (token)  && element.fromTimestamp >= (token - (86400000))) {

      if(element.stageName == "name")
      {name = name + element.stageCount}

      if(element.stageName == "mobile")
      mob = mob + element.stageCount

      if(element.stageName == "otp")
      otp = otp + element.stageCount

      if(element.stageName == "dob")
      dob = dob + element.stageCount

      if(element.stageName == "pin")
      pin = pin + element.stageCount

      if(element.stageName == "address")
      address = address + element.stageCount
      
      if(element.stageName == "pan")
      pan = pan + element.stageCount

      if(element.stageName == "email")
      email = email + element.stageCount

      if(element.stageName == "residenceType")
      resType = resType + element.stageCount

      if(element.stageName == "empType")
      empType = empType + element.stageCount

      if(element.stageName == "empName")
      empName = empName + element.stageCount

      if(element.stageName == "ofcEmail")
      oemail = oemail + element.stageCount

      if(element.stageName == "thankYou")
      thanks = thanks + element.stageCount
      }
  })
    
  obj = {}
  obj.name = "NAME: "+name
  obj.mob = "MOB: "+mob
  obj.otp = "OTP: "+otp
  obj.dob = "DOB: " +dob
  obj.pin = "PIN: " +pin
  obj.address = "ADDRESS: "+ address
  obj.pan = "PAN: "+pan
  obj.email = "EMAIL: "+email
  obj.resType = "RESIDENCE TYPE: " +resType
  obj.empType = "EMPLOYMENT TYPE: " +empType
  obj.empName = "EMPLOYMENT NAME: " +empName   
  obj.oemail = "OFFICIAL EMAIL: " +oemail
  obj.thanks = "THANK YOU: " + thanks

console.log(obj)
})
}
