var app;

function init() {
  console.log("init");
  initVuew();
}

function initVuew(){
  app = new Vue({
    el: '#app',
    data: {
      startVisible: true,
      restartVisible: false,
      solved: 0,
      skipped: 0,
      currentWordIndex: 0,
      currentWord: 'Ready?',
      words: [
        { text: 'Word 0' },
        { text: 'Word 1' },
        { text: 'Word 2' },
        { text: 'Word 3' },
        { text: 'Word 4' },
        { text: 'Word 5' },
        { text: 'Word 6' },
        { text: 'Word 7 which is long because there may be long words' },
      ],
      shuffled: []
    },
    methods: {
      start: function () {
        this.startVisible = false;
        this.restartVisible = true;
        this.resetWords();
        this.resetCount();
        this.nextWord();
      },
      restart: function () {
        this.resetCount();
        this.nextWord();
      },
      resetCount: function () {
        this.solved = 0;
        this.skipped = 0;
      },
      increaseCounter: function(solved){
        if (solved) {
          this.solved++;
        }
        else {
          this.skipped++;
        }
      },
      resetWords: function () {
        this.shuffled = this.shuffle(this.words.slice(0));
        this.currentWordIndex = 0;
      },
      nextWord: function () {
        this.currentWord = this.shuffled[this.currentWordIndex].text;
        this.currentWordIndex++;
      },
      next: function (solved) {
        this.increaseCounter (solved);

        if (this.currentWordIndex >= this.shuffled.length) {
          this.resetWords();
        }

        this.nextWord();
      },
      // https://github.com/coolaj86/knuth-shuffle
      // Apache License 2.0
      shuffle: function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }
    }
  })}