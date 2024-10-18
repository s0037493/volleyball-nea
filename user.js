class User extends Player {
constructor(inputDimensions, inputColour, inputX, inputY, inputZ, team){
  
  super(inputDimensions, inputColour, team) //gives shape dimensions and colour using code from Box class. Also sets which team player is on.
    //if team=true, then player is on right. if false, left.
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  
  this.mesh.position.x = inputX;
  this.mesh.position.y = inputY
  this.mesh.position.z = inputZ
    
  this.rotationDegrees=270 //defaults at 270
    


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
            ball.setHorizontalVelocity(0.5)

            ball.setUpwardsRotation(1.22173048)
            ball.setHorizontalRotation(this.rotationRadians)
        }
    };  

    if(input.keyCode==82){  //r, set
        if(this.ballInRange()){
            ball.setUpwardsVelocity(1.2)
            ball.setHorizontalVelocity(0.15)

            ball.setUpwardsRotation(1.22173048) //50 degrees
            ball.setHorizontalRotation(this.rotationRadians)
        }
    };  

    if(input.keyCode == 70){  //f, pass (automatic angle)
        if(this.ballInRange()){
            ball.setUpwardsVelocity(1.5)
            //HORIZONTAL VELOCITY MANAGEMENT
            let ABdist = ABDistance("a","b")
            console.log(ABdist)
                if(ABdist<=12){ //0 to 12
                    ball.setHorizontalVelocity(0.05)
                }
                else if(ABdist <= 18){ //13 to 18
                    ball.setHorizontalVelocity(0.1)
                }
                else if(ABdist <= 22){ //19 to 22
                    ball.setHorizontalVelocity(0.12)
                }
                else if(ABdist <= 26){ //23 to 26
                    ball.setHorizontalVelocity(0.14)
                }
                else if(ABdist <= 29){ //27 to 29 
                    ball.setHorizontalVelocity(0.16)
                }
                else if(ABdist >= 30){ //30 up
                    ball.setHorizontalVelocity(0.2)
                }
                }
            
            

            ball.setUpwardsRotation(0.87266463) //50 degrees

            console.log("angle required is: "+pTpAngle("a","b"))

            ball.setHorizontalRotation(pTpAngle("a","b"))
        }
    ;
    
    if(input.keyCode===80){  //p, move the ball into the air
        ball.setX(0)
        ball.setY(10)
        }

    if(input.keyCode===76){  //l, move the ball above user
        ball.setX(this.getX())
        ball.setY(this.getY()+7)
        ball.setZ(this.getZ())


        console.log(this.rotationDegrees + " user's current rotation")
        }


    if(input.keyCode==84){  //t, toss
        if(servingPlayer==0 && serving==true){
        if(this.ballInRange()){
            ball.setUpwardsVelocity(1)
            ball.setHorizontalVelocity(0)
    
            ball.setUpwardsRotation(1.22173048) //70 degrees
            ball.setHorizontalRotation(this.rotationRadians)
            serviceCollider=false;
        }
    }
    };  

    if(input.keyCode==71){  //g, serve
        if(servingPlayer==0 & serving==true){ 
        if(this.ballInRange()){
            ball.startingY = ball.getY()
            ball.t=0
            if(this.getY()>=7){
                console.log("jump serve")
            ball.setUpwardsVelocity(0.6)
            ball.setHorizontalVelocity(2.1)
            }
            else{  
                console.log("not a jump serve")
            ball.setUpwardsVelocity(0.8)
            ball.setHorizontalVelocity(1.8)
            }
            ball.setUpwardsRotation(0.87266463) //50 degrees
            ball.setHorizontalRotation(this.rotationRadians)
            serviceCollider=false;
            gPressed=true;
            serving=false;
        }
    }
    };

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
  

  
