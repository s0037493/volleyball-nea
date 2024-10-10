class User extends Player {
constructor(inputDimensions, inputColour, inputX, inputY, inputZ, team){
  
  super(inputDimensions, inputColour, team) //gives shape dimensions and colour using code from Box class. Also sets which team player is on.
    //if team=true, then player is on right. if false, left.
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  
  this.mesh.position.x = inputX;
  this.mesh.position.y = inputY
  this.mesh.position.z = inputZ
    
  this.rotationDegrees=0 //defaults at 0
    


  }

  checkMovement(input){ //method for user movement
    if(input.key ==="w"){  //w
        this.mesh.position.z--; 
    };  
      
    if(input.keyCode ==65){  //a
        this.mesh.position.x--;
    };      
      
    if(input.keyCode ==83){  //s
        this.mesh.position.z++; 
    };   
      
    if(input.keyCode ==68){  //d
        this.mesh.position.x++;  

    //the code below shouldn't really be here but is kept to test ball movements if necessary

        // ball.setUpwardsVelocity(-0.2)
        // ball.setHorizontalVelocity(0.85)

        // ball.setUpwardsRotation(pi/4)
        // // ball.setHorizontalRotation((this.rotationDegrees*pi)/180)
        // ball.setHorizontalRotation(pi/2)

    };  


    if(input.keyCode==39){ //right arrow
        this.mesh.rotateY(-0.0625 * pi) //rotates by 1/32 of the circle every time pressed
        this.rotationDegrees = this.rotationDegrees - 11.25
        if(this.rotationDegrees == 360 || this.rotationDegrees == -360){ 
            this.rotationDegrees =0 //not strictly necessary, but sets a boundary from -360 to 360 for the angle.
        }
    }
    if(input.keyCode==37){ //left arrow
        this.mesh.rotateY(0.0625 * pi) //rotates by 1/32 of the circle every time pressed
        this.rotationDegrees = this.rotationDegrees + 11.25
        if(this.rotationDegrees == 360 || this.rotationDegrees == -360){ 
            this.rotationDegrees =0 //not strictly necessary, but sets a boundary from -360 to 360 for the angle.
        }
    }

      if(input.keyCode==32 && this.getY()==5){ //space and on the floor
          this.setUpwardsVelocity(0.65)
          this.setUpwardsRotation(pi/2) //90 degrees
      }
  }

  ballActions(input){
    if(input.keyCode==69){  //e, hit
        if(this.ballInRange()){
            ball.setUpwardsVelocity(0.3)
            ball.setHorizontalVelocity(0.85)

            ball.setUpwardsRotation(pi/4)
            ball.setHorizontalRotation(this.rotationRadians)
        }
    };  

    if(input.keyCode==82){  //r, set
        if(this.ballInRange()){
            ball.setUpwardsVelocity(1.2)
            ball.setHorizontalVelocity(0.45)

            ball.setUpwardsRotation(0.87266463) //50 degrees
            ball.setHorizontalRotation(this.rotationRadians)
        }
    };  

    if(input.keyCode == 70){  //f, pass (automatic angle)
        if(this.ballInRange()){

            ball.setUpwardsVelocity(1.5)
            ball.setHorizontalVelocity(0.35)

            ball.setUpwardsRotation(0.87266463) //50 degrees

            console.log("angle required is: "+pTpAngle("a","b"))

            ball.setHorizontalRotation(pTpAngle("a","b"))
        }
    };
    
    if(input.keyCode===80){  //p, move the ball into the air
        ball.setY(10)
        }

    if(input.keyCode===76){  //l, move the ball above user
        ball.setX(this.getX())
        ball.setY(this.getY()+7)
        ball.setZ(this.getZ())


        console.log(this.rotationDegrees + " user's current rotation")
        }
    };  

  

    arrow(){
        scene.remove(pointerArrow) //removes old arrow
        pointerArrow = new THREE.ArrowHelper( dir, user.mesh.position, 10, 0xffbf00 ); //updates arrow to have its origin at the user's position

        this.rotationRadians = (this.rotationDegrees*pi)/180 //converts the background value for user's rotation from degrees to radians

        dir.set(Math.sin(this.rotationRadians), 0, Math.cos(this.rotationRadians)); 
        dir.normalize()
        pointerArrow.setDirection(dir) //sets the direction of the arrow to be directly in front of the front face of user

        scene.add(pointerArrow)
        }




}
  

  
