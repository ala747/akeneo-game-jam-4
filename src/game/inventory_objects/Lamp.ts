

import {InventoryObject} from "./InventoryObject";
import Play from "../state/Play";
import {SceneObject} from "../scene_objects/SceneObject";
import {Action} from "../actions/Action";
import {Battery} from "./Battery";

export class Lamp extends InventoryObject
{
    constructor(play: Play)
    {
        super(play, Lamp.IDENTIFIER, 'Il manque les piles!');
    }

    protected mixObjects(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (this.play_.getInventoryObject().getIdentifier() === Battery.IDENTIFIER) {

            this.play_.getInventory().addItem('lampePiles');
            this.play_.getInventory().removeItem(this);
            this.play_.getInventory().removeItem(this.play_.getInventoryObject());
            this.play_.detachInventoryObject();

            return [];
        }

        return super.mixObjects(origin, pointer);
    }

    toFrench(): string {
        return 'la lampe UV';
    }

    static get IDENTIFIER()
    {
        return 'neon';
    }
}