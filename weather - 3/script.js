document.querySelector('.busca').addEventListener('submit', async(event) => {
    event.preventDefault(); //tira o comportamento padrão do component form


    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        clearInfo()
        showWarning('Carregando ...')

        let city_name = encodeURI(input); //converte tirando os espaços e formatando como deve ser passado na uri/url
        let API_key = '83bd1b925274b198c28a2ad759c28336' //pega do site https://home.openweathermap.org

        let baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&units=metric&lang=pt_br`

        let results = await fetch(baseUrl);
        let json = await results.json();
        console.log(json)

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                descriptionWeather: json.weather[0].description,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else {
            clearInfo()
            showWarning('Não encontramos esta localização')
        }
    } else {
        clearInfo()
    }
})


function showInfo(json) {
    showWarning('');


    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`
    document.querySelector('.descriptionWeather').innerHTML = json.descriptionWeather

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.ventoPonto').setAttribute('style', `transform: rotate(${json.windAngle - 90}deg)`)
        // document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`

    document.querySelector('.resultado').style.display = 'block';
}


function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';

}