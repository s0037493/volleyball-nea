class Ball{
  
  constructor(inputSphereDimensions, inputColour, inputX, inputY, inputZ){
  this.geometry = inputSphereDimensions; //radius, width segments, height segments
  this.material = new THREE.MeshBasicMaterial({ color: inputColour })
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  this.mesh.position.set(inputX,inputY,inputZ);

  this.horizontalVelocity = 0
  this.upwardsVelocity = 0
  this.upwardsRotation = 0
  this.horizontalRotation = 0

  }
 
  ballPhysics(){
    if(this.upwardsVelocity != 0){
      let newX = this.getX() + Math.sin(this.horizontalRotation)*this.horizontalVelocity //calculate change to x
      this.setX(newX) //update x
      let newZ = this.getZ() + Math.cos(this.horizontalRotation)*this.horizontalVelocity //calculate change to z
      this.setZ(newZ) //update z
      if(this.horizontalVelocity>=0.6) //give a baseline for the horizontal velocity as it works well and ensures that it never gets negative
      this.setHorizontalVelocity(this.getHorizontalVelocity()*0.97) //horizontal velocity should decrease slower (air resistance)

      let newY = this.getY() + Math.sin(this.upwardsRotation)*this.upwardsVelocity //calculate change to y
      this.setY(newY) //update y
      this.setUpwardsVelocity(this.getUpwardsVelocity()-0.02)  //reduce the upwards velocity by gravity.                           
    } 
    }

  netCollider(){
  if(this.getX() >= 0.1 && this.getX() <= 1.5 && this.getY() < 16.5){ // lower bound, upper bound, net height
    this.setX(1.5) //right hand side
  }
  else if(this.getX() >= -1.5 &&  this.getX() <= -0.1 &&  this.getY()<16.5){ // lower bound, upper bound, net height
    this.setX(-1.5) //left hand side
  }
  else if(this.getX() > -0.1 &&  this.getX() < 0.1 && this.getY()<16.5){
    this.setX(0)
    this.setY(16.5)
    this.setUpwardsVelocity(0) //ensures user motion stops and physics engine wont take them lower.
    this.setHorizontalVelocity(0)
  }
  }

  courtCollider(){
    if(this.getY()<1.5){
      this.setY(1.5)
      this.setUpwardsVelocity(0) //ensures user motion stops and physics engine wont take them lower.
      this.setHorizontalVelocity(0)
      this.velocity=0

      console.log(ballTouches+" touches")

      console.log("actual X : " + this.getX())
      console.log("actual Y : " + this.getY())
      console.log("actual Z : " + this.getZ())
    }
  }

  getX(){
    return this.mesh.position.x
  }

  getY(){
    return this.mesh.position.y
  }

  getZ(){
    return this.mesh.position.z
  }

  setX(newX){
    this.mesh.position.set(newX, this.getY(), this.getZ())
  }

  setY(newY){
    this.mesh.position.set(this.getX(), newY, this.getZ())
  }

  setZ(newZ){
    this.mesh.position.set(this.getX(), this.getY(), newZ)
  }

  getUpwardsVelocity(){
    return this.upwardsVelocity
  }

  getHorizontalVelocity(){
    return this.horizontalVelocity
  }

  setUpwardsVelocity(newUpwardsVelocity){
    this.upwardsVelocity = newUpwardsVelocity
  }

  setHorizontalVelocity(newHorizontalVelocity){
    this.horizontalVelocity = newHorizontalVelocity
  }

  setUpwardsRotation(newupwardsRotation){
    this.upwardsRotation = newupwardsRotation
  }

  setHorizontalRotation(newhorizontalRotation){
    this.horizontalRotation = newhorizontalRotation
  }

  getHorizontalRotation(){
    return this.horizontalRotation
  }

  getUpwardsRotation(){
    return this.upwardsRotation
  }

}

  

