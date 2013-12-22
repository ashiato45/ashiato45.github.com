var NUMBER_SIZE = 128;
var MARKER_SIZE = 48;

function draw_number(x_, y_, n_, ctx_, size_, bias_){
    size = size_;
    bias = bias_;
    a = [0, 0, 0];
    a[0] = Math.floor(n_ / 100);
    n_ = n_ % 100;
    a[1] = Math.floor(n_ / 10);
    n_ = n_ % 10;
    a[2] = n_;
//    console.log(n_, a[0], a[1], a[2]);
    for(i=0; i < 3; i++){
	ctx_.drawImage(img_store[a[i].toString() + "l"],
		       x_ + (size - bias)*i,
		       y_,
		      size, size);
    }
}
