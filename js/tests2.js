//TODO:
// Fix Darken Colors
// Resize hover state properly
// Add Color Selection
// Add 'Fuzzy Corners'
// Opacity
// Hardness
// Fill?
// Line?
// Marquee?
//#------->

//Thanks to: http://designwithpc.com/  | Prashant Chaudhary for this


Function.prototype.memoized = function(key){
    this._values = this._values || {};
    return this._values[key] !== undefined ?
        this._values[key] :
        this._values[key] = this.apply(this, arguments);
};

Function.prototype.memoize = function(){
    var ftn = this;
    return function(){
        return ftn.memoized.apply(ftn,arguments);
    };
};

if ( !Array.prototype.forEach ) {
  Array.prototype.forEach = function(fn, scope) {
    for(var i = 0, len = this.length; i < len; ++i) {
      fn.call(scope, this[i], i, this);
    }
  }
};

jQuery.fn.setBorderRadius = function(size) {

  var rSize = size;

  if(settings.brush.shape === 'square'){ rSize = 0};
    var borderRadiusObj = {

      '-moz-border-radius': rSize+'px',
      '-webkit-border-radius': rSize+'px',
      'border-radius': rSize+'px'

  };

  return (this).css(borderRadiusObj).css('width',size).css('height',size);

};

settings.brush.changeSize($('.brushSize').val());

//#--------------->





var cvtRGBtoHex = (function (color){

    if(color.indexOf('rgb') !== -1){

        var tempColor = color.substring((color.indexOf('(')+1),color.indexOf(')')).split(',');
        var color = '';

        for(i=0;i !== 3; i ++){

           var add = 0;
           tempColor[i] = (parseInt(tempColor[i])).toString(16);
            
            if(tempColor[i].length == 1){ 

                tempColor[i] = '0' + tempColor[i];

            };

           color += ''+tempColor[i];

        };  
    };

    return color;

}).memoize();

//#-------->



//#-------------> 

function eyeDropThis(){
    if(settings.tool === 'eyedropper'){

        settings.color = "#"+cvtRGBtoHex($('.pixel[x='+settings.X+'][y='+settings.Y+']').css('backgroundColor')); 
        $('#eyedropper').css('backgroundColor',settings.color); 
        return;

    };
};




$('.brushSize').change(function() {

    settings.brush.changeSize(parseInt($(this).val()));

});

$('.hardness').change(function() {
 // console.log($(this).val());
    settings.brush.hardness = $(this).val();

});


$('.darkenAmount').change(function() {
  // settings.brush.darkenAmount(1);
});


//#------> Clicks


$('.tool,.brushSize').click(function(){
 
    var thisId = $(this).attr('id');
    settings.tool = thisId;
    
    if(thisId === 'darken'){

        settings.change = true;

    } else if (thisId === 'pencil') {

        settings.change = false;
        settings.brush.shape = 'square';
        $('#cursor').removeClass('circle').addClass('square');

    } else if (thisId === 'pen'){

        settings.brush.shape = 'circle';
        settings.change = false;
        $('#cursor').removeClass('square').addClass('circle');

    };

    settings.brush.changeSize($('.brushSize').val());

});


$('.colorChoose').click(function(){

    var thisId = $('.colorDropIcon').css('backgroundColor');
    settings.color = thisId;

});

$('#eyedropper').click(function(){

    var thisId = $(this).attr('id');
    settings.tool = thisId;

});

$("body").mousemove(function(e) {

  if(settings.canvas.containerOffsetLeft !== false){

      settings.X = Math.ceil((e.pageX - settings.canvas.containerOffsetLeft)/settings.canvas.pixelSize);
      settings.Y = Math.ceil((e.pageY - settings.canvas.containerOffsetTop)/settings.canvas.pixelSize);
      
      settings.hoverCursorX = ((settings.X * settings.canvas.pixelSize) - settings.offSet )+'px';
      settings.hoverCursorY = ((settings.Y * settings.canvas.pixelSize) - settings.offSet )+'px';

      $('#cursor').css('left',settings.hoverCursorX).css('top',settings.hoverCursorY);

  };

});


$("body2").mousemove(function(e) {

    settings.X = parseInt(Math.ceil((e.pageX - $('.jcrop-holder').offset().left)/settings.pixelSize));
    settings.Y = parseInt(Math.ceil((e.pageY - $('.jcrop-holder').offset().top)/settings.pixelSize));
    
    settings.hoverCursorX = ((settings.X * settings.pixelSize) - settings.offSet )+'px';
    settings.hoverCursorY = ((settings.Y * settings.pixelSize) - settings.offSet )+'px';

    $('#cursor').stop(true,true).animate({left:settings.hoverCursorX,top:settings.hoverCursorY},500);

});




var cleanColorInput = (function (color){

    if(color.indexOf('#') !== -1){
       var color = color.substring(1,color.length); /// #ffffff ====> ffffff
    };

    var color = cvtRGBtoHex(color); ///rgb('255,255,255') ====> ffffff
    var color = color.split("");

    return color;

}).memoize();


var convertToArray = (function (color){

    newColor = new Array();

    var color = cleanColorInput(color);
    var change = 0; // Was darken variable.
    
    for(var i=5; color.length > 1;i--){
      
      var num = '';

      //Darken will be added here... as 'change';
      num = ((parseInt(color.shift(),16)*16)+(parseInt(color.shift(),16)) - change);
      
      num = num.toString(16);

      if(num.indexOf('-') !== -1){

          num = '00';

      }; 
          
      num = (num.length == 1)? 0 + num : num;

      newColor.push(num);

    };

    return newColor;

}).memoize();


var convertNum = (function convertNum(brushColor){

    var color = cleanColorInput(brushColor);

    var darkenColor = convertToArray(color);

    return "#"+darkenColor.join('');

}).memoize();


var brushDabRadius = (function (x, y, cx, cy, r) {
    var dx = x-cx
    var dy = y-cy
    return dx*dx+dy*dy <= r*r //true/false
   // return dx*dx+dy*dy+'|'+r*r; // gives the numbers compared
    //can find some 'fuzzy' math to round the corners?
});


//EXILED FOR NOW
//EXILED FOR NOW
//EXILED FOR NOW
//EXILED FOR NOW
//EXILED FOR NOW
//EXILED FOR NOW
//EXILED FOR NOW
//EXILED FOR NOW
//EXILED FOR NOW
//EXILED FOR NOW



        if(100000000 < 1){
          // This could be an outline feature (inside the surround pixels function)
          // 
          // stroke = 1;
          var perc = (brushDabRadius(i, e, x, y, (settings.brush.size/2),true));
          perc = ((settings.brush.size/2)*(settings.brush.size/2)) / perc;

        var test = brushDabRadius(i, e, x, y, (settings.brush.size/2)-stroke);

            if(test){
                var opacityLevel = 1;// ould be stroke color rather than opacity....
              } else {
                var opacityLevel = 0;// could be stroke color rather than opacity....
              }
        };




// 0 is hard, 1, 2,... softer
//#------> Changes
//

// settings.brush.darkenAmount = (function(n){
//     settings.darken = n * settings.brush.darken.que;
//     return settings.darken;    
// });


// function averageOfColors(color1,color1){

// function calc(x,y){
// var average=((x+y)/2).toFixed(2)
// alert(average)
// }
// onload=function(){calc(8,7)}
// };

//#-------->

// var difference = function (a, b, d) { 

//     var diff = Math.abs(a - b); 
//     return parseInt(diff * (settings.density + settings.opacity) * d);

// };

//#-------->





function ohButHowBlurry(i,e,x,y){
//to be continued...
  for (var g = 0; g < 10; g++) {

    var test = brushDabRadius(i, e, x, y, (settings.brush.size/2)-g);

    if(test){

      blurLevel = g;
 
    };
  };
};