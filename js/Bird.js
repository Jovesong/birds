/**
 * Created by Administrator on 2016/8/18.
 */

//var pillarArr = new Array();
var count = 0;
var kongxi = 150;
var flag = 0;
window.onload = function(){
    var canvas = document.getElementById('canvas');    //获取id为canvas的对象即画布
    var context = canvas.getContext('2d');            //上下文
    var bird = new Bird(context,100,200,["img/bird0_0.png","img/bird0_1.png","img/bird0_2.png"]);
    var pillar = new Pillar(context,['img/pipe_down.png','img/pipe_up.png']);
    var timer = setInterval(function(){
        context.clearRect(0,0,288,512);
        Background(context);
        bird.draw();
        pillar.draw();
        if(judge(bird,pillar,timer) == 1){
            //查看得分以及是否重新开始
            if(confirm("game over!!! your score:" + count)){
                count = 0;
                location.reload();//重新开始
            }
        }
    },300);

}

//画背景
function Background(context){
    var img = new Image();
    img.src = 'img/atlas.png'
    context.drawImage(img,0,0,288,512,0,0,288,512);
}

//画小鸟
function Bird(context,x,y,images){
    this.context = context;
    this.x = x;
    this.y = y;
    this.imgArr = new Array();
    var _this = this;
    for(var i = 0; i < images.length; i++){
        var img = new  Image();
        img.src = images[i];
        this.imgArr[i] = img;
    }

    var index = 0;
    //小鸟飞
    this.timer = setInterval(function(){
        index++;
    },500);

    //画小鸟
    this.draw = function(){
        var  img = _this.imgArr[index%3];
        _this.y += 30;
        _this.context.drawImage(img,_this.x,_this.y,48,48);
    }

    // 从键盘获取空格键并使小鸟飞
    document.onkeydown = function(e) {
        var e = e||window.event;
        var currkey = e.keyCode;
            console.log(currkey);
            switch (currkey){
                case 32:{
                        _this.y -= 80;
                    break;
                }
            }
    }
    //清除定时器
    this.clearTime = function(){
        clearInterval(this.timer);
    }
}

//画柱子
function  Pillar(context,images){
    this.context = context;
    this.upheight = Math.floor(Math.random()*299 - 288);
    this.downheight = this.upheight + 320 + kongxi;
    this.x = 288;
    var _this = this;
    this.imgArr = [];
    for(var i = 0; i < images.length; i++){
        var img = new  Image();
        img.src = images[i];
        this.imgArr[i] = img;
    }

    //画水管
    this.draw = function(){
         _this.x -= 5;
        _this.context.drawImage(this.imgArr[0],_this.x,this.upheight,52,320);
        _this.context.drawImage(this.imgArr[1],_this.x,this.downheight,52,320);
        if(_this.x <= -52 ){
            _this.x = 288;
            flag = 0;
        }

    }

}

//判断游戏是否结束
function judge(bird,pillar,time){
    //小鸟碰到天花板
    if(bird.y <= 0){
        bird.clearTime();
        clearInterval(time);
        return 1;
    }

    // 小鸟掉在地上
    if(bird.y >= 464){
        bird.clearTime();
        clearInterval(time);
        return 1;
    }

    //小鸟碰到上水管
    if(bird.x + 48 >= pillar.x && bird.x <= pillar.x + 52 && bird.y <= pillar.upheight+320){
        bird.clearTime();
        clearInterval(time);
        return 1;
    }

    //小鸟碰到下水管
    if(bird.x + 48 >= pillar.x && bird.x <= pillar.x + 52 && bird.y >= pillar.downheight){
        bird.clearTime();
        clearInterval(time);
        return 1;
    }

    // 得分
    if(pillar.x + 52 < bird.x){
        if(flag == 0){
            count++;
            flag = 1;
        }
    }
    return 0;
}