var ctx;
var size = 512.0;

function loadPie(){
    ctx = document.getElementById("canvasMain").getContext("2d");
    var img = new Image();
    console.log(img);
    img.src = "pie.png?" + new Date().getTime();
    img.onload = function(){
	ctx.drawImage(img, 0, 0);
    }
}

function goPie(){
//    var data = ctx.getImageData(0, 0, 512, 512);
    var cv = document.getElementById("canvasMain");
    var img = new Image();
    img.src = cv.toDataURL("image/png");
    ctx.clearRect(0, 0, size,  size);
    img.onload = function(){
	ctx.drawImage(img, 0, size/2, size, size/2, 0, 0, size/3, size);
	ctx.drawImage(img, 0, 0, size, size/2, size/3*2, 0, size/3, size);
    }
}

onload = loadPie;
