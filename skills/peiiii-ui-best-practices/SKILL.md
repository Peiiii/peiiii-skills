---
name: peiiii-ui-best-practices
description: 在设计、实现或评审项目界面时使用，尤其适用于建立可复用基础组件、理清信息层级、提高界面一致性与定位效率。纯配色探索、无界面变化的业务实现不触发。
---

# Peiiii UI 最佳实践

## 每次实现都看

- `ui.clarity.visible-priority`：先让人看出当前对象、关键结果和主操作。其余信息靠分组、字号和字重降级。
- `ui.pattern.shadcn-native-components`：先复用项目组件；补通用组件时参考 [shadcn 源码](https://ui.shadcn.com/docs/components)，保留交互和可访问性，用项目 token 统一主题、字号和尺寸。
- `ui.behavior.accessibility`：使用语义控件、可访问名称和可见键盘焦点。状态兼用文字或形状。普通文字对比度至少 4.5:1，大字 3:1；触控目标按 WCAG 2.2 条件核对 24×24 CSS px 与适用例外。
- `ui.behavior.action-focus`：共享按钮只画一层贴合的键盘焦点标记。禁止页面叠加 outline/ring、指针关闭菜单后留外圈或用 blur 隐藏焦点。验收鼠标点开／点外关闭和 Tab／Enter／Escape，确认焦点正常归还。
- `ui.controls.field-focus`：输入和选择控件聚焦时只强化原边界，禁止叠加外圈或改变尺寸；组合输入只在外层画反馈。

## 按任务查看

| 场景 | 读取 |
| --- | --- |
| 按钮、输入、Tooltip、菜单、弹窗、状态 | [控件与交互](references/controls.md) |
| 页面结构、列表、侧栏、导航、响应式 | [布局与导航](references/layout.md) |
| 内容层级、视觉分区、图标、卡片、汇报 | [内容与视觉](references/content.md) |

在真实页面验收当前任务及受影响状态。规则以英文 ID 引用，同一模块写在一个文件内；新增规则通常只需一句。`ui.pattern.*` 按场景采用，其他规则命中时必须检查。外部依据见[来源](references/sources.md)。
