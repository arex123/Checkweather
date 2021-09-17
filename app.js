const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");            

})
app.post("/",function(req,res){
    console.log(req.body.cityName);
    
    const query = req.body.cityName;
    const apikey = "6f8be79031ae9a3c8d10299e4970dcd4" ;
    const unit = "metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apikey +"&units="+unit;
    https.get(url,function(response){

        console.log("statuscode:",response.statusCode);
        response.on("data",function(data){
            // console.log(data); 
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            console.log("temperature "+ temp);
            console.log("description "+desc);
            const icon = weatherData.weather[0].icon;
            const iconurl =  "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
            // console.log(weatherData);
            // console.log(data);
            res.write("<p> description : " + desc+ "</p>");
            res.write("<h1>temperatur : " + temp +" degree celcius</h1> ");
            res.write("<img src=" +iconurl+">");
            res.send();
            
        })
    })
})

app.listen(process.env.PORT ||3000,function(){
    console.log("server started");
})