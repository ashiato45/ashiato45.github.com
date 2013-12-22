var MAP_SIZE = 48;
var MAP_WIDTH = 624/MAP_SIZE;
var MAP_HEIGHT = 480/MAP_SIZE;

var TREE_GROWTH = 30*1;

var STATES_MAP = {BLANK: 0,
		 BUSH: 1,
		 TREE: 2};

var memo_length = [[], []];

function init_map(){
    w_ = MAP_WIDTH;
    h_ = MAP_HEIGHT;
    console.log(w_, h_);
    var a = new Array(w_);
    for(x=0; x < w_; x++){
	a[x] = new Array(h_);
	for(y=0; y < h_; y++){
	    a[x][y] = {state: STATES_MAP.BLANK};
	    //{state: STATES_MAP.BUSH, owner: RED}
	    //{state: STATES_MAP.TREE, height: 0, limit: 5}
	}
    }
    return a;
}

function map_test(map_){
    map_[1][1] = {state: STATES_MAP.BUSH, owner: RED};
    map_[1][2] = {state: STATES_MAP.BUSH, owner: RED};
    map_[2][2] = {state: STATES_MAP.BUSH, owner: RED};

    map_[2][4] = {state: STATES_MAP.BUSH, owner: RED};
    map_[1][3] = {state: STATES_MAP.BUSH, owner: BLUE};    
    map_[5][5] = {state: STATES_MAP.TREE, height: 7, limit: 7, age: 0};
    map_[10][8] = {state: STATES_MAP.TREE, height: 1, limit: 7, age: 0};
    return map_;
}
    


function draw_map(map_, ctx_){
    x_ = MAP_WIDTH;
    y_ = MAP_HEIGHT;
    for(x=0; x < w_; x++){
	for(y=0; y < h_; y++){
	    here = map_[x][y];
	    if(here.state === STATES_MAP.BLANK){
	    }else if(here.state === STATES_MAP.BUSH){
		if(here.owner === RED){
		    ctx_.drawImage(img_store["bush_red"], x*MAP_SIZE, y*MAP_SIZE);
		}else{
		    ctx_.drawImage(img_store["bush_blue"], x*MAP_SIZE, y*MAP_SIZE);
		}
	    }else if(here.state == STATES_MAP.TREE){
		ctx_.drawImage(img_store["tree"], x*MAP_SIZE, y*MAP_SIZE);
		ctx_.drawImage(img_store[here.height.toString()], x*MAP_SIZE, y*MAP_SIZE);
	    }
	}
    }
}

function is_mybush(color_, x, y){
    return (0 <= x && x < MAP_WIDTH)
    && (0 <= y && y < MAP_HEIGHT)
    && map[x][y].state == STATES_MAP.BUSH && map[x][y].owner == color_;
}

function copy_array(a){
    res = new Array();
    for(i=0; i < a.length; i++){
	res.push({x: a[i].x, y: a[i].y});
    }
    return res;
}

function longer(a, b){
    if(a.length > b.length){
	return copy_array(a);
    }else{
	return copy_array(b);
    }
    console.log("yabai");
}

function get_max_length(color_){
    currentmax = [];
    for(x=0; x < MAP_WIDTH; x++){
	for(y=0; y < MAP_HEIGHT; y++){
	    if(is_mybush(color_, x, y)){
		temp = new Array();
//		console.log(1, temp.length.toString(), currentmax.length.toString());
		memo_length[color_] = [];
		temp = get_max_path_help(color_, x, y, []);
//		console.log(2, temp.length.toString(), currentmax.length.toString());		
		currentmax = longer(temp, currentmax);
//		console.log(3, temp.length.toString(), currentmax.length.toString());
		console.log(color_, temp.length.toString());
	    }
	}
    }
    return currentmax;
}

function find_memo(color_, x_, y_, traced_){
    for(i in memo_length[color_]){
	if(i.x === x_ && i.y === y_ && i.traced.toString() === traced_.toString()){
	    return traced_;
	}
    }

    return null;
}

function find_traced(x_, y_, traced_){
    for(i=0; i < traced_.length; i++){
//	print_point(traced_[i]);
//	print_point({x: x_, y:y_});
	if(traced_[i].x === x_ && traced_[i].y === y_){
	    return true;
	}
    }
    return false;
}
function print_point(p){
    console.log(p.x.toString() + ", " + p.y.toString());
}

function print_trace(traced_){
    s = "trace:";
    for(x in traced_){
	s += "(" + traced_.x + ", " + traced_.y + ")";
    }
    console.log(s);
}

function get_max_path_help(color_, x_, y_, traced_){
//    print_trace(traced_);
    // temp = find_memo(color_, x_, y_, traced_);
    // if(temp != null){
    // 	return temp;
    // }

    if(!(is_mybush(color_, x_, y_))){
	return traced_;
    }

    if(find_traced(x_, y_, traced_)){
	return traced_;
    }
    
    traced_.push({x: x_, y: y_});
    
    var cmax = [];
    var temp = [];
    temp = get_max_path_help(color_, x_-1, y_, copy_array(traced_));
    cmax = longer(cmax, temp);
    temp = get_max_path_help(color_, x_+1, y_, copy_array(traced_));    
    cmax = longer(cmax, temp);
    temp = get_max_path_help(color_, x_, y_-1, copy_array(traced_));    
    cmax = longer(cmax, temp);
    temp = get_max_path_help(color_, x_, y_+1, copy_array(traced_));    
    cmax = longer(cmax, temp);

    memo_length[color_].push({x: x_, y: y_, traced: traced_});
    return copy_array(cmax);
}
