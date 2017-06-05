
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {Action} from "../actions/Action";
import {TalkAction} from "../actions/TalkAction";
import {MoveAction} from "../actions/MoveAction";
import {Father} from "./Father";
import {AddInventoryAction} from "../actions/AddInventoryAction";
import {BouteilleAlcool} from "../inventory_objects/BouteilleAlcool";
import {RemoveInventoryAction} from "../actions/RemoveInventoryAction";
import {DisappearAction} from "../actions/DisappearAction";
import {SimpleGame} from "../../app";

export class Bouteille extends SceneObject {
    constructor(play: Play) {
        super(play, Bouteille.IDENTIFIER, 382*SimpleGame.SCALE, 41*SimpleGame.SCALE, 'bouteille');
    }

    toFrench(): string {
        return "la bouteille d'eau de vie";
    }

    protected pickUp(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let father = <Father> this.play_.getMainGroup().getObject(Father.IDENTIFIER);
        if (!father.isBusy()) {
            return [
                new MoveAction(this.play_, pointer.position.x),
                new TalkAction(this.play_, father, "Touche pas a ca fils de pute!"),
                new TalkAction(this.play_, this.play_.getBaby(), "Faudrait que je detourne son attention...")
            ];
        }
        else {
            return [
                new MoveAction(this.play_, pointer.position.x),
                new DisappearAction(this.play_, Bouteille.IDENTIFIER),
                new AddInventoryAction(this.play_, BouteilleAlcool.IDENTIFIER),
                new TalkAction(this.play_, this.play_.getBaby(), "Fais moi penser a gouter!")
            ];
        }
    }

    static get IDENTIFIER()
    {
        return 'bouteille';
    }
}
