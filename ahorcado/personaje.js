const canvas = document.getElementById('characterCanvas');
const ctx = canvas.getContext('2d');

// Palabra secreta
const words = ['javascript', 'html', 'css', 'programa', 'developer', 'codigo', 'computadora'];
let word = words[Math.floor(Math.random() * words.length)];
let wordState = new Array(word.length).fill('_');
let attempts = 0;
const maxAttempts = 7;

const wordElement = document.getElementById('word');
const clueElement = document.getElementById('clue');
const lettersElement = document.getElementById('letters');

wordElement.textContent = wordState.join(' ');

// Letras del teclado
for (let i = 0; i < 26; i++) {
    const letter = (i + 10).toString(36);
    const span = document.createElement('span');
    span.textContent = letter;
    span.addEventListener('click', () => letterHandler(letter));
    lettersElement.appendChild(span);
}

// Dibujar el ahorcado a medida que se cometen errores
function drawHangmanParts() {
    ctx.beginPath();
    switch (attempts) {
        case 1:
            // Dibujar la soga
            ctx.moveTo(40, 10);
            ctx.lineTo(40, 5);
            ctx.lineTo(100, 5);
            ctx.lineTo(100, 10);
            break;
        case 2:
            // Dibujar la cabeza
            ctx.arc(100, 30, 20, 0, Math.PI * 2);
            break;
        case 3:
            // Dibujar el torso
            ctx.moveTo(100, 50);
            ctx.lineTo(100, 100);
            break;
        case 4:
            // Dibujar la mano izquierda
            ctx.moveTo(100, 70);
            ctx.lineTo(70, 50);
            break;
        case 5:
            // Dibujar la mano derecha
            ctx.moveTo(100, 70);
            ctx.lineTo(130, 50);
            break;
        case 6:
            // Dibujar la pierna izquierda
            ctx.moveTo(100, 100);
            ctx.lineTo(70, 130);
            break;
        case 7:
            // Dibujar la pierna derecha
            ctx.moveTo(100, 100);
            ctx.lineTo(130, 130);
            break;
        default:
            break;
    }
    ctx.stroke();
}

function letterHandler(letter) {
    if (attempts >= maxAttempts) return;
    if (word.includes(letter)) {
        word.split('').forEach((char, index) => {
            if (char === letter) {
                wordState[index] = letter;
            }
        });
        wordElement.textContent = wordState.join(' ');
        if (!wordState.includes('_')) {
            clueElement.textContent = '¡Ganaste!';
        }
    } else {
        attempts++;
        drawHangmanParts();
        if (attempts >= maxAttempts) {
            clueElement.textContent = '¡Perdiste! La palabra era: ' + word;
        }
    }
}
