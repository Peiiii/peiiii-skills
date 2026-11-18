# 控件与交互

## 基础控件

- `ui.controls.stable-press-feedback`：按钮和可点击行在按下、松开、选中时保持位置和尺寸；禁止用缩放或位移做按压反馈，需要反馈时用轻微底色。
- `ui.controls.inline-action-density`：正文后的展开、收起等用共享紧凑操作样式。内边距与正文间隔用小一档；需要更大触控区时，别把 hover 底色跟着放大。
- `ui.controls.input-affordance`：输入和选择范围在默认态就可识别，保留标签、可点范围与错误反馈。
- 密码框默认遮蔽，尾部提供可用键盘操作的眼睛按钮，逐个字段切换显示与隐藏。最短长度由产品按风险决定。详见 [ui.forms.password-visibility](https://github.com/Peiiii/ui-rules/blob/main/rules/forms/password-visibility.md)。
- 对比默认与聚焦边框，确认颜色、宽度一致；检查鼠标、Tab 和弹窗自动聚焦，错误状态保持可辨识。发送快捷键避免截断输入法组字，保留换行与可点击发送。
- 用项目的 Button、IconButton 和 Tooltip；空图标按钮有明确名称，Tooltip 用一个 Trigger 接到实际按钮，保留默认定位和碰撞避让。触控区可以大于图标底色。
- 焦点外圈复现时检查 computed `outline`、`box-shadow` 和伪元素，移除重复样式。如果菜单归还焦点后指针误触发 `:focus-visible`，在基础层识别输入方式，保留焦点归还。
- 核对[交互内边距](https://github.com/Peiiii/ui-rules/blob/main/rules/layout/content-inset.md)、[悬停反馈](https://github.com/Peiiii/ui-rules/blob/main/rules/feedback/interactive-hover.md)和[选中态](https://github.com/Peiiii/ui-rules/blob/main/rules/feedback/selection-state.md)；hover、选中、键盘焦点各有表达。

## 行为与浮层

- `ui.behavior.states`：区分期望状态、实测状态和数据时点。缺证据显示未知；普通暂停用中性色。
- `ui.behavior.feedback-recovery`：区分已接纳、等待与完成，防重复提交；失败保留输入并给出恢复入口。难以撤销的操作先说明影响。
- `ui.pattern.inline-menu`：常用操作就近可见，低频相关项收进具名菜单。
- `ui.pattern.dialog`：短决策用具名弹窗，保留焦点约束、Escape 和关闭后的焦点归还。
- `ui.pattern.drawer`：补充同一上下文可用抽屉；明确模态、关闭和保存行为。复杂长表单优先独立页。
