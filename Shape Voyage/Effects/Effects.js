
/* Game start message */
var Messenger = function(el) {
    'use strict';
    var m = this;
    
    m.init = function(){
      m.codeletters = "&#*+%?£@§$";
      m.message = 0;
      m.current_length = 0;
      m.fadeBuffer = false;
      m.messages = [
        '3',
        '2',
        '1',
        'GO!'
      ];
      
      setTimeout(m.animateIn, 1000); // time until animation starts
    };
    
    m.generateRandomString = function(length){
      var random_text = '';
      while(random_text.length < length){
        random_text += m.codeletters.charAt(Math.floor(Math.random()*m.codeletters.length));
      } 
      
      return random_text;
    };
    
    m.animateIn = function(){
      if(m.current_length < m.messages[m.message].length){
        m.current_length = m.current_length + 2;
        if(m.current_length > m.messages[m.message].length) {
          m.current_length = m.messages[m.message].length;
        }
        
        var message = m.generateRandomString(m.current_length);
        $(el).html(message);
        
        setTimeout(m.animateIn, 20);
      } else { 
        setTimeout(m.animateFadeBuffer, 20);
      }
    };
    
    m.animateFadeBuffer = function(){
      if(m.fadeBuffer === false){
        m.fadeBuffer = [];
        for(var i = 0; i < m.messages[m.message].length; i++){
          m.fadeBuffer.push({c: (Math.floor(Math.random()*12))+1, l: m.messages[m.message].charAt(i)});
        }
      }
      
      var do_cycles = false;
      var message = ''; 
      
      for(var i = 0; i < m.fadeBuffer.length; i++){
        var fader = m.fadeBuffer[i];
        if(fader.c > 0){
          do_cycles = true;
          fader.c--;
          message += m.codeletters.charAt(Math.floor(Math.random()*m.codeletters.length));
        } else {
          message += fader.l;
        }
      }
      
      $(el).html(message);
      
      if(do_cycles === true){
        setTimeout(m.animateFadeBuffer, 50);
      } else {
        setTimeout(m.cycleText, 2000);
      }
    };
    
    m.cycleText = function(){
      m.message = m.message + 1;
      if(m.message >= m.messages.length){
        m.message = 0;
      }
      
      m.current_length = 0;
      m.fadeBuffer = false;
      $(el).html('');
      
      setTimeout(m.animateIn, 10);
    };
    
    m.init();
}

/* */
var countDown;
var startTimer = 0;
function startCountDown() {
    countDown = setInterval(function() {
    startTimer++;
  }, 1000);
}

/* */
function removeText() {
    let gameMessage = document.getElementById("gameText");
    gameMessage.hidden = 'hidden';
    clearInterval(countDown);
}

/* */
function displayStats() {
    $('#statsDiv').show();
}

/* */
function hideStats() {
  $('#statsDiv').hide();
}

/* */
var score;
var lives;
function makeStats() {
    let div = document.createElement("div");
    div.id = "statsDiv";
    
    score = 0;
    let my_score = "SCORE : " + '\xa0\xa0' + score.toString();
    let d1 =  document.createElement("p");
    d1.id = "playerScore";
    d1.innerHTML = my_score;
    div.appendChild(d1);

    lives = 3;
    let my_lives = "LIVES : " + '\xa0\xa0\xa0\xa0' + lives.toString();
    let d2 =  document.createElement("p");
    d2.id = "playerLives";

  
    d2.innerHTML = my_lives;
    div.appendChild(d2);

    document.getElementById("playerStats").appendChild(div);
    $('#statsDiv').hide();
}