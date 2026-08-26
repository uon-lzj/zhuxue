# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此仓库工作时提供指导。

## 项目概述

这是一个 Vue 3 工业实验平台应用，集成了教育模块（"助学平台"）。用户可配置、运行和监控工业实验（如化工过程仿真），通过 DCS 风格仪表盘查看实时数据，并导出结果。

## 常用命令

```bash
# 开发
npm run dev              # 启动开发服务器，支持热重载（/api 代理到后端）

# 构建
npm run build            # 生产构建（类型检查 + 构建）
npm run build-only       # 仅构建，跳过类型检查

# 代码检查与格式化
npm run lint             # 运行 oxlint + eslint，自动修复
npm run lint:oxlint      # 仅运行 oxlint
npm run lint:eslint      # 仅运行 eslint
npm run format           # Prettier 格式化 src/

# 预览
npm run preview          # 本地预览生产构建
```

## 架构说明

### 两个应用区域

**主平台** (`src/`): 工业实验管理
- 路由：首页、登录、实验中心、实验台、数据中心、资讯中心、关于我们
- 页面负责实验配置、DCS 仪表盘、数据导出

**助学平台** (`src/zhuxue/`): 独立模块，使用 `/zhuxue` 前缀
- 路由：登录、实践中心、离心泵异常检测
- 拥有独立的 API 层 (`src/zhuxue/api/`)、请求封装和类型定义
- 独立的样式系统在 `src/zhuxue/styles/scss/`

### 核心分层

**API 层**: `src/api/index.ts` 集中管理所有后端调用。使用自定义 Request 类 (`src/utils/request.ts`)，axios 拦截器处理 JWT token 注入和错误码 40305/40306/40307（token 过期 → 重定向到登录页）。

**状态管理**: Pinia stores 在 `src/stores/`:
- `user.ts`: 用户信息、登录状态、引导流程追踪
- `message.ts`: 全局错误/成功消息显示

**路由**: `src/router/index.ts` 定义所有路由，带 `meta.requiresAuth` 守卫。助学平台路由从 `src/router/zhuxue.ts` 导入。

**类型定义**: TypeScript interfaces 在 `src/types/`:
- `api.ts`: 请求/响应类型、API 常量（LocalHost、LocalPortList）
- `router.ts`: RouteNames 枚举
- `token.ts`: TokenKeys 用于 localStorage

### 样式系统（助学平台模块）

助学平台使用基于设计令牌的 SCSS 系统。在 `src/zhuxue/` 中工作时：

1. 在组件顶部导入 SCSS 模块：
```scss
@use '../styles/scss/variables' as *;
@use '../styles/scss/tokens' as *;
@use '../styles/scss/mixins' as *;
@use '../styles/scss/functions' as *;
```

2. 使用设计令牌（`$font-xl`、`$space-6`、`$radius-lg`）或缩放函数（`font-scale(16)`、`space-scale(24)`），避免硬编码 px 值

3. 使用断点混入改变布局：`@include compact`、`@include narrow`、`@include wide`、`@include ultrawide`

完整文档见 `src/zhuxue/styles/README.md`。

### 助学平台组件对照表

用户调整助学组件时，常以子步骤名（如"内置数据"、"模型训练"）描述目标组件。以下表格便于快速定位：

**按实验区分的组件对照表：**

| 实验名称 | 大步骤 | 子步骤名（页面显示） | 组件文件 |
|---------|--------|-------------------|---------|
| 离心泵异常检测 | 数据理解 | 生成实践所需基础数据 | `PumpDataSelectionPanel.vue` |
| 离心泵异常检测 | 数据准备 | 选择离心泵相关数据 | `SensorVariablePanel.vue` |
| 离心泵异常检测 | 数据准备 | 整合不同来源数据 | `DatasetBuilderPanel.vue` |
| 离心泵异常检测 | 模型建立 | 训练模型 | `ModelTrainingPanel.vue` |
| 离心泵异常检测 | 模型建立 | 评估和调优模型 | `ModelTestingPanel.vue` |
| 离心泵异常检测 | 模型部署 | 数据库连接 | `DatabaseConnectionPanel.vue` |
| 离心泵异常检测 | 模型部署 | CSV连接 | `CsvConnectionPanel.vue` |
| 精馏塔智能控制 | 进入实验 | 思路一 | `ExperimentStartPanel.vue` |
| 精馏塔智能控制 | 进入实验 | 思路二 | `ExperimentStartPanel.vue` |
| 精馏塔智能控制 | 成果提交 | 提交作品 | `CompetitionUploadPanel.vue` |

**通用组件（两个实验共享）：**

| 子步骤名 | 组件文件 | 说明 |
|---------|---------|------|
| 内置数据 | `BuiltinDataPanel.vue` | 内置数据选择与标注 |
| 仿真数据 | `SimulationDataPanel.vue` | 仿真数据生成 |
| 采集数据 | `FieldDataPanel.vue` | IoT 网关数据采集 |
| 自上传数据 | `UploadDataPanel.vue` | 本地数据上传 |
| 数据集构建 | `DatasetBuilderPanel.vue` | 训练/测试集划分 |
| 传感器变量选择 | `SensorVariablePanel.vue` | 特征选择 |
| 模型训练 | `ModelTrainingPanel.vue` | 算法选择与参数配置 |
| 模型测试 | `ModelTestingPanel.vue` | 模型评估验证 |
| 模型上传 | `ModelUploadPanel.vue` | 模型保存管理 |
| 数据库连接 | `DatabaseConnectionPanel.vue` | InfluxDB/MySQL 连接 |
| CSV连接 | `CsvConnectionPanel.vue` | CSV 文件接口 |

**其他业务组件：**
| 中文名称 | 组件文件 | 说明 |
|---------|---------|------|
| 添加仿真数据弹窗 | `AddSimulationDataModal.vue` | 仿真数据配置弹窗 |
| 拖拽填充面板 | `DragFillPanel.vue` | 文字类任务拖拽填空 |
| 推理监控面板 | `InferenceMonitorPanel.vue` | 模型推理实时监控 |
| 步骤提示面板 | `StepsHintPanel.vue` | 操作步骤提示引导 |
| 文字类任务面板 | `TextTaskPanel.vue` | 拖拽填空类任务 |
| 代码类任务面板 | `CodeTaskPanel.vue` | 在线编程类任务 |
| 数据标注考核 | `DataAnnotationQuizPanel.vue` | 数据标注考核弹窗 |

**页面级组件：**
| 中文名称 | 组件文件 | 说明 |
|---------|---------|------|
| 导航面板 | `NavPanel.vue` | 学习步骤 + 考核导览 |
| 知识面板 | `KnowledgePanel.vue` | 理论学习内容展示 |
| 实验环境面板 | `LabPanel.vue` | 动手实践区域容器 |
| 图标侧边栏 | `IconSidebar.vue` | 步骤/建议切换按钮 |
| 学习建议面板 | `SuggestionPanel.vue` | 五维能力雷达图 |
| 右侧悬浮栏 | `SideWidgets.vue` | 我的数据/模型/AI答疑 |
| 排行榜面板 | `LeaderboardPanel.vue` | 精馏塔大赛排行榜 |

**悬浮面板（SideWidgets 展开）：**
| 中文名称 | 组件文件 | 说明 |
|---------|---------|------|
| 我的数据面板 | `MyDataPanel.vue` | 已构建数据集列表 |
| 我的模型面板 | `MyModelPanel.vue` | 已保存模型列表 |
| AI答疑面板 | `AIQAPanel.vue` | AI 问答交互 |

**考核组件：**
| 中文名称 | 组件文件 | 说明 |
|---------|---------|------|
| 考核组件 | `QuizComponent.vue` | 单选/判断/多选题考核 |

**基础组件：**
| 中文名称 | 组件文件 | 说明 |
|---------|---------|------|
| 头部导航 | `HeaderComponent.vue` | 顶部导航栏 |
| 底部导航 | `FooterComponent.vue` | 底部信息栏 |
| 任务说明块 | `TaskDescriptionBlock.vue` | 操作任务描述 |
| 趋势图面板 | `TrendChartPanel.vue` | 传感器数据趋势图 |
| 自定义分页 | `CustomPagination.vue` | 分页组件 |
| 数据标注面板 | `DataAnnotationPanel.vue` | 数据标注操作 |
| 数据集列表 | `DatasetListPanel.vue` | 数据集展示 |

**视图页面：**
| 中文名称 | 组件文件 | 说明 |
|---------|---------|------|
| 实践中心页 | `PracticeCenterView.vue` | 实验项目列表 |
| 离心泵异常检测页 | `PumpAnomalyDetectionView.vue` | 离心泵实验页面 |
| 精馏塔智能控制页 | `DistillationIntelligentControlView.vue` | 精馏塔大赛页面 |
| 登录页 | `LoginView.vue` | 用户登录 |
| 注册页 | `RegisterView.vue` | 用户注册 |
| 忘记密码页 | `ForgotPasswordView.vue` | 密码找回 |

**布局组件：**
| 中文名称 | 组件文件 | 说明 |
|---------|---------|------|
| 助学布局 | `ZhuxueLayout.vue` | 助学平台页面布局 |

### 组件自动导入

Element Plus 组件通过 `unplugin-vue-components` 自动导入。ElButton、ElDialog 等无需手动导入。`@element-plus/icons-vue` 图标已全局注册。

## 开发注意事项

- **禁止使用脚本（Node/Python 等）批量修改文件。** 始终使用 Edit 工具逐文件修改，一次只改一个文件。
- `dist` 和 `dcs_dist` 目录是构建输出目录，**不应手动修改**，任何更改应通过 `npm run build` 重新生成
- `vite.config.ts` 中 API 代理目标为 `http://192.168.1.119:8022`，代理 `/api` 和 `/userdata`
- Node 版本要求：`^20.19.0 || >=22.12.0`
- 路径别名：`@` → `src/`
- Element Plus 语言设置为中文 (`zh-cn`)
- 项目未配置测试框架