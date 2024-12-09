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
        },
        handleReady(event) {
            this.scene = event.detail.value;
            const xrFrameSystem = wx.getXrFrameSystem();
            this.camera = this.scene.getElementById('camera').getComponent(xrFrameSystem.Camera);
            this.miku = this.scene.getElementById('miku');
            this.tmpV3 = new xrFrameSystem.Vector3();
        },
        handleTouchModel(event){
            console.log(event)
            console.log("触摸了头盔")
        },
        handleTick(event) {
            // console.log(event)
            this.miku && this.getScreenPosition(this.miku);
        },
        getScreenPosition(el) {
            const xrFrameSystem = wx.getXrFrameSystem();
            this.tmpV3.set(
                el.getComponent(xrFrameSystem.Transform).worldPosition
            );
            const clipPos = this.camera.convertWorldPositionToClip(this.tmpV3);
            const {frameWidth, frameHeight} = this.scene;
            let x = ((clipPos.x + 1) / 2) * frameWidth;
            let y =(1- ((clipPos.y + 1) / 2)) * frameHeight
            // console.log(x,y)
            this.triggerEvent('mikuPos', [x, y]);
        }
        
    }
})
