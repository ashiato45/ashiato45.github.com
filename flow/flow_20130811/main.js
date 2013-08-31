var framerate = 1000/30;
var WIDTH = 640;
var HEIGHT = 480;
var MAP_WIDTH = 80;
var MAP_HEIGHT = 40;
var L2 = Math.log(2);
var canvas;
var ctx;
var sprites = new Array();
var bombs = new Array();
var STATES_GAME = {NO: 0,
		  WIN_RED: 1,
		  WIN_BLUE: 2,
		  TITLE: 3};
var INIT_POS = {x:120, y:120};
var state_game = STATES_GAME.TITLE;

var test_sprite;

onload = function() {
    init();
    setInterval("tick()", framerate);
};

function init(){
    canvas = document.getElementById('canvasMain');
    if ( ! canvas || ! canvas.getContext ) {
	return false;
    }

    sprites = new Array();
    bombs = new Array();
    
    ctx = canvas.getContext('2d');
    load_images();
    init_perlin(MAP_WIDTH, .9);

    ship_red = new Ship(img_store["ship"], {x:INIT_POS.x, y:INIT_POS.y}, 0,
			  {left:KEYCODE.LEFT,
			  right:KEYCODE.RIGHT,
			  attack:KEYCODE.DOWN,
			  sw:KEYCODE.UP});
    ship_blue = new Ship(img_store["ship_blue"], {x:WIDTH-INIT_POS.x, y:HEIGHT-INIT_POS.y}, 0,
			 {left:KEYCODE.A,
			  right:KEYCODE.D,
			  attack:KEYCODE.S,
			  sw:KEYCODE.W});
			 
    ship_red.init_angle(perlinmap);
    ship_blue.init_angle(perlinmap);
    sprites.push(ship_red);
    sprites.push(ship_blue);
}

function test_keyaction(){
    if(is_keydown(KEYCODE.UP)){
	console.log("a");
    }
}

function tick(){
    keyboard_update();    
    if(state_game == STATES_GAME.TITLE){
	if(is_keydown(KEYCODE.SPACE)){
	    state_game = STATES_GAME.NO;
	}
    }
    if(state_game == STATES_GAME.NO){
	go_perlin();
	for(i=0; i < sprites.length; i++){
	    sprites[i].update(perlinmap);
	}

	if(ship_blue.check_bomb()){
	    state_game = STATES_GAME.WIN_RED;
	}
	if(ship_red.check_bomb()){
	    state_game = STATES_GAME.WIN_BLUE;
	}

    }
    if(state_game == STATES_GAME.WIN_RED || state_game == STATES_GAME.WIN_BLUE){
	if(is_keydown(KEYCODE.SPACE)){
	    state_game = STATES_GAME.TITLE;
	    init();
	}
    }

    draw();    
}

function draw() {
    ctx.beginPath();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    test_draw_perlin(ctx, WIDTH, HEIGHT, MAP_WIDTH, MAP_HEIGHT);
    ctx.closePath();
    ctx.stroke();

    for(i=0; i < sprites.length; i++){
	sprites[i].draw(ctx);
    }

    if(state_game == STATES_GAME.TITLE){
	ctx.drawImage(img_store["title"], 0, 0);
    }
    if(state_game == STATES_GAME.WIN_RED){
	ctx.drawImage(img_store["win_red"], 0, 0);
    }
    if(state_game == STATES_GAME.WIN_BLUE){
	ctx.drawImage(img_store["win_blue"], 0, 0);
    }
}

