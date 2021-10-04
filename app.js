const express = require('express');
const app =new express();
const os = require('os');
const fs = require('fs');
const nodemailer = require('nodemailer');


app.set('view engine','html');

  app.get('/', function (req, res) {
    res.send('WELCOME TO SERVER');
    res.end();
  });
  
  app.get('/serverdetails',(req,res) => {
      res.send(`THE OPERATING SYSTEM IS : ${os.type} and THE ARCHITECTURE IS : ${os.arch}`);
      res.end();
  })
  
  app.get('/html/page',(req,res) => {
      fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end(); 
      });
  })

  app.get('/textme',(req,res) => {
      fs.writeFile('textmeter.txt',"Sruthi Krishna R",function(err) {
        if (err) return res.send('Failed!!');
        else{
          fs.readFile('textmeter.txt', 'utf8', function(err, data){
            //console.log(data);
            res.send(`Successfully added "${data}"`);
          });
        console.log("Success !!!");
        }
    });
  });

  message = {
    from: "sruthykrish1122@gmail.com",
    to: "gokul.g@ictkerala.org",
    subject: "AUTOMATED EMAIL FROM NODE",
    text: " Sruthi Krishna R \n CSFSD Batch \n Have a Nice Day !!!  :)"
  }

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sruthykrish1122@gmail.com',
      pass: 'sruthymuthu9876'
    }
  });

  app.get('/mailer',(req,res) => {
    transporter.sendMail(message, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        res.send(info);
      }
    });
  });

  app.get('/*',(req,res) => {
    res.send("Sorry...BAD REQUEST !!!!");
    res.end();
  });

  
  app.listen(8888);