// Define um objeto constante para rastrear o estado de teclas específicas
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false,
        hold: false
    },
    space: {
        pressed: false,
        hold: false
    }
}

// Adiciona um ouvinte de eventos para eventos de pressionamento de tecla
window.addEventListener("keydown", e => {
    let key = e.key

    // Switch case para tratar diferentes teclas pressionadas
    switch (key) {
        case "ArrowLeft":
        case "a":
            keys.a.pressed = true
            player.lastKeyPressed = key // Atualiza a última tecla pressionada pelo jogador
            break
        case "ArrowRight":
        case "d":
            keys.d.pressed = true
            player.lastKeyPressed = key // Atualiza a última tecla pressionada pelo jogador
            break
        case "ArrowUp":
        case "w":
            keys.w.pressed = true
            break
        case "z":
        case " ":
            keys.space.pressed = true
            break
    }
})

// Adiciona um ouvinte de eventos para eventos de soltura de tecla
window.addEventListener("keyup", e => {
    let key = e.key

    // Switch case para tratar diferentes teclas soltas
    switch (key) {
        case "ArrowLeft":
        case "a":
            keys.a.pressed = false
            break
        case "ArrowRight":
        case "d":
            keys.d.pressed = false
            break
        case "ArrowUp":
        case "w":
            keys.w.pressed = false
            keys.w.hold = false
            break
        case "z":
        case " ":
            keys.space.pressed = false
            keys.space.hold = false
            break
    }
})

// Função para lidar com os controles do jogador
function handleControls() {
    player.setSprite("idle")
    if (!player.onGround) player.setSprite("jumping")
    if (player.isAttacking) player.setSprite("attacking")

    moviments()
    attacks()

    // Função para atualizar a posição do jogador com base nas teclas pressionadas
    function moviments() {
        player.velocity.x = 0
        if (keys.a.pressed && ["a", "ArrowLeft"].includes(player.lastKeyPressed)) {
            player.velocity.x = -1.5 * 3.4 // Movimenta o jogador para a esquerda
            player.facing = "left"

            if (!player.onGround) return
            player.setSprite("running")
        }
        if (keys.d.pressed && ["d", "ArrowRight"].includes(player.lastKeyPressed)) {
            player.velocity.x = 1.5 * 3.4 // Movimenta o jogador para a direita
            player.facing = "right"

            if (!player.onGround) return
            player.setSprite("running")
        }
        if (keys.w.pressed && !keys.w.hold) {
            player.jump()
            keys.w.hold = true
            player.setSprite("jumping")
        }
    }

    function attacks() {
        if (keys.space.pressed && !keys.space.hold) {
            player.attack()
            keys.space.hold = true
        }
    }
}
