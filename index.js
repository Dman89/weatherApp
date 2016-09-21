$(document).ready(function() {

  var url = "",
    city = "",
    country = "",
    weather = "",
    description = "",
      maxTemp = "",
      tempTemp = "",
    tempatureF = "",
    tempatureC = "",
      icon = "",
    something = tempatureF,
    ipDetection = 1,
      smallImgDay = ['http://openweathermap.org/img/w/01d.png', 'http://openweathermap.org/img/w/02d.png', 'http://openweathermap.org/img/w/03d.png', 'http://openweathermap.org/img/w/04d.png', 'http://openweathermap.org/img/w/09d.png', 'http://openweathermap.org/img/w/10d.png', 'http://openweathermap.org/img/w/11d.png', 'http://openweathermap.org/img/w/13d.png', 'http://openweathermap.org/img/w/50d.png'],
      smallImgNight = ['http://openweathermap.org/img/w/01n.png', 'http://openweathermap.org/img/w/02n.png', 'http://openweathermap.org/img/w/03n.png', 'http://openweathermap.org/img/w/04n.png', 'http://openweathermap.org/img/w/09n.png', 'http://openweathermap.org/img/w/10n.png', 'http://openweathermap.org/img/w/11n.png', 'http://openweathermap.org/img/w/13n.png', 'http://openweathermap.org/img/w/50n.png'];

      var weatherIfElse = function (tempTemp) {
            if (tempTemp >= 305.37222222) {
              $('#viewerBox').css("background", "red url('images/1.jpg') center/cover no-repeat");
            }
            else if (tempTemp >= 294.26111111) {
              $('#viewerBox').css("background", "red url('images/5.jpg') center/cover no-repeat");
            }
            else if (tempTemp >= 285.928) {
              $('#viewerBox').css("background", "red url('images/6.jpg') center/cover no-repeat");
            }
            else if (tempTemp >= 273.15) {
              $('#viewerBox').css("background", "red url('images/2.jpg') center/cover no-repeat");
            }
        else if (tempTemp <= 273.15) {
              $('#viewerBox').css("background", "red url('images/3.jpg') center/cover no-repeat");
            }
        };
        var iconGen = function(icon) {
if (icon === "01d") {
  displayImg = '<img src=' + smallImgDay[0] + '></img>';
  $(".smallImgDisplay").html(displayImg);
}
else if (icon === "02d") {
  displayImg = '<img src=' + smallImgDay[1] + '></img>';
  $(".smallImgDisplay").html(displayImg);
}
else if (icon === "03d") {
  displayImg = '<img src=' + smallImgDay[2] + '></img>';
  $(".smallImgDisplay").html(displayImg);
}
else if (icon === "04d") {
  displayImg = '<img src=' + smallImgDay[3] + '></img>';
  $(".smallImgDisplay").html(displayImg);
}
else if (icon === "09d") {
  displayImg = '<img src=' + smallImgDay[4] + '></img>';
  $(".smallImgDisplay").html(displayImg);
}
else if (icon === "10d") {
  displayImg = '<img src=' + smallImgDay[5] + '></img>';
  $(".smallImgDisplay").html(displayImg);
}
else if (icon === "11d") {
  displayImg = '<img src=' + smallImgDay[6] + '></img>';
  $(".smallImgDisplay").html(displayImg);
}
else if (icon === "13d") {
  displayImg = '<img src=' + smallImgDay[7] + '></img>';
  $(".smallImgDisplay").html(displayImg);
}
else if (icon === "50d") {
  displayImg = '<img src=' + smallImgDay[8] + '></img>';
  $(".smallImgDisplay").html(displayImg);
}  else if (icon === "01n") {
  displayImg = '<img src=' + smallImgNight[0] + '></img>';
  $(".smallImgDisplay").html(displayImg);
}
else if (icon === "02n") {
  displayImg = '<img src=' + smallImgNight[1] + '></img>';
  $(".smallImgDisplay").html(displayImg);
}
else if (icon === "03n") {
  displayImg = '<img src=' + smallImgNight[2] + '></img>';
  $(".smallImgDisplay").html(displayImg);
}
else if (icon === "04n") {
  displayImg = '<img src=' + smallImgNight[3] + '></img>';
  $(".smallImgDisplay").html(displayImg);
}
else if (icon === "09n") {
  displayImg = '<img src=' + smallImgNight[4] + '></img>';
  $(".smallImgDisplay").html(displayImg);
}
else if (icon === "10n") {
  displayImg = '<img src=' + smallImgNight[5] + '></img>';
  $(".smallImgDisplay").html(displayImg);
}
else if (icon === "11n") {
  displayImg = '<img src=' + smallImgNight[6] + '></img>';
  $(".smallImgDisplay").html(displayImg);
}
else if (icon === "13n") {
  displayImg = '<img src=' + smallImgNight[7] + '></img>';
  $(".smallImgDisplay").html(displayImg);
}
else if (icon === "50n") {
  displayImg = '<img src=' + smallImgNight[8] + '></img>';
  $(".smallImgDisplay").html(displayImg);
}
}

  function getWeatherData(callback) {
    if (ipDetection === 1) {
      $.getJSON("https://freegeoip.net/json/github.com", function(data) {
        url = "";
        var latitude = data.latitude;
        var longitude = data.latitude;
        url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=84c40e904d7b73310e00fce7d1713e47';
        $.getJSON(url, function(x) {
          city = x.name,
            country = x.sys.country,
            tempTemp = x.main.temp,
            tempatureC = Math.round(x.main.temp - 273.15),
            tempatureF = Math.round(x.main.temp * 9 / 5 - 459.67),
            weather = x.weather[0].main,
            icon = x.weather[0].icon,
            maxTemp = x.main.temp_max,
            description = x.weather[0].description;
          weatherImg = weatherIfElse(tempTemp);
          weatherIconCheck = iconGen(icon)
          callback();
        });
      });
    } else if (ipDetection === 0) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude,
          longitude = position.coords.longitude;
        url = "";
        url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=84c40e904d7b73310e00fce7d1713e47';
        $.getJSON(url, function(x) {
          city = x.name,
            country = x.sys.country,
            tempTemp = x.main.temp,
            tempatureC = Math.round(x.main.temp - 273.15),
            tempatureF = Math.round(x.main.temp * 9 / 5 - 459.67),
            weather = x.weather[0].main,
            icon = x.weather[0].icon,
            description = x.weather[0].description;
          weatherImg = weatherIfElse(tempTemp);
          weatherIconCheck = iconGen(icon);
          callback();
        });
      });

    }

  }

  getWeatherData(function() {
    $("#toggleButtonDetection").on("click", function() {
      if (ipDetection === 1) {
        $("#toggleButtonDetection").html("<i class='fa fa-home'></i>");
        ipDetection = 0;
        getWeatherData();
      } else if (ipDetection === 0) {
        $("#toggleButtonDetection").html("<i class='fa fa-globe'></i>");
        ipDetection = 1;
        getWeatherData();
      }
    });
    $(document).ready(weatherImg);
    $(document).ready(weatherIconCheck);
    $("#outputApi").html("<h2>" + tempatureF + "&deg;F</h2><h4>" + weather + "</h4><h5>" + city + "</h5><h6>" + country + "</h6>");
    $("#toggleButton").on("click", function() {
      if (something === tempatureF) {
        $("#outputApi").html("<h2>" + tempatureF + "&deg;F</h2><h4>" + weather + "</h4><h5>" + city + "</h5><h6>" + country + "</h6>");
        $("#toggleButton").html("&deg;C");
        something = tempatureC;
      } else if (something !== tempatureF) {
        $("#outputApi").html("<h2>" + tempatureC + "&deg;C</h2><h4>" + weather + "</h4><h5>" + city + "</h5><h6>" + country + "</h6>");
        $("#toggleButton").html("&deg;F");
        something = tempatureF;
      }
    });

  });

});
