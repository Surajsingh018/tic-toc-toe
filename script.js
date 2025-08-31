// // // let marks = [45, 78, 88, 90, 67];
// // // console.log(marks)
// // // console.log(marks.length) //proprty
// // // console.log(typeof marks[0])


// // // let heroes = ["Ironman", "Spiderman", "Thor", "Hulk", "Captain America"];
// // // // console.log(heroes)
// // // // console.log(heroes.length) //property
// // // // console.log(typeof heroes[2])

// // // //for of
// // // for(let hero of heroes){
// // //     console.log(hero);
// // // }

// // let marks = [85,97,44,37,76,60];
// // let sum = 0;
// // for(let val of marks){
// //     sum +=val; //sum = sum + val
// // }
// // let average = sum/marks.length;
// //     console.log(`average marks of the class = ${average}`);

// // let items = [250,645,300,900,50];

// // // let index = 0;
// // // for (let val of items){
// // //     console.log(`value at index &{index} = ${val}`);
// // //     let offer = val / 10;
// // //     items[index] = items[index]- offer;
// // //     index++;
// // //  }
// //   for (let i = 0; i < items.length; i++){
// //     // console.log(`value at index ${i} = ${items[i]}`);
// //     let offer = items[i] / 10;
// //     items[i] = items[i] - offer;
// //   }
// //   console.log(items);

// // let fruits = ["apple", "banana", "grapes", "mango", "orange"];
// // console.log(fruits);
// // fruits.push("kiwi"); //add element at the end
// // fruits.unshift("strawberry"); //add element at the beginning
// // let deleteditem = fruits.pop(); //remove element from the end
// // console.log("deleted item = " + deleteditem);
// // let arr = [10, 20, 30, 40, 50, 60];

// // // arr.splice(2, 0, 18); //add 18 at index 2
// // // console.log(arr);
// // // arr.splice(4,1); //remove 1 element at index 4
// // arr.splice(3,1,25,35); //add 25,35 at index 3

// // let companies =["Bloomberg","Microsoft","Uber","Google","IBM","Netflix"];

// // // companies.splice(0,1);
// // // companies.splice(2,1,"Ola");
// // companies.splice(5,1,"Amazon");

// const  nameandnumber = [[] , [], []]
// console.log(nameandnumber);

// const tictactoe = [
//     ['X', null, null],
//     [ null,null,'O'],
//     ['O',null,  'X']
// ]
// console.log(tictactoe);

//function defination 
// function introduceme (username ,userprofession,userage) {
//     // console.log( username);
//     console.log("Hii");
//     console.log(`My name is ${username}`);
//     console.log(`I am a ${userprofession}`);
//     console.log(`I am ${userage} years old`);

//     return "bihar"
// }
//function call
// const returnValue = introduceme ()

// introduceme ("Suraj", "React Developer",22);
// introduceme ("Anamika" , "Software Engineer",25);
// introduceme ("Vinay");
// // introduceme ();

// function subtractTwoNumbers(num1,num2){
//     let sub = num1 - num2;
//     return sub;
// }
// let returnValue = subtractTwoNumbers(10,20);
// console.log(returnValue)
// var username = "suraj"
// var userage = 22;

// sayhi()
// function sayhi(){
//     const a = 15;
//     const b = 17;
//     console.log(a,b);
// }
document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const resetButton = document.getElementById('reset-button');
    const currentPlayerDisplay = document.getElementById('current-player');
    const scoreXDisplay = document.getElementById('score-x');
    const scoreODisplay = document.getElementById('score-o');
    const gameResultDisplay = document.getElementById('game-result');
    const winnerText = document.getElementById('winner-text');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let scores = { X: 0, O: 0 };

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    function handleBoxClick(event) {
        const clickedBox = event.target;
        const clickedIndex = parseInt(clickedBox.dataset.index);

        if (gameBoard[clickedIndex] !== '' || !gameActive) {
            return;
        }

        gameBoard[clickedIndex] = currentPlayer;
        clickedBox.textContent = currentPlayer;
        clickedBox.classList.add(currentPlayer.toLowerCase());
        clickedBox.classList.add('disabled');

        checkResult();
    }

    function checkResult() {
        let roundWon = false;
        let winningCombination = [];

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            const condition = gameBoard[a] && 
                            gameBoard[a] === gameBoard[b] && 
                            gameBoard[a] === gameBoard[c];

            if (condition) {
                roundWon = true;
                winningCombination = [a, b, c];
                break;
            }
        }

        if (roundWon) {
            gameActive = false;
            scores[currentPlayer]++;
            updateScores();
            
            highlightWinningBoxes(winningCombination);
            
            winnerText.textContent = `Player ${currentPlayer} Wins!`;
            gameResultDisplay.classList.remove('hidden');
            
            return;
        }

        if (!gameBoard.includes('')) {
            gameActive = false;
            winnerText.textContent = "It's a Draw!";
            gameResultDisplay.classList.remove('hidden');
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateCurrentPlayerDisplay();
    }

    function highlightWinningBoxes(combination) {
        combination.forEach(index => {
            boxes[index].classList.add('winning');
        });
    }

    function updateCurrentPlayerDisplay() {
        currentPlayerDisplay.textContent = currentPlayer;
        currentPlayerDisplay.className = `player-${currentPlayer.toLowerCase()}`;
    }

    function updateScores() {
        scoreXDisplay.textContent = scores.X;
        scoreODisplay.textContent = scores.O;
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        
        boxes.forEach(box => {
            box.textContent = '';
            box.classList.remove('x', 'o', 'disabled', 'winning');
        });
        
        gameResultDisplay.classList.add('hidden');
        updateCurrentPlayerDisplay();
    }

    boxes.forEach(box => {
        box.addEventListener('click', handleBoxClick);
    });

    resetButton.addEventListener('click', resetGame);

    // Initialize display
    updateCurrentPlayerDisplay();
    updateScores();
});