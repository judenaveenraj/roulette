var spinwheel=1;
var wheelspeed=5.0;
var posx=0.0,posy=0.0,posrad=0.0,posangrad=0.0,posangle=0.0;
var ballspdinc=0.1;
var dbgctr=0;
var wheelRotStatus=1;
var upperhalf=0; //to denote the ball is in upper half of wheel and to correct angle
var indiRot=0;
var ballDropped=0;
var betMouseX=0;
var betMouseY=0;
var presentBetNum=0;
var chipSel=1;

/////////////////////////////////////////////////////////////

var angles=[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];


var canvas= oCanvas.create({
canvas: "#canvas",
background: "#5aa064",
fps:30
});


var rect =canvas.display.rectangle({
x:0,
y:0,
width:canvas.width,
height:canvas.height,
stroke: " 10px #239 "
});

var indi=canvas.display.arc({
x:250,
y:canvas.height/2,
origin:{x:"center",y:"center"},
radius:90,
stroke:"100px #fff",
start:-5,
end:5,
opacity:0.5,
rotation:0

});

var wheel=canvas.display.image({
x:250,
y:canvas.height/2,
width:350,
height:350,
origin: {x:"center",y:"center"},
image: "wheel5.png",
rotation:0
});

var layout=canvas.display.image({
x:450,
y:canvas.height/2-50,
width:700,
height:300,
origin:{x:"top", y:"left"},
image: "roulette-table.png",
stroke: "2px #fff"
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

var chip1=canvas.display.image({
x:650,
y:25,
image:"chip1.png",
});

var chip10=chip1.clone({x:700, image:"chip10.png"});
var chip100=chip1.clone({x:750, image:"chip100.png"});

var stopbtn = canvas.display.rectangle({
x:500,
y:100,
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

var lucknum=stopbtn.clone({x:200, y:0});
var lucknumtext=stopbtntext.clone({ x:lucknum.width/2, y:lucknum.height/2, text:"Waiting"});
//////////////////////////////////////////////////////////////


function randomFromTo(from, to){
       return Math.random() * (to - from + 1) + from;
    }

function selectChip(){
switch(chipSel){
case 1:
{ chip1.opacity=1.0;
  chip10.opacity=0.5;
  chip100.opacity=0.5;
  break;
}
case 10:
{ chip1.opacity=0.5;
  chip10.opacity=1.0;
  chip100.opacity=0.5;
  break;
}
case 100:
{ chip1.opacity=0.5;
  chip10.opacity=0.5;
  chip100.opacity=1.0;
  break;
}
}
}

function reducespin(){
if (wheelspeed>0)  setTimeout(function(){wheelspeed=(wheelspeed>0)? wheelspeed-0.005:0; reducespin();},5);
else wheelspeed=0;
if(wheelspeed==0 && wheelRotStatus==1) { wheelRotStatus=0; decrSpd();}
}

function stopspin(){
spinwheel=0;
var t=randomFromTo(1,4)*1000;
setTimeout(function(){ reducespin();},t);
}

function incrSpd(){
if(ballspdinc<1.6 && wheelRotStatus==1)
ballspdinc+=0.02;
}

function incrRadius(){
if (posrad<130)
	posrad+=0.4;
}

function decrSpd(){
if(ballspdinc>0 && wheelRotStatus==0)
ballspdinc-=0.002;
if(ballspdinc<0) ballspdinc=0;
}

function ballAccelrt(){
//console.log(" 1:"+posx+" 2:"+posy+" 3:"+posrad+" 4:"+posangrad+" 5:"+posangle+" 6:"+ball.x+" 7:"+ball.y);
if(upperhalf==0){
posangle+=ballspdinc;
posangrad=posangle*(Math.PI/180);
posx=posrad*Math.cos(posangrad);
posy=posrad*Math.sin(posangrad);
ball.x=posx+250;
ball.y=posy+250;
}
else{
posangle-=ballspdinc;
posangrad=posangle*(Math.PI/180);
posx=posrad*Math.cos(posangrad);
posy=posrad*Math.sin(posangrad);
ball.x=(1*posx)+250;
ball.y=(-1*posy)+250;
}

if (ballspdinc==0)
{	
var x=-1*(posangle%360);
x=Math.floor(posangle/10);
console.log(x);
//Math.floor(posangle
}
//console.log(" 1:"+posx+" 2:"+posy+" 3:"+posrad+" 4:"+posangrad+" 5:"+posangle+" 6:"+ball.x+" 7:"+ball.y);
setTimeout(function(){if (posrad<130) incrRadius();},5);
if (wheelRotStatus==1)
setTimeout(function(){if(ballspdinc<1.6) incrSpd();},5);
else
setTimeout(function(){if (ballspdinc>0) decrSpd();},5);
setTimeout(function(){ballAccelrt();},5);
}


function dropball(){
ball.dragAndDrop(false);
ballDropped=1;
if(ball.radius>6)
	setTimeout(function(){
		ball.radius-=0.5;
		dropball(); },75);
else ballAccelrt();
}



function getBallPos(){
posx=ball.x-250;
posy=ball.y-250;
if (posy<0)
upperhalf=1;
posrad=Math.sqrt(Math.pow(posx,2)+Math.pow(posy,2));
posangrad=Math.acos(posx/posrad);
posangle=posangrad*(180/Math.PI);
//stopbtntext.text="x:"+posx+" y:"+posy+" a:"+posangle;
}

function guessBetPos(){
	betMouseX=canvas.mouse.x-545;
	betMouseY=(canvas.mouse.y-360)*-1;
	presentBetNum=(3*Math.floor(betMouseX/45))+(Math.ceil(betMouseY/45));
	stopbtntext.text=betMouseX+"    "+betMouseY+"    "+presentBetNum;

}

canvas.setLoop(function(){
	wheel.rotation+=wheelspeed;
	indi.rotation= (upperhalf==0)? ((ball.y<0)? posangle+180:posangle):(-1*posangle);
	//ballspdinc=0.1;
	//indiRot=Math.floor(indiRot/10);
	//indi.rotation=indiRot*10;
	//console.log(indi.rotation);
	if (wheel.rotation==360) wheel.rotation=0;
	if(ballDropped==1)
	{
		var x=(posangle-5)*-1;
		x=x-wheel.rotation;
		x=x%360;
		x=x<0?-x:x;
		x=angles[Math.floor(x/10)];
		lucknumtext.text=x;
	}
	
	}).start();

stopbtn.bind("click tap",function(){if(spinwheel!=0) stopspin();});
chip1.bind("click tap",function(){ chipSel=1; selectChip();});
chip10.bind("click tap",function(){ chipSel=10; selectChip();});
chip100.bind("click tap",function(){ chipSel=100; selectChip();});
layout.bind("click tap",function(){ setTimeout(function(){guessBetPos();}) });


ball.dragAndDrop({
	move: function(){ stopbtntext.text="x:"+(posx)+" y:"+(posy)+" a:"+posangle;},
	end: function(){
		getBallPos();	
		//stopbtntext.text=" 1:"+posx+" 2:"+posy+" 3:"+posrad+" 4:"+posangrad+" 5:"+posangle+" 6:"+ball.x+" 7:"+ball.y;
		dropball();
		setTimeout(function(){stopspin();},1000);}
		
});


selectChip();
stopbtn.addChild(stopbtntext);
canvas.addChild(stopbtn);
canvas.addChild(rect);
canvas.addChild(wheel);
canvas.addChild(indi);
canvas.addChild(ball);
lucknum.addChild(lucknumtext);
canvas.addChild(lucknum);
canvas.addChild(layout);
canvas.addChild(chip1);
canvas.addChild(chip10);
canvas.addChild(chip100);



