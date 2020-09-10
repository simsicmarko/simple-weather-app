const apiData = {
    key: "763cbb6cce33cb9118de29ebba163819",
    baseurl: "https://api.openweathermap.org/data/2.5/"
};

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(event){
    if(event.keyCode == 13) {
        getResults(searchBox.value);
    }
};

function getResults(query) {
    fetch(`${apiData.baseurl}weather?q=${query}&units=metric&APPID=${apiData.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');

    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weatherElement = document.querySelector('.current .weather');
    weatherElement.innerText = weather.weather[0].main;

    let highestLowest = document.querySelector('.hi-low');
    highestLowest.innerText = `min / max: ${Math.round(weather.main.temp_min)}°c /${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder (createDate) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[createDate.getDay()];
    let date = createDate.getDate();
    let month = months[createDate.getMonth()];
    let year = createDate.getFullYear();
  
    return `${day}, ${date} ${month} ${year}`;
  }