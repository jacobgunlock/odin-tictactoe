const Players = (() => {
    const playerX = document.querySelector('#x');
    const playerO = document.querySelector('#o');

    function takeTurn() {
        //this === grid cell that triggered takeTurn
        let cell = this;
        let id = this.id;
        playerX.classList.value === 'is-turn'
        ? TicTacToe.setMarker('X', id, cell)
        : TicTacToe.setMarker('O', id, cell);
    };

    function changeTurn() {
        if (playerX.classList.value === 'is-turn') {
            playerX.removeAttribute('class', 'is-turn');
            playerO.setAttribute('class', 'is-turn');
        } 
        else if (playerO.classList.value === 'is-turn') {
            playerO.removeAttribute('class', 'is-turn');
            playerX.setAttribute('class', 'is-turn');
        }
    };
    return {takeTurn, changeTurn}
})();

const TicTacToe = (() => {
    let board = ['','','','','','','','',''];
    const createGrid = () => {
        gameboard = document.querySelector('.gameboard');
        board.forEach(function(cell, i) {
            gridItem = document.createElement('div');
            gridItem.setAttribute('class', 'grid-item');
            gridItem.setAttribute('id', i);
            gridItem.addEventListener('click', Players.takeTurn);
            gameboard.appendChild(gridItem);
        })
    };
    createGrid();
    
    function setMarker(marker, id, cell) {
        if (board[id] != '') return;
        cell.innerText = marker;
        board[id] = (marker);
        checkWin();
        Players.changeTurn();
    }

    function indexesOf(marker) {
        let reduced = board.reduce(function(acc, val, ind){
            if (val === marker){
                acc.push(ind);
            }
            return acc;
        }, []);
        return reduced;
    }

    function checkWin() {
        const X = indexesOf('X');
        const O = indexesOf('O');
        const winningCombo = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
        let gameWon = false;
        winningCombo.forEach(array => {
            first = array[0];
            second = array[1];
            third = array[2];
            if(X.includes(first) && X.includes(second) && X.includes(third)){
                gameWon = true;
                highlightWin();
                displayReset();
                displayResult('X');
            } else if (O.includes(first) && O.includes(second) && O.includes(third)){
                gameWon = true;
                highlightWin();
                displayReset();
                displayResult('O');
            }
        });
        if(!board.includes('') && gameWon === false){
            displayResult('Tie')
            displayReset();
        };
    }

    function displayResult(marker) {
        const winner = document.createElement('div');
        winner.setAttribute('class', 'winner')
        const h1 = document.querySelector('h1');
        if (marker === 'Tie') {
            winner.innerText = "It's a Tie!"
            h1.appendChild(winner)
        } else
        winner.innerText = `${marker} Wins!`
        h1.appendChild(winner)
    }

    function highlightWin() {
        firstGridItem = document.getElementById(first);
        secondGridItem = document.getElementById(second);
        thirdGridItem = document.getElementById(third);
        firstGridItem.style.backgroundColor = 'lightgreen';
        secondGridItem.style.backgroundColor = 'lightgreen';
        thirdGridItem.style.backgroundColor = 'lightgreen';
    }
    
    function displayReset() {
        const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach(item => {
            item.removeEventListener('click', Players.takeTurn)
        });
        const resetBtn = document.querySelector('.reset-btn')
        resetBtn.classList.remove('hidden');
        resetBtn.addEventListener('click', resetGrid);
    }

    function resetGrid() {
        board = ['','','','','','','','',''];
        const resetBtn = document.querySelector('.reset-btn');
        document.querySelector('h1').innerHTML = 'tic-tac-toe!'
        resetBtn.classList.add('hidden');
        resetBtn.removeEventListener('click', resetGrid);
        gameboard.innerHTML = '';
        createGrid();
    }
    return {setMarker}
})();
