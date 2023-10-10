import InputHandler from "./Inputhandler"
import Player from "./Player"
import UserInterface from "./UserInterface"

export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.keys = []
    this.enemies = []
    this.gameOver = false
    this.gameTime = 0
    this.gravity = 1
    this.debug = false

    this.ammo = 10

    this.player = new Player(this)
  }

  update(deltaTime) {
    if (this.gameOver) {
      return
    }
    this.gameTime += deltaTime
    this.player.update(deltaTime)
  }

  draw(context) {
    context.fillStyle = '#000'
    context.font = '20px serif'
    context.fillText(`Ammo: ${this.ammo}`, 10, 20)
    this.player.draw(context)
    this.ui.draw(context)
  }
}
