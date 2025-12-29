## nginx

[wiki](https://nginx.org/)

:::tip
一定得从官网装，自带源旧的一匹，大概率不支持 stream
:::

### snippets

#### 常用

::: code-group

<<< @/powerfully/vps/web/nginx/snippets/http-to-https.conf{nginx} [http->https]
<<< @/powerfully/vps/web/nginx/snippets/no-response.conf{nginx} [防探测]
<<< @/powerfully/vps/web/nginx/snippets/block-exploits.conf{nginx} [阻止常见攻击]
<<< @/powerfully/vps/web/nginx/snippets/assets.conf{nginx} [缓存资源]
<<< @/powerfully/vps/web/nginx/snippets/auth.conf{nginx} [权限验证]
<<< @/powerfully/vps/web/nginx/snippets/dir.conf{nginx} [显示目录]
<<< @/powerfully/vps/web/nginx/snippets/static-response.conf{nginx} [静态返回]

:::

#### 反代

::: code-group

<<< @/powerfully/vps/web/nginx/snippets/proxy-http.conf{nginx}
<<< @/powerfully/vps/web/nginx/snippets/proxy-https.conf{nginx}
<<< @/powerfully/vps/web/nginx/snippets/proxy-emby.conf{nginx}

:::

#### SNI 分流

如果复用 443 端口，使用 nginx 作为前端时，就需要分离`特定域名`的 `https` 流量，这时候就可以使用 stream 。

![stream](/powerfully/vps/web/nginx/stream.png)

<<< @/powerfully/vps/web/nginx/snippets/stream.conf{nginx} [steam]

但由于 `TCP` 层转发会导致丢失客户端信息，如致`源IP`变为 `nginx` 的 `127.0.0.1`，此时可以通过以下方式解决。

##### **Proxy Protocol[^1]**

通过 `Proxy Protocol` 可以在传输数据时附带上原始连接四元组信息的数据包，将客户端信息传递给**支持**的的后端。

    -   前端和后端必须同时支持`Proxy Protocol`
    -   同一端口 nginx 不可同时兼容带 `Proxy Protocol` 的后端和不带 `Proxy Protocol` 的后端

::: details HAProxy 套壳可以让后端支持 `Proxy Protocol`

```js
frontend f_singbox
  bind unix@/run/haproxy/tcp.sock mode 666 accept-proxy
  mode tcp
  default_backend singbox

backend singbox
mode tcp
retry-on conn-failure empty-response response-timeout
server singbox localhost:50000 tfo

```

:::

<<< @/powerfully/vps/web/nginx/snippets/stream-proxy-protocol.conf{js} [proxy Protocol]

##### 透明代理

让 nginx 在连接到上游服务器时，使用一个特殊的 IP 地址（通常是客户端 IP），使得上游服务器认为请求直接来自客户端，而不是来自 nginx 代理。

**此种方法 nginx 需要 root 权限，系统配置路由规则。**

```text
客户端 (IP: 192.168.1.100)
      ↓
nginx 负载均衡器 (IP: 10.0.0.1)
      ↓ (使用 proxy_bind $upstream transparent)
上游服务器看到源 IP: 192.168.1.100（而不是 10.0.0.1）
```

```js
stream {
    ...
    server {
        ...
         proxy_bind $remote_addr transparent;  // [!code ++]
    }
}
```

```shell
# 添加路由表
ip rule add fwmark 1 table 100
ip route add local 0.0.0.0/0 dev lo table 100

# 设置 iptables
iptables -t mangle -A PREROUTING -p tcp --dport 443 -j MARK --set-mark 1
```

[^1]: [通过 SNI 回落功能实现伪装与按域名分流](https://xtls.github.io/document/level-1/fallbacks-with-sni.html)
[^2]: [如何使用 NGINX 前置分流](https://github.com/SagerNet/sing-box/issues/1878)
[^3]: [ip-transparency-direct-server-return-nginx-plus-transparent-proxy](https://www.f5.com/company/blog/nginx/ip-transparency-direct-server-return-nginx-plus-transparent-proxy)
