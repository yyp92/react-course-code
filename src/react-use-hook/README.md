# react-use-hook
学习封装自定义hook


### 再就是绑定事件的 hook 有三种封装方式：
- 传入 React Element 然后 cloneElement
- 传入 ref 然后拿到 dom 执行 addEventListener
- 返回 props 或者事件处理函数，调用者自己绑定
