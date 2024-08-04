const gravity = 0.2;

class Sprite {
    // O construtor recebe um objeto com as propriedades `position`, `dimensions` e `velocity`
    constructor({ position, dimensions, velocity }) {
        // Define a posição inicial do sprite
        this.position = position;
        // Define a largura do sprite
        this.width = dimensions.width;
        // Define a altura do sprite
        this.height = dimensions.height;
        // Define a velocidade do sprite
        this.velocity = velocity;
    }

    // Método para desenhar o sprite no canvas
    draw() {
        ctx.fillStyle = "white"; // Define a cor do sprite
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height); // Desenha um retângulo preenchido com a cor definida
    }

    // Método para atualizar a posição do sprite
    update() {
        // Verifica se o sprite atingiu o chão do canvas
        if (this.position.y + this.height > canvas.height) {
            // Ajusta a posição y para o chão do canvas
            this.position.y = canvas.height - this.height;
            this.velocity.y = 0
        } else {
            // Aplica a gravidade à velocidade y
            this.velocity.y += gravity;
        }

        // Atualiza a posição do sprite com base na velocidade
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Desenha o sprite atualizado
        this.draw();
    }
}

class Fighter extends Sprite {
    constructor({
        position,
        velocity,
        dimensions
    }) {
        super({
            position,
            velocity,
            dimensions
        })

        this.velocity = velocity
        this.width = dimensions.width
        this.height = dimensions.height
        this.lastKeyPressed
    }
}


// Cria uma instância do sprite `player` na posição (100, 100) com largura de 50 e altura de 150
const player = new Fighter({
    position: {
        x: 100,
        y: 0
    },
    dimensions: {
        width: 50,
        height: 150
    },
    velocity: {
        x: 0,
        y: 10
    }
});

const player2 = new Fighter({
    position: {
        x: 500,
        y: 20
    },
    dimensions: {
        width: 50,
        height: 200
    },
    velocity: {
        x: 0,
        y: 0
    }
});

