// selectors for DOM
let plattes = document.querySelectorAll('.square');
let header = document.querySelector('#header');
let colorDisplay = document.querySelector('#colorDisplay');
let msg = document.querySelector('#msg');
let resBt = document.querySelector('#resBt');
let ezBt = document.querySelector('#ez');
let hardBt = document.querySelector('#hard');

// initial values
let diff = 6;
let colors = generateColor();
let picked = pickColor();
colorDisplay.textContent = picked;
let win = false;

// add listener for bts
//add listeners to resBt
resBt.addEventListener('click', resGame());

//add listener for ez and hard bt
ezBt.addEventListener('click', function() {
    //change diff
    diff = 3;
    //get curr header backgroun color
    let back = header.style.backgroundColor;
    let res = '3px solid ' + back;
    //remove border from another bt
    hardBt.style.border = '';
    //add border to bt
    this.style.border = res;
    //reset game with ez diff
    resGame();
});
hardBt.addEventListener('click', function (){
    hardCalled();
});


//starts running
hardCalled();
//press hard bt to initialize diff and border
for (let i = 0; i < diff; i++) {
    // set initial color for squres
    plattes[i].style.backgroundColor = colors[i];
    // click listeners add
    plattes[i].addEventListener('click', function() {
        // grab colour of selected platte
        let clicked = this.style.backgroundColor;
        // see if its the selected one
        // if correct
        if (clicked === picked) {
            //display msg
            msg.textContent = 'You Win x3';
            //change color to match the winning state
            colorChangeOnWinning(picked);
            console.log('picked: ' + picked + '  curr: ' + clicked);
            //change win state
            win = true;
            //change text on resetBt as well
            resBt.textContent = 'Play Again?';
        }
        // select the wrong one
        else {
            //fade the platte
            this.style.backgroundColor = '#232323';
            msg.textContent = 'Try again o.o';
            console.log('picked: ' + picked + '  curr: ' + clicked);
        }
        // if win do nothing by click;
    });
}

// functions
function colorChangeOnWinning(tempC) {
    //change color on header
    header.style.backgroundColor = picked;
    // loop through plattes to match picked
    for (let i = 0; i < diff; i++) {
        plattes[i].style.backgroundColor = picked;
    }
}

function pickColor() {
    //get a random color from plattes
    let res = Math.floor(Math.random() * diff);
    return colors[res];
}

function generateColor() {
    let res = [];
    //generate random color and put into array;
    for (let i = 0; i < diff; i++) {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        res.push('rgb(' + r + ', ' + g + ', ' + b + ')');
    }
    return res;
}

function resGame() {
    //if also need to reset all colors
    if (win) {
        win = false;
    }
    //reset header background color as well?
    //nah so far, prefer curr
    //generate new colors for colors array
    colors = generateColor();
    //and put new colors onto plattes
    for (let i = 0; i < 6; i++) {
        //if set to hard, rest plattes fade
        if (i >= diff) {
            plattes[i].style.backgroundColor = '#232323';
        } else {
            plattes[i].style.backgroundColor = colors[i];
        }
    }
    //pick new piecked from new color plattes
    picked = pickColor();
    //change display on title
    colorDisplay.textContent = picked;
}

//function for hard bt pressed
function hardCalled(){
    console.log('hardbt pressed');
    //change diff
    diff = 6;
    //get curr header backgroun color
    let back = header.style.backgroundColor;
    let res = '3px solid ' + back;
    //remove border from another bt
    ezBt.style.border = '';
    //add border to bt
    hardBt.style.border = res;
    //reset game with ez diff
    resGame();
}
