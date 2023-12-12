# Enroll System

**开发环境配置**

> 要求
>
> **node** >= v20.10.0
>
> **ssl**
>
> **docker**

```zsh
# 安装依赖库
npm install

# 本地配置 mongodb,具体查看.env.example
docker pull mongo
docker pull prismagraphql/mongo-single-replica:5.0.3
docker run --name enroll_system  -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME="admin" -e MONGO_INITDB_ROOT_PASSWORD="123456" -d prismagraphql/mongo-single-replica:5.0.3

# 更新prisma(每次更改schema.prisma后都要更新)
npx prisma generate

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
-   [x] middleware 无法删除 cookie [问题位置](./middleware.ts)
-   [ ] Form Image 输入得做文件格式识别 [问题位置](./components/RegisterForm.tsx)
-   [ ] 发送 Get 请求会发生 cors 跨域请求错误,目前暂时的处理办法是通过 cors-anywhere 处理,但这个处理先不急,看看如果能用微信扫码验证登录之后会怎么样 [问题位置](./bin/Submit.ts)
-   [ ] 用 axios 发送 GET 请求会报错,无法加载页面,目前用的 fetch() 顶替 [问题位置](./app/admin/page.tsx)
-   [ ] 数据库内容更新后,admin page 不会更新 [问题位置](./app/admin/page.tsx)

**TODO**

-   [ ] 试试前端实现微信扫码登录
-   [x] 表单提交后,发送表单信息到数据库
-   [x] 添加管理员页面，可以查看所有提交表单，并且能判断是否通过
-   [x] 设置管理员的登录条件,以及添加进 middleware 控制范围
-   [x] 管理员界面内容从数据库 api 取
