let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //player x and player o
let filledBoxes = 0; // Counter for filled boxes

const winPatterns = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked");
    if (turnO) {
      //if turnO is true, then player O will play
      box.innerText = "O";
      turnO = false; //after player O plays, turnO will be false
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true; //once a box is clicked, it will be disabled

    filledBoxes++; // Increment the counter for filled boxes
    checkWinner();
  });
});

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const checkWinner = () => {
  for (const pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText; //pattern[0] is the first position of the pattern
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      //if all 3 positions are not empty
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("winner", pos1Val);
        showWinner(pos1Val);
        return; // Exit the function if there is a winner
      }
    }
  }

  // Check for a draw after all boxes are filled
  if (filledBoxes === boxes.length) {
    console.log("It's a draw!");
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
  }
};

const resetGame = () => {
  turnO = true;
  filledBoxes = 0; // Reset the counter for filled boxes
  enableBoxes();
  msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
