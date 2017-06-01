
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {UpdateAction} from "../actions/UpdateAction";
import {TalkAction} from "../actions/TalkAction";
import {MoveAction} from "../actions/MoveAction";
import {Action} from "../actions/Action";
import {AppearAction} from "../actions/AppearAction";

export class Cupboard extends SceneObject {
    private open: boolean = false;

    constructor(play: Play) {
        super(play, Cupboard.IDENTIFIER, 250*4, 43*4, 'placardClose');
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (null !== this.play_.getInventoryObject()) {
            return super.use(origin, pointer);
        }

        let actions: Array<Action> = [
            new MoveAction(this.play_, pointer.position.x)
        ];

        if (this.open) {
            actions.push(new UpdateAction(this.play_, this, 'placardClose'));
        } else {
            actions.push(new UpdateAction(this.play_, this, 'placardOpen'));
            actions.push(new AppearAction(this.play_, 'engrais'));
        }
        this.open = !this.open;

        return actions;
    }

    static get IDENTIFIER() {
        return 'cupboard';
    }

    toFrench(): string {
        return 'le placard';
    }
}

