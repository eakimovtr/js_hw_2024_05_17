const recipesList = document.getElementById("recipes-list");

type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string;
};

async function getRecipes() {
    try {
        const response = await fetch("https://dummyjson.com/recipes");

        if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result.recipes as Recipe[];

    } catch (error) {
        console.error(error);
    }
}

/**
 * Display all recipes fetched from API on the page
 * 
 * @param recipes - recipes to print
 */
function printRecipes(recipes: Recipe[]): void {
    recipes.forEach(recipe => {
        const recipeElement = createRecipeElement(recipe);
        recipesList.insertAdjacentElement("beforeend", recipeElement);
    })
}

/**
 * Create HTML element for a single recipe
 * 
 * @param recipe - recipe to parse
 * @returns div element with corresponding recipe
 */
function createRecipeElement(recipe: Recipe): HTMLElement {
    const div = document.createElement("div");
    
    const name = document.createElement("h2");
    name.innerText = recipe.name;
    div.appendChild(name);
    
    // append info
    div.appendChild(createInfoElement(recipe))

    // append nutrition facts
    div.appendChild(createNutritionElement(recipe))

    // append picture
    const pic = document.createElement("img");
    pic.src = recipe.image;
    pic.width = 400;
    pic.classList.add("rounded")
    div.appendChild(pic);

    // append ingredients
    div.appendChild(createIngredientsElement(recipe.ingredients));

    // append instructions
    div.appendChild(createInstructionsElement(recipe.instructions));

    // append media info
    div.appendChild(createMediaElement(recipe));

    return div;
}

/**
 * Create sub HTML element with recipe additional info
 * 
 * @param recipe - recipe object
 * @returns div with recipe additional information
 */
function createInfoElement(recipe: Recipe): HTMLElement {
    const infoDiv = document.createElement("div");
    infoDiv.innerHTML = `
        <span>${recipe.mealType}</span>
        |
        <span>${recipe.cuisine}</span>
        |
        <span>${recipe.prepTimeMinutes} mins</span>
        |
        <span>${recipe.cookTimeMinutes} mins</span>
    `
    return infoDiv;
}

/**
 * Create sub HTML element with recipe nutrition info
 * 
 * @param recipe - recipe object
 * @returns div with recipe nutrition information
 */
function createNutritionElement(recipe: Recipe): HTMLElement {
    const nutritionDiv = document.createElement("div");
    nutritionDiv.innerHTML = `
        <span>${recipe.servings} servings</span>
        |
        <span>${recipe.caloriesPerServing} kcal</span>
        |
        <span>Difficulty: ${recipe.difficulty}</span>
    `
    return nutritionDiv;
}

/**
 * Create sub HTML element with ingredients for a recipe
 * 
 * @param ingredients - array of ingredients for the given recipe
 * @returns div with list of ingredients
 */
function createIngredientsElement(ingredients: string[]): HTMLElement {
    const ingredientsDiv = document.createElement("div");
    ingredientsDiv.insertAdjacentHTML("afterbegin", "<p>Ingredients</p>");
    
    const ingredientsList = document.createElement("ul");
    ingredients.forEach(ingredient => {
        const ingredientName = document.createElement("li");
        ingredientName.textContent = ingredient;
        
        ingredientsList.appendChild(ingredientName);
    })

    ingredientsDiv.appendChild(ingredientsList)
    return ingredientsDiv;
}

/**
 * Create sub HTML element with instructions how to cook the meal
 * 
 * @param ingredients - array of instructions for the given recipe
 * @returns div with ordered list of instructions
 */
function createInstructionsElement(instructions: string[]): HTMLElement {
    const instructionsDiv = document.createElement("div");
    instructionsDiv.insertAdjacentHTML("afterbegin", "<p>Instructions</p>");
    
    const instructionsList = document.createElement("ol");
    instructions.forEach(instruction => {
        const instructionName = document.createElement("li");
        instructionName.textContent = instruction;
        
        instructionsList.appendChild(instructionName);
    })

    instructionsDiv.appendChild(instructionsList)
    return instructionsDiv;
}

/**
 * Create sub HTML element with meta info about recipe post
 * 
 * @param recipe - recipe object
 * @returns div with meta info
 */
function createMediaElement(recipe: Recipe): HTMLElement {
    const mediaDiv = document.createElement("div");
    mediaDiv.insertAdjacentHTML("afterbegin", 
        `<p>Uploaded by user: ${recipe.userId}</p>
            <div id="ratings">
                <span>Rating: ${recipe.rating}</span>
                |
                <span>Reviews: ${recipe.reviewCount}</span>
            </div>
        `);

    return mediaDiv;
}

getRecipes().then(recipes => printRecipes(recipes));