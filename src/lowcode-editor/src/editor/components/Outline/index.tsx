import { Tree } from "antd";
import { useComponetsStore } from "../../stores/components";

export function Outline() {
    const {
        components,
        setCurComponentId
    } = useComponetsStore()

    return (
        <Tree
            fieldNames={{
                // 指定用哪个属性作为标题
                title: 'desc',
                
                // 指定哪个属性作为 key
                key: 'id'
            }}
            treeData={components as any}
            showLine
            defaultExpandAll
            onSelect={([selectedKey]) => {
                setCurComponentId(selectedKey as number)
            }}
        />
    )
}
