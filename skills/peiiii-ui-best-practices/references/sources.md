# 来源与推导边界

以下链接提供规则的外部依据。

| 规则 | 来源与用途 |
| --- | --- |
| `ui.clarity.recognizable-objects` | [NN/g：Recognition and Recall](https://www.nngroup.com/articles/recognition-and-recall/)：以识别线索降低记忆负担。 |
| `ui.pattern.cards`、`ui.pattern.list-table` | [NN/g：Cards](https://www.nngroup.com/articles/cards-component/)：卡片组织独立信息，同质项目的比较应考虑列表。 |
| `ui.visual.region-boundaries`、`ui.pattern.spacing` | [Fluent：Layout](https://fluent2.microsoft.design/layout)：邻近、间距与区域分组；密集页面采用何种边界仍需看实际画面。 |
| `ui.pattern.cards`、`ui.pattern.surface-elevation` | [Fluent：Card](https://fluent2.microsoft.design/components/web/react/core/card/usage/)：围绕一个对象组织头部、内容与操作，不把阴影或异质字段当必要条件。 |
| `ui.pattern.list-detail` | [Google：List-detail layout](https://developer.android.com/develop/ui/compose/layouts/adaptive/list-detail)：列表与详情的多栏/单栏适配；这里借用布局概念，不引入Android技术栈。 |
| `ui.pattern.supporting-pane` | [Google：Supporting pane](https://developer.android.com/develop/adaptive-apps/guides/build-a-supporting-pane-layout)：主任务与辅助内容的布局关系。 |
| `ui.pattern.dialog` | [WAI-ARIA APG：Modal dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)：焦点、模态背景、键盘与关闭行为。 |
| `ui.pattern.navigation-tabs` | [WAI-ARIA APG：Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)：页签语义与键盘交互。 |
| `ui.behavior.accessibility` | [WCAG 2.2：Contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)、[Target size minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)：遵循适用范围及例外，不简化为所有目标一律24px。 |
| `ui.behavior.responsive-context` | [WCAG：Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)：内容重排与保留功能；局部数据表等有适用例外。 |
