import { Res } from "./lib/res"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {



    start() {
        Res.loadRes();
        // this.scheduleOnce(() => {
        //     if (!cc.sys.localStorage.getItem("account")) {
        //         let account = Res.getRes("json", "account").json;
        //         cc.sys.localStorage.setItem("account", JSON.stringify(account));
        //     }
        //     cc.director.loadScene("main");
        // }, 1)

        this.scheduleOnce(() => {
            if (!cc.sys.localStorage.getItem("account")) {
                let account = Res.getRes("json", "account").json;
                cc.sys.localStorage.setItem("account", JSON.stringify(account));
            }
            cc.director.loadScene("game");
        }, 1)
    }

    // update (dt) {}
}
