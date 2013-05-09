var holder = document.getElementById('holder'),
    state = document.getElementById('status');

if (typeof window.FileReader === 'undefined') {

  state.className = 'fail';

} else {

  state.className = 'success';
  state.innerHTML = 'File API & FileReader available';

}

$(function() {

  dataArray = [];

  holder.ondragover = function () { this.className = 'hover'; return false; };

  holder.ondragend = function () { this.className = ''; return false; };

  holder.ondrop = function (e) {

    this.className = '';
    e.preventDefault();

    var file = e.dataTransfer.files[0],
        reader = new FileReader();

    $('.jcrop-tracker').onload = function(e){

    };

    reader.onload = function (event) {
   
    $('#target').attr('src',event.target.result).unwrap('#holder');
    $('.jcrop-preview').attr('src',event.target.result);

       $('#target').Jcrop({

              onChange: updatePreview,
              onSelect: updatePreview,
              aspectRatio: xsize / ysize

      },function(){

              // Use the API to get the real image size
              var bounds = this.getBounds();
              boundx = bounds[0];
              boundy = bounds[1];

              // Store the API in the jcrop_api variable
              jcrop_api = this;

              // Move the preview into the jcrop container for css positioning
              $preview.appendTo(jcrop_api.ui.holder);

                $('.jcrop-tracker').dblclick(function(){

                  $('.jcrop-holder').css('width',512).css('height',512).children().not('#preview-pane').fadeOut(1000);
                  $('#preview-pane').animate({right:'-65'},1000);
                  setupDrawingArea(dataArray.data);

                });
      });

    };

    reader.readAsDataURL(file);

    return false;
};

    // Create variables (in this scope) to hold the API and image size
    var jcrop_api,
        boundx,
        boundy,

        // Grab some information about the preview pane
        $preview = $('#preview-pane'),
        $pcnt = $('#preview-pane .preview-container'),
        $pimg = $('#preview-pane .preview-container img'),

        xsize = $pcnt.width(),
        ysize = $pcnt.height();
    

    function updatePreview(c)
    {
      if (parseInt(c.w) > 0)
      {

        settings.coords.x = c.x;
        settings.coords.y = c.y;
        settings.coords.w = c.w;
        settings.coords.h = c.h;

        var rx = xsize / c.w;
        var ry = ysize / c.h;

        $pimg.css({

          width: Math.round(rx * boundx) + 'px',
          height: Math.round(ry * boundy) + 'px',
          marginLeft: '-' + Math.round(rx * c.x) + 'px',
          marginTop: '-' + Math.round(ry * c.y) + 'px'

        });
      }

      imageObj = new Image();

      imageObj.onload = (function() {
        drawThisImage();
        imageObj.onload = '';
      });

      imageObj.src = $('#preview-pane .preview-container img').attr('src');

    };

});




      function drawThisImage(){

        var sourceX = settings.coords.x;
        var sourceY = settings.coords.y;
        var sourceWidth = settings.coords.w;
        var sourceHeight = settings.coords.h;

        if(sourceHeight < 288){

          $('.warningText').text('I would recommend cropping your image to at least 288 pixels width to avoid loosing quality.  You are currently at '+sourceHeight+' x '+sourceWidth+'.');
       
        } else{

          $('.warningText').text("That's a good size. :)");

        };

        var destWidth = 288;
        var destHeight = 288;
        // var destX = canvas.width / 2 - destWidth / 2;
        // var destY = canvas.height / 2 - destHeight / 2;
        var destX = 0;
        var destY = 0;

        var canvas288 = document.getElementById('myCanvas288'),
        canvas144 = document.getElementById('myCanvas144'),
        canvas114= document.getElementById('myCanvas114'),
        canvas72 = document.getElementById('myCanvas72'),
        canvas57 = document.getElementById('myCanvas57'),
        canvas32 = document.getElementById('myCanvas32'),
        canvas16 = document.getElementById('myCanvas16'),

        context288 = canvas288.getContext('2d'),
        context144 = canvas144.getContext('2d'),
        context114 = canvas114.getContext('2d'),
        context72 = canvas72.getContext('2d'),
        context57 = canvas57.getContext('2d'),
        context32 = canvas32.getContext('2d'),
        context16 = canvas16.getContext('2d');

       // context288.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, 288, 288);
        context288.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, 288, 288);
        context144.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, 144, 144);
        context114.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, 114, 114);
        context72.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, 72, 72);
        context57.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, 57, 57);
        context32.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, 32, 32);
        context16.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, 16, 16);

        settings.imageData._288 = context288.getImageData(0, 0, 288, 288);
        settings.imageData._144 = context144.getImageData(0, 0, 144, 144);
        settings.imageData._114 = context114.getImageData(0, 0, 114, 114);
        settings.imageData._72 = context72.getImageData(0, 0, 72, 72);
        settings.imageData._57 = context57.getImageData(0, 0, 57, 57);
        settings.imageData._32 = context32.getImageData(0, 0, 32, 32);
        settings.imageData._16 = context16.getImageData(0, 0, 16, 16);

        settings.imageData.__288 = settings.imageData._288.data;
        settings.imageData.__144 = settings.imageData._144.data;

        settings.imageData.__114 = settings.imageData._114.data; 
        settings.imageData.__72 = settings.imageData._72.data;
        settings.imageData.__57 = settings.imageData._57.data;
        settings.imageData.__32 = settings.imageData._32.data;
        settings.imageData.__16 = settings.imageData._16.data;


        settings.imageObj = imageObj;

        dataArray = settings.imageData._32;

        
      };

function setupDrawingArea(data){

    appendToDivs = '';
    
    for(var i=0,c=1,r=1,e=1,sZ = settings.canvas.pixelSize,len=data.length,rowLen = (parseInt(settings.canvas.size) + 1);e < len * 4;e+=4){
       
        if(c == rowLen) {

            c=1;
            r++

        };

        appendToDivs += '<div x='+c+' y='+r+' class="pixel" style="background: rgba('+data[i++]+', '+data[i++]+', '+data[i++]+', '+data[i++]+');  width:'+sZ+'px; height:'+sZ+'px" ></div>';
        c++

    };
    
  $('.jcrop-holder').html('<div id="cursor" class="square"></div>'+appendToDivs);

  $("#cursor").on("click", (function() {

    settings.useTool(this);

  }));

};