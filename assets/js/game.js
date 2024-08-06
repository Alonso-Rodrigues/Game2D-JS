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

// Variável para armazenar o tempo do quadro anterior
let prevTime = 0;

// Função que inicia a animação
animate();
function animate() {
    // Solicita ao navegador que chame esta função antes do próximo repaint
    window.requestAnimationFrame(animate);

    // Preenche o fundo do canvas com a cor preta
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    background.update()
    // Desenha o sprite `player` no canvas
    player.update();
    
    // player2.update();
    handleControls();
    // Obtém o tempo atual em milissegundos
    let currentTime = performance.now();
    // Calcula o tempo decorrido desde o último quadro em segundos
    let delta = (currentTime - prevTime) / 1000;
    // Calcula o número de quadros por segundo (FPS)
    let fps = 1 / delta;

    // Atualiza o tempo do quadro anterior para o tempo atual
    prevTime = currentTime;

    // console.log(`FPS: ${fps}`);
}
