const windspeed = document.querySelector('.wind-speed')
const humidityPercent = document.querySelector('.humidity-percent')
const cityValueElement = document.querySelector('.city-name')
const inputBtn = document.querySelector('.input-btn')
const weatherLogo = document.querySelector('.main-weather-logo')
const cityTemp = document.querySelector('.temp')
let mainCity = document.querySelector('.temp-city')


inputBtn.onclick = getCity;
let cityName = ''



// get city name from value
function getCity() {
    cityName = cityValueElement.value
    apiCall(cityName)
    document.querySelector('.weather-data').style.display = "block"
}


// api call for getting the current weather report
async function apiCall (city) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=4c62e964584d484eb8a132159240202&q=${city}`)
    .then(res => res.json())
    .then(data => {    
        actualHumidity = data.current.humidity
        windSpeed = data.current.wind_kph
        city = data.location.name
        temp = data.current.temp_c
        url = data.current.condition.icon
        weathertext = data.current.condition.text
        changingWeather(weathertext, temp)
        printData(city, temp, url, windSpeed, actualHumidity)
    })
    }


    // printing out the weather report
function printData (city, temp, url, wind, humidity) {
    mainCity.textContent = city;
    cityTemp.textContent = `${temp} C`;
    windspeed.textContent = `${wind} km/h`;
    humidityPercent.textContent = `${humidity}%`;
    weatherLogo.innerHTML = `<img src="${url}">`
}

function changingWeather (weatherCondition) {
    if (weatherCondition === 'Mist') {
        weatherLogo.src = `img/mist.png`
        console.log("The weather is mist")
    } else if(weatherCondition === 'Clear' || weatherCondition === 'Sunny') {
        weatherLogo.src = `img/clear.png`
        console.log("The weather is clear/sunny")
    } else if (weatherCondition === 'Partly cloudy') {
        weatherLogo.src = `img/clouds.png`
        console.log("The weather is party cloudy")
    } else if (weatherCondition === 'Light rain' || weatherCondition === 'Patchy rain nearby') {
        weatherLogo.src = `img/rain.png`
    }
}



// light and dark mode togglelling


// Icons
const sunIcon = document.querySelector('.light-mode')
const moonIcon = document.querySelector('.dark-mode')

// Theme Vars
const userTheme = localStorage.getItem("theme")
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;


// Icon Toggling
const iconToggle = () => {
    sunIcon.classList.toggle("display-none")
    moonIcon.classList.toggle("display-none")
}

// Intial Theme Check
const themeCheck = () => {
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
        document.documentElement.classList.add("dark")
        moonIcon.classList.add("display-none")
        return
    }
    sunIcon.classList.add("display-none")
}

// manual theme swtich
const themeSwitch = () => {
    if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light")
        iconToggle()
        return
    }
    document.documentElement.classList.add("dark")
    localStorage.setItem("theme", "dark")
    iconToggle()
}

// call theme switch on clicking buttons
sunIcon.addEventListener("click", () => {
    themeSwitch();
})

moonIcon.addEventListener("click", () => {
    themeSwitch();
})

// invoke theme check on intial load
themeCheck();














