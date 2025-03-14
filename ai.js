class AI extends Player {
  constructor(inputDimensions, inputColour, inputX, inputY, inputZ, team, letter, tl) {

    super(inputDimensions, inputColour, team) //gives shape dimensions and colour using code from Box class. Also sets which team player is on.
    //if team=true, then player is on right. if false, left.
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;

    this.mesh.position.x = inputX;
    this.mesh.position.y = inputY
    this.mesh.position.z = inputZ

    this.timeToMove = false;
    this.pX;
    this.pZ;
    this.makeAction = false

    this.letter = letter;
    this.teammateLetter = tl;

    this.mustPosition = false;

    //serving variables
    this.choice;
    this.allowedToServe = false;
  }

  defensivePosition() {
    if (this.mustPosition == true) {
      if (this.letter == "b") this.basePosition = [24, 10]
      else if (this.letter == "c") this.basePosition = [-24, 10]
      else if (this.letter == "d") this.basePosition = [-24, -10]

      if (this.basePosition[0] > this.getX()) {//if the position has higher x coord than ai:
        this.setX(this.getX() + 0.15)//increase x
      }
      else if (this.basePosition[0] < this.getX()) {//if the position has lower x coord than ai:
        this.setX(this.getX() - 0.15)//decrease x
      }

      if (this.basePosition[1] > this.getZ()) {//same as X
        this.setZ(this.getZ() + 0.15)
      }
      else if (this.basePosition[1] < this.getZ()) {
        this.setZ(this.getZ() - 0.15)
      }

      if (Math.sqrt((this.getX() - this.defensivePosition[0]) ** 2 + (this.getZ() - this.defensivePosition[1]) ** 2) < 4) {
        this.mustPosition = false;     //stop looping
        console.log("rnayhjktnhljka")
      }
    }
  }



  moveToBall() { //input predicted X, predicted 
    // console.log(this.pX +" "+this.letter)
    // console.log(this.pZ +" "+this.letter)

    if (this.timeToMove == true) {//while the AI is not at the ball:

      if (this.pX > this.getX()) {//if the ball has higher x coord than ai:
        this.setX(this.getX() + 0.18)//increase x
      }
      else if (this.pX < this.getX()) {//if the ball has lower x coord than ai:
        this.setX(this.getX() - 0.18)//decrease x
      }

      if (this.pZ > this.getZ()) {//same as X
        this.setZ(this.getZ() + 0.18)
      }
      else if (this.pZ < this.getZ()) {
        this.setZ(this.getZ() - 0.18)
      }

      if (Math.sqrt((this.getX() - this.pX) ** 2 + (this.getZ() - this.pZ) ** 2) < 2.75) { //check if the ball is in range on X and Z axes.

        // if(Math.abs(this.getX()-this.pX <= 2)){//if the AI is in range of ball based on x
        //   if(Math.abs(this.getZ()-this.pZ <= 2)){//if the AI is in range of ball based on z

        // this.actionDecision()
        this.makeAction = true;
        this.timeToMove = false;     //stop looping
      }
    }
  }

  actionDecision() {
    if (this.makeAction == true) { //if moveToBall function says to play the ball

      if (ballTouches == 0 && this.ballInRange() == true) {
        this.pass() //(function must include makeAction = false)
      }
      else if (ballTouches == 1 && this.ballInRange() == true) {

        this.set() //(function must include makeAction = false)
      }
      else if (ballTouches == 2) { // && (Math.abs(getPredictedX()<23))
        if (ball.getY() > 7 && ABDistance(this.letter, "ACTUALballXZ") < 8) {
          this.allowedToHit = true; //(function must include makeAction = false)
        }
      }
    }
  }

  pass() {
    ball.setUpwardsVelocity(1.2)
    //HORIZONTAL VELOCITY MANAGEMENT
    let ABdist = ABDistance(this.letter, this.teammateLetter)

    // ball.setHorizontalVelocity(14)


    if (ABdist <= 12) ball.setHorizontalVelocity(0.05)//0 to 12
    else if (ABdist <= 18) ball.setHorizontalVelocity(0.1)//13 to 18
    else if (ABdist <= 22) ball.setHorizontalVelocity(0.12)//19 to 22
    else if (ABdist <= 26) ball.setHorizontalVelocity(0.14)//23 to 26
    else if (ABdist <= 29) ball.setHorizontalVelocity(0.16)//27 to 29 
    else if (ABdist <= 33) ball.setHorizontalVelocity(0.2)//30 up  
    else if (ABdist <= 35) ball.setHorizontalVelocity(0.22)//30 up
    else if (ABdist > 35) ball.setHorizontalVelocity(0.26)//30 up  


    ball.setUpwardsRotation(0.87266463) //50 degrees
    console.log("Passing" + this.letter)
    ball.setHorizontalRotation(pTpAngle(this.letter, this.teammateLetter, false))
    if (this.letter == "b") lastTouchTeam = true; //if on right, right touched last
    else lastTouchTeam = false; //if on left, left touched last
    lastTouch = this.letter;
    ballTouches++;
    this.timeToMove = false;
    this.makeAction = false;
    movementPrediction()
    movementDecision()
  }

  set() {
    let ABdist = ABDistance(this.letter, this.teammateLetter)

    if (ABdist <= 7) {
      ball.setHorizontalVelocity(0.1)
      ball.setUpwardsVelocity(0.8)
    }

    else {
      if (ABdist <= 12) ball.setHorizontalVelocity(0.13)//0 to 12
      else if (ABdist <= 18) ball.setHorizontalVelocity(0.15)//13 to 18
      else if (ABdist <= 22) ball.setHorizontalVelocity(0.17)//19 to 22
      else if (ABdist <= 26) ball.setHorizontalVelocity(0.18)//23 to 26
      else if (ABdist <= 29) ball.setHorizontalVelocity(0.2)//27 to 29 
      else if (ABdist > 29) ball.setHorizontalVelocity(0.23)//30 up    
      ball.setUpwardsVelocity(1.2)
    }

    ball.setUpwardsRotation(1.22173048) //50 degrees
    ball.setHorizontalRotation(pTpAngle(this.letter, this.teammateLetter, true))
    console.log("Setting" + this.letter)
    if (this.letter == "b") lastTouchTeam = true; //if on right, right touched last
    else lastTouchTeam = false; //if on left, left touched last
    lastTouch = this.letter;
    ballTouches++;
    this.timeToMove = false;
    this.makeAction = false;
    movementPrediction()
    movementDecision()
  }

  hit() {
    if (this.allowedToHit == true) {
      //jump
      if (this.getY() == 5) {
        this.setUpwardsVelocity(0.55)
        this.setUpwardsRotation(pi / 2) //90 degrees
        setTimeout(this.noHit(), 1500)
      }

      //hit
      if (this.ballInRange() == true) {
        ball.setUpwardsVelocity(0.22)
        //changed hit velocity for testing purposes
        // ball.setHorizontalVelocity(10)
        ball.setHorizontalVelocity(Math.random() * (1.9 - 1.4) + 1.4 + velocityOffset[chosenDifficulty])
        ball.setUpwardsRotation(Math.random() * (1.22173048 - 0.8) + 0.8 + rotationOffset[chosenDifficulty])
        console.log(ball.getUpwardsRotation() + " angle")
        console.log(ball.getHorizontalVelocity() + " velocity")
        if (this.letter == "b") {
          this.boundOne = pTpAngle(this.letter, "tl", false)
          this.boundTwo = pTpAngle(this.letter, "bl", false)
        }
        else if (this.letter == "c" || this.letter == "d") {
          this.boundOne = pTpAngle(this.letter, "tr", false)
          this.boundTwo = pTpAngle(this.letter, "br", false)
        }
        if (this.boundOne < this.boundTwo) this.chosenAngle = Math.random() * (this.boundTwo - this.boundOne) + this.boundOne //if max=boundTwo, generate random
        else this.chosenAngle = Math.random() * (this.boundTwo - this.boundOne) + this.boundOne //if max=boundOne, generate random
        ball.setHorizontalRotation(this.chosenAngle) //set the random angle

        //manage touches
        if (this.letter == "b") lastTouchTeam = true; //if on right, right touched last
        else lastTouchTeam = false; //if on left, left touched last
        lastTouch = this.letter;
        ballTouches++;
        this.timeToMove = false;
        this.makeAction = false;
        this.allowedToHit = false;
        setTimeout(250, movementDecision())
      }

    }
  }

  noHit() {
    this.timeToMove = false;
    this.makeAction = false;
    this.allowedToHit = false;
    movementPrediction()
    movementDecision()
  }

  service() {
    this.allowedToServe = true;

    if (serving == true && this.allowedToServe == true) {
      if (this.choice != 1) {
        setTimeout(() => this.toss(), 1000)
      }
    }

    
  }

  //maybe make seperate functions for the toss, jump and serve so in theory they just follow each other.
  toss() {
    if (this.getY() == 5 && ball.getY() == 5 && this.ballInRange()) {
      console.log("Toss")
      ball.setUpwardsVelocity(0) //ensures user motion stops and physics engine wont take them lower.
      ball.setHorizontalVelocity(0)

      serviceCollider = false;

      ball.setUpwardsVelocity(1.3)
      ball.setHorizontalVelocity(0)
      ball.setUpwardsRotation(1.22173048) //70 degrees

      if (this.letter == "b") lastTouchTeam = true; //if on right, right touched last
      else lastTouchTeam = false; //if on left, left touched last

      setTimeout(() => this.jump(), 550)

    }
  }


  jump() {
    console.log("jump")
    this.setUpwardsVelocity(0.65)
    this.setUpwardsRotation(pi / 2) //90 degrees
  }


  serveHit() {
    if (this.ballInRange() && this.getY() > 5 && serving == true) {
      alert("jump")

      //manage angle of incidence
      if (this.letter == "b") {
        this.boundOne = pTpAngle(this.letter, "tl", false)
        this.boundTwo = pTpAngle(this.letter, "bl", false)
      }
      else if (this.letter == "c" || this.letter == "d") {
        this.boundOne = pTpAngle(this.letter, "tr", false)
        this.boundTwo = pTpAngle(this.letter, "br", false)
      }
      if (this.boundOne < this.boundTwo) this.chosenAngle = Math.random() * (this.boundTwo - this.boundOne) + this.boundOne //if max=boundTwo, generate random
      else this.chosenAngle = Math.random() * (this.boundTwo - this.boundOne) + this.boundOne //if max=boundOne, generate random

      //manage physics
      ball.setHorizontalRotation(this.chosenAngle) //set the random angle
      ball.setUpwardsVelocity(0.5)
      ball.setHorizontalVelocity((Math.random() * (2.4 - 1.8) + 1.8))
      ball.setUpwardsRotation(0.78539) //50 degrees

      //manage touches
      if (this.letter == "b") lastTouchTeam = true; //if on right, right touched last
      else lastTouchTeam = false; //if on left, left touched last
      lastTouch = this.letter;
      ballTouches++;
      this.timeToMove = false;
      this.makeAction = false;
      this.allowedToHit = false;
      setTimeout(250, movementDecision())

      //reset serve variables
      serving = false;
      this.allowedToServe = false;
    }
    

    else if (this.ballInRange() && this.choice == 1 && serving == true){
      alert("stand")

      //manage angle of incidence
      if (this.letter == "b") {
        this.boundOne = pTpAngle(this.letter, "tl", false)
        this.boundTwo = pTpAngle(this.letter, "bl", false)
      }
      else if (this.letter == "c" || this.letter == "d") {
        this.boundOne = pTpAngle(this.letter, "tr", false)
        this.boundTwo = pTpAngle(this.letter, "br", false)
      }
      if (this.boundOne < this.boundTwo) this.chosenAngle = Math.random() * (this.boundTwo - this.boundOne) + this.boundOne //if max=boundTwo, generate random
      else this.chosenAngle = Math.random() * (this.boundTwo - this.boundOne) + this.boundOne //if max=boundOne, generate random

      //manage physics
      ball.setHorizontalRotation(this.chosenAngle) //set the random angle
      ball.setUpwardsVelocity(0.9)
      ball.setHorizontalVelocity(1.8)
      ball.setUpwardsRotation(0.78539) //50 degrees

      //manage touches
      if (this.letter == "b") lastTouchTeam = true; //if on right, right touched last
      else lastTouchTeam = false; //if on left, left touched last
      lastTouch = this.letter;
      ballTouches++;
      this.timeToMove = false;
      this.makeAction = false;
      this.allowedToHit = false;
      setTimeout(250, movementDecision())

      //reset serve variables
      serving = false;
      this.allowedToServe = false;
    }

  }






  setpX(input) {
    this.pX = input;
  }

  setpZ(input) {
    this.pZ = input
  }
  setTTM(input) {
    this.timeToMove = input
  }
}