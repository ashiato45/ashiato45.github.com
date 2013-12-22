var Bomb = function(pos_){
    image_ = img_store["bomb"];
    this.sprite = new Sprite(image_, {x:pos_.x, y:pos_.y},
			     {x:image_.size.width/2, y:image_.size.height/2},
			     0);
}

Bomb.prototype.update = function(map_){
    p = get_pos_on_map(this.sprite.pos);
    flow = map_to_angle(map_[p.x][p.y]);
    bomb_speed = 2;
    this.sprite.pos.x += bomb_speed*Math.cos(flow);
    this.sprite.pos.y += bomb_speed*Math.sin(flow);
    this.sprite.warp();
}


Bomb.prototype.draw = function(ctx_){
    this.sprite.draw(ctx_);
}
