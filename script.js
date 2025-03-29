//intial state
const createIntialState = ()=>({
    targetColour:a_function(),
    playerColour:{r:0,g:0,b:0},
    score:0,
    gameOver:false
})

//generating a random colour as the target
const generateRandomColour = () =>{
    return {
        r:Math.floor(Math.random() * 256),
        g:Math.floor(Math.random() * 256),
        b:Math.floor(Math.random() * 256)
    }
}
console.log(generateRandomColour())

//coverting the colour object to a string
const colourToString = ({r,g,b}) =>{
    return `rgb(${r},${g},${b})`
}
//getting the colour difference
const getColourDifference = (targetColour,playerColour) =>{
    return Math.abs(targetColour.r - playerColour.r) + Math.abs(targetColour.g - playerColour.g) + Math.abs(targetColour.b - playerColour.b)
}
//getting the initial state
const initialState = createIntialState()

//updating the player's colour
const updatePlayerColour = (state,channel,value) =>{
    return {
        ...state,
        playerColour:{
            ...state.playerColour,
            [channel]:Number(value)
        }
        
    }
}

//updating the score
const updateScore = (state) =>{
    const colourDifference = getColourDifference(state.targetColour,state.playerColour)
    const score = 100 - colourDifference
    return {
        ...state,
        score:score
    }
}
//start a new game
const newGame = (state) =>{
    return {
        ...state,
        targetColour:generateRandomColour(),
        gameOver:false,
        score:0,
        playerColour:{
            r:0,
            g:0,
            b:0
        }
    }
}

//ui update
const updateUI = (state) =>{
    document.getElementById('target-colour').style.backgroundColor = colourToString(state.targetColour)
    document.getElementById('player-colour').style.backgroundColor = colourToString(state.playerColour)
}

//updating sliding bar
const updateSlider = (state) =>{
    document.getElementById('red').value = state.playerColour.r
    document.getElementById('green').value = state.playerColour.g
    document.getElementById('blue').value = state.playerColour.b
}
//updating the score