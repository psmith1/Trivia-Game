var trivia = [
    {
    question: "If there's a bustle in your _______ / Don't be alarmed now / It's just a spring clean for the May queen (Stairway to Heaven)",
    answer: [
        {a: "haircut"},
        {a: "morning"},
        {a: "hedgerow"},
        {a: "ledger"},
    ],
    correct: "hedgerow"
  },
  {
    question: "My _______ beneath the summer moon, I will return again / Sure as the dust that floats high in June, when movin' through Kashmir (Kashmir)",
    answer: [
        {a: "only home"},
        {a: "Shangri-La"},
        {a: "bleeding heart"},
        {a: "lady dear"},
    ],
    correct: "Shangri-La"
  },
  {
    question: "Good times, bad times / You know I had my share / When my woman left home / With __________ / Well, I still don't seem to care (Whole Lotta Love)",
    answer: [
        {a: "a brown-eyed man"},
        {a: "my brother-in-law"},
        {a: "our ol' black dog"},
        {a: "the bag she'd packed"},
    ],
    correct: "a brown-eyed man"
  },
  {
    question: "We come from the land of the ice and snow / From the midnight sun, and the ________ (Immigrant Song)",
    answer: [
        {a: "cold winds blow"},
        {a: "hot springs flow"},
        {a: "pine trees grow"},
        {a: "rivers flow"},
    ],
    correct: "hot springs flow"
  }
  
];

var currentChoices;
var answerValue;
var currentObjectIndex = 0;
var clockRunning;
var time;
var intervalId;
var newDiv;
var userChoice;
var score = 0;
var misses = 0;


function timerStart() {
    time = 30;
    $(".gameOver").html("");
    // Resets the page and the timer

    if (currentObjectIndex > 3) {
      endGame();

    } else {
        if (!clockRunning) {
            intervalId = setInterval(countDown, 1000);
            clockRunning = true;
            //  Starts the timer countdown

            $(".questionDisplay").html(trivia[currentObjectIndex].question);
            // Displays trivia question

        for (var i = 0; i < trivia[currentObjectIndex].answer.length; i++) {
            currentChoices = trivia[currentObjectIndex].answer[i].a;
            answerValue = trivia[currentObjectIndex].correct;

            newDiv = $("<div>")
                .html(currentChoices)
                .attr("choiceIndex", currentChoices)
                .addClass("questionSpacing");
            // Adds a choice index for referencing and creates a new div

            newDiv.click(function() {
                userChoice = $(this).attr("choiceIndex");
                if (userChoice == answerValue) {
                    $(".questionDisplay").html("<p>Correct!</p>");
                    score++;
                    $(".score").html("Score: " + score);
                } else {
                    $(".questionDisplay").html("<p>Miss!</p>");
                    misses++;
                    $(".misses").html("Misses: " + misses);
                }
                // Alerts user correct/incorrect
            });
            $("#answer").append(newDiv);
            // Loads answer choices into a new div
        }
    }
}
};

function countDown() {
// Timer countdown function
  if (time == 0) {
      if (currentObjectIndex > 3) {
          endGame();
      } else {
        timerStop();
        $("#timer").html("");
        $(".questionDisplay").html("Time's up!");
        currentObjectIndex++;
        setTimeout(timerStart, 5000);
        // Stop stimer if time runs out and display "Time's up!"
      }
    } else {
        $("#timer").html("Timer: " + time);
        time--;
    }
  };

function timerStop() {
    clearInterval(intervalId);
    clockRunning = false;
    $("#answer").html("");
    // Stops the timer
};

$("#startGame").click(function() {
    $("#startGame").html("");
    timerStart();
    // Starts the timer
});

$("#answer").click(function() {
    timerStop();
    $("#timer").html("");
    currentObjectIndex++;
    // Moves to next question
    setTimeout(timerStart, 4000);
    // Restarts the timer
});


function gameOverMessage() {
    // Provides a "Game Over" message
    $("#gameOver").html("You lost teh game! Let's play again.");
    currentObjectIndex = 0;
    }

function endGame() {
    if  (currentObjectIndex > 3) {
        // Ends the game after the last question
        resetScore();
        gameOverMessage();
        $(".questionDisplay").html("You've reached the end! Stick around to play again.");
        setTimeout(timerStart, 5000);
    }
}
function resetScore() {
    var misses = 0;
    var score = 0;
    $(".score").html("Score: " + score);
    $(".misses").html("Misses: " + misses);
}
