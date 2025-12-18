
const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 64 * 16 // 1024
canvas.height = 64 * 9// 576

const parsedCollisions = collisionsLevel1.parse2D()
const collisionBlocks = parsedCollisions.createObjectsFrom2D()

const backgroundLevel1 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  // imageSrc: "./img/backgroundLevel1.png",
  imageSrc: "backgroundl1.png",
})

const player = new Player({
  collisionBlocks,
  // imageSrc: "./img/king/idle.png",
  imageSrc: "idlealien.png",
  // frameRate: 11,
  frameRate: 1,
  animations: {
    idleRight: {
      // frameRate: 11,
      frameRate: 1,
      frameBuffer: 4,
      loop: true, 
      // imageSrc: "./img/king/idle.png",
      imageSrc: "idlealien.png",
    },
    idleLeft: {
      // frameRate: 11,
      frameRate: 1,
      frameBuffer: 4,
      loop: true, 
      // imageSrc: "./img/king/idleLeft.png",
      imageSrc: "idlealien.png",
    },
    runRight: {
      // frameRate: 8,
      frameRate: 4,
      frameBuffer: 4,
      loop: true,
      // imageSrc: "./img/king/runRight.png",
      imageSrc: "uright.png",
    },
    runLeft: {
      // frameRate: 8,
      frameRate: 4,
      frameBuffer: 4,
      loop: true, 
      // imageSrc: "./img/king/runLeft.png",
      imageSrc: "uleft.png",
    },
    enterDoor: {
      frameRate: 8,
      // frameBuffer: 4,
      frameBuffer: 10,
      loop: false, 
      // imageSrc: "./img/king/enterDoor.png",
      imageSrc: "enterDoor.png",
    },
  },
}) 

const doors = [
  new Sprite({
    position: {
      x: 64*12,
      // y: 64*4+14,
      y: 64*4+16,
    },
    // imageSrc: "./img/doorOpen.png",
    imageSrc: "opendoors.png",
    frameRate: 5,
    frameBuffer: 5,
    loop: false,
    autoplay: false,
  })
]

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
  collisionBlocks.forEach((collisionBlock) =>{
    collisionBlock.draw()
  })
  doors.forEach((door) =>{
    door.draw()
  })

  player.handleInput(keys)

  player.draw()
  player.update()
}
animate()



