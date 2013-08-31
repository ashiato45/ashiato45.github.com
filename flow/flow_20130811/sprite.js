var Sprite = function(image_, pos_, center_, angle_){
    this.image = image_;
    this.pos = pos_;
    this.center = {x:this.image.size.width/2,
		   y:this.image.size.height/2};
    this.angle = angle_;

}

Sprite.prototype.draw = function(ctx_){
    // ctx_.save();
    // ctx_.translate(this.pos.x, this.pos.y);
    
    // ctx_.rotate(this.angle);
    // ctx_.translate(-this.center.x,
    // 		   -this.center.y);
    // ctx_.drawImage(this.image, 0, 0);
    // ctx_.restore();
    
    p = [{x:this.pos.x, y:this.pos.y},
    	 {x:this.pos.x-WIDTH, y:this.pos.y},
    	 {x:this.pos.x+WIDTH, y:this.pos.y},
    	 {x:this.pos.x, y:this.pos.y + HEIGHT},
    	 {x:this.pos.x, y:this.pos.y - HEIGHT}];
    for(j=0; j < p.length; j++){
    	ctx_.save();
    	ctx_.translate(p[j].x, p[j].y);
	
    	ctx_.rotate(this.angle);
    	ctx_.translate(-this.center.x,
    		       -this.center.y);
    	ctx_.drawImage(this.image, 0, 0);
    	ctx_.restore();
    }
}

Sprite.prototype.warp = function(map_){
    p = get_pos_on_map(this.pos);
    if(p.x < 0){
	this.pos.x = WIDTH - 1;
    }
    if(p.x >= MAP_WIDTH){
	this.pos.x = 0;
    }
    if(p.y < 0){
	this.pos.y = HEIGHT - 1;
    }
    if(p.y >= MAP_HEIGHT){
	this.pos.y = 0;
    }
}
