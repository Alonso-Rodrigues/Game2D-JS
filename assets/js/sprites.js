const gravity = 0.6
const backgroundSpritePath = "../assets/img/background.png"

class Sprite {
    // O construtor recebe um objeto com as propriedades `position`, `dimensions` e `velocity`
    constructor({ position, dimensions, velocity, source }) {
        // Define a posição inicial do sprite
        this.position = position;
        // Define a largura do sprite
        this.width = dimensions?.width;
        // Define a altura do sprite
        this.height = dimensions?.height;
        // Define a velocidade do sprite
        this.velocity = velocity;

        if (source) {
            this.image = new Image()
            this.image.src = source

            this.width = this.image.width
            this.height = this.image.height
        }
    }

    // Método para desenhar o sprite no canvas
    draw() {
        if (this.image) {
            ctx.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            )            
        } else {
            ctx.fillStyle = "white"; // Define a cor do sprite
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height); // Desenha um retângulo preenchido com a cor definida
        }
        if (this.isAttacking) {
            ctx.fillStyle = "red";
            ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }

    // Método para atualizar a posição do sprite
    update() {
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
        this.onGround
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 125,
            height: 50
        }
        this.isAttacking
        this.attackCoolDown = 500
        this.onAttackingCoolDown
    }

    update() {
        // Verifica se o sprite atingiu o chão do canvas
        if (Math.ceil(this.position.y + this.height) >= canvas.height) {
            this.onGround = true
        } else {
            this.onGround = false
        }
        // Ajusta a posição y para o chão do canvas
        if (this.position.y + this.height > canvas.height) {
            this.position.y = canvas.height - this.height
            this.velocity.y = 0
        } else {
            // Aplica a gravidade à velocidade y
            if (!this.onGround) this.velocity.y += gravity;
        }
        // Atualiza a posição do sprite com base na velocidade
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.attackBox.position.x = this.position.x
        this.attackBox.position.y = this.position.y

        // Desenha o sprite atualizado
        this.draw();
    }
    jump() {
        if (!this.onGround) return
        this.velocity.y = -16
    }
    attack() {
        if (this.onAttackingCoolDown) return
        this.isAttacking = true
        this.onAttackingCoolDown = true

        setTimeout(() => {
            this.isAttacking = false
        }, 100)

        setTimeout(() => {
            this.onAttackingCoolDown = false
        }, this.attackCoolDown)
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

// const player2 = new Fighter({
//     position: {
//         x: 500,
//         y: 20
//     },
//     dimensions: {
//         width: 50,
//         height: 200
//     },
//     velocity: {
//         x: 0,
//         y: 0
//     }
// });

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    source: backgroundSpritePath
})

