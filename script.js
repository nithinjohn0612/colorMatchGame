//generating a random colour as the target
const generateRandomColour = () => {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };
};
console.log(generateRandomColour());

//coverting the colour object to a string
const colourToString = ({ r, g, b }) => {
  return `rgb(${r},${g},${b})`;
};
//getting the colour difference
const getColourDifference = (targetColour, playerColour) => {
  const rdiff = Math.abs(targetColour.r - playerColour.r);
  const gdiff = Math.abs(targetColour.g - playerColour.g);
  const bdiff = Math.abs(targetColour.b - playerColour.b);

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
const updateScore = (state) => {
  const colourDifference = getColourDifference(
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
const newGame = (state) => {
  return {
    ...state,
    targetColour: generateRandomColour(),
    gameOver: false,
    score: 0,
    playerColour: {
      r: 0,
      g: 0,
      b: 0,
    },
  };
};

//ui update
const updateUI = (state) => {
  document.getElementById("targetColourDisplay").style.backgroundColor =
    colourToString(state.targetColour);
  document.getElementById("playerColourDisplay").style.backgroundColor =
    colourToString(state.playerColour);
};

//updating sliding bar

  document.getElementById("redSlider").value = state.playerColour.r;
  document.getElementById("greenSlider").value = state.playerColour.g;
  document.getElementById("blueSlider").value = state.playerColour.b;

//updating the text value

document.getElementById("redValue").textContent = state.playerColour.r;
document.getElementById("greenValue").textContent = state.playerColour.g;
document.getElementById("blueValue").textContent = state.playerColour.b;

if (state.gameOver) {
  document.getElementById("message").textContent =
    "Congrats! you won with a match of 90%!";
  document.getElementById("submit").disabled = true;
  document.getElementById("newGame").style.display = "block";
  document.getElementById(
    "targetColour"
  ).textContent = `Target Colour: R:${state.targetColour.r} G:${state.targetColour.g} B:${state.targetColour.b}`;
} else {
  document.getElementById("message").textContent =
    "Try to match the target colour!";
  document.getElementById("submit").disabled = false;
  document.getElementById("newGame").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  let gameState = initialState;
  updateUI(gameState);

  document.getElementById("redSlider").addEventListener("input", (e) => {
    gameState = updatePlayerColour(gameState, "r", e.target.value);
    gameState = updateScore(gameState);
    updateUI(gameState);
    updateSlider(gameState);
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
    gameState = updateScore(gameState);
    if (gameState.score >= 90) {
      gameState.gameOver = true;
    }
    updateUI(gameState);
  });
  document.getElementById("newGame").addEventListener("click", () => {
    gameState = newGame(gameState);
    updateUI(gameState);
  });
});
