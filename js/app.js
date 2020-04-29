let answer;
let count = 1;
let score = 0;
let timer = 20;
let timer_Insane = 100;
let wordsArray = [];

// Get random words from the array
const randomWord = words => {
    return words[Math.floor(Math.random() * words.length)].toUpperCase();
}

// Mix up the letters for the word
const randomize = word => {
    let new_Word = ' ';
    for (let char in word) {
        let randomLetter = word.charAt(Math.floor(Math.random() * word.length)); // Get a random letter from the word
        new_Word = new_Word.concat(randomLetter); // Assign the random letter to new_Word variable and subsequently concatenante the random letter
        word = word.slice(0, word.indexOf(randomLetter)) + word.slice(Number(word.indexOf(randomLetter) + 1), word.length); // Returns the remaining letters of the word back to word, so there is no repeat of letter
    };
    return new_Word;
};

$(() => {
    const url = "https://raw.githubusercontent.com/matthewreagan/WebstersEnglishDictionary/master/dictionary.json"

    // Second page variables
    const $h2_secondPage = $('<h2>').attr('id', 'headerForSecondPage');
    const $startBtn = $('<button>').text('START').attr('class', 'startBtn');

    // Third page variables
    const $questions = $('<h2>').addClass('questions');
    const $inputBox = $('<input>').attr({ type: 'text', placeholder: 'Enter your answer here' });
    const $solutionBtn = $('<button>').text('Solution');
    const $enterBtn = $('<button>').text('Enter');
    const $backToMainBtn = $('<button>').attr('type', 'submit').text('Back to main');
    const $skipBtn = $('<button>').attr('type', 'submit').text('Skip');
    const $h2_QnsNumber = $('<h2>').addClass('qnsNumber');
    const $countdown_Div = $('<div>').addClass('countdown');
    const $input_Div = $('<div>').addClass('inputDiv');
    const $solution_Div = $('<div>').addClass('solution');
    const $mainAndSkipBtn_Div = $('<div>').addClass('mainAndSkipBtnDiv');
    const $seconds_Timer = $('<p>').addClass('seconds').text(`20s`);
    const $timeLeft = $('<p>').addClass('timeLeft').text('Time Left');

    // Last page variables
    const $endGame_Score = $('<h2>').addClass('score');
    const $playAgainBtn = $('<button>').text('Play again').addClass('playAgainBtn');

    const promise = $.ajax({
        url: url
    });

    promise.then(data => {
        let parseData = JSON.parse(data); // Parse data to become Javascript object, else data will return me an array of index numbers and not the word itself
        wordsArray = Object.keys(parseData); // Store only the key of the object to wordsArray variable

        // Array to store different difficulties mode
        const easy_WordsArray = wordsArray.filter(word => word.length === 4);
        const medium_WordsArray = wordsArray.filter(word => word.length === 5);
        const hard_WordsArray = wordsArray.filter(word => word.length === 6);
        const insane_WordsArray = wordsArray;

        // Upon clicking confirm button on main page, brings you to 2nd page (Start button page)
        const confirm_Buttons = () => {
            $('#easyBtn, #mediumBtn, #hardBtn, #insaneBtn').on('click', event => {
                $('.container').empty();
                const $btnDataValue = $(event.currentTarget).data('val');
                $('.container').append($h2_secondPage.text(`You have chosen ${$btnDataValue} mode!`));
                $('.container').append($('<div>').attr('id', 'startBtnDiv'));
                $('#startBtnDiv').append($startBtn);

                // Upon clicking start button, game will start
                $startBtn.on('click', event => {
                    $('.container').empty();

                    // Game start function
                    const startGame = (difficulty, array) => {
                        if ($btnDataValue === difficulty) {
                            answer = randomWord(array);
                            generateFirstQns(array);
                            enterButton(array);
                            skipButton(array);
                            countDownTimer(array);
                        };
                    };

                    // Initialize game start for either 'EASY', 'MEDIUM', 'HARD' or 'INSANE' mode
                    startGame('EASY', easy_WordsArray);
                    startGame('MEDIUM', medium_WordsArray);
                    startGame('HARD', hard_WordsArray);
                    startGame('INSANE', insane_WordsArray);

                    // Solution button function (On click, shows the answer for the question)
                    $solutionBtn.on('click', event => {
                        $('.solution').text(answer).toggle();
                    });

                    // Back to main button (On click, go back to home page)
                    $backToMainBtn.on('click', () => {
                        location.reload();
                    });

                    // Append input box, enter button and solution button
                    $('.container').append($input_Div);
                    $input_Div.append($inputBox, $enterBtn, $solutionBtn);

                    // Append solution div
                    $input_Div.after($solution_Div);

                    // Append back to main button and skip button
                    $solution_Div.after($mainAndSkipBtn_Div);
                    $mainAndSkipBtn_Div.append($backToMainBtn, $skipBtn);

                    // Append countdown timer div
                    $mainAndSkipBtn_Div.after($countdown_Div);
                    $countdown_Div.append($timeLeft);
                    $countdown_Div.append($seconds_Timer);
                });
            });
        };
        // Generate first question of the game
        const generateFirstQns = array => {
            if (array === insane_WordsArray) $seconds_Timer.text(`${timer_Insane}s`);

            $('.container').append($h2_QnsNumber.text(`Question ${count}.`));
            $('.container').append($questions.text(randomize(answer)));
        };

        // Generate a new question (after first question)
        const generateNewQns = array => {
            if (array != insane_WordsArray) timer = 21;

            answer = randomWord(array);
            $h2_QnsNumber.text(`Question ${count}.`)
            $questions.text(randomize(answer));
            $inputBox.val('');
            $('.solution').text('');
            $('.solution').css('display', 'none');
            generateGameover(array);
        };

        // Generate game over once 10 questions are done
        const generateGameover = array => {
            if (array != insane_WordsArray && count === 11) {
                $('.container').empty();
                $('.container').append($endGame_Score.text(`Your score is ${score}/10`));
                $('.container').append($playAgainBtn);
            } 
            else if (array === insane_WordsArray && timer_Insane === 0){
                $('.container').empty();
                $('.container').append($endGame_Score.text(`Your score is ${score}/${count}`));
                $('.container').append($playAgainBtn);
            };
            $playAgainBtn.on('click', () => location.reload());
        };

        // Enter button function (On 'click' and 'enter key', if answer is correct, generate new question)
        const enterButton = array => {
            $inputBox.keyup(event => {
                if (event.keyCode === 13) { // If user hit 'enter' on keyboard, new question will be generated if correct
                    if ($inputBox.val().toUpperCase() === answer) {
                        timer = 21;
                        count++;
                        score++;
                        generateNewQns(array);
                    };
                };
                $enterBtn.on('click', () => { // If user hit mouse button, new question will be generated if correct
                    if ($inputBox.val().toUpperCase() === answer) {
                        timer = 21;
                        count++;
                        score++;
                        generateNewQns(array);
                    };
                });
            });
        };

        // Skip button function (On 'click', generate new question)
        const skipButton = array => {
            $skipBtn.on('click', () => {
                count++;
                generateNewQns(array);
            });
        };

        // Countdown timer function (Timer runs from 20s to 0s. If timer = 0s, generate a new question)
        const countDownTimer = array => {
            setInterval(() => {
                if (array != insane_WordsArray) {
                    timer--;
                    if (timer >= 0) {
                        $('.seconds').text(`${timer}s`);
                    };
                    if (timer === 0) {
                        timer = 21;
                        count++;
                        generateNewQns(array);
                    };
                } else {
                    timer_Insane--;
                    if (timer_Insane >= 0) {
                        $('.seconds').text(`${timer_Insane}s`);
                    };
                    if (timer_Insane === 0) {
                        generateGameover(array);
                    };
                }
            }, 1000);
        };

        // Initialize this function upon clicking 'Confirm' button in home page
        confirm_Buttons();

    });
});