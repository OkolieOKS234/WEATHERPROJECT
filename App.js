const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./style.css"));
// Getting the request from an external server
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  const cityName = req.body.cityName;

  // res.send("Server is up and running.");

  const apiKey = "a24ea728cd75d8be418a0bc0152b5579";
  const cityQuery = cityName;
  const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${cityQuery}&units=metric`;
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const description = weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const weather_feels = weatherData.main.feels_like;
      const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(temp);
      console.log(description);
      res.write(`<p>The weather is currently ${description}</p>`);
      res.write(
        `<h1>The weather in ${cityQuery} is currently ${temp} degree celsius</h1> `
      );

      res.write(`<img src =" ${imageURL} "/>`);
      res.write(`<p>Feels Like: ${weather_feels}</p>`);
      res.send();
    });
  });
});

// port to be listened to

app.listen(3000, function () {
  console.log("server is up and running");
});
