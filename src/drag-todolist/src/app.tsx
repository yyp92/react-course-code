import ReactDOM from 'react-dom/client'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TodoList } from './pages/todoList/TodoList'

import './App.css'
// import './index.css'

const App = () => {
    return (
        <TodoList></TodoList>
    )
}


ReactDOM.createRoot(document.getElementById('root')!).render(
    //  DndProvider: react-dnd 用来跨组件传递数据的
    <DndProvider backend={HTML5Backend}>
        <App />
    </DndProvider>
)
