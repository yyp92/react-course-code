import { OrbitControls, useTexture } from '@react-three/drei'
import { Canvas, useLoader, useThree, type ThreeEvent } from '@react-three/fiber'
import { Suspense, forwardRef, useImperativeHandle, useRef } from 'react';
import * as THREE from 'three'
import { SRGBColorSpace } from 'three';
import { DecalGeometry, DRACOLoader, GLTFLoader } from 'three/examples/jsm/Addons.js';

interface TshirtRef {
    changeTShirtColor: (color: string) => void,
    changeTShirtPic: (src: string) => void
}

interface ColorListProps {
    onColorChange: (color: string) => void
}

interface ImgListProps {
    onImgChange: (src: string) => void
}


const Tshirt = forwardRef<TshirtRef>((props, ref) => {
    useImperativeHandle(ref, () => {
        return {
            changeTShirtColor,
            changeTShirtPic
        }
    })

    const gltf = useLoader(
        GLTFLoader,
        'tshirt.glb',
        (loader) => {
            const dracoLoader = new DRACOLoader()
            dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
            loader.setDRACOLoader(dracoLoader)
        }
    )
    gltf.scene.scale.setScalar(1000)

    // 用 useThree 拿到 scene
    const { scene } = useThree()

    let texture: THREE.Texture
    // 用 useTexture 加载纹理图片
    useTexture('./sky.png', (tex) => {
        tex.colorSpace = SRGBColorSpace
        texture = tex
    })

    function changeTShirtColor(color: string) {
        // 从 scene 中根据 name 查找到 tshirt
        const mesh = scene.getObjectByName('tshirt') as THREE.Mesh

        if (mesh) {
            (mesh.material as THREE.MeshBasicMaterial).color.set(color)
        }
    }

    function changeTShirtPic(src: string) {
        const mesh = scene.getObjectByName('pic') as THREE.Mesh

        if (mesh) {
            const loader = new THREE.TextureLoader()
            loader.load(src, (newTexture) => {
                newTexture.colorSpace = SRGBColorSpace;
                texture = newTexture;
                (mesh.material as THREE.MeshBasicMaterial).map = newTexture
            })
        }
    }


    return (
        <primitive
            object={gltf.scene}
            onClick={(evt: ThreeEvent<MouseEvent>) => {
                const obj = evt.object as THREE.Mesh
                const orientation = new THREE.Euler()
                const size = new THREE.Vector3(200, 200, 200)
                const point = new THREE.Vector3(
                    -10.13280644533589,
                    -3.576284627765639,
                    132.9475744655756
                )

                // 用 api 的方式创建一个 Mesh，指定几何体为贴花几何体 DecalGeometry，指定材质为 MeshPhongMaterial
                const geometry = new DecalGeometry(obj, point, orientation, size)
                const material = new THREE.MeshPhongMaterial({
                    // polygonOffset 和 polygonOffsetUnits 是让贴花有一定的偏移，离开 T 恤一段距离
                    polygonOffset: true,
                    polygonOffsetUnits: -10,

                    // 指定贴图
                    map: texture,
                    // 如果图片是 png 的话可以背景透明
                    transparent: true
                })

                const mesh = new THREE.Mesh(geometry, material)
                // 给贴花加上一个 name
                mesh.name = 'pic'
                scene.add(mesh)
            }}
        />
    )
})

function Background() {
    const { scene } = useThree()

    useTexture('./sky.png', (tex) => {
        tex.colorSpace = SRGBColorSpace
        scene.background = tex
    })

    return null
}

function ColorList(props: ColorListProps) {
    const colors = [
        'red', 'orange', 'pink',
        'lightgreen', 'lightblue', 'yellow',
        'purple', 'black', 'white',
        'green', 'cyan', 'blue'
    ]

    return (
        <div className='color-list'>
            {
                colors.map(color => {
                    return (
                        <div
                            key={color}
                            className='color-item'
                            style={{ background: color }}
                            onClick={() => {
                                props.onColorChange(color)
                            }}
                        ></div>
                    )
                })
            }
        </div>
    )
}

function ImgList(props: ImgListProps) {
    const imgs = [
        './sky.png',
        './bg1.png',
        './bg2.png',
        './bg3.png',
        './bg4.png'
    ]

    return (
        <div className='img-list'>
            {
                imgs.map(url => {
                    return (
                        <img
                            key={url}
                            className='img-item'
                            src={url}
                            width={80}
                            height={80}
                            onClick={() => {
                                props.onImgChange(url)
                            }}
                        />
                    )
                })
            }
        </div>
    )
}

function App() {
    const changeTShirtColorRef = useRef<TshirtRef>(null)

    return (
        <div>
            <Canvas
                camera={{
                    position: [0, 0, 700]
                }}
                style={{
                    width: window.innerWidth,
                    height: window.innerHeight
                }}
            >
                <Background />
                <ambientLight />
                {/* <axesHelper args={[1000]} /> */}
                <directionalLight
                    position={[0, 400, 100]}
                    intensity={3}
                />
                <OrbitControls />

                <Suspense fallback={null}>
                    <Tshirt
                        ref={changeTShirtColorRef}
                    />
                </Suspense>
            </Canvas>

            <div id="left-panel">
                <ColorList
                    onColorChange={(color) => {
                        changeTShirtColorRef.current?.changeTShirtColor(color)
                    }}
                />
            </div>

            <div id="right-panel">
                <ImgList
                    onImgChange={src => {
                        changeTShirtColorRef.current?.changeTShirtPic(src)
                    }}
                />
            </div>
        </div>
    )
}

export default App
