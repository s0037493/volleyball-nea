const pi = Math.PI

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60, //fov
  (window.innerWidth) / (window.innerHeight), //aspect ratio
  1, //frustum near plane
  10000 //frustum far plane
);

camera.position.x= 1
camera.position.z = 40
camera.position.y = 40
camera.lookAt(0,15,0)

function cameraMovement(){
  if(serving==true){
      if(camera.position.y<=50){
      camera.position.y=camera.position.y+0.05
      camera.position.z=camera.position.z+0.05
      }
  }
  else if(serving==false){
      camera.position.y=40
      camera.position.z=40
  }
  }

//setting up the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, });
renderer.setSize(window.innerWidth-(window.innerWidth/150), window.innerHeight-50);
renderer.setClearColor('skyblue');
document.body.appendChild(renderer.domElement);

//makes court
let courtDimensions = new THREE.BoxGeometry(90,0.1,30)
let court = new Box(courtDimensions, 'khaki')
scene.add(court.mesh);

//makes net
let netDimensions = new THREE.BoxGeometry(0.5,15,30)
let net = new Box(netDimensions, 'hotpink')
net.mesh.position.set(0,7.5,0)
scene.add(net.mesh);

//makes user
let playerDimensions = new THREE.BoxGeometry(3,10,3) //used for all players
let user = new User(playerDimensions, 'red',5, 5, 10, true) // dimensions, colour,x,y,z, team(right=true)
scene.add(user.mesh);

//makes arrow, rest of arrow code is in user.js
let dir = new THREE.Vector3( 0, 2, 0 );
let origin = user.mesh.position;
let length = 10;
let colour = 0xffbf00;
let pointerArrow = new THREE.ArrowHelper( dir, origin, length, colour );

//makes ball
let ballDimensions = new THREE.SphereGeometry(1.5,32,16) //radius, width segments, height segments
let ball = new Ball(ballDimensions, 'lightgrey', 9.5, 5, 10,) //dimensions, colour, x, y, z
scene.add(ball.mesh)

//makes an AI
let ai = [0,1,2] //player's teammate = 0, other two ai are 1 and 2
ai[0] = new AI(playerDimensions, 'blue', 10, 5, -10, true, "b", "a") // dimensions, colour,x,y,z, team(right=true), letter, teammateletter
scene.add(ai[0].mesh);  

ai[1] = new AI(playerDimensions, 'purple', -20, 5, 10, false, "c", "d") //this is the AI that corresponds to the user, meaning it serves after the user.
scene.add(ai[1].mesh)

ai[2] = new AI(playerDimensions, 'green',-20, 5, -10, false, "d", "c") //corresponds to the AI's teammate
scene.add(ai[2].mesh)

//variables for serving
let serving = true;
let servingPlayer = 0; //0 is user, 1 is AI 2, 2 is user's teammate (aka AI 1), 3 is AI 3,
let toMove = true;
let serviceCollider = true;
let gPressed = false;

let lastTouchTeam = false; //true is left, false is right
let lastTouch = "b"  //a is user, c=purple, b=blue, d=green
let ballTouches = 2;

//controls server
function servingControl(){ 
    if(serving)
      if(servingPlayer == 0){

        if(toMove==true){
        user.setX(50)
        user.setZ(-10) //moves user to service line
        toMove=false;
        }

        if(serviceCollider==true){
          //sets the ball so it sits just to the side of the user no matter where they rotate so it looks like it is being carried
          ball.setX(user.getX()+3.5*Math.sin(user.rotationRadians))
          ball.setZ(user.getZ()+1.6*Math.cos(user.rotationRadians))
          ball.setY(user.getY())

          if(user.getX()<=47){
            user.setX(47) //keeps the user behind the service line
          }
          else{
            console.log(serviceCollider)
          }

          // if(input.keyCode==32){ //space
          //   console.log("success")
          //   serviceCollider=false; //remove service collider
          // }
        }

        if(user.getX()<46 && user.getY()==5){
          if(gPressed==false){
          console.log("service fault (not yet implemented)")
          }
          serving = false;
        }
        }
        
      
      else if(servingPlayer==1){
        console.log("ai 2 doesnt exist")
      }
      else if(servingPlayer==2){
        if(toMove==true){
          ai[0].setX(50)
          ai[0].setZ(-10) 
          toMove=false;
          }
        }
      else if(servingPlayer==3){
        console.log("ai 3 doesnt exist")
      }
    }

    let keysPressedDown = [] //will store all of the keys that have been pressed

    document.addEventListener('keydown', function(event){
      keysPressedDown[event.key] = true //tells the array that the key that has been pressed is currently being pressed

    document.addEventListener('keyup', function(event){
      keysPressedDown[event.key] = false //tells the array that the key is no longer being pressed
    })




        // user.checkMovement(event.key)
        // user.ballActions(event.key)
    }) 
    //these lines check what button is pressed, then do an output

function render(){
  renderer.render(scene, camera);
  requestAnimationFrame(render);

  user.checkMovement()
  user.ballActions()

  user.arrow()
  user.netCollider()
  user.courtCollider()
  user.jumpPhysics()

  ball.netCollider()
  ball.courtCollider()
  ball.ballPhysics()

  ball.getUpwardsVelocity()
  ball.getHorizontalVelocity()

  ai[0].moveToBall()
  ai[1].moveToBall()
  ai[2].moveToBall()

  ai[0].actionDecision()
  ai[1].actionDecision()
  ai[2].actionDecision()

  ai[0].jumpPhysics()
  ai[1].jumpPhysics()
  ai[2].jumpPhysics()

  ai[0].courtCollider()
  ai[1].courtCollider()
  ai[2].courtCollider()

  ai[0].hit()
  ai[1].hit()
  ai[2].hit()



  


  servingControl()
  cameraMovement()

  rules()
}

render()

