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
                framesPerSpritesFrame: 1
            }
        }
        
        this.currentSprite = this.sprites.idle
        this.currentSpriteFrame = 0
        this.elapseTime = 0
        this.totalSpritesFrames = this.sprites.idle.totalSpritesFrames
        this.framesPerSpriteFrame = this.sprites.idle.framesPerSpriteFrame
    }

    setSprite(sprite) {
        this.currentSprite = this.sprites[sprite]
        if (!this.currentSprite) {
            this.currentSprite = this.sprites.idle
        }
    }

    loadSprite() {
        let previousSprite = this.image.src

        this.image = new Image()
        this.image.src = this.currentSprite.src
        this.width = this.image.width * this.scale
        this.height = this.image.height * this.scale

        this.totalSpritesFrames = this.currentSprite.totalSpritesFrames
        this.framesPerSpritesFrame = this.currentSprite.framesPerSpritesFrame

        let newSprite = this.image.src
        
        if (previousSprite !== newSprite) {
            let previousSpriteImage = new Image()
            previousSpriteImage.src = previousSprite

            this.position.y += (previousSpriteImage.height - this.image.height) * this.scale
        }
    }

    // Método para desenhar o sprite no canvas
    draw() {
        ctx.imageSmoothingEnabled = false

        ctx.save()
        ctx.translate(this.position.x + this.offset.x, this.position.y + this.offset.y)
       
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
        ctx.restore()
    }

    animate() {
        this.elapseTime++
        
        if (this.elapseTime >= this.framesPerSpritesFrame) {
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

    update() {
        this.gravity()
        this.loadSprite()

        // Desenha o sprite atualizado
        this.draw()
        this.animate()
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
    velocity: {
        x: 0,
        y: 10
    },
    sprites: {
        idle: {
            src: "../assets/img/idle.png",
            totalSpritesFrames: 11,
            framesPerSpritesFrame: 18,

        }
    },
    scale: 4
});

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    source: backgroundSpritePath
})

