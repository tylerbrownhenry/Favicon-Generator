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
jQuery.fn.setBorderRadius = function(size) {
    var rSize = size;
    if(settings.brush.shape === 'square'){ rSize = 0};
        var borderRadiusObj = {
            '-moz-border-radius': rSize,
            '-webkit-border-radius': rSize,
            'border-radius': rSize
        }
        return (this).css(borderRadiusObj).css('width',size).css('height',size);
};

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

//#-------------->



settings = {offSet:30,pixelSize:9,darken:6};
settings.brush = {size:6,shape:'circle',darken: {que:0}};

settings.tool = function(f){
    if(f == true){
        this.change = true;
    } else {
        this.change = false;
    };
};

settings.changeColor = (function(c){
    settings.color = c;
    return settings.color;    
});

settings.useTool = (function(c){
    settings.color = c;
    return settings.color;    

    if(settings.tool === 'eyedropper'){
        eyeDropThis(target);
    } else {
        
    }

});

// settings.brush.darkenAmount = (function(n){
//     settings.darken = n * settings.brush.darken.que;
//     return settings.darken;    
// });






settings.tool = true;

$('.brushSize').change(function() {

    var changeSize = (settings.brush.size * settings.pixelSize)+'px';
  settings.brush.changeSize(parseInt($(this).val()),changeSize);

});

$('.darkenAmount').change(function() {
  // settings.brush.darkenAmount(1);
});





//#-------->

//#-------->





//#--------------------->

function createDivs(){
    
    appendToDivs = '';
    
    for(i=0,r=1,e=1;i < (32*32);i++){
       
        if(e == 33){
            e=1;
            r++
        };
        appendToDivs += '<div x='+e+'  y='+r+' class="pixel" style="background-color:#fff"></div>';
         e++
    };
    
    $('.e').html('<div id="cursor" class="circle"></div>'+appendToDivs);

};

createDivs();




function findSurroundingPixels(x,y,target){
    
    var x = settings.X,
    y = settings.Y;    

    
   // if(settings.tool === 'pen' || settings.tool === 'pencil'){
      
        x = parseInt(x);
        y = parseInt(y);
        
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
        
//#------------> Eye Dropper Tool
        if(settings.tool === 'eyedropper'){

            var pixel = $('.pixel[x='+x+'][y='+y+']');   
            settings.color = "#"+cvtRGBtoHex(pixel.css('backgroundColor')); 
            $('#eyedropper').css('backgroundColor',settings.color); 
            return;

        };
        
//#------------> Pencil / Burn Tool  
    
        for(var e=coord.maxY;e < coord.minY + 1; e++){
            for(var i=coord.maxX;i < coord.minX + 1; i++){
                
                var pixel = $('.pixel[x='+i+'][y='+e+']'); 
                var hitTest = intersects(i, e, x, y, (settings.brush.size/2));

                if(settings.change === true){
           
                           var color = pixel.css('backgroundColor');               
                           pixel.css('backgroundColor',convertNum(color)); 
                    
                };
               
                if(settings.change === false){
                    if((settings.tool === 'pencil') || (settings.tool === 'pen' && hitTest === true)){ 

                       pixel.css('backgroundColor',settings.color); 

                    };
                };
            };
       // };   
    };
};



//#--------------->
settings.brush.changeSize = function(size,changeSize){
    
    // We can add an if statment and make the function check each time if the 
    // tool has changed when we click it.
    
        $('#cursor').setBorderRadius(changeSize);
    
        this.size = size;
        this.remove  = Math.floor(size/2); 

        var add = (settings.brush.shape == 'square')? -1 : 0; 
        this.add  = ((this.remove)*-1)+add;
    
};

settings.brush.changeSize(5,5);
settings.tool = 'pen';
settings.color = '#23ffff';
settings.change = 'false';

//#------> Clicks

$('.tool').click(function(){
    
    var thisId = $(this).attr('id');
    settings.tool = thisId;
    
    if(thisId === 'darken'){
        settings.change = true;
    } else if (thisId === 'pencil') {
        settings.change = false;
        settings.brush.shape = 'square';
        $('#cursor').removeClass('circle').addClass('square');
        settings.offSet = 28;
    } else if (thisId === 'pen'){
        settings.brush.shape = 'circle';
        settings.change = false;
        settings.offSet = 28;
        $('#cursor').removeClass('square').addClass('circle');
    }
});

$('#cursor').click(function(t){  
    findSurroundingPixels($(this).attr('x'),$(this).attr('y'),this);
});

$('.color').click(function(){
    var thisId = $(this).attr('id');
    settings.color = thisId;
});

$('#eyedropper').click(function(){
    var thisId = $(this).attr('id');
    settings.change = false;
    settings.tool = thisId;
});

$("body").mousemove(function(e) {
    settings.X = Math.ceil((e.pageX - $('.e').offset().left)/9);
    settings.Y = Math.ceil((e.pageY - $('.e').offset().top)/9);
    
    settings.hoverCursorX = ((settings.X * 9) - settings.offSet )+'px';
    settings.hoverCursorY = ((settings.Y * 9) - settings.offSet )+'px';

    $('#cursor').stop(true,true).animate({left:settings.hoverCursorX,top:settings.hoverCursorY},500);
});