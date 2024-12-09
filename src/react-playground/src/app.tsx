import ReactDOM from 'react-dom/client'
import ReactPlayground from './ReactPlayground';
import { PlaygroundProvider } from './ReactPlayground/PlaygroundContext';

import './App.css'


const App = () => {
    return (
        <PlaygroundProvider>
            <ReactPlayground />
        </PlaygroundProvider>
    )
}
    


ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)
