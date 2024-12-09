import { FC } from "react";
import classNames from "classnames";
import { NewItem } from "./NewItem";
import { GarbageBin } from "./GarbageBin";
import { List } from "./List";

interface TodoListProps {

}

export const TodoList:FC<TodoListProps> = (props) => {
    return (
        // 父元素 display:flex，然后 子元素分别 2 和 1 的比例，设置 margin-right:10px
        <div 
            className={classNames(
                "w-1000 h-600 m-auto mt-100 p-10",
                "border-2 border-black",
                "flex justify-between items-start"
            )}
        >
            <div
                className="flex-2 h-full mr-10 overflow-auto"
            >
                <List/>
            </div>

            <div
                className={classNames(
                    "flex-1 h-full",
                    "flex flex-col justify-start"
                )}
            >
                <NewItem/>
                
                <GarbageBin className={"mt-10"}/>
            </div>
        </div>
    )
}
