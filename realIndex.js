$(document).ready(function() {

  var url = "", city = "", country = "", weather = "", description = "", maxTemp = "", tempTemp = "", tempatureF = "", tempatureC = "", icon = "", something = tempatureF, ipDetection = 1;
  var weatherIfElse = function (tempTemp) {
        if (tempTemp >= 95) {
          $('#viewerBox').css({"background-color": "teal", "background-image": "url('images/1.jpg')", "background-size": "cover", "background-repeat": "no-repeat", "background-position": "center"});
        }
        else if (tempTemp >= 80) {
          $('#viewerBox').css({"background-color": "teal", "background-image": "url('images/4.jpg')", "background-size": "cover", "background-repeat": "no-repeat", "background-position": "center"});
        }
        else if (tempTemp >= 70) {
          $('#viewerBox').css({"background-color": "teal", "background-image": "url('images/5.jpg')", "background-size": "cover", "background-repeat": "no-repeat", "background-position": "center"});
        }
        else if (tempTemp >= 60) {
          $('#viewerBox').css({"background-color": "teal", "background-image": "url('images/6.jpg')", "background-size": "cover", "background-repeat": "no-repeat", "background-position": "center"});
        }
        else if (tempTemp >= 32) {
          $('#viewerBox').css({"background-color": "teal", "background-image": "url('images/2.jpg')", "background-size": "cover", "background-repeat": "no-repeat", "background-position": "center"});
        }
    else if (tempTemp <= 32) {
          $('#viewerBox').css({"background-color": "teal", "background-image": "url('images/3.jpg')", "background-size": "cover", "background-repeat": "no-repeat", "background-position": "center"});
        }
    };
    var jsonCallForCity = function (lat, lon, callback) {
      $.getJSON("https://api.wunderground.com/api/e077937775a219b2/geolookup/q/"+lat+","+lon+".json", function(data) {
        city = data.location.city;
        cityCode = data.location.state;
        url = 'https://api.wunderground.com/api/e077937775a219b2/conditions/q/'+cityCode+'/'+city+'.json';
        callback(url);
    });
  };


  function jsonCall(callback) {
    $.getJSON('https://api.ipify.org?format=json', function(data) {
      $.getJSON("https://freegeoip.net/json/"+data.ip, function(data) {
        city = data.city;
        cityCode = data.region_code;
        url = 'https://api.wunderground.com/api/e077937775a219b2/conditions/q/'+cityCode+'/'+city+'.json';
        callback(url);
      })
    })
  }
  function getWeatherData(callback) {
    if (ipDetection === 1) {
      jsonCall(function(data) {
        url = data;
          $.getJSON(url, function(x) {
              country = x.current_observation.display_location.country,
              tempatureC = x.current_observation.temp_c,
              tempatureF = x.current_observation.temp_f,
              weather = x.current_observation.weather,
              icon = x.current_observation.image.url;
              weatherImg = weatherIfElse(tempatureF);
              weatherIconCheck = x.current_observation.image.url;
              callback();
          });
      });
    } else if (ipDetection === 0) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude,
          longitude = position.coords.longitude;
          jsonCallForCity(latitude,longitude,function(data) {
            url = data;
            $.getJSON(url, function(x) {
                city = x.current_observation.display_location.city,
                country = x.current_observation.display_location.country,
                tempatureC = x.current_observation.temp_c,
                tempatureF = x.current_observation.temp_f,
                weather = x.current_observation.weather,
                icon = x.current_observation.image.url;
                weatherImg = weatherIfElse(tempatureF);
                weatherIconCheck = x.current_observation.image.url;
          });
          })
      });

    }

  }

  getWeatherData(function() {
    $("#toggleButtonDetection").on("click", function() {
      if (ipDetection === 1) {
        $("#toggleButtonDetection").html("<i class='fa fa-home'></i>");
        ipDetection = 0;
        getWeatherData(function() {});
      } else if (ipDetection === 0) {
        $("#toggleButtonDetection").html("<i class='fa fa-globe'></i>");
        ipDetection = 1;
        getWeatherData(function() {});
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
