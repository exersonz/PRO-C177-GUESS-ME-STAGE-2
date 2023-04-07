$(document).ready(function(){
    getWords();
})

// function to get the words from the API response using jQuery ajax() method call
function getWords(){
    $.ajax({
        url: "/get-word",
        type: "get",
        // calling fillBlanks() if everything successfully works
        success: function(result){
            fillBlanks(result.word)
            console.log("the result is: ", result)
        },
        error: function(result){
            alert(result.responseJSON.message)
        }
    })
}

var gameOver = false;

function fillBlanks(word){
    // emptying the blanks/inputs when page reloads
    $("#blanks").empty();

    // setting the blanks depending on the number of inputs there are
    for(var i = 0; i < word.inputs; i++){
        let blanks_html = `<span class="fill_blanks">_ </span>`
        $("#blanks").append(blanks_html);
    }

    // displaying the hint for the word on the page
    $("#hint").html(word.hint)
    
    // filling in the blanks ONLY if the alphabetical character is found
    $(".clickable").click(function(){
        var correctGuess = false;

        // getting the id of the button that's clicked
        let id = $(this).attr("id");

        // getting the current life of the player and converting it into a number format (was originally in string format)
        var life = parseInt($("#life").text())

        // looping through all the letters (a-z)
        for(var i = 0; i < word.word.length; i++){
            // checking if the character matches the id of the button
            if(word.word.charAt(i).toLowerCase() == id){
                // checking if the life is still greater than 0 and the blanks are empty or filled  
                if(life > 0 && ($(".fill_blanks").eq(i).html() == "_ " || $(".fill_blanks").eq(i).html() == id)){
                    // filling the blanks
                    $(".fill_blanks").eq(i).html(id);
                    correctGuess = true;

                    // checking if the guessed word is complete
                    if($("#blanks").text() === word.word.toLowerCase()){
                        // displaying the results text if the guessed word is complete
                        $("#results").text("You win!")
                        correctGuess = true;
                        gameOver = true;
                    }
                }
            }
        }
        // reducing the life when it's greater than 0 and when correctGuess and gameOver are false
        if(life > 0 && correctGuess == false && gameOver == false){
            life -= 1;
            $("#life").html(life);
        }
    })
}