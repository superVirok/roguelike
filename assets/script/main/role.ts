const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    tipOpenPanelHero: cc.Node = null;
    @property(cc.Node)
    tipOpenPanelAirdrop: cc.Node = null;
    @property(cc.Node)
    tipOpenPanelWeapon: cc.Node = null;
    @property(cc.Node)
    tipOpenPanelOrder: cc.Node = null;
    @property(cc.Node)
    tipOpenPanelDiscrecorder: cc.Node = null;

    @property(cc.Node)
    tipOpenPanelCollection: cc.Node = null;

    protected onLoad(): void {

    }


    onCollisionEnter(other: any, self: any) {
        if (other.tag == 1) {
            this.tipOpenPanelHero.active = true;
        }
        else if (other.tag == 2) {
            this.tipOpenPanelWeapon.active = true;
        }
        else if (other.tag == 3) {
            this.tipOpenPanelOrder.active = true;
        }
        else if (other.tag == 4) {
            this.tipOpenPanelAirdrop.active = true;
        }
        else if (other.tag == 5) {
            this.tipOpenPanelDiscrecorder.active = true;
        }
        else if (other.tag == 6) {
            this.tipOpenPanelCollection.active = true;
        }
    }

    onCollisionExit(other: any, self: any) {
        if (other.tag == 1) {
            this.tipOpenPanelHero.active = false;
        }
        else if (other.tag == 2) {
            this.tipOpenPanelWeapon.active = false;
        }
        else if (other.tag == 3) {
            this.tipOpenPanelOrder.active = false;
        }
        else if (other.tag == 4) {
            this.tipOpenPanelAirdrop.active = false;
        }
        else if (other.tag == 5) {
            this.tipOpenPanelDiscrecorder.active = false;
        }
        else if (other.tag == 6) {
            this.tipOpenPanelCollection.active = false;
        }
    }



    start() {

    }

    update(dt) {

    }
}
