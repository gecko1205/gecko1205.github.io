// Selecionando os elementos do HTML
const statusDisplay = document.querySelector('.status');
const gameBoard = document.querySelector('.game-board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.querySelector('.restart-button');

// Variáveis de estado do jogo
let gameActive = true;
let currentPlayer = 'X';
let boardState = ["", "", "", "", "", "", "", "", ""];

// Filas para armazenar a ordem das jogadas de cada jogador
const xMoves = [];
const oMoves = [];

const winningMessage = () => `Jogador ${currentPlayer} venceu!`;
const currentPlayerTurn = () => `É a vez do jogador ${currentPlayer}`;

// Definindo as condições de vitória
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Função principal que lida com o clique na célula
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (boardState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    if (currentPlayer === 'X' && xMoves.length >= 3) {
        const oldestMoveIndex = xMoves.shift();
        boardState[oldestMoveIndex] = "";
        cells[oldestMoveIndex].textContent = "";
        cells[oldestMoveIndex].classList.remove('x');
    } else if (currentPlayer === 'O' && oMoves.length >= 3) {
        const oldestMoveIndex = oMoves.shift();
        boardState[oldestMoveIndex] = "";
        cells[oldestMoveIndex].textContent = "";
        cells[oldestMoveIndex].classList.remove('o');
    }

    placePiece(clickedCell, clickedCellIndex);
    checkResultValidation();
}

// Função para colocar a peça no tabuleiro
function placePiece(cell, index) {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (currentPlayer === 'X') {
        xMoves.push(index);
    } else {
        oMoves.push(index);
    }
}

// Função para trocar o jogador
function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = currentPlayerTurn();
    updateDisappearingPreview(); // <<-- CHAMADA DA NOVA FUNÇÃO
}

// NOVA FUNÇÃO: Atualiza qual peça ficará transparente
function updateDisappearingPreview() {
    // 1. Limpa qualquer preview anterior
    cells.forEach(cell => {
        cell.classList.remove('disappearing');
    });

    // 2. Determina qual peça do jogador ATUAL desaparecerá em seu PRÓXIMO turno
    if (currentPlayer === 'X' && xMoves.length === 3) {
        const oldestMoveIndex = xMoves[0];
        cells[oldestMoveIndex].classList.add('disappearing');
    } else if (currentPlayer === 'O' && oMoves.length === 3) {
        const oldestMoveIndex = oMoves[0];
        cells[oldestMoveIndex].classList.add('disappearing');
    }
}

// Função para verificar o resultado
function checkResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = boardState[winCondition[0]];
        let b = boardState[winCondition[1]];
        let c = boardState[winCondition[2]];
        if (a === '' || b === '' || c === '') continue;
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = winningMessage();
        gameActive = false;
        // Limpa o preview quando o jogo acaba
        cells.forEach(cell => cell.classList.remove('disappearing'));
        return;
    }

    changePlayer();
}

// Função para reiniciar o jogo
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    boardState = ["", "", "", "", "", "", "", "", ""];
    xMoves.length = 0;
    oMoves.length = 0;
    statusDisplay.textContent = currentPlayerTurn();
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x', 'o', 'disappearing'); // Limpa a classe aqui também
    });
}

// Adicionando os ouvintes de evento
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);

// Mensagem inicial
statusDisplay.textContent = currentPlayerTurn();