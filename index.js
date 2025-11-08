
const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 64 * 16 // 1024
canvas.height = 64 * 9// 576

const backgroundLevel1 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./backgroundLevel1.png"
})

const player = new Player({
  // imageSrc: "./alien96.png",
  imageSrc: "./alienjump96.png"
}) 

const keys = {
  w:{
    pressed: false
  },
  a:{
    pressed: false
  },
  d:{
    pressed: false
  },
}

function animate(){
  window.requestAnimationFrame(animate)

  backgroundLevel1.draw()

  // c.fillStyle = "white"
  // c.fillRect(0, 0, canvas.width, canvas.height)
  

  player.velocity.x = 0
  if (keys.d.pressed && player.position.x < canvas.width-player.width-126) player.velocity.x = 3
  else if (keys.a.pressed && player.position.x > 114) player.velocity.x = -3

  player.draw()
  player.update()
}
animate()



