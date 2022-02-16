const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();
const mailchimp = require("@mailchimp/mailchimp_marketing");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post('/',function(req,res){
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  mailchimp.setConfig({
    apiKey: "28e17e819341065c8b765959900238d5-us14",
    server: "us14",
  });
  async function run() {
    try{
    const res1 = await mailchimp.lists.getAllLists();
    const id = res1.lists[0].id;

    const res2 = await mailchimp.lists.addListMember(id, {
    email_address: email,
    status: "subscribed",
    merge_fields:{
      FNAME: fname,
      LNAME: lname
    }
  });
  res.sendFile(__dirname + "/success.html");
}
catch(err) {
    res.sendFile(__dirname + "/failure.html");
}
}
  run();
});


app.post('/failure',function(req,res){
  res.redirect('/');
});

app.listen(process.env.PORT||3000,function(){
  console.log("Server started!!!");
});

// e0efcfd4b8
// 28e17e819341065c8b765959900238d5-us14
