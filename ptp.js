function pTpAngle(playerA, playerB){
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

    let AB = []
    let D = [0,0,1]
    let dotProduct = 0;
    for(let i=0; i<3; i++){
      AB[i] = Bposition[i] - Aposition[i]
      dotProduct = (AB[i]*D[i]) + dotProduct
    }
    console.log(AB)  
    console.log(dotProduct)

    //D represents a dotted line with direction vector (0,0,1)

    let magnitudeD = 1
    let magnitudeAB = Math.sqrt(AB[0]**2 + AB[1]**2 +AB[2]**2)
    console.log(magnitudeAB)
    
    let cosTheta = dotProduct / (magnitudeD*magnitudeAB)
    let Theta = Math.acos(cosTheta)

    console.log((Theta/pi)*180 + " calculation's result")
}