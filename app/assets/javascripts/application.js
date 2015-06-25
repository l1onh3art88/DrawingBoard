// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .




var lastEvent;
$(document).ready(function(){
  var color = $(".selected").css("background-color");
  var $canvas = $("#canvas");
  var context = $canvas[0].getContext("2d"); 
  var mouseDown = false;
  // When click on Color
  $(".controls").on("click", "li", function(){
    //Deselect sibling elements
    $(this).siblings().removeClass("selected");
    //Select clicked element
    $(this).addClass("selected");
    //cache current color
    color = $(this).css("background-color");
  });
  // reveals new color sliders
  $("#revealColorSelect").click(function(){
    changeColor();
    $("#colorSelect").toggle();    
  })
  //Change Color
  function changeColor(){
    var r = $("#red").val();
    var b = $("#blue").val();
    var g = $("#green").val();
    $("#newColor").css("background-color", "rgb(" + r + "," + g+ ", " + b+ ")");
  }
  //sliders change values with color
  $("input[type=range]").change(changeColor).mousemove(changeColor);
  // When "Add Color" is pressed
  $("#addNewColor").click(function(){
    var $newColor = $("<li></li>");
    $newColor.css("background-color", $("#newColor").css("background-color"));
    $(".controls ul").append($newColor);
    $newColor.click();
  });
  //Draw Lines
  // When MouseDown Draw
    $canvas.mousedown(function(e){
      lastEvent = e;
      mouseDown = true;
      // Mouse Move
    }).mousemove(function(e){
      if(mouseDown){
      context.beginPath();
      context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
      context.strokeStyle = color;
      //Size
      var linewidth = $("#size").val();
      context.lineWidth = linewidth;
      lastEvent = e;
      }
       // Mouse Release
    }).mouseup(function(){
      mouseDown = false;
    }).mouseleave(function(){
      $canvas.mouseup();
    });
 
    
    
   //Clear Canvas
  $("#clear").click(function(){
    context.clearRect(0,0, 800, 600);
  });

  
})