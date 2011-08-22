var canvas= oCanvas.create({
canvas: "#canvas",
fps:60
});


var rect =canvas.display.rectangle({
x:0,
y:0,
width:canvas.width,
height:canvas.height,
stroke: "10px #239"
});

var circ=canvas.display.image({
x:250,
y:canvas.height/2,
origin: {x:"center",y:"center"},
image: "wheel.jpg"
});

set 
canvas.addChild(rect);
canvas.addChild(circ);
