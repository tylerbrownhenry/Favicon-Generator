


//TODO:
// Fix size 1 for pencil
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

//#-------------->

settings = {offSet:60,pixelSize:16,darken:6,tool:'pencil',color:'#ffffff',change:false,density:.51,opacity:.51};
settings.brush = {size:4,shape:'square',darken: {que:0},hardness:1};

//#--------------->

settings.brush.changeSize = function(size){
    // We can add an if statment and make the function check each time if the 
    // tool has changed when we click it.
    var size = parseInt(size);
    settings.brush.size = size;

    $('#cursor').setBorderRadius(size * settings.pixelSize);
    
    if(settings.brush.shape === 'circle'){

      var add = 0;
      settings.offSet = ((size * settings.pixelSize)/2) + 10;

    } else {

        var add = ((size % 2) === 1)? 0 : 1; // Even & Odd Numbers Need to be Treated Differently
        settings.offSet = (size % 2 === 1)? (((size+1) * settings.pixelSize)/2) + 1 : ((size * settings.pixelSize)/2) + 1;
        settings.offSet = (size === 1)? 10 : settings.offSet;

    };

    this.remove  = Math.floor(size/2); 
    this.add  = ((this.remove)*-1)+add;
    
};

settings.changeColor = (function(c){

    settings.color = c;
    return settings.color;    

});

settings.brush.changeSize($('.brushSize').val());

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

var difference = function (a, b, d) { 

    var diff = Math.abs(a - b); 
    return parseInt(diff * (settings.density + settings.opacity) * d);

};

//#-------->

function cvtRGBtoHex(color,newDepth){

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

};

//#-------->

function brushDabRadius(x, y, cx, cy, r, returnVal) {

    var dx = x-cx
    var dy = y-cy

    if(typeof returnVal == 'undefined'){

      return dx*dx+dy*dy <= r*r //true/false   

    } else {

      return dx*dx+dy*dy;

    }

// return dx*dx+dy*dy+'|'+r*r; // gives the numbers compared
//can find some 'fuzzy' math to round the corners?
};

//#-------->


function cleanColorInput(color){

    if(color.indexOf('#') !== -1){
       var color = color.substring(1,color.length); /// #ffffff ====> ffffff
    };

    var color = cvtRGBtoHex(color); ///rgb('255,255,255') ====> ffffff
    var color = color.split("");

    return color;
};


//#-------------> 

var convertNum = (function convertNum(brushColor){

    var color = cleanColorInput(brushColor);

    darkenColor = new Array();
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

      darkenColor.push(num);

    };

    return "#"+darkenColor.join('');

}).memoize();






//#--------------------->

function createDivs(){
    
    appendToDivs = '';
    
    for(i=0,r=1,e=1;i < (32*32);i++){
       
        if(e == 33){

            e=1;
            r++

        };

        appendToDivs += '<div x='+e+'  y='+r+' class="pixel" style="background-color:#ff3333"></div>';
        e++

    };
    
    $('.e').html('<div id="cursor" class="square"></div>'+appendToDivs);

};

//createDivs();
//#--------------------->




function useCurrentTool(target){

    var x = parseInt(settings.X),
    y = parseInt(settings.Y);    
   
//#------------> Eye Dropper Tool
    if(settings.tool === 'eyedropper'){

        settings.color = "#"+cvtRGBtoHex($('.pixel[x='+x+'][y='+y+']').css('backgroundColor')); 
        $('#eyedropper').css('backgroundColor',settings.color); 
        return;

    };

//#------------> Finds the pixels that will be affected by the brush
    coord = [];
    coord.maxX = parseInt(x+settings.brush.add);
    coord.minX = parseInt(x+settings.brush.remove);
    
    coord.minY = parseInt(y+settings.brush.remove);
    coord.maxY = parseInt(y+settings.brush.add);
    
    for (var key in coord) {

       var obj = coord[key];
       if(obj < 1){ coord[key] = 1;};
       if(obj > 32){ coord[key] = 32;};

    };
        
//#------------> Drawing Tools
  for(var e=coord.maxY;e < coord.minY + 1; e++){
    for(var i=coord.maxX;i < coord.minX + 1; i++){

      var blurLevel = 'notSet';
      var test = false;
        
      var pixel = $('.pixel[x='+i+'][y='+e+']'); 

      if(settings.tool !== 'pen'){

        var hitTest = true;

      } else {

        var hitTest = brushDabRadius(i, e, x, y, (settings.brush.size/2));

        for (var g = 0; g < 10; g++) {

          var test = brushDabRadius(i, e, x, y, (settings.brush.size/2)-g);

          if(test){

            blurLevel = g;
       
          };

        };

      };
      
      if(settings.change === true && hitTest === true){

        var color = pixel.css('backgroundColor');               
        pixel.css('backgroundColor',convertNum(color)).attr('name',blurLevel);

      };
       
      if(settings.change === false && hitTest === true){
        if((settings.tool === 'pencil') || (settings.tool === 'pen')){    

          pixel.css('backgroundColor',settings.color);

        };
      };
    };
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
console.log('ghfgh');    
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

    settings.X = Math.ceil((e.pageX - $('.e').offset().left)/settings.pixelSize);
    settings.Y = Math.ceil((e.pageY - $('.e').offset().top)/settings.pixelSize);
    
    settings.hoverCursorX = ((settings.X * settings.pixelSize) - settings.offSet )+'px';
    settings.hoverCursorY = ((settings.Y * settings.pixelSize) - settings.offSet )+'px';

    $('#cursor').stop(true,true).animate({left:settings.hoverCursorX,top:settings.hoverCursorY},500);

});








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


