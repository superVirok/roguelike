
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {




    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
    }

    start() {
        let uiLayer: cc.Node = cc.find("Canvas/uiLayer");
        for (let child of uiLayer.children) {
            child.zIndex = -child.y;
        }


    }

    // update (dt) {}
}
