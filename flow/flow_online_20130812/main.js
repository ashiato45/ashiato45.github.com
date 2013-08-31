var fps = 30;
var framerate = 1000/fps;
var WIDTH = 640;
var HEIGHT = 480;
var MAP_WIDTH = 80;
var MAP_HEIGHT = 60;
var L2 = Math.log(2);
var canvas;
var ctx;
var sprites = new Array();
var bombs = new Array();
var STATES_GAME = {NO: 0,
		  WIN_RED: 1,
		  WIN_BLUE: 2,
		  TITLE: 3,
		  HANDSHAKING: 4,
		  COUNTING: 5};
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

    init_connection();

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
			 {left:-1,
			  right:-1,
			  attack:-1,
			  sw:-1});
			 
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
	    console.log("GOING TO HANDSHAKE");
	    prepare_connection(document.mainform.input_foe.value,
			   document.mainform.input_mine.value);
	    console.log("prepared");
	    state_game = STATES_GAME.HANDSHAKING;
	    return;
	}
    }
    if(state_game == STATES_GAME.NO){
	go_perlin();
	for(i=0; i < sprites.length; i++){
	    sprites[i].update(perlinmap);
	}

	if(ship_blue.check_bomb() || ship_blue.check_foebomb()){
	    state_game = STATES_GAME.WIN_RED;
	}
	if(ship_red.check_bomb() || ship_red.check_foebomb()){
	    state_game = STATES_GAME.WIN_BLUE;
	}
	send_state();

    }
    if(state_game == STATES_GAME.WIN_RED || state_game == STATES_GAME.WIN_BLUE){
	if(is_keydown(KEYCODE.SPACE)){
	    state_game = STATES_GAME.TITLE;
	    init();
	}
	if(state_game == STATES_GAME.WIN_RED){
//	    conn.send({type:"winner", winner: mine});
	    send({type:"winner", winner: mine});
	}else{
//	    conn.send({type:"winner", winner: foe});
	    send({type:"winner", winner: foe});
	}
    }
    if(state_game == STATES_GAME.HANDSHAKING){
	if(conn != undefined){
	    console.log("sent_handshaking");
//	    send({type:"a"});
	    send({type:"handshake"});
	}
	    
    }
    if(state_game == STATES_GAME.COUNTING){
	if(perlinsent == false){
	    //send({type:"map", perlin:perlinmap});
	    send_map();
	    perlinsent = true;
	}
	countdown -= 1;
	if(countdown == 0){
	    if(!is_owner()){
		ship_blue.sprite.pos = {x:INIT_POS.x, y:INIT_POS.y};
		ship_red.sprite.pos = {x:WIDTH-INIT_POS.x, y:HEIGHT-INIT_POS.y};
		ship_blue.init_angle(perlinmap);
		ship_red.init_angle(perlinmap);
	    }
	    state_game = STATES_GAME.NO;
	}
    }
    
    apply_receipt();

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
    for(ii=0; ii < foebombs.length; ii++){
	foebombs[ii].draw(ctx);
	console.log("l",foebombs.length);
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
    if(state_game == STATES_GAME.HANDSHAKING){
	ctx.drawImage(img_store["handshaking"], 0, 0);
    }
    if(state_game == STATES_GAME.COUNTING){
	n = Math.floor(countdown/fps);
	ctx.drawImage(img_store[0], 0, 0);
    }
}

