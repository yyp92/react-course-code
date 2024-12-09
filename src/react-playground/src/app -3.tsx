import ReactDOM from 'react-dom/client'
import Editor from '@monaco-editor/react';

import './App.css'

const App = () => {
    const code =`
        import { useEffect, useState } from "react";

        function App() {
            const [num, setNum] = useState(() => {
                const num1 = 1 + 2;
                const num2 = 2 + 3;
                return num1 + num2
            });

            return (
                <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
            );
        }

        export default App;
    `;


    return (
        <Editor
            height="500px"
            defaultLanguage="javascript"
            defaultValue={code}
        />
    )
}


ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)
