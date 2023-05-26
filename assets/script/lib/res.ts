class Res {
    private static table = {
        "prefab": {
            "path": "prefab",
            type: cc.Prefab
        },
        "panel": {
            "path": "panel",
            type: cc.Prefab
        },
        "enemy": {
            "path": "enemy",
            type: cc.Prefab
        }
    }

    private static res = {};
    private static fileList = [];

    static loadRes() {
        for (let path in Res.table) {
            this.res[path] = {};
            cc.loader.loadResDir(path, Res.table[path]["type"], (err, resource) => {
                if (err) {
                    console.log("------load failed", resource);
                }
                else console.log("------load success", resource);
                this.fileList = resource;
                for (let res of resource) {
                    this.res[path][res.name] = res;
                }
            })
        }
    }

    static getFileList(path: string) {
        return this.fileList;
    }

    static getRes(path: string, name: string) {
        return this.res[path][name]
    }
}

export { Res }
