// var apikey = "bddadvcmextxd2t9";
var apikey = undefined;
var peer;
var conn;
var receipt;
var countdown;
var mine;
var foe;
var foebombs;
var tryid;
var perlinsent;

function connect(c){
    conn = c;
    conn.on("data", function(data){
	receipt = data;
	if(state_game == STATES_GAME.COUNTING){
	if(receipt.type == "map"){
	    console.log("map get");
	    if(!is_owner()){
		perlinmap[receipt.x][receipt.y] = receipt.t;
		console.log(receipt.x, receipt.y, receipt.t);
	    }
	}
    }
    });
}


function init_connection(){
    peer = undefined;
    conn = undefined;
    receipt = undefined;
    tryid = undefined;
    countdown = fps*3;
    mine = "";
    foe = "";
    foebombs = new Array();
    perlinsent = false;
    
    peer = new Peer({key: apikey, debug:true});
    
    peer.on("open", function(id){
	console.log(id);
	mine = id;
	document.mainform.input_mine.value = id;
    });

    peer.on("connection", connect);

    

    // peer.on("connection", function(connection){
    // 	conn = connection;
    // 	console.log("conn", conn);
    // 	conn.on("data", function(data){
    // 	    console.log("listen:", data.type);
    // 	    receipt = data;
    // 	});
    // });
		      
}

function prepare_connection(foe_, mine_){
    mine = mine_;
    foe = foe_;
    console.log(mine, foe);
    // peer.on("connection", function(conn_){
    // 	conn_.on("data", function(data){
    // 	    console.log(data);
    // 	    receipt = data;
    // 	});
    // });

    var c = peer.connect(foe);
    c.on("open", function(){connect(c);});
    tryid = setInterval("try_connection()", 500);
    //peer.connect(foe_);
}

function try_connection(){
    if(conn != undefined){
	connect(conn);
	console.log("connection is established.");
	clearInterval(tryid);
    }
}


function is_owner(){
    return mine > foe;
}

function apply_receipt(){
    if(receipt == undefined || conn == undefined){
	return;
    }
    if(state_game == STATES_GAME.HANDSHAKING){
	console.log(receipt);
	if(receipt.type == "handshake"){
	    console.log("handshake end");
	    state_game = STATES_GAME.COUNTING;
	}
    }

    if(state_game == STATES_GAME.NO){
	if(receipt.type == "gameinfo"){
	    ship_blue.sprite.pos = receipt.ship.pos;
	    ship_blue.sprite.angle = receipt.ship.angle;
	    ship_blue.cursor.pos = receipt.ship.cursorpos;
	    ship_blue.waiting = receipt.ship.waiting;
	    foebombs = new Array();
	    for(l=0; l < receipt.bombinfo.length; l++){
		foebombs.push(new Bomb(receipt.bombinfo[l]));
		console.log(receipt.bombinfo[l]);
	    }
	}
	if(receipt.type == "winner"){
	    if(receipt.winner == mine){
		state_game = STATES_GAME.WIN_RED;
	    }else{
		state_game = STATES_GAME.WIN_BLUE;
	    }
	}
    }
}

function send_state(){
    bi = new Array();
    for(l=0; l < bombs.length; l++){
	bi.push(bombs[l].sprite.pos);
    }

    send({type:"gameinfo",
	       ship:{pos:ship_red.sprite.pos,
		     angle:ship_red.sprite.angle,
		     cursorpos:ship_red.cursor.pos,
		     waiting:ship_red.waiting},
	       bombinfo: bi});
}

function send(d_){
	conn.send(d_);
}
	   
function send_map(){
    for(xi=0; xi < MAP_WIDTH; xi++){
	for(eta=0; eta < MAP_HEIGHT; eta++){
	    send({type:"map",
		  x:xi, y:eta,
		  t:perlinmap[xi][eta]});
	}
    }
}
