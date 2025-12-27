## nginx

[wiki](https://nginx.org/)

:::tip
一定得从官网装，自带源旧的一匹，大概率不支持 stream
:::

### snippets

#### 常用

::: code-group

<<< @/powerfully/vps/web/nginx/snippets/http-to-https.conf [http->https]
<<< @/powerfully/vps/web/nginx/snippets/no-response.conf [防探测]
<<< @/powerfully/vps/web/nginx/snippets/block-exploits.conf [阻止常见攻击]
<<< @/powerfully/vps/web/nginx/snippets/assets.conf [缓存资源]

:::

#### 反代

::: code-group

<<< @/powerfully/vps/web/nginx/snippets/proxy-http.conf
<<< @/powerfully/vps/web/nginx/snippets/proxy-https.conf
<<< @/powerfully/vps/web/nginx/snippets/proxy-emby.conf

:::
