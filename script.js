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
    shuffle(arr)
    str = arr.join("");
    output(str)
}
function output (password){
    document.querySelector("#output").innerHTML = password;
}
// let str;
// str = generateRandom('number', 10) + generateRandom('lowerCase', 10) + generateRandom('upperCase', 10) + generateRandom('special', 10);
// let arr = str.split("");
// shuffle(arr)
// str = arr.join("");
// console.log(str)