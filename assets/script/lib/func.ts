import { Res } from "../lib/res"
class Func {
    static openPanel(path: any, fileName: any) {
        let panelLayer = cc.find("Canvas/panelLayer");
        let node = panelLayer.getChildByName(fileName);
        if (!node) {
            node = cc.instantiate(Res.getRes(path, fileName));
            panelLayer.addChild(node);
        }
        node.scale = 0;
        node.active = true;
        node.runAction(
            cc.sequence(
                cc.scaleTo(0.2, 1.1),
                cc.scaleTo(0.2, 1.0)
            )
        )
    }

    static changePanel(panel: cc.Node, path: any, fileName: any) {
        panel.removeAllChildren();
        let node = cc.instantiate(Res.getRes(path, fileName));
        panel.addChild(node);
        node.active = true;
    }

    static closePanel(node: cc.Node) {
        node.runAction(
            cc.sequence(
                cc.scaleTo(0.2, 1.1),
                cc.scaleTo(0.2, 0.8),
                cc.callFunc(() => {
                    node.active = false;
                })
            )

        )
    }
}

export { Func }