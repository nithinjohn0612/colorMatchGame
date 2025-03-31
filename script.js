//generating a random colour as the target
const generateRandomColour = () => {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };
};


//coverting the colour object to a string
const colourToString = ({r, g, b}) => 
  `rgb(${r},${g},${b})`;
;
//getting the colour difference
const getColourDifference = (playerColour,targetColour) => {
  const rdiff = Math.abs(playerColour.r - targetColour.r);
  const gdiff = Math.abs(playerColour.g - targetColour.g);
  const bdiff = Math.abs(playerColour.b - targetColour.b);

  //some math formula to get the colour difference
  const formulaInMath = Math.sqrt(
    rdiff * rdiff + gdiff * gdiff + bdiff * bdiff
  );
  return Math.max(0, Math.floor(100 - (formulaInMath / 441.67) * 100));
};
//intial state
const createIntialState = () => ({
  targetColour: generateRandomColour(),
  playerColour: { r: 0, g: 0, b: 0 },
  score: 0,
  gameOver: false,
});
//getting the initial state
const initialState = createIntialState();

//updating the player's colour
const updatePlayerColour = (state, channel, value) => {
  return {
    ...state,
    playerColour: {
      ...state.playerColour,
      [channel]: Number(value),
    },
  };
};

//submit
const submitGuess = state => {
  const score = getColourDifference(
    state.targetColour,
    state.playerColour
  );

  return {
    ...state,
    score,
    gameOver: score >= 90,
  };
};

//start a new game
const newGame = state => {
  return {
    ...state,
    targetColour: generateRandomColour(),
    score: 0,
    playerColour: {
      r: 128,
      g: 128,
      b: 128,
    },
    gameOver: false,
  };
};

//ui update
const updateUI = state => {
  document.getElementById("targetColour").style.backgroundColor =
    colourToString(state.targetColour);
  document.getElementById("playerColour").style.backgroundColor =
    colourToString(state.playerColour);


  document.getElementById("redSlider").value = state.playerColour.r;
  document.getElementById("greenSlider").value = state.playerColour.g;
  document.getElementById("blueSlider").value = state.playerColour.b;

//updating the text value

document.getElementById("redValue").textContent = state.playerColour.r;
document.getElementById("greenValue").textContent = state.playerColour.g;
document.getElementById("blueValue").textContent = state.playerColour.b;

//update score
document.getElementById("score").textContent = state.score;

if (state.gameOver) {
  document.getElementById("message").textContent =
    "Congrats! you won with a match of 90%!";
  document.getElementById("submit").disabled = true;
  document.getElementById("newGame").style.display = "block";
 
} else {
  document.getElementById("message").textContent =
    "Try to match the target colour!";
  document.getElementById("submit").disabled = false;
  document.getElementById("newGame").style.display = "none";
}
}

document.addEventListener("DOMContentLoaded", () => {
  let gameState = initialState;
  updateUI(gameState);

  document.getElementById("redSlider").addEventListener("input", (e) => {
    gameState = updatePlayerColour(gameState, "r", e.target.value);
   
    updateUI(gameState);
   
  });
  document.getElementById("greenSlider").addEventListener("input", (e) => {
    gameState = updatePlayerColour(gameState, "g", e.target.value);

    updateUI(gameState);
  });
  document.getElementById("blueSlider").addEventListener("input", (e) => {
    gameState = updatePlayerColour(gameState, "b", e.target.value);
    updateUI(gameState);
  });
  document.getElementById("submit").addEventListener("click", () => {
    gameState = submitGuess(gameState);
    
    updateUI(gameState);
  });
  document.getElementById("newGame").addEventListener("click", () => {
    gameState = newGame(gameState);
    updateUI(gameState);
  });
});
