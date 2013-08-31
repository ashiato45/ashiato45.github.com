
var shift = 0;
var octaves; //i”Ô‚ª2^(i+shift)‚Ì‘å‚«‚³
var n_octaves;
var size_map;
var perlinmap;
var persistence;

function log2(x){
    return Math.log(x)/L2;
}

function pow2(x){
    return Math.pow(2, x);
}

function init_plain(w_, h_){
    res = new Array(w_);
    for(x=0; x < w_; x++){
	res[x] = new Array(h_);
	for(y=0; y < h_; y++){
	    res[x][y] = 0;
	}
    }
    return res;
}

function f(x){
    return x;
}

function init_perlin(size_, persistence_){
    size_map = Math.ceil(log2(size_));
    persistence = persistence_;
    n_octaves = size_map - shift*2;
    octaves = new Array(n_octaves);
    for(i = 0; i <= n_octaves; i++){
	octaves[i] = init_plain(pow2(i + shift), pow2(i + shift));
	for(x = 0; x < octaves[i].length; x++){
	    for(y = 0; y < octaves[i].length; y++){
		octaves[i][x][y] = f(Math.random());
	    }
	}
    }
    make_perlinmap();
}

function make_perlinmap(){
    perlinmap = init_plain(pow2(size_map), pow2(size_map));
    for(x = 0; x < perlinmap.length; x++){
	for(y = 0; y < perlinmap.length; y++){
	    for(i = 0; i < octaves.length; i++){
		shrinked = shrink(i, x, y);
		perlinmap[x][y] += bilinear(i, shrinked.x, shrinked.y)*Math.pow(persistence, i);
	    }
	    if (persistence != 1){
		perlinmap[x][y] /= (1-Math.pow(persistence, octaves.length))/(1-persistence);
	    }else{
		perlinmap[x][y] /= octaves.length;
	    }
	}
    }
    console.log(perlinmap);
}

function map_to_angle(x){
    return x*2*Math.PI;
}

function get_perlin(x, y){
    return perlinmap[x][y];
}

function transition(t){
//    return 0.1*Math.pow((t-0.1), 3);

    return 0.000;
}

function test_go_perlin(){
    for(i=0; i < n_octaves; i++){
	for(x=0; x < octaves[i]; x++){
	    for(y=0; y < octaves[i]; y++){
		delta = transition(Math.random());
		cand = get_fractional_portion(octaves[i][x][y] + delta);
		octaves[i][x][y] += delta;
	    }
	}
    }
    make_perlinmap();
}

function go_perlin(){
    for(x=0; x < pow2(size_map); x++){
	for(y=0; y < pow2(size_map); y++){
	    perlinmap[x][y] += transition(Math.random());
	}
    }
}
	    

function shrink(i_, x_, y_){
    xi = octaves[i_].length * x_ / perlinmap.length;
    eta = octaves[i_].length * y_ / perlinmap.length;
    return {x:xi, y:eta};
}

function get_fractional_portion(x){
    return x - Math.floor(x);
}

function bilinear(i_, x_, y_){
    hrz = get_both_side(octaves[i_].length, x_);
    vrt = get_both_side(octaves[i_].length, y_);
    xi = get_fractional_portion(x_);
    eta = get_fractional_portion(y_);

    tl = octaves[i_][hrz.lower][vrt.lower];
    tr = octaves[i_][hrz.upper][vrt.lower];
    bl = octaves[i_][hrz.lower][vrt.upper];
    br = octaves[i_][hrz.upper][vrt.upper];

    return bilinear_unit(xi, eta, tl, tr, bl, br);
}

function test_bilinear_unit(x_, y_, tl_, tr_, bl_, br_){
    return tl_*(1-x_)*(1-y_) + bl_*(1-x_)*y_ + br_*x_*y_ + tr_*x_*(1-y_);
}

function bilinear_unit(x_, y_, tl_, tr_, bl_, br_){
    t = interpolate_angle(tl_, tr_, x_);
    b = interpolate_angle(bl_, br_, x_);
    return interpolate_angle(t, b, y_);
}

function get_both_side(len_, t_){
    left = Math.floor(t_ + 0.5) % len_;
    right = (left + 1) % len_;
    return {lower: left, upper: right};
}

function draw_line(ctx_, sx_, sy_, ex_, ey_){
    ctx_.moveTo(sx_, sy_);
    ctx_.lineTo(ex_, ey_);
}

function draw_line_polar(ctx_, sx_, sy_, size_, angle_){
    ctx_.moveTo(sx_, sy_);
    ctx_.lineTo(sx_ + size_*Math.cos(angle_), sy_ + size_*Math.sin(angle_));
}

function test_draw_perlin(ctx_, w_, h_, perlin_w_, perlin_h_){
    mgn_x = w_ / perlin_w_;
    mgn_y = h_ / perlin_h_;
    arrow_size = 10;
    for(x=0; x < perlin_w_; x++){
	for(y=0; y < perlin_h_; y++){
	    draw_line_polar(ctx_, (x + 0.5)*mgn_x, (y + 0.5)*mgn_y,
			    arrow_size, map_to_angle(get_perlin(x, y)));
	}
    }
}

function test_add_all(n){
    for(x=0; x < pow2(size_map); x++){
	for(y=0; y < pow2(size_map)/10; y++){
	    perlinmap[x][y] += n;
	}
    }
}

function interpolate_angle(a_, b_, t_){
    delta = get_fractional_portion(b_ - a_) - 0.5;
    return a_ + delta*t_;
}

function get_pos_on_map(pos){
    xi = Math.floor(MAP_WIDTH/WIDTH*pos.x);
    eta = Math.floor(MAP_HEIGHT/HEIGHT*pos.y);
    return {x:xi, y:eta};
}
    
