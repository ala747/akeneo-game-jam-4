
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {Action} from "../actions/Action";
import {MoveAction} from "../actions/MoveAction";
import {UpdateAction} from "../actions/UpdateAction";
import {Say} from "../actions/Say";
import {RemoveInventoryAction} from "../actions/RemoveInventoryAction";

export class Gamelle extends SceneObject {
    private full: boolean = false;

    constructor(play: Play) {
        super(play, 'gamelleVide', 192*4, 50*4, 'gamelleVide');
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let inventoryObject = this.play_.getInventoryObject();
        if (null !== inventoryObject) {
            if (inventoryObject.getIdentifier() === 'steakLexomil') {
                this.full = true;

                return [
                    new Say(this.play_, this.play_.mainGroupObject('dog'), 'Ouaf!'),
                    new MoveAction(this.play_, pointer.position.x),
                    new RemoveInventoryAction(this.play_, inventoryObject),
                    new UpdateAction(this.play_, this, 'gamellePleine'),
                    new MoveAction(this.play_, pointer.position.x),
                    new Say(this.play_, this.play_.mainGroupObject('dog'), 'Ouaf!'),
                    new MoveAction(this.play_, pointer.position.x + 50),
                    new MoveAction(this.play_, pointer.position.x + 49),
                    new Say(this.play_, this.play_.mainGroupObject('dog'), 'ouaf ...'),
                    new MoveAction(this.play_, pointer.position.x + 100),
                    new MoveAction(this.play_, pointer.position.x + 99),
                    new Say(this.play_, this.play_.mainGroupObject('dog'), '...'),
                    new MoveAction(this.play_, pointer.position.x + 150),
                    new MoveAction(this.play_, pointer.position.x + 149),
                    new Say(this.play_, this.play_.mainGroupObject('dog'), 'zzzzzzz'),
                    new MoveAction(this.play_, pointer.position.x + 200),
                    new MoveAction(this.play_, pointer.position.x + 199),
                    new Say(this.play_, this.play_.mainGroupObject('dog'), 'zzzzzzzzzzz'),
                    new Say(this.play_, this.play_.getBaby(), 'Hahahaha!')
                ];
            }
            if (inventoryObject.getIdentifier() === 'icesteak') {
                return [new Say(this.play_, this.play_.getBaby(), "Je suis pas un barbare il va se peter les dents")];
            }
            if (inventoryObject.getIdentifier() === 'steak') {
                return [new Say(this.play_, this.play_.getBaby(), "Je pense qu'il manque l'ingredient du chef")];
            }
        }

        return super.use(origin, pointer);
    }

    protected lookAt(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (this.full) {
            return [
                new Say(this.play_, this.play_.getBaby(), "J'ai pas tres envie de gouter, tiens"),
            ];
        } else {
            return [
                new Say(this.play_, this.play_.getBaby(), "Je ferais mieux de donner à manger au chien avant qu'il me mange"),
            ];
        }
    }
}
