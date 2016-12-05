class GridAnimation {
    // width, height: size of grid
    constructor(el, width, height, agentLocs) {
        this.canvas = el;
        this.width = width;
        this.height = height;
        this.agentLocs = agentLocs;
        // tilesize in px
        this.tilesize = 50;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.canvas.width = width * this.tilesize;
        this.ctx.canvas.height = height * this.tilesize;
        this.time = 0;
        this.timestep = 200;
        this.maxtime = 0;
        for (var a = 0; a < agentLocs.length; a++) {
            $("body").prepend("<div class='obj a"+a+"'></div>");
            $(".a"+a).css('top', (this.tilesize * agentLocs[a][0][1]) + "px");
            $(".a"+a).css('left', (this.tilesize * agentLocs[a][0][0]) + "px");
            if (agentLocs[a].length > this.maxtime) this.maxtime = agentLocs[a].length;
        }
    }

    drawMap() {
        for (var x = 0; x <= this.width; x++) {
            this.ctx.moveTo(x * this.tilesize, 0);
            this.ctx.lineTo(x * this.tilesize, this.height * this.tilesize);
            this.ctx.stroke();
        }
        for (var y = 0; y <= this.height; y++) {
            this.ctx.moveTo(0, y * this.tilesize);
            this.ctx.lineTo(this.width * this.tilesize, y * this.tilesize);
            this.ctx.stroke();
        }
    }

    animateStep(i) {
        var x = this;
        for (var a = 0; a < x.agentLocs.length; a++) {
            var $agent = $(".a" + a);
            $agent.animate({
                left: x.agentLocs[a][i][0] * x.tilesize,
                top: x.agentLocs[a][i][1] * x.tilesize
            }, {
                duration: this.timestep,
                easing: 'linear'
            });
        }
    }

    animate() {
         this.drawMap();
         var x = this;
         for (var t = 1; t < this.maxtime; t++) {
             this.animateStep(t);
         }
    }
}
