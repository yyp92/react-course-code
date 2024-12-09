import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

import {
    UseMountedState,
    UseLifecycles,
    UseCookie,
    // UseHover,
    UseScrolling,
    UseSize,
    UseHoverAhooks,
    UseTimeout,
    UseWhyDidYouUpdate,
    UseCountDown
} from './pages'

function App() {
    return (
        <>
            {/* react-use */}
            {/* <UseMountedState /> */}

            {/* <UseLifecycles /> */}

            {/* <UseCookie /> */}

            {/* <UseHover /> */}

            {/* <UseScrolling /> */}



            {/* ahooks */}
            {/* <UseSize /> */}

            {/* <UseHoverAhooks /> */}

            {/* <UseTimeout /> */}

            {/* <UseWhyDidYouUpdate /> */}

            <UseCountDown />
        </>
    )
}

export default App
