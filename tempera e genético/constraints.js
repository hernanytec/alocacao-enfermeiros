/**
 * Funções de restrição 
 * cada função retorna a quantidade de vezes 
 * que não é obedecida em um determinado estado
 */


//Deve haver ao menos 1 enfermeiro e no máximo 3 enfermeiros em cada turno.
const r1 = (state, e, t = 21) => {
    let violations = 0

    for (let i = 0; i < t; i++) {
        let tur = ''

        //pega a substring referente a todos os enfermeiros em um turno
        for (let j = 0; j < e; j++) {
            tur += state[i + j * t]
        }

        let w = (tur.match(/1/g) || []).length //conta a quantidade de 1's na string

        //incrementa o número de violações dessa restrição
        if (w < 1)
            violations += 100 //considero muito pior o fato de não ter nenhum enfermeiro em um turno
        else if (w > 3)
            violations += w - 3 //incrementa com o excedente
    }
    return violations
}

//Cada enfermeiro deve ser alocado em 5 turnos por semana.
const r2 = (state, e, t = 21) => {

    let violations = 0
    let k = 0

    for (let i = 0; i < e; i++) {
        let enf = state.substring(k, k + t) //pega a substring referente a todos os turnos de um enfermeiro
        let w = (enf.match(/1/g) || []).length //conta a quantidade de 1's na string

        //incrementa o número de violações dessa restrição
        if (w !== 5)
            violations += Math.abs(w - 5)

        k += t
    }

    return violations
}

//Nenhum enfermeiro pode trabalhar mais que 3 turnos seguidos sem folga.
const r3 = (state, e, t = 21) => {
    let violations = 0
    let k = 0

    for (let i = 0; i < e; i++) {
        let enf = state.substring(k, k + t) //pega a substring referente a todos os turnos de um enfermeiro
        let w = (enf.match(/1111/g) || []).length //conta a quantidade de 1's na string

        //incrementa o número de violações dessa restrição
        if (w > 0)
            violations += w

        k += t
    }

    return violations
}

/**
 * Enfermeiros preferem consistência em seus horários, ou seja, eles preferem
 * trabalhar todos os dias da semana no mesmo turno (dia, noite, ou madrugada).
 */
const r4 = (state, e, t = 21) => {
    let violations = 0
    let k = 0

    for (let i = 0; i < e; i++) {
        let d = 0, n = 0, m = 0

        let enf = state.substring(k, k + t) //pega a substring referente a todos os turnos de um enfermeiro

        for (let j = 0; j < t - 3; j += 3) {//percorre por todos os horários do enfermeiro
            let h = enf.substring(j, j + 3)
            d += parseInt(h[0])//dia
            n += parseInt(h[1])//noite
            m += parseInt(h[2])//madrugada
        }

        const max = Math.max(d, n, m)

        //incrementa o número de violações dessa restrição
        //caso só esteja agendado em um mesmo horário, não vai adicionar nada
        violations += d + n + m - max

        k += t
    }

    return violations
}