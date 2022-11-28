import sudokuGenerator from "./components/sudokuGenerator.js";

const generator = new sudokuGenerator

//console.log(generator.defaultgrid);

var numSelected = null;
var tileSelectec = null;

var errors = 0;




var testboard = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0]]




var solution = generator.solveGrid();
var board = generator.removeNumbers(solution)

window.onload = function() {
    setGame()
    createMenu()

}

function setGame() {
    // Digits 1-9
    
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != 0) {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber(){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        // "0-0" "0-1" .. "3-1"
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}

const setGameScreen = function(visible) {
    let screens = document.querySelectorAll(".screen")
    let menuBtn = document.getElementById("menu-btn")
    if (visible !== "menu-div"){
        menuBtn.style.display = "block"
    }
    else
    {
        menuBtn.style.display = "none"
    }
    screens.forEach((screen)=>{


        if (screen.id == visible){
            screen.style.display = "block"
        }else
        {
            screen.style.display = "none"
        }
    }
    )
}

const createMenu = function () {
    let menudiv = document.createElement("div")
    menudiv.setAttribute("id", "menu-div")
    menudiv.classList.add("screen")
    menudiv.innerHTML = `
    <ul>
        <button id="new-game-btn">New Game</button>
        <button id="load-game-btn">Load Game</button>
        <button id="htp-btn">How to Play</button>
    </ul>
    `

    let buttons = menudiv.querySelectorAll("button")
    buttons.forEach((button)=>{
        button.addEventListener("mouseenter",()=>{
            button.style.border = "2px solid black"
        })
        button.addEventListener("mouseleave",()=>{
            button.style.border = ""
        })

        if (button.id == "new-game-btn"){
            button.addEventListener("click", ()=>{
                setGameScreen("game-div")
            })
        }
        if (button.id == "htp-btn"){
            button.addEventListener("click", ()=>{
                setGameScreen("htp-div")
            })
        }

        if (button.id == "menu-btn"){
            button.addEventListener("click", ()=>{
                setGameScreen("menu-div")
            })
        }
    })
    document.getElementById("menu-btn").addEventListener("click",()=>{
        setGameScreen("menu-div")
    })
    document.querySelector("hr").insertAdjacentElement("afterend",menudiv)
}

