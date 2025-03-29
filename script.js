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