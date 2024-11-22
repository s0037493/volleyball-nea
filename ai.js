class AI extends Player {
    constructor(inputDimensions, inputColour, inputX, inputY, inputZ, team, iteration){
      
      super(inputDimensions, inputColour, team) //gives shape dimensions and colour using code from Box class. Also sets which team player is on.
        //if team=true, then player is on right. if false, left.
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      
      this.mesh.position.x = inputX;
      this.mesh.position.y = inputY
      this.mesh.position.z = inputZ
      
      this.iteration = iteration //0=user's teammate, //1 and 2 are other team. ai 1 is opposition team's first serving player


      }

    }   