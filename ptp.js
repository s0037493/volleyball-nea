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

    else if(playerB=="l"){
      Bposition = [0, 5, 15]
    }
    else if(playerB=="r"){
      Bposition = [0,5,-15]
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

    console.log(Theta)
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
    else if(playerB=="ball"){
      Bposition = [getPredictedX(),1,getPredictedZ()]
    }

    let AB = []
    for(let i=0; i<3; i++){
      AB[i] = Bposition[i] - Aposition[i]
    }
    let magnitudeAB = Math.sqrt(AB[0]**2 + AB[1]**2 +AB[2]**2)
    // console.log("distance AB is "+magnitudeAB)
    return magnitudeAB;
  }
