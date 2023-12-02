# Nodestats

基于 NodeJS 的服务器状态监控。

## 使用

### 服务端

全局安装 `@nodestats/server` 命令行工具以便快速开启服务端

```bash
npm i @nodestats/server -g
```

目前支持以下选项

```plain
Usage: nodestats-server [options]

CLI to start a nodestats server

Options:
  -p, --port <port>          port number
  -i, --interval <interval>  interval push stats to web
  --client-config <path>     client configuration absolute path
  -v, --version              output the current version
  -h, --help                 display help for command
```

- `port`：服务所监听的端口号（默认 35601）
- `interval`：服务推送状态数据到 web 端的时间间隔，单位为 ms（默认 2000）
- `clientConfig`：客户端配置文件的绝对路径（必选）

根目录下 `__config/clients.yaml` 是一个客户端配置文件示例，你可以作为参考。

### 客户端

全局安装 `@nodestats/client` 命令行工具以便快速启动客户端

```bash
npm i @nodestats/client -g
```

目前支持以下选项

```plain
Usage: nodestats-client [options]

CLI to start a nodestats client

Options:
  -s, --server <server>  server host
  -p, --port <port>      server port number
  -t, --token <token>    access token
  -v, --version          output the current version
  -h, --help             display help for command
```

- `server`：服务端的 ip 地址（默认 127.0.0.1）
- `port`：服务端监听的端口号（默认 35601）
- `token`：访问服务端所需的令牌，与你在客户端配置文件填写的内容进行匹配（必选）