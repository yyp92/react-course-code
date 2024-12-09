/**
 * Message
 */
import React, { CSSProperties, ReactNode } from "react";
export type Position = 'top' | 'bottom';
export interface MessageProps {
    style?: CSSProperties;
    className?: string | string[];
    content: ReactNode;
    duration?: number;
    id?: number;
    position?: Position;
    onClose?: (...args: any) => void;
}
export interface MessageRef {
    add: (messageProps: MessageProps) => number;
    remove: (id: number) => void;
    update: (id: number, messageProps: MessageProps) => void;
    clearAll: () => void;
}
export declare const MessageProvider: React.ForwardRefExoticComponent<React.RefAttributes<MessageRef>>;
