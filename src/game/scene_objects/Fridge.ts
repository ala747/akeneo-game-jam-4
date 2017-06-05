
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {UpdateAction} from "../actions/UpdateAction";
import {TalkAction} from "../actions/TalkAction";
import {MoveAction} from "../actions/MoveAction";
import {Action} from "../actions/Action";
import {AppearAction} from "../actions/AppearAction";
import {DisappearAction} from "../actions/DisappearAction";
import {SimpleGame} from "../../app";

export class Fridge extends SceneObject {
    private open: boolean = false;

    constructor(play: Play) {
        super(play, Fridge.IDENTIFIER, 294*SimpleGame.SCALE, 42*SimpleGame.SCALE, 'fridgeClose');
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (null !== this.play_.getCursor().getInventoryObject()) {
            return super.use(origin, pointer);
        }

        let actions: Array<Action> = [
            new MoveAction(this.play_, pointer.position.x)
        ];
        if (this.open) {
            actions.push(new UpdateAction(this.play_, this, 'fridgeClose'));
            actions.push(new DisappearAction(this.play_, 'coldMeat'));
        } else {
            actions.push(new UpdateAction(this.play_, this, 'fridgeOpen'));
            actions.push(new AppearAction(this.play_, 'coldMeat'));
        }
        this.open = !this.open;

        return actions;
    }

    protected lookAt(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (this.open) {
            return [
                new TalkAction(this.play_, this.play_.getBaby(), "Il fait froid la d'dans"),
            ];
        } else {
            return super.lookAt(origin, pointer);
        }
    }

    static get IDENTIFIER() {
        return 'fridge';
    }

    toFrench(): string {
        return 'le freezer';
    }
}

