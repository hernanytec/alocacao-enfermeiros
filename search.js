//função para fazer a geração de um novo estado
String.prototype.inverseBit = function (index) {
    return this.substr(0, index) + ((parseInt(this.charAt(index)) + 1) % 2) + this.substr(index + 1)
}

//usada apenas para ser possível vizualizar melhor a mudança dos estados
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const costFunction = (state, e, t = 21) => {
    let cR1 = r1(state, e, t)
    let cR2 = r2(state, e, t)
    let cR3 = r3(state, e, t)
    let cR4 = r4(state, e, t)

    //console.log(cR1, cR2, cR3, cR4)
    return cR1 + cR2 + cR3 + cR4
}

//função usada para saber como comparar dois estados
//usada para auxiliar na ordenação
const compare = function (s1, s2) {
    if (s1 === s2)
        return 0
    else
        return costFunction(s1, inputE.value) < costFunction(s2, inputE.value) ? -1 : 1
}

const hillClimb = async function (state, e, t = 21) {
    let stack = []

    stack.push(state)

    while (stack.length > 0) {
        let actualState = stack.pop() //pega o primeiro estado e remove da pilha
        let actualCost = costFunction(actualState, e)

        await sleep(30)// para dar o delay na "animação" durante a busca
        for (let i = 0; i < e * t; i++) {
            let newState = actualState.inverseBit(i)
            let newCost = costFunction(newState, e)

            if (newCost < actualCost) {

                stack.push(newState)
                renderState(newState, e, t)
                console.log(newCost)
                break
            }
        }
    }
}

const steepestAscentHillClimb = async function (state, e, t = 21) {
    let queue = []

    let iterations = 0
    while (true) {

        if (costFunction(state, e) === 0) {
            break
        }
        else {
            let sucessors = []

            //gero os sucessores do estado
            for (let i = 0; i < e * t; i++) {
                const newState = state.inverseBit(i)

                if (costFunction(newState, e) < costFunction(state, e))
                    sucessors.push(newState)
            }

            sucessors.sort(compare)

            queue = [...sucessors, ...queue] //adiciona os sucessores na frente da fila

            if (queue.length === 0 || iterations === 100)
                break

            state = queue.shift() //pega o primeiro estado e remove da fila

            await sleep(1)// para dar o delay na "animação" durante a busca
            renderState(state, e, t)
            console.log(costFunction(state, e))
            iterations++
        }
    }
}

const bestFirst = async function (state, e, t = 21) {
    let array = []

    array.push(state)

    while (array.length > 0) {

        let actualState = array.shift()//pega a primeira posição do array e remove

        let stop = true
        for (let i = 0; i < t * e; i++) {
            const newState = actualState.inverseBit(i)

            if (costFunction(newState, e) < costFunction(actualState, e)) {
                array.push(newState)
                stop = false
            }
        }

        if (stop)
            break

        await sleep(1)// para dar o delay na "animação" durante a busca
        renderState(actualState, e)
        console.log(costFunction(actualState, e))
        array.sort(compare)
    }
}