var userClickedPattern = [];
var gamePattern = [];
var buttonColors= ["red","blue", "green", "yellow"];
var level = 0;
var started = false;

function nextSquence(){
    //get a random squence and new levels
    var randomNumber= Math.floor(Math.random()*4);
    level += 1;
    $("#level-title").text("Level " + level);   
    randomChosenColor= buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);    
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(sound) {
    //plays sound when clicked or highlighted
    var audio = new Audio('./sounds/'+sound+'.mp3');
    audio.play(); 
}
function animatePress(currentColor) {
    //animates users press 
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColor).removeClass("pressed")},100);
}

//checks users answer wioth the game pattern
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length == userClickedPattern.length){
            setTimeout(function(){
                nextSquence();
            },1000)
            userClickedPattern=[];
        }
    } else {
        console.log("failure");
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $('body').addClass('game-over')
        setTimeout(function(){
            $('body').removeClass('game-over')
        },200)

        if (level <= 3){
            var dialogue = "You have the memory of a gold fish."
        }else if (level >=4 && level <=10){
            var dialogue = "Youre memory is kinda mid, tbh I expected less from you."
        }else if(level >=11 && level <= 15){
            var dialogue = "Youre better than me dude, congrats."
        }
        else{
            var dialogue = "Youve got a batshit insane memory congratulation pls die."
        }

        $('#level-title').text('Game Over,'+dialogue+' Press any key to restart.')
        restart();
    }
}


$(".btn").click(function(event) {
    //adds a new color to user patterns
    userChosenColour = event.currentTarget.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);    
})


//starts the game
$("body").keydown(function(event){
    if (started==false) {       
        nextSquence(); 
        started = true; 
    }    
})

//restarts the game
function restart(){
    started=false;
    gamePattern=[]
    userClickedPattern=[];
    level=0;
}




    
    









