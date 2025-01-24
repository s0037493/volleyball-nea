function rules() {
    if (Math.abs(ball.getX()) <= 0.5) { //as ball passes across the net
        ballTouches = 0; //reset number of touches
    }


}



function scoring(winner) { //input the team that won the point
    if (winner == true) { //right = true
        rightPoints++//award the point to right team
        console.log("right team have won " + rightPoints + " points.")  
        if (servingPlayer == 1 || servingPlayer == 3) { //if the last server was on the left team (user's opposition)
            if (servingPlayer == 3) servingPlayer = -1 //sets the variable to -1 so it will increment to 0 (user) instead of incrementing from 3 to 4 (4 is invalid)
            servingPlayer++ //increment servingPlayer so that the correct player on the right team serves (aka follows laws of rotation)
        }
    }

    else if (winner == false) { //left = false
        leftPoints++ //award the point to left team
        console.log("left team have won " + leftPoints + " points.")
        if (servingPlayer == 0 || servingPlayer == 2) { //if the last server was on the right team (user/teammate)
            servingPlayer++ //increment servingPlayer so that the correct player on the left team serves (aka follows laws of rotation)
        }
    }

    
    //checks to see if the game should end
    if(leftPoints >= 25 && leftPoints >= rightPoints + 2){ //if left has won 25 points AND 2 clear points over right team
        leftSets++ //award a set
        console.log("left team has won a set.")
        console.log("left has won "+leftSets+" sets")

        //reset team's points
        leftPoints=0
        rightPoints=0
    }

    else if(rightPoints >= 25 && rightPoints >= leftPoints + 2){ //if left has won 25 points AND 2 clear points over right team
        rightSets++ //award a set
        console.log("right team has won a set.")
        console.log("right has won "+rightSets+" sets")

        //reset team's points
        leftPoints=0
        rightPoints=0 
    }

    //update serving variables so rally restarts
    serving = true;
    toMove = true;
    serviceCollider = true;

    ai[0].setTTM(false)
    ai[1].setTTM(false)
    ai[2].setTTM(false)

    ai[0].mustPosition = false;
    ai[1].mustPosition = false;
    ai[2].mustPosition = false;



}


// (in ball.js)
// Under court collider:
// If the ball lands IN of the court on the right team’s side, award point to left team. If the ball lands IN of the court on the right team’s side, award point to left team.
// If the ball lands OUT of the court and last touch is right team, award point to left team. If the ball lands OUT of the court and last touch is left team, award point to right team.

// here?
// If points won >= 21, and points won > 2 + opposition points won, add 1 to team’s sets won.
// If sets won = 3, then end the game as that team has won the game. Make the score extra large to signify game is over.
// If right team sets won = 2 and left team sets won = 2 then If points won >= 15, and points won > 2 + opposition points won, add 1 to team’s sets won.
