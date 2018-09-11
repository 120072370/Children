var playMusic_js = require('../../utils/PlayMusic.js');
var playMusic_js1 = require('../../utils/PlayMusic1.js');


Page({
    data:{
    id9:"9",
    id8:"8",
    id7:"7",
    id6:"6",
    id5:"5",
    id4:"4",
    id3:"3",
    id2:"2",
    id1:"1",
    id0:"0",
    num1Array:[{}],
    num2Array:[{}],
    num3Array:[{}],
    num4Array:[{}],
    num5Array:[{}],
    num6Array:[{}],
    num7Array:[{}],
    resultArray:[{}],
    numArray:[{ id: 0, name: '0' },
              { id: 1, name: '1' }, 
              { id: 2, name: '2' },
              { id: 3, name: '3' },
              { id: 4, name: '4' },
              { id: 5, name: '5' },
              { id: 6, name: '6' },
              { id: 7, name: '7' },
              { id: 8, name: '8' },
              { id: 9, name: '9' },
              { id: '-', name: '-' },],

    btnArray:[{}],
   
    changeNub:0,
    ran:0,
    score:0,
    opportunity:3,
    op:"",
    array2hide:'',
    array3hide:'',
    array4hide:'',
    array5hide:'',
    array6hide:'',
    nub:'',
  },



  onLoad: function () {
    var that = this;
    that.data.numArray[0].checked = true;
    that.setData({
    numArray: that.data.numArray,
    btnArray:[{"title":"重新开始"},{"title":"下一题"}],
    score:0,
  })
      that.create(1);
  },

  onReady:function(){
    // 页面渲染完成 

  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },


  modalcnt:function(){
    var that = this;
    that.data.opportunity --;
    if (that.data.opportunity == 0 ) {
    playMusic_js.play(4);
     wx.showModal({
      title: '提示',
      content: '机会已经用完',
      success: function(res) {
            if (res.confirm) {
              that.resetdate();
              } else if (res.cancel) {
              that.resetdate();
              }
            }
          })
       
    }else{
      playMusic_js.play(3);
    wx.showModal({

      title: '提示',
      content: '答案错误,你还有'+ that.data.opportunity  +'机会',
      success: function(res) {
        if (res.confirm) {
          that.getHistorData('histor');
          } else if (res.cancel) {

          }
        }
      })
        that.setData({
          opportunity:that.data.opportunity,
      })
    }

  },

  clickedBtn:function(even){
    //0重置 1下一题
    var that = this;
    if (even.currentTarget.dataset.name === 0) {
        that.resetdate();
    }else{    
        that.getJiesuanStorage("histor");
    }  
  },
  
 
  create:function (nub) {
      var that = this;
      var num1 = this.getRandomfirst(1);
      var num2 = this.getRandomsecond(10);
      var num3 = this.getRandomfirst(100);
      var num4 = this.getRandomsecond(100);
      var num5 = this.getRandomfirst(100);
      var num6 = this.getRandomsecond(1000);
      var num7 = this.getRandomfirst(100);
      var op = this.getOperator('-');
      var opTemp = op;


      var array2hide = "letf-tow-Group";
      var array3hide = "letf-tow-Group";
      var array4hide = "letf-tow-Group";
      var array5hide = "letf-tow-Group";
      var array6hide = "letf-tow-Group";
      var optarr1 = [num1,op,num7];
      var resultArray;
     if (nub == 1 || nub == 2) {
        array2hide = "letf-tow-hide";
        array3hide = "letf-tow-hide";
        array4hide = "letf-tow-hide";
        array5hide = "letf-tow-hide";
        array6hide = "letf-tow-hide";
      resultArray =  that.getResultsNub(optarr1);
      }else if(nub == 3){
        array3hide = "letf-tow-hide";
        array4hide = "letf-tow-hide";
        array5hide = "letf-tow-hide";
        array6hide = "letf-tow-hide";
      var optarr2 = [that.getResultsNub(optarr1),op,num2];
      resultArray =  that.getResultsNub(optarr2);
      }else if(nub == 4){
        array4hide = "letf-tow-hide";
        array5hide = "letf-tow-hide";
        array6hide = "letf-tow-hide";
      var optarr2 = [that.getResultsNub(optarr1),op,num2];
      var optarr3 = [that.getResultsNub(optarr2),op,num3];
      resultArray =  that.getResultsNub(optarr3);
      }else if(nub == 5){
        array5hide = "letf-tow-hide";
        array6hide = "letf-tow-hide";
        var optarr2 = [that.getResultsNub(optarr1),op,num2];
        var optarr3 = [that.getResultsNub(optarr2),op,num3];
        var optarr4 = [that.getResultsNub(optarr3),op,num4];
        resultArray =  that.getResultsNub(optarr4);
      }else if(nub == 6){
        array6hide = "letf-tow-hide";
        var optarr2 = [that.getResultsNub(optarr1),op,num2];
        var optarr3 = [that.getResultsNub(optarr2),op,num3];
        var optarr4 = [that.getResultsNub(optarr3),op,num4];
        var optarr5 = [that.getResultsNub(optarr4),op,num5];
        resultArray =  that.getResultsNub(optarr5);
      }else{
        var optarr2 = [that.getResultsNub(optarr1),op,num2];
        var optarr3 = [that.getResultsNub(optarr2),op,num3];
        var optarr4 = [that.getResultsNub(optarr3),op,num4];
        var optarr5 = [that.getResultsNub(optarr4),op,num5];
        var optarr6 = [that.getResultsNub(optarr5),op,num6];
        resultArray =  that.getResultsNub(optarr6);
      }


      that.setHistorData('histor',array2hide,array3hide,array4hide,array5hide,array6hide,op,num1,num2,num3,num4,num5,num6,num7,resultArray,nub);

      that.setData({
       op:op,
       nub:nub,
       array2hide:array2hide,
       array3hide:array3hide,
       array4hide:array4hide,
       array5hide:array5hide,
       array6hide:array6hide,        
    num1Array:that.HiddenNubOdd(that.decomposition(num1)),
    num2Array:that.HiddenNubEven(that.decomposition(num2)),
    num3Array:that.HiddenNubOdd(that.decomposition(num3)),
    num4Array:that.HiddenNubEven(that.decomposition(num4)),
    num5Array:that.HiddenNubOdd(that.decomposition(num5)),
    num6Array:that.HiddenNubEven(that.decomposition(num6)),
    num7Array:that.HiddenNubOdd(that.decomposition(num7)),
    resultArray:that.HiddenNubOdd(that.decomposition(resultArray))
            })
     
  },



 num1Tap:function(e){
      var that = this;
      playMusic_js.play(1);
      that.changeTap(e,"num1Array");
  },
  num2Tap:function(e){
      var that = this;
      playMusic_js.play(1);
      that.changeTap(e,"num2Array");
  },

  num3Tap:function(e){
      var that = this;
      playMusic_js.play(1);
      that.changeTap(e,"num3Array");
  },

  num4Tap:function(e){
      var that = this;
      playMusic_js.play(1);
      that.changeTap(e,"num4Array");
  },

  num5Tap:function(e){
      var that = this;
      playMusic_js.play(1);
      that.changeTap(e,"num5Array");
  },  

  num6Tap:function(e){
      var that = this;
      playMusic_js.play(1);
      that.changeTap(e,"num6Array");
  },
  num7Tap:function(e){
      var that = this;
      playMusic_js.play(1);
      that.changeTap(e,"num7Array");
  },
  resultTap:function(e){
      var that = this;
      playMusic_js.play(1);
      that.changeTap(e,"resultArray");
  },


  //改变视图内容
  changeTap:function(e,Array){
    var that = this;
    if (e.currentTarget.dataset.ran == true) {
      var upChange = Array+"[" + e.currentTarget.dataset.index + "].nub";
      var ranChange = Array+"[" + e.currentTarget.dataset.index + "].ran";
       that.setData({
         [upChange]:that.data.changeNub,
         [ranChange]:0
       })
    }
},

  //重新开始重置数据
  resetdate:function(){
    playMusic_js1.play(1);
    var that = this;
    that.create(1);
    that.setData({
          opportunity:3,
          score:0,
      })
  },

  //获取历史数据
  getHistorData:function(histor){
    var that = this;
       wx.getStorage({
          key:histor,
          success: function(res) {
             that.setData({
                   op:res.data.op,
                  nub:res.data.nub,
           array2hide:res.data.array2hide,
           array3hide:res.data.array3hide,
           array4hide:res.data.array4hide,
           array5hide:res.data.array5hide,
           array6hide:res.data.array6hide,
            num1Array:res.data.num1Array,
            num2Array:res.data.num2Array,
            num3Array:res.data.num3Array, 
            num4Array:res.data.num4Array,
            num5Array:res.data.num5Array,
            num6Array:res.data.num6Array,
            num7Array:res.data.num7Array,
            resultArray:res.data.resultArray,
                    })
              } 
            })
  },
 
  //缓存历史数据
  setHistorData:function(histor,array2hide,array3hide,array4hide,array5hide,array6hide,op,num1,num2,num3,num4,num5,num6,num7,resultArray,nub){

    var that = this;
    wx.setStorage({
        key: histor,
        data: {
              op:op,
              nub:nub,
   array2hide:array2hide,
   array3hide:array3hide,
   array4hide:array4hide,
   array5hide:array5hide,
   array6hide:array6hide,
    num1Array:that.HiddenNubOdd(that.decomposition(num1)),
    num2Array:that.HiddenNubEven(that.decomposition(num2)),
    num3Array:that.HiddenNubOdd(that.decomposition(num3)),
    num4Array:that.HiddenNubEven(that.decomposition(num4)),
    num5Array:that.HiddenNubOdd(that.decomposition(num5)),
    num6Array:that.HiddenNubEven(that.decomposition(num6)),
    num7Array:that.HiddenNubOdd(that.decomposition(num7)),
    resultArray:that.HiddenNubOdd(that.decomposition(resultArray))

        }
      })
  },

//结算对比   
getJiesuanStorage:function(histor){

     
        var that = this;
       wx.getStorage({
          key:histor,
          success: function(res) {
            if (res.data.nub == 2 || res.data.nub == 1) {
                if (!that.jiesuanRan(that.data.num1Array)  && !that.jiesuanRan(that.data.num7Array) && !that.jiesuanRan(that.data.resultArray)) {
                  if (that.jiesuan(that.data.num1Array) == that.jiesuan(res.data.num1Array) && that.jiesuan(that.data.num7Array) == that.jiesuan(res.data.num7Array) && that.jiesuan(that.data.resultArray) == that.jiesuan(res.data.resultArray)) {
                    that.addScore();
                }else{
                    that.modalcnt();
                }
              }else{
                 that.answerModal();
              }
            }else if(res.data.nub == 3){
                if (!that.jiesuanRan(that.data.num1Array)  && !that.jiesuanRan(that.data.num2Array) && !that.jiesuanRan(that.data.num7Array) && !that.jiesuanRan(that.data.resultArray)) {
                  if (that.jiesuan(that.data.num1Array) == that.jiesuan(res.data.num1Array) && that.jiesuan(that.data.num2Array) == that.jiesuan(res.data.num2Array) && that.jiesuan(that.data.num7Array) == that.jiesuan(res.data.num7Array) && that.jiesuan(that.data.resultArray) == that.jiesuan(res.data.resultArray)) {
                    that.addScore();
                }else{
                    that.modalcnt();
                }
              }else{
                 that.answerModal();
              }
            }else if(res.data.nub == 4){
                if (!that.jiesuanRan(that.data.num1Array)  && !that.jiesuanRan(that.data.num2Array) && !that.jiesuanRan(that.data.num3Array)&& !that.jiesuanRan(that.data.num7Array) && !that.jiesuanRan(that.data.resultArray)) {
                  if (that.jiesuan(that.data.num1Array) == that.jiesuan(res.data.num1Array) && that.jiesuan(that.data.num2Array) == that.jiesuan(res.data.num2Array) && that.jiesuan(that.data.num3Array) == that.jiesuan(res.data.num3Array) && that.jiesuan(that.data.num7Array) == that.jiesuan(res.data.num7Array)&& that.jiesuan(that.data.resultArray) == that.jiesuan(res.data.resultArray)) {
                    that.addScore();
                }else{
                    that.modalcnt();
                }
              }else{
                 that.answerModal();
              }
            }else if(res.data.nub == 5){
                if (!that.jiesuanRan(that.data.num1Array)  && !that.jiesuanRan(that.data.num2Array) && !that.jiesuanRan(that.data.num3Array)&& !that.jiesuanRan(that.data.num4Array) && !that.jiesuanRan(that.data.num7Array)&& !that.jiesuanRan(that.data.resultArray)) {
                  if (that.jiesuan(that.data.num1Array) == that.jiesuan(res.data.num1Array) && that.jiesuan(that.data.num2Array) == that.jiesuan(res.data.num2Array) && that.jiesuan(that.data.num3Array) == that.jiesuan(res.data.num3Array) && that.jiesuan(that.data.num4Array) == that.jiesuan(res.data.num4Array) && that.jiesuan(that.data.num7Array) == that.jiesuan(res.data.num7Array)&& that.jiesuan(that.data.resultArray) == that.jiesuan(res.data.resultArray)) {
                    that.addScore();
                }else{
                    that.modalcnt();
                }
              }else{
                 that.answerModal();
              }
            }else if(res.data.nub == 6){
                if (!that.jiesuanRan(that.data.num1Array)  && !that.jiesuanRan(that.data.num2Array) && !that.jiesuanRan(that.data.num3Array)&& !that.jiesuanRan(that.data.num4Array)&& !that.jiesuanRan(that.data.num5Array) && !that.jiesuanRan(that.data.num7Array)&& !that.jiesuanRan(that.data.resultArray)) {
                  if (that.jiesuan(that.data.num1Array) == that.jiesuan(res.data.num1Array) && that.jiesuan(that.data.num2Array) == that.jiesuan(res.data.num2Array) && that.jiesuan(that.data.num3Array) == that.jiesuan(res.data.num3Array) && that.jiesuan(that.data.num4Array) == that.jiesuan(res.data.num4Array) && that.jiesuan(that.data.num5Array) == that.jiesuan(res.data.num5Array)  && that.jiesuan(that.data.num7Array) == that.jiesuan(res.data.num7Array)&& that.jiesuan(that.data.resultArray) == that.jiesuan(res.data.resultArray)) {
                    that.addScore();
                }else{
                    that.modalcnt();
                }
              }else{
                 that.answerModal();
              }
            }else{
                 if (!that.jiesuanRan(that.data.num1Array)  && !that.jiesuanRan(that.data.num2Array) && !that.jiesuanRan(that.data.num3Array)&& !that.jiesuanRan(that.data.num4Array)&& !that.jiesuanRan(that.data.num5Array)&& !that.jiesuanRan(that.data.num6Array)&& !that.jiesuanRan(that.data.num7Array)&& !that.jiesuanRan(that.data.resultArray)) {
                  if (that.jiesuan(that.data.num1Array) == that.jiesuan(res.data.num1Array) && that.jiesuan(that.data.num2Array) == that.jiesuan(res.data.num2Array) && that.jiesuan(that.data.num3Array) == that.jiesuan(res.data.num3Array) && that.jiesuan(that.data.num4Array) == that.jiesuan(res.data.num4Array) && that.jiesuan(that.data.num5Array) == that.jiesuan(res.data.num5Array) && that.jiesuan(that.data.num6Array) == that.jiesuan(res.data.num6Array) && that.jiesuan(that.data.num7Array) == that.jiesuan(res.data.num7Array)&& that.jiesuan(that.data.resultArray) == that.jiesuan(res.data.resultArray)) {
                    that.addScore();
                }else{
                    that.modalcnt();
                }
              }else{
                 that.answerModal();
              }
            }
           
            that.setData({
              score:that.data.score,
          })
       }
    })
   },

 //计算存储的和输入的是否相等
  jiesuan:function(array){
      var jiesuan  = [];
    for (var i = 0; i < array.length; i++) {
            var str = array[i].nub;
            jiesuan.push(str);
        }
        return jiesuan.join("");
  },

  //计算是否已经全部输入了
  jiesuanRan:function(array){
      var jiesuan  = [];
    for (var i = 0; i < array.length; i++) {
            var str = array[i].ran;
            jiesuan.push(str);
        }
        return jiesuan.includes(1);
  },
  //还没输入完整提示框
  answerModal:function(){
    playMusic_js1.play(0);
       wx.showModal({
                title: '提示',
                content: '请选择你的答案',
                success: function(res) {
                }
            })
  },
 
//选项卡
 parameterTap:function(e){
   playMusic_js.play(0);
    var that=this;
    var this_checked = e.currentTarget.dataset.id;
    var changeNub = e.currentTarget.dataset.id;
    var numArrayList = that.data.numArray//获取Json数组
    for (var i = 0; i < numArrayList.length;i++){
      if (numArrayList[i].id == this_checked){
        numArrayList[i].checked = true;//当前点击的位置为true即选中
      }else{
        numArrayList[i].checked = false;//其他的位置为false
      }
    }
    that.setData({
      numArray:numArrayList,
      changeNub:changeNub,
    })
  },


//增加分数并且重置次数
addScore:function(){
  playMusic_js.play(2);
        var that = this;
        that.data.score ++;
         if (that.data.score > 5 && that.data.score <= 5) {
            that.create(3);
          }else if (that.data.score > 10 && that.data.score <= 10) {
            that.create(4);
          }else if (that.data.score > 20 && that.data.score <= 20) {
            that.create(5);
          }else if (that.data.score > 20) {
            that.create(6);
          }else{
            that.create(1);
          }
          that.setData({
          opportunity:3,
        })
},

// 奇数
HiddenNubOdd:function(NubArray){

      var arrayNub = [];
      var index = 0;
      for (var i = 0; i < NubArray.length; i++) {
      var dictNub = {}; 
      if (i%2==0) {
        dictNub.ran =1;
      }else{
        dictNub.ran =0;
      }
      dictNub.nub = NubArray[i];
      arrayNub.push(dictNub);
    }
    return  arrayNub;
  },
// 偶数
HiddenNubEven:function(NubArray){

      var arrayNub = [];
      var index = 0;
      for (var i = 0; i < NubArray.length; i++) {
      var dictNub = {}; 
      if (i%2==0) {
        dictNub.ran =0;
      }else{
        dictNub.ran =1;
      }
      dictNub.nub = NubArray[i];
      arrayNub.push(dictNub);
    }
    return  arrayNub;
  },

  //分解数组
  decomposition:function(decomposi){

   var decomposition = (String(decomposi).split(""));
    return decomposition;
  },

  //结算结果
  getResultsNub:function(optarr){
    var result=Number(optarr[0])*1.0;
    for(var i=1;i<optarr.length;i++){
           if(isNaN(optarr[i])){
              if(optarr[1]=='+'){
                  result+=Number(optarr[i+1]);
              }else if(optarr[1]=='-'){
                  result-=Number(optarr[i+1]);
              }else if(optarr[1]=='×'){
                  result*=Number(optarr[i+1]);
              }
           }
       }
       return result;
  },

  //随机生成0-2
  getRandomArrayElements:function(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
  },
  //随机生成第一个数字
  getRandomfirst:function (nub) {
           
    return Math.floor(((Math.random()*10000) % 9+1)*nub);
  },
  //随机生成第二个数字
  getRandomsecond:function (nub) {
 
      return Math.floor(((Math.random()*10000) % 9+1)*nub);
  },
  //替换数组中出现的0
  replaceZero:function(array){
     for (var i = 0; i <array.length; i++) {
          var reverse  = parseInt(array[i]);
          if (reverse === 0) {
            array.splice(i,1,1);
          }
      } 
      return array;
  },
  //生成乘法运算
  getOperator:function(operation) {
      var arr = [operation];
      return arr[Math.floor(Math.random()*arr.length)];
  },
})
