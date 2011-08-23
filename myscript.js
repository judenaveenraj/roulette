var spinwheel=1;
var wheelspeed=5.0;
var posx=0.0,posy=0.0,posrad=0.0,posangrad=0.0,posangle=0.0;
var ballspdinc=0.0;
var dbgctr=0;
/////////////////////////////////////////////////////////////
var arr=[33,22,6,30,1,13,27,3,18,32,10,24,4,34,16,7,12,28,2,9,25,19,14,0,23,5,31,17,35,11,2,26,29,15,8,20];

var canvas= oCanvas.create({
canvas: "#canvas",
background: "#0f0",
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


function randomFromTo(from, to){
       return Math.random() * (to - from + 1) + from;
    }


function reducespin(){
if (wheelspeed>0)  setTimeout(function(){wheelspeed=(wheelspeed>0)? wheelspeed-0.005:0; reducespin();},5);
else wheelspeed=0;
//stopbtntext.text=wheelspeed;  //DEBUG
}

function stopspin(){
spinwheel=0;
var t=randomFromTo(1,3)*1000;  //18
setTimeout(function(){reducespin();},t);
}

function ballAccelrt(){
dbgctr=0
ballspdinc=1.6;
console.log(" 1:"+posx+" 2:"+posy+" 3:"+posrad+" 4:"+posangrad+" 5:"+posangle+" 6:"+ball.x+" 7:"+ball.y);
posangle+=ballspdinc;
posangrad=posangle*(Math.PI/180);
posx=posrad*Math.cos(posangrad);
posy=posrad*Math.sin(posangrad);

ball.x=posx+250;
ball.y=posy+250;
console.log(" 1:"+posx+" 2:"+posy+" 3:"+posrad+" 4:"+posangrad+" 5:"+posangle+" 6:"+ball.x+" 7:"+ball.y);
setTimeout(function(){incrRadius();},5);
if(dbgctr<=100)
setTimeout(function(){ballAccelrt();},5);
dbgctr++;

}


function dropball(){
if(ball.radius>6)
setTimeout(function(){
ball.radius-=0.5;
dropball();
},75);

else ballAccelrt();
}

function incrRadius(){
if (posrad<130)
	posrad+=0.4;
}

function getBallPos(){
posx=ball.x-250;
posy=ball.y-250;
posrad=Math.sqrt(Math.pow(posx,2)+Math.pow(posy,2));
posangrad=Math.acos(posx/posrad);
posangle=posangrad*(180/Math.PI);
//stopbtntext.text="x:"+posx+" y:"+posy+" a:"+posangle;

}


canvas.setLoop(function(){
	wheel.rotation+=wheelspeed;
	if (wheel.rotation==360) wheel.rotation=0;
	}).start();

stopbtn.bind("click tap",function(){if(spinwheel!=0) stopspin();});


ball.dragAndDrop({
	move: function(){ stopbtntext.text="x:"+(posx)+" y:"+(posy)+" a:"+posangle;},
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





