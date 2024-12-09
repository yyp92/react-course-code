import * as THREE from 'threejs/three.js'
import TWEEN from 'tween/tween.js'
import BasicRubik from 'object/Rubik.js'
import TouchLine from 'object/TouchLine.js'
import ResetBtn from 'object/ResetBtn.js'
import DisorganizeBtn from 'object/DisorganizeBtn.js'
import SaveBtn from 'object/SaveBtn.js'
import RestoreBtn from 'object/RestoreBtn.js'
import ChangeBtn from 'object/ChangeBtn.js'
import UIComponent from 'object/UIComponent.js'

const Context = canvas.getContext('webgl');

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 绘图上下文
    this.context = Context;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    // 原点
    this.viewCenter = new THREE.Vector3(0, 0, 0);
    // 正反视图至少占25%区域
    this.minPercent = 0.25;
    // 正视角魔方名称
    this.frontViewName = 'front-rubik';
    // 反视角魔方名称
    this.endViewName = 'end-rubik';

    // 光线碰撞检测器
    this.raycaster = new THREE.Raycaster();
    // 目标魔方
    this.targetRubik;
    // 非目标魔方
    this.anotherRubik;
    // 魔方是否正在转动
    this.isRotating = false;
    // 碰撞光线穿过的元素
    this.intersect;
    // 触摸平面法向量
    this.normalize;
    // 触摸点
    this.startPoint;
    // 移动点
    this.movePoint;

    this.initThree();
    this.initCamera();
    this.initScene();
    this.initLight();
    this.initObject();
    this.render();
  }

  /**
   * 初始化渲染器
   */
  initThree() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      context: this.context
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xFFFFFF, 1.0);
    canvas.width = this.width * window.devicePixelRatio;
    canvas.height = this.height * window.devicePixelRatio;
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  /**
   * 初始化相机
   */
  initCamera() {
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1500);
    /**
     * 相机放置在Z轴上方便计算；
     * Z轴坐标需要除以屏幕宽高比保证魔方在不同宽高比的屏幕中宽度所占的比例基本一致
     */
    this.camera.position.set(0, 0, 300 / this.camera.aspect);
    // 正方向
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(this.viewCenter);

    // 透视投影相机视角为垂直视角，根据视角可以求出原点所在裁切面的高度，然后已知高度和宽高比可以计算出宽度
    this.originHeight = Math.tan(22.5 / 180 * Math.PI) * this.camera.position.z * 2;
    this.originWidth = this.originHeight * this.camera.aspect;

    // UI元素逻辑尺寸和屏幕尺寸比率
    this.uiRadio = this.originWidth / window.innerWidth;
  }

  /**
   * 初始化光线
   */
  initScene() {
    this.scene = new THREE.Scene();
  }

  /**
   * 初始化光线
   */
  initLight() {
    this.light = new THREE.AmbientLight(0xfefefe);
    this.scene.add(this.light);
  }

  /**
   * 初始化物体
   */
  initObject() {
    //正视角魔方
    this.frontRubik = new BasicRubik(this);
    this.frontRubik.model(this.frontViewName);
    this.frontRubik.resizeHeight(0, 1);

    // 反视角魔方
    this.endRubik = new BasicRubik(this);
    this.endRubik.model(this.endViewName);
    this.endRubik.resizeHeight(0, -1);

    // 滑动条
    this.touchLine = new TouchLine(this);
    // 默认正视图占85%区域，反视图占15%区域
    this.rubikResize((1 - this.minPercent), this.minPercent);
    this.enterAnimation();

    // 还原按钮
    this.resetBtn = new ResetBtn(this);

    // 打乱按钮
    this.disorganizeBtn = new DisorganizeBtn(this);

    // 保存按钮
    this.saveBtn = new SaveBtn(this);

    // 读取按钮
    this.restoreBtn = new RestoreBtn(this);

    // 变阶按钮
    this.changeBtn = new ChangeBtn(this);
  }

  /**
   * 渲染
   */
  render() {
    this.renderer.clear();

    if (this.tagRubik) {
      this.tagRubik.group.rotation.x += 0.01;
      this.tagRubik.group.rotation.y += 0.01;
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this), canvas);
  }

  /**
   * 初始化事件
   */
  initEvent() {
    wx.onTouchStart(this.touchStart.bind(this));
    wx.onTouchMove(this.touchMove.bind(this));
    wx.onTouchEnd(this.touchEnd.bind(this));
  }

  /**
   * 触摸开始
   */
  touchStart(event) {
    var touch = event.touches[0];
    this.startPoint = touch;
    if (this.touchLine.isHover(touch)) {
      this.touchLine.enable();
    }
    else if (this.resetBtn.isHover(touch) && !this.isRotating) {
      this.resetBtn.enable();
      this.resetRubik();
    }
    else if (this.disorganizeBtn.isHover(touch) && !this.isRotating) {
      this.disorganizeBtn.enable();
      this.disorganizeRubik();
    }
    else if (this.saveBtn.isHover(touch) && !this.isRotating) {
      this.saveBtn.enable();
      this.saveRubik();
    }
    else if (this.restoreBtn.isHover(touch) && !this.isRotating) {
      this.restoreBtn.enable();
      this.restoreRubik();
    }
    else {
      this.getIntersects(event);
      // 触摸点在魔方上且魔方没有转动
      if (!this.isRotating && this.intersect) {
        // 开始转动，设置起始点
        this.startPoint = this.intersect.point;
      }

      // 触摸点没在魔方上
      if (!this.isRotating && !this.intersect) {
        this.startPoint = new THREE.Vector2(touch.clientX, touch.clientY);
      }
    }
  }

  /**
   * 触摸移动
   */
  touchMove(event) {
    var touch = event.touches[0];

    // 滑动touchline
    if (this.touchLine.isActive) {
      this.touchLine.move(touch.clientY);
      var frontPercent = touch.clientY / window.innerHeight;
      var endPercent = 1 - frontPercent;
      this.rubikResize(frontPercent, endPercent);
    }
    else if(!this.resetBtn.isActive && !this.disorganizeBtn.isActive && !this.saveBtn.isActive && !this.restoreBtn.isActive) {
      this.getIntersects(event);

      // 移动点在魔方上且魔方没有转动
      if (!this.isRotating && this.startPoint && this.intersect) {
        this.movePoint = this.intersect.point;

        // 触摸点和移动点不一样则意味着可以得到滑动方向
        if (!this.movePoint.equals(this.startPoint)) {
          this.rotateRubik();
        }
      }

      // 触摸点没在魔方上
      if (!this.isRotating && this.startPoint && !this.intersect) {
        this.movePoint = new THREE.Vector2(touch.clientX, touch.clientY);
        if (!this.movePoint.equals(this.startPoint)) {
          this.rotateView();
        }
      }
    }
  }

  /**
   * 触摸结束
   */
  touchEnd() {
    this.touchLine.disable();
    this.resetBtn.disable();
    this.disorganizeBtn.disable();
    this.saveBtn.disable();
    this.restoreBtn.disable();
  }

  /**
   * 进场动画
   */
  enterAnimation() {
    var self = this;
    var isAnimationEnd = false;
    
    // 目标状态
    var endStatus = {
      rotateY: this.frontRubik.group.rotation.y,
      y: this.frontRubik.group.position.y,
      z: this.frontRubik.group.position.z
    }

    // 把魔方设置为动画开始状态
    this.frontRubik.group.rotateY(-90 / 180 * Math.PI);
    this.frontRubik.group.position.y += this.originHeight/3;
    this.frontRubik.group.position.z -= 350;

    // 开始状态
    var startStatus = {
      rotateY: this.frontRubik.group.rotation.y,
      y: this.frontRubik.group.position.y,
      z: this.frontRubik.group.position.z
    }

    var tween = new TWEEN.Tween(startStatus)
      .to(endStatus, 2000)
      .easing(TWEEN.Easing.Quadratic.In)
      .onUpdate(function () {
        self.frontRubik.group.rotation.y = startStatus.rotateY;
        self.frontRubik.group.position.y = startStatus.y
        self.frontRubik.group.position.z = startStatus.z
      })
      .onComplete(function() {
        isAnimationEnd = true;
      });

    function animate(time) {
      if (!isAnimationEnd){
        requestAnimationFrame(animate);
        TWEEN.update();
      }
    }

    setTimeout(function(){
      tween.start();
      requestAnimationFrame(animate);
    },500)

    this.disorganizeRubik(function () {
      // 进场动画结束之后才能进行手动操作
      self.initEvent();
    })
  }

  /**
   * 转动魔方
   */
  rotateRubik() {
    var self = this;
    // 转动标识置为true
    this.isRotating = true;
    // 计算滑动方向
    var sub = this.movePoint.sub(this.startPoint);
    // 获得方向
    var direction = this.targetRubik.getDirection(sub, this.normalize);
    var cubeIndex = this.intersect.object.cubeIndex;
    this.targetRubik.rotateMove(cubeIndex, direction);
    var anotherIndex = cubeIndex - this.targetRubik.minCubeIndex + this.anotherRubik.minCubeIndex;

    this.anotherRubik.rotateMove(anotherIndex, direction, function () {
      self.resetRotateParams();
    });
  }

  /**
   * 转动视图
   */
  rotateView() {
    var self = this;
    if (this.startPoint.y < this.touchLine.screenRect.top) {
      this.targetRubik = this.frontRubik;
      this.anotherRubik = this.endRubik;
    } else if (this.startPoint.y > this.touchLine.screenRect.top + this.touchLine.screenRect.height) {
      this.targetRubik = this.endRubik;
      this.anotherRubik = this.frontRubik;
    }
    if (this.targetRubik && this.anotherRubik) {
      this.isRotating = true;//转动标识置为true
      //计算整体转动方向
      var targetType = this.targetRubik.group.childType;
      var cubeIndex = this.getViewRotateCubeIndex(targetType);
      var direction = this.getViewDirection(targetType, this.startPoint, this.movePoint);
      this.targetRubik.rotateMoveWhole(cubeIndex, direction);
      this.anotherRubik.rotateMoveWhole(cubeIndex, direction, function () {
        self.resetRotateParams();
      });
    }
  }

  /**
   * 获得视图转动方块索引
   */
  getViewRotateCubeIndex(type) {
    if (type == this.frontViewName) {
      return 10;
    }
    else {
      return 65;
    }
  }

  /**
   * 获得视图转动方向
   */
  getViewDirection(type,startPoint,movePoint){
    var direction;
    var rad = 30 * Math.PI / 180;
    var lenX = movePoint.x - startPoint.x;
    var lenY = movePoint.y - startPoint.y;

    if (type == this.frontViewName) {
      if (startPoint.x > window.innerWidth / 2) {
        if (Math.abs(lenY) > Math.abs(lenX) * Math.tan(rad)){
          if(lenY<0){
            direction = 2.1;
          }else{
            direction = 3.1;
          }
        }else{
          if(lenX>0){
            direction = 0.3;
          }else{
            direction = 1.3;
          }
        }
      }
      else {
        if (Math.abs(lenY) > Math.abs(lenX) * Math.tan(rad)) {
          if (lenY < 0) {
            direction = 2.4;
          } else {
            direction = 3.4;
          }
        } else {
          if (lenX > 0) {
            direction = 4.4;
          } else {
            direction = 5.4;
          }
        }
      }
    }
    else {
      if (startPoint.x > window.innerWidth / 2) {
        if (Math.abs(lenY) > Math.abs(lenX) * Math.tan(rad)) {
          if (lenY < 0) {
            direction = 2.2;
          } else {
            direction = 3.2;
          }
        } else {
          if (lenX > 0) {
            direction = 1.4;
          } else {
            direction = 0.4;
          }
        }
      }
      else {
        if (Math.abs(lenY) > Math.abs(lenX) * Math.tan(rad)) {
          if (lenY < 0) {
            direction = 2.3;
          } else {
            direction = 3.3;
          }
        } else {
          if (lenX > 0) {
            direction = 5.3;
          } else {
            direction = 4.3;
          }
        }
      }
    }
    return direction;
  }

  /**
   * 重置魔方转动参数
   */
  resetRotateParams(){
    this.isRotating = false;
    this.targetRubik = null;
    this.anotherRubik = null;
    this.intersect = null;
    this.normalize = null;
    this.startPoint = null;
    this.movePoint = null;
  }

  /**
   * 获取操作焦点以及该焦点所在平面的法向量
   */
  getIntersects(event) {
    var touch = event.touches[0];
    var mouse = new THREE.Vector2();
    mouse.x = (touch.clientX / this.width) * 2 - 1;
    mouse.y = -(touch.clientY / this.height) * 2 + 1;
    this.raycaster.setFromCamera(mouse, this.camera);
    var rubikTypeName;

    if (this.touchLine.screenRect.top > touch.clientY) {
      this.targetRubik = this.frontRubik;
      this.anotherRubik = this.endRubik;
      rubikTypeName = this.frontViewName;
    } else if (this.touchLine.screenRect.top + this.touchLine.screenRect.height < touch.clientY) {
      this.targetRubik = this.endRubik;
      this.anotherRubik = this.frontRubik;
      rubikTypeName = this.endViewName;
    }

    // Raycaster方式定位选取元素，可能会选取多个，以第一个为准
    var targetIntersect;
    for (var i = 0; i < this.scene.children.length; i++) {
      if (this.scene.children[i].childType == rubikTypeName) {
        targetIntersect = this.scene.children[i];
        break;
      }
    }
    if (targetIntersect) {
      var intersects = this.raycaster.intersectObjects(targetIntersect.children);
      if (intersects.length >= 2) {
        if (intersects[0].object.cubeType === 'coverCube') {
          this.intersect = intersects[1];
          this.normalize = intersects[0].face.normal;
        } else {
          this.intersect = intersects[0];
          this.normalize = intersects[1].face.normal;
        }
      }
    }
  }

  /**
   * 正反魔方区域占比变化
   */
  rubikResize(frontPercent, endPercent) {
    this.frontRubik.resizeHeight(frontPercent, 1);
    this.endRubik.resizeHeight(endPercent, -1);
  }

  /**
   * 重置正反视图魔方
   */
  resetRubik(){
    this.frontRubik.reset();
    this.endRubik.reset();
  }

  /**
   * 扰乱正反视图魔方
   */
  disorganizeRubik(callback){
    var self = this;
    if(!this.isRotating){
      this.isRotating = true;
      var stepArr = this.frontRubik.randomRotate();
      this.endRubik.runMethodAtNo(stepArr, 0, function() {
        if (callback){
          callback();
        }
        self.resetRotateParams();
      });
    }
  }

  /**
   * 存储魔方
   */
  saveRubik(){
    wx.showLoading({
      title: '存档中...',
      mask:true
    })

    if (!this.tagRubik) {
      this.tagRubik = new BasicRubik(this);
      this.tagRubik.model();
    }
    var tagPosition = this.saveBtn.getPosition();
    tagPosition.y -= this.saveBtn.height / 2 + 15;
    this.tagRubik.save(this.frontRubik, tagPosition, 0.05);
    this.scene.add(this.tagRubik.group);

    // 添加灰色半透明背景
    if (!this.tagRubikBg) {
      this.tagRubikBg = new UIComponent(this);
      this.tagRubikBg.loadStyle({
        width: 64,
        height: 64,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        radius: 8
      });
    } else {
      this.tagRubikBg.showInScene();
    }
    this.tagRubikBg.setPosition(tagPosition.x, tagPosition.y, tagPosition.z);

    setTimeout(function(){
      wx.hideLoading()
    },500)
  }

  /**
   * 读取魔方
   */
  restoreRubik(){
    if (this.tagRubik){
      this.frontRubik.save(this.tagRubik);
      this.endRubik.save(this.tagRubik);

      if (this.tagRubik) {
        this.scene.remove(this.tagRubik.group);
      }
      if (this.tagRubikBg) {
        this.tagRubikBg.hideInScene();
      }
    }
  }
}
