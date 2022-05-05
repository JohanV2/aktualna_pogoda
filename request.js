var httpRequest
var weather
let btn = document.getElementById("ajaxButton")
let userInput = document.querySelector("#input")

let cityField = document.querySelector("#city")
let weatherTypeField = document.querySelector("#weather_type")
let temperatureField = document.querySelector("#temperature")
let pressureField = document.querySelector("#pressure")
let visibilityField = document.querySelector("#visibility")
let windSpeedField = document.querySelector("#wind_speed")
let windHeadingField = document.querySelector("#wind_heading")


var requestFull
var requestMain = "http://api.openweathermap.org/data/2.5/weather?country=pl&appid=d5191dd8d94fb095413154a73038ce7d&units=metric&lang=pl&q="
var weatherFull = {
    city: "",
    weatherType: "",
    temperature: "",
    pressure: "",
    visibility: "",
    windSpeed: "",
    windHeading: ""
}

const getCityName = () => {
    if (userInput.value == "") {
        return
    }
    requestFull = requestMain.concat(userInput.value)
    makeRequest()
}

function makeRequest() {
    httpRequest = new XMLHttpRequest()
    if (httpRequest == !0) {
        alert("cannot create an XMLHTTP instance")
        return
    }
    httpRequest.onreadystatechange = showRequest
    httpRequest.open("GET", requestFull)
    httpRequest.send()
}

function showRequest() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            console.log(httpRequest)
            weatherResponse = JSON.parse(httpRequest.response)
            console.log(weatherResponse)
            console.log("weather: ", weatherResponse.name, weatherResponse.visibility);


            weatherFull.city = weatherResponse.name
            cityField.textContent = weatherFull.city

            weatherFull.weatherType = weatherResponse.weather[0].description
            weatherTypeField.textContent = weatherFull.weatherType

            weatherFull.temperature = weatherResponse.main.temp
            temperatureField.textContent = weatherFull.temperature + " stC"

            weatherFull.pressure = weatherResponse.main.pressure
            pressureField.textContent = weatherFull.pressure + " hPa"

            weatherFull.visibility = weatherResponse.visibility
            visibilityField.textContent = weatherFull.visibility + " m"

            weatherFull.windSpeed = weatherResponse.wind.speed
            windSpeedField.textContent = weatherFull.windSpeed + " m/s"

            weatherFull.windHeading = weatherResponse.wind.deg
            windHeadingField.textContent = weatherFull.windHeading + " st"
        }
        else {
            alert("problem: httpRequest status: " + httpRequest.status + ", probably wrong city name")
            return false
        }
    }
    userInput.value = ""
}

btn.addEventListener('click', getCityName)



