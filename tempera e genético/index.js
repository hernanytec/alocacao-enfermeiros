let inputE = document.getElementById("inputE")
let inputSetState = document.getElementById("setState")

//Gera um estado incial com valores aleatórios de 0 e 1
const getInitialState = (e, t = 21) => {

    let state = ''
    for (let i = 0; i < e * t; i++)
        state += Math.round(Math.random())

    return state
}

//exibe gera um estado alatório e exibe
const showInitalState = () => {
    initialState = getInitialState(inputE.value)
    renderState(initialState, inputE.value)
}

//recebe a entrada do usuário, coloca no formato de um estado e exibe
const updateState = () => {
    let value = inputSetState.value

    //tamanho máximo vai ser a quantidade de enfermeiros * 21 turnos
    let stringSize = inputE.value * 21

    let state = ''
    for (let i = 0; i < stringSize; i++)
        state += value[i] | 0   //se não tiver nada na string coloca zero

    initialState = state
    renderState(initialState, inputE.value)
}

//exibe o estado incial
showInitalState()

//toda vez que a quantidade de enfermeiros for alterada, gera e exibe um estado incial aleatório novamente
inputE.onchange = showInitalState
inputE.onkeyup = showInitalState


//atualiza o estado personalizado de acordo com o que o usuário digita no input
inputSetState.onkeyup = updateState


const startSearch = () => {

    //verifica qual dos dois algoritmos foi slecionado na interface
    let serchType = document.querySelector('input[name="search"]:checked').value


    //tempera simulada
    if (serchType === 'ts') {

        //recupera o valor de temperatura no input da interface
        let T = document.getElementById("inputT").value

        //se o input estiver vazio, define o valor da temperatura para 350 (padrão)
        if (T === '')
            T = 350

        ts(initialState, inputE.value, T)
    }
    //genético
    else
        ag(initialState, inputE.value)
}