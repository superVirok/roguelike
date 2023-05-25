class Res {
    private static table = {
        "prefab": {
            "path": "prefab",
            type: cc.Prefab,
        },
        "panel": {
            "path": "panel",
            type: cc.Prefab,
        }
    }

    private static res = {};


    static loadRes() {
        for (let path in Res.table) {
            this.res[path] = {};
            cc.loader.loadResDir(path, Res.table[path]["type"], (err, resource) => {
                if (err) {
                    console.log("------load failed", resource);
                }
                else console.log("------load success", resource);
                for (let res of resource) {
                    this.res[path][res.name] = res;
                }
            })
        }
    }

    static getRes(path: any, name: any) {
        return Res.res[path][name]
    }
}

export { Res }
