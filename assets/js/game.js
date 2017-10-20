(function() {
  var questions = [{
    question: "Which planet in our solar system has the most oxygen?",
    choices: [" Jupiter", " Mars", " Earth"],
    correctAnswer: "Earth"
  }, {
    question: "The European Organization for Nuclear Research is known by what four letter acronym?",
    choices: [" CERN", " NATO", " UWCE"],
    correctAnswer: "CERN"
  }, {
    question: "What is the melting point of ice in Fahrenheit?",
    choices: [" 32°F", " 0°F", " 0°C"],
    correctAnswer: "32°F" 
  }, {
    question: "What are the three base units of measurement in the metric system?",
    choices: [" Meter, Liter and Gram", " Decimals, Base 10, Floats"," European Nation Code"],
    correctAnswer: "Meter, Liter and Gram"
  }, {
    question: "How many planets in our solar system have moons?",
    choices: [" 9",  " 6",  " 12"],
    correctAnswer: "9"
  }];
  
  var questionCounter = 0; 
  var selections = []; //game user choices
  var game = $('#game'); 
  
  
  displayNext();
  

  $('#next').on('click', function (e) {
    e.preventDefault();
    
    if(game.is(':animated')) {        
      return false;
    }
    choose();
    
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(game.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(game.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createCheckBox(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  function createCheckBox(index) {
    var checkList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="checkbox" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      checkList.append(item);
    }
    return checkList;
  }
  
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  function displayNext() {
    game.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        game.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      } else {
        var scoreElem = displayScore();
        game.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})(); 