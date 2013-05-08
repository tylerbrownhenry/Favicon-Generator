

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

function setupDrawingArea(data){



    appendToDivs = '';
    
    for(i=0,c=1,r=1,e=1;e < data.length;e+=4){
       
        if(c == 33){

            c=1;
            r++

        };

        appendToDivs += '<div x='+c+'  y='+r+' class="pixel" style="background: rgba('+data[i++]+', '+data[i++]+', '+data[i++]+', '+data[i++]+'); "></div>';
        c++

    };
    
    $('.jcrop-holder').html('<div id="cursor" class="square"></div>'+appendToDivs);


    $("#cursor").on("click", (function() {
        useCurrentTool(this);
    }));

}

  holder.ondragover = function () { this.className = 'hover'; return false; };
  holder.ondragend = function () { this.className = ''; return false; };
  holder.ondrop = function (e) {
    console.log(e);


  this.className = '';
  e.preventDefault();

  var file = e.dataTransfer.files[0],
      reader = new FileReader();






  function updateCoords(c){
    $('#x').val(c.x);
    $('#y').val(c.y);
    $('#w').val(c.w);
    $('#h').val(c.h);
  };

        $('.jcrop-tracker').onload = function(e){
            console.log('tracker loaded');
        };

  reader.onload = function (event) {
 
    // holder.style.background = 'url(' + event.target.result + ') no-repeat center';
    $('#target').attr('src',event.target.result).unwrap('#holder');
   $('.jcrop-preview').attr('src',event.target.result);
    // $('#src').val(event.target.result);
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
                    console.log(dataArray);
                    // setupDrawingArea(dataArray.data);

              });
    });

  };

  reader.readAsDataURL(file);
    console.log(file,reader);

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
        var rx = xsize / c.w;
        var ry = ysize / c.h;

        $pimg.css({
          width: Math.round(rx * boundx) + 'px',
          height: Math.round(ry * boundy) + 'px',
          marginLeft: '-' + Math.round(rx * c.x) + 'px',
          marginTop: '-' + Math.round(ry * c.y) + 'px'
        });
      }

      var canvas288 = document.getElementById('myCanvas288');
      var canvas144 = document.getElementById('myCanvas144');
      var canvas114= document.getElementById('myCanvas114');
      var canvas72 = document.getElementById('myCanvas72');
      var canvas57 = document.getElementById('myCanvas57');
      var canvas32 = document.getElementById('myCanvas32');
      var canvas16 = document.getElementById('myCanvas16');

      var context288 = canvas288.getContext('2d');
      var context144 = canvas144.getContext('2d');
      var context114 = canvas114.getContext('2d');
      var context72 = canvas72.getContext('2d');
      var context57 = canvas57.getContext('2d');
      var context32 = canvas32.getContext('2d');
      var context16 = canvas16.getContext('2d');


      var imageObj = new Image();

      imageObj.onload = function() {

        // draw cropped image
        var sourceX = c.x;
        var sourceY = c.y;
        var sourceWidth = c.w;
        var sourceHeight = c.h;
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


        context288.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, 288, 288);
        context288.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, 288, 288);
        context144.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, 144, 144);
        context114.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, 114, 114);
        context72.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, 72, 72);
        context57.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, 57, 57);
        context32.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, 32, 32);
        context16.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, 16, 16);

        imageData288 = context288.getImageData(0, 0, 288, 288);
        imageData144 = context144.getImageData(0, 0, 144, 144);
        imageData114 = context114.getImageData(0, 0, 114, 114);
        imageData72 = context72.getImageData(0, 0, 72, 72);
        imageData57 = context57.getImageData(0, 0, 57, 57);
        imageData32 = context32.getImageData(0, 0, 32, 32);
        imageData16 = context16.getImageData(0, 0, 16, 16);

        
        dataArray = imageData32;
        setupDrawingArea(dataArray.data);
        
      };

      imageObj.src = $('#preview-pane .preview-container img').attr('src');




    };

});
