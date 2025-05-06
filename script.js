
document.addEventListener('DOMContentLoaded', function() {
let recipieBtn = document.getElementById("recipieBtn");
let recipieArray = []

fetchRecipieList();

recipieBtn.addEventListener("click", triggerRecipie);



async function fetchRecipieList() {
    try {
        // const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=pasta&number=50&apiKey=d4c53765791241da97a18f922697a36f`);
       
        const response = await fetch(`./recipie_list.json`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // showData(data);
        console.log(data);

        recipieArray = data.results;
    }
    catch(error){
        console.error('Fetch error:', error);
    };
}


//Display Recipie
async function triggerRecipie() {
    //console.log("start fiding recipie");

    try {
        // const response = await fetch(`https://api.spoonacular.com/recipes/716429/information?apiKey=d4c53765791241da97a18f922697a36f&includeNutrition=true`);

        const response = await fetch(`./specific_recipie.json`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // showData(data);
        console.log(data);

        displayData(data);
    }
    catch(error){
        console.error('Fetch error:', error);
    };

}
});

function displayData(data) {
    console.log(data.image);

    const recipieSection = document.getElementById('recipieSection');
    const recipieItem = document.createElement('div');

    const recipieIngredients = data.extendedIngredients;

    //console.log(recipieIngredients);

    let formattedIngredients = [];

    recipieIngredients.forEach(function(ingredient) {
        const recipieString = `<li>${ingredient.name}</li>`;

        formattedIngredients.push(recipieString);
    });

    recipieSection.innerHTML = formattedIngredients;

    recipieItem.innerHTML = `
        <p>The recipie image URL is: ${data.image}</p>
        <img src='${data.image}' alt='recipie image' />
    `;

    recipieSection.appendChild(recipieItem);
}








/*

document.addEventListener('DOMContentLoaded', fetchArtData);



async function fetchArtData() {
    
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/716429/information?apiKey=d4c53765791241da97a18f922697a36f&includeNutrition=true`)

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // showData(data);
        console.log(data);
    }
    catch(error){
        console.error('Fetch error:', error);
    };
};

*/

// function showData(data){
//     console.log(data);
//     console.log(data.weather[0].description);
//     //Create your front end here

//     //convert temp from celcius to farenheit
//     let temp_cel = data.main.temp;
//     let temp_fah = (temp_cel * 9/5) + 32;

//     //get the weather description and location
//     let weather_desc = data.weather[0].description;
//     let location = data.name;

//     //get element in html and append data
//     const weatherSection = document.getElementById('weatherSection');
//     const weatherItem = document.createElement('div');

//     weatherItem.innerHTML = `
//         <hr>
//         <ul>
//         <li>The location is ${location}</li>
//         <li>The forecast is ${weather_desc}</li>
//         <li>The temperature in farenheit is ${temp_fah.toFixed(2)} degrees</li>
//         <ul>
//         <p> </p>
//     `;

//     weatherSection.appendChild(weatherItem);

// }

//https://api.spoonacular.com/recipes/complexSearch?query=pasta&number=50&apiKey=d4c53765791241da97a18f922697a36f