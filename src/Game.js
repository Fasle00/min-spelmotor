import InputHandler from "./Inputhandler"
import Player from "./Player"
import UserInterface from "./UserInterface"
import Pumpkin from "./Pumpkin";

export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.keys = []

    this.gameOver = false
    this.gameTime = 0
    this.gravity = 1
    this.debug = false

    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 1000

    this.ammo = 10
    this.player = new Player(this)
  }

  update(deltaTime) {
    if (this.gameOver) {
      return
    }
    this.gameTime += deltaTime
    this.player.update(deltaTime)

    if (this.enemyTimer > this.enemyInterval) {
      this.addEnemy()
      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltaTime
    }

    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime)
      if (this.checkCollisions(this.player, enemy)) {
        enemy.markedForDeletion = true
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollisions(projectile, enemy)) {
          enemy.lives -= projectile.damage
          projectile.markedForDeletion = true
        }
      })
    })
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
  }

  checkCollisions(object1, object2) {
    return object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.height + object1.y > object2.y
  }

  draw(context) {
    this.displayAmmo(context)
    this.player.draw(context)
    this.ui.draw(context)
    this.enemies.forEach(enemy => enemy.draw(context))
  }

  displayAmmo(context) {
    context.fillStyle = '#000'
    context.font = '20px serif'
    context.fillText(`Ammo: ${this.ammo}`, 10, 20)
  }

  addEnemy() {
    this.enemies.push(new Pumpkin(this))
  }
}
