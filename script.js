/* 
Random Password Generator
-------------------------
Um gerador de senha aleatória com os seguintes recursos:
- O usuário pode escolher o comprimento da senha
- O usuário pode escolher incluir letras minúsculas, maiúsculas, dígitos e caracteres especiais
- O usuário pode copiar a senha para a área de transferência
- Pode gerar senhas de 6 a 20 caracteres
*/


//Opções

let passwordLength = document.querySelector('#password_length');
passwordLength.min = 6;
passwordLength.max = 20;


//checkbox

let checkLowercase = document.querySelector('#check_lowercase');
let checkUppercase = document.querySelector('#check_uppercase');
let checkDigits = document.querySelector('#check_digits');
let checkSymbols = document.querySelector('#check_symbols');

let passwordOutput = document.querySelector('#password');
passwordOutput.innerHTML = "&nbsp;";


//buttons

document.querySelector("#btn_generate_password").addEventListener("click",()=>{

     //validações
      if(!checkLowercase.checked && !checkUppercase.checked && !checkDigits.checked && !checkSymbols.checked){
            passwordOutput.innerHTML = "<p>Por favor, selecione pelo menos uma opção.</p>";
            return;
      }
    
      if(passwordLength.value < 6 || passwordLength.value > 20){
            passwordOutput.innerHTML = "<p>Por favor, escolha um comprimento entre 6 e 20 caracteres.</p>";
            return;
      }

    //resposta
    passwordOutput.innerHTML = generatePassword(
        parseInt(passwordLength.value),
        checkLowercase.checked,
        checkUppercase.checked,
        checkDigits.checked,
        checkSymbols.checked
    );  
      
}); 

document.querySelector("#btn_copy_to_clipboard").addEventListener("click",()=>{

    //validação
    if(passwordOutput.textContent.length <= 0) {
        return;
    }
    navigator.clipboard.writeText(passwordOutput.textContent);
});


//funções


function generatePassword(length, lowercase, uppercase, digits, symbols) {
    let Password = '';
    let chars = '';

    //defininndo password

    if(lowercase) {
        chars += 'abcdefghijklmnopqrstuvwxyz';
    }
    if(uppercase) {
        chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if(digits) {
        chars += '0123456789';
    }
    if(symbols) {
        chars += '!@#$%^&*()-+';
    }

    for(let i = 0; i < length; i++) {
        Password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return Password;
}