const apiKey="418797bd52fd40b1bd23bddb65d1d5c1";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


let text=document.querySelector("#text");
let btn=document.querySelector("#btn");
const weatherIcon=document.querySelector(".weatherIcon");

async function checkWeather(city){
    const response= await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status==404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weatherAbout").style.display="none";

    }else{
        var data=await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".temp").innerHTML=Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
        document.querySelector(".wind").innerHTML=data.wind.speed + "km/h";

        if(data.weather[0].main=="Clouds"){
            weatherIcon.src="cloud.png ";
        }else if(data.weather[0].main=="Clear"){
            weatherIcon.src="clear.png";
        }else if(data.weather[0].main=="Rain"){
            weatherIcon.src="rain.png";
        }else if(data.weather[0].main=="Haze"){
            weatherIcon.src="haze.png ";
        }else if(data.weather[0].main=="Mist"){
            weatherIcon.src="mist.jpeg ";
        }else if(data.weather[0].main=="Fog"){
            weatherIcon.src="fog.png";
        }
        let date=new Date(data.sys.sunrise * 1000);
        let hrs=date.getHours();
        //console.log(rhs)
        let min=date.getMinutes();

        document.querySelector(".rise p").innerHTML=(`${hrs}:${min} AM`);
        let time=new Date(data.sys.sunset * 1000);
        let nhrs=time.getHours();
        let nmin=time.getMinutes();
        document.querySelector(".set p").innerHTML=(`${nhrs}:${nmin} PM`);


        document.querySelector(".weatherAbout").style.display="block";
        document.querySelector(".error").style.display="none";

    }   
}
btn.addEventListener("click",()=>{
    checkWeather(text.value);
});
