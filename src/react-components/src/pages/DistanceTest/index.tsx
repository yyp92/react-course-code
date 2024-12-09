/**
 * * DistanceTest
 * 
 * e.pageY：鼠标距离文档顶部的距离
 * e.clientY：鼠标距离可视区域顶部的距离
 * e.offsetY：鼠标距离触发事件元素顶部的距离
 * e.screenY：鼠标距离屏幕顶部的距离
 * winwodw.scrollY：页面滚动的距离，也叫 window.pageYOffset，等同于 document.documentElement.scrollTop
 * element.scrollTop：元素滚动的距离
 * element.clientTop：上边框高度
 * element.offsetTop：相对有 position 的父元素的内容顶部的距离，可以递归累加，加上 clientTop，算出到文档顶部的距离
 * clientHeight：内容高度，不包括边框
 * offsetHeight：包含边框的高度
 * scrollHeight：滚动区域的高度，不包括边框
 * window.innerHeight：窗口的高度
 * element.getBoundingClientRect：拿到 width、height、top、left 属性，其中 top、left 是元素距离可视区域的距离，width、height 绝大多数情况下等同 offsetHeight、offsetWidth，但旋转之后就不一样了，拿到的是包围盒的宽高
 */
import { MouseEventHandler, useEffect, useRef } from 'react'

// export const DistanceTest = () => {
//     const ref = useRef<HTMLDivElement>(null);

//     const clickHandler: MouseEventHandler<HTMLDivElement> = (e: any) => {
//         const top = document.getElementById('box')!.getBoundingClientRect().top

//         console.log('box pageY', e.pageY)
//         console.log('box clientY', e.clientY)

//         // 这里的 window.pageYOffset 过时了，简易换成 window.scrollY，是一样的
//         // console.log('box offsetY',  e.pageY - top - window.pageYOffset)
//         // console.log('box offsetY',  e.pageY - top - window.scrollY)
//         // 问原生事件对象，拿到 offsetY 属性：
//         console.log('box offsetY',  e.nativeEvent.offsetY)

//         console.log('box screenY', e.screenY)
//     }

//     useEffect(() => {
//         document.getElementById('box')!.addEventListener(
//             'click',
//             (e: any) => {
//                 console.log('box2 pageY', e.pageY)
//                 console.log('box2 clientY', e.clientY)
//                 console.log('box2 offsetY', e.offsetY)
//                 console.log('box2 screenY', e.screenY)
//             }
//         )
//     }, [])

//     return (
//         <div>
//             <div
//                 id="box"
//                 ref={ref}
//                 style={{
//                     marginTop: '800px',
//                     width: '100px',
//                     height: '100px',
//                     background: 'blue'
//                 }}
//                 onClick={clickHandler}
//             ></div>
//         </div>
//     )
// }


 
/**
 * * 元素还有 offsetTop 和 clientTop 属性
 * 
 * clientTop 也就是上边框的高度 20px
 * offsetTop 是距离最近的有 position 属性（relative 或 absolute 或 fixed）的元素的距离
 */
// export const DistanceTest = () => {
//     const ref = useRef<HTMLDivElement>(null)

//     useEffect(() => {
//         console.log('offsetTop', ref.current?.offsetTop)
//         console.log('clientTop', ref.current?.clientTop)
//     }, [])

//     return (
//         <div>
//             <div
//                 style={{
//                     position: 'relative',
//                     margin: '100px',
//                     padding: '200px',
//                     border: '1px solid blue'
//                 }}
//             >
//                 <div
//                     id="box"
//                     ref={ref}
//                     style={{
//                         border: '20px solid #000',
//                         width: '100px',
//                         height: '100px',
//                         background: 'pink',
//                     }}
//                 >
//                 </div>
//             </div>
//         </div>
//     )
// }




/**
 * 算出来的就是元素到根元素的 offsetTop
 */
// export const DistanceTest = () => {
//     const ref = useRef<HTMLDivElement>(null)

//     function getTotalOffsetTop(element: HTMLElement) {
//         let totalOffsetTop = 0

//         while (element) {
//             // 加上border
//             if (totalOffsetTop > 0) {
//                 totalOffsetTop += element.clientTop
//             }

//             totalOffsetTop += element.offsetTop
//             element = element.offsetParent as HTMLElement
//         }

//         return totalOffsetTop
//     }

//     useEffect(() => {
//         console.log('offsetTop', ref.current?.offsetTop)
//         console.log('clientTop', ref.current?.clientTop)

//         console.log('total offsetTop', getTotalOffsetTop(ref.current!))
//     }, [])

//     return (
//         <div>
//             <div 
//                 style={{
//                     position: 'relative',
//                     margin: '100px',
//                     padding: '200px',
//                     border: '10px solid blue'
//                 }}
//             >
//                 <div
//                     id="box"
//                     ref={ref}
//                     style={{
//                         border: '20px solid #000',
//                         width: '100px',
//                         height: '100px',
//                         background: 'pink',
//                     }}
//                 >
//                 </div>
//             </div>
//         </div>
//     )
// }



/**
 * 类似的有 clientHeight、offsetHeight、getBoundingClient().height 这几个高度要区分下
 * 
 */
// export const DistanceTest = () => {
//     const ref = useRef<HTMLDivElement>(null)

//     const clickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
//         // clientHeight 是内容区域的高度，不包括 border
//         console.log('clentHeight', ref.current?.clientHeight)
        
//         // offsetHeight 是内容区域的高度 包括 border
//         console.log('offsetHeight', ref.current?.offsetHeight)

//         // scrollHeight 是滚动区域的总高度，不包括 border
//         console.log('scrollHeight', ref.current?.scrollHeight)

//         // getBoundingClientRect 拿到的包围盒的高度，而 offsetHeight 是元素本来的高度
//         console.log('clent rect height', ref.current?.getBoundingClientRect().height)
//     }

//     return (
//         <div>
//             <div
//                 id="box"
//                 ref={ref}
//                 style={{
//                     border: '10px solid #000',
//                     marginTop: '300px',
//                     width: '100px',
//                     height: '100px',
//                     background: 'pink',
//                     overflow: 'auto'
//                 }}
//                 onClick={clickHandler}
//             >
//                 <p>xxxxx</p>
//                 <p>xxxxx</p>
//                 <p>xxxxx</p>
//                 <p>xxxxx</p>
//                 <p>xxxxx</p>
//                 <p>xxxxx</p>
//                 <p>xxxxx</p>
//                 <p>xxxxx</p>
//                 <p>xxxxx</p>
//                 <p>xxxxx</p>
//                 <p>xxxxx</p>
//                 <p>xxxxx</p>
//                 <p>xxxxx</p>
//                 <p>xxxxx</p>
//                 <p>xxxxx</p>
//                 <p>xxxxx</p>
//             </div>
//         </div>
//     )
// }




/**
 * 对于滚动到页面底部的判断，就可以用 window.scrollY + window.innerHeight 和 document.documentElement.scrollHeight 对比
 */
export const DistanceTest = () => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        window.addEventListener(
            'scroll',
            () => {
                console.log(
                    window.scrollY + window.innerHeight,
                    document.documentElement.scrollHeight
                )
            }
        )
    }, []);

    return (
        <div>
            <div
                id="box"
                ref={ref}
                style={{
                    border: '10px solid #000',
                    marginTop: '800px',
                    width: '100px',
                    height: '100px',
                    background: 'pink',
                    overflow: 'auto',
                    transform: 'rotate(45deg)'
                }}
            >
                <p>xxxxx</p>
                <p>xxxxx</p>
                <p>xxxxx</p>
                <p>xxxxx</p>
                <p>xxxxx</p>
                <p>xxxxx</p>
                <p>xxxxx</p>
                <p>xxxxx</p>
                <p>xxxxx</p>
                <p>xxxxx</p>
                <p>xxxxx</p>
                <p>xxxxx</p>
                <p>xxxxx</p>
                <p>xxxxx</p>
                <p>xxxxx</p>
                <p>xxxxx</p>
            </div>
        </div>
    )
}
