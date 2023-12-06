# Enroll System

**开发环境配置**

> 要求
>
> **node** >= v20.10.0

```zsh
# 安装依赖库
npm install

# 3000端口运行启动
npm run dev
```

**主要技术栈:**

> NextJs
>
> tailwind css
>
> shadcn ui

**FIXME**

-   [ ] 通过更改路由地址,可以直接跳过验证去填表单 [问题位置](./components/InputWithButton.tsx)
-   [ ] Form Image 输入得做文件格式识别 [问题位置](./components/RegisterForm.tsx)
-   [ ] 发送 Get 请求会发生 cors 跨域请求错误,目前暂时的处理办法是通过 cors-anywhere 处理,但这个处理先不急,看看如果能用微信扫码验证登录之后会怎么样 [问题位置](./bin/Submit.ts)

**TODO**

-   [ ] 试试前端实现微信扫码登录
-   [ ] 表单提交后,发送表单到数据库
