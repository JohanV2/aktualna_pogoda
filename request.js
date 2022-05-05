var httpRequest
var weather
let btn = document.getElementById("ajaxButton")
let userInput = document.querySelector("#input")
var requestFull
var requestMain = "http://api.openweathermap.org/data/2.5/weather?country=pl&appid=d5191dd8d94fb095413154a73038ce7d&units=metric&lang=pl&q="

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
            weather = JSON.parse(httpRequest.response)
            console.log(weather)

            console.log("weather: ", weather.name, weather.visibility);
        }
        else {
            console.log("problem: httpRequest status: " + httpRequest.status + ", probably wrong city name")
            userInput.value = ""
            return false
        }
    }
}

btn.addEventListener('click', getCityName)



