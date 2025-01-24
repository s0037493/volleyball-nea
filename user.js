
class User extends Player {
   constructor(inputDimensions, inputColour, inputX, inputY, inputZ, team) {

      super(inputDimensions, inputColour, team) //gives shape dimensions and colour using code from Box class. Also sets which team player is on.
      //if team=true, then player is on right. if false, left.
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.mesh.receiveShadow = true;
      this.mesh.castShadow = true;

      this.mesh.position.x = inputX;
      this.mesh.position.y = inputY
      this.mesh.position.z = inputZ

      this.rotationDegrees = 270 //defaults at 270

   }

   checkMovement() { //method for user movement
      if (keysPressedDown["w"] === true) {  //w
         this.mesh.position.z = this.mesh.position.z - 0.5;
      };

      if (keysPressedDown["a"] === true) {  //a
         this.mesh.position.x = this.mesh.position.x - 0.5;
      };

      if (keysPressedDown["s"] === true) {  //s
         this.mesh.position.z = this.mesh.position.z + 0.5;
      };

      if (keysPressedDown["d"] === true) {  //d
         this.mesh.position.x = this.mesh.position.x + 0.5;

         //the code below shouldn't really be here but is kept to test ball movements if necessary

         // ball.setUpwardsVelocity(-0.2)
         // ball.setHorizontalVelocity(0.85)

         // ball.setUpwardsRotation(pi/4)
         // // ball.setHorizontalRotation((this.rotationDegrees*pi)/180)
         // ball.setHorizontalRotation(pi/2)

      };


      if (keysPressedDown["ArrowRight"] === true) { //right arrow
         this.mesh.rotateY(-1 / 128 * 2 * pi) //rotates by 1/128 of the circle every time pressed
         this.rotationDegrees = this.rotationDegrees - 360 / 128
         if (this.rotationDegrees == 360 || this.rotationDegrees == -360) {
            this.rotationDegrees = 0 //not strictly necessary, but sets a boundary from -360 to 360 for the angle.
         }
      }
      if (keysPressedDown["ArrowLeft"] === true) { //left arrow
         this.mesh.rotateY(1 / 128 * 2 * pi) //rotates by 1/128 of the circle every time pressed
         this.rotationDegrees = this.rotationDegrees + 360 / 128
         if (this.rotationDegrees == 360 || this.rotationDegrees == -360) {
            this.rotationDegrees = 0 //not strictly necessary, but sets a boundary from -360 to 360 for the angle.
         }
      }

      if (keysPressedDown[" "] === true && this.getY() == 5) { //space and on the floor
         this.setUpwardsVelocity(0.65)
         this.setUpwardsRotation(pi / 2) //90 degrees
      }
   }

   ballActions(input) {

      if (input === "e") {  //e, BLOCK
         if (this.ballInRangeBlockingEdition() && (ballTouches == 0 || ballTouches == 3)) { //last touch came from left team (block)
            ball.setUpwardsVelocity((Math.random()*(1.4-0.6)+0.6)-1)
            ball.setHorizontalVelocity(0.4)
            ball.setUpwardsRotation(Math.random()*(1.22173048-0.4)+0.4)
            ball.setHorizontalRotation(this.rotationRadians)
            movementPrediction()

            lastTouchTeam = true;
            lastTouch = "a"
            ballTouches++

            console.log(ballTouches)

            movementPrediction()
            setTimeout(250,movementDecision())

            console.log("Block")
         }

         //e, HIT
         else if (this.ballInRange() && (ballTouches == 1 || ballTouches == 2)) { //last touch came from right team (hit)
            if (lastTouch != "a") { //if the user did NOT touch ball last, allow the hit:
               ball.setUpwardsVelocity(0.3)

               if (ABDistance("a", "ACTUALball") <= 2) ball.setHorizontalVelocity(Math.random()*(1.9-1.6)+1.6)
               else ball.setHorizontalVelocity(Math.random()*(1.2-0.7)+0.7)


               ball.setUpwardsRotation(Math.random()*(1.22173048-0.8)+0.8)
               ball.setHorizontalRotation(this.rotationRadians)


               lastTouchTeam = true;
               lastTouch = "a"
               ballTouches++

               console.log(ballTouches)


               setTimeout(movementDecision, 250)
            }
            else if (lastTouch == "a") { //double touch.
               setTimeout(scoring,500,false)
               console.log("left team have won " + leftPoints + " points.")
               console.log("Double touch.")
            }
         }
      };

      if (input === "r") {  //r, set
         if (this.ballInRange()) {
            if (lastTouch != "a") { //if the user did NOT touch ball last, allow the hit:
               ball.setUpwardsVelocity(1.2)
               ball.setHorizontalVelocity(0.15)

               ball.setUpwardsRotation(1.22173048) //50 degrees
               ball.setHorizontalRotation(this.rotationRadians)
               movementPrediction()

               keysPressedDown["r"] === false
               lastTouchTeam = true;
               lastTouch = "a"
               ballTouches++

               movementPrediction()
               movementDecision()
            }
            else if (lastTouch == "a") { //double touch.
               setTimeout(scoring(false), 2500)
               console.log("left team have won " + leftPoints + " points.")
               console.log("Double touch.")
            }
         }
      };

      if (input === "f") {  //f, pass (automatic angle)
         if (this.ballInRange()) {
            if (lastTouch != "a") { //if the user did NOT touch ball last, allow the hit:
               ball.setUpwardsVelocity(1.2)
               //HORIZONTAL VELOCITY MANAGEMENT
               let ABdist = ABDistance("a", "b")

               if (ABdist <= 12) ball.setHorizontalVelocity(0.05)//0 to 12
               else if (ABdist <= 18) ball.setHorizontalVelocity(0.1)//13 to 18
               else if (ABdist <= 22) ball.setHorizontalVelocity(0.12)//19 to 22
               else if (ABdist <= 26) ball.setHorizontalVelocity(0.14)//23 to 26
               else if (ABdist <= 29) ball.setHorizontalVelocity(0.16)//27 to 29 
               else if (ABdist >= 30) ball.setHorizontalVelocity(0.2)//30 up  



               ball.setUpwardsRotation(0.87266463) //50 degrees
               ball.setHorizontalRotation(pTpAngle("a", "b", false))
               movementPrediction()

               lastTouchTeam = true;
               lastTouch = "a"
               ballTouches++

               movementPrediction()
               movementDecision()
            }
            else if (lastTouch == "a") { //double touch.
               setTimeout(scoring(false), 2500)
               console.log("left team have won " + leftPoints + " points.")
               console.log("Double touch.")
            }
         }
      }
      ;

      if (input === "l") {  //l, move the ball above user
         ball.setX(this.getX())
         ball.setY(this.getY() + 7)
         ball.setZ(this.getZ())

         ai[0].setX(5)
         ai[0].setY(5)
         ai[0].setZ(0)

         lastTouch = "d"
         ballTouches = 0
         lastTouchTeam = true

      }


      if (input === "t") {  //t, toss
         console.log("A")
         if (serving == true){
            console.log("B")
            if (this.ballInRange()) {
               serviceCollider = false
               console.log("C")

               ball.setUpwardsVelocity(1)
               ball.setHorizontalVelocity(0.05)
               ball.setUpwardsRotation(0.87266463) //50 degrees
               ball.setHorizontalRotation(this.rotationRadians)

               serviceCollider = false
               lastTouchTeam = true;
               lastTouch = "a"
               ballTouches++

            }
         }
      };

      if (input === "g") {  //g, serve
         if (servingPlayer == 0 && serving == true) {
            if (this.ballInRange()) {

               if (this.getY() >= 7) { //jump serve
                  ball.setUpwardsVelocity(0.6)
                  ball.setHorizontalVelocity((Math.random() * (2.2-1.8) + 1.4))
               }
               else { //standing serve
                  ball.setUpwardsVelocity(0.8)
                  ball.setHorizontalVelocity(1.8)
               }
               ball.setUpwardsRotation(0.87266463) //50 degrees
               ball.setHorizontalRotation(this.rotationRadians)
               serviceCollider = false;
               gPressed = true;
               serving = false;

               lastTouchTeam = true;
               lastTouch = "a"
               ballTouches++

               setTimeout(movementDecision, 250)
            }
         }
      };

   };

   arrow() {
      scene.remove(pointerArrow) //removes old arrow
      pointerArrow = new THREE.ArrowHelper(dir, user.mesh.position, 10, 0xffbf00); //updates arrow to have its origin at the user's position

      this.rotationRadians = (this.rotationDegrees * pi) / 180 //converts the background value for user's rotation from degrees to radians

      dir.set(Math.sin(this.rotationRadians), 0, Math.cos(this.rotationRadians));
      dir.normalize()
      pointerArrow.setDirection(dir) //sets the direction of the arrow to be directly in front of the front face of user

      scene.add(pointerArrow)
   }

   ballInRangeBlockingEdition() {
      let XDistance = (this.getX() - ball.getX())
      let YDistance = this.getY() - ball.getY()
      let ZDistance = (this.getZ() - ball.getZ())

      let totalDistanceSquared = XDistance ** 2 + YDistance ** 2 + ZDistance ** 2 //pythagoras
      let distanceToBall = Math.sqrt(totalDistanceSquared) //pythagoras

      if (distanceToBall < 4) {
         // console.log("In range")
         return true //ball is in range
      }
      else {
         // console.log("Out of range")
         return false //ball out of range
      }
   }




}



