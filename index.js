// forked from t_furu's "Lチカ テスト用" http://jsdo.it/t_furu/eWBo
//LEDをチカチカさせる 正弦波 発生
var LED = function(frequencyL,frequencyR){
    this.isOn = false;    
    this.audio_context = null;
    this.audio_node = null;
    
    this.frequencyL = frequencyL;
    this.frequencyR = frequencyR;
    
    this.init = function(){
        this.audio_context = new webkitAudioContext();
    };
    
    //再生バッファ作成
    this.createAudioDataBuffer = function(context,frequencyL,frequencyR){
        context.samplingRate = 44100;
        var s = context.samplingRate * 2;
        var buffer = context.createBuffer(2, s, context.samplingRate);
        var audioDataL = buffer.getChannelData(0);
        var audioDataR = buffer.getChannelData(1);
        for(var i = 0; i < audioDataL.length; i++){
            var l = Math.sin(2 * Math.PI * frequencyL * i / context.samplingRate);
            var r = Math.sin(2 * Math.PI * frequencyR * i / context.samplingRate);
            audioDataL[i] = l;
            audioDataR[i] = r*-1;
        }
        return buffer;
    };
    
    //LEDをオン
    this.on = function(){
        if(this.isOn == false){
            this.isOn = true;
            
            //バッファーを設定
            this.audio_node = this.audio_context.createBufferSource();
            this.audio_node.buffer = this.createAudioDataBuffer(this.audio_context,this.frequencyL,this.frequencyR);
            this.audio_node.loop = true;
            this.audio_node.connect(this.audio_context.destination);
        }
        this.audio_node.noteOn(0);
    };
    
    //LEDをオフ
    this.off = function(){
        if(this.isOn){
            this.isOn = false;
            this.audio_node.noteOff(0);
        }
    };
    
    this.init();
}

var Page = function(){
    this.led1 = new LED(100,100);
    this.led2 = new LED(100,1);
    this.led3 = new LED(100,10);
    this.led4 = new LED(100,4);
    
    this.init = function(){
        $("#btnLed1").click($.proxy(this.clickBtnLed1,this));
        $("#btnLed2").click($.proxy(this.clickBtnLed2,this));
        $("#btnLed3").click($.proxy(this.clickBtnLed3,this));
        $("#btnLed4").click($.proxy(this.clickBtnLed4,this));
    };
   
    this.allOff = function(){
        this.led1.off();
        this.led2.off();
        this.led3.off();
        this.led4.off();
    };
    
    //LED の ON/OFF
    this.clickBtnLed1 = function( ev ){
        this.allOff();
        if(this.led1.isOn == false){
           this.led1.on();
        }
    };
    
    //点滅1
    this.clickBtnLed2 = function( ev ){
        this.allOff();
        if(this.led2.isOn == false){
           this.led2.on();
        }
    };
    
     //点滅2
     this.clickBtnLed3 = function( ev ){
        this.allOff();
        if(this.led3.isOn == false){
           this.led3.on();
        }
    };
    
     //点滅3
     this.clickBtnLed4 = function( ev ){
         this.allOff();
         if(this.led4.isOn == false){
           this.led4.on();
        }
    };
};

var page = new Page();
$(function(){
    page.init();
})