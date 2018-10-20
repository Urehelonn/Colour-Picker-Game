// selectors for DOM
let plattes = document.querySelectorAll('.square');
let header = document.querySelector('#header');
let colorDisplay = document.querySelector('#colorDisplay');
let msg = document.querySelector('#msg');
let resBt = document.querySelector('#resBt');
let modeBt = document.querySelectorAll('.mode');

// initialize header background color
header.style.backgroundColor = '#849fc9';

//diff mode button listener add
for (let i = 0; i < modeBt.length; i++) {
    modeBt[i].addEventListener('click', function() {
        diffChange(i);
    });
}

// initial values
let diff = 6;
let colors = generateColor();
let picked = pickColor();
colorDisplay.textContent = picked;
let win = false;

// add listener for bts
//add listeners to resBt
resBt.addEventListener('click', function() {
    resGame();
});

//starts running
//set default mode as hard
diffChange(1);

//initialize plattes as well
for (let i = 0; i < 6; i++) {
    plattes[i].style.backgroundColor = colors[i]; // set initial color for squres
    // click listeners add
    plattes[i].addEventListener('click', function() {
        let clicked = this.style.backgroundColor; // grab colour of selected platte
        if (clicked === picked && !win && i < diff) selectRightPlatte();
        else if (clicked !== picked && !win && i < diff) {
            //wrong platte selected
            //fade the platte
            this.style.backgroundColor = '#232323';
            msg.textContent = 'Try again o.o';
            console.log('picked: ' + picked + '  curr: ' + clicked);
        }
        // if win or greater than diff, do nothing by click;
    });
}

// functions
function diffChange(mode) {
    //get current header color
    let headerC = header.style.backgroundColor;
    //clear all mode bt's style
    for (let i = 0; i < modeBt.length; i++) {
        //remove backgroun color
        modeBt[i].style.backgroundColor = '';
        //add text color
        modeBt[i].style.color = headerC;
    }
    //add header background color to curr mode button
    modeBt[mode].style.backgroundColor = headerC;
    //change text colour
    modeBt[mode].style.color = 'white';
    //change diff
    diff = (mode + 1) * 3;
    //reset game
    resGame();
}

function selectRightPlatte() {
    msg.textContent = 'You Win x3'; //display msg
    colorChangeOnWinning(); //change color to match the winning state
    console.log('picked: ' + picked + '  curr: ' + clicked);
    win = true; //change win state
    resBt.textContent = 'Play Again?'; //change text on resetBt as well
}

function colorChangeOnWinning() {
    //change color on header
    header.style.backgroundColor = picked;
    // loop through plattes to match picked
    for (let i = 0; i < diff; i++) plattes[i].style.backgroundColor = picked;
    diffBtColourChange();
    //change message and playagin bt text color
    resBt.style.color = picked;
    msg.style.color = picked;
    //change res bt text to play again
    resBt.textContent = 'Play Again?';
}
function diffBtColourChange() {
    //change diff bt color
    let currDiff = diff / 3 - 1;
    for (let i = 0; i < modeBt.length; i++) {
        // add selected diff bt style
        if (i === currDiff) modeBt[i].style.backgroundColor = picked;
        else {
            modeBt[i].style.backgroundColor = 'none';
            modeBt[i].style.color = picked;
        }
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
    //remove message display
    msg.textContent = '';
    //change res bt text to new color
    resBt.textContent = 'New Colors';
}
