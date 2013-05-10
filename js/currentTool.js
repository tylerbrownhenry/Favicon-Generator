settings = {
  test: '',
  offSet:60,
  canvas:{  
        size: 32,
        pixelSize: 16,
  			addedOffSet: 10,
        containerOffsetLeft: false,
        containerOffsetTop: false
  },
  saved:{
        288:'',
        144:'',
        114:'',
        72:'',
        57:'',
        32:'',
        16:''
        },
  pixelSize:16,
  imageData :{},
  darken:6,
  coords:{},
  tool:'pencil',
  color:'#ffffff',
  change:false,
  coords:{
	  		x:0,
	  		y:0,
	  		w:0,
	  		h:0
	  	},
  density:.51,
  opacity:.51,
  context288 : document.getElementById('myCanvas288').getContext('2d'),
  context144 : document.getElementById('myCanvas144').getContext('2d'),
  context114 : document.getElementById('myCanvas114').getContext('2d'),
  context72 : document.getElementById('myCanvas72').getContext('2d'),
  context57 : document.getElementById('myCanvas57').getContext('2d'),
  context32 : document.getElementById('myCanvas32').getContext('2d'),
  context16 : document.getElementById('myCanvas16').getContext('2d'),
  brush: {
          size:4,
          shape:'square',
          darken: {
                  que:0
                  },
          hardness:1
          }
};




$('canvas').click(function (){

  settings.canvas.changeSize($(this).attr('sz'));

});




settings.changeColor = (function(c){

  settings.color = c;
  return settings.color;    

});




settings.useTool = (function(c){

  if(settings.tool === 'eyedropper'){

    eyeDropThis(target);

  } else {

    useCurrentTool();

  };

});







settings.canvas.changeSize = function(size){

	settings.canvas.size = size;
  settings.canvas.pixelSize = 512 / parseInt(size);
  settings.canvas.containerOffsetLeft = $('.jcrop-holder').offset().left;
  settings.canvas.containerOffsetTop = $('.jcrop-holder').offset().top;



		switch (parseInt(settings.canvas.size))
	{
	case 16:
	  settings.canvas.addedOffSet = 97;
	  break;
	case 32:
	  settings.canvas.addedOffSet = 49;
	  break;
	case 57:
	  settings.canvas.addedOffSet = 10;
	  break;
	case 72:
	  settings.canvas.addedOffSet = 10;
	  break;
	case 114:
	  settings.canvas.addedOffSet = 10;
	  break;
	case 144:
	  settings.canvas.addedOffSet = 10;
	  break;
	case 288:
	  settings.canvas.addedOffSet = 10;
	  break;
	};

setupDrawingArea(settings.imageData['_'+size].data);
settings.brush.changeSize(settings.brush.size);
};






settings.brush.changeSize = function(size){
    // We can add an if statment and make the function check each time if the 
    // tool has changed when we click it.
    var size = parseInt(size);
    settings.brush.size = size;

    $('#cursor').setBorderRadius(size * settings.canvas.pixelSize);
    
    if(settings.brush.shape === 'circle'){

        var add = 0;

            console.log(settings.canvas.size);
            if(parseInt(settings.canvas.size) == 16){
              var aLittleSpice = 13;
            } else {
             var  aLittleSpice = 2;
            }
            settings.offSet = ((size * settings.canvas.pixelSize)/2) + ((settings.canvas.size / 4)+aLittleSpice);
 

       //perfect for 32
       //  settings.offSet = ((size * settings.pixelSize)/2) + 113; // 113 (really close) 16size * 12brush
              // settings.offSet = ((size * settings.pixelSize)/2) + 98; // 98 (really close) 16size * 10brush
               //  settings.offSet = (settings.canvas.pixelSize / 2 * size);
    } else {

        var add = ((size % 2) === 1)? 0 : 1; // Even & Odd Numbers Need to be Treated Differently
        settings.offSet = (size % 2 === 1)? (((size+1) * settings.canvas.pixelSize)/2) + 1 : ((size * settings.canvas.pixelSize)/2) + 1;
        settings.offSet = (size === 1)? settings.addedOffSet : settings.offSet;

    };

    this.remove  = Math.floor(size/2); 
    this.add  = ((this.remove)*-1)+add;
    
};


settings.brush.changeSize2 = function(size){
    // We can add an if statment and make the function check each time if the 
    // tool has changed when we click it.
    var size = parseInt(size);
    settings.brush.size = size;

    var day=new Date().getDay();


    $('#cursor').setBorderRadius(size * settings.pixelSize);
    
    if(settings.brush.shape === 'circle'){

      var add = 0;
      settings.offSet = ((size * settings.pixelSize)/2) + settings.canvas.addedOffSet;

    } else {

        var add = ((size % 2) === 1)? 0 : 1; // Even & Odd Numbers Need to be Treated Differently
        settings.offSet = (size % 2 === 1)? (((size+1) * settings.pixelSize)/2) + 1 : ((size * settings.pixelSize)/2) + 1;
        settings.offSet = (size === 1)? settings.addedOffSet : settings.offSet;

    };

    this.remove  = Math.floor(size/2); 
    this.add  = ((this.remove)*-1)+add;
    
};



function useCurrentTool(target){

    var x = settings.X,
    y = settings.Y;    
   
//#------------> Finds the pixels that will be affected by the brush
    var coord = [];
    coord.maxX = parseInt(x+settings.brush.add);
    coord.minX = parseInt(x+settings.brush.remove);
    
    coord.minY = parseInt(y+settings.brush.remove);
    coord.maxY = parseInt(y+settings.brush.add);
    
    for (var key in coord) {

       var obj = coord[key];
       if(obj < 1){ coord[key] = 1;};
       if(obj > settings.canvas.size){ coord[key] = settings.canvas.size;};

    };
        
//#------------> Drawing Tools
//

  var changingArray = [];

  for(var e=coord.maxY;e < coord.minY + 1; e++){
    for(var i=coord.maxX;i < coord.minX + 1; i++){

      var blurLevel = 'notSet';
      var test = false;
      var max = Math.max(e,i);

      if( max > 32 || max < 1 ){

          var hitTest = false;

      } else if(settings.tool !== 'pen'){

          var hitTest = true;

      } else {

          var hitTest = brushDabRadius(i, e, x, y, (settings.brush.size/2));

      };

        //blurLevel = ohButHowBlurry(i,e,x,y); To be continued...

      //To be continued...
      // if(settings.change === true && hitTest === true){
        // var color = pixel.css('backgroundColor');               
        // pixel.css('backgroundColor',convertNum(color)).attr('name',blurLevel);
      //};
 
      if(settings.change === false && hitTest === true){
        if((settings.tool === 'pencil') || (settings.tool === 'pen')){    

         // $('.pixel[x='+i+'][y='+e+']').css('backgroundColor',settings.color);
          changingArray.push({x:i,y:e});

        };
      };

    };
  };

  updateCanvas(changingArray,settings.color);

};








function updateCanvas(pixels,color){

      var thisSize = settings.canvas.size;
      var ctx = settings['context'+thisSize];
      var myData = ctx.getImageData(0,0,thisSize,thisSize);
      var newColor = convertToArray(color);

      for (var i = 0; i < pixels.length; i++) {

        $('.pixel[x='+pixels[i].x+'][y='+pixels[i].y+']').css('backgroundColor',settings.color);

        var thisPixel = parseInt((((pixels[i].y -1) * thisSize) + (pixels[i].x-1)) * 4);

        myData.data[thisPixel] = parseInt(newColor[0],16);
        myData.data[thisPixel+1] = parseInt(newColor[1],16);
        myData.data[thisPixel+2] = parseInt(newColor[2],16);
        myData.data[thisPixel+3] = 255; // NO ALPHA FOR NOW
      
      };

      ctx.putImageData(myData, 0, 0);

    //Caches the Array so that can use it later.

    var imageData = ctx.getImageData(0, 0, thisSize,thisSize);
    var canvasPixelArray = imageData.data;
    var canvasPixellen = canvasPixelArray.length;
    var byteArray = new Uint32Array(canvasPixellen);

    for (var i = 0 ; i < canvasPixellen; ++i) {

        byteArray[i] = canvasPixelArray[i];

    };

     settings.saved[thisSize] = byteArray;

 }; 