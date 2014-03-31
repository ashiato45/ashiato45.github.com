var ctx;
var cv;
var num = 8000;
var tokens;
var size;
var rad;
var dotsize = 1;
var verts;

function load(){
    cv = document.getElementById("canvasMain");
    ctx = cv.getContext("2d");

    size = cv.width;
    rad = size/2;

    verts = new Array(num);
    for(var i=0; i < 3; i++){
	verts[i] = {x: rad*Math.cos(Math.PI*2/3*i - Math.PI/2) + size/2,
		    y: rad*Math.sin(Math.PI*2/3*i - Math.PI/2) + size/2};
    }

    randomizeToken();
    
    draw();
}

function draw(){
    ctx.clearRect(0, 0, size, size);
    for(var i=0; i < num; i++){
	ctx.fillRect(tokens[i].x, tokens[i].y, dotsize, dotsize);
    }
}

function randomizeToken(){
    tokens = new Array(num);
    for(var i=0; i < num; i++){
	var d = Math.sqrt(Math.random());
	var t = Math.random();
	var l = {x: verts[0].x + (verts[1].x - verts[0].x)*d,
		 y: verts[0].y + (verts[1].y - verts[0].y)*d};
	var r = {x: verts[0].x + (verts[2].x - verts[0].x)*d,
		 y: verts[0].y + (verts[2].y - verts[0].y)*d};
	var inter = {x: t*l.x + (1-t)*r.x,
		     y: t*l.y + (1-t)*r.y};
	tokens[i] = inter;
    }
    draw();
}

function goToken(){
    for(var i=0; i < num; i++){
	var r = Math.random();
	if(r < 1.0/3.0){
	    tokens[i] = {x: (tokens[i].x + verts[0].x)/2,
			 y: (tokens[i].y + verts[0].y)/2};
	}else if(r < 2.0/3.0){
	    tokens[i] = {x: (tokens[i].x + verts[1].x)/2,
			 y: (tokens[i].y + verts[1].y)/2};	    
	}else{
	    tokens[i] = {x: (tokens[i].x + verts[2].x)/2,
			 y: (tokens[i].y + verts[2].y)/2};
	}
    }
    draw();
}

onload = load;
