class Box{

  constructor(inputDimensions, inputColour){
    this.geometry = inputDimensions;
    this.material = new THREE.MeshStandardMaterial({ color: inputColour })
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0,0,0);

 


  }


  
  }