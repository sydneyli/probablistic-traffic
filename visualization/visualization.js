class GridAnimation {
    // width, height: size of grid
    constructor(el, agents, roadX, info, crashedTime) {
        this.crashedTime = crashedTime;
        this.canvas = el;
        this.width = 0;
        this.height = 0;
        this.agents = agents;
        for (var a = 0; a < agents.length; a++) {
            var agent = agents[a];
            for (var l = 0; l < agent.locs.length; l++) {
                var loc = agent.locs[l];
                if (loc[0] > this.width) this.width = loc[0];
                if (loc[1] > this.height) this.height = loc[1];
            }
        }
        this.width += 4;
        this.height += 2;
        // tilesize in px
        this.tilesize = 30;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.canvas.width = this.width * this.tilesize;
        this.ctx.canvas.height = this.height * this.tilesize;
        this.time = 0;
        this.timestep = 500;
        this.maxtime = 0;
        $(".obj").remove();
        for (var a = 0; a < agents.length; a++) {
            var agent = agents[a];
            console.log(agent);
            $(".bg").prepend("<div class='obj a"+a+" "+agent.name+"'></div>");
            $(".a"+a).css('top', (this.tilesize * agent.locs[0][1]) + "px");
            $(".a"+a).css('left', (this.tilesize * agent.locs[0][0]) + "px");
            if (agent.locs.length > this.maxtime) this.maxtime = agent.locs.length;
        }
        this.info = info;
        this.drawBackground(roadX);
    }

    drawBackground(roadX) {
        this.ctx.fillStyle="#339933";
        this.ctx.fillRect(0, 0, this.width*this.tilesize, this.height*this.tilesize);
        this.ctx.fillStyle="#606060";
        this.ctx.fillRect(roadX[0]*this.tilesize, 0, (roadX[1] - roadX[0])*this.tilesize, this.height*this.tilesize);
    }

    animateStep(i) {
        var x = this;
        for (var k = 0; k < Object.keys(this.info).length; k++) {
            var key = Object.keys(this.info)[k];
            setTimeout( function() {
                $("." + key).text(""+x.info[key][i]);
                console.log(""+x.info[key][i]);
            }, this.timestep * i);
        }
        if (this.crashedTime >= 0) {
            console.log("CRASH!!!");
            setTimeout(function() {
                $(".bogac").addClass("crashed");
            }, this.timestep * this.crashedTime);
        }
        for (var a = 0; a < x.agents.length; a++) {
            var $agent = $(".a" + a);
            $agent.animate({
                left: x.agents[a].locs[i][0] * x.tilesize,
                top: x.agents[a].locs[i][1] * x.tilesize
            }, {
                duration: this.timestep,
                easing: 'linear'
            });
        }
    }

    animate(done) {
         var x = this;
         for (var t = 1; t < this.maxtime; t++) {
             this.animateStep(t);
         }
         setTimeout(done, (this.maxtime + 1) * this.timestep);
    }
}
