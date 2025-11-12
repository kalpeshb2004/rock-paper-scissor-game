let score = JSON.parse(localStorage.getItem(`score`));

      if (score === null) {
        score = {
          win: 0,
          lose: 0,
          tie: 0,
        };
      }

      let isAutoPlaying = false;
      let intervalId;

      function autoplay() {
        if (!isAutoPlaying) {
          intervalId = setInterval(function () {
            const playerMove = computerMove();
            playGame(playerMove);
          }, 1000);
          isAutoPlaying = true;
        } else {
          clearInterval(intervalId);
          isAutoPlaying = false;
        }
      }

      updateScore();

      /*now we gonna create another function*/

      function playGame(playerMove) {
        let computerMoveResult = computerMove();

        let result = "";

        if (playerMove === "scissor") {
          if (computerMoveResult === "rock") {
            result = "you lose";
          } else if (computerMoveResult === "paper") {
            result = "you win";
          } else if (computerMoveResult === "scissor") {
            result = "tie";
          }
        } else if (playerMove === "paper") {
          if (computerMoveResult === "rock") {
            result = "you win";
          } else if (computerMoveResult === "paper") {
            result = "tie";
          } else if (computerMoveResult === "scissor") {
            result = "you lose";
          }
        } else if (playerMove === "rock") {
          if (computerMoveResult === "rock") {
            result = "tie";
          } else if (computerMoveResult === "paper") {
            result = "you lose";
          } else if (computerMoveResult === "scissor") {
            result = "you win";
          }
        }

        if (result === "you win") {
          score.win += 1;
        } else if (result === "you lose") {
          score.lose += 1;
        } else if (result === "tie") {
          score.tie += 1;
        }

        localStorage.setItem("score", JSON.stringify(score));

        updateScore();

        document.querySelector(".js-result").innerHTML = result;

        document.querySelector(".js-pc-move").innerHTML = `you
                    <img src="/image/${playerMove}-emoji.png" class="icon" alt="">
                    <img src="/image/${computerMoveResult}-emoji.png" class="icon" alt="">
                    computer`;
      }

      //DOM display function
      function updateScore() {
        document.querySelector(
          ".js-score"
        ).innerHTML = `win: ${score.win} lose: ${score.lose} tie: ${score.tie}`;
      }

      /*here we gonna start the function basic.

                function we are using for only repetition code.

                and then calling it in the onclick by its name.

                here usermove we are defining outside of the function due to the error of scope.

                 //let userMove = '';

                */
      function computerMove() {
        let random = Math.random();

        // but we have used userMove again inside of function . due to assign veriable of same name to call the function inside the onclick.

        let computerMoveResult = "";

        if (random >= 0 && random < 1 / 3) {
          computerMoveResult = "rock";
        } else if (random >= 1 / 3 && random < 2 / 3) {
          computerMoveResult = "paper";
        } else if (random >= 2 / 3 && random < 1) {
          computerMoveResult = "scissor";
        }

        //return we are using
        return computerMoveResult;
      }