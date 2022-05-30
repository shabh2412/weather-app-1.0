const apiKey = '43ed6738c20d2ba60cf5ebc75619570c';

const url = `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&units=metric`

function getData() {
    let cityName = document.getElementById('city').value;
    requestWeather(cityName);
}

async function requestWeather(cityName) {
    console.log('fetching data');
    try {
        const query = `${url}&q=${cityName}`;
        let response = await fetch (query);
        let data = await response.json();
        displayWeather(data);
        console.log(data);
    }
    catch (err) {
        console.log(err);
    }
}

function displayWeather (data) {
    let weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = null;

    let card = document.createElement('div');
    card.classList = 'card bg-primary p-0 border-primary mx-auto text-white';
    card.style.width = '18rem';

    let cardBody = document.createElement('div');
    cardBody.classList = 'card-body text-center';

    let locationName = document.createElement('h5');
    locationName.innerText = data.name;

    let temp =document.createElement('p');
    temp.innerText = `Temp : ${data.main.temp}°C`;

    let humidity = document.createElement('p');
    humidity.innerText = `Humidity : ${data.main.humidity}`;

    cardBody.append(locationName,temp,humidity);
    card.append(cardBody);
    weatherResult.append(card);
    let gmap_canvas = document.getElementById('gmap_canvas');
    gmap_canvas.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
}


async function getWeatherByLocation(lat,long) {
    const query = `${url}&lat=${lat}&lon=${long}`;
    let response = await fetch (query);
    let data = await response.json();
    displayWeather(data);
}

function getUserLocation () {
    navigator.geolocation.getCurrentPosition(success,error);

    function success (position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        getWeatherByLocation(lat,long);

        console.log(lat);
        console.log(long);
    }


    function error() {
        alert('Unable to retrieve your location');
    }
      
    // console.log(loc);
}

getUserLocation();

// requestWeather();