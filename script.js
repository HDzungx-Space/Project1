let SpeechToText = {
    tbody: $('tbody.text-content'),
    player: $('.audio-player'),
  }
  
  let startBtn = document.querySelector('.start-btn')
  let audioPlay = document.querySelector('.audio-player')
  // audioPlay.playbackRate = 0.8
  
  let recognition = new webkitSpeechRecognition()
  // set params
  recognition.continuous = false
  recognition.interimResults = true
  adjustStartSecond = -0.5
  adjustEndSecond = 0.5
  
  // start immediately
  // recognition.start();
  
  
  let playingFlag = false
  startBtn.addEventListener('click', function () {
    recognition.lang = $('.lang').val()
    
    $('.recognition-status').attr('data-recognition-status', 'wait')
    
    playingFlag = true
    
    var errorCount = 0
  
    var startRecognition = function () {
      try {
        audioPlay.play()
      }
      catch (e) {
        errorCount++
        console.log('Audio player load failed (' + errorCount + ')')
        
        if (errorCount > 3) {
          if (window.confirm('Audio player is broken. Do you want to refresh this page?')) {
            location.reload()
          }
          return 
        }
        
        setTimeout(function () {
          startRecognition()
        }, 0)
        return
      }
  
      setTimeout(() => {
        recognitionFinish()
      }, (audioPlay.duration * 1000 + 100))
  
      // $('<div>0:00</div>').insertBefore(text)
      recognition.start()
  
      //document.querySelector('.text-content').style.display = 'block'
      $('.text-content').removeClass('hide')
    }
    startRecognition()
  })
  
  let recognitionFinish = function () {
    recognition.stop()
    playingFlag = false
    $('.content-controller .button.disabled').removeClass('disabled')
    $('.recognition-status').attr('data-recognition-status', 'finish')
  }
  
  $(window).resize(function () {
    $('.caption textarea').css('height', '3rem').autogrow({vertical: true, horizontal: false, flickering: false})
  })
 
  $('.button.download-btn').click(downloadCaption)
    
  $(function () {
    setTimeout(function () {
    }, 3000)
  })