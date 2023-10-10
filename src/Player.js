import Projectile from "./Projectile"

export default class Player {
  constructor(game) {
  this.game = game
    this.width = 32
    this.height = 64
    this.x = 50
    this.y = 100

    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 10
    this.projectiles = []
    this.faceLeft = false
  }

  update(deltaTime) {
    if (this.game.keys.includes('ArrowLeft')) {
      this.speedX = -this.maxSpeed
      this.faceLeft = true
    } else if (this.game.keys.includes('ArrowRight')) {
      this.speedX = this.maxSpeed
      this.faceLeft = false
    } else {
      this.speedX = 0
    }

    if (this.game.keys.includes('ArrowUp')) {
      this.speedY = -this.maxSpeed
    } else if (this.game.keys.includes('ArrowDown')) {
      this.speedY = this.maxSpeed
    } else {
      this.speedY = 0
    }

    this.projectiles.forEach((projectile) => {
      projectile.update()
    })
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    )

    this.x += this.speedX
    this.y += this.speedY
  }

  draw(context) {
    this.projectiles.forEach((projectile) => {
      projectile.draw(context)
    })

    context.fillStyle = '#f00'
    context.fillRect(this.x, this.y, this.width, this.height)
  }

  shoot() {
    if (this.game.ammo <= 0) {
      return
    }
    this.projectiles.push(new Projectile(this.game, this.x, this.y, this.faceLeft))
    this.game.ammo--
  }

  reload() {
    this.game.ammo = 10
  }
}