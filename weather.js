


// To search for the city temperature inputs after entering city name 
    $('#searchBtn').on('click', function(){
        var searchTerm = $('#cityInput').val();

        money(searchTerm)
        fiveDays(searchTerm)
    })


// }

    // After saving the user's city choice in the variable, we use it to fetch the data from API
    async function money(){
        let searchTerm = $('#cityInput').val();
        var url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=c40b28aa33c2bef2881ab9e4f13c3ef7&units=metric`

    await fetch (url).then(function(data){return data.json()})
  
.then(function(response){
    // var city = [];

    // city.push(searchTerm);
    // console.log(city)
    // console.log(response)
 
    
    // And now we use the DOM to input the data for the current day and identified city 
    document.getElementById('cityName').innerHTML=`${response.name} ;`
    document.getElementById('cityTemp').innerHTML= `Temperature: ${response.main.temp}`
    document.getElementById('cityHumdity').innerHTML= `Humdity: ${response.main.humidity}`
    document.getElementById('cityPressure').innerHTML= `Pressure: ${response.main.pressure}`
    document.getElementById('cityWindSpeed').innerHTML= `Wind Speed: ${response.wind.speed}`
    document.getElementById('cityuvIndex').innerHTML= `UV Index: ${response.main}`
    

    uvIndex(response.coord.lat, response.coord.lon)

  
// To search for uv index
function uvIndex(lat, lon) {
    var urlUV= `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=bbc073b347a3714519af474103a431ab`

    $.ajax({
        url: urlUV,  
        method:'GET'
    })
    .then(function(response){ 
        // console.log("NEWWWWW")
        // console.log(response)

        //Appends UV Index to browser
        document.getElementById("cityuvIndex").innerHTML= `UV Index: ${response.value}`

    
        // To change the color of UV background 
        var cityUV = document.getElementById("cityuvIndex")
        var expense = response.value
        console.log(expense)
        if (expense <= 3) {
            cityUV.classList.add("good")
        } else if (expense >= 6) {
            cityUV.classList.add("bad")
        }else  {
            cityUV.classList.add("okay")
        }

    })
    }



// The date for the rest of the weeK: 
const today = new Date();
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate()+1)
const day3 = new Date(tomorrow)
day3.setDate(day3.getDate()+1)
const day4 = new Date(day3)
day4.setDate(day4.getDate()+1)
const day5 = new Date(day4)
day5.setDate(day5.getDate()+1)
const day6 = new Date(day5)
day6.setDate(day6.getDate()+1)


document.getElementById(`cardTime0`).innerHTML = tomorrow
document.getElementById(`cardTime1`).innerHTML = day3
document.getElementById(`cardTime2`).innerHTML = day4
document.getElementById(`cardTime3`).innerHTML = day5
document.getElementById(`cardTime4`).innerHTML = day6

})
};

//     To get city temperature for each of the 5 days 
    async function fiveDays(){
        let searchTerm = $(`#cityInput`).val();
        var url3= `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=bbc073b347a3714519af474103a431ab`
    
       await fetch(url3).then(function(data){return data.json()})

    //    console.log("url3")
    
    .then(function(response){
        var city5 = []
        city5.push(searchTerm);
        // console.log(city5)
        console.log(response)
        
        for (var i=0; i<5;i++){
            document.getElementById(`temperature${[i]}`).innerHTML=`Temperature: ${response.list[i].main.temp}`
            document.getElementById(`humdity${[i]}`).innerHTML=`Humdity: ${response.list[i].main.humidity}`
        
        }
    })
    }


// to store info on local storage


 $("#list").val(JSON.parse(localStorage.getItem("city")))


function changeText(){ 
    var list = document.getElementById('list')
    var newCity = document.getElementById('cityInput').value;
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(newCity));
    //push new city to City array
    
    var city =[]
    city.push(newCity)
    list.appendChild(entry);
    localStorage.setItem("entry", JSON.stringify(city))
    
}



