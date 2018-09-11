const  NoinputAudio = wx.createInnerAudioContext(),//未输入
       startAudio = wx.createInnerAudioContext(),//开始
       BGAudio = wx.createInnerAudioContext();//背景音乐
  function play(index){
    if(index == 0){
       NoinputAudio.src = "/mp3/Noinput.m4a";
       NoinputAudio.play();
    }else if(index == 1){
       startAudio.src = "/mp3/start.mp3";
       startAudio.play();
    }else if(index == 2){
       BGAudio.src = "/mp3/BG.mp3";
       BGAudio.play();
    }

    
  }

module.exports = {
 
 play:play

}


