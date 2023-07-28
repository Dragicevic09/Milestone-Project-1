const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-conatiner");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

let options = {
    fruits:[
        "Apple",
        "Strewberry",
        "Blueberry",
        "pineapple",
        "Watermelon",
        "Apple",
        "Peach",
    ],
    animals: ["Dog", "Cat", "wolf", "Lion", "Tiger", "Panther", "Rhinoceros", "Zebra"],
    countries: [
        "USA",
        "Russia",
        "Kyrgyzstan",
        "Zimbabow",
        "Serbia",
        "Germany",
        "Spain",
        "Mexico",
    ]
};

