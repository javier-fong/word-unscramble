let answer;
let count = 1;
let score = 0;
let timer = 20;
let wordsArray = [];

// Get random words from the array
const randomWord = words => {
    return words[Math.floor(Math.random() * words.length)].toUpperCase();
}

// Mix up the letters for the word
const randomize = word => {
    let new_Word = ' ';
    for (let char in word) {
        let randomLetter = word.charAt(Math.floor(Math.random() * word.length));
        new_Word = new_Word.concat(randomLetter);
        word = word.slice(0, word.indexOf(randomLetter)) + word.slice(Number(word.indexOf(randomLetter) + 1), word.length);
    };
    return new_Word;
};

$(() => {
    const url = "https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json"

    const $h2_secondPage = $('<h2>').attr('id', 'headerForSecondPage');
    const $startBtn = $('<button>').text('START').attr('class', 'startBtn');

    const $questions = $('<h2>').addClass('questions');
    const $inputBox = $('<input>').attr({ type: 'text', placeholder: 'Enter your answer here' });
    const $solutionBtn = $('<button>').text('Solution');
    const $enterBtn = $('<button>').text('Enter');
    const $backToMainBtn = $('<button>').attr('type', 'submit').text('Back to main');
    const $skipBtn = $('<button>').attr('type', 'submit').text('Skip');
    const $h2_QnsNumber = $('<h2>').addClass('qnsNumber');
    const $countdown_Div = $('<div>').addClass('countdown');

    const $endGame_Score = $('<h2>').addClass('score');
    const $playAgainBtn = $('<button>').text('Play again').addClass('playAgainBtn');

    const promise = $.ajax({
        url: url
    });

    promise.then(data => {
        let parseData = JSON.parse(data);
        wordsArray = Object.keys(parseData);

        // Array to store different difficulties mode
        const easy_WordsArray = wordsArray.filter(word => word.length === 4);
        const medium_WordsArray = wordsArray.filter(word => word.length === 5);
        const hard_WordsArray = wordsArray.filter(word => word.length === 6);

        // Upon clicking confirm button on main page, brings you to 2nd page (Start button page)
        const confirm_Buttons = () => {
            $('#easyBtn, #mediumBtn, #hardBtn').on('click', event => {
                $('.container').empty();
                const $btnDataValue = $(event.currentTarget).data('val');
                $('.container').append($h2_secondPage.text(`You have chosen ${$btnDataValue} mode!`));
                $('.container').append($('<div>').attr('id', 'startBtnDiv'))
                $('#startBtnDiv').append($startBtn);

                // Upon clicking start button, game will start
                $startBtn.on('click', event => {
                    $('.container').empty();

                    // Game start function
                    const startGame = (difficulty, array) => {
                        if ($btnDataValue === difficulty) {
                            answer = randomWord(array);
                            generateFirstQns();
                            enterButton(array);
                            skipButton(array);
                            countDownTimer(array);
                        };
                    };

                    // Initialize game start for either 'EASY', 'MEDIUM' or 'HARD' mode
                    startGame('EASY', easy_WordsArray);
                    startGame('MEDIUM', medium_WordsArray);
                    startGame('HARD', hard_WordsArray);

                    // Solution button function (On click, shows the answer for the question)
                    $solutionBtn.on('click', () => {
                        $('.solution').text(answer).toggle();
                    });

                    // Back to main button (On click, go back to home page)
                    $backToMainBtn.on('click', () => {
                        location.reload();
                    });

                    // Append input box, enter button and solution button
                    const $div = $('<div>').addClass('inputDiv');
                    $('.container').append($div);
                    $div.append($inputBox, $enterBtn, $solutionBtn);

                    // Append solution div
                    const $div2 = $('<div>').addClass('solution');
                    $div.after($div2);

                    // Append back to main button and skip button
                    const $div3 = $('<div>').addClass('mainAndSkipBtnDiv');
                    $div2.after($div3);
                    $div3.append($backToMainBtn, $skipBtn);

                    // Append countdown timer div
                    $div3.after($countdown_Div);
                    $countdown_Div.append($('<p>').addClass('timeLeft').text('Time Left'));
                    $countdown_Div.append($('<p>').addClass('seconds').text(`20s`));

                });
            });
        };
        // Generate first question of the game
        const generateFirstQns = () => {
            $('.container').append($h2_QnsNumber.text(`Question ${count}.`));
            $('.container').append($questions.text(randomize(answer)));
        };

        // Generate a new question (after first question)
        const generateNewQns = array => {
            timer = 21;
            answer = randomWord(array);
            $h2_QnsNumber.text(`Question ${count}.`)
            $questions.text(randomize(answer));
            $inputBox.val('');
            $('.solution').text('');
            $('.solution').css('display', 'none');
            generateGameover();
        };

        // Generate game over once 10 questions are done
        const generateGameover = () => {
            if (count === 11) {
                $('.container').empty();
                $('.container').append($endGame_Score.text(`Your score is ${score}/10`));
                $('.container').append($playAgainBtn);
                $playAgainBtn.on('click', () => location.reload());
            };
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
                timer--;
                if (timer >= 0) {
                    $('.seconds').text(`${timer}s`);
                };
                if (timer === 0) {
                    timer = 21;
                    count++;
                    generateNewQns(array);
                };
            }, 1000);
        };

        // Initialize this function upon clicking 'Confirm' button in home page
        confirm_Buttons();

    });
});