import { Res } from "../lib/res"
class GameFunc {
    private static enemyList: any = null;
    private static startTime: number = null;
    private static curTime: number = 0;
    private static maxEnemyNum: number = 0;
    private static timeObj: Object = {}
    private static bgSizex = 1440;
    private static bgSizey = 2560;

    static gameInit(enemyMgr: cc.Node) {
        let dt = new Date();
        this.startTime = 0;
        this.enemyList = Res.getFileList("enemy");
        this.enemyList.sort((a: any, b: any) => {
            const value1 = +(a.name.substring(a.name.indexOf("y") + 1));
            const value2 = +(b.name.substring(a.name.indexOf("y") + 1));
            return value1 - value2;
        })
        for (let i in this.enemyList) {
            this.timeObj[i] = this.enemyList[i];
        }
        for (let i = 0; i < 10; i++) {
            this.addEnemy(enemyMgr);
        }

    }
    static setMaxEnemyNum(num: number) {
        this.maxEnemyNum = num;
    }

    static addEnemy(enemyMgr: cc.Node) {
        if (enemyMgr.children.length >= this.maxEnemyNum) {
            return;
        }
        let enemyNum = Math.floor(Math.floor((this.curTime - this.startTime) / 120));
        if (enemyNum >= this.enemyList.length - 1) {
            enemyNum = this.enemyList.length - 1;
        }
        let enemy = cc.instantiate(this.timeObj[enemyNum]);
        enemy.x = (Math.random() - 0.5) * this.bgSizex;
        enemy.y = (Math.random() - 0.5) * this.bgSizey;
        enemyMgr.addChild(enemy);
        enemy.active = true;
    }
    static getTime(dt: any) {
        this.curTime += dt;
        let min = `${Math.floor(this.curTime / 60 / 10)} ${Math.floor(this.curTime / 60 % 10)}`;
        let sec = `${Math.floor(this.curTime % 60 / 10)} ${Math.floor(this.curTime % 60 % 10)}`;
        let dtString = `${min}:${sec}`;
        return dtString;
    }
}

export { GameFunc }

