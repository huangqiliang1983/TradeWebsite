# Enterprise B2B Website Structure & Rules

## 技术栈
- 框架：Next.js (App Router)
- 语言：TypeScript (Strict Mode)
- 样式：Tailwind CSS ( mobile-first )
- 数据库：Prisma
- 测试：Jest

## 目录结构
- `/app/` - 页面及路由，所有业务路由页面。预留了 `/app/admin/` 作为未来后台使用。
- `/components/` - 全局公共组件，如 Header, Footer, Button, Input 等。
- `/features/` - 按照业务模块划分的功能组件，避免耦合。
- `/lib/` - 通用工具函数、接口类型定义、SEO 辅助类、环境变量配置及检验。
- `/prisma/` - 数据库模型和配置存放。
- `/tests/` - 测试文件存放。

## 禁止事项
1. 不要引入第二套状态管理、UI 体系、请求方案（如未经允许引入 Redux / Material-UI 等）。优先利用 Next.js 原生特性。
2. 不要保留重复实现（比如多个工具文件中重复相似的字符串处理逻辑等）。
3. 不要过度抽象。在早期阶段，优先实现最少且最符合逻辑的代码架构。
4. 不要只做桌面版再补移动端。始终遵守 mobile-first 开发策略，先小屏再大屏。
5. 不要把安全问题推迟到最后统一补。从第一步起就关注安全。

## 安全固定规则
1. 所有密钥只允许放环境变量，**绝不可能**提交到仓库。
2. 所有写操作未来都必须做服务端校验。
3. 表单、登录、上传接口未来都必须具备基础限流或防滥用机制。
4. 后台路由和后台接口未来必须鉴权。
5. 不要在前台页面暴露敏感配置或内部报错细节。

## 响应式固定规则
1. 网站必须同时适配手机（例如默认）、平板（sm/md）、电脑（lg/xl）三端。
2. 采用 mobile-first 实现：默认编写手机端样式，然后通过 Tailwind 的 `md:` 或 `lg:` 前缀完成扩展。
3. 公共组件必须支持响应式参数或者支持被响应式的布局容器限制。
4. 每次页面开发后都要检查三种视图。

## 检查命令 (CI / 基础验证)
在提交代码或测试完成度前，运行并确保通过：
`npm run lint && npm run typecheck && npm run test && npm run build && npm audit`
