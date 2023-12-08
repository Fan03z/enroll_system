# Enroll System

**开发环境配置**

> 要求
>
> **node** >= v20.10.0
>
> **docker**

```zsh
# 安装依赖库
npm install

# 本地配置 mongodb,具体查看.env.example
docker pull mongo
docker pull prismagraphql/mongo-single-replica:5.0.3
docker run --name enroll_system  -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME="admin" -e MONGO_INITDB_ROOT_PASSWORD="123456" -d prismagraphql/mongo-single-replica:5.0.3

# 3000端口运行启动
npm run dev
```

**主要技术栈:**

> NextJs
>
> tailwind css
>
> shadcn ui
>
> prisma
>
> mongodb

**FIXME**

-   [x] 通过更改路由地址,可以直接跳过验证去填表单 [问题位置](./components/InputWithButton.tsx)
-   [ ] middleware 无法删除 cookie [问题位置](./middleware.ts)
-   [ ] Form Image 输入得做文件格式识别 [问题位置](./components/RegisterForm.tsx)
-   [ ] 发送 Get 请求会发生 cors 跨域请求错误,目前暂时的处理办法是通过 cors-anywhere 处理,但这个处理先不急,看看如果能用微信扫码验证登录之后会怎么样 [问题位置](./bin/Submit.ts)

**TODO**

-   [ ] 试试前端实现微信扫码登录
-   [x] 表单提交后,发送表单信息到数据库
