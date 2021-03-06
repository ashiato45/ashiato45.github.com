var framerate = 1000/30;
var WIDTH = 672;
var HEIGHT = 480;
var canvas;
var ctx;
var sprites = new Array();
var STATES_GAME = {TITLE: 0,
		   GAME: 1,
		   RESULT: 2
		  };
var state_game = STATES_GAME.TITLE;
var mag_width = 1;
var mag_height = 1;
var mag = 1;

var map = null;

var RED = 0;
var BLUE = 1;

var playeres = [];

var is_calced = false;

var maxlengths = [0, 0];

var remaining = 0;

onload = function() {
    init();
    setInterval("tick()", framerate);
};

function ElementInitializeFullScreenAPI(element){
    if(!(element.requestFullscreen)){
	var requestFullscreen = element.webkitRequestFullScreen ||
	    element.mozRequestFullScreen ||
	    element.oRequestFullScreen ||
	    element.msRequestFullScreen;
	element.requestFullscreen = requestFullscreen;
    }
}

function fit_canvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mag_width = canvas.width / 640.0;
    mag_height = canvas.height / 480.0;
    if(window.innerWidth/window.innerHeight >= 640.0/480.0){
	mag = mag_height;
	canvas.width = window.innerHeight*640.0/480.0;
	canvas.height = window.innerHeight;
    }else{
	mag = mag_width;
	canvas.height = window.innerWidth*480.0/640.0;
	canvas.width = window.innerWidth;
    }
    
}

function make_fullscreen(e){
    var c = document.getElementById('contents');
    ElementInitializeFullScreenAPI(c);
    c.requestFullscreen();
    
}

function init(){
    canvas = document.getElementById('canvasMain');
    if ( ! canvas || ! canvas.getContext ) {
	return false;
    }

    state_game = STATES_GAME.TITLE;

    //fit_canvas();

    sprites = new Array();
    
    ctx = canvas.getContext('2d');

    map = init_map();

    is_calced = false;
    maxlengths = [0, 0];    
    // map = map_test(map); //debug
    //     console.logn("LR" + is_mybush(RED, 1, 1));
    // console.log("LENR" + get_max_length(RED).length.toString());
    remaining = 60*30;

    
    players = [{color: RED, x: 0, y: MAP_HEIGHT - 1},
	       {color: BLUE, x: MAP_WIDTH - 1, y: 0}];

    load_images();

//    sprites.push(ship_blue);
}

function test_keyaction(){
    if(is_keydown(KEYCODE.UP)){
	console.log("a");
    }
}

function tick(){
    keyboard_update();

    if(is_keydown(KEYCODE.ENTER)){
	fit_canvas();
    }
    if(is_keydown(KEYCODE.F8)){
	init();
    }
    
    if(state_game == STATES_GAME.TITLE){
	if(is_keydown(KEYCODE.SPACE)){
	    state_game = STATES_GAME.GAME;
	}
    }
    if(state_game == STATES_GAME.GAME){
	if(is_keypressed(KEYCODE.LEFT)){
	    move_player(RED, -1, 0);
	}
	if(is_keypressed(KEYCODE.RIGHT)){
	    move_player(RED, 1, 0);
	}
	if(is_keypressed(KEYCODE.UP)){
	    move_player(RED, 0, -1);
	}
	if(is_keypressed(KEYCODE.DOWN)){
	    move_player(RED, 0, 1);	    
	}

	if(is_keypressed(KEYCODE.A)){
	    move_player(BLUE, -1, 0);
	}
	if(is_keypressed(KEYCODE.D)){
	    move_player(BLUE, 1, 0);
	}
	if(is_keypressed(KEYCODE.W)){
	    move_player(BLUE, 0, -1);
	}
	if(is_keypressed(KEYCODE.S)){
	    move_player(BLUE, 0, 1);	    
	}

	if(is_keypressed(KEYCODE.BACKSLASH) || is_keypressed(KEYCODE.SPACE)){
	    if(is_keydown(KEYCODE.LEFT)){
		cut(RED, -1, 0);
	    }
	    if(is_keydown(KEYCODE.RIGHT)){
		cut(RED, 1, 0);		
	    }
	    if(is_keydown(KEYCODE.DOWN)){
		cut(RED, 0, 1);		
	    }
	    if(is_keydown(KEYCODE.UP)){
		cut(RED, 0, -1);		
	    }	    
	}
	if(is_keypressed(KEYCODE.Q)){
	    if(is_keydown(KEYCODE.A)){
		cut(BLUE, -1, 0);
	    }
	    if(is_keydown(KEYCODE.D)){
		cut(BLUE, 1, 0);		
	    }
	    if(is_keydown(KEYCODE.S)){
		cut(BLUE, 0, 1);		
	    }
	    if(is_keydown(KEYCODE.W)){
		cut(BLUE, 0, -1);		
	    }	    
	}

	if(is_keypressed(KEYCODE.R)){
	    state_game = STATES_GAME.RESULT;
	}

	for(x=0; x < MAP_WIDTH; x++){
	    for(y=0; y < MAP_HEIGHT; y++){
		here = map[x][y];
		if(here.state === STATES_MAP.TREE){
		    if(map[x][y].height < map[x][y].limit){
			map[x][y].age++;
			if(map[x][y].age >= map[x][y].growth){
			    map[x][y].age = 0;
			    map[x][y].height++;
			}
		    }
		}
		if(!isthere_player(RED, x, y) && !isthere_player(BLUE, x, y)){
		    if(map[x][y].state === STATES_MAP.BLANK){
			if(Math.random() < 0.0002){
			    map[x][y] = {state: STATES_MAP.TREE,
					 height: 1,
					 limit: rand_int(3, 7),
					 age: 0,
					 growth: rand_int(3, 10)*30};
			}
		    }
		}
	    }
	}
	
	remaining--;
	if(remaining <= 0){
	    state_game = STATES_GAME.RESULT;
	}
	

    }
    if(state_game == STATES_GAME.RESULT){
	if(is_calced == false){
	    is_calced = true;
	    maxlengths = [get_max_length(RED), get_max_length(BLUE)];
	}
    }


    draw();    
}

function rand_int(a, b){
    return Math.floor((b-a)*Math.random()+a);
}

function isthere_player(color_, x_, y_){
    return (players[color_].x === x_ && players[color_].y === y_);
}
	
    
function move_player(color_, dx, dy){
    tgtx = players[color_].x + dx;
    tgty = players[color_].y + dy;
    if(!(0 <= tgtx && tgtx < MAP_WIDTH)){
	return false;
    }
    if(!(0 <= tgty && tgty < MAP_HEIGHT)){
	return false;
    }
    if(map[tgtx][tgty].state != STATES_MAP.BLANK){
	return false;
    }
    if(isthere_player((color_+1)%2, tgtx, tgty)){
	return false;
    }
    players[color_].x = tgtx;
    players[color_].y = tgty;
    return true;
}

function cut(color_, dx, dy){
    tgtx = players[color_].x + dx;
    tgty = players[color_].y + dy;
    if(!(0 <= tgtx && tgtx < MAP_WIDTH)){
	return false;
    }
    if(!(0 <= tgty && tgty < MAP_HEIGHT)){
	return false;
    }    
    if(map[tgtx][tgty].state === STATES_MAP.TREE){
	for(i=0; i < map[tgtx][tgty].height; i++){
	    repx = tgtx + dx*i;
	    repy = tgty + dy*i;
	    if(!(0 <= repx && repx < MAP_WIDTH)){
		break;
	    }
	    if(!(0 <= repy && repy < MAP_HEIGHT)){
		break;
	    }
	    if((map[repx][repy].state === STATES_MAP.BLANK
	       || (map[repx][repy].state == STATES_MAP.BUSH
		   && map[repx][repy].owner !== color_))
	      && (players[(color_+1)%2].x !== repx || players[(color_+1)%2].y !== repy)){
		map[repx][repy] = {state: STATES_MAP.BUSH, owner: color_};
	    }
	}

	map[tgtx][tgty] = {state: STATES_MAP.BUSH, owner:color_};

	return true;
    }
    if(map[tgtx][tgty].state == STATES_MAP.BUSH){
	if(map[tgtx][tgty].owner == color_){
	    map[tgtx][tgty] = {state: STATES_MAP.BLANK};
	    return true;
	}
	return false;
    }

    return false;
}

function draw() {


    ctx.save();
    ctx.scale(mag, mag);

    for(i=0; i < sprites.length; i++){
	sprites[i].draw(ctx);
    }

    if(state_game == STATES_GAME.TITLE){
	ctx.drawImage(img_store["title"], 0, 0);
    }else if(state_game == STATES_GAME.GAME){
	ctx.drawImage(img_store["field"], 0, 0);
	draw_number(0, 0, Math.floor(remaining/30), ctx, 32, 5);
	draw_map(map, ctx);
	ctx.drawImage(img_store["man_red"], players[RED].x*MAP_SIZE, players[RED].y*MAP_SIZE);
	ctx.drawImage(img_store["man_blue"], players[BLUE].x*MAP_SIZE, players[BLUE].y*MAP_SIZE);	
    }else if(state_game == STATES_GAME.RESULT){
	ctx.drawImage(img_store["result"], 0, 0);	
	draw_number(290, 140, maxlengths[RED].length, ctx, 128, 50);
	draw_number(290, 240, maxlengths[BLUE].length, ctx, 128, 50);

	for(i=0; i < maxlengths[RED].length; i++){
	    ctx.drawImage(img_store["mark_red"],
			  maxlengths[RED][i].x*MARKER_SIZE,
			  maxlengths[RED][i].y*MARKER_SIZE);
	}
	for(i=0; i < maxlengths[BLUE].length; i++){
	    ctx.drawImage(img_store["mark_blue"],
			  maxlengths[BLUE][i].x*MARKER_SIZE,
			  maxlengths[BLUE][i].y*MARKER_SIZE);
	}

	
	
    }
    ctx.restore();
}

