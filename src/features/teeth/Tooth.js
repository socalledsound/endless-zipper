import { titles, sounds } from '../../app/sounds-info/sounds'
import { Bezier, Bezier2 } from './bezier-utils'

// import { createCirclePath, arcPoints } from './tooth-utils'
// import { createLinePath, linePoints } from './tooth-utils'
class Tooth {
    constructor(idx, reverse, center, offsetY, lineHeight, canvasWidth ){
        this.id = idx;
        this.reverse = reverse;
        this.text = titles[idx];
        this.soundSrc = sounds[idx];
        this.center = center;
        this.offsetY = offsetY;
        this.lineHeight = lineHeight;
        this.canvasWidth = canvasWidth;
        this.originStartY = reverse ? (idx + 1) * lineHeight + offsetY : (idx + 1)  * lineHeight + offsetY + lineHeight/2;
        this.originStartX = reverse ? center + 500 :  center - 500;
        this.ribbon = this.createRibbon(idx, reverse, center, offsetY, lineHeight, canvasWidth)
        this.dir = 1;
        this.inc = Math.random() * 3 + 1;
        this.playable = false
        this.playing = false

        //numPoints, x1, y1, x2, y2
        // this.path = createLinePath(linePoints(20, this.pos.x, this.pos.y, window.innerWidth, this.pos.y + 100));
    }


    createRibbon(idx, reverse, center, offsetY, lineHeight, canvasWidth){

        const ribbon = reverse ? 
            {
            maxChar : 50,
            startX : this.originStartX,
            startY : (idx + 1) * lineHeight + offsetY,
            c1x : center - canvasWidth/4,
            // c1y : offsetY - window.innerHeight/4,
             c1y :(idx + 1)  * lineHeight + offsetY,
            c2x : center - canvasWidth/2,
            // c2y : offsetY + window.innerHeight/4,
             c2y :(idx + 1)  * lineHeight + offsetY,
            endX : -200,
            endY : (idx + 1)  * lineHeight + offsetY,
            }
            :
                {
                maxChar : 50,
                startX : this.originStartX,
                startY : (idx + 1)  * lineHeight + offsetY + lineHeight/2,
                c1x : center + canvasWidth/4,
                // c1y : offsetY - window.innerHeight/4,
                c1y :(idx + 1)  * lineHeight + offsetY  + lineHeight/2,
                c2x : center + canvasWidth/2,
                // c2y : offsetY + window.innerHeight/4,
                c2y :(idx + 1) * lineHeight + offsetY  + lineHeight/2,
                endX : canvasWidth + 200,
                endY : (idx + 1)  * lineHeight + offsetY  + lineHeight/2,
                }
            
                

        return ribbon        
    }

    drawCurve(ctx, ribbon){
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(ribbon.startX, ribbon.startY)
        ctx.bezierCurveTo(ribbon.c1x, ribbon.c1y, ribbon.c2x, ribbon.c2y, ribbon.endX, ribbon.endY)
        ctx.stroke()
        ctx.restore()
    }

    curveRibbon(top, curved){
        // console.log(top, this.originStartY)
        this.dist = top - this.originStartY
        const newStartY = this.originStartY - (this.dist * 4);
        const curve = newStartY > this.originStartY ? newStartY : this.originStartY
        const flatDisplace = newStartY < this.originStartY ? newStartY : this.originStartY 
        const newPos = curved ? curve : flatDisplace
        return {
            ...this.ribbon,
            startY: newPos,
            startX : this.reverse ? this.originStartX - this.dist : this.originStartX + this.dist,
        }
    }


    fillRibbon(ctx, text, ribbon){

        const textCurve = [];
        const trimmedText = text.substring(0, ribbon.maxChar);
        const curveSample = 1000;
    
    
        
        var i = 0;
        for (i = 0; i < curveSample; i++) {
            const a = new Bezier2(i / curveSample, ribbon.startX, ribbon.startY, ribbon.c1x, ribbon.c1y, ribbon.c2x, ribbon.c2y, ribbon.endX, ribbon.endY);
            const b = new Bezier2((i + 1) / curveSample, ribbon.startX, ribbon.startY, ribbon.c1x, ribbon.c1y, ribbon.c2x, ribbon.c2y, ribbon.endX, ribbon.endY);
            const c = new Bezier(a, b, 0);
            textCurve.push({
                bezier: a,
                curve: c.curve
            });
        }
    
        const letterPadding = ctx.measureText(" ").width / 4;
        const w = trimmedText.length;
        const ww = Math.round(ctx.measureText(trimmedText).width);
    
    
        const totalPadding = (w - 1) * letterPadding;
        const totalLength = ww + totalPadding;
        let p = 0;
    
        const cDist = textCurve[curveSample - 1].curve.cDist;
    
        const z = (cDist / 2) - (totalLength / 2);
    
        for (let i = 0; i < curveSample; i++) {
            if (textCurve[i].curve.cDist >= z) {
                p = i;
                break;
            }
        }
    
        for (let i = 0; i < w; i++) {
            ctx.save();
            ctx.translate(textCurve[p].bezier.point.x, textCurve[p].bezier.point.y);
            ctx.rotate(textCurve[p].curve.rad);
            ctx.fillText(trimmedText[i], 0, 0);
            ctx.restore();
    
            const x1 = ctx.measureText(trimmedText[i]).width + letterPadding;
            let x2 = 0;
            for (let j = p; j < curveSample; j++) {
                x2 = x2 + textCurve[j].curve.dist;
                if (x2 >= x1) {
                    p = j;
                    break;
                }
            }
    
    
    
    
        }
    }


    render(ctx){
        ctx.font = "50px arial black";
        // this.drawCurve(ctx, this.ribbon)
        this.fillRibbon(ctx, this.text, this.ribbon)
    }

    update(top, curve){
            // const adjustedTop = top - 20
            if(this.ribbon.startY < top){
                this.playable = true
                // console.log(this.ribbon.startY)
              this.ribbon = this.curveRibbon(top, curve); 
            }else{
                this.playable = false
            }
        }
        


        // if(this.ribbon.c1y > window.innerHeight * 0.9 || this.ribbon.c1y < -200){
        //     this.dir *= -1
        // }
        // this.ribbon.c1y += this.inc * this.dir;
        // this.ribbon.c2y -= this.inc * this.dir;
        // this.offsetY -= this.inc/3;
        // this.ribbon = this.createRibbon(this.id, this.offsetX, this.offsetY, this.canvasWidth)
    //}
}

export default Tooth