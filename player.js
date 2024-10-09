class Player extends Box {

  constructor(inputDimensions, inputColour, team){
    super(inputDimensions, inputColour) //gives shape dimensions and colour using code from Box class
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.team = team //if team=true, then player is on right. if false, left.

    this.upwardsVelocity = 0
    this.upwardsRotation = 0
    }

  netCollider(){

  if(this.getX()==1 && this.getY()<20){
    this.setX(2) //right team
  }
    
  else if(this.getX()==-1 && this.getY()<20){
    this.setX(-2) //left team
  }

  else if(this.getX()==0 && this.getY()<=20){ 
    this.setY(20) //directly on the net
    this.setUpwardsVelocity(0) //stops user from falling, "disbales" jump physics method
  }
    
  else if(this.getX()==1 && this.getY()==20){
      this.setX(2) //right hand side of the top of the net
    this.setUpwardsVelocity(-1.5) //negative velocity to go downwards
    this.setUpwardsRotation(pi/2) //direction is perpendicular to court
    }

  else if(this.getX()==-1 && this.getY()==20){
      this.setX(-2) //left hand side of the top of the net
    this.setUpwardsVelocity(-1.5) //negative velocity to go downwards
    this.setUpwardsRotation(pi/2) //direction is perpendicular to court
    }
  }

  courtCollider(){
    if(this.getY()<5){
      this.setY(5)
      this.setUpwardsVelocity(0) //ensures user motion stops and physics engine wont take them lower.
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

  setUpwardsVelocity(newUpwardsVelocity){
    this.upwardsVelocity = newUpwardsVelocity
  }

  setUpwardsRotation(newupwardsRotation){
    this.upwardsRotation = newupwardsRotation
  }

  jumpPhysics(){
    if(this.upwardsVelocity != 0){
      let newY = this.getY() + Math.sin(this.upwardsRotation)*this.upwardsVelocity
      this.setY(newY)

      this.setUpwardsVelocity(this.getUpwardsVelocity()-0.011) //upward velocity should decrease fast (gravity)

    }
  }

  ballInRange(){
    let XDistance = 2*(this.getX() - ball.getX())
    console.log(XDistance)
    let YDistance = this.getY() - ball.getY()
    let ZDistance = 2*(this.getZ() - ball.getZ())

    let totalDistanceSquared = XDistance**2 + YDistance**2 + ZDistance**2 //pythagoras
    console.log(totalDistanceSquared)
    let distanceToBall = Math.sqrt(totalDistanceSquared) //pythagoras
    console.log(distanceToBall)

    if(distanceToBall<8){
      console.log("In range")
      return true //ball is in range
    }
    else{
      console.log("Out of range")
      return false //ball out of range
    }
  }

  pTpAngle(playerA, playerB){
    let Aposition = []
    let Bposition = []

    if(playerA=="a"){
      Aposition = [user.getX(), user.getY(), user.getZ()]
    }
    else if(playerA=="b"){
      Aposition = [ai[0].getX(), ai[0].getY(), ai[0].getZ()]
    }
    else if(playerA=="c"){
      Aposition = [ai[1].getX(), ai[1].getY(), ai[1].getZ()]
    }
    else if(playerA=="d"){
      Aposition = [ai[2].getX(), ai[2].getY(), ai[2].getZ()]
    }

    if(playerB=="a"){
      Bposition = [user.getX(), user.getY(), user.getZ()]
    }
    else if(playerB=="b"){
      Bposition = [ai[0].getX(), ai[0].getY(), ai[0].getZ()]
    }
    else if(playerB=="c"){
      Bposition = [ai[1].getX(), ai[1].getY(), ai[1].getZ()]
    }
    else if(playerB=="d"){
      Bposition = [ai[2].getX(), ai[2].getY(), ai[2].getZ()]
    }

    let AB = []
    for(let i=0; i<3; i++){
      AB[i] = Bposition[i] - Aposition[i]
    }
    console.log(AB)    
    


  }
  
  }

  
  

