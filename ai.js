class AI extends Player {
    constructor(inputDimensions, inputColour, inputX, inputY, inputZ, team){
      
      super(inputDimensions, inputColour, team) //gives shape dimensions and colour using code from Box class. Also sets which team player is on.
        //if team=true, then player is on right. if false, left.
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      
      this.mesh.position.x = inputX;
      this.mesh.position.y = inputY
      this.mesh.position.z = inputZ

      this.timeToMove = false;
      this.pX;
      this.pZ;
      }

      moveToBall(){ //input predicted X, predicted 
        if(this.timeToMove==true){//while the AI is not at the ball:

          if(this.pX>this.getX()){//if the ball has higher x coord than ai:
            this.setX(this.getX()+0.3)//increase x
          }
          else if(this.pX<this.getX()){//if the ball has lower x coord than ai:
            this.setX(this.getX()-0.3)//decrease x
          }

          if(this.pZ>this.getZ()){//same as X
            this.setZ(this.getZ()+0.3)
          }
          else if(this.pZ<this.getZ()){
            this.setZ(this.getZ()-0.3)
          }

          if(Math.abs(this.getX()-this.pX <= 2)){//if the AI is in range of ball based on x
            if(Math.abs(this.getZ()-this.pZ <= 2)){//if the AI is in range of ball based on z
              console.log("in range!") 
              this.timeToMove=false;     //stop looping
            }
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