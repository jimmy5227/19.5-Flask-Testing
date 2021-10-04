score = 0;

// const game = new BoggleGame("newBoggle");

// class BoggleGame {
//   /* make a new game at this DOM id */

//   constructor(boardId, secs = 60) {
//     this.secs = secs; // game length
//     this.showTimer();

//     this.score = 0;
//     this.words = new Set();
//     this.board = $("#" + boardId);

//     // every 1000 msec, "tick"
//     this.timer = setInterval(this.tick.bind(this), 1000);

//     $(".add-word", this.board).on("submit", this.handleSubmit.bind(this));
//   }
// }

class BoggleGame {
  constructor(secs = 60) {
    this.score = 0;
    this.words = new Set();

    this.secs = secs;
    this.showTimer();
    this.timer = setInterval(this.tick.bind(this), 1000);
  }

  async tick() {
    this.secs -= 1;
    this.showTimer();

    if (this.secs === 0) {
      clearInterval(this.timer);
      // await this.scoreGame();
    }
  }

  showTimer() {
    $(".timer", this.board).text(this.secs);
  }
}

$("#word-guess").on("submit", async function handleClick(evt) {
  evt.preventDefault();

  let $query = $("#word-guess-input").val();
  if (!$query) return;

  const response = await axios.get("/check-word", { params: { word: $query } });
  const result = response.data.result;

  const $scoreboard = $("#score");
  if (result == "ok") {
    score += $query.length;
    $item = $(
      `<h2 class="msg ok">Score: ${score} The word, ${$query} is a word!</h2>`
    );
  } else if (result == "not-word") {
    $item = $(
      `<h2 class="msg err">Score: ${score} The word, ${$query} is not a word!</h2>`
    );
  } else
    $item = $(
      `<h2 class="msg err">Score: ${score} The word, ${$query} is not on the board!</h2>`
    );

  $scoreboard.empty();
  $scoreboard.append($item);
});
