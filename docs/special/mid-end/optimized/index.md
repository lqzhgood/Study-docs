# B 端性能优化

## 网页指标

> [Web Vitals](https://web.dev/articles/vitals?hl=zh-cn)

前端的网站优化目标基本聚焦在更快的显示、操作稳定页面，通过技术手段去无限拉近与原生应用的体验。核心指标一般是三个

- **Largest Contentful Paint (LCP)** ：衡量加载性能。为了提供良好的用户体验，应在网页首次开始加载的 2.5 秒内完成 LCP。
- **Interaction to Next Paint (INP)** ：衡量互动性。为了提供良好的用户体验，网页的 INP 应不超过 200 毫秒。
- **Cumulative Layout Shift (CLS)** ：衡量视觉稳定性。为了提供良好的用户体验，网页的 CLS 应保持在 0.1 或更低。

![web-vitals-timeline.png](web-vitals-timeline.png)

对于我们当前的微前端重型 B 端平台来说，从用户敲下 `URL` 到可操作的过程中，可控制的范围很有限。上下游 `CDN`、网关、基建超出我们的控制范围， 我们能做的集中在子应用的加载上，因此重点指标是追求 `TTFB` ~ `LCP` 的时间。

## 通用优化

老生都不谈的优化方式就不说了， [雅虎军规](https://developer.yahoo.com/performance/rules.html) 还是具有指导意义的，但是很多随着现代前端工程化的实现，意义已经没那么大了。

- 最小化网络请求， 限制 http 数量
    - h2 通过多路复用已经不再限制并发数，之前都是通过泛域名来解决
- 优化资源加载顺序
    - CSS 在顶部JS在底部已经成了框架的默认配置
- 缓存与压缩
    - Expires或Cache-Control头，并启用 `Gzip` 压缩
- 引入 CDN
- 其他
    - 减少DOM元素数量、
    - 使Ajax可缓存、
    - 延迟加载组件、
    - 避免重定向和404错误
    - ...

## 方法论

我们可以简单的写出优化公式： `时间 = 大小 / 速度`， 那么就可以得出这么几个方向

### 提高速度

**以空间换时间——Cache**

可以针对一些变化不高的资源，如菜单、用户信息、权限列表等接口信息进行本地缓存，后续接口得到新值时再进行替换。

**同步串行改异步并发**

- 代码支持更多空状态，增强鲁棒性，结合 Cache 可以让子应用可以和主应用的依赖接口进行并发，从串行依赖改为并行的多状态。如权限接口一般阻塞加载子应用，但可以默认视为无权限并行子应用，等权限接口回来再修改状态。
- 菜单、导航等均可拆分异步子模块从而减少主应用大小，提前子应用加载时机。
- `React.lazy` 异步组件
- `Promise` 异步逻辑

**减少React渲染 / Dom**

- 使用 [全局状态 + 状态提示](https://www.yuque.com/hlwzn/hi5s1y/qknnb4gpf8tfaheh) 减少状态复杂度，减少无意义顶层渲染。如 Layout

```jsx
function Layout() {
    /** 此处不应写任何状态，导致重渲染 */
    return (
        <>
            <Auth /> // 通过全局状态仅让末级组件渲染
            <Menu />
            <Nav />
            <Outlet />
        </>
    );
}
```

- useMemo， useCallback 不太想用
- 使用 requestAnimationFrame 合并 dom 操作和处理频繁的 dom 操作

```js
function handleScroll() {
    // 将更新操作延迟到下一帧
    requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        document.body.style.backgroundColor = `rgba(255, 0, 0, ${scrollTop / 1000})`;
    });
}
window.addEventListener('scroll', handleScroll);
```

- 首屏非视口 `div` 占位， `IntersectionObserver` 到视口才加载

**合并缓存请求**

- [useQuery](https://tanstack.com/query/) 王炸

**SSR/SSG**

B端平台大部分是实时动态数据，会进一步增加服务器负载，提升有限。

**静态资源 & CDN & DNS**

- 图片使用更高压缩率的 WebP，减少字体使用，约束标准字体为三种（数字、特殊、正文）。
- 按需加载，[IntersectionObserver + setTimeout](https://segmentfault.com/a/1190000046453750?utm_source=sf-similar-article) 懒加载图片
- 静态资源统统上CDN
- 资源预加载 `<link ref="preload" href="style.css" as="style" />`
- DNS 预解析 `<link rel="dns-prefetch" href="//xx.com">`
- 响应式图片加载

```html
// 通过 picture 实现
<picture>
    <source srcset="banner_w1000.jpg" media="(min-width: 801px)" />
    <source srcset="banner_w800.jpg" media="(max-width: 800px)" />
    <img src="banner_w800.jpg" alt="" />
</picture>
```

```css
// 通过 @media 实现
@media (min-width: 769px) {
    .bg {
        background-image: url(bg1080.jpg);
    }
}
@media (max-width: 768px) {
    .bg {
        background-image: url(bg768.jpg);
    }
}
```

**Node版本**

新版 node 一般都带来更好的性能。升级后对比构建产物一致就不会有问题。

**合适的打包策略**

- 公共依赖一般不变可以打包在一起
- 按路由->页面打包做到页面按需加载，使用对应组件路径命名可以利于线上事故排查

### 减小大小

**构建产物分析**

推荐 `rsdoctor`，基于 `webpack-bundle-analyzer` 封装，信息更全面，可以找到很多没用到却打包进来的产物，多半是因为没有**tree shaking**。

**tree shaking**

- 尽量使用`命名导入`，很多都是因为使用`默认导入`而被整体打包，如 `import _ from 'lodash'`。
- 不要从 `antd/lib` 导入，也会导致全量打包, 可以从 `antd/es` 导入
- 循环依赖也会破坏**tree shaking**，可以通过 `npx madge --circular src/**/*` 来查找
- 减少引入未使用的代码， 如 `oneApi` 未使用的请求

**减少调整依赖库**

- 很多库已经过时或者能力已被现代js支持，可以参考 `https://e18e.dev/docs/replacements/`。
- `AntDesign` 的 [Space组件](https://ant-design.antgroup.com/components/space-cn) 会增加很多 Dom 层级， `Flex` 的 `Gap` 就能搞定间距。
- 使用 `npx depcheck` 检查没用到的包
- 调整依赖，如 `@types -> devDependencies`，减少安装时间

**qiankun3依赖复用**

分析提取子应用共有依赖进行打包，其他子应用加载等于直接用缓存。

### 减少感知时间

> 时间也可以被欺骗

- 大背景图可以先用类似颜色的 css 填充，基本看不出来
- 使用 [Skeleton 骨架屏](https://ant-design.antgroup.com/components/skeleton-cn)
- SPA + 快照 === 0s 加载
