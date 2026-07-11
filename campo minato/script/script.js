let row = +prompt("Righe")
let col = +prompt("Colonne")
let mine = +prompt("Bombe")
let campo = []
let flag = 0
let campoMinato = document.getElementById("campoMinato")
campoMinato.style.display = "grid"
campoMinato.style.gridTemplateColumns = `repeat(${col},1fr)`
campoMinato.style.width = `${row * 50}px`
campoMinato.style.height = `${col * 50}px`

for (let i = 0; i < row; i++) {
    let r = []
    for (let j = 0; j < col; j++) {
        let c = {
            row: i,
            col: j,
            mine: false,
            clicked: false,
            bombAround: 0,
            flag: false
        }
        r.push(c)
    }
    campo.push(r)
}
// for(let i = 0;i<row;i++){
//     for(let j = 0; j<col;j++){
//         campo[i][j].row = i
//         campo[i][j].col = j
//     }
// }
for (let i = 0; i < mine; i++) {
    let r = Math.floor(Math.random() * row)
    let c = Math.floor(Math.random() * col)
    if (!(campo[r][c].mine)) {
        campo[r][c].mine = true

    } else {
        i--
    }
}
for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
        let div = document.createElement("div")
        div.classList.add("cella")
        div.dataset.row = i
        div.dataset.col = j
        campoMinato.appendChild(div)
    }
}
function bomba(x, y) {

}
let celle = document.querySelectorAll(".cella")
celle.forEach((cella) => {
    cella.addEventListener("click", function () {
        let c = parseInt(this.dataset.col); 
        let r = parseInt(this.dataset.row);

        if (campo[r][c].flag) return;

        if (campo[r][c].mine) {
            alert("Hai perso");
            //location.reload();
        } else {
            rilevacellevuote(r, c);
        }
    });
});function rilevacellevuote(r, c) {
    if (r < 0 || r >= row || c < 0 || c >= col || campo[r][c].clicked || campo[r][c].flag) {
        return;
    }

    campo[r][c].clicked = true;

    let div = document.querySelector(`.cella[data-row="${r}"][data-col="${c}"]`);
    if (div) {
        div.style.backgroundColor = "grey";
    }

    let contaBombe = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let nr = r + i;
            let nc = c + j;
            if (nr >= 0 && nr < row && nc >= 0 && nc < col) {
                if (campo[nr][nc].mine) {
                    contaBombe++;
                }
            }
        }
    }
    campo[r][c].bombAround = contaBombe;

    if (contaBombe > 0) {
        if (div) {
            div.innerHTML = contaBombe;
            div.style.color = contaBombe === 1 ? "blue" : (contaBombe === 2 ? "green" : "red");
        }
    } else {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                rilevacellevuote(r + i, c + j);
            }
        }
    }
}celle.forEach(cella => {
    cella.addEventListener("contextmenu", function (e) {
        e.preventDefault()
        let r = this.dataset.row
        let c = this.dataset.col
        if (!(campo[r][c].clicked)) {
            campo[r][c].flag = !campo[r][c].flag
            switch (campo[r][c].flag) {
                case true:
                    this.innerHTML = "🚩";
                    flag++
                    break;
                case false:
                    this.innerHTML = "";
                    flag--
                    break;
            }
            controllaVittoria()
        }
    })
});
function o() {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (campo[i][j].mine && !campo[i][j].flag) return false;
            if (!campo[i][j].mine && campo[i][j].flag) return false;
        }
    }
    return true;
}
function controllaVittoria() {
    if (flag == mine && o()) {
        alert("BRAVO")
    }
}
