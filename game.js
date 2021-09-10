var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//var started = false;
var gameState = "start";
var level = 0;

var wrongSound = new Audio("wrong.mp3");


$(document).keydown(function(){
    //if (!started) {
    if (gameState === "start"){
        
        $("#level-title").text("Level " + level);

        nextSequence();
        //started = true;
        gameState = "play";
    }

    
})

$(".btn").click(function(){
    
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

    console.log(userClickedPattern);
})


function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);

    //console.log(gamePattern);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
 
    playSound(randomChosenColour);
    //animatePress(randomChosenColour);
   
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
}

function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver(){

    level = 0;
    gamePattern = [];
    gameState = "start";
    
}

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        //console.log("Success!");
        if(userClickedPattern.length === gamePattern.length)

            setTimeout(function(){
                nextSequence()
            }, 1000);

    }
    else{
        //console.log("Wrong!");
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}
