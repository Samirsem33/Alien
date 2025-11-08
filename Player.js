class Player{
  constructor({imageSrc}){
    this.position = {
      x: 400 ,
      y: 10 ,
    }
    this.image = new Image()
    this.image.src = imageSrc
    this.width = 81
    this.height = 96    
    this.gravity = 1
    this.velocity = {
      x:0,
      y:0,
    }
    this.sides = {
      bottom: this.position.y + this.height,
    }
  }
  draw(){ 
    c.drawImage(this.image, this.position.x, this.position.y)
    // c.fillStyle = "red"
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update(){
    this.position.y += this.velocity.y
    this.sides.bottom = this.position.y + this.height + 190
    this.position.x += this.velocity.x

    if (this.sides.bottom + this.velocity.y < canvas.height) { 
      this.velocity.y += this.gravity
    } else this.velocity.y=0
  }
}