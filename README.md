# Random password generator

## Algorithm overview
Algorithm is based around getting random characters by their [decimal code in UTF-8](https://www.w3schools.com/charsets/ref_utf_basic_latin.asp "HTML unicode UTF-8") with method `String.fromCharCode()`. The tricky part is to get correct code range for different character types:     
     
Character types     | Characters | Decimal range                        | Total number of characters
---------------     |:----------:|:-------------:                       |:-------------------------:
Numbers             |0...9       |48...57                               |10
Lower case letters  |a...z       |97...122                              |26
Upper case letters  |A...Z       |65..90                                |26
Special symbols     | #$@%^&*... |32...47, 58...64, 91...96, 123...126  |33
    
Each of the character type will have its starting point (decimal range start) and range (total number of characters). Random will roll number within range and add it to starting point to get character code. The tricky part is with special symbols for 2 reasons:
- they often read as RegExp or JS symtaxis
- their rang is split in character list (not consecutive)    
     
To solve this I used series of ternary operators:
```
x = r += r > 14 ? ( r > 21 ? ( r > 27 ? 95 : 69) : 43) : 33;
```
I excluded space from special symbols (`.fromCharCode(32)`) and started from decimal 33. Other symbols can be added or excluded by changing ranges of char codes.
    
I included also field for user's preferred character, but it is not necessary to use.    
Based on user settings algorithm will select desired amount of each character type (for example, 2 random numbers, 3 random lower case letter, 1 special symbol, 0 upper case letters) and add them to string. The string is then split, shuffled and joined again. And that's how random password is generated. The rest of the functions is just for better UX and additional information.    

### Alternative ways
I considered also selecting random element of string or array to get random characters. For example, random number can be selected from array `[0,1,2,3,4,5,6,7,8,9]`. This is especially useful with getting random special symbol since their decimal codes range is not consecutive `["#","@","$","%"...]`.   
Also numbers are easy to generate with `Math.random()` function, but I decided to stick with same method for all character types.

## Copy button
For convinience (to avoid selecting and coping the password) added "copy" button. On lick it will move generated password into clipboard. This implemented using clipboard API `navigator.clipboard.writeText()`.

## Password strength    
Password strength is checked in two ways:   
__Based on type of characters included and password length.__    
For this check I used classic regular expressions. This is my criteria:   
     
Strength level     | Minimum number of characters | Required character types                                                        | Regular expression
---------------    |:----------:                  |:-------------:                                                                  |:-------------------------:
Very weak          |1                             |any                                                                              |`^(?=.{1,})`
Weak               |6                             |any                                                                              |`^(?=.{6,})`
Medium             |8                             |combination of any two: small letter, capital letters, numbers                   |`^(((?=.*[a-z])(?=.*[A-Z]))\|((?=.*[a-z])(?=.*[0-9]))\|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})`
Strong             |8                             |at least one of each: small letter, capital letters, number, special character   |`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%\-\/\;\:\>\<\=\_\~\"\|\{\}\$\?\^\*\+\.\&\'\,])(?=.{8,})`
     
Alternatively can use `^(?=.*[\d])` for all digits and `^(?=.*[\W])` for all non-word characters (alphanumeric and underscore).     
__Based on time to crack the password.__    
For this check I used `Math.pow()` function to find total number of possible combinations depending on used settings. The more types of characters you select and the longer your password, the more combination can be there with such settings.    
My initial thought was to add together ranges of all included character types and calculate them to power of password length. But to feature in user preferred symbol input I had to use regular expressions again to test if generated password includes each type of character (since I don't know what type of character user may input).     





## User interface
This is how it looks like in action:   
<img src="./src/typesOfOperation.png" />
Yo ucan find live version here.   
Thank you.   