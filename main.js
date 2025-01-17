

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
    camera.position.x= 1
    camera.position.z = 40
    camera.position.y = 40

  }
  }


//setting up the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, });
renderer.setSize(window.innerWidth-(window.innerWidth/150), window.innerHeight-50);
renderer.setClearColor('skyblue');
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
document.body.appendChild(renderer.domElement);

let light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(-40, 100, 10);
light.target.position.set(0, 0, 0);
light.shadow.camera.top = 50;
light.shadow.camera.bottom = -50;
light.shadow.camera.left = -30;
light.shadow.camera.right = 30;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;
light.castShadow = true;
scene.add(light);


//makes the blockade for use with menu
let blockadeDimensions = new THREE.PlaneGeometry(900,300)
let blockade = new Box(blockadeDimensions, 'black')
blockade.mesh.position.set(0,39,39)

function blockadeAddToScene(){
  scene.add(blockade.mesh);
}

// blockadeAddToScene()

//makes court
let courtDimensions = new THREE.PlaneGeometry(90,30)
let court = new Box(courtDimensions, 'khaki')
court.mesh.rotateX(3*pi/2)
court.mesh.receiveShadow = true;
scene.add(court.mesh);

//makes floor
let floorDimensions = new THREE.PlaneGeometry(1600,100)
let floor = new Box(floorDimensions, 'lightgreen')
floor.mesh.position.set(0,-0.001,0)
floor.mesh.rotateX(-pi/2)
floor.mesh.receiveShadow = true;
scene.add(floor.mesh)

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
let ball = new Ball(ballDimensions, 'orange', 9.5, 5, 10,) //dimensions, colour, x, y, z
scene.add(ball.mesh)

//makes an AI
let ai = [0,1,2] //player's teammate = 0, other two ai are 1 and 2
ai[0] = new AI(playerDimensions, 'blue', 20, 5, 10, true, "b", "a") // dimensions, colour,x,y,z, team(right=true), letter, teammateletter
scene.add(ai[0].mesh);  

ai[1] = new AI(playerDimensions, 'purple', -20, 5, 10, false, "c", "d") //this is the AI that corresponds to the user, meaning it serves after the user.
scene.add(ai[1].mesh)

ai[2] = new AI(playerDimensions, 'green',-20, 5, -10, false, "d", "c") //corresponds to the AI's teammate
scene.add(ai[2].mesh)

//variables for serving
var serving = true;
var servingPlayer = 0 ; //0 is user, 1 is AI 2, 2 is user's teammate (aka AI 1), 3 is AI 3,
var toMove = true;
var serviceCollider = true;
var gPressed = false;
var lastTouchTeam;
var lastTouch;



//controls server
function servingControl(){ 
    if(serving==true){
      if(servingPlayer == 0){
        lastTouchTeam = false
        lastTouch = "b"
        ballTouches = 2
        if(toMove==true){
        user.setX(50)
        user.setZ(-10) //moves user to service line

        ai[0].setX(20)
        ai[0].setY(5)
        ai[0].setZ(10)

        ai[1].setX(-20)
        ai[1].setY(5)
        ai[1].setZ(10)

        ai[2].setX(-20)
        ai[2].setY(5)
        ai[2].setZ(-10)


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
        lastTouchTeam = true
        lastTouch = "d"
        ballTouches = 2
          if(toMove==true){
          user.setX(20)
          user.setY(5)
          user.setZ(-10) 
  
          ai[0].setX(20)
          ai[0].setY(5)
          ai[0].setZ(10)
  
          ai[1].setX(-50)
          ai[1].setY(5)
          ai[1].setZ(10) //moves to service line
          ai[1].choice=Math.floor(Math.random()*4)
  
          ai[2].setX(-20)
          ai[2].setY(5)
          ai[2].setZ(-10)
  
  
          toMove=false;
          }
          if(serviceCollider==true){ //will be set to false once the ai serves
            //sets the ball so it sits just to the side of the ai
            ball.setX(ai[1].getX()+3.5)
            ball.setZ(ai[1].getZ()+1.6)
            ball.setY(ai[1].getY())
            setTimeout(function() {
              ai[1].serving()
            },3000)
          } 
      }
    
      else if(servingPlayer==2){
        lastTouchTeam = false
        lastTouch = "a"
        ballTouches = 2
        if(toMove==true){
          user.setX(20)
          user.setY(5)
          user.setZ(-10) 
  
          ai[0].setX(50)
          ai[0].setY(5)
          ai[0].setZ(10) //moves to service line
          ai[0].choice=Math.floor(Math.random()*4)
  
          ai[1].setX(-20)
          ai[1].setY(5)
          ai[1].setZ(10)
  
          ai[2].setX(-20)
          ai[2].setY(5)
          ai[2].setZ(-10)
  
  
          toMove=false;
        }
        if(serviceCollider==true){ //will be set to false once the ai serves
          //sets the ball so it sits just to the side of the ai
          ball.setX(ai[0].getX()-3.5)
          ball.setZ(ai[0].getZ()-1.6)
          ball.setY(ai[0].getY())
          setTimeout(function() {
            ai[0].serving()
          },3000)
        }
      } 
      else if(servingPlayer==3){
        lastTouchTeam = true
        lastTouch = "c"
        ballTouches = 2
        if(toMove==true){
          user.setX(20)
          user.setY(5)
          user.setZ(-10)
  
          ai[0].setX(20)
          ai[0].setY(5)
          ai[0].setZ(10)
  
          ai[1].setX(-20)
          ai[1].setY(5)
          ai[1].setZ(10)
  
          ai[2].setX(-50)
          ai[2].setY(5)
          ai[2].setZ(-10) //moves to service line
          ai[2].choice=Math.floor(Math.random()*4)
  
  
          toMove=false;
        } 
        if(serviceCollider==true){ //will be set to false once the ai serves
          //sets the ball so it sits just to the side of the ai
          ball.setX(ai[2].getX()+3.5)
          ball.setZ(ai[2].getZ()+1.6)
          ball.setY(ai[2].getY())
          setTimeout(function() {
            ai[2].serving()
          },3000)
        }
      }
    }
    }

    keysPressedDown = [] //will store all of the keys that have been pressed
    var movementKeys = ["w","a","s","d","ArrowRight","ArrowLeft"," "]

    document.addEventListener('keydown', function(event){
      if(movementKeys.includes(event.key)==true){ //only happens for movment keys; manages movement (multiple inputs):
        keysPressedDown[event.key] = true //tells the array that the key that has been pressed is currently being pressed
      }
      user.ballActions(event.key) //this manages ball actions (single input)
    })

    document.addEventListener('keyup', function(event){
      if(movementKeys.includes(event.key)==true){ //only happens for movement keys:
        keysPressedDown[event.key] = false //tells the array that the key is no longer being pressed
      }
    })

function render(){
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  
  user.checkMovement()

  user.arrow()
  user.netCollider()
  user.courtCollider()
  user.jumpPhysics()

  ball.netCollider()
  ball.courtCollider()
  ball.ballPhysics()

  ball.getUpwardsVelocity()
  ball.getHorizontalVelocity()

  ai.forEach(x => {x.moveToBall()
    x.actionDecision()
    x.jumpPhysics()
    x.courtCollider()
    x.hit()
    x.defensivePosition()
  })

  servingControl()
  cameraMovement()

  rules()
}

render()




