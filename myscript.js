var spinwheel=1;
var wheelspeed=5.0;
var posx=0.0,posy=0.0,posrad=0.0,posangle=0.0;

/////////////////////////////////////////////////////////////

var canvas= oCanvas.create({
canvas: "#canvas",
fps:30
});


var rect =canvas.display.rectangle({
x:0,
y:0,
width:canvas.width,
height:canvas.height,
stroke: " 10px #239 "
});

var wheel=canvas.display.image({
x:250,
y:canvas.height/2,
origin: {x:"center",y:"center"},
image: "wheel.jpg",
rotation:0
});

var ball= canvas.display.arc({
x:50,
y:50,
origin:{x:"center", y:"center"},
radius:10,
start:0,
end:359,
fill:"#fff",
stroke: "1px #000 "



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
if (wheelspeed>0)  setTimeout(function(){wheelspeed=(wheelspeed>0)? wheelspeed-0.005:0; reducespin();},5);
else wheelspeed=0;
//stopbtntext.text=wheelspeed;  //DEBUG
}

function stopspin(){
spinwheel=0;
reducespin();
}


function dropball(){
if(ball.radius>6)
setTimeout(function(){
ball.radius-=0.5;
dropball();
},75);

}

function getBallPos(){
posx=ball.x-250;
posy=ball.y-250;
posrad=Math.sqrt(Math.pow(posx,2)+Math.pow(posy,2));
posangle=Math.acos(posx/posrad)*(180/Math.PI);
//stopbtntext.text="x:"+posx+" y:"+posy+" a:"+posangle;

}


canvas.setLoop(function(){
	wheel.rotation+=wheelspeed;
	if (wheel.rotation==360) wheel.rotation=0;
	}).start();

stopbtn.bind("click tap",function(){if(spinwheel!=0) stopspin();});


ball.dragAndDrop({
	move: function(){ getBallPos();stopbtntext.text="x:"+(posx)+" y:"+(posy)+" a:"+posangle;},
	end: function(){ 
		stopbtntext.text="x:"+(posx)+" y:"+(posy)+" a:"+posangle;
		dropball();
		getBallPos();
		setTimeout(function(){stopspin();},1000);}
});

stopbtn.addChild(stopbtntext);
canvas.addChild(stopbtn);
canvas.addChild(rect);
canvas.addChild(wheel);
canvas.addChild(ball);





