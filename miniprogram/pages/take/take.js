var playMusic_js = require('../../utils/PlayMusic.js')
var playMusic_js1 = require('../../utils/PlayMusic1.js')

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
              { id: 9, name: '9' }],
    btnArray:[{}],
    Array0:[{}],
    Array1:[{}],
    Array2:[{}],
    changeNub:0,
    ran:0,
    score:0,
    opportunity:3,
    op:"",
    array3hide:'',
    array2hide:'',
    array1hide:'',
    segviewhide:'',
  },



  onLoad: function () {
    var that = this;
    that.data.numArray[0].checked = true;
    that.setData({
    numArray: that.data.numArray,
    btnArray:[{"title":"重新开始"},{"title":"下一题"}],
    score:0
  })
      that.create(10);

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
      content: '游戏失败',
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
      var num1 = this.getRandomfirst(100);
      var num2 = this.getRandomsecond(nub);
      var op = this.getOperator('×');
      var opTemp = op;
      var num1Array = that.decomposition(num1);
      var num2Array = that.decomposition(num2);
      var Array0 = that.decomposition(that.replaceZero(num2Array)[2]*num1);
      var Array1 = that.decomposition(that.replaceZero(num2Array)[1]*num1);
      var Array2 = that.decomposition(that.replaceZero(num2Array)[0]*num1);
      
      var array3hide = "letf-three-Group";
      var array2hide = "letf-array2-Group";
      var array1hide = "letf-array1-Group";
      var segviewhide = "segview";

      if (that.HiddenNubEven(num2Array).length <2) {
          segviewhide = "segview-hide";
          array3hide = "letf-three-hide";
      }else{
          segviewhide = "segview";
          array3hide = "letf-three-Group";
      }

      var resultArray;

      if (isNaN(Array0[0])) { 
            if (isNaN(Array1[1])) {
                Array0 = Array2;
                 array1hide = "letf-array1-hide";
                 array2hide = "letf-array2-hide";
            }else{
                Array0 = Array1;
                Array1 = Array2;
                array2hide = "letf-array2-hide";
            }
          
      }

      var num2Arrayjoin = num2Array.join("");

      if (op === '×') opTemp = '*';
      if (op === '÷') opTemp = '/';

      var optarr = [num1,op,num2Arrayjoin];

      resultArray = that.decomposition((that.getResultsNub(optarr)));


      that.setHistorData('histor',op,array2hide,array1hide,segviewhide,array3hide,num1Array,num2Array,Array0,Array1,Array2,resultArray);

      that.setData({
       op:op,
    array1hide:array1hide,
    array2hide:array2hide,
    array3hide:array3hide, 
    segviewhide:segviewhide,
    num1Array:that.HiddenNubOdd(num1Array),
    num2Array:that.HiddenNubEven(num2Array),
    Array0:that.HiddenNubOdd(Array0),
    Array1:that.HiddenNubEven(Array1),
    Array2:that.HiddenNubOdd(Array2),
    resultArray:that.HiddenNubEven(resultArray),
            })
     
  },



 oneTap:function(e){
      var that = this;
      playMusic_js.play(1);
      that.changeTap(e,"num1Array");
  },
  oneTaptow:function(e){
      var that = this;
      playMusic_js.play(1);
      that.changeTap(e,"num2Array");
  },

  oneTapresult:function(e){
      var that = this;
      playMusic_js.play(1);
      that.changeTap(e,"resultArray");
  },

  oneTaptowArray0:function(e){
      var that = this;
      playMusic_js.play(1);
      that.changeTap(e,"Array0");
  },

  oneTaptowArray1:function(e){
      var that = this;
      playMusic_js.play(1);
      that.changeTap(e,"Array1");
  },  

  oneTaptowArray2:function(e){
      var that = this;
      playMusic_js.play(1);
      that.changeTap(e,"Array2");
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
    that.create(10);
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
          array1hide:res.data.array1hide,
          array2hide:res.data.array2hide,
          array3hide:res.data.array3hide,
          segviewhide:res.data.segviewhide,     
            num1Array:res.data.num1Array,
            num2Array:res.data.num2Array,
            Array0:res.data.Array0,
            Array1:res.data.Array1,
            Array2:res.data.Array2,
            resultArray:res.data.resultArray,
                    })
              } 
            })
  },
 
  //缓存历史数据
  setHistorData:function(histor,op,array2hide,array1hide,segviewhide,array3hide,num1Array,num2Array,Array0,Array1,Array2,resultArray){
    var that = this;
    wx.setStorage({
        key: histor,
        data: {
                 op:op,
         array1hide:array1hide,
         array2hide:array2hide,
         array3hide:array3hide,
        segviewhide:segviewhide,
          num1Array:that.HiddenNubOdd(num1Array),
          num2Array:that.HiddenNubEven(num2Array),
          Array0:that.HiddenNubOdd(Array0),
          Array1:that.HiddenNubEven(Array1),
          Array2:that.HiddenNubOdd(Array2),
          resultArray:that.HiddenNubEven(resultArray)
        }
      })
  },

//结算对比   
getJiesuanStorage:function(histor){

        var that = this;
       wx.getStorage({
          key:histor,
          success: function(res) {

            if (that.data.num2Array.length == 1) {

          if (!that.jiesuanRan(that.data.num1Array) && !that.jiesuanRan(that.data.num2Array) && !that.jiesuanRan(that.data.Array0)){
            if (that.jiesuan(that.data.num1Array) == that.jiesuan(res.data.num1Array) && that.jiesuan(that.data.num2Array) == that.jiesuan(res.data.num2Array) && that.jiesuan(that.data.Array0) == that.jiesuan(res.data.Array0)) {
                that.addScore();
            }else{
                that.modalcnt();
            }
          }else{
               that.answerModal();
          }
      }else if (that.data.num2Array.length == 2) {
 
          if (!that.jiesuanRan(that.data.num1Array) && !that.jiesuanRan(that.data.num2Array) && !that.jiesuanRan(that.data.Array0) && !that.jiesuanRan(that.data.Array1) && !that.jiesuanRan(that.data.resultArray)){
            if (that.jiesuan(that.data.num1Array) == that.jiesuan(res.data.num1Array) && that.jiesuan(that.data.num2Array) == that.jiesuan(res.data.num2Array) && that.jiesuan(that.data.Array0) == that.jiesuan(res.data.Array0) && that.jiesuan(that.data.Array1) == that.jiesuan(res.data.Array1) && that.jiesuan(that.data.resultArray) == that.jiesuan(res.data.resultArray)) {
                that.addScore();
            }else{
                that.modalcnt();
            }
          }else{
               that.answerModal();
          }
      }else if (that.data.num2Array.length == 3) {
          if (!that.jiesuanRan(that.data.num1Array) && !that.jiesuanRan(that.data.num2Array) && !that.jiesuanRan(that.data.Array0) && !that.jiesuanRan(that.data.Array1) && !that.jiesuanRan(that.data.Array2) && !that.jiesuanRan(that.data.resultArray)){
           if (that.jiesuan(that.data.num1Array) == that.jiesuan(res.data.num1Array) && that.jiesuan(that.data.num2Array) == that.jiesuan(res.data.num2Array) && that.jiesuan(that.data.Array0) == that.jiesuan(res.data.Array0) && that.jiesuan(that.data.Array1) == that.jiesuan(res.data.Array1)  && that.jiesuan(that.data.Array2) == that.jiesuan(res.data.Array2) && that.jiesuan(that.data.resultArray) == that.jiesuan(res.data.resultArray)) {
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
 
//选项卡
 parameterTap:function(e){
    var that=this;
    playMusic_js.play(0);
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
        var that = this;
        playMusic_js.play(2);
        that.data.score ++;
         if (that.data.score > 10 && that.data.score <= 40) {
            that.create(100);
          }else if (that.data.score > 40) {
            that.create(1000);
          }else{
            that.create(10);
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
