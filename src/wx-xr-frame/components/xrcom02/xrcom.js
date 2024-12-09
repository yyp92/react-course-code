// components/xrcom01/xrcom.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        textureId: ""
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleAssetsProgress(event) {
            console.log("AssetsProgress")
            console.log(event)
        },
        
        handleAssetsLoad(event) {
            console.log("Load")
            console.log(event)
            this.scene.event.add('touchstart', () => {
                this.scene.ar.placeHere('setitem', true)
            }) 
        },

        handleReady(event) {
            this.scene = event.detail.value;
        }, 
    }
})
