class Ball {

  constructor(inputSphereDimensions, inputColour, inputX, inputY, inputZ) {
    this.geometry = inputSphereDimensions; //radius, width segments, height segments
    // this.material = new THREE.MeshBasicMaterial({ color: inputColour })
    this.material = new THREE.MeshStandardMaterial({ color: inputColour })
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;

    this.mesh.position.set(inputX, inputY, inputZ);

    this.horizontalVelocity = 0
    this.upwardsVelocity = 0
    this.upwardsRotation = 0
    this.horizontalRotation = 0

  }

  ballPhysics() {
    if (this.upwardsVelocity != 0) {
      let newX = this.getX() + Math.sin(this.horizontalRotation) * this.horizontalVelocity //calculate change to x
      this.setX(newX) //update x

      let newZ = this.getZ() + Math.cos(this.horizontalRotation) * this.horizontalVelocity //calculate change to z
      this.setZ(newZ) //update z
      if (this.horizontalVelocity >= 0.6) //give a baseline for the horizontal velocity as it works well and ensures that it never gets negative
        this.setHorizontalVelocity(this.getHorizontalVelocity() * 0.97) //horizontal velocity should decrease slower (air resistance)

      let newY = this.getY() + Math.sin(this.upwardsRotation) * this.upwardsVelocity //calculate change to y
      this.setY(newY) //update y
      this.setUpwardsVelocity(this.getUpwardsVelocity() - 0.02)  //reduce the upwards velocity by gravity.                           
    }
  }

  netCollider() {
    if (this.getX() >= 0.1 && this.getX() <= 1.5 && this.getY() < 16.5) { // lower bound, upper bound, net height
      this.setX(1.5) //right hand side
    }
    else if (this.getX() >= -1.5 && this.getX() <= -0.1 && this.getY() < 16.5) { // lower bound, upper bound, net height
      this.setX(-1.5) //left hand side
    }
    else if (this.getX() > -0.1 && this.getX() < 0.1 && this.getY() < 16.5) {
      this.setX(0)
      this.setY(16.5)
      this.setUpwardsVelocity(0) //ensures user motion stops and physics engine wont take them lower.
      this.setHorizontalVelocity(0)
    }
  }

  courtCollider() { //stops ball falling through floor and manages point-awarding when ball does touch floor
    if (this.getY() < 1.5) {

      serving = false; //disable serving to aid with resetting play between rallies.
      ai[0].nowServing = false;
      ai[1].nowServing = false;
      ai[2].nowServing = false;

      this.setY(1.5)
      this.setUpwardsVelocity(0) //ensures user motion stops and physics engine wont take them lower.
      this.setHorizontalVelocity(0)
      this.setUpwardsRotation(0)
      this.setUpwardsVelocity(0)

      console.log(ballTouches + " touches")

      // If the ball lands IN of the court on the right team’s side, award point to left team.
      if (this.getX() > 0 && this.getX() <= 47 && Math.abs(this.getZ()) <= 17) {
        setTimeout(() => scoring(false), 250)
        console.log("landed IN on right side")
      }

      // If the ball lands IN of the court on the left team’s side, award point to left team.
      if (this.getX() < 0 && this.getX() >= -47 && Math.abs(this.getZ()) <= 17) {
        setTimeout(() => scoring(true), 250)
        console.log("landed IN on left side")
      }

      // If the ball lands OUT of the court and last touch is right team, award point to left team.
      // If the ball lands OUT of the court and last touch is left team, award point to right team.
      if (Math.abs(this.getX()) > 47 || Math.abs(this.getZ()) > 17) {
        console.log("landed OUT")
        if (lastTouchTeam == true) { //right team touched it last
          setTimeout(() => scoring(false), 250)
          console.log("last touch was by RIGHT")
        }
        else {
          setTimeout(() => scoring(true), 250,) //left team touched it last
          console.log("last touch was by LEFT")
        }
      }



      // a side of the court (in theory) has dimensions x=45, y=30.
    }
  }

  getX() {
    return this.mesh.position.x
  }

  getY() {
    return this.mesh.position.y
  }

  getZ() {
    return this.mesh.position.z
  }

  setX(newX) {
    this.mesh.position.set(newX, this.getY(), this.getZ())
  }

  setY(newY) {
    this.mesh.position.set(this.getX(), newY, this.getZ())
  }

  setZ(newZ) {
    this.mesh.position.set(this.getX(), this.getY(), newZ)
  }

  getUpwardsVelocity() {
    return this.upwardsVelocity
  }

  getHorizontalVelocity() {
    return this.horizontalVelocity
  }

  setUpwardsVelocity(newUpwardsVelocity) {
    this.upwardsVelocity = newUpwardsVelocity
  }

  setHorizontalVelocity(newHorizontalVelocity) {
    this.horizontalVelocity = newHorizontalVelocity
  }

  setUpwardsRotation(newupwardsRotation) {
    this.upwardsRotation = newupwardsRotation
  }

  setHorizontalRotation(newhorizontalRotation) {
    this.horizontalRotation = newhorizontalRotation
  }

  getHorizontalRotation() {
    return this.horizontalRotation
  }

  getUpwardsRotation() {
    return this.upwardsRotation
  }

}



