!(function(window,undefined){
  var JDelay=(function(){
    var delay=function(){
        this.query=[];
        this.state=0;
        return this;
    }
    delay.prototype={
         wait:function(timer){
        var waitFn=function(){
            setTimeout(function(){
                this.state=0
                this.__next();
             }.bind(this),timer);
        } 
        this.query.push(waitFn);
        return this.__next();
    },
    fn:function(fun){
        if(typeof fun==="function")
            this.query.push(function(){
                fun.bind(this)();
                this.state=0;
                this.__next();
            });
        else if(typeof fun==="string"){
            this.query.push(function(){
                var func=(new Function(fun));
                func.bind(this)();
                this.state=0;
                this.__next();
            })
        }
        return this;
    },
    __next:function(){
       if (this.state == 1)return this;
             this.state = 1;
        if(this.query.length===0) return;
        var fn=this.query.shift();
        fn&&fn.bind(this)();
        return this;
    }
    }
    return {
        wait:function(time){
            return (new delay()).wait(time);
        },
        fn:function(fun){
           return (new delay()).fn(fun);
        }
    };

  })();
  console.log(JDelay);
  window.JDelay=JDelay;
}(window));