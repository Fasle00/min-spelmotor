export default class InputHandler {
    constructor(game) {
        this.game = game
        window.addEventListener('keydown', (event) => {
            console.log(event.key)
            if (
                (event.key === 'ArrowUp' ||
                    event.key === 'ArrowDown' ||
                    event.key === 'ArrowLeft' ||
                    event.key === 'ArrowRight') &&
                this.game.keys.indexOf(event.key) === -1
            ) {
                this.game.keys.push(event.key)
            }
            if (event.key === ' ') {
                this.game.player.shoot()
            }
            if (event.key === 'r') {
                this.game.player.reload()
            }
            if (event.key === 'd') {
                this.game.debug = !this.game.debug
            }
            if (event.key === 'q') {
                this.game.gameOver = !this.game.gameOver
            }
        })
        window.addEventListener('keyup', (event) => {
            if (this.game.keys.indexOf(event.key) > -1) {
                this.game.keys.splice(this.game.keys.indexOf(event.key), 1)
            }
        })
    }
}