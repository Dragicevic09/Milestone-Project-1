
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
const customWordInputContainer = document.getElementById("custom-word-input-container");
const customWordInput = document.getElementById("custom-word-input");
const customWordButton = document.getElementById("custom-word-button");

//Options values for buttons
let options = {
  fruits: [
    "Apple",
    "Blueberry",
    "Mandarin",
    "Pineapple",
    "Pomegranate",
    "Watermelon",
  ],
  animals: [
    "Panda",
    "Lion",
    "Tiger",
    "Capybara",
    "Markhor",
    "Gerenuk",
  ],
  wildWest: [
    "cowboy",
    "sheriff",
    "outlaw",
    "saloon",
    "revolver",
    "pony",
    "bandit",
    "cactus",
    "gold",
    "saddle",
    "marshal",
  ],
  countries: [ 
    "Serbia",
    "Russia",
    "Kyrgyzstan",
    "Switzerland",
    "Zimbabwe",
    "Croatia",
    "Afghanistan",
  ],
};

// Custom Word Input Button Click Event
customWordButton.addEventListener("click", () => {
    const customWord = customWordInput.value.trim();
    if (customWord.length > 0) {
      options.custom = [customWord];
      displayOptions();
      customWordInputContainer.classList.add("hide");
      customWordInput.value = "";
    }
  });
//count
let winCount = 0;
let count = 0;

let chosenWord = "";

// Display custom word input if the option is selected
const displayOptions = () => {
    optionsContainer.innerHTML += `<h3>Please Select A Wild West Word</h3>`;
    let buttonCon = document.createElement("div");
    for (let value in options) {
      buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
    }
  
    if (options.custom && options.custom.length > 0) {
      customWordInputContainer.classList.remove("hide");
    } else {
      customWordInputContainer.classList.add("hide");
    }
  
    optionsContainer.appendChild(buttonCon);
  };

//Block all the Buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//Word Generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //If optionValur matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

 
  userInputSection.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;

  //Initially erase all content and hide letteres and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      //if array contains clciked value replace the matched dash with letter else dram on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          
          if (char === button.innerText) {
            
            dashes[index].innerText = char;
            
            winCount += 1;
            
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              
              blocker();
            }
          }
        });
      } else {
       
        count += 1;
        
        drawMan(count);
        
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayOptions();
  
  let { initialDrawing } = canvasCreator();
  
  initialDrawing();
};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };
  const cowboyHat = () => {
    context.beginPath();
    context.rect(55, 10, 30, 10);
    context.fillStyle = "#000";
    context.fill();
    context.closePath();
  };
  
  const cowboyVest = () => {
    context.beginPath();
    context.rect(65, 40, 10, 20);
    context.fillStyle = "#8c52ff"; 
    context.closePath();
  };
  
  const cowboyBoots = () => {
    context.beginPath();
    context.rect(60, 100, 20, 15);
    context.fillStyle = "#000";
    context.fill();
    context.closePath();
  };
  
  
  const drawMan = (count) => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg, cowboyHat, cowboyVest, cowboyBoots } = canvasCreator();
    switch (count) {
      case 1:
        head();
        break;
      case 2:
        body();
        break;
      case 3:
        leftArm();
        break;
      case 4:
        rightArm();
        break;
      case 5:
        leftLeg();
        break;
      case 6:
        rightLeg();
        break;
      default:
        break;
      
    }
  
    
    cowboyHat();
    cowboyVest();
    cowboyBoots();
  };
  
  const initialDrawing = () => {
   
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
    drawLine(10, 130, 130, 130);
   
    drawLine(10, 10, 10, 131);
    
    drawLine(10, 10, 70, 10);
    
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;