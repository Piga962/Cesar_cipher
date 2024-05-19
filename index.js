console.log("Puro Nuevo Leon World!");

const readlineSync = require('readline-sync');
const path = require('path');
const fs = require('fs');

function cesarCipher(str, idx) {
    let result = '';
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    for(let letter of str){
        let index = alphabet.indexOf(letter);
        letter = letter.toLowerCase();
        if(index != -1){
            let newIndex = (index + idx) % 26;
            let newLetter = alphabet[newIndex];
            result += newLetter;
        }
    }
    return result;
}

function registerUser(){
    let name = readlineSync.question("Enter your name: ");
    let password = readlineSync.question("Enter your password: ");
    let passwordCifrada = cesarCipher(password, 3);
    addUser(name, passwordCifrada);
}

function addUser(userName, passwordCifrada){
    const filePath = path.join(__dirname, 'users.json');
    let users = [];

    fs.readFile(filePath, (err, data) => {
        if(err){
            users;
        } else{
            users = JSON.parse(data);
        }
        users.push({userName, passwordCifrada});
        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) =>{
            if(err){
                console.log("Error adding user");
            } else{
                console.log("User added");
                menu();
            }
        })
    })
}

function login(){
    let userName = readlineSync.question("Enter your name: ");
    let password = readlineSync.question("Enter your password: ");

    const filePath = path.join(__dirname, 'users.json');

    fs.readFile(filePath, (err, data) => {
        if(err){
            console.log("Error reading file");
        } else{
            for(let userNames of JSON.parse(data)){
                if(userName == userNames.userName && cesarCipher(password,3) == userNames.passwordCifrada){
                    console.log("Welcome " + userName);
                    menu();
                } else{
                    console.log("Invalid user or password");
                }
            }
        }
    })
}

function menu(){
    let option = readlineSync.question("1. Register\n2. Login\n3. Exit\nOption: ");
    // switch(option){
    //     case '1':
    //         registerUser();
    //     case '2':
    //         login();
    //     case '3':
    //         break;
    //     default:
    //         console.log("Invalid option");
    //         break;
    // }
    if(option == '1'){
        registerUser();
    } else if(option == '2'){
        login();
    } else if(option == '3'){
        return;
    } else{
        console.log("Invalid option");
    }
}

menu();