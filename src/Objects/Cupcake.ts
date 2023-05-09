import Frosting from "./Frosting";
import Liner from "./Liner";

export default class Cupcake {

    frosting: Frosting;
    liner: Liner;

    constructor(frosting: Frosting, liner: Liner) {        
        this.frosting = frosting;
        this.liner = liner;
    }

    printCupcake(): void {
        console.log(`Frosting: ${this.frosting ? this.frosting.key : "Null"}\nLiner: ${this.liner ? this.liner.key : "Null"}`)
    }
    
    reset(){
        this.frosting.resetImage();
        this.liner.resetImage();
    }
}