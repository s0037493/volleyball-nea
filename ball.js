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

  this.startingY=5
  this.t=0
    
  }

  ballPhysics(){

    if(this.horizontalVelocity != 0){
      let newX = this.getX() + Math.sin(this.horizontalRotation)*this.horizontalVelocity
      this.setX(newX)

      let newZ = this.getZ() + Math.cos(this.horizontalRotation)*this.horizontalVelocity
      this.setZ(newZ)

      if(this.horizontalVelocity>=0.6)
      this.setHorizontalVelocity(this.getHorizontalVelocity()*0.97) //horizontal velocity should decrease slower (air resistance)#
      

    } 

    if(this.upwardsVelocity != 0){
      // let newY = this.getY() + Math.sin(this.upwardsRotation)*this.upwardsVelocity
      // this.setY(newY)
      
      // this.setUpwardsVelocity(this.getUpwardsVelocity()-0.02) //upward velocity should decrease faster (gravity)

      //s = ut + 1/2at^2

      this.setY(this.startingY + this.upwardsVelocity*this.t + 0.5*-0.02*(this.t**2))
      this.t++

    }

    }
  s

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

}

  

