/* 
Random Password Generator
-------------------------
Um gerador de senha aleatória com os seguintes recursos:
- O usuário pode escolher o comprimento da senha
- O usuário pode escolher incluir letras minúsculas, maiúsculas, dígitos e caracteres especiais
- O usuário pode copiar a senha para a área de transferência
- Pode gerar senhas de 6 a 20 caracteres
*/

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 20;
const DEFAULT_PASSWORD_PLACEHOLDER = '[Senha]';
const SYMBOL_CHARACTERS = '!@#$%^&*()-+';

const passwordLengthInput = document.querySelector('#password_length');
const checkLowercase = document.querySelector('#check_lowercase');
const checkUppercase = document.querySelector('#check_uppercase');
const checkDigits = document.querySelector('#check_digits');
const checkSymbols = document.querySelector('#check_symbols');
const passwordOutput = document.querySelector('#password');
const generateButton = document.querySelector('#btn_generate_password');
const copyButton = document.querySelector('#btn_copy_to_clipboard');

let currentPassword = '';

initializeApp();

function initializeApp() {
    passwordLengthInput.min = MIN_PASSWORD_LENGTH;
    passwordLengthInput.max = MAX_PASSWORD_LENGTH;
    passwordLengthInput.value = 8;

    passwordOutput.textContent = DEFAULT_PASSWORD_PLACEHOLDER;

    generateButton.addEventListener('click', handleGeneratePassword);
    copyButton.addEventListener('click', handleCopyPassword);
}

function handleGeneratePassword() {
    const length = parseInt(passwordLengthInput.value, 10);
    const options = {
        lowercase: checkLowercase.checked,
        uppercase: checkUppercase.checked,
        digits: checkDigits.checked,
        symbols: checkSymbols.checked,
    };

    const validationError = validatePasswordOptions(length, options);
    if (validationError) {
        showMessage(validationError);
        return;
    }

    currentPassword = generatePassword(length, options);
    displayPassword(currentPassword);
}

function handleCopyPassword() {
    if (!currentPassword) {
        return;
    }

    navigator.clipboard.writeText(currentPassword);
}

function validatePasswordOptions(length, options) {
    if (!options.lowercase && !options.uppercase && !options.digits && !options.symbols) {
        return 'Por favor, selecione pelo menos uma opção.';
    }

    if (Number.isNaN(length) || length < MIN_PASSWORD_LENGTH || length > MAX_PASSWORD_LENGTH) {
        return `Por favor, escolha um comprimento entre ${MIN_PASSWORD_LENGTH} e ${MAX_PASSWORD_LENGTH} caracteres.`;
    }

    return '';
}

function displayPassword(password) {
    passwordOutput.textContent = password;
}

function showMessage(message) {
    passwordOutput.textContent = message;
}

function generatePassword(length, options) {
    const characterSet = buildCharacterSet(options);
    let password = '';

    for (let i = 0; i < length; i += 1) {
        const randomIndex = Math.floor(Math.random() * characterSet.length);
        password += characterSet[randomIndex];
    }

    return password;
}

function buildCharacterSet(options) {
    let characterSet = '';

    if (options.lowercase) {
        characterSet += 'abcdefghijklmnopqrstuvwxyz';
    }

    if (options.uppercase) {
        characterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }

    if (options.digits) {
        characterSet += '0123456789';
    }

    if (options.symbols) {
        characterSet += SYMBOL_CHARACTERS;
    }

    return characterSet;
}
