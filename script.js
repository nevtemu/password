const password = document.querySelector("#output");
const strength = document.querySelector("#strength");
const timeToCrack = document.querySelector("#time");
function generateRandom (what, howMany) {
    let out = "";
    let charLength, charPosition;
    switch (what){
        case "number":
            charLength = 10;
            charPosition = 48;
        break;
        case "upperCase":
            charLength = 25;
            charPosition = 65;
        break;
        case "lowerCase":
            charLength = 25;
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
const shuffle = array => { //this function only shuffles items in array
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
    .then(() => {}, (err) =>console.error('When copied, got error:', err));
}
function checkStrength (pass){
    const strong = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%\-\/\;\:\>\<\=\_\`\~\"\|\{\}\$\?\^\*\+\.\&\'\,])(?=.{8,})");//missing \[]
    const medium = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
    const weak = new RegExp("^(?=.{6,})");
    const veryWeak = new RegExp("^(?=.{1,})");
    strength.className='';
    if (strong.test(pass)){strength.innerHTML="strong"; strength.classList.toggle('strong')}
    else if (medium.test(pass)){strength.innerHTML="medium"; strength.classList.toggle('medium')}
    else if (weak.test(pass)){strength.innerHTML="weak"; strength.classList.toggle('weak')}
    else if (veryWeak.test(pass)){strength.innerHTML="very weak"; strength.classList.toggle('veryWeak')}
    else {strength.innerHTML="no password"}
}

const range = document.getElementsByName('rangeInput');
const setValue = (event)=>{
    document.getElementById(`${event.target.id}Value`).innerHTML = event.target.value;
};
for (let field of range){
    document.getElementById(`${field.id}Value`).innerHTML = field.value;
    field.addEventListener('input', setValue)
}

function calculateDifficulty (pass){
    const passLength = pass.length;
    let passChar = 0;
    // const numberTest = RegExp("^(?=.*\d)");
    const numberTest = RegExp("^(?=.*[0-9])");
    const lowerCaseTest = RegExp("^(?=.*[a-z])");
    const upperCaseTest = RegExp("^(?=.*[A-Z])");
    // const specialTest = RegExp("^(?=.*[\W])"); // all non-word characters (alphanumeric and underscore)
    const specialTest = RegExp("^(?=.*[!@#%\-\/\;\:\>\<\=\_\`\~\"\|\{\}\$\?\^\*\+\.\&\'\,])");
    if (numberTest.test(pass)){passChar+=10};
    if (lowerCaseTest.test(pass)){passChar+=25};
    if (upperCaseTest.test(pass)){passChar+=25};
    if (specialTest.test(pass)){passChar+=32};
    let combinations = BigInt(Math.pow(passChar, passLength));
    const CRACKING_POWER = BigInt(632000000000); //this amount of combinations per second
    let timeToSolve = Number(combinations/CRACKING_POWER); //in seconds
    let difficulty = timeToSolve > 0 ? (timeToSolve > 60? ( timeToSolve > 3600 ? (timeToSolve > 86400 ? (timeToSolve > 31536000? `${Math.ceil(timeToSolve/31536000)} years`: `${Math.ceil(timeToSolve/86400)} days`): `${Math.ceil(timeToSolve/3600)} hrs`): `${Math.ceil(timeToSolve/60)} min`): `${Math.ceil(timeToSolve)} sec`) : `instant`;
    // let timeToSolve = new Date(Number(combinations/CRACKING_POWER) * 1000).toISOString(); 
    // console.log(difficulty);
    timeToCrack.innerHTML = difficulty;
} 