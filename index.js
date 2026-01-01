
const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 64 * 16 // 1024
canvas.height = 64 * 9// 576

const player = new Player({
  imageSrc: "./img/alien/idlealien.png",
  frameRate: 1,
  animations: {
    idleRight: {
      frameRate: 1,
      frameBuffer: 4,
      loop: true, 
      imageSrc: "./img/alien/idlealien.png",
    },
    idleLeft: {
      frameRate: 1,
      frameBuffer: 4,
      loop: true, 
      imageSrc: "./img/alien/idlealien.png",
    },
    runRight: {
      frameRate: 4,
      frameBuffer: 6,
      loop: true,
      imageSrc: "./img/alien/uright.png",
    },
    runLeft: {
      frameRate: 4,
      frameBuffer: 6,
      loop: true, 
      imageSrc: "./img/alien/uleft.png",
    },
    enterDoor: {
      frameRate: 8,
      frameBuffer: 8,
      loop: false, 
      imageSrc: "./img/alien/enterDoor.png",
      onComplete: () => {
        gsap.to(overlay,{
          opacity: 1,
          onComplete: () => {
            level++
            if (level > 3) {
              level = 1
            }
            levels[level].init()
            player.switchSprite("idleRight")
            player.preventInput = false
            gsap.to(overlay,{
              opacity: 0,
            })
          }
        })
      },
    },
  },
}) 

let parsedCollisions
let collisionBlocks
let background
let doors
let level = 1
let levels = {
  1:{
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      if(player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/corridor1omega.png",
      })

      doors = [
        new Sprite({
          position: {
            x: 768,
            y: 272,
          },
          imageSrc: "./img/opendooralpha1.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        })
      ]
    }
  },
  2:{
    init: () => {
      parsedCollisions = collisionsLevel2.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      if(player.currentAnimation) player.currentAnimation.isActive = false
      player.position.x = 96
      player.position.y = 140

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/corridor2omega.png",
      })

      doors = [
        new Sprite({
          position: {
            x: 772,
            y: 336,
          },
          imageSrc: "./img/opendooralpha1.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        })
      ]
    }
  },
  3:{
    init: () => {
      parsedCollisions = collisionsLevel3.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      if(player.currentAnimation) player.currentAnimation.isActive = false
      player.position.x = 750
      player.position.y = 130

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/corridor3omega.png",
      })

      doors = [
        new Sprite({
          position: {
            x: 176,
            y: 335,
          },
          imageSrc: "./img/opendooralpha1.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        })
      ]
    }
  }
}

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

const overlay = {
  opacity: 0
}

function animate(){
  window.requestAnimationFrame(animate)

  background.draw()
  collisionBlocks.forEach((collisionBlock) =>{
    collisionBlock.draw()
  })
  doors.forEach((door) =>{
    door.draw()
  })

  player.handleInput(keys)
  player.draw()
  player.update()

  c.save()
  c.globalAlpha = overlay.opacity
  c.fillStyle = "black"
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.restore()

}

levels[level].init()
animate()

