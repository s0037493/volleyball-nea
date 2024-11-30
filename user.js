class User extends Player {
   constructor(inputDimensions, inputColour, inputX, inputY, inputZ, team) {

      super(inputDimensions, inputColour, team) //gives shape dimensions and colour using code from Box class. Also sets which team player is on.
      //if team=true, then player is on right. if false, left.
      this.mesh = new THREE.Mesh(this.geometry, this.material);

      this.mesh.position.x = inputX;
      this.mesh.position.y = inputY
      this.mesh.position.z = inputZ

      this.rotationDegrees = 270 //defaults at 270



   }

   checkMovement() { //method for user movement
      if (keysPressedDown["w"] === true) {  //w
         this.mesh.position.z = this.mesh.position.z - 2;
      };

      if (keysPressedDown["a"] === true) {  //a
         this.mesh.position.x = this.mesh.position.x - 2;
      };

      if (keysPressedDown["s"] === true) {  //s
         this.mesh.position.z = this.mesh.position.z + 2;
      };

      if (keysPressedDown["d"] === true) {  //d
         this.mesh.position.x = this.mesh.position.x + 2;

         //the code below shouldn't really be here but is kept to test ball movements if necessary

         // ball.setUpwardsVelocity(-0.2)
         // ball.setHorizontalVelocity(0.85)

         // ball.setUpwardsRotation(pi/4)
         // // ball.setHorizontalRotation((this.rotationDegrees*pi)/180)
         // ball.setHorizontalRotation(pi/2)

      };


      if (keysPressedDown["ArrowRight"] === true) { //right arrow
         this.mesh.rotateY(-0.0625 * pi) //rotates by 1/32 of the circle every time pressed
         this.rotationDegrees = this.rotationDegrees - 11.25
         if (this.rotationDegrees == 360 || this.rotationDegrees == -360) {
            this.rotationDegrees = 0 //not strictly necessary, but sets a boundary from -360 to 360 for the angle.
         }
      }
      if (keysPressedDown["ArrowLeft"] === true) { //left arrow
         this.mesh.rotateY(0.0625 * pi) //rotates by 1/32 of the circle every time pressed
         this.rotationDegrees = this.rotationDegrees + 11.25
         if (this.rotationDegrees == 360 || this.rotationDegrees == -360) {
            this.rotationDegrees = 0 //not strictly necessary, but sets a boundary from -360 to 360 for the angle.
         }
      }

      if (keysPressedDown[" "] === true && this.getY() == 5) { //space and on the floor
         this.setUpwardsVelocity(0.65)
         this.setUpwardsRotation(pi / 2) //90 degrees
      }
   }

   ballActions() {
      if (keysPressedDown["e"] === true) {  //e, hit
         if (this.ballInRange()) {
            ball.setUpwardsVelocity(0.3)
            ball.setHorizontalVelocity(0.5)

            ball.setUpwardsRotation(1.22173048)
            ball.setHorizontalRotation(this.rotationRadians)
            movementPrediction()

            lastTouchTeam = false;
            lastTouch="a"
            ballTouches++
            console.log(ballTouches+" touches")
            
            movementPrediction()
            movementDecision()
         }
      };

      if (keysPressedDown["r"] === true) {  //r, set
         if (this.ballInRange()) {
            ball.setUpwardsVelocity(1.2)
            ball.setHorizontalVelocity(0.15)

            ball.setUpwardsRotation(1.22173048) //50 degrees
            ball.setHorizontalRotation(this.rotationRadians)
            movementPrediction()

            lastTouchTeam = false;
            lastTouch="a"
            ballTouches++
            console.log(ballTouches+" touches")
            
            movementPrediction()
            movementDecision()
         }
      };

      if (keysPressedDown["f"] === true) {  //f, pass (automatic angle)
         if (this.ballInRange()) {
            ball.setUpwardsVelocity(1.5)
            //HORIZONTAL VELOCITY MANAGEMENT
            let ABdist = ABDistance("a", "b")
            console.log(ABdist)
            if (ABdist <= 12) ball.setHorizontalVelocity(0.05)//0 to 12
            else if (ABdist <= 18) ball.setHorizontalVelocity(0.1)//13 to 18
            else if (ABdist <= 22) ball.setHorizontalVelocity(0.12)//19 to 22
            else if (ABdist <= 26) ball.setHorizontalVelocity(0.14)//23 to 26
            else if (ABdist <= 29) ball.setHorizontalVelocity(0.16)//27 to 29 
            else if (ABdist >= 30) ball.setHorizontalVelocity(0.2)//30 up  
         

         ball.setUpwardsRotation(0.87266463) //50 degrees
         console.log("angle required is: " + pTpAngle("a", "b",false))
         ball.setHorizontalRotation(pTpAngle("a", "b",true))
         movementPrediction()

         lastTouchTeam = false;
         lastTouch="a"
         ballTouches++
         console.log(ballTouches+" touches")
         
         movementPrediction()
         movementDecision()
         }
      }
      ;

      if (keysPressedDown["p"] === true) {  //p, get predictions
         console.log(ball.getPredictedX())
         console.log(ball.getPredictedZ())
      }

      if (keysPressedDown["l"] === true) {  //l, move the ball above user
         ball.setX(this.getX())
         ball.setY(this.getY() + 7)
         ball.setZ(this.getZ())

      }


      if (keysPressedDown["t"] === true) {  //t, toss
         if (servingPlayer == 0 && serving == true) {
            if (this.ballInRange()) {
               ball.setUpwardsVelocity(1)
               ball.setHorizontalVelocity(0)

               ball.setUpwardsRotation(1.22173048) //70 degrees
               ball.setHorizontalRotation(this.rotationRadians)
               serviceCollider = false;
            }
         }
      };

      if (keysPressedDown["g"] === true) {  //g, serve
         if (servingPlayer == 0 & serving == true) {
            if (this.ballInRange()) {

               if (this.getY() >= 7) {
                  console.log("jump serve")
                  ball.setUpwardsVelocity(0.6)
                  ball.setHorizontalVelocity(2.1)
               }
               else {
                  console.log("not a jump serve")
                  ball.setUpwardsVelocity(0.8)
                  ball.setHorizontalVelocity(1.8)
               }
               ball.setUpwardsRotation(0.87266463) //50 degrees
               ball.setHorizontalRotation(this.rotationRadians)
               serviceCollider = false;
               gPressed = true;
               serving = false;

               lastTouchTeam = false;
               lastTouch="a"
               ballTouches++
               
               movementPrediction()
               movementDecision()
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




}



