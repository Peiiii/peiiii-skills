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
- `ui.controls.field-focus`：输入和选择控件聚焦时保持边框颜色和尺寸。用光标或轻底色提示焦点，组合输入由外层统一反馈。
- `ui.layout.compact-row-spacing`：统一行内间距，标签靠近对象，尾部操作对齐；复查有无标签和窄屏。详见 UI Rules 的 `rules/layout.md`。

- `ui.content.status-presentation`：状态择一表达；图标须有可访问名称，靠形状或文字区分，不叠加重复标签。详见 UI Rules 的 `rules/content.md`。

## 按任务查看

| 场景 | 读取 |
| --- | --- |
| 按钮、输入、Tooltip、菜单、弹窗、状态 | [控件与交互](references/controls.md) |
| 页面结构、列表、侧栏、导航、响应式 | [布局与导航](references/layout.md) |
| 内容层级、视觉分区、图标、卡片、汇报 | [内容与视觉](references/content.md) |

## 实现与 Review

1. **实现前确定命中规则。** 列出将改动的控件和交互，从上表定位参考文件。用本库的 `node scripts/skills.mjs resource ui-rules` 定位规则库，只读相关的 `rules/<module>.md`。为每个命中 ID 简记对应控件和验收动作，例如 `ui.feedback.interactive-hover` 对应「移入更多操作图标，按下前出现独立底色」。
2. **实现时复用状态。** 先检查现有组件、样式和设计变量，用原组件实现命中规则。识别父级和子控件同时反馈的状态，以及相关的键盘和触屏入口。
3. **Review 逐条核验。** 根据实际改动回看命中规则，补上新增场景。按「规则 ID → 控件 → 操作与结果」在页面上验证。静态检查和交互检查分别记录，未核验的状态明确标出。小改动在 Review 结论中简记即可。

规则正文和实现建议留在原模块。规则以英文 ID 引用，同一模块写在一个文件内。外部依据见[来源](references/sources.md)。
