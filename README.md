
```angular2html
├── README.md # 项目说明文件
├── dist # 项目构建之后的目录
├── env.d.ts # 环境类型声明文件
├── index.html # 项目的根页面
├── package-lock.json # 依赖锁文件
├── package.json # 项目配置和依赖管理
├── public # 静态资源目录 - 不会被构建工具处理的原始文件
├── src
│         ├── App.vue
│         ├── api # 请求相关
│         │         └── index.ts
│         ├── components # 组件库
│         │         ├── BaseLayout.vue # 公共基础组建
│         │         ├── BottomLayout.vue # 页面底部组件
│         │         ├── LabDataLayout.vue # 实验数据组件
│         │         ├── LabPointLayout.vue # 实验数据点组件
│         │         ├── MainLayout.vue # 页面主要内容组件
│         │         ├── TipMessageLayout.vue # 提示消息组件
│         │         ├── TopLayout.vue # 页面顶部组件
│         ├── main.ts # 应用的入口文件
│         ├── router # 页面路由配置相关
│         │         └── index.ts
│         ├── stores # 状态存储
│         │         ├── message.ts # 提示消息
│         │         └── user.ts # 用户信息
│         ├── types # 常量枚举
│         │         ├── api.ts # 请求
│         │         ├── lab.ts # 实验
│         │         ├── router.ts # 路由
│         │         └── token.ts # token
│         ├── utils # 工具包
│         │         ├── common.ts # 公共
│         │         ├── request.ts # 请求
│         │         └── router.ts # 路由
│         └── views # 主要页面
│             ├── HomeView.vue # 实验台列表页面
│             ├── LabDataDetailView.vue # 实验详情页面
│             ├── LabDataView.vue # 历史实验列表页面
│             ├── LaboratoryView.vue # 实验配置页面
│             └── LoginView.vue # 登录页面
├── tsconfig.app.json # 应用代码配置
├── tsconfig.json # 基础 TypeScript 配置
├── tsconfig.node.json # Node.js/构建工具配置
└── vite.config.ts # Vite 构建工具配置
```