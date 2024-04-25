let gameInProgress = false
let startButton = document.querySelector('.start')
let player1Color = document.querySelector('.player1')
let player2Color = document.querySelector('.player2')
let game = {}
let player1 = {}
let player2 = {}
class Player {
    constructor(color) {
        this.color = color
    }
}
class Game {
    constructor(width, height) {


        this.width = width
        this.height = height
        this.currPlayer = player1;
        this.makeBoard()
        this.makeHtmlBoard()

    }

    makeBoard() {
        this.board = []
        for (let y = 0; y < this.height; y++) {
            this.board.push(Array.from({ length: this.width }));
        }
    }

    makeHtmlBoard() {
        const board = document.getElementById('board');
        const top = document.createElement('tr');

        top.setAttribute('id', 'column-top');
        this.handleClick = this.handleClick.bind(this)
        top.addEventListener('click', this.handleClick);

        for (let x = 0; x < this.width; x++) {
            const headCell = document.createElement('td');
            headCell.setAttribute('id', x);
            top.append(headCell);
        }

        board.append(top);

        for (let y = 0; y < this.height; y++) {
            const row = document.createElement('tr');

            for (let x = 0; x < this.width; x++) {
                const cell = document.createElement('td');
                cell.setAttribute('id', `${y}-${x}`);
                row.append(cell);
            }

            board.append(row);
        }
    }


    findSpotForCol(x) {
        for (let y = this.height - 1; y >= 0; y--) {
            if (!this.board[y][x]) {
                return y;
            }
        }
        return null;
    }
    placeInTable(y, x) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.classList.add(`${this.currPlayer.color}`);
        piece.style.backgroundColor = `${this.currPlayer.color}`
        piece.style.top = -50 * (y + 2);

        const spot = document.getElementById(`${y}-${x}`);
        spot.append(piece);
    }
    endGame(msg) {
        alert(msg);
    }
    handleClick(evt) {
        const x = +evt.target.id;
        const y = this.findSpotForCol(x);

        if (y === null) {
            return;
        }

        this.board[y][x] = this.currPlayer;
        this.placeInTable(y, x);

        if (this.checkForWin()) {
            return this.endGame(` ${this.currPlayer.color} Player won!`);
        }

        if (this.board.every(row => row.every(cell => cell))) {
            return endGame('Tie!');
        }

        this.currPlayer = this.currPlayer === player1 ? player2 : player1;
    }
    checkForWin() {
        const _win = (cells) => {

            return cells.every(
                ([y, x]) =>
                    y >= 0 &&
                    y < this.height &&
                    x >= 0 &&
                    x < this.width &&
                    this.board[y][x] === this.currPlayer
            );
        }

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
                const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
                const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
                const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

                if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                    gameInProgress = false
                    return true;
                }
            }
        }
    }
}

startButton.addEventListener('click', function (click) {
    click.preventDefault()
    if (!gameInProgress) {
        //resets board/player states
        let selectBoard = document.querySelectorAll('tr')
        selectBoard.forEach((x) => { x.remove() })
        player1 = {}
        player2 = {}
        gameInProgress = true
        //creates new board state
        player1 = new Player(player1Color.value)
        player2 = new Player(player2Color.value)
        game = new Game(6, 7);
    }
})
