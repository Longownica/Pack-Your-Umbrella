const APIkey = "9da9774a75bece55fa0720a28de4f9e0"

const successCallback = (position) => {
    
    var fetchLink = "https://api.openweathermap.org/data/2.5/forecast?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=metric&appid=" + APIkey;
    fetch(fetchLink).then((data) => data.json())
    .then((jsonData) => {
        console.log(jsonData);
        var morningIndex = 0;

        for(let i = 0; i < jsonData.list.length; i++) {
            
            //morningIndex finds data with the first morning hour in the list
            morningIndex = i;
            var split = jsonData.list[i].dt_txt.split(" ");
            var time = split[1];
            time = time.slice(0, -3);
            
            if(time == "06:00" || time == "07:00" || time == "08:00") {
                break;
            }
        }
        
        let weather = jsonData.list[morningIndex].weather[0].main;
        let weatherMoreInfo = jsonData.list[morningIndex].weather[0].description;
        document.getElementById("currWeather").innerHTML = "Forecast weather at " + time + ": " + weatherMoreInfo;
        
        if(weather == "Rain") {
            document.getElementById("popupText").innerHTML = "Pack your umbrella";
        }
        else{
          document.getElementById("popupText").innerHTML = "Leave your umbrella";
          document.getElementById("umbrellaImage").src="images/logonorain.png";
        }
    });
    
  };
  
  const errorCallback = (error) => {
    console.log(error);
    document.getElementById("popupText").innerHTML = "ERROR";
    document.getElementById("currWeather").innerHTML = "ERROR";
  };
  
var coords = navigator.geolocation.getCurrentPosition(successCallback, errorCallback);