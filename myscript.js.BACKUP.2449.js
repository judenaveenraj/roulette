var spinwheel=1;
var wheelspeed=5.0;
var posx=0.0,posy=0.0,posrad=0.0,posangrad=0.0,posangle=0.0;
var ballspdinc=0.1;
var dbgctr=0;
var wheelRotStatus=1;
var upperhalf=0; //to denote the ball is in upper half of wheel and to correct angle
var indiRot=0;
var ballDropped=0;
var turnOver=0;
var betMouseX=0;
var betMouseY=0;
var presentBetNum=0;
var chipSel=1;
var balanceCash=250;
var bettingCash=0;
var interCash=balanceCash;
var win=0;
var LuckyNum=0;
/////////////////////////////////////////////////////////////

var angles=[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
var chips=new Array();
var code_chip={};
var chip_count={};
var bets={};
var payout={0:35,112:2,212:2,312:2,118:1,222:1,200:1,300:1,111:1,218:1,401:2,402:2,403:2};
var chipPos={0:[63,89],112:[185,180],212:[365,180],312:[545,180],118:[135,220],222:[230,220],200:[320,220],300:[410,220],111:[500,220],218:[590,220],401:[657,136],402:[657,86],403:[657,46]};



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

var chipRect=canvas.display.rectangle({
x:700,
y:0,
height:75,
width:200,
stroke: "5px #0f881e"

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
x:735,
y:20,
image:"chip1.png",
});

var chip10=chip1.clone({x:chip1.x+50, image:"chip10.png"});
var chip100=chip1.clone({x:chip1.x+100, image:"chip100.png"});

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


var chip=canvas.display.image({
x:0,
y:0,
width:30,
height:30,
origin:{x:"center",y:"center"},
image:"chip.png",
opacity:0.5
});

var lucknum=stopbtn.clone({x:200, y:0});
var lucknumtext=stopbtntext.clone({ x:lucknum.width/2, y:lucknum.height/2, text:"Waiting"});
var balancebox=stopbtn.clone({x:400, y:0});
var balancetext=stopbtntext.clone({ x:balancebox.width/2, y:balancebox.height/2, text:interCash});
//////////////////////////////////////////////////////////////

function randomFromTo(from, to){
       return Math.random() * (to - from + 1) + from;
    }

function resetTurn(){
wheel.rotation=0;
indi.rotation=0;
ballDropped=0;
spinwheel=1;
wheelspeed=5.0;
posx=0.0,posy=0.0,posrad=0.0,posangrad=0.0,posangle=0.0;
ballspdinc=0.1;
dbgctr=0;
wheelRotStatus=1;
upperhalf=0;
indiRot=0;
turnOver=0;
betMouseX=0;
betMouseY=0;
presentBetNum=0;
balanceCash=interCash+win;
bettingCash=0;
interCash=balanceCash;
win=0;
LuckyNum=0;
setTimeout(function(){resetBallPos();});
for (key in code_chip)
{
	code_chip[key].removeChild(chip_count[key]);
	layout.removeChild(code_chip[key]);
	
}
chips=[];
for (key in code_chip)
delete code_chip[key];
for (key in chip_count)
delete chip_count[key];
for (key in bets)
delete bets[key];
console.log(chips);
console.log(code_chip);
console.log(chip_count);
balancetext.text=interCash;
canvas.redraw();
}

function resetBallPos(){
ball.animate({
x:50,
y:50,
radius:10},
"long","ease-in-out");
}

function showProfit(){
var winbox=canvas.display.rectangle({
x:canvas.width/2,
y:canvas.height/2,
width:300,
height:100,
fill: "f00",
opacity:0.9
});
var wintext=canvas.display.text({
x:winbox.width/2+50,
y:winbox.height/2,
origin:{x:"center", y:"center"},
font: "bold sans-serif",
size: 50,
align:"left",
fill: "#0aa",
opacity:1.0
});
	if(win!=0)
	wintext.text="Won: "+win;
	else
	wintext.text="Won: 0";
	winbox.addChild(wintext);
	canvas.addChild(winbox);
	setTimeout(function(){
		wintext.animate(
		{size:15,x:65,y:25,opacity:0.3},"normal","ease-in-out");
		winbox.animate({
			x:balancebox.x,
			y:balancebox.y,
			width:balancebox.width,
			height:balancebox.height,
			opacity:0.0},"normal","ease-in-out",
			function(){
			winbox.removeChild(wintext);
			canvas.removeChild(winbox);
			console.log("resetting");
			resetTurn();
			}
		);
	},2000);
	
}

function generateChip(i){
if (i>=1 && i<=36){
var chip=canvas.display.image({
x:118+(Math.floor((i-1)/3)*45),
y:137-(((i-1)%3)*47)-50,	//-50 for animation
width:30,
height:30,
origin:{x:"center",y:"center"},
image:"chip.png",
opacity:0.0
});}

else{
var chip=canvas.display.image({
x:chipPos[i][0],
y:chipPos[i][1]-50,		//-50 for animation
width:30,
height:30,
origin:{x:"center",y:"center"},
image:"chip.png",
opacity:0.0
});}

if(!code_chip[i]){

	
	var chipcount=canvas.display.text({
	x:0,
	y:0,
	origin:{x:"center",y:"center"},
	text:0,
	font: "bold 12px sans-serif",
	fill: "#000"
	});
	
	code_chip[i]=chip;
	chip_count[i]=chipcount;
	chip_count[i].text=chipSel;
	chip.addChild(chipcount);
	var ind=chips.push(chip);
	layout.addChild(chip);
chip.animate({opacity:0.8, y:chip.y+50},"450","ease-in-out");

}


else{
	chip_count[i].text+=chipSel;}
}


function chipYielder(res, key){
if(key>=1 && key<=36 && res==key)
return 1;
if(key==112 && [1,2,3,4,5,6,7,8,9,10,11,12].indexOf(res)!=-1)
return 1;
if(key==212 && ([13,14,15,16,17,18,19,20,21,22,23,24].indexOf(res)!=-1))
return 1;
if(key==312 && [25,26,27,28,29,30,31,32,33,34,35,36].indexOf(res)!=-1)
return 1;
if(key==118 && [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].indexOf(res)!=-1)
return 1;
if(key==222 && [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36].indexOf(res)!=-1) 
return 1;
if(key==200 && [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].indexOf(res)!=-1)
return 1;
if(key==300 && [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35].indexOf(res)!=-1)
return 1;
if(key==111 && [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35].indexOf(res)!=-1)
return 1;
if(key==218 && [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36].indexOf(res)!=-1)
return 1;
if(key==401 && [1,4,7,10,13,16,19,22,25,28,31,34].indexOf(res)!=-1)
return 1;
if(key==402 && [2,5,8,11,14,17,20,23,26,29,32,35].indexOf(res)!=-1)
return 1;
if(key==403 && [3,6,9,12,15,18,21,24,27,30,33,36].indexOf(res)!=-1)
return 1;
if(key==0 && res==0)
return 1;
return 0;
}


function addBet(i){
if(interCash-chipSel>=0){
	if (bets[i])
	bets[i]+=chipSel;
	else
	bets[i]=chipSel;
	bettingCash+=chipSel;
	interCash=balanceCash-bettingCash;
	balancetext.text=interCash;
	setTimeout(function(){ generateChip(i);},2);
	////// Update balanceCash on dropball();
	console.log(bettingCash);
	}
}

function selectChip(){
var c1,c10,c100;
switch(chipSel){
case 1:
{ c1=1.0;
  c10=0.5;
  c100=0.5;
  break;
}
case 10:
{ c1=0.5;
  c10=1.0;
  c100=0.5;
  break;
}
case 100:
{ c1=0.5;
  c10=0.5;
  c100=1.0;
  break;
}
}
console.log(c1+" "+c10+" "+c100);
chip1.animate({opacity:c1},"200","ease-in-out");
chip10.animate({opacity:c10},"200","ease-in-out");
chip100.animate({opacity:c100},"200","ease-in-out");


}


function getTurnResult(res){
var i=0;

for(key in bets)
{	
	pres=chipYielder(LuckyNum,key);
	if (key>=0 && key<=36)
	win+=((bets[key]*35*pres)+bets[key])*pres;
	else
	win+=((bets[key]*payout[key]*pres)+bets[key])*pres;

}
showProfit();
console.log("WIN: "+win);
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
if (turnOver!=1){
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
turnOver=1;
setTimeout(function(){getTurnResult();},1);
console.log(x);
}
setTimeout(function(){if (posrad<130) incrRadius();},5);
if (wheelRotStatus==1)
setTimeout(function(){if(ballspdinc<1.6) incrSpd();},5);
else
setTimeout(function(){if (ballspdinc>0) decrSpd();},5);
setTimeout(function(){ballAccelrt();},5);
}
}

function checkBallWithinWheel(){
var x=ball.x,y=ball.y;
x-=wheel.x;
y-=wheel.y;
var r=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
if (r<130)
return true;
else
return false;
}

function dropball(){
ball.dragAndDrop(false);
ball.dragAndDrop({
	move: function(){ stopbtntext.text="x:"+(posx)+" y:"+(posy)+" a:"+posangle;},
	end: function(){
		if(ballDropped==0 && bettingCash!=0 && checkBallWithinWheel())
		{
			console.log("asdasdasd");
			getBallPos();		
			dropball();    ////////////For debugging remove asap
			setTimeout(function(){stopspin();},1000);
		}
		}	
	});
ballDropped=1;
balanceCash-=bettingCash;  ///Update balance Cash on start turn
ball.animate({radius:6},"600","ease-out");
setTimeout(function(){ ballAccelrt();},600);
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
	if(0<betMouseX && betMouseX<535 && 0<betMouseY && betMouseY<135)
	presentBetNum=(3*Math.floor(betMouseX/45))+(Math.ceil(betMouseY/45));
	else if(-70<betMouseX && betMouseX<0 && 0<betMouseY && betMouseY<135)
	presentBetNum=0;
	else if(0<betMouseX && betMouseX<180 && -35<betMouseY && betMouseY<0)
	presentBetNum=112;
	else if(180<betMouseX && betMouseX<360 && -35<betMouseY && betMouseY<0)
	presentBetNum=212;
	else if(360<betMouseX && betMouseX<540 && -35<betMouseY && betMouseY<0)
	presentBetNum=312;
	else if(0<betMouseX && betMouseX<90 && -80<betMouseY && betMouseY<-35)
	presentBetNum=118;
	else if(90<betMouseX && betMouseX<180 && -80<betMouseY && betMouseY<-35)
	presentBetNum=222;
	else if(180<betMouseX && betMouseX<270 && -80<betMouseY && betMouseY<-35)
	presentBetNum=200;
	else if(270<betMouseX && betMouseX<360 && -80<betMouseY && betMouseY<-35)
	presentBetNum=300;
	else if(360<betMouseX && betMouseX<450 && -80<betMouseY && betMouseY<-35)
	presentBetNum=111;
	else if(450<betMouseX && betMouseX<540 && -80<betMouseY && betMouseY<-35)
	presentBetNum=218;
	else if(540<betMouseX && betMouseX<585 && 0<betMouseY && betMouseY<45)
	presentBetNum=401;
	else if(540<betMouseX && betMouseX<585 && 45<betMouseY && betMouseY<90)
	presentBetNum=402;
	else if(540<betMouseX && betMouseX<585 && 90<betMouseY && betMouseY<135)
	presentBetNum=403;
	else	presentBetNum=100;
	if(presentBetNum!=100)
		addBet(presentBetNum);
	stopbtntext.text=betMouseX+"    "+betMouseY+"    "+presentBetNum;

}

canvas.setLoop(function(){
	wheel.rotation+=wheelspeed;
	indi.rotation= (upperhalf==0)? ((ball.y<0)? posangle+180:posangle):(-1*posangle);
	stopbtntext.text=ballDropped+"  "+bettingCash+"   "+checkBallWithinWheel();
	if (wheel.rotation==360) wheel.rotation=0;
	if(ballDropped==1)
	{
		var x=(posangle-4.8648)*-1;
		x=x-wheel.rotation;
		x=x%360;
		x=x<0?-x:x;
		x=angles[Math.floor(x/9.7297)];
		lucknumtext.text=x;
		LuckyNum=x;
	}
	
	}).start();



stopbtn.bind("click tap",function(){if(spinwheel!=0) stopspin();});
chip1.bind("click tap",function(){ chipSel=1; selectChip();});
chip10.bind("click tap",function(){ chipSel=10; selectChip();});
chip100.bind("click tap",function(){ chipSel=100; selectChip();});
layout.bind("click tap",function(){ if(ballDropped==0)setTimeout(function(){guessBetPos();},5) });


<<<<<<< HEAD
//ball.bind("mouseenter",function(){  
//if(ballDropped==0){
=======
ball.bind("mouseenter",function(){  
if(ballDropped==0){
>>>>>>> 415ec230b255bfc789a653718a1b9f3bb2a58972
ball.dragAndDrop({
	move: function(){ stopbtntext.text="x:"+(posx)+" y:"+(posy)+" a:"+posangle;},
	end: function(){
		if(ballDropped==0 && bettingCash!=0 && checkBallWithinWheel())
		{
			getBallPos();		
			dropball();    ////////////For debugging remove asap
			setTimeout(function(){stopspin();},1000);
		}
		}	
<<<<<<< HEAD
	});//}
//
//ball.bind("mouseleave",function(){ball.dragAndDrop(false);});

// });
=======
	});

	}	
});
ball.bind("mouseleave",function(){ball.dragAndDrop(false);});

   //});
stopbtn.bind("click tap",function(){if(spinwheel!=0) stopspin();});
chip1.bind("click tap",function(){ chipSel=1; selectChip();});
chip10.bind("click tap",function(){ chipSel=10; selectChip();});
chip100.bind("click tap",function(){ chipSel=100; selectChip();});
layout.bind("click tap",function(){ if(ballDropped==0)setTimeout(function(){guessBetPos();},5) });
>>>>>>> 415ec230b255bfc789a653718a1b9f3bb2a58972





stopbtn.addChild(stopbtntext);
canvas.addChild(stopbtn);
balancebox.addChild(balancetext);
canvas.addChild(balancebox);
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
canvas.addChild(chipRect);
selectChip();


