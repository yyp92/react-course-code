# 魔方

## 源码目录介绍
```
./js
├── base                                   // 定义游戏开发基础类
│   ├── animatoin.js                       // 帧动画的简易实现
│   ├── pool.js                            // 对象池的简易实现
│   └── sprite.js                          // 游戏基本元素精灵类
├── libs
│   ├── symbol.js                          // ES6 Symbol简易兼容
│   └── weapp-adapter.js                   // 小游戏适配器
├── npc
│   └── enemy.js                           // 敌机类
├── player
│   ├── bullet.js                          // 子弹类
│   └── index.js                           // 玩家类
├── runtime
│   ├── background.js                      // 背景类
│   ├── gameinfo.js                        // 用于展示分数和结算界面
│   └── music.js                           // 全局音效管理器
├── databus.js                             // 管控游戏状态
└── main.js                                // 游戏入口主函数

```



## 资料
- [快速上手](https://developers.weixin.qq.com/minigame/dev/guide/)
- [finscn/weapp-adapter](https://github.com/finscn/weapp-adapter)


## 视角控制
- [飞行控件FlyControls](https://threejs.org/examples/?q=contr#misc_controls_fly)
- [第一人称控件FirstPersonControls](https://threejs.org/examples/?q=cont#misc_controls_pointerlock)
- [轨道空间控件OrbitControls](https://threejs.org/examples/?q=cont#misc_controls_orbit)


## 注意事项
`不能使用最新版的threejs`


## 资料
- [源代码的资料库](https://github.com/newbieYoung/Threejs_rubik/tree/master/lesson/demo2)
- [tween - JavaScript 实现的补间动画库](https://github.com/tweenjs/tween.js)