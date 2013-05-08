jQuery(document).ready(function() {
jQuery.fn.colorPicker = function() {






//Wraps the items that match the selection with the elements needed

var globalThis = $(this),
thisWidth = globalThis.width(),
thisHeight = globalThis.height();
globalThis.wrap('<div class="colorDropField"></div>');
globalThis.parent().width(thisWidth).append('<div class="colorDropIcon"></div>');
globalThis.parent().children('.colorDropIcon').height(thisHeight).width(thisHeight);







//Elements used in the color Picker

var appendElements = "";
appendElements += '<div id="colorPicker" class="CP_Wrap">';
appendElements += '<div id="colorPick">';

appendElements += '<div class="displayselection" id="lselection"></div>';
appendElements += '<div class="displayselection" id="rselection"></div>';
appendElements += '<div id="circle"></div>';
appendElements += '<div id="hueslide"></div>';
appendElements += '<canvas id="myCanvas2" width="25" height="265"></canvas>';
appendElements += '<canvas id="myCanvas3" width="256" height="256"></canvas>';

appendElements += '</div>';
appendElements += '</div>';







//Arrays used to draw the hue slider

  hue = new Array();

  var hueArray = [
    ["#ff0000"],
    ["#ff00ff"],
    ["#0000ff"],
    ["#00ffff"],
    ["#00ff00"],
    ["#ffff00"],
    ["#ff0000"]
  ];

  var changeOrder = [
    ["2", "1", "0"],
    ["0", "1", "2"],
    ["1", "0", "2"],
    ["2", "0", "1"],
    ["0", "2", "1"],
    ["1", "2", "0"]
  ];







//Creates or removes the color selection tool when the input field is clicked

globalThis.click(function(){


set = globalThis.siblings().hasClass('CP_Wrap'),
colorFetch = globalThis.val();







// If there is not already a color selection tool, continue

if(!set){

//Adds element & listener for when move off the selection area, that will remove it

$('body').prepend('<div id="wholeBODY"></div>');

$('#wholeBODY').mousemove(function(){

$('#colorPicker').remove();
var set = false;
$('#wholeBODY').remove();

});





//Adds the elements for the color selection

$(this).parent().append(appendElements);


//Variables and objects used in the plugin

  var colorBar = document.getElementById('myCanvas2');
  context2 = colorBar.getContext('2d'),
  canvas3 = document.getElementById('myCanvas3'),
  context3 = canvas3.getContext('2d'),
  imageData = "",
  match = false;






  function imgDataIndex(idx, n) {
    return("0" + imageData.data[idx + n].toString(16)).slice(-2);

  }

  function getMousePos(canvas, evt) {

      var rect = canvas.getBoundingClientRect(),
      mouseX = evt.offsetX || evt.pageX - rect.left - window.scrollX,
      mouseY = evt.offsetY || evt.pageY - rect.top - window.scrollY;

    return {
      x: mouseX,
      y: mouseY
    };
  }








//Listener for when on the hue selection tool

colorBar.addEventListener('mousedown', function(evt) {

var mousePos2 = getMousePos(colorBar, evt);
var moveup = mousePos2.y  - 10;


if(moveup < 0){
  var moveup = 0;
}

if(moveup > 244){
  var moveup = 244; 
}

$('#hueslide').css('top',moveup + "px");

    findHue(mousePos2);
    newColorSelect(hue,"hueCheck");


  }, false);




/*

Functions below are for the colorBar and selectiveArea

*/




 function selectColor(evt){

    var mousePos = getMousePos(canvas3, evt),
      idx = (mousePos.x + mousePos.y * imageData.width) * 4,
      hue = [
        [imgDataIndex(idx, 0)],
        [imgDataIndex(idx, 1)],
        [imgDataIndex(idx, 2)]
      ];
    changeBG(hue);

var moveleft = (mousePos.x  - 5) + "px",
moveup = (mousePos.y - 5) + "px";

$('#circle').css('left',moveleft).css('top',moveup);

}



canvas3.addEventListener('mousedown', function(evt) {
    
    selectColor(evt);

}, false);



/*

End Mouse Control Guides

*/


  function changeBG(hue) {

    var colorChange = hue[0] + hue[1] + hue[2];

    colorChange = {
      'backgroundColor': '#' + colorChange + ''
    };

    $('body').css(colorChange);

    globalThis.val(colorChange.backgroundColor).parent().children('.colorDropIcon').css(colorChange);
//should make this more specific if using muliple color pickers on a page
  };







//Functions for creating the hue slider

  function createColorBar() {

    context2.rect(0, 0, colorBar.width, colorBar.height);
    var grad = context2.createLinearGradient(0, 0, 0, 256);

    for(var i = 0; i < hueArray.length; i++) {

      grad.addColorStop(i / 6, hueArray[i]);

    };

    context2.fillStyle = grad;
    context2.fillRect(0, 0, 25, 256);

  };


  function hueLevel(direction, hueRange) {

    if(direction == 0) {

      var color = Math.round(hueRange).toString(16);

    } else {

      var color = Math.round((256 - hueRange)).toString(16);

    }

    return color;

  };



  function findHue(mousePos2) {

if(mousePos2.y){
    var mX = Math.round(mousePos2.y);
} else {
    var mX = Math.round(mousePos2);
}    
    if(mX < 4 || mX > 251){mX = 0};

    var stepLength = 42.6666666667,
    pos = Math.floor(mX / stepLength),

    hueRange = (mX % stepLength) * 6,
    direction = pos % 2;

    hue[changeOrder[pos][0]] = hueLevel(direction, hueRange);
    hue[changeOrder[pos][1]] = "00";
    hue[changeOrder[pos][2]] = "ff";

    return hue;

  };


  


  function newColorSelect(hue,color,check) {

    var red = parseInt(hue[0], 16),
      green = parseInt(hue[1], 16),
      blue = parseInt(hue[2], 16);

    changeLevelSelect(red, green, blue,color,check);

  };

 

function subtractLarger(u,j){

var max = Math.max(u,j),
min = Math.min(u,j);

return parseInt(max - min);

}


  function changeLevelSelect(red, green, blue, match,check) {

//This function first finds the percentage to increment each color
// value, since it is a range of 256 steps across the
//selection area, but most values, will not have that many points to increase, so it uses the percentage to increment
//the values often by values under one percent.
//
//It then uses that percentage to find it's difference from 255, which is where the color will behind in the upper
//left corner, and increment itself up to the fully qualified color in the upper right corner. The function continues
//to loop through each line, taking 1 away from 255, the starting point for the function, until it reaches 0.
//
//Eventually, when you reach the bottom the left all the way to the right are all 0's, and the number cannot increment
//itself any further so the entire bottom row is black.
//
//All of the different color values are logged inside of an array to make it accessible when rolling over the object

console.log(red,green,blue,"matchie matchie");

if(check){
      var redw = parseInt(match[0], 16),
      greenw = parseInt(match[1], 16),
      bluew = parseInt(match[2], 16);
};
//








//Used to find the position of the circle on the canvas,
//if making a new hue selection, the position of the circle
//will allow the new hue selected to be on the same
//level of saturation & lightness.

if(match == "hueCheck"){

var leftCircle = parseInt($('#circle').css('left'))+5;
var topCircle = parseInt($('#circle').css('top'))+5;

}






//Variables used in this function

    var element = document.getElementById("myCanvas3"),
    c = element.getContext("2d"),
    width = element.width,
    height = element.height,






//These variables are used to "Step" the color values when drawing the canvas,
//It moves from white to the fully saturated hue when going left to right
//and then as it goes down the canvas slowly gets darker.

    redIn = (255 - red) / 255,
    greenIn = (255 - green) / 255,
    blueIn = (255 - blue) / 255,
    dataL = 255 * 255 * 4,
    y = 0,
    x = 0,
    e = 0,
    r = 256,
    g = 256,
    b = 256,
    a = 255;

    imageData = c.createImageData(width, height);







// Begin the canvas image data loop

    for(i = 0; i < dataL; i++) {







//This correctly changes the color from being unsaturated to completely saturated
//based on the hue provided when the function is ran.

      x++
      r -= redIn,
      g -= greenIn,
      b -= blueIn;







//This darkens the colors as the imagedata moves down and fills the canvas

      if(e == width) {
        y++
        var x = e = 0,
        a = 255,
        r = 255 - y,
        b = g = r;
      }








// If when drawing the canvas, and there is a valid color in the input field,
// the function below will move the circle to the correct position

if(subtractLarger(r,redw) < 2){
if(subtractLarger(g,greenw) < 2){
if(subtractLarger(b,bluew) < 2){  

var moveleft = e + "px",
moveup = y + "px";

$('#circle').css('left',moveleft).css('top',moveup);


}
}
}






//Sets the imagedata to the correct values

          var idx = (i) * 4;
    imageData.data[idx + 0] = r;
    imageData.data[idx + 1] = g;
    imageData.data[idx + 2] = b;
    imageData.data[idx + 3] = a;






//This uses the position of the circle div on the selection area, to determine
//the new selected color, should only occur when changing the hue slider.    

if(y == topCircle && e == leftCircle){

var redExit = (imageData.data[idx + 0]).toString(16),
greenExit = (imageData.data[idx + 1]).toString(16),
blueExit = (imageData.data[idx + 2]).toString(16);

if(redExit == 0){redExit = "00"};
if(greenExit == 0){greenExit = "00"};
if(blueExit == 0){blueExit = "00"};


bgColor =[
[redExit,greenExit,blueExit]
];

changeBG(bgColor[0]);

}
      e++


  };
  
    c.putImageData(imageData, 0, 0);

  };

  createColorBar();

if(colorFetch){



var red = colorFetch.substr(1,2),
green = colorFetch.substr(3,2),
blue = colorFetch.substr(5,2),
r = parseInt(red, 16) / 255,
g = parseInt(green, 16) / 255,
b = parseInt(blue, 16) / 255;




function hueNEW(r, g, b){

    var max = Math.max(r, g, b), 
    min = Math.min(r, g, b),
    h, 
    s, 
    l = (max + min) / 2,
    d = max - min;

        switch(max){
          case min:
              h = s = 0;
              break;
            case r:
              h = (g - b) / d + (g < b ? 6 : 0); 
              break;
            case g:
              h = (b - r) / d + 2; 
              break;
            case b:
              h = (r - g) / d + 4; 
              break;
        }

    return 255 - (h * 42.5);
}


var HSL = hueNEW(r,g,b);

$('#hueslide').css('top',HSL - 10 + "px");


    findHue(HSL);


    colorFetch2 = [red,green,blue];
    newColorSelect(hue,colorFetch2,"check");
    changeBG(colorFetch2);


} else {

changeLevelSelect(0, 164, 115);

}


} else {

var replace = this;
$('#colorPicker').remove();
var set = false;

};
});
};
});