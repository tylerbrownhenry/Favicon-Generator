
$(function() {

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

// settings.brush.darkenAmount = (function(n){
//     settings.darken = n * settings.brush.darken.que;
//     return settings.darken;    
// });


function averageOfColors(color1,color1){

function calc(x,y){
var average=((x+y)/2).toFixed(2)
alert(average)
}
onload=function(){calc(8,7)}
};


settings.tool = true;

function cvtRGBtoHex(color,newDepth){
  //console.log(settings.brush.opacity[0]);


    if(color.indexOf('rgb') !== -1){
        var tempColor = color.substring((color.indexOf('(')+1),color.indexOf(')')).split(',');
        var color = '';
        for(i=0;i !== 3; i ++){
        var add = (typeof newDepth != 'undefined')? settings.brush.opacity[newDepth] : 0;
        console.log(add,'add');
           tempColor[i] = (parseInt(tempColor[i]-add)).toString(16);
            
            if(tempColor[i].length == 1){ 
                tempColor[i] = '0' + tempColor[i];
            };
           color += ''+tempColor[i];
        };  
    };
    return color;
};

//#-------->
function intersects(x, y, cx, cy, r, returnVal) {
    var dx = x-cx
    var dy = y-cy
    if(typeof returnVal == 'undefined'){
      //console.log((dx*dx+dy*dy),(r*r));
    return dx*dx+dy*dy <= r*r //true/false    
    } else {
      return dx*dx+dy*dy;
    }

   // return dx*dx+dy*dy+'|'+r*r; // gives the numbers compared
    //can find some 'fuzzy' math to round the corners?
}
//#-------->





//#-------------> darken / lighten colors
var convertNum = (function convertNum(color,currentColor,newDepth){
    
    //settings.brush.darken.que++
 //console.log(settings.brush.darken.que,'que');
        //console.log(color,currentColor,newDepth);
    //console.log(color,'line74',color.indexOf('#'));
    if(color.indexOf('#') !== -1){
        color = color.substring(1,color.length);
    };
   // console.log(color,'line78');
    
    var change = settings.darken;
    color = cvtRGBtoHex(color);
    if(typeof currentColor != 'undefined'){

      var lesser = cvtRGBtoHex(color,newDepth);
      console.log('left off here');
    };
            console.log(color,currentColor,newDepth);      
    var color = color.split("");
    darkenColor = new Array();
   // console.log('color converted',color);
    
    for(var i=5; color.length > 1;i--){
        ////num = (parseInt(color.shift(),16)*16)+(parseInt(color.shift(),16));
        var num = '';
        var num = ((parseInt(color.shift(),16)*16)+(parseInt(color.shift(),16)) - change).toString(16);  
       // (num - change).toString(16)
      //  console.log(num,'line86');
      //  console.log(num,parseInt(num).toString(16),num.length,'line87');
   if(num.indexOf('-') !== -1){
        num = '00';
      // console.log('zeroooo');
    }; 
        
        num = (num.length == 1)? 0 + num : num;
        //num = (num.toString(16))? '00' : num;
        //brush = {size:6,shape:'square'};
       // var test =  num.toString(16)
       // num = (!isNaN(test))? '00' : num;
      //  console.log(num,num.toString(16),num.length,'line90');
        darkenColor.push(num);
    };
   // console.log(darkenColor,'line93',settings.brush.darken.que);
    //settings.brush.darken.que = 0;
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
    
    $('.e').html('<div id="cursor" class="circle"></div>'+appendToDivs);
};




createDivs();




function findSurroundingPixels(target){
    
    var x = parseInt(settings.X),
    y = parseInt(settings.Y);    
        
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
         //console.log(x,'x',y,'y',settings.brush.size,'bs',coord.maxX,'maxX',coord.maxY,'maxY',coord.minX,'minX',coord.minY,'minY'); 
        
        
//#------------> Pencil / Burn Tool  
    
        for(var e=coord.maxY;e < coord.minY + 1; e++){
            for(var i=coord.maxX;i < coord.minX + 1; i++){

              // console.log(x,'|',i,'|');
              // console.log(x/coord.maxX);
              
              //console.log((intersects(i, e, x, y, (settings.brush.size/2),true)),(intersects(i, e, x, y, (settings.brush.size/2))));
              //console.log(settings.brush.size,'brush size');
              
              //console.log(perc);
              
        if(100000000 < 1){
          // This could be an outline feature
          // 
          // stroke = 1;
          var perc = (intersects(i, e, x, y, (settings.brush.size/2),true));
          perc = ((settings.brush.size/2)*(settings.brush.size/2)) / perc;

        var test = intersects(i, e, x, y, (settings.brush.size/2)-stroke);

            if(test){
                var opacityLevel = 1;// ould be stroke color rather than opacity....
              } else {
                var opacityLevel = 0;// could be stroke color rather than opacity....
              }
            }


var blurLevel = 'notSet';
var test = false;

for (var g = 0; g < 10; g++) {
  test = intersects(i, e, x, y, (settings.brush.size/2)-g);
  // var blurLevel = test;
  if(test){
    blurLevel = g;
    console.log(blurLevel,g);
  };

};




              //settings.brush.hardness
                
                var pixel = $('.pixel[x='+i+'][y='+e+']'); 
                var hitTest = intersects(i, e, x, y, (settings.brush.size/2));
                if(settings.change === true){
           
                           var color = pixel.css('backgroundColor');               
                           pixel.css('backgroundColor',convertNum(color)); 
                    
                };
               
                if(settings.change === false){
                if((settings.tool === 'pencil') || (settings.tool === 'pen' && hitTest === true)){     if(blurLevel < settings.brush.hardness){
                      // var color = pixel.css('backgroundColor');  
                      // pass in the color, and combine in with the current pixel's color
                      // based on the blurLevel
                       var color = pixel.css('backgroundColor');
                       pixel.css('backgroundColor',convertNum(settings.color,color,blurLevel)).attr('name',blurLevel);
                      } else {
                       pixel.css('backgroundColor',settings.color);

                   };
                       // pixel.css('opacity',opacityLevel); could be stroke color rather than opacity....
                    };
                };
            };
       // };   
    };
};



//#--------------->
settings.brush.changeSize = function(size){
    
    // We can add an if statment and make the function check each time if the 
    // tool has changed when we click it.
  var size = parseInt(size);
    settings.brush.size = size;

    $('#cursor').setBorderRadius(size * 9);
    
    if(settings.brush.shape === 'circle'){
    var add = 0;
    settings.offSet = ((size * settings.pixelSize)/2) + 6;
    } else {
        var add = ((size % 2) === 1)? 0 : 1;
        settings.offSet = (size % 2 === 1)? (((size+1) * settings.pixelSize)/2) + 1 : ((size * settings.pixelSize)/2) + 1;
        settings.offSet = (size === 1)? 10 : settings.offSet;
    };

    this.remove  = Math.floor(size/2); 
    this.add  = ((this.remove)*-1)+add;
    
};

jQuery.fn.setBorderRadius = function(size) {
    var rSize = size;
    if(settings.brush.shape === 'square'){ rSize = 0};
        var borderRadiusObj = {
            '-moz-border-radius': rSize+'px',
            '-webkit-border-radius': rSize+'px',
            'border-radius': rSize+'px'
        }
    return (this).css(borderRadiusObj).css('width',size).css('height',size);
};

settings.brush.changeSize(14);
settings.tool = 'pen';
settings.brush.shape = 'circle';
settings.color = '#23ffff';
settings.change = false;
settings.brush.hardness = 1;
settings.brush.opacity = {0:10,1:20};

// 0 is hard, 1, 2,... softer
//#------> Changes
//
$('.brushSize').change(function() {
  settings.brush.changeSize(parseInt($(this).val()));
});

$('.hardness').change(function() {
  console.log($(this).val());
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
    }
    settings.brush.changeSize($('.brushSize').val());
});

$('#cursor').click(function(t){  
    findSurroundingPixels(this);
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

});








    //#------->

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    var open = getUrlVars()["open"]
    var reRun = getUrlVars()["testNumber"];

    if(!open && !reRun){
      $('#qunit').hide(); 
    }

    $('#x').click(function(){

      if($('#qunit').hasClass('open')){
         $('#qunit').slideDown().removeClass('open');
         return;
      }

      $('#qunit').slideUp().addClass('open');

    })






  QUnit.log = function(result, message) {
    if (window.console && window.console.log) {
      window.console.log(result +' :: '+ message);
    }   
  }

console.log('okay');

// test( "deepEqual test", function() {
//   var obj = { foo: "bar" };
 
//   deepEqual( obj, { foo: "bar" }, "Two objects can be the same in value" );
// });






// test( "notDeepEqual test", function() {
//   var obj = { foo: "bar" };
//   notDeepEqual( obj, { foo: "bla" }, "Different object, same key, different value, not equal" );
// });






// test( "ok test", function() {
//   ok( true, "true succeeds" );
//   ok( "non-empty", "non-empty string succeeds" );
 
//   ok( false, "false fails" );
//   ok( 0, "0 fails" );
//   ok( NaN, "NaN fails" );
//   ok( "", "empty string fails" );
//   ok( null, "null fails" );
//   ok( undefined, "undefined fails" );
// });






// test( "throws", function() {
 
//   function CustomError( message ) {
//     this.message = message;
//   }
 
//   CustomError.prototype.toString = function() {
//     return this.message;
//   };
 
//   throws(
//     function() {
//       throw "error"
//     },
//     "throws with just a message, no expected"
//   );
 
//   throws(
//     function() {
//       throw new CustomError();
//     },
//     CustomError,
//     "raised error is an instance of CustomError"
//   );
 
//   throws(
//     function() {
//       throw new CustomError("some error description");
//     },
//     /description/,
//     "raised error message contains 'description'"
//   );
// });





// test( "a test", function() {
//   stop();
//   asyncOp();
//   setTimeout(function() {
//     equals( asyncOp.result, "someExpectedValue" );
//     start();
//   }, 150 );
// });




// test( "a test", 2, function() {
 
//   function calc( x, operation ) {
//     return operation( x );
//   }
 
//   var result = calc( 2, function( x ) {
//     ok( true, "calc() calls operation function" );
//     return x * x;
//   });
 
//   equal( result, 4, "2 square equals 4" );
// });




// asyncTest( "asynchronous test: one second later!", function() {
//   expect( 1 );
//   setTimeout(function() {
//     ok( true, "Passed and ready to resume!" );
//     start();
//   }, 1000);
// });







// test( "a test", function() {
//   notStrictEqual( 1, "1", "String '1' and number 1 don't have the same value" );
// });







// test( "strictEqual test", function() {
//   strictEqual( 1, 1, "1 and 1 are the same value and type" );
// });







// test( "equal test", function() {
//   equal( 0, 0, "Zero; equal succeeds" );
//   equal( "", 0, "Empty, Zero; equal succeeds" );
//   equal( "", "", "Empty, Empty; equal succeeds" );
//   equal( 0, 0, "Zero, Zero; equal succeeds" );
//   equal( "three", 3, "Three, 3; equal fails" );
//   equal( null, false, "null, false; equal fails" );
// });






//     module("Basic Unit Test");
//     test("Sample test", function() {
//       expect(1);
//       equal(divide(4,2),2, 'Expected 2 as the result, result was ' + 
//       divide(4,2));
//     });
//     test("Test two", function() {
//       expect(1);
//       equal(divide(8,2),2,'Expected 4 as the result, result was ' + 
//         divide(8,2));
//     });

//     module("Basic Unit Test 2");

//     test("Test two", function() {
//       expect(1);
//       equal(divide(8,2),2,'Expected 4 as the result, result was ' + 
//         divide(8,2));
//     });


//     test("Test two", function() {
//       expect(1);
//       equal(divide(8,2),2,'Expected 4 as the result, result was ' + 
//         divide(8,2));
//     });


//     test("Test two", function() {
//       expect(1);
//       equal(divide(8,2),2,'Expected 4 as the result, result was ' + 
//         divide(8,2));
//     });


//     test("Test two", function() {

// expect(1000000);
//       for (var i = 0; i < 1000000; i++) {
//         equal(divide(8,2),2,'Expected 4 as the result, result was ' +  divide(8,2));
//       };

      
      
//     });
//     module("Basic Unit Test 2");
 
    function divide(a,b){
      return a / b;
    }


function startPolling()
{
    var handle = window.setInterval(function(){

        var element = $(".failed");
        var total = element.html();
        if (total) {
            
            $('#x').append('<div id="fails">'+total+'</div>');
            window.clearInterval(handle);
        }

    }, 100);
}

startPolling();


  });