var keydict = {};
var keydowndict = {};
var keydowndict_temp = {};
var KEYCODE = {LEFT:37,
	       UP:38,
	       RIGHT:39,
	       DOWN:40,
	      SPACE:32,
	      A:65,
	      D:68,
	      W:87,
	      S:83,
	      ENTER:13,
	      F8:119,
	      BACKSLASH: 220,
	      Q: 81,
	      R:82};

var keyevents = new Array();

var EVENT_TYPE = {KEYUP: 0,
		  KEYDOWN: 1};

document.onkeydown = function(e){
    keydict[e.which] = true;
}

document.onkeyup = function(e){
    keydict[e.which] = false;
    keydowndict_temp[e.which] = true;
}

function is_keydown(code_){
    if(keydict[code_] == undefined || keydict[code_] == 0){
	return false;
    }
    return true;
}

function is_keypressed(code_){
    if(keydowndict[code_] == undefined || keydowndict[code_] == false){
	return false;
    }
    return true;
}

function keyboard_update(){
    keydowndict = keydowndict_temp;
    keydowndict_temp = {};
}
