/* Global Variables */
const APIKEY = '1f9ac39956d8ff24e3995c081f55d91b';
const baseURL ='http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const btn = document.querySelector('#generate');

btn.addEventListener('click', (e) => {
    e.preventDefault();
    const zipcode = document.querySelector('#zip').value;
    const feelings = document.querySelector('#feelings').value;
    if (zipcode.length === 0) {
        alert("Zip code is required!");
        return
      }
    console.log(zipcode);

    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&APPID=${APIKEY}`)
    .then( res => res.json())
    .then( data =>{
        //send to server
        postData('http://localhost:3000/all',
         {temperature: data.main.temp, date: newDate, userResponse: feelings } )

        .then(function() {
            updateUI()
        })
    })
});

    
    const postData = async (url = '', data = {}) => {
        const postRequest = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }
    
    const updateUI = async () => {
        const request = await fetch('http://localhost:3000/all');
        try {
            const data = await request.json();
            console.log('Print data');
            console.log(data);
            document.getElementById('date').innerHTML = data.date;
            document.getElementById('temp').innerHTML = data.temperature;
            document.getElementById('content').innerHTML = data.userResponse;
        }
        catch (error) {
            console.log('error', error);
        }
    }