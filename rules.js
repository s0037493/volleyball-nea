function rules() {
    if (Math.abs(ball.getX()) <= 0.7) { //as ball passes across the net
        ballTouches = 0; //reset number of touches
    }


}



function scoring(winner) { //input the team that won the point

    serving = false;
    toMove = true;
    serviceCollider = true;

    ai[0].setTTM(false)
    ai[1].setTTM(false)
    ai[2].setTTM(false)

    ai[0].mustPosition = false;
    ai[1].mustPosition = false;
    ai[2].mustPosition = false;

    ai[0].makeAction = false;
    ai[1].makeAction = false;
    ai[2].makeAction = false;

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

    if (leftSets == 2 && rightSets == 2) {
        if (leftPoints >= 15 && leftPoints >= rightPoints + 2) { //if left has won 25 points AND 2 clear points over right team
            leftSets++ //award a set
            alert("left team has won a set.")
            console.log("left has won " + leftSets + " sets")

            serving = true;
            servingPlayer = 0; //0 is user, 1 is AI 2, 2 is user's teammate (aka AI 1), 3 is AI 3,
            toMove = true;
            serviceCollider = true;
            gPressed = false;
            lastTouchTeam;
            lastTouch;
    
            //variables for rules, points, etc.
            leftPoints = 0
            rightPoints = 0
            servingPlayer++
        }

        else if (rightPoints >= 15 && rightPoints >= leftPoints + 2) { //if left has won 25 points AND 2 clear points over right team
            rightSets++ //award a set
            alert("right team has won a set.")
            console.log("right has won " + rightSets + " sets")

            serving = true;
            servingPlayer = 1; //0 is user, 1 is AI 2, 2 is user's teammate (aka AI 1), 3 is AI 3,
            toMove = true;
            serviceCollider = true;
            gPressed = false;
            lastTouchTeam;
            lastTouch;

            //reset team's points
            leftPoints = 0
            rightPoints = 0
            servingPlayer++
        }
    }


    else if (leftSets != 2 || rightSets != 2) {

        //checks to see if the game should end
        if (leftPoints >= 21 && leftPoints >= rightPoints + 2) { //if left has won 21 points AND 2 clear points over right team
            leftSets++ //award a set
            console.log("left team has won a set.")
            console.log("left has won " + leftSets + " sets")

            //reset team's points
            leftPoints = 0
            rightPoints = 0
            servingPlayer++
        }

        else if (rightPoints >= 21 && rightPoints >= leftPoints + 2) { //if left has won 21 points AND 2 clear points over right team
            rightSets++ //award a set
            console.log("right team has won a set.")
            console.log("right has won " + rightSets + " sets")

            //reset team's points
            leftPoints = 0
            rightPoints = 0
            servingPlayer++
        }
    }

    if (leftSets == 3) {
        alert("Left team won.")
        serving = true;
        servingPlayer = 0; //0 is user, 1 is AI 2, 2 is user's teammate (aka AI 1), 3 is AI 3,
        toMove = true;
        serviceCollider = true;
        gPressed = false;
        lastTouchTeam;
        lastTouch;

        //variables for rules, points, etc.
        leftPoints = 0
        rightPoints = 0
        leftSets = 0
        rightSets = 0
    }
    else if (rightSets == 3) {
        alert("Right team won.")
        serving = true;
        servingPlayer = 0; //0 is user, 1 is AI 2, 2 is user's teammate (aka AI 1), 3 is AI 3,
        toMove = true;
        serviceCollider = true;
        gPressed = false;
        lastTouchTeam;
        lastTouch;

        //variables for rules, points, etc.
        leftPoints = 0
        rightPoints = 0
        leftSets = 0
        rightSets = 0
    }

    //update serving variables so rally restarts
    serving = true;
    toMove = true;
    serviceCollider = true;

    updateScoreboard()
}

function updateScoreboard() {
    document.getElementById("score").textContent = "(" + leftSets + ")" + "   " + leftPoints + ":" + rightPoints + "   " + "(" + rightSets + ")"
}