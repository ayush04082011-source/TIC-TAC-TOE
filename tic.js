let boxes = document.querySelectorAll('.box');
let resetbut = document.querySelector('.reset');
let newgame = document.querySelector('#new-btn');
let msg = document.querySelector('#msg');
let msgcontainer = document.querySelector('.msg-contain');

let turn0 = "true";

let winpat  = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetgame = () => {
    turn0 = true;
    enableboxes();
    msgcontainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        console.log("clicked");
        if (turn0 ){
            box.innerText = "X";
            turn0 = false;
        }
        else{
            box.innerText = "O";
            turn0 = true;
        }
    box.disabled = true;
     checkwinner();
    });
});

const disableboxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};
const enableboxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showmsg = (winner) => {
    msg.innerText = `!!!!  Player ${winner} is the winner  
    
    !!!!`;
    msgcontainer.classList.remove("hide");
    

    disableboxes();
};

const checkwinner = () => {
    for(let patterns of winpat){    
    let position1 = boxes[patterns[0]].innerText;
    let position2 = boxes[patterns[1]].innerText;
    let position3 = boxes[patterns[2]].innerText;
    
    if(position1 != "" && position2 != "" && position3 != ""){
      if(position1 === position2 && position2 === position3){
        console. log("WINNER ");
        showmsg(position1);
      }
    }
}  

};

newgame.addEventListener('click', resetgame);
resetbut.addEventListener('click', resetgame);

