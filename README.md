# Word Unscramble
There are different levels of difficulties (easy, medium, hard and insane). You will have to rearrange the letters to form a word and each difficulty will have a limit on the number of letters. 

The game could serve as an educational purpose as well, as user could learn new english words they have never heard about.

## Table of Contents
 - [Project Demo](#project-demo)
 - [Technologies Used](#technologies-used)
 - [Difficulties Faced](#difficulties-faced)
 - [Further Improvements to be Made](#further-improvements-to-be-made)
 - [Wireframes and User Stories](#wireframes-and-user-stories)

## Project Demo
**Word Unscramble** is available to try on [https://redgreenblues.github.io/word-unscramble/]()

## Technologies Used
These technologies were used to create **Word Unscramble**:
 - **HTML5**, **CSS3**, & **JavaScript**
 - **jQuery** were used to manage DOM manipulation
 - **AJAX** were used to request and access data from the [API library](https://raw.githubusercontent.com/matthewreagan/WebstersEnglishDictionary/master/dictionary.json)

## Difficulties Faced
 1. **Trouble getting data from the API**
  - A lot of time was spent on trying to get data from the API, as it keeps returning me 'Undefined' data. Eventually, it was solved by placing my functions inside of promise.then(// code written here).
 2. **Parsing JSON data**
  - Data could be fetch from the API now, however it was not giving the data that I wanted to see. It was giving me back an array of indexes. This was solved by using JSON.parse() to parse the JSON data to JavaScript object.
 3. **Getting GitHub Pages to work**
  - Tried quite a lot of times trying to get my github.io to work, however it keep returning 404 error. Deleted repo and setting up again, however it still does not work. This resulted in losing my committed changes in the beginning. Eventually, found out that we need to wait for at least 30 minutes for github.io to work.

## Further Improvements to be Made
There are a few functions that can be improved or added upon:
 - Adding a **user registration and login page**, so that user is able to create a username
 - By utilizing the username created by the user, a **scoreboard** could be created to keep track of the user's score
 - Further creation of a **ranking system** to rank individual user score
 - Further improvement on the **logic to enable different answers to a single question**, instead of only one answer. This is because there are several cases where different words could be formed using the same letters
 - Design could be improved to be responsive on all platforms (mobile/tablets/desktop)

## Wireframes and User Stories
### 1. Main Page
As a player, I want to access the home page so that I could choose my level of difficulty.

<a href="https://i.imgur.com/v5WVcdo.png" target="_blank" ><img src="https://i.imgur.com/v5WVcdo.png" width="50%"></a>

### 2. Start Game
As a player, I want to confirm that I have chosen the correct mode before starting the game.

<a href="https://i.imgur.com/2aaKDoT.png" target="_blank" ><img src="https://i.imgur.com/2aaKDoT.png" width="50%"></a>

### 3. Play Game
As a player, I want to guess the correct word so that I can move on to the next question, otherwise I will skip the question.

<a href="https://i.imgur.com/ux42TCi.png" target="_blank" ><img src="https://i.imgur.com/ux42TCi.png" width="50%"></a>

### 4. Game Over
As a player, I want to see when the game is over so that I could see how many words I have entered correctly.

<a href="https://i.imgur.com/9ncNlKp.png" target="_blank" ><img src="https://i.imgur.com/9ncNlKp.png" width="50%"></a>