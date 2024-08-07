const gravity = 0.6
const backgroundSpritePath = "../assets/img/background.png"
const defautObjectSpritePath = "../assets/img/square.svg"


class Sprite {
    // O construtor recebe um objeto com as propriedades `position`, `dimensions` e `velocity`
    constructor({ position, velocity, source, scale, offset, sprites }) {
        // Define a posição inicial do sprite
        this.position = position;
        // Define a velocidade do sprite
        this.velocity = velocity;

        this.scale = scale || 1
        this.image = new Image()
        this.image.src = source || defautObjectSpritePath

        this.width = this.image.width * this.scale
        this.height = this.image.height * this.scale

        this.offset = offset || {
            x: 0,
            y: 0
        }

        this.sprites = sprites || {
            idle: {
                src: this.image.src,
                totalSpritesFrames: 1,
                framesPerSpritesFrames: 1
            }
        }
        this.currentSprite = this.sprites.idle

        this.elapseTime = 0
        this.currentSpriteFrame = 0
        this.totalSpritesFrames = this.sprites.idle.totalSpritesFrames
        this.framesPerSpritesFrames = this.sprites.idle.totalSpritesFrames

        // if (source) {
        //     this.image = new Image()
        //     this.image.src = source

        //     this.width = this.image.width
        //     this.height = this.image.height
        // }
    }

    setSprite(sprite) {
        this.currentSprite = this.sprites[sprite]
        if (!this.currentSprite) {
            this.currentSprite = this.sprites.idle
        }
    }

    loadSprite(sprite) {
        let previousSprite = this.image.src
        this.image = new Image()
        this.image.src = this.currentSprite.src
        this.width = this.image.width * this.scale
        this.height = this.image.height * this.scale
        this.totalSpritesFrames = this.currentSprite.totalSpritesFrames
        this.framesPerSpritesFrames = this.currentSprite.framesPerSpritesFrames
        let newSprite = this.image.src
        if (previousSprite != newSprite) {
            let previousSpriteImage = new Image()
            previousSpriteImage.src = previousSprite
            this.position.y += (previousSpriteImage.height - this.image.height) * this.scale
        }
    }

    // Método para desenhar o sprite no canvas
    draw() {
        // if (this.image) {
        //     ctx.drawImage(
        //         this.image,
        //         this.position.x,
        //         this.position.y,
        //         this.width,
        //         this.height
        //     )
        // } else {
        //     ctx.fillStyle = "white"; // Define a cor do sprite
        //     ctx.fillRect(this.position.x, this.position.y, this.width, this.height); // Desenha um retângulo preenchido com a cor definida
        // }
        // if (this.isAttacking) {
        //     ctx.fillStyle = "red";
        //     ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        // }

        ctx.imageSmoothingEnabled = false
        ctx.drawImage(
            this.image,
            this.currentSpriteFrame * this.image.width / this.totalSpritesFrames,
            0,
            this.image.width / this.totalSpritesFrames,
            this.image.height,
            0,
            0,
            this.width / this.totalSpritesFrames,
            this.height
        )
    }

    animate() {
        this.elapseTime++
        if (this.elapseTime >= this.framesPerSpritesFrames) {
            this.currentSpriteFrame++
            if (this.currentSpriteFrame >= this.totalSpritesFrames) {
                this.currentSpriteFrame = 0
            }
            this.elapseTime = 0
        }
    }

    // Método para atualizar a posição do sprite
    update() {
        this.draw()
        this.animate()
    }
}

class Fighter extends Sprite {
    constructor({
        position,
        velocity,
        scale,
        sprites
    }) {
        super({
            position,
            velocity,
            scale,
            sprites
        })

        this.velocity = velocity

        this.lastKeyPressed
        this.onGround

        this.isAttacking
        this.attackCoolDown = 500
        this.onAttackingCoolDown
    }

    update() {
        // this.attackBox.position.x = this.position.x
        // this.attackBox.position.y = this.position.y

        this.gravity()
        this.loadSprite()

        // Desenha o sprite atualizado
        this.draw()
        this.animate()
    }
    gravity() {
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
    // dimensions: {
    //     width: 50,
    //     height: 150
    // },
    velocity: {
        x: 0,
        y: 10
    },
    sprites: {
        idle: {
            src: "../assets/img/idle.png",
            totalSpritesFrames: 11,
            framesPerSpritesFrames: 18,

        }
    },
    scale: 4

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

