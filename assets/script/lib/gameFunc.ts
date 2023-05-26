import { Res } from "../lib/res"
class GameFunc {
    private static enemyList: any = null;
    private static startTime: number = null;
    private static endTime: number = null;
    private static maxEnemyNum: number = 0;
    private static timeObj: Object = {}
    private static bgSizex = 720;
    private static bgSizey = 1280;

    static gameInit() {
        let dt = new Date();
        this.startTime = dt.getTime();
        this.enemyList = Res.getFileList("enemy");
        cc.log(this.enemyList)
        for (let i in this.enemyList) {
            this.timeObj[i] = this.enemyList[i];
        }
    }
    static setMaxEnemyNum(num: number) {
        this.maxEnemyNum = num;
    }

    static addEnemy(enemyMgr: cc.Node) {
        if (enemyMgr.children.length >= this.maxEnemyNum) {
            return;
        }
        let dt = new Date();
        let enemyNum = Math.floor((dt.getTime() - this.startTime) / 1000 / 120);
        let enemy = cc.instantiate(this.timeObj[enemyNum]);
        enemy.x = (Math.random() - 0.5) * this.bgSizex;
        enemy.y = (Math.random() - 0.5) * this.bgSizey;
        enemyMgr.addChild(enemy);
        enemy.active = true;
    }
    static getTime() {
        let dt = new Date();
        let diffSec = Math.floor((dt.getTime() - this.startTime) / 1000);
        let min = `${Math.floor(diffSec / 60 / 10)} ${Math.floor(diffSec / 60 % 10)}`;
        let sec = `${Math.floor(diffSec % 60 / 10)} ${Math.floor(diffSec % 60 % 10)}`;
        let dtString = `${min}:${sec}`;
        return dtString;
    }

}

export { GameFunc }