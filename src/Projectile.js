export default class Projectile {
    constructor(game, x, y, faceingLeft) {
      this.game = game
      this.width = 4
      this.height = 4
      this.x = x
      this.y = y
  
      this.speed = (faceingLeft)? -5 : 5
      this.damage = 1
      this.markedForDeletion = false
    }
  
    update() {
      this.x += this.speed
      if (this.x > this.game.width || this.x + this.width < 0) {
        this.markedForDeletion = true
      }
    }
  
    draw(context) {
      context.fillStyle = '#ff0'
      context.fillRect(this.x, this.y, this.width, this.height)
    }
}