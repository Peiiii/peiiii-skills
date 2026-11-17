# 规则与实践索引

ID格式：`ui.<模块>.<英文slug>`。一项一个文件，ID稳定且跨目录唯一；移动文件保留ID并修订所有引用。硬性规则按适用条件检查，条件模式帮助选型；不把一种组件强制套用所有页面。

## 硬性规则

命中适用条件后必须核验正向要求与禁止项；不通过应报告finding并修正，或记录用户明确选择的例外。审美偏好不是可机械证明的硬约束。

| ID | 内容 |
| --- | --- |
| [ui.behavior.accessibility](rules/ui.behavior.accessibility.md) | 可访问性是清晰度的底线 |
| [ui.behavior.feedback-recovery](rules/ui.behavior.feedback-recovery.md) | 操作反馈与恢复 |
| [ui.behavior.responsive-context](rules/ui.behavior.responsive-context.md) | 窄屏保留任务上下文 |
| [ui.behavior.states](rules/ui.behavior.states.md) | 状态真实且可区分 |
| [ui.clarity.progressive-disclosure](rules/ui.clarity.progressive-disclosure.md) | 先呈现判断所需的信息 |
| [ui.clarity.recognizable-objects](rules/ui.clarity.recognizable-objects.md) | 让用户识别而非记忆 |
| [ui.clarity.region-purpose](rules/ui.clarity.region-purpose.md) | 区域有明确用途 |
| [ui.clarity.relationships](rules/ui.clarity.relationships.md) | 关系通过布局表达 |
| [ui.clarity.stable-locations](rules/ui.clarity.stable-locations.md) | 位置和行为保持稳定 |
| [ui.clarity.total-effort](rules/ui.clarity.total-effort.md) | 降低完整任务的成本 |
| [ui.clarity.useful-space](rules/ui.clarity.useful-space.md) | 空间服务阅读和扫描 |
| [ui.clarity.visible-priority](rules/ui.clarity.visible-priority.md) | 重要程度看得出来 |
| [ui.controls.input-affordance](rules/ui.controls.input-affordance.md) | 输入控件默认即可识别 |
| [ui.visual.region-boundaries](rules/ui.visual.region-boundaries.md) | 密集内容必须有可辨认分区 |
| [ui.visual.surface-restraint](rules/ui.visual.surface-restraint.md) | 视觉强调应有明确用途 |
| [ui.visual.status-icons](rules/ui.visual.status-icons.md) | 常见状态图标优先 |

## 组件与布局最佳实践

这些是按任务选择的模式，不是逐项必须使用的控件清单。

| ID | 内容 |
| --- | --- |
| [ui.pattern.cards](patterns/ui.pattern.cards.md) | 卡片 |
| [ui.pattern.dialog](patterns/ui.pattern.dialog.md) | 对话框 |
| [ui.pattern.drawer](patterns/ui.pattern.drawer.md) | 抽屉 |
| [ui.pattern.icons](patterns/ui.pattern.icons.md) | 图标与对象标识 |
| [ui.pattern.inline-menu](patterns/ui.pattern.inline-menu.md) | 就地编辑与菜单 |
| [ui.pattern.list-detail](patterns/ui.pattern.list-detail.md) | 列表与详情分栏 |
| [ui.pattern.list-table](patterns/ui.pattern.list-table.md) | 列表与表格 |
| [ui.pattern.navigation-tabs](patterns/ui.pattern.navigation-tabs.md) | 侧边导航与页签 |
| [ui.pattern.report-feed](patterns/ui.pattern.report-feed.md) | 汇报时间流 |
| [ui.pattern.spacing](patterns/ui.pattern.spacing.md) | 空间、邻近与对齐 |
| [ui.pattern.supporting-pane](patterns/ui.pattern.supporting-pane.md) | 右侧辅助栏 |
| [ui.pattern.surface-elevation](patterns/ui.pattern.surface-elevation.md) | 背景、容器与阴影 |
| [ui.pattern.tags](patterns/ui.pattern.tags.md) | 标签与状态标记 |
| [ui.pattern.tree](patterns/ui.pattern.tree.md) | 树与组织图 |

## 共享规则库中的补充约束

以下规则正文由自有UI Rules库维护，不在Skill内复制。检查按钮、列表行、折叠标题或菜单项时，必须加载[ui.layout.content-inset · 交互表面的实际内容保留内边距](https://github.com/Peiiii/ui-rules/blob/main/rules/layout/content-inset.md)，覆盖仅在hover、焦点、选中或展开后才显露的表面及尾部图标。它补充空间模式，不等于任意项目已通过验证。

本机有个人Skill登记工具时，可用`node <personal-skills仓库>/scripts/skills.mjs resource ui-rules`定位本地规则库；无本地副本时读取上述来源链接。
