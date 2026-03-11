# Javascript

## 事件

**鼠标事件**

鼠标按下触发，抬起恢复。常见bug——移出区域抬起无法恢复。

```js
document.getElementById('bug2').onmousedown = function (e) {
    e.target.classList.add('active');
    window.onmouseup = function () {
        // 这个 e 是 onmousedown 的闭包 e
        e.target.classList.remove('active');

        window.onmouseup = null;
    };
};
```

**键盘事件**

键盘按下发出不同声音，要求只触发一次，而且可以同时触发

```js
const keys = new Set();
window.onkeydown = function (e) {
    if (keys.has(e.key)) {
        return;
    }
    console.log('active', e.key);
    keys.add(e.key);
};
window.onkeyup = function (e) {
    keys.delete(e.key);
    console.log('stop', e.key);
};
```

**demo**

<script setup>
import { withBase } from 'vitepress'

</script>

<iframe :src="withBase('/fe/javascript/demo/event.html')" width="100%" height="400" frameborder="0"></iframe>
