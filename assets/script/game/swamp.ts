const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    enemyMgr: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    }

    start() {

    }

    // update (dt) {}
}
