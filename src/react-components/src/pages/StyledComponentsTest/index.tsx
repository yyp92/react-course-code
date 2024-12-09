import { FC, PropsWithChildren, useState } from 'react';
import { styled, createGlobalStyle, keyframes, css, RuleSet, ThemeProvider, useTheme } from 'styled-components';

// const Title = styled.h1<{ color?: string; }>`
//     font-size: 30px;
//     text-align: center;
//     color: ${props => props.color || 'blue'}
// `;

// const Header = styled.div`
//     padding: 20px;
//     background: pink;
// `;

// export const StyledComponentsTest =  () => {
//     return (
//         <Header>
//             <Title>
//                 Hello World!
//             </Title>

//             <Title color='green'>
//                 Hello World!
//             </Title>
            
//             <Title color='black'>
//                 Hello World!
//             </Title>
//         </Header>
//     )
// }




/**
 * * 有的时候，样式需要基于已有的做扩展，比如我有一个 Button 的样式，另一种 Button 和它大部分一样，但有所不同。
 */
// const Button = styled.button<{ color?: string; }>`
//     font-size: 20px;
//     margin: 5px 10px;
//     border: 2px solid #000;
//     color: ${props => props.color || 'blue'}
// `;

// const Button2 = styled(Button)`
//     border-radius: 8px;
// `;

// export const StyledComponentsTest =  () => {
//     return (
//         <div>
//             <Button color='red'>Hello World!</Button>

//             {/* 想改样式组件的标签，可以用 as  as="div" */}
//             <Button2 color='red' as="div">Hello World!</Button2>
//         </div>
//     )
// }




/**
 * * styled() 除了可以给样式组件扩展样式外，还可以给普通组件加上样式
 */
// interface LinkProps extends PropsWithChildren {
//     href: string;
//     className?: string;
// }
  
// const Link: FC<LinkProps> = (props) => {
//     console.log(props)
//     const {
//         href,
//         className,
//         children
//     } = props;

//     return <a href={href} className={className}>{children}</a>
// }

// // 用 attrs 方法，接收传入的 props 返回修改后的 props。
// // * attrs 支持对象和函数，简单的场景直接传对象也可以
// const StyledLink = styled(Link).attrs<{ $color?: string;}>(
//     (props) => {
//         console.log(props);

//         props.$color = 'orange';
//         props.children = props.children + ' 光';
//         return props;
//     }
// )`
//     color:  ${props => props.$color || 'green'};
//     font-size: 40px;
// `;

// const Input = styled.input.attrs({ type: 'checkbox'})`
//     width: 30px;
//     height: 30px;
// `;

// export const StyledComponentsTest =  () => {
//     return (
//         <div>
//             <Input />

//             <StyledLink href='#aaa' $color="purple">click me</StyledLink>
//         </div>
//     )
// }





/**
 * * 那伪类选择器、伪元素选择器这些呢？
 * 
 * 那什么时候用 &、什么时候用 && 呢？
 * 当你和全局样式冲突的时候。
 */
// const ColoredText = styled.div`
//     color: blue;

//     &:hover {
//         color: red;
//     }

//     &::before {
//         content: '* ';
//     }

//     // 这里 &.aaa + & 就是 .aaa 的 ColoredText 样式组件之后的一个 ColoredText 样式组件实例。
//     &.aaa + & {
//         background: lightblue;
//     }

//     // &.bbb ~ & 就是 .bbb 的 ColoredText 样式组件之后的所有 ColoredText 样式组件实例。
//     &.bbb ~ & {
//         background: pink;
//     }
// `

// 此外，如果你把 & 全换成 &&，你会发现效果也一样
// const ColoredText = styled.div`
//     color: blue;

//     &&:hover {
//         color: red;
//     }

//     &&::before {
//         content: '* ';
//     }

//     // 这里 &.aaa + & 就是 .aaa 的 ColoredText 样式组件之后的一个 ColoredText 样式组件实例。
//     &&.aaa + && {
//         background: lightblue;
//     }

//     // &.bbb ~ & 就是 .bbb 的 ColoredText 样式组件之后的所有 ColoredText 样式组件实例。
//     &&.bbb ~ && {
//         background: pink;
//     }

// `

const ColoredText = styled.div`
    && {
        color: blue;
    }

    &:hover {
        color: red;
    }

    &::before {
        content: '* ';
    }

    // 这里 &.aaa + & 就是 .aaa 的 ColoredText 样式组件之后的一个 ColoredText 样式组件实例。
    &.aaa + & {
        background: lightblue;
    }

    // &.bbb ~ & 就是 .bbb 的 ColoredText 样式组件之后的所有 ColoredText 样式组件实例。
    &.bbb ~ & {
        background: pink;
    }
`

const GlobalStyle = createGlobalStyle`
    ${ColoredText} {
        color: green;
    }
`

// 但 styled components 这个 & 和 scss 里的 & 含义还不大一样。
// 它指的是同一个样式组件的实例，这里也就是 ColoredText 的实例。

// export const StyledComponentsTest =  () => {
//     return (
//         <div>
//             <GlobalStyle />
//             <ColoredText>Hello styled components</ColoredText>
//             <ColoredText className="aaa">Hello styled components</ColoredText>
//             <ColoredText>Hello styled components</ColoredText>
//             <ColoredText className="bbb">Hello styled components</ColoredText>
//             <div>Hello styled components</div>
//             <ColoredText>Hello styled components</ColoredText>
//             <ColoredText>Hello styled components</ColoredText>
//         </div>
//     )
// }





/**
 * *那动画怎么写呢？
 * 有单独的 api
 */
const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

// const Rotate = styled.div`
//     display: inline-block;
//     animation: ${rotate} 2s linear infinite;
//     font-size: 50px;
//     padding: 30px;
// `;

// 如果你想复用部分 css
const animation = css<{ $duration: number }>`
    animation: ${rotate} ${props => props.$duration}s linear infinite;
`

// 如果你希望样式组件用的时候可以传入一些样式，那可以用 RuleSet：
const Rotate = styled.div<{ $duration: number, otherStyles: RuleSet  }>`
    display: inline-block;
    ${animation}
    font-size: 50px;
    padding: 30px;
    ${props => props.otherStyles}
`;


// export const StyledComponentsTest =  () => {
//     return (
//         <div>
//             <Rotate
//                 $duration={3}
//                 otherStyles={[ 
//                     { border: '1px', background: 'pink' }, 
//                     { boxShadow: '0 0 3px  blue'}
//                 ]}
//             >X</Rotate>
//         </div>
//     )
// }





/**
 * * styled-components 还有 theme 的 api
 */
const Aaa = styled.div`
    width: 100px;
    height: 100px;
    background: ${props => props.theme.dark ? 'black' : '#ccc'}
`

function Content() {
    // 我们用 useTheme 读取了当前 theme，然后点击按钮的时候 setState 触发重新渲染，通过 ThemeProvider 修改了 theme 的值。
    const theme = useTheme();
    const [dark, setDark] = useState<boolean>(theme.dark);

    return (
        <>
            <button onClick={() => setDark(!dark)}>切换</button>

            <ThemeProvider theme={{ dark }}>
                <Aaa></Aaa>
            </ThemeProvider>
        </>
    )
}

export const StyledComponentsTest =  () => {
    return (
        <ThemeProvider theme={{ dark: true }}>
            <Content></Content>
        </ThemeProvider>
    )
}
  
