class Sprite {
    // O construtor recebe um objeto com as propriedades `position` e `dimensions`
    constructor({ position, dimensions }) {
        // Define a posição inicial do sprite
        this.position = position;
        // Define a largura do sprite
        this.width = dimensions.width;
        // Define a altura do sprite
        this.height = dimensions.height;
    }

    // Método para desenhar o sprite no canvas
    draw() {
        ctx.fillStyle = "white"; // Define a cor do sprite
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height); // Desenha um retângulo preenchido com a cor definida
    }
}

// Cria uma instância do sprite `player` na posição (0, 0) com largura de 50 e altura de 150
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    dimensions: {
        width: 50,
        height: 150
    }
});
