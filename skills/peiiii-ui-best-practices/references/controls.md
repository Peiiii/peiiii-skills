# 控件与交互

## 基础控件

- `ui.controls.stable-press-feedback`：按钮和可点击行在按下、松开、选中时保持位置和尺寸；禁止用缩放或位移做按压反馈，需要反馈时用轻微底色。
- `ui.controls.inline-action-density`：正文后的展开、收起等用共享紧凑操作样式。内边距与正文间隔用小一档；需要更大触控区时，别把 hover 底色跟着放大。
- `ui.controls.input-affordance`：输入和选择范围在默认态就可识别，保留标签、可点范围与错误反馈。
- 密码显示与校验，读 UI Rules 的 `rules/forms.md`，对应 `ui.forms.password-visibility`。
- 对比默认与聚焦边框，确认颜色、宽度一致；检查鼠标、Tab 和弹窗自动聚焦，错误状态保持可辨识。发送快捷键避免截断输入法组字，保留换行与可点击发送。
- 用项目的 Button、IconButton 和 Tooltip；空图标按钮有明确名称，Tooltip 用一个 Trigger 接到实际按钮，保留默认定位和碰撞避让。触控区可以大于图标底色。
- 焦点外圈复现时检查 computed `outline`、`box-shadow` 和伪元素，移除重复样式。如果菜单归还焦点后指针误触发 `:focus-visible`，在基础层识别输入方式，保留焦点归还。
- 交互底色的文字与尾部操作留白，按 UI Rules 的 `rules/layout.md#uilayoutcontent-inset` 验收。悬停与选中读 `rules/feedback.md`。

## 行为与浮层

- `ui.behavior.states`：区分期望状态、实测状态和数据时点。缺证据显示未知；普通暂停用中性色。
- `ui.behavior.feedback-recovery`：区分已接纳、等待与完成，防重复提交；失败保留输入并给出恢复入口。难以撤销的操作先说明影响。
- `ui.pattern.inline-menu`：常用操作就近可见，低频相关项收进具名菜单。更多操作图标的方向按 UI Rules 的 `rules/overlays.md#uioverlaysmore-actions-orientation` 验收。
- `ui.pattern.dialog`：短决策用具名弹窗，保留焦点约束、Escape 和关闭后的焦点归还。
- `ui.pattern.drawer`：补充同一上下文可用抽屉；明确模态、关闭和保存行为。复杂长表单优先独立页。
