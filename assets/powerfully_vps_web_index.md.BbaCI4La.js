import{_ as n,c as a,o as p,aF as e}from"./chunks/framework.oEGEVMzI.js";const k=JSON.parse('{"title":"Web 服务","description":"","frontmatter":{},"headers":[],"relativePath":"powerfully/vps/web/index.md","filePath":"powerfully/vps/web/index.md"}'),l={name:"powerfully/vps/web/index.md"};function i(t,s,c,o,r,h){return p(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="web-服务" tabindex="-1">Web 服务 <a class="header-anchor" href="#web-服务" aria-label="Permalink to “Web 服务”">​</a></h1><h2 id="acme-证书" tabindex="-1">acme 证书 <a class="header-anchor" href="#acme-证书" aria-label="Permalink to “acme 证书”">​</a></h2><p><a href="https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E" target="_blank" rel="noreferrer">wiki</a></p><div class="tip custom-block"><p class="custom-block-title custom-block-title-default">TIP</p><p>使用 DNS 验证可以直接拿 泛域名</p></div><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-14" id="tab-15" checked><label data-title="配置" for="tab-15">配置</label><input type="radio" name="group-14" id="tab-16"><label data-title="申请" for="tab-16">申请</label><input type="radio" name="group-14" id="tab-17"><label data-title="更新" for="tab-17">更新</label></div><div class="blocks"><div class="language-shell active"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 切换 CA 为 letsencrypt， ZeroSLL 还得注册</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">acme.sh</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --set-default-ca</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> letsencrypt</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 上游 CA 规则变动比较频繁，开启自动更新</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">acme.sh</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --upgrade</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --auto-upgrade</span></span></code></pre></div><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Cloudflare</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CF_Key</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;slfjksjffjfhfhkjhfksjf&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> //此处替换成你自己的Key</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CF_Email</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;yourcloudflare@gmail.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> //此处填写你注册Cloudflare使用的邮箱账号</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">acme.sh</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --issue</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --dns</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dns_cf</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> abc.com</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.abc.com</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -d</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.cdn.abc.com</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --force</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># dnspod</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> DP_Id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;123456&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> DP_Key</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xxxxxxx&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">acme.sh</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --issue</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --dns</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dns_dp</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> abc.com</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.abc.com</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -d</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.cdn.abc.com</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --force</span></span></code></pre></div><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">acme.sh</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --install-cert</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> abc.com</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --key-file</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">       /etc/nginx/ssl/abc.com/key.key</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --fullchain-file</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/nginx/ssl/abc.com/fullchain.cer</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --reloadcmd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     &quot;service nginx force-reload&quot;</span></span></code></pre></div></div></div><h2 id="nginx" tabindex="-1">nginx <a class="header-anchor" href="#nginx" aria-label="Permalink to “nginx”">​</a></h2><p><a href="https://nginx.org/" target="_blank" rel="noreferrer">wiki</a></p><div class="tip custom-block"><p class="custom-block-title custom-block-title-default">TIP</p><p>一定得从官网装，自带源旧的一匹，大概率不支持 stream</p></div><h3 id="snippets" tabindex="-1">snippets <a class="header-anchor" href="#snippets" aria-label="Permalink to “snippets”">​</a></h3><h4 id="常用" tabindex="-1">常用 <a class="header-anchor" href="#常用" aria-label="Permalink to “常用”">​</a></h4><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-36" id="tab-37" checked><label data-title="http-&gt;https" for="tab-37">http-&gt;https</label><input type="radio" name="group-36" id="tab-38"><label data-title="防探测" for="tab-38">防探测</label><input type="radio" name="group-36" id="tab-39"><label data-title="阻止常见攻击" for="tab-39">阻止常见攻击</label><input type="radio" name="group-36" id="tab-40"><label data-title="缓存资源" for="tab-40">缓存资源</label></div><div class="blocks"><div class="language-conf active"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>server {</span></span>
<span class="line"><span>    listen 80;</span></span>
<span class="line"><span>    listen [::]:80;</span></span>
<span class="line"><span>    return 301 https://$host$request_uri;</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>server {</span></span>
<span class="line"><span>  server_name _;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  listen 80 default;</span></span>
<span class="line"><span>  listen [::]:80 default;</span></span>
<span class="line"><span>  listen 443 ssl default_server;</span></span>
<span class="line"><span>  listen [::]:443 default_server;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # 自签证书就行</span></span>
<span class="line"><span>  ssl_certificate /data/custom_ssl/npm-11/fullchain.pem;</span></span>
<span class="line"><span>  ssl_certificate_key /data/custom_ssl/npm-11/privkey.pem;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # 日志</span></span>
<span class="line"><span>  access_log /data/logs/default-host_access.log combined;</span></span>
<span class="line"><span>  error_log /data/logs/default-host_error.log warn;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return 444;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # 自行增加</span></span>
<span class="line"><span>  ## 上面直接返回 444 其实是不够的</span></span>
<span class="line"><span>  ## 还可以使用 http 来访问 https 端口的方式来探测是否有 https 服务</span></span>
<span class="line"><span>  ## curl http://example.com:443</span></span>
<span class="line"><span>  ## 当匹配到内部代码 497（HTTP request sent to HTTPS port） 直接不响应</span></span>
<span class="line"><span>  error_page 497 = @empty;</span></span>
<span class="line"><span>  location @empty {</span></span>
<span class="line"><span>      return 444;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # 如果使用站点认证需要放行 acme</span></span>
<span class="line"><span>  # include conf.d/include/letsencrypt-acme-challenge.conf;</span></span>
<span class="line"><span>  location / {</span></span>
<span class="line"><span>    return 444;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// letsencrypt-acme-challenge.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Rule for legitimate ACME Challenge requests (like /.well-known/acme-challenge/xxxxxxxxx)</span></span>
<span class="line"><span># We use ^~ here, so that we don&#39;t check other regexes (for speed-up). We actually MUST cancel</span></span>
<span class="line"><span># other regex checks, because in our other config files have regex rule that denies access to files with dotted names.</span></span>
<span class="line"><span>location ^~ /.well-known/acme-challenge/ {</span></span>
<span class="line"><span>	# Since this is for letsencrypt authentication of a domain and they do not give IP ranges of their infrastructure</span></span>
<span class="line"><span>	# we need to open up access by turning off auth and IP ACL for this location.</span></span>
<span class="line"><span>	auth_basic off;</span></span>
<span class="line"><span>	auth_request off;</span></span>
<span class="line"><span>	allow all;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	# Set correct content type. According to this:</span></span>
<span class="line"><span>	# https://community.letsencrypt.org/t/using-the-webroot-domain-verification-method/1445/29</span></span>
<span class="line"><span>	# Current specification requires &quot;text/plain&quot; or no content header at all.</span></span>
<span class="line"><span>	# It seems that &quot;text/plain&quot; is a safe option.</span></span>
<span class="line"><span>	default_type &quot;text/plain&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	# This directory must be the same as in /etc/letsencrypt/cli.ini</span></span>
<span class="line"><span>	# as &quot;webroot-path&quot; parameter. Also don&#39;t forget to set &quot;authenticator&quot; parameter</span></span>
<span class="line"><span>	# there to &quot;webroot&quot;.</span></span>
<span class="line"><span>	# Do NOT use alias, use root! Target directory is located here:</span></span>
<span class="line"><span>	# /var/www/common/letsencrypt/.well-known/acme-challenge/</span></span>
<span class="line"><span>	root /data/letsencrypt-acme-challenge;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Hide /acme-challenge subdirectory and return 404 on all requests.</span></span>
<span class="line"><span># It is somewhat more secure than letting Nginx return 403.</span></span>
<span class="line"><span># Ending slash is important!</span></span>
<span class="line"><span>location = /.well-known/acme-challenge/ {</span></span>
<span class="line"><span>	return 404;</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>## Block SQL injections</span></span>
<span class="line"><span>set $block_sql_injections 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($query_string ~ &quot;union.*select.*\\(&quot;) {</span></span>
<span class="line"><span>	set $block_sql_injections 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($query_string ~ &quot;union.*all.*select.*&quot;) {</span></span>
<span class="line"><span>	set $block_sql_injections 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($query_string ~ &quot;concat.*\\(&quot;) {</span></span>
<span class="line"><span>	set $block_sql_injections 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($block_sql_injections = 1) {</span></span>
<span class="line"><span>	return 403;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Block file injections</span></span>
<span class="line"><span>set $block_file_injections 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($query_string ~ &quot;[a-zA-Z0-9_]=http://&quot;) {</span></span>
<span class="line"><span>	set $block_file_injections 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($query_string ~ &quot;[a-zA-Z0-9_]=(\\.\\.//?)+&quot;) {</span></span>
<span class="line"><span>	set $block_file_injections 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($query_string ~ &quot;[a-zA-Z0-9_]=/([a-z0-9_.]//?)+&quot;) {</span></span>
<span class="line"><span>	set $block_file_injections 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($block_file_injections = 1) {</span></span>
<span class="line"><span>	return 403;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Block common exploits</span></span>
<span class="line"><span>set $block_common_exploits 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($query_string ~ &quot;(&lt;|%3C).*script.*(&gt;|%3E)&quot;) {</span></span>
<span class="line"><span>	set $block_common_exploits 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($query_string ~ &quot;GLOBALS(=|\\[|\\%[0-9A-Z]{0,2})&quot;) {</span></span>
<span class="line"><span>	set $block_common_exploits 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($query_string ~ &quot;_REQUEST(=|\\[|\\%[0-9A-Z]{0,2})&quot;) {</span></span>
<span class="line"><span>	set $block_common_exploits 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($query_string ~ &quot;proc/self/environ&quot;) {</span></span>
<span class="line"><span>	set $block_common_exploits 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($query_string ~ &quot;mosConfig_[a-zA-Z_]{1,21}(=|\\%3D)&quot;) {</span></span>
<span class="line"><span>	set $block_common_exploits 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($query_string ~ &quot;base64_(en|de)code\\(.*\\)&quot;) {</span></span>
<span class="line"><span>	set $block_common_exploits 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($block_common_exploits = 1) {</span></span>
<span class="line"><span>	return 403;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Block spam</span></span>
<span class="line"><span>set $block_spam 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($query_string ~ &quot;\\b(ultram|unicauca|valium|viagra|vicodin|xanax|ypxaieo)\\b&quot;) {</span></span>
<span class="line"><span>	set $block_spam 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($query_string ~ &quot;\\b(erections|hoodia|huronriveracres|impotence|levitra|libido)\\b&quot;) {</span></span>
<span class="line"><span>	set $block_spam 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($query_string ~ &quot;\\b(ambien|blue\\spill|cialis|cocaine|ejaculation|erectile)\\b&quot;) {</span></span>
<span class="line"><span>	set $block_spam 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($query_string ~ &quot;\\b(lipitor|phentermin|pro[sz]ac|sandyauer|tramadol|troyhamby)\\b&quot;) {</span></span>
<span class="line"><span>	set $block_spam 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($block_spam = 1) {</span></span>
<span class="line"><span>	return 403;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Block user agents</span></span>
<span class="line"><span>set $block_user_agents 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Disable Akeeba Remote Control 2.5 and earlier</span></span>
<span class="line"><span>if ($http_user_agent ~ &quot;Indy Library&quot;) {</span></span>
<span class="line"><span>	set $block_user_agents 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Common bandwidth hoggers and hacking tools.</span></span>
<span class="line"><span>if ($http_user_agent ~ &quot;libwww-perl&quot;) {</span></span>
<span class="line"><span>	set $block_user_agents 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($http_user_agent ~ &quot;GetRight&quot;) {</span></span>
<span class="line"><span>	set $block_user_agents 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($http_user_agent ~ &quot;GetWeb!&quot;) {</span></span>
<span class="line"><span>	set $block_user_agents 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($http_user_agent ~ &quot;Go!Zilla&quot;) {</span></span>
<span class="line"><span>	set $block_user_agents 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($http_user_agent ~ &quot;Download Demon&quot;) {</span></span>
<span class="line"><span>	set $block_user_agents 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($http_user_agent ~ &quot;Go-Ahead-Got-It&quot;) {</span></span>
<span class="line"><span>	set $block_user_agents 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($http_user_agent ~ &quot;TurnitinBot&quot;) {</span></span>
<span class="line"><span>	set $block_user_agents 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($http_user_agent ~ &quot;GrabNet&quot;) {</span></span>
<span class="line"><span>	set $block_user_agents 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($block_user_agents = 1) {</span></span>
<span class="line"><span>	return 403;</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>location ~* ^.*\\.(css|js|jpe?g|gif|png|webp|woff|woff2|eot|ttf|svg|ico|css\\.map|js\\.map)$ {</span></span>
<span class="line"><span>	if_modified_since off;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	# use the public cache</span></span>
<span class="line"><span>	proxy_cache public-cache;</span></span>
<span class="line"><span>	proxy_cache_key $host$request_uri;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	# ignore these headers for media</span></span>
<span class="line"><span>	proxy_ignore_headers Set-Cookie Cache-Control Expires X-Accel-Expires;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	# cache 200s and also 404s (not ideal but there are a few 404 images for some reason)</span></span>
<span class="line"><span>	proxy_cache_valid any 30m;</span></span>
<span class="line"><span>	proxy_cache_valid 404 1m;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	# strip this header to avoid If-Modified-Since requests</span></span>
<span class="line"><span>	proxy_hide_header Last-Modified;</span></span>
<span class="line"><span>	proxy_hide_header Cache-Control;</span></span>
<span class="line"><span>	proxy_hide_header Vary;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	proxy_cache_bypass 0;</span></span>
<span class="line"><span>	proxy_no_cache 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504 http_404;</span></span>
<span class="line"><span>	proxy_connect_timeout 5s;</span></span>
<span class="line"><span>	proxy_read_timeout 45s;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	expires @30m;</span></span>
<span class="line"><span>	access_log  off;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	include conf.d/include/proxy.conf;</span></span>
<span class="line"><span>}</span></span></code></pre></div></div></div><h4 id="反代" tabindex="-1">反代 <a class="header-anchor" href="#反代" aria-label="Permalink to “反代”">​</a></h4><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-45" id="tab-46" checked><label data-title="proxy-http.conf" for="tab-46">proxy-http.conf</label><input type="radio" name="group-45" id="tab-47"><label data-title="proxy-https.conf" for="tab-47">proxy-https.conf</label><input type="radio" name="group-45" id="tab-48"><label data-title="proxy-emby.conf" for="tab-48">proxy-emby.conf</label></div><div class="blocks"><div class="language-conf active"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># 内网简版</span></span>
<span class="line"><span>server {</span></span>
<span class="line"><span>  listen 80;</span></span>
<span class="line"><span>  server_name _;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  proxy_set_header Upgrade $http_upgrade;</span></span>
<span class="line"><span>  proxy_set_header Connection $http_connection;</span></span>
<span class="line"><span>  proxy_http_version 1.1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>  location / {</span></span>
<span class="line"><span>	proxy_pass https://abc.com;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>server {</span></span>
<span class="line"><span>    listen 8443 ssl;</span></span>
<span class="line"><span>    listen [::]:8443 ssl;</span></span>
<span class="line"><span>    server_name 站点;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	http2 on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # SSL证书路径（根据你的实际路径修改）</span></span>
<span class="line"><span>    ssl_certificate /etc/nginx/ssl/abc.com/fullchain.cer;</span></span>
<span class="line"><span>    ssl_certificate_key /etc/nginx/ssl/abc.com/key.key;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # SSL优化配置</span></span>
<span class="line"><span>    ssl_protocols TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span>    ssl_ciphers &#39;ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384&#39;;</span></span>
<span class="line"><span>    ssl_prefer_server_ciphers off;</span></span>
<span class="line"><span>    ssl_session_timeout 10m;</span></span>
<span class="line"><span>    ssl_session_cache shared:SSL:50m;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 安全头部</span></span>
<span class="line"><span>    add_header X-Frame-Options SAMEORIGIN;</span></span>
<span class="line"><span>    add_header X-Content-Type-Options nosniff;</span></span>
<span class="line"><span>    add_header X-XSS-Protection &quot;1; mode=block&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 反向代理到目标服务器</span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>        proxy_pass https://代理站点;</span></span>
<span class="line"><span>        # proxy_pass       $forward_scheme://$server:$port$request_uri;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 传递必要的头部</span></span>
<span class="line"><span>        # add_header       X-Served-By $host;</span></span>
<span class="line"><span>        # proxy_set_header Host 原始域名就行;</span></span>
<span class="line"><span>        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span>        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span>        proxy_set_header X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span>        proxy_set_header X-Forwarded-Host $host;</span></span>
<span class="line"><span>        proxy_set_header X-Forwarded-Port $server_port;</span></span>
<span class="line"><span>        proxy_set_header X-Forwarded-Scheme $scheme;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 缓冲区优化</span></span>
<span class="line"><span>        proxy_buffering off;</span></span>
<span class="line"><span>        proxy_buffer_size 4k;</span></span>
<span class="line"><span>        proxy_buffers 8 4k;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 超时设置</span></span>
<span class="line"><span>        proxy_connect_timeout 30s;</span></span>
<span class="line"><span>        proxy_send_timeout 30s;</span></span>
<span class="line"><span>        proxy_read_timeout 30s;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 禁用代理缓存 如： speedtest</span></span>
<span class="line"><span>        # proxy_no_cache 1;</span></span>
<span class="line"><span>        # proxy_cache_bypass 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language-conf"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>proxy_cache_path  /var/cache/nginx/emby-videos levels=1:2 keys_zone=emby-videos:100m inactive=15d max_size=50g use_temp_path=off;</span></span>
<span class="line"><span>map $request_uri $h264Level { ~(h264-level=)(.+?)&amp; $2; }</span></span>
<span class="line"><span>map $request_uri $h264Profile { ~(h264-profile=)(.+?)&amp; $2; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>proxy_cache_path /var/cache/nginx/emby levels=1:2 keys_zone=emby:100m max_size=5g inactive=90d use_temp_path=off;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>server {</span></span>
<span class="line"><span>	listen 443 ssl;</span></span>
<span class="line"><span>    listen [::]:443 ssl;</span></span>
<span class="line"><span>    server_name 站点;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	http2 on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # SSL优化配置</span></span>
<span class="line"><span>    ssl_protocols TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span>    ssl_ciphers &#39;ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384&#39;;</span></span>
<span class="line"><span>    ssl_prefer_server_ciphers off;</span></span>
<span class="line"><span>    ssl_session_timeout 5m;</span></span>
<span class="line"><span>    ssl_session_cache shared:SSL:10m;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    client_body_buffer_size 512k;</span></span>
<span class="line"><span>    client_max_body_size 20M;</span></span>
<span class="line"><span>    add_header Strict-Transport-Security &quot;max-age=15552000; preload&quot; always;</span></span>
<span class="line"><span>    add_header &#39;Referrer-Policy&#39; &#39;origin-when-cross-origin&#39;;</span></span>
<span class="line"><span>    add_header X-Frame-Options &quot;SAMEORIGIN&quot; always;</span></span>
<span class="line"><span>    add_header X-Content-Type-Options &quot;nosniff&quot; always;</span></span>
<span class="line"><span>    add_header X-XSS-Protection &quot;1; mode=block&quot; always;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    keepalive_timeout 120s;</span></span>
<span class="line"><span>    keepalive_requests 10000;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    proxy_hide_header X-Powered-By;</span></span>
<span class="line"><span>    proxy_buffer_size 32k;</span></span>
<span class="line"><span>    proxy_buffers 4 64k;</span></span>
<span class="line"><span>    proxy_busy_buffers_size 128k;</span></span>
<span class="line"><span>    proxy_temp_file_write_size 128k;</span></span>
<span class="line"><span>    proxy_connect_timeout 1h;</span></span>
<span class="line"><span>    proxy_send_timeout 1h;</span></span>
<span class="line"><span>    proxy_read_timeout 1h;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span>	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span>	proxy_set_header X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span>	proxy_set_header X-Forwarded-Protocol $scheme;</span></span>
<span class="line"><span>	proxy_set_header X-Forwarded-Host $http_host;</span></span>
<span class="line"><span>	proxy_set_header REMOTE-HOST $remote_addr;</span></span>
<span class="line"><span>	proxy_set_header Upgrade $http_upgrade;</span></span>
<span class="line"><span>	proxy_set_header Accept-Encoding &quot;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 流媒体需要关闭</span></span>
<span class="line"><span>    # https://lemp.io/deciding-when-to-turn-off-nginx-buffering/#Situations-When-Nginx-Buffering-Should-be-Disabled</span></span>
<span class="line"><span>	proxy_buffering off;</span></span>
<span class="line"><span>	proxy_set_header Range $http_range;</span></span>
<span class="line"><span>	proxy_set_header If-Range $http_if_range;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>		proxy_pass https://emby站点;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div></div></div>`,13)])])}const _=n(l,[["render",i]]);export{k as __pageData,_ as default};
