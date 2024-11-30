class AI extends Player {
    constructor(inputDimensions, inputColour, inputX, inputY, inputZ, team, letter, tl){
      
      super(inputDimensions, inputColour, team) //gives shape dimensions and colour using code from Box class. Also sets which team player is on.
        //if team=true, then player is on right. if false, left.
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      
      this.mesh.position.x = inputX;
      this.mesh.position.y = inputY
      this.mesh.position.z = inputZ

      this.timeToMove = false;
      this.pX;
      this.pZ;
      this.makeAction = false

      this.letter = letter;
      this.teammateLetter = tl;
      }
      

      moveToBall(){ //input predicted X, predicted 
        // console.log(this.pX +" "+this.letter)
        // console.log(this.pZ +" "+this.letter)

        if(this.timeToMove==true){//while the AI is not at the ball:

          if(this.pX>this.getX()){//if the ball has higher x coord than ai:
            this.setX(this.getX()+0.15)//increase x
          }
          else if(this.pX<this.getX()){//if the ball has lower x coord than ai:
            this.setX(this.getX()-0.15)//decrease x
          }

          if(this.pZ>this.getZ()){//same as X
            this.setZ(this.getZ()+0.15)
          }
          else if(this.pZ<this.getZ()){
            this.setZ(this.getZ()-0.15)
          }

          if(Math.sqrt((this.getX()-this.pX)**2 - (this.getZ()-this.pZ)**2) < 3){ //check if the ball is in range on X and Z axes.

          // if(Math.abs(this.getX()-this.pX <= 2)){//if the AI is in range of ball based on x
          //   if(Math.abs(this.getZ()-this.pZ <= 2)){//if the AI is in range of ball based on z
              console.log("in range!") 
              // this.actionDecision()
              this.makeAction = true;
              this.timeToMove=false;     //stop looping
            }
          }
        }
      

      actionDecision(){
        if(this.makeAction == true){ //if moveToBall function says to play the ball

        if(ballTouches == 0 && this.ballInRange() == true){
          console.log("pass")
          this.pass() //(function must include makeAction = false)
        }
        else if(ballTouches == 1 && this.ballInRange() == true){
          console.log("set")
          this.set() //(function must include makeAction = false)
        }
        else if(ballTouches == 2){
          if(ball.getY()>7 && (Math.abs(ball.getX()<23))){
            this.allowedToHit = true; //(function must include makeAction = false)
          }
          else{
            //this.freeball() (function must include makeAction = false)
          }
          
        }
      }
    }



    pass(){
      ball.setUpwardsVelocity(1.5)
      //HORIZONTAL VELOCITY MANAGEMENT
      let ABdist = ABDistance(this.letter, this.teammateLetter)
      if (ABdist <= 12) ball.setHorizontalVelocity(0.05)//0 to 12
      else if (ABdist <= 18) ball.setHorizontalVelocity(0.1)//13 to 18
      else if (ABdist <= 22) ball.setHorizontalVelocity(0.12)//19 to 22
      else if (ABdist <= 26) ball.setHorizontalVelocity(0.14)//23 to 26
      else if (ABdist <= 29) ball.setHorizontalVelocity(0.16)//27 to 29 
      else if (ABdist >= 30) ball.setHorizontalVelocity(0.2)//30 up  
      ball.setUpwardsRotation(0.87266463) //50 degrees
      ball.setHorizontalRotation(pTpAngle(this.letter, this.teammateLetter,false))
      lastTouchTeam = true;
      lastTouch = this.letter;
      ballTouches++;
      this.timeToMove = false;
      this.makeAction = false;
      movementPrediction()
      movementDecision()
      console.log(ballTouches+" touches")
    }

    set(){
      ball.setUpwardsVelocity(1.2)
      ball.setHorizontalVelocity(0.13 )
      ball.setUpwardsRotation(1.22173048) //50 degrees
      ball.setHorizontalRotation(pTpAngle(this.letter, this.teammateLetter,true))

      lastTouchTeam = true;
      lastTouch = this.letter;
      ballTouches++;
      this.timeToMove = false;
      this.makeAction = false;
      movementPrediction()
      movementDecision()
      console.log(ballTouches+" touches")
    }

    hit(){
      if(this.allowedToHit==true){
      //jump
      if(this.getY()==5){
      this.setUpwardsVelocity(0.65)
      this.setUpwardsRotation(pi / 2) //90 degrees
      }

      //hit
      if(this.ballInRange() == true){
      ball.setUpwardsVelocity(0.3)
      ball.setHorizontalVelocity(0.5)
      ball.setUpwardsRotation(1.22173048) //50 degrees
      this.boundOne = pTpAngle(this.letter, "l", false)
      this.boundTwo = pTpAngle(this.letter, "r", false)
      if(this.boundOne<this.boundTwo) this.chosenAngle = Math.random() * (this.boundTwo - this.boundOne) + this.boundOne //if max=boundTwo, generate random
      else this.chosenAngle = Math.random() * (this.boundTwo - this.boundOne) + this.boundOne //if max=boundOne, generate random
      ball.setHorizontalRotation(this.chosenAngle) //set the random angle

      //manage touches
      lastTouchTeam = true;
      lastTouch = this.letter;
      ballTouches++;
      this.timeToMove = false;
      this.makeAction = false;
      this.allowedToHit = false;
      movementPrediction()
      movementDecision()
      console.log(ballTouches+" touches")
      }
      }
    }



      setpX(input){
        this.pX = input;
      }

      setpZ(input){
        this.pZ=input
      }
      setTTM(input){ 
        this.timeToMove=input
      }
    }   