function pTpAngle(playerA, playerB,toNet){ 

    let Aposition = []
    let Bposition = []

    if(playerA=="a"){
      Aposition = [user.getX(), user.getY(), user.getZ()]
    }
    else if(playerA=="b"){
      Aposition = [ai[0].getX(), ai[0].getY(), ai[0].getZ()]
    }
    else if(playerA=="c"){
      Aposition = [ai[1].getX(), ai[1].getY(), ai[1].getZ()]
    }
    else if(playerA=="d"){
      Aposition = [ai[2].getX(), ai[2].getY(), ai[2].getZ()]
    }

    if(playerB=="a"){
      Bposition = [user.getX(), user.getY(), user.getZ()]
    }
    else if(playerB=="b"){
      Bposition = [ai[0].getX(), ai[0].getY(), ai[0].getZ()]
    }
    else if(playerB=="c"){
      Bposition = [ai[1].getX(), ai[1].getY(), ai[1].getZ()]
    }
    else if(playerB=="d"){
      Bposition = [ai[2].getX(), ai[2].getY(), ai[2].getZ()]
    }

    else if(playerB=="tl"){//top left
      Bposition = [-47, 5, -20]
    }
    else if(playerB=="tr"){//top right
      Bposition = [47,5,-20]
    }
    else if(playerB=="bl"){//bottom left
      Bposition = [-47, 5, 20]
    }
    else if(playerB=="br"){//bottom right
      Bposition = [47,5, 20]
    }

    if(toNet==true){
      if(playerA=="a" || playerA=="b"){
        Bposition[0]= (3+Bposition[0])/2 //midpoint of just off net on right and teammate
      }
      else Bposition[0]=(-3+Bposition[0])/2 //midpoint of just off net on left and teammate

      if(playerA=="c" || playerA=="d"){
        Bposition[0]= (-3+Bposition[0])/2 //midpoint of just off net on right and teammate
      }
      else Bposition[0]=(3+Bposition[0])/2 //midpoint of just off net on left and teammate
    }


    let AB = []
    let D = [0,0,1]
    let dotProduct = 0;
    for(let i=0; i<3; i++){
      AB[i] = Bposition[i] - Aposition[i]
      dotProduct = (AB[i]*D[i]) + dotProduct
    }

    //AB is the vector from player A to player B
    //D represents a dotted line with direction vector (0,0,1)

    let magnitudeD = 1
    let magnitudeAB = Math.sqrt(AB[0]**2 + AB[1]**2 +AB[2]**2)
    
    let cosTheta = dotProduct / (magnitudeD*magnitudeAB)
    let Theta = Math.acos(cosTheta)

    //if the angle required is reflex, then uses the other value of arccos(theta)
    if(Aposition[0]>=Bposition[0]){ 
      Theta = (2*pi) - Theta
    }

    // console.log(Theta)
    return Theta;
  }


function ABDistance(playerA,playerB){
  let Aposition = []
    let Bposition = []

    if(playerA=="a"){
      Aposition = [user.getX(), user.getY(), user.getZ()]
    }
    else if(playerA=="b"){
      Aposition = [ai[0].getX(), ai[0].getY(), ai[0].getZ()]
    }
    else if(playerA=="c"){
      Aposition = [ai[1].getX(), ai[1].getY(), ai[1].getZ()]
    }
    else if(playerA=="d"){
      Aposition = [ai[2].getX(), ai[2].getY(), ai[2].getZ()]
    }
    else if(playerA=="bXZ"){
      Aposition = [ai[0].getX(), 5, ai[0].getZ()]
    }
    else if(playerA=="cXZ"){
      Aposition = [ai[1].getX(), 5, ai[1].getZ()]
    }
    else if(playerA=="dXZ"){
      Aposition = [ai[2].getX(), 5, ai[2].getZ()]
    }


    if(playerB=="a"){
      Bposition = [user.getX(), user.getY(), user.getZ()]
    }
    else if(playerB=="b"){
      Bposition = [ai[0].getX(), ai[0].getY(), ai[0].getZ()]
    }
    else if(playerB=="c"){
      Bposition = [ai[1].getX(), ai[1].getY(), ai[1].getZ()]
    }
    else if(playerB=="d"){
      Bposition = [ai[2].getX(), ai[2].getY(), ai[2].getZ()]
    }
    else if(playerB=="ball"){ //distance to the ball's predicted position
      Bposition = [getPredictedX(),1,getPredictedZ()]
    }
    else if(playerB=="ACTUALball"){ //distance to the ball
      Bposition = [ball.getX(),ball.getY(),ball.getZ()]
    }
    else if(playerB=="ACTUALballXZ"){ //distance to ball just on X-Z plane.
      Bposition = [ball.getX(),5,ball.getZ()] //chose 5 as this is y-coord of a player on ground
    }

    let AB = []
    for(let i=0; i<3; i++){
      AB[i] = Bposition[i] - Aposition[i]
    }
    let magnitudeAB = Math.sqrt(AB[0]**2 + AB[1]**2 +AB[2]**2)
    // console.log("distance AB is "+magnitudeAB)
    return magnitudeAB;
  }
