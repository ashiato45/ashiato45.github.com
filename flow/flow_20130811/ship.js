var speed = 1;
var CURSOR = {LEFT:0, RIGHT:1};
var DIST = 100;
var RADIUS_SHIP = 35;
var RADIUS_BOMB = 12;
var ATTACK_LIMIT = 30*10;

var Ship = function(image_, pos_, angle_, ka_){
    this.sprite = new Sprite(image_, pos_,
			     {x:image_.size.width/2, y:image_.size.height/2},
			     angle_);
    this.cursor = new Sprite(img_store["cursor"], pos_,
			     {x:img_store["cursor"].size.width/2,
			      y:img_store["cursor"].size_height/2},
			     0);
    this.target = CURSOR.LEFT;
    this.key_assign = ka_;
    this.waiting = 0;
}

Ship.prototype.get_cursor_pos = function(){
    p = {x:0, y:0};
    if(this.target == CURSOR.LEFT){
	p.x = (-1)*DIST*Math.sin(this.sprite.angle);
	p.y = DIST*Math.cos(this.sprite.angle);
    }else{
	p.x = DIST*Math.sin(this.sprite.angle);
	p.y = (-1)*DIST*Math.cos(this.sprite.angle);
    }

    p.x += this.sprite.pos.x;
    p.y += this.sprite.pos.y;
    
    p.x = get_fractional_portion(p.x/WIDTH)*WIDTH;
    p.y = get_fractional_portion(p.y/HEIGHT)*HEIGHT;
    
    return p;
}

Ship.prototype.switch_cursor = function(){
    if(this.target == CURSOR.LEFT){
	this.target = CURSOR.RIGHT;
    }else{
	this.target = CURSOR.LEFT;
    }
}

Ship.prototype.draw = function(ctx_){
    this.sprite.draw(ctx_);
    if(this.waiting == 0){
	this.cursor.draw(ctx_);
    }
}

Ship.prototype.init_angle = function(map_){
//    p = this.get_pos_on_map(map_);
    p = get_pos_on_map(this.sprite.pos);
    this.sprite.angle = map_to_angle(map_[p.x][p.y]);
}

// Ship.prototype.get_pos_on_map = function(map_){
//     xi = Math.floor(MAP_WIDTH/WIDTH*this.sprite.pos.x);
//     eta = Math.floor(MAP_HEIGHT/HEIGHT*this.sprite.pos.y);
//     return {x:xi, y:eta};
// }

Ship.prototype.attack = function(){
    if(this.waiting == 0){
	b = new Bomb(this.get_cursor_pos());
	sprites.push(b);
	bombs.push(b);
	this.waiting = ATTACK_LIMIT;
    }
}

Ship.prototype.update = function(map_){
//    p = this.get_pos_on_map(map_);
    p = get_pos_on_map(this.sprite.pos);
    x = p.x;
    y = p.y;
    flow = map_to_angle(map_[x][y]);
    // this.sprite.pos.x += speed*Math.cos(flow);
    // this.sprite.pos.y += speed*Math.sin(flow);

    if(this.waiting > 0){
	this.waiting -= 1;
    }

    omega = 0.02;
    if(keydict[this.key_assign.left]){
	this.sprite.angle -= omega;
    }
    if(keydict[this.key_assign.right]){
	this.sprite.angle += omega;
    }
    if(keydowndict[this.key_assign.attack] == true){
	this.attack();
    }
    if(keydowndict[this.key_assign.sw]){
	this.switch_cursor();
    }
    
    // dist = 0;
    // angle_ship_flow = this.sprite.angle - flow;
    // deltax = speed*(dist*Math.cos(angle_ship_flow)*Math.cos(flow)
    // 		    + (1-dist)*Math.sin(angle_ship_flow)*Math.sin(flow));
    // deltay = speed*(dist*Math.cos(angle_ship_flow)*Math.sin(flow)
    // 		    - (1-dist)*Math.sin(angle_ship_flow)*Math.cos(flow));
    // this.sprite.pos.x += deltax;
    // this.sprite.pos.y += deltay;

    this.sprite.pos.x += speed*Math.cos(this.sprite.angle);
    this.sprite.pos.y += speed*Math.sin(this.sprite.angle);
    this.sprite.warp();

    r = 0.99;
    if(this.sprite.angle + flow != 0){
	this.sprite.angle = (r*this.sprite.angle + (1-r)*flow);
    }

    this.cursor.pos = this.get_cursor_pos()
}

function sq(x){
    return x*x;
}

Ship.prototype.check_bomb_small = function(b){
    dx = this.sprite.pos.x - b.sprite.pos.x;
    dy = this.sprite.pos.y - b.sprite.pos.y;
    R2 = sq(RADIUS_BOMB + RADIUS_SHIP)
    if(sq(dx) + sq(dy) <= R2 ||
       sq(dx - WIDTH) + sq(dy) <= R2 ||
       sq(dx + WIDTH) + sq(dy) <= R2 ||
       sq(dx) + sq(dy + HEIGHT) <= R2 ||
       sq(dx) + sq(dy - HEIGHT) <= R2){
	return true;
    }
    return false;
}

Ship.prototype.check_bomb = function(){
    for(k=0; k < bombs.length; k++){
//	console.log(k, bombs[k].sprite.pos.x, bombs[k].sprite.pos.y);
	if(this.check_bomb_small(bombs[k])){
	    return true;
	}
    }
    return false;
}

