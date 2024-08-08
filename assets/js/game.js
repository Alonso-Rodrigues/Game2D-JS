// Seleciona o elemento canvas do DOM
const canvas = document.querySelector('canvas');
// Obtém o contexto 2D do canvas para desenhar
const ctx = canvas.getContext('2d');

// Define as dimensões do canvas
const canvasWidth = 1024;
const canvasHeight = 576;

// Ajusta o tamanho do canvas
canvas.width = canvasWidth;
canvas.height = canvasHeight;

const desiredFPS = 120
const frameTime = 1000 / desiredFPS


let prevTime = performance.now()

// Variável para armazenar o tempo do quadro anterior
let lag = 0;

// Função que inicia a animação
animate();
function animate() {
    const currentTime = performance.now()
    const elapsed = currentTime - prevTime
    prevTime = currentTime
    lag += elapsed

    handleControls()

    while(lag >= frameTime){
        // Preenche o fundo do canvas com a cor preta
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        background.update()
        // Desenha o sprite `player` no canvas
        player.update();
    
        lag -= frameTime
    }

    window.requestAnimationFrame(animate);
}
