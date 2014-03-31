var ctx;
var cv;
var num = 1000;
var tokens;
var width = 1000;
var height = 100;
var size = 2;

function load(){
    cv = document.getElementById("canvasMain");
    ctx = cv.getContext("2d");
    tokens = new Array(num);
    for(var i=0; i < num; i++){
	tokens[i] = Math.random()*width;
    }
    console.log(tokens);
    draw();
}

function draw(){
    ctx.clearRect(0, 0, width, height);
    for(var i=0; i < num; i++){
	ctx.fillRect(tokens[i], 0, size, size);
    }
}

function randomizeToken(){
    load();
}

function goToken(){
    for(var i=0; i < num; i++){
	if(Math.random() < 0.5){
	    tokens[i] = tokens[i]/3.0;
	}else{
	    tokens[i] = (width-(width-tokens[i])/3.0);
	}
    }
    draw();
}

onload = load;
