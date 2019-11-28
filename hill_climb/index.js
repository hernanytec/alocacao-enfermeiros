let inputE = document.getElementById("inputE")

//Gera um estano incial com valores aleatórios de 0 e 1
const getInitialState = (e, t = 21) => {

    let state = ''
    for (let i = 0; i < e * t; i++)
        state += Math.round(Math.random())

    return state
}

const showInitalState = () => {
    initialState = getInitialState(inputE.value)
    renderState(initialState, inputE.value)
}

showInitalState()
inputE.onchange = showInitalState
inputE.onkeyup = showInitalState

const startSearch = () => {

    let serchType = document.querySelector('input[name="search"]:checked').value

    if (serchType === 'hc')
        hillClimb(initialState, inputE.value)

    else if (serchType === 'hc2')
        steepestAscentHillClimb(initialState, inputE.value)

    else
        bestFirst(initialState, inputE.value)
}