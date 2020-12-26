const password = document.querySelector("#output");
const strength = document.querySelector("#strength");
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
    console.log(strong.test(pass))
    if (strong.test(pass)){strength.innerHTML="strong"}
    else if (medium.test(pass)){strength.innerHTML="medium"}
    else if (weak.test(pass)){strength.innerHTML="weak"}
    else if (veryWeak.test(pass)){strength.innerHTML="very weak"}
    else {strength.innerHTML="no password"}
}
