import { titles, sounds } from '../../app/sounds-info/sounds'

class Tooth {
    constructor(id){
        this.id = id;
        this.title = titles[this.id];
        this.src = sounds[this.id];
    }

    playSound(){

    }

    render(){
        
    }
}