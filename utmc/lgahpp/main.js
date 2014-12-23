var ctx;
var cv;
var width = 1000;
var height = 1000;
var timer;
var gridw = 200;
var gridh = 200;
var gridsize = 2;
var LEFT = 0;
var UP = 1;
var RIGHT = 2;
var DOWN = 3;
var map;
var COLORS = ["#0000ff", "#7f00ff", "#ff00ff", "#ff007f", "#ff0000"];
var running;

var Cell = function(l_, u_, r_, d_){
    this.particles = [l_, u_, r_, d_];
}

Cell.prototype.count = function(){
    var s = 0;
    for(var i=0; i < 4; i++){
	s += this.particles[i];
    }
    return s;
}

function init_map(w_, h_){
    var a = new Array(w_);
    for(x=0; x < w_; x++){
	a[x] = new Array(h_);
	for(y=0; y < h_; y++){
	    a[x][y] = new Cell(0, 0, 0, 0);
	}
    }
    return a;
}

function init(){
    running = false;
    map = init_map(gridw, gridh);
    for(var x=0; x < gridw; x++){
	for(var y=0; y < gridh; y++){
	    var dist = Math.sqrt(Math.pow((x-gridw/2),2) + Math.pow((y-gridh/2),2));
	    var R = Math.sqrt(Math.pow(gridw/2,2) + Math.pow(gridh/2,2));
	    var p = Math.pow(dist/R, 1/3);
	    for(var i=0; i < 4; i++){
		if(Math.random() < p){
		    map[x][y].particles[i] = 0;
		}else{
		    map[x][y].particles[i] = 1;
		}
	    }
	}
    }
}

function load(){
    cv = document.getElementById("canvasMain");
    ctx = cv.getContext("2d");
    init();
    timer = window.setInterval(update, 16);
    draw();
}

function update(){
    if(running == true){
	var newmap = init_map(gridw, gridh);
	// conflict
	for(var x=0; x < gridw; x++){
	    for(var y=0; y < gridh; y++){
		for(var i=0; i < 4; i++){
		    var temp = map[x][y].particles;
		    newmap[x][y].particles[i] = temp[i] + temp[(i+1)%4]*temp[(i+3)%4]*(1-temp[i])*(1-temp[(i+2)%4]) - temp[i]*temp[(i+2)%4]*(1-temp[(i+1)%4])*(1-temp[(i+3)%4]);
		    //		newmap[x][y].particles[i] = map[x][y].particles[i];
		}
	    }
	}
	var newmap2 = init_map(gridw, gridh);
	// spread
	for(var x=0; x < gridw; x++){
	    for(var y=0; y < gridh; y++){
		for(var i=0; i < 4; i++){
		    if(y <= gridh - 2){
			newmap2[x][y].particles[UP] = newmap[x][y+1].particles[UP];
		    }
		    if(y >= 1){
			newmap2[x][y].particles[DOWN] = newmap[x][y-1].particles[DOWN];
		    }
		    if(x <= gridw -2){
			newmap2[x][y].particles[LEFT] = newmap[x+1][y].particles[LEFT];
		    }
		    if(x >= 1){
			newmap2[x][y].particles[RIGHT] = newmap[x-1][y].particles[RIGHT];
		    }
		}
	    }
	}
	map = newmap2;
    }
    draw();
}
    
function draw(){
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    for(var x=0; x < gridw; x++){
	for(var y=0; y < gridh; y++){
	    ctx.fillStyle = COLORS[map[x][y].count()];
	    ctx.fillRect(gridsize*x, gridsize*y, gridsize, gridsize);
	}
    }
}

function buttonStart(){
    running = true;
}

function buttonReset(){
    init();
}

onload = load;
