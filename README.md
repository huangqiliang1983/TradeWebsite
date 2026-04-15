# Enterprise Foreign Trade Website

## 介绍
这是一个企业外贸官网项目。项目核心目标是：**Google SEO + 询盘转化 + 后台可维护**。

## 特点
- **Mobile-first** 响应式设计。
- 采用 **Next.js (App Router)** 提供更好的 SEO 与服务端渲染。
- 基于 **TypeScript** 使用严格模式保证代码质量和可维护性。
- **Tailwind CSS** 用于构建快速且可定制的界面设计。
- Prisma ORM 作为数据库交互层（后续补充 Schema 设计）。

## 有用的命令
- `npm run dev`: 启动开发服务器。
- `npm run lint`: 执行代码格式及规范检查。
- `npm run typecheck`: 运行 TypeScript 类型检查。
- `npm run test`: 运行 Jest 测试用例。
- `npm run build`: 构建用于生产环境的项目内容。

## 开发指南
- 开发前请先查阅 `AGENTS.md` 中的规范约束和开发规则。
- 遇到任何环境变量问题，参考 `.env.example`，并将对应内容配置在 `.env` 当中。
- 所有非业务通用组件放入 `components/`，功能相关组件存入 `features/`。
