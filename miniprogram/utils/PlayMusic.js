const TouChAudio = wx.createInnerAudioContext(),//点击
      PressAudio = wx.createInnerAudioContext(),//按下
      PassAudio= wx.createInnerAudioContext(),//通过
      PromptAudio = wx.createInnerAudioContext(),//提示
      FailureAudio = wx.createInnerAudioContext();//失败
    
  function play(index){
    if (index == 0) {
       TouChAudio.src = "/mp3/TouchTow.m4a";
       TouChAudio.play();
    }else if(index == 1){
       PressAudio.src = "/mp3/TouchOne.m4a";
       PressAudio.play();
    }else if(index == 2){
       PassAudio.src = "/mp3/Pass.m4a";
       PassAudio.play();
    }else if(index == 3){
       PromptAudio.src = "/mp3/Error.m4a";
       PromptAudio.play();
    }else{
       FailureAudio.src = "/mp3/Failure.m4a";
       FailureAudio.play();
    }

  }

module.exports = {
 
 play:play

}


