  let predictedX;
  let predictedY;
  let predictedZ;
  
 function movementPrediction(){
    console.log("rt")
      //Predicting the coordinates---------------------------------------------------------
      //every time this function runs, the below variables update so they are up to date when calculating prediction
      let predUpVelocity = ball.getUpwardsVelocity()
      let predHorVelocity = ball.getHorizontalVelocity()

      predictedX = ball.getX()
      predictedY = ball.getY()
      predictedZ = ball.getZ()   

    //   console.log(predictedX)

      let horizontalRotation = ball.getHorizontalRotation()
      let upwardsRotation = ball.getUpwardsRotation()

      // this loop runs 200 times for every 1 time the function runs, so essentially this simulates 100 runs of the physics engine
      for(let i = 0; i<200; i++){
        // console.log(i)
        if(predUpVelocity!=0){ //if the ball is predicted to have hit the floor then this function will not run
          predictedX = predictedX + Math.sin(horizontalRotation)*predHorVelocity //x
          predictedZ = predictedZ + Math.cos(horizontalRotation)*predHorVelocity //z
          if(predHorVelocity>=0.6)
          predHorVelocity=predHorVelocity*0.97 //decrease prediction for horizontal velocity by the same amount the actual horizontal velocity decreases

          predictedY = predictedY + Math.sin(upwardsRotation)*predUpVelocity //y
          predUpVelocity=predUpVelocity-0.02 //decrease upwards velocity

          if(predictedY<=1){ //once the ball is predicted to have hit the floor:
            predUpVelocity=0 //set our predicted velocity to 0 (so the whole prediction if statement stops running)
            //then give our predictions:
            console.log("pred X : " + predictedX)
            console.log("pred Y : " + predictedY)
            console.log("pred Z : " + predictedZ)

            let predictedCoordinates = [predictedX, predictedY, predictedZ];
            return predictedCoordinates;
          }
        }
        else break;
      }
    }


    function movementDecision(){
      let predictedCoordinates = movementPrediction()
      let predictedX = predictedCoordinates[0]
      let predictedZ = predictedCoordinates[2]

      if(predictedX>0){
        if(lastTouch=0){ //user
          return "a"
        }
        else if(lastTouch=2){ //user's teammate
          return "c"
        }
        else{
          //find the closest player
          console.log(ABDistance("a","ball"))
        }
      }

      else if(predictedX<0){
        if(lastTouch=1){//correspond to user
          return "b"
        }
        else if(lastTouch=3){//their teammate
          return "d"
        }
        else{
          //find the closest player
        }
      }
  }

  function getPredictedX(){
    return predictedX
  }
  function getPredictedZ(){
    return predictedZ
  }