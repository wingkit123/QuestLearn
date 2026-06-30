# 项目进展文档

## 最新进展 (2026-06-30)
- 修复了学术导师（Advisor）在跟进低分学生时因数据库表 notification 缺少 title 字段导致通知发送失败的 Bug。
- 移除了顶栏（Topbar）的多余铃铛通知图标，统一收纳至侧边栏。
- 在侧边栏（Sidebar）新增了全局「通知 (Notifications)」入口，并实现了基于 Supabase 实时订阅的红点提醒机制，未读通知时显示红点，进入页面后自动消除红点。
- 实现了通用的、数据驱动的 NotificationInbox 客户端组件，并为所有角色（学生、讲师、导师、管理员）上线了专属的动态通知页面。
- 重构了学术导师主面板（Dashboard）页面，将静态的 Mock 数据替换为从数据库动态获取的实际分配学生列表及其风险警报，使主面板数据与「My Students」页面完全吻合。
- 根据 Database-Schema.sql 中的建表语句，自动生成了完整的实体关系图（ERD，基于 Mermaid 语法）以及与您提供的样例格式完全一致的数据字典属性映射表（erd_documentation.md），覆盖了所有的实体和字段属性。
- 完成了项目最终系统文档 part-iii/Part-III-System-Documentation.md 中的 ERD 图表（Section 3.1）和数据字典（Section 4.1）表结构的重构，使字段格式严格遵循您提供的样例模板 (Table Name, Field Name, Data Type, Length, PK/FK, Required, Null/Not Null, Description) 并合并推送至 GitHub 主分支。
- 生产环境打包（npm run build）测试通过，所有 TypeScript 类型及编译均无报错。
- **更新了讲师个人报告（[Individual-Report-Aziel.md](file:///c:/Users/aziel/OneDrive/Desktop/SEF_P3/wing%20kit%20sef%20report/Individual-Report-Aziel.md)）**：全面升级至 Version 3.0，补齐了 `UC-INS-04`（创建模块依赖）用例，修复了原 ERD 图表中缺失的大量实体及 `COURSE` 与 `ASSIGNMENT_SUBMISSION` 之间的直接连接错误，同步了最新的 Next.js 15 路由文件路径和验收测试（Acceptance Testing）数据表。

## 下一步
- 随时向我发送下一步想要开发或者修改的需求！
