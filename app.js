"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const recipesList = document.getElementById("recipes-list");
function getRecipes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://dummyjson.com/recipes");
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            const result = yield response.json();
            return result.recipes;
        }
        catch (error) {
            console.error(error);
        }
    });
}
/**
 * Display all recipes fetched from API on the page
 *
 * @param recipes - recipes to print
 */
function printRecipes(recipes) {
    recipes.forEach(recipe => {
        const recipeElement = createRecipeElement(recipe);
        recipesList.insertAdjacentElement("beforeend", recipeElement);
    });
}
/**
 * Create HTML element for a single recipe
 *
 * @param recipe - recipe to parse
 * @returns div element with corresponding recipe
 */
function createRecipeElement(recipe) {
    const div = document.createElement("div");
    const name = document.createElement("h2");
    name.innerText = recipe.name;
    div.appendChild(name);
    // append info
    div.appendChild(createInfoElement(recipe));
    // append nutrition facts
    div.appendChild(createNutritionElement(recipe));
    // append picture
    const pic = document.createElement("img");
    pic.src = recipe.image;
    pic.width = 400;
    pic.classList.add("rounded");
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
function createInfoElement(recipe) {
    const infoDiv = document.createElement("div");
    infoDiv.innerHTML = `
        <span>${recipe.mealType}</span>
        |
        <span>${recipe.cuisine}</span>
        |
        <span>${recipe.prepTimeMinutes} mins</span>
        |
        <span>${recipe.cookTimeMinutes} mins</span>
    `;
    return infoDiv;
}
/**
 * Create sub HTML element with recipe nutrition info
 *
 * @param recipe - recipe object
 * @returns div with recipe nutrition information
 */
function createNutritionElement(recipe) {
    const nutritionDiv = document.createElement("div");
    nutritionDiv.innerHTML = `
        <span>${recipe.servings} servings</span>
        |
        <span>${recipe.caloriesPerServing} kcal</span>
        |
        <span>Difficulty: ${recipe.difficulty}</span>
    `;
    return nutritionDiv;
}
/**
 * Create sub HTML element with ingredients for a recipe
 *
 * @param ingredients - array of ingredients for the given recipe
 * @returns div with list of ingredients
 */
function createIngredientsElement(ingredients) {
    const ingredientsDiv = document.createElement("div");
    ingredientsDiv.insertAdjacentHTML("afterbegin", "<p>Ingredients</p>");
    const ingredientsList = document.createElement("ul");
    ingredients.forEach(ingredient => {
        const ingredientName = document.createElement("li");
        ingredientName.textContent = ingredient;
        ingredientsList.appendChild(ingredientName);
    });
    ingredientsDiv.appendChild(ingredientsList);
    return ingredientsDiv;
}
/**
 * Create sub HTML element with instructions how to cook the meal
 *
 * @param ingredients - array of instructions for the given recipe
 * @returns div with ordered list of instructions
 */
function createInstructionsElement(instructions) {
    const instructionsDiv = document.createElement("div");
    instructionsDiv.insertAdjacentHTML("afterbegin", "<p>Instructions</p>");
    const instructionsList = document.createElement("ol");
    instructions.forEach(instruction => {
        const instructionName = document.createElement("li");
        instructionName.textContent = instruction;
        instructionsList.appendChild(instructionName);
    });
    instructionsDiv.appendChild(instructionsList);
    return instructionsDiv;
}
/**
 * Create sub HTML element with meta info about recipe post
 *
 * @param recipe - recipe object
 * @returns div with meta info
 */
function createMediaElement(recipe) {
    const mediaDiv = document.createElement("div");
    mediaDiv.insertAdjacentHTML("afterbegin", `<p>Uploaded by user: ${recipe.userId}</p>
            <div id="ratings">
                <span>Rating: ${recipe.rating}</span>
                |
                <span>Reviews: ${recipe.reviewCount}</span>
            </div>
        `);
    return mediaDiv;
}
getRecipes().then(recipes => printRecipes(recipes));
