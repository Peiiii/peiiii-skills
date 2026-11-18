# 内容与视觉

- `ui.clarity.progressive-disclosure`：默认显示对象、情况、关键结果和必要动作，来源、配置和全文按需展开。
- `ui.clarity.recognizable-objects`：主名称用人能识别的文本；技术 ID 放可复制的详情。陌生操作保留文字。
- `ui.visual.region-boundaries`：密集内容用间距、对齐、底色或边线形成可辨认的归属。
- `ui.visual.surface-restraint`：颜色、阴影和边界服务语义，并使用主题变量；清晰后停止叠加。
- `ui.visual.status-icons`：常见状态用固定语义图标和可访问名称，难区分时补短文字。
- `ui.pattern.icons`：图标统一笔画、尺寸和含义；对象需要视觉锚点时可加小底板。
- `ui.pattern.cards`：一张卡对应一个对象，保持内容与操作位置一致；整卡链接与内部按钮避免嵌套。
- `ui.pattern.surface-elevation`：背景分区，边框定义相邻边界，阴影表达浮层或层次。
- `ui.pattern.tags`：一个标签表达一个维度；分类和普通状态用中性色，有依据的异常再强调。
- `ui.pattern.report-feed`：先显示来源、时间和可读摘要，长项可展开；成功或异常有证据才标记。
- [ui.content.truncation-recovery](https://github.com/Peiiii/ui-rules/blob/main/rules/content/truncation-recovery.md)：单行摘要随容器缩放，使用实际剩余宽度；测试有、无行尾操作两种情况，并保留查看全文的路径。
