## acme 证书

[wiki](https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E)

:::tip
使用 DNS 验证可以直接拿 泛域名
:::

::: code-group

```shell [配置]
# 切换 CA 为 letsencrypt， ZeroSLL 还得注册
acme.sh --set-default-ca --server letsencrypt

# 上游 CA 规则变动比较频繁，开启自动更新
acme.sh --upgrade --auto-upgrade
```

```shell [申请]
# Cloudflare
export CF_Key="slfjksjffjfhfhkjhfksjf" //此处替换成你自己的Key
export CF_Email="yourcloudflare@gmail.com" //此处填写你注册Cloudflare使用的邮箱账号
acme.sh --issue --dns dns_cf -d abc.com -d *.abc.com  -d *.cdn.abc.com --force

# dnspod
export DP_Id="123456"
export DP_Key="xxxxxxx"
acme.sh --issue --dns dns_dp -d abc.com -d *.abc.com  -d *.cdn.abc.com --force
```

```shell [更新]
acme.sh --install-cert -d abc.com \
    --key-file       /etc/nginx/ssl/abc.com/key.key  \
    --fullchain-file /etc/nginx/ssl/abc.com/fullchain.cer \
    --reloadcmd     "service nginx force-reload"
```

:::
