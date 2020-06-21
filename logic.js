var app;

function init() {
  initVue();
  initWords();
}

function initWords(){
  var url = "words.txt";
  loadWords(url, parseWords);
}

function loadWords(url, callback)
{
  fetch(url).then(function(response) {
    response.text().then(callback);
  });
}

function parseWords(text)
{
  var lines = text.split('\n');
  var i = lines.length;
  while(i--)
  {
    app.words.push({ text: lines[i] })
  }
}

function initVue(){
  app = new Vue({
    el: '#app',
    data: {
      startVisible: true,
      restartVisible: false,
      solved: 0,
      skipped: 0,
      currentWordIndex: 0,
      currentWord: 'Ready?',
      words: [],
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