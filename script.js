window.addEventListener('load', () => {
let coef = 2 
let colid 
function canvasSupport () {
  return Modernizr.canvas 
}
  
  if (!canvasSupport()) {
    return 
  } else {
    var theCanvas = document.getElementById('canvas') 
    var context = theCanvas.getContext('2d')   
  }
  

var graph_in_progress = "no"
   
var submit_button = document.getElementById("submit") 
submit_button.addEventListener('click', submitPressed, false) 

var reset_grid_button = document.getElementById("reset_grid") 
reset_grid_button.addEventListener('click', reset_grid_buttonPressed, false) 

var numin = document.getElementById("numin") 
numin.addEventListener('change', () => {
    coef = Math.round(numin.value) 
})

var col = document.getElementById("col") 
col.addEventListener('change', () => {
    console.log(col.value)
    colid = col.value
})

    status_message = document.getElementById("status_message") 
    drawGrid() 
  function drawGrid() {
    
    var i = 0 
    axis_pos = 1 
    can_width = theCanvas.width  
    

    for (i=0;  i<=can_width;  i+=(can_width)/8)
      {
        if (i == (can_width)/2) 
          {
            context.lineWidth = 3  
            context.strokeStyle = 'red'  
          }
        else
          {
            context.lineWidth = 1 
            context.strokeStyle = 'black' 
          }
        // |
        context.beginPath() 
        context.moveTo(i, 0) 
        context.lineTo(i, can_width) 
        context.stroke() 
        context.closePath() 
        // --
        context.beginPath() 
        context.moveTo(0, i) 
        context.lineTo(can_width, i) 
        context.stroke() 
        context.closePath() 
      }
   
    context.font         = '20px _sans' 
    context.textBaseline = 'top' 
   
    context.translate(can_width / 2, can_width / 2) 
    for (i=-3; i<=3; i++) {
      if (i != 0) { // Skip labeling origin
      // horizontal label
      context.fillText  (i, i*(can_width/8) + 5, 5) 
      // vertical label
      context.fillText  (i, 5, -i*(can_width/8)) 
      }
    }
    
    context.font = 'italic bold 20px _sans' 
    context.fillText ("x", (can_width/2)-12, 1) 
    context.fillText ("y", 4, -(can_width/2)) 
  }
  
  function submitPressed(e) {
    draw_grid_line(coef, colid) 
  }
  
  
  function draw_grid_line (coef, colid) {
    if (graph_in_progress == "yes") {
      alert("სანამ სხვა გრაფა იხაზება უნდა დაიცადო") 
    } else {
      init_x = -(theCanvas.width)/2 
      init_y = -(init_x) * coef // y = mx
      new_x = init_x 
      new_y = init_y 
      var drawLineIntervalId = 0 
      status_message.innerHTML = "იხაზება გრაფა: y = " + coef + "x" 
      graph_in_progress = "yes" 
      drawLineIntervalId = setInterval(do_animation, 33) 
    }
    
    function do_animation () {
      context.lineWidth = 6 
      context.strokeStyle = colid 
      context.beginPath() 
      context.moveTo(init_x, init_y) 
      context.lineTo(new_x, new_y) 
      context.stroke() 
      context.closePath() 
      new_x = new_x + 5
      new_y = -(new_x) * coef
      context.lineTo(new_x, new_y)
      if (new_x == theCanvas.width + 5) {
        clearInterval(drawLineIntervalId)  
        graph_in_progress = "no" 
        status_message.innerHTML = ""
      }
    }
  }
  
  function reset_grid_buttonPressed(e) {
    theCanvas.width = theCanvas.width  
    drawGrid()
}
}) 