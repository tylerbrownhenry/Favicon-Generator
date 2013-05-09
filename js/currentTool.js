//#-------------->

settings = {
  offSet:60,
  canvas:{  size: 32,
			addedOffSet: 10
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

settings.canvas.changeSize = function(size){

	settings.canvas.size = size;

		switch (settings.canvas.size)
	{
	case 16:
	  settings.canvas.addedOffSet = 6;
	  break;
	case 32:
	  settings.canvas.addedOffSet = 10;
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
};

settings.brush.changeSize = function(size){
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
  for(var e=coord.maxY;e < coord.minY + 1; e++){
    for(var i=coord.maxX;i < coord.minX + 1; i++){

      var blurLevel = 'notSet';
      var test = false;
        
      var pixel = $('.pixel[x='+i+'][y='+e+']'); 


      if(settings.tool !== 'pen'){

        var hitTest = true;

      } else {

        var hitTest = brushDabRadius(i, e, x, y, (settings.brush.size/2));
        //blurLevel = ohButHowBlurry(i,e,x,y); To be continued...

      };

      //To be continued...
      // if(settings.change === true && hitTest === true){
        // var color = pixel.css('backgroundColor');               
        // pixel.css('backgroundColor',convertNum(color)).attr('name',blurLevel);
      //};
 
      if(settings.change === false && hitTest === true){
        if((settings.tool === 'pencil') || (settings.tool === 'pen')){    

          pixel.css('backgroundColor',settings.color);
          //Maybe make this loop through all of the canvas?

        };
      };

	drawThisImage();

    };
  };
  updateCanvas(32);
};