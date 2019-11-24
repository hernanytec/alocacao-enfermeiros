cleanContanier = () => {
    document.body.removeChild(document.getElementById('container'))

    let container = document.createElement('table')
    container.setAttribute('id', 'container')
    document.body.appendChild(container)
}

const renderState = (state, e, t = 21) => {
    cleanContanier()
    let board = document.getElementById('container')

    for (let i = 0; i <= e; i++) {
        let row = document.createElement("tr")

        for (let j = 0; j <= t; j++) {
            let collumn = document.createElement("td")
            collumn.classList.add('table-header')

            if (i === 0 && j === 0) {
                let txt = document.createTextNode("-")
                collumn.append(txt)
            }
            else if (i === 0) {
                let txt = document.createTextNode('T' + j)
                collumn.append(txt)
            }
            else if (j === 0) {
                let txt = document.createTextNode('E' + i)
                collumn.append(txt)
            } else {
                collumn.classList.remove('table-header')
                let value = state[(i - 1) * t + (j - 1)]
                let txt = document.createTextNode(value)

                if (value == '1')
                    collumn.classList.add('green')
                collumn.append(txt)
            }

            row.appendChild(collumn);
        }

        board.appendChild(row)
    }
}