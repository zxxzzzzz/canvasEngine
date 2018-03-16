window.onload = function() {
    
    // var ctx = c.getContext("2d")
    // ctx.fillStyle="black";
    // ctx.fillRect(0,0,300,150);
    // var drawer1 = Drawer.myDrawer(ctx)
    // var sprite1 = Spirit.createNewSplit('point',1,96,32,32,32)
    //DrawBoard.init('canvasId')
    Engine.start('myCanvas')
    var mario = []
    mario[0] = Spirit.createNewSplit('mario',0,0,1,0,54,48,54)
    mario[1] = Spirit.createNewSplit('mario',0,0,1,48,54,48,54)
    mario[2] = Spirit.createNewSplit('mario',0,0,1,96,54,48,54)
    mario[3] = Spirit.createNewSplit('mario',0,0,1,144,54,48,54)
    DrawBoard.add(mario[0])
    // var c = document.getElementById('myCanvas')
    // ctx = c.getContext("2d")
    // ctx.drawImage(document.getElementById('mario'), 0, 0, 54, 
    //     54, 0, 0, 50, 50)
    // myEvent.addEvent('myCanvas', 'mousemove',function(e){
    //     Drawer.myDrawer().clearScreen()
    //     drawer1.drawSpirit(sprite1, e.x-16, e.y-16)
    // })
    
    

}



var DrawBoard = {
    spiritArr:[], //spirit数组
    ctx:null,
    width:0,
    height:0,
    init:function(canvasId, width=0, height=0){ 
        var c = document.getElementById(canvasId)
        this.ctx = c.getContext("2d")
        if(width == 0 || height == 0){
            c.width = window.screen.width
            c.height = window.screen.height
        }
        this.width = c.width
        this.height = c.height
    },
    add:function(spirit){
        this.spiritArr.push(spirit)
    },
    drawSpirit:function(spirit){
        this.ctx.drawImage(spirit.img, spirit.sx, spirit.sy, spirit.swidth, 
            spirit.sheight, spirit.x, spirit.y, spirit.width, spirit.height)
    },
    draw:function(){
        this.ctx.clearRect(0, 0, this.width, this.height)   
        this.spiritArr.forEach(spirit => {
            spirit.putOn()
        });
    }
}




var Spirit = {
    createNewSplit:function(src='', x=0, y=0, scale=1, sx=0, sy=0, swidth=0, sheight=0){
        var spirit = {
        }
        spirit.img = document.getElementById(src); //img的id即是src
        spirit.x = 0
        spirit.y = 0
        spirit.sx = sx
        spirit.sy = sy
        spirit.swidth = swidth
        spirit.sheight = sheight
        spirit.scale = scale //缩放比例
        spirit.width = spirit.swidth*scale //精灵大小：宽
        spirit.height = spirit.sheight*scale //精灵大小：长
        spirit.mode = 's' //s = split 剪切下来的精灵
        spirit.putOn = function(){  //把精灵放进画板
            DrawBoard.drawSpirit(spirit)
        }
        spirit.move = function(x, y){
            spirit.x = spirit + x
            spirit.y = spirit + y
        }
        return spirit
    },
}




var Engine = {
    plan:[],
    start:function(canvasId){
        DrawBoard.init(canvasId)
        setInterval(function(){
            DrawBoard.draw()
        },16)
    }    
}
var myEvent = {
    addEvent:function(domId='',eventName='',func=function(){}){
        document.getElementById(domId).addEventListener(eventName,func)
    }
}
