import { Func } from "../lib/func"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    onClose() {
        Func.closePanel(this.node);
    }

    start() {

    }

    // update (dt) {}
}
