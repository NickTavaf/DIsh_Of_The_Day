document.addEventListener('DOMContentLoaded', function () {
    let recipieArray = [];

    async function fetchRecipeList() {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=pasta&number=50&apiKey=d4c53765791241da97a18f922697a36f`);
            if (!response.ok) {
                throw new Error('Failed to fetch recipe list');
            }
            const data = await response.json();
            recipieArray = data.results;
            triggerRecipie();
        } catch (error) {
            console.error("Error loading recipes:", error);
        }
    }

    async function triggerRecipie() {
        if (recipieArray.length === 0) return;

        const randomRecipe = recipieArray[Math.floor(Math.random() * recipieArray.length)];
        const recipeId = randomRecipe.id;

        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=d4c53765791241da97a18f922697a36f&includeNutrition=true`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            displayData(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    function displayData(data) {
        const recipieSection = document.getElementById('recipieSection');
        recipieSection.innerHTML = "";

        // ✅ Add date banner first
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const year = today.getFullYear();
        const dateString = `${month}/${day}/${year}`;

        const banner = document.createElement('p');
        banner.className = 'pasta-date';
        banner.textContent = `Your pasta today on ${dateString}`;
        recipieSection.appendChild(banner);

        // ✅ Add recipe content
        const recipieItem = document.createElement('div');
        const recipieIngredients = data.extendedIngredients;

        let formattedIngredients = recipieIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join("");

        recipieItem.innerHTML = `
            <h2 class="pasta-title">${data.title}</h2>
            <img class="pasta-photo" src='${data.image}' alt='recipe image' />
            <h3 class="ingredients-heading">Ingredients:</h3>
            <ul class="ingredients-list">${formattedIngredients}</ul>
        `;

        recipieSection.appendChild(recipieItem);
    }

    fetchRecipeList();
});
