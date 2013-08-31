var img_store = new Array();

function load_image(name_, src_, width_, height_){
    img_store[name_] = new Image();
    img_store[name_].src = src_ + "?" + new Date().getTime();
    img_store[name_].loaded = false;
    img_store[name_].size = {width: width_, height: height_};
    img_store[name_].onload = function(){
	img_store[name_].loaded = true;
    };
}

function is_loaded_all_images(){
    for(var key in img_store){
	if(img_store[key].loaded == false){
	    return false;
	}
    }
    return true;
}

function load_images(){
    load_image("ship", "img/ship_red.png", 128, 128);
    load_image("ship_blue", "img/ship_blue.png", 128, 128);
    load_image("bomb", "img/bomb.png", 32, 32);
    load_image("cursor", "img/cursor.png", 32, 32);
    load_image("win_blue", "img/win_blue.png", 640, 480);
    load_image("win_red", "img/win_red.png", 640, 480);
    load_image("title", "img/title.png", 640, 480);
    load_image("handshaking", "img/handshaking.png", 640, 480);
    load_image(1, "img/1.png", 640, 480);
    load_image(2, "img/2.png", 640, 480);
    load_image(0, "img/0.png", 640, 480);
}
 

