# 🔥 V2HOT - 每日 V2EX 最热主题 🔥

## 关于

一个能查看 V2EX 每天最热的网站。

## 访问

可以通过下列域名访问，选择访问最快的域名。

- https://v2hot.github.io/
- https://v2hot.netlify.app/
- https://v2hot.pipecraft.net/
- https://v2hot.vercel.app/
- https://v2hot.now.sh/
- https://v2exhot.web.app/
- https://v2exhot.vercel.app/
- https://v2exhot.now.sh/

## API

生成网页用到的数据以 json 格式保存在 [data](https://github.com/v2hot/v2hot.github.io/tree/data) 分支里。
任何人可以拿去使用。

### 今日热议主题

https://cdn.jsdelivr.net/gh/v2hot/v2hot.github.io@data/v2ex-api/hot-topics.json

### 每日最热主题

格式：`https://cdn.jsdelivr.net/gh/v2hot/v2hot.github.io@data/{{tab}}/{{year}}/{{date}}.json`

举例：

- https://cdn.jsdelivr.net/gh/v2hot/v2hot.github.io@data/hot/2021/2021-12-07.json
- https://cdn.jsdelivr.net/gh/v2hot/v2hot.github.io@data/tech/2021/2021-12-07.json

### 每日新上榜主题

格式：`https://cdn.jsdelivr.net/gh/v2hot/v2hot.github.io@data/{{tab}}/newest.json`

举例：

- https://cdn.jsdelivr.net/gh/v2hot/v2hot.github.io@data/hot/newest.json
- https://cdn.jsdelivr.net/gh/v2hot/v2hot.github.io@data/tech/newest.json

## 反馈

如果有什么建议或反馈，[请提交 issue](https://github.com/v2hot/v2hot.github.io/issues)。

## License

Copyright (c) 2021 [Pipecraft][my-url]. Licensed under the [MIT license][license-url].

## >\_

[![Pipecraft](https://img.shields.io/badge/site-pipecraft-brightgreen)](https://www.pipecraft.net)
[![PZWD](https://img.shields.io/badge/site-pzwd-brightgreen)](https://pzwd.net)

[my-url]: https://www.pipecraft.net
[license-url]: LICENSE
