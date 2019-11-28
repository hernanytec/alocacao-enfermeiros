//função para fazer a geração de um novo estado
String.prototype.inverseBit = function (index) {
    return this.substr(0, index) + ((parseInt(this.charAt(index)) + 1) % 2) + this.substr(index + 1)
}

//usada apenas para ser possível vizualizar melhor a mudança dos estados
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(max, min = 0) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
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

//tempora simulada
const ts = async function (actualState, e, temperature, t = 21) {
    let T = temperature// valor inicial de temperatura
    let c = 0.9//fator de diminuição da temperatura
    let stop = 0 // se chegar em 1000 iterações sem aceitar um novo estado, para o laço.
    let count_iter = 1; //contador de iterações

    //critério de aceitação de Boltzmann
    const P = (dE, T) => {
        if (dE < 0)
            return 1
        return Math.pow(Math.E, -dE / T)
    }

    while (T > 0) {
        // ao invés de gerar todos os estados e escolher um
        // sorteio uma posição aleatória na string para trocar o valor e criar o novo estado
        let randBit = getRandomInt(actualState.length)
        let newState = actualState.inverseBit(randBit)

        let E = costFunction(actualState, e)

        //para se não estiver violando nenhuma restrição
        //ou se já tiver dado 1000 iterações sem melhorar
        if (E === 0 || stop === 1000)
            break

        let E_ = costFunction(newState, e)

        //variação de custo
        let dE = E_ - E

        if (P(dE, T) >= Math.random()) {
            actualState = newState
            console.log(`${E_} restrições violadas`)
            stop = 0//zero o critério de parada

            await sleep(.5)// para dar o delay na "animação" durante a busca
            renderState(actualState, e, t)
        }
        stop++
        count_iter++;
        //atualização da temperatura
        T *= c
    }

    alert(`Busca finalizada em ${count_iter} iterações\n${costFunction(actualState, e)} restrições ainda estão violadas`)
}

//algoritmo genético
const ag = async function (actualState, e, t = 21) {

}