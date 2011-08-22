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
image: "wheel.jpg",
rotation:0
});

function stopspin(){
canvas.timeline.stop();
}

var spinbtn = canvas.display.rectangle({
x:500,
y:400,
width:100,
height:50,
fill: "#343",
});
var stopbtntext=canvas.display.text({
x: spinbtn.width/2,
y: spinbtn.height/2,
origin: {x:"center", y:"center"},
font: "bold 15px sans-serif",
text:"Stop",
fill: "#0aa",
});


spinbtn.bind("click tap",stopspin());
spinbtn.addChild(stopbtntext);
canvas.addChild(spinbtn);



canvas.setLoop(function(){
circ.rotation+=5;
}).start();

canvas.addChild(rect);
canvas.addChild(circ);
