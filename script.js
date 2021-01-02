const password = document.querySelector("#output");
const strength = document.getElementsByClassName("strength");
const timeToCrack = document.querySelector("#time");
const range = document.getElementsByName('rangeInput');
function generateRandom (what, howMany) {
    let out = "";
    let charLength, charPosition;
    switch (what){
        case "number":
            charLength = 10;
            charPosition = 48;
        break;
        case "upperCase":
            charLength = 26;
            charPosition = 65;
        break;
        case "lowerCase":
            charLength = 26;
            charPosition = 97;
        break;
        case "special": //excluding [space] character
            charLength = 32;            
        break;
    }
    while (howMany--){
        let r = Math.floor(Math.random() * charLength);
        let x;
        if (what === "special"){
            x = r += r > 14 ? ( r > 21 ? ( r > 27 ? 95 : 69) : 43) : 33;
        } else {
            x = r += charPosition;
        }
        out += String.fromCharCode(x);    
    }
    return out;
}
const shuffle = array => { 
    for (let x = array.length - 1; x > 0; x--) {
        let y = Math.floor(Math.random() * (x + 1));
        [array[x], array[y]] = [array[y], array[x]];
    }
};
function generate (){
    let number = document.querySelector("#number").value;
    let lowerCase = document.querySelector("#lowerCase").value;
    let upperCase = document.querySelector("#upperCase").value;
    let special = document.querySelector("#special").value;
    let own = document.querySelector("#own").value;
    let str = generateRandom('number', number) + generateRandom('lowerCase', lowerCase) + generateRandom('upperCase', upperCase) + generateRandom('special', special) + own;
    let arr = str.split("");
    shuffle(arr);
    str = arr.join("");
    output(str);
    checkStrength(str);
    calculateDifficulty(str)
}
function output (pass){
    password.innerHTML = pass;
}
function copy() {
    navigator.clipboard.writeText(password.innerHTML)
    .then(() => {}, (err) =>console.error(`When copied, got error: ${err}`));
}
function checkStrength (pass){
    const strong = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%\-\/\;\:\>\<\=\_\`\~\"\|\{\}\$\?\^\*\+\.\&\'\,])(?=.{8,})");//missing \[]
    const medium = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
    const weak = new RegExp("^(?=.{6,})");
    const veryWeak = new RegExp("^(?=.{1,})");
    dropStyle();
    if (strong.test(pass)){setStyle('strong')}
    else if (medium.test(pass)){setStyle('medium')}
    else if (weak.test(pass)){setStyle('weak')}
    else if (veryWeak.test(pass)){setStyle('veryWeak')}
}
function calculateDifficulty (pass){
    const passLength = pass.length;
    let passChar = 0;
    const numberTest = RegExp("^(?=.*[0-9])");
    const lowerCaseTest = RegExp("^(?=.*[a-z])");
    const upperCaseTest = RegExp("^(?=.*[A-Z])");
    const specialTest = RegExp("^(?=.*[!@#%\-\/\;\:\>\<\=\_\`\~\"\|\{\}\$\?\^\*\+\.\&\'\,])");
    if (numberTest.test(pass)){passChar+=10};
    if (lowerCaseTest.test(pass)){passChar+=26};
    if (upperCaseTest.test(pass)){passChar+=26};
    if (specialTest.test(pass)){passChar+=32};
    let combinations = BigInt(Math.pow(passChar, passLength));
    const CRACKING_POWER = BigInt(632000000000); //amount of combinations per second
    let timeToSolve = Number(combinations/CRACKING_POWER); //in seconds
    let difficulty = timeToSolve > 0 ? (timeToSolve > 60? ( timeToSolve > 3600 ? (timeToSolve > 86400 ? (timeToSolve > 31536000? `${Math.ceil(timeToSolve/31536000)} years`: `${Math.ceil(timeToSolve/86400)} days`): `${Math.ceil(timeToSolve/3600)} hrs`): `${Math.ceil(timeToSolve/60)} min`): `${Math.ceil(timeToSolve)} sec`) : `instant`;
    timeToCrack.innerHTML = difficulty;
    //Styles for difficulty
    timeToCrack.classList="";
    if(difficulty.includes("instant") || difficulty.includes("sec")){timeToCrack.classList.add("veryWeak")}
    else if (difficulty.includes("min")){timeToCrack.classList.add("weak")}
    else if (difficulty.includes("hrs")){timeToCrack.classList.add("medium")}
    else if (difficulty.includes("days") || difficulty.includes("years")){timeToCrack.classList.add("strong")}
} 
function dropStyle (){
    for (let element of strength){
        if(!element.classList.contains('shaded')){
            element.classList.add('shaded')
        }
    }
}
function setStyle (element){
    document.getElementById(element).classList.remove("shaded");
}
dropStyle()
// Set values
const setValue = (event)=>{
    document.getElementById(`${event.target.id}Value`).innerHTML = event.target.value;
};
for (let field of range){
    document.getElementById(`${field.id}Value`).innerHTML = field.value;
    field.addEventListener('input', setValue)
}