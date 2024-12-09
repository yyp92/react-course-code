import { MessageProps, Position } from '.';
export type MessageList = {
    top: MessageProps[];
    bottom: MessageProps[];
};
/**
 * 生成一个新的 id
 */
export declare function getId(messageProps: MessageProps): number;
/**
 * 遍历 top 和 bottom 数组，查找下有没有对应的 Message
 */
export declare function getMessagePosition(messageList: MessageList, id: number): Position | undefined;
/**
 * 查找的方式就是先找到它在哪个数组里，然后返回对应数组中的下标
 */
export declare function findMessage(messageList: MessageList, id: number): {
    position: Position | undefined;
    index: number;
};
declare function useStore(defaultPosition: Position): {
    messageList: MessageList;
    add: (messageProps: MessageProps) => number;
    update: (id: number, messageProps: MessageProps) => void;
    remove: (id: number) => void;
    clearAll: () => void;
};
export default useStore;
