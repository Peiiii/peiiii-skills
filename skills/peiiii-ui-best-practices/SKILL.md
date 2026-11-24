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
- [`ui.layout.compact-row-spacing`](#共享-ui-rules)：统一行内间距，标签靠近对象，尾部操作对齐；复查有无标签和窄屏。
- [`ui.content.status-presentation`](#共享-ui-rules)：状态择一表达；图标须有可访问名称，靠形状或文字区分，不叠加重复标签。

## 实现与 Review

1. **实现前确定命中规则。** 列出将改动的控件和交互，从下方索引找相关 ID，跨模块匹配场景，只打开命中的正文。反馈只说「太宽」「太长」时，先确认指的是哪个区域和哪个维度。为每个命中 ID 简记对应控件和验收动作，例如 `ui.feedback.interactive-hover` 对应「移入更多操作图标，按下前出现独立底色」。
2. **实现时复用状态。** 先检查现有组件、样式和设计变量，用原组件实现命中规则。识别父级和子控件同时反馈的状态，以及相关的键盘和触屏入口。
3. **Review 逐条核验。** 根据实际改动回看命中规则，补上新增场景。按「规则 ID → 控件 → 操作与结果」在页面上验证。静态检查和交互检查分别记录，未核验的状态明确标出。小改动在 Review 结论中简记即可。

## 全量规则索引

Skill 自有规则在链接文件内按 ID 查找。共享规则链接直达 UI Rules 小节，沿用正文的等级与状态。如需读取本机版本，沿已加载的 `SKILL.md` 的真实路径找到 `peiiii-skills` 仓库根目录，用 `node <仓库根>/scripts/skills.mjs resource ui-rules` 定位本机检出，再打开命中的模块小节。外部依据见[来源](references/sources.md)。

<!-- rule-index:start -->

### Skill 自有规则

| 规则 ID | 场景提示 |
| --- | --- |
| [`ui.behavior.accessibility`](SKILL.md) |  |
| [`ui.behavior.action-focus`](SKILL.md) | 关菜单后按钮留外圈 |
| [`ui.behavior.feedback-recovery`](references/controls.md) |  |
| [`ui.behavior.responsive-context`](references/layout.md) |  |
| [`ui.behavior.states`](references/controls.md) |  |
| [`ui.clarity.progressive-disclosure`](references/content.md) |  |
| [`ui.clarity.recognizable-objects`](references/content.md) |  |
| [`ui.clarity.region-purpose`](references/layout.md) |  |
| [`ui.clarity.relationships`](references/layout.md) |  |
| [`ui.clarity.stable-locations`](references/layout.md) |  |
| [`ui.clarity.total-effort`](references/layout.md) |  |
| [`ui.clarity.useful-space`](references/layout.md) | 正文太宽、侧栏占空间 |
| [`ui.clarity.visible-priority`](SKILL.md) |  |
| [`ui.controls.field-focus`](SKILL.md) | 输入框聚焦时边框变粗、变色 |
| [`ui.controls.inline-action-density`](references/controls.md) |  |
| [`ui.controls.input-affordance`](references/controls.md) |  |
| [`ui.controls.stable-press-feedback`](references/controls.md) |  |
| [`ui.pattern.cards`](references/content.md) |  |
| [`ui.pattern.dialog`](references/controls.md) |  |
| [`ui.pattern.drawer`](references/controls.md) |  |
| [`ui.pattern.icons`](references/content.md) |  |
| [`ui.pattern.inline-menu`](references/controls.md) |  |
| [`ui.pattern.list-detail`](references/layout.md) |  |
| [`ui.pattern.list-table`](references/layout.md) |  |
| [`ui.pattern.navigation-tabs`](references/layout.md) |  |
| [`ui.pattern.report-feed`](references/content.md) |  |
| [`ui.pattern.shadcn-native-components`](SKILL.md) |  |
| [`ui.pattern.spacing`](references/layout.md) |  |
| [`ui.pattern.supporting-pane`](references/layout.md) |  |
| [`ui.pattern.surface-elevation`](references/content.md) |  |
| [`ui.pattern.tags`](references/content.md) |  |
| [`ui.pattern.tree`](references/layout.md) |  |
| [`ui.visual.region-boundaries`](references/content.md) |  |
| [`ui.visual.status-icons`](references/content.md) |  |
| [`ui.visual.surface-restraint`](references/content.md) |  |

### 共享 UI Rules

| 规则 ID | 场景提示 |
| --- | --- |
| [`ui.content.density-with-purpose`](https://github.com/Peiiii/ui-rules/blob/main/rules/content.md#uicontentdensity-with-purpose) |  |
| [`ui.content.progressive-detail`](https://github.com/Peiiii/ui-rules/blob/main/rules/content.md#uicontentprogressive-detail) |  |
| [`ui.content.status-near-source`](https://github.com/Peiiii/ui-rules/blob/main/rules/content.md#uicontentstatus-near-source) |  |
| [`ui.content.status-presentation`](https://github.com/Peiiii/ui-rules/blob/main/rules/content.md#uicontentstatus-presentation) | 同一状态重复显示图标和文字 |
| [`ui.content.truncation-recovery`](https://github.com/Peiiii/ui-rules/blob/main/rules/content.md#uicontenttruncation-recovery) | 长标题、尾部按钮被挤走、看全文 |
| [`ui.feedback.async-progress`](https://github.com/Peiiii/ui-rules/blob/main/rules/feedback.md#uifeedbackasync-progress) |  |
| [`ui.feedback.disabled-reason`](https://github.com/Peiiii/ui-rules/blob/main/rules/feedback.md#uifeedbackdisabled-reason) |  |
| [`ui.feedback.interactive-hover`](https://github.com/Peiiii/ui-rules/blob/main/rules/feedback.md#uifeedbackinteractive-hover) |  |
| [`ui.feedback.outcome-feedback`](https://github.com/Peiiii/ui-rules/blob/main/rules/feedback.md#uifeedbackoutcome-feedback) |  |
| [`ui.feedback.pressed-state`](https://github.com/Peiiii/ui-rules/blob/main/rules/feedback.md#uifeedbackpressed-state) |  |
| [`ui.feedback.selection-state`](https://github.com/Peiiii/ui-rules/blob/main/rules/feedback.md#uifeedbackselection-state) |  |
| [`ui.feedback.state-fidelity`](https://github.com/Peiiii/ui-rules/blob/main/rules/feedback.md#uifeedbackstate-fidelity) |  |
| [`ui.forms.actionable-validation`](https://github.com/Peiiii/ui-rules/blob/main/rules/forms.md#uiformsactionable-validation) |  |
| [`ui.forms.ime-safe-submit`](https://github.com/Peiiii/ui-rules/blob/main/rules/forms.md#uiformsime-safe-submit) | 输入法选词时误提交 |
| [`ui.forms.password-visibility`](https://github.com/Peiiii/ui-rules/blob/main/rules/forms.md#uiformspassword-visibility) |  |
| [`ui.forms.pending-submit`](https://github.com/Peiiii/ui-rules/blob/main/rules/forms.md#uiformspending-submit) |  |
| [`ui.forms.persistent-label`](https://github.com/Peiiii/ui-rules/blob/main/rules/forms.md#uiformspersistent-label) |  |
| [`ui.forms.preserve-input`](https://github.com/Peiiii/ui-rules/blob/main/rules/forms.md#uiformspreserve-input) | 提交失败后草稿丢失 |
| [`ui.keyboard.focus-restoration`](https://github.com/Peiiii/ui-rules/blob/main/rules/keyboard.md#uikeyboardfocus-restoration) | 关弹窗或菜单后焦点去哪 |
| [`ui.keyboard.focus-visible`](https://github.com/Peiiii/ui-rules/blob/main/rules/keyboard.md#uikeyboardfocus-visible) |  |
| [`ui.keyboard.keyboard-operability`](https://github.com/Peiiii/ui-rules/blob/main/rules/keyboard.md#uikeyboardkeyboard-operability) |  |
| [`ui.keyboard.no-keyboard-trap`](https://github.com/Peiiii/ui-rules/blob/main/rules/keyboard.md#uikeyboardno-keyboard-trap) |  |
| [`ui.layout.compact-row-spacing`](https://github.com/Peiiii/ui-rules/blob/main/rules/layout.md#uilayoutcompact-row-spacing) | 列表标签、尾部按钮、行间距 |
| [`ui.layout.content-inset`](https://github.com/Peiiii/ui-rules/blob/main/rules/layout.md#uilayoutcontent-inset) |  |
| [`ui.mobile.hover-independent`](https://github.com/Peiiii/ui-rules/blob/main/rules/mobile.md#uimobilehover-independent) |  |
| [`ui.mobile.touch-target`](https://github.com/Peiiii/ui-rules/blob/main/rules/mobile.md#uimobiletouch-target) |  |
| [`ui.mobile.viewport-reflow`](https://github.com/Peiiii/ui-rules/blob/main/rules/mobile.md#uimobileviewport-reflow) |  |
| [`ui.motion.interruptible-motion`](https://github.com/Peiiii/ui-rules/blob/main/rules/motion.md#uimotioninterruptible-motion) |  |
| [`ui.motion.reduced-motion`](https://github.com/Peiiii/ui-rules/blob/main/rules/motion.md#uimotionreduced-motion) |  |
| [`ui.navigation.collapsible-navigation`](https://github.com/Peiiii/ui-rules/blob/main/rules/navigation.md#uinavigationcollapsible-navigation) |  |
| [`ui.navigation.history-restoration`](https://github.com/Peiiii/ui-rules/blob/main/rules/navigation.md#uinavigationhistory-restoration) | 返回后恢复筛选、选择或滚动位置 |
| [`ui.navigation.location-state`](https://github.com/Peiiii/ui-rules/blob/main/rules/navigation.md#uinavigationlocation-state) |  |
| [`ui.navigation.state-persistence`](https://github.com/Peiiii/ui-rules/blob/main/rules/navigation.md#uinavigationstate-persistence) |  |
| [`ui.overlays.dialog-focus`](https://github.com/Peiiii/ui-rules/blob/main/rules/overlays.md#uioverlaysdialog-focus) |  |
| [`ui.overlays.dismissible-overlay`](https://github.com/Peiiii/ui-rules/blob/main/rules/overlays.md#uioverlaysdismissible-overlay) |  |
| [`ui.overlays.menu-navigation`](https://github.com/Peiiii/ui-rules/blob/main/rules/overlays.md#uioverlaysmenu-navigation) |  |
| [`ui.overlays.more-actions-orientation`](https://github.com/Peiiii/ui-rules/blob/main/rules/overlays.md#uioverlaysmore-actions-orientation) | 更多操作用横向还是纵向省略号 |
| [`ui.overlays.submenu-continuity`](https://github.com/Peiiii/ui-rules/blob/main/rules/overlays.md#uioverlayssubmenu-continuity) |  |
| [`ui.overlays.tooltip-access`](https://github.com/Peiiii/ui-rules/blob/main/rules/overlays.md#uioverlaystooltip-access) |  |
| [`ui.semantics.accessible-name`](https://github.com/Peiiii/ui-rules/blob/main/rules/semantics.md#uisemanticsaccessible-name) |  |
| [`ui.semantics.native-controls`](https://github.com/Peiiii/ui-rules/blob/main/rules/semantics.md#uisemanticsnative-controls) |  |
| [`ui.semantics.no-false-affordance`](https://github.com/Peiiii/ui-rules/blob/main/rules/semantics.md#uisemanticsno-false-affordance) |  |
| [`ui.visual.content-inset`](https://github.com/Peiiii/ui-rules/blob/main/rules/visual.md#uivisualcontent-inset) | 已弃用，改用 `ui.layout.content-inset` |

<!-- rule-index:end -->
