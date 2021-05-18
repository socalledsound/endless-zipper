import { titles, sounds } from '../../app/sounds-info/sounds'
import { createCirclePath, arcPoints } from './tooth-utils'
class Tooth {
    constructor(id, x, y){
        this.id = id;
        this.title = titles[this.id];
        this.src = sounds[this.id];
        this.pos = {
            x: x,
            y: y,
        }
        //numPoints, offsetX, offsetY, radius, length, thetaOffset
        this.path = createCirclePath(arcPoints());
    }

    playSound(){

    }

    render(){
        
    }

    update(){
        this.path = createCirclePath(arcPoints())
    }
}

export default Tooth