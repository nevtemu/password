function generateRandom (what, howMany) {
    let out = "";
    switch (what){
        case "number":
            while (howMany--){
                let r = Math.floor(Math.random() * 10);
                let x = r += 48;
                out += String.fromCharCode(x);    
            }
        break;
        case "upperCase":
                while (howMany--){
                    let r = Math.floor(Math.random() * 25);
                    let x = r += 65;
                    out += String.fromCharCode(x);    
                }
        break;
        case "lowerCase":
                while (howMany--){
                    let r = Math.floor(Math.random() * 25);
                    let x = r += 97;
                    out += String.fromCharCode(x);    
                }
        break;
        case "special": 
            while (howMany--){
                let r = Math.floor(Math.random() * 32);
                let x = r += r > 14 ? ( r > 21 ? ( r > 27 ? 95 : 69) : 43) : 33;
                out += String.fromCharCode(x);    
            }    
        break;
    }
    return out;
}
console.log(generateRandom('special', 200))