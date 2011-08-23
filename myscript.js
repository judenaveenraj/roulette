var spinwheel=1;
var wheelspeed=5.0;


/////////////////////////////////////////////////////////////

var canvas= oCanvas.create({
canvas: "#canvas",
fps:60
});


var rect =canvas.display.rectangle({
x:0,
y:0,
width:canvas.width,
height:canvas.height,
stroke: " 10px #239 "
});

var circ=canvas.display.image({
x:250,
y:canvas.height/2,
origin: {x:"center",y:"center"},
image: "wheel.jpg",
rotation:0
});

var stopbtn = canvas.display.rectangle({
x:500,
y:400,
width:100,
height:50,
fill: "#343",
});


var stopbtntext=canvas.display.text({
x: stopbtn.width/2,
y: stopbtn.height/2,
origin: {x:"center", y:"center"},
font: "bold 15px sans-serif",
text:"Stop",
fill: "#0aa",
});

//////////////////////////////////////////////////////////////

function reducespin(){
setTimeout(function(){wheelspeed-=0.2; reducespin();},100);
}

function stopspin(){
if(spinwheel!=0){
console.log("im in again");
spinwheel=0;
console.log(wheelspeed);
reducespin();

console.log(wheelspeed);
}
}



stopbtn.bind("click tap",function(){console.log("Im in");stopspin();});
stopbtn.addChild(stopbtntext);
canvas.addChild(stopbtn);



canvas.setLoop(function(){
circ.rotation+=wheelspeed;
if (circ.rotation==360) circ.rotation=0;
}).start();

canvas.addChild(rect);
canvas.addChild(circ);
