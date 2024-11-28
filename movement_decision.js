 let predictedX, predictedY, predictedZ;
 
 function movementPrediction(){
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
            // console.log("pred X : " + predictedX)
            // console.log("pred Y : " + predictedY)
            // console.log("pred Z : " + predictedZ)

            let predictedCoordinates = [predictedX, predictedY, predictedZ];
            return predictedCoordinates;
          }
        }
        else break;
      }
    }


    function movementDecision(){
      let predictedCoordinates = movementPrediction()
      predictedX = predictedCoordinates[0]
      predictedZ = predictedCoordinates[2]

      if(predictedX>0){//positive x = user's team
        if(lastTouch==0){ //user 
          console.log("user's ball")
        }
        else if(lastTouch==2){ //user's teammate
          ai[0].setpX(predictedX)
          ai[0].setpZ(predictedZ)
          ai[0].setTTM(true)
        }
        else{
          //find the closest player
          console.log(ABDistance("a","ball"))
          console.log(ABDistance("b","ball"))
          //moveToBall the closest player
        }
      }

      else if(predictedX<0){//negative x = NOT user's team
        if(lastTouch==1){//corresponding ai of user
          console.log(lastTouch)
          ai[1].setpX(predictedX)
          ai[1].setpZ(predictedZ)
          ai[1].setTTM(true)
        }
        else if(lastTouch==3){//their teammate
          console.log("B")
          ai[2].setpX(predictedX)
          ai[2].setpZ(predictedZ)
          ai[2].setTTM(true)
        }
        else{
          //find the closest player
          console.log("C")
          
          let oneToBall = parseFloat(ABDistance("c","ball")) //the purple one
          let twoToBall = parseFloat(ABDistance("d","ball")) //the green one

          if(oneToBall <= twoToBall){
            console.log("purple one is closer")
            ai[1].setpX(predictedX)
            ai[1].setpZ(predictedZ)
            ai[1].setTTM(true)
          }
          else if(oneToBall>twoToBall){
            console.log("green one is closer")
            ai[2].setpX(predictedX)
            ai[2].setpZ(predictedZ)
            ai[2].setTTM(true)
          }
          else{
            console.log("something has gone wrong here")
            console.log(oneToBall)
            console.log(twoToBall)
          } 
        }
      }
  }

  function getPredictedX(){
    return predictedX
  }
  function getPredictedZ(){
    return predictedZ
  }