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