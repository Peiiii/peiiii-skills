# ui.pattern.shadcn-native-components · 用 shadcn 源码建立产品组件

## 适用

项目需要实现或统一 Button、IconButton、Tooltip、Dialog、DropdownMenu、Sheet、表单等通用控件时使用。现有设计系统已有成熟等价控件时，先复用该控件，再比较行为缺口。

## 做法

1. 对照项目技术栈读取 [shadcn/ui 官方组件目录](https://ui.shadcn.com/docs/components) 与所选变体的实际源码。先确认项目已使用的是 Radix、Base UI 或其他原语，沿用同一套基础。
2. 复用官方组件的职责分工、单一原生触发元素、组合方式与可访问性。以 [Tooltip](https://ui.shadcn.com/docs/components/radix/tooltip) 为例，Provider 设在合适层级，Trigger 用 `asChild` 接到实际按钮，沿用原语的键盘、延迟、边界避让和定位。Dialog 保留焦点约束、Escape 与焦点归还。
3. 由项目本地基础组件统一字号、间距、图标尺寸、圆角、颜色和各状态，通过主题 token 与少量组件变体调整。业务页面传内容、动作和语义属性。组件目录和生产页面引用同一实现。
4. 图标操作统一经 IconButton。保持可访问名称及 hover、按下、焦点、选中、禁用等可区分状态。触控命中范围可以大于视觉底色。Tooltip 密度、位置默认值与菜单组合由基础层维护。

## 反例与取舍

- 拷贝源码后保留项目已有主题；换肤通过 token 完成。页面各自覆盖 Tooltip 偏移、给同一图标再包第二层 Trigger，容易破坏避让、ref 或焦点。
- 原语满足交互时，用组合或局部主题扩展。业务所需的定制超出原语能力时，保留必要的可访问行为，再说明为何定制。

## 验证

在两个真实页面核对同一组件的鼠标 hover、Tab 聚焦与窄屏交互。核对重复触发、偏移、滚动、遮挡和焦点返回，在至少两个主题检查字号和反馈是否一致。遇到已在页面间分叉的实现，先消除分叉，再评审新增例外。
