# peiiii-skills

遵循上级探索项目目录规范；项目特有规则写在 DevWeave 受管段之外。

<!-- ai-development-system:start -->
## 共享 AI 开发体系

- 开始开发决策前先读取当前项目的目标、约束与权威事实；项目 `AGENTS.md` 承载项目规则和授权。
- 普通开发从 `.agents/skills/development-lifecycle/SKILL.md` 进入，由它选择流程与当前阶段，命名流程入口见 `.agents/workflows/README.md`（含大型交付）；明确只要调查、设计、验证或 Review 时只完成该范围。
- 每条实际发给用户的普通文字消息发送前核恰好一个真实阶段标记，同阶段进度和最终答复不省略。项目已定义格式优先；开发开启 tracing 时沿原插件，未开启或无专属格式时用内联代码 `[step: understanding/designing/working/reviewing/verifying/fixing/retrospective/finishing]` 中一个值兜底。简单回答可用 understanding，不启动多步流程。工具调用、对外产物及严格机器协议不插入，静默协议保持静默；不为标记额外通信，标记不替代验收或结束门。
- 用户要求打开、启动或查看擎天 / AI 开发体系大盘时，读取 `.agents/wiki/skills/tools/qingtian-dashboard/SKILL.md` 并执行到当前项目可用的入口；单纯讨论设计不启动。
- 修改项目 AI 规则、Skill 拓扑或开发体系时，按需读取 `.agents/wiki/skills/process/agent-instructions-governance/SKILL.md`；先找现有 owner，再做最小、可验证的改动。
- 只读取当前阶段和当前判断需要的 reference；不把整个 Skill 库、历史记录或项目知识一次性载入。
- 保护用户和其它任务的工作区改动。未经用户明确授权或当前项目已有可核对的明确授权，不提交、推送、建 PR、发布或部署。
- 先找事实、状态和行为的权威 owner；复用或修正已有路径，避免复制规则、平行状态与无收益的适配层。
- 修复异常先定义可观察判定条件，再沿真实触发或最近边界验证。修改 TypeScript 类型、导入、导出或运行链路时运行适用范围的类型检查。
- 源码验证后按项目检查入口完成 diff-only 可维护性检查和实现 Review；有 finding 时修正并重验受影响证据。
- 收尾核对最小完整结果、有效证据、用户可用入口和未验证边界；复盘只沉淀有可复用增量的事实或方法。
- 上游管理的 Skill 由 `ai-development-system` 仓库维护；项目专项规则留在本项目。升级通过同步工具审查差异，不直接覆盖受管文件。
<!-- ai-development-system:end -->

- Qingtian 插件 development-step-tracing：开启

## 项目自有约定

- 本仓库是Peiiii的开源个人Skill库和跨项目Skill登记入口。2026-11-18本人明确授权按探索项目建立、开源、提交推送；不因维护Skill而自动授权发帖、发信、账号操作或产品部署。
- 独立通用Skill的唯一正文在skills/<slug>/；有专属项目的Skill留在原仓库，仅在registry.json登记，不复制正文。第三方包标记upstream并沿原包管理器升级，不当作自创内容或直接编辑node_modules。
- 本人指派本库维护任务后，完成适用校验，精确提交推送自有仓库main并fetch核对；保护并发工作，不夹带、不强推。跨仓库先读取目标AGENTS并核对源代码归属。
- 公开文件不写个人机器绝对路径、账号凭据、私有材料或运行日志。机器路径由SKILL_PROJECTS_ROOT、SKILL_INSTALL_ROOT或被忽略的registry.local.json绑定。登记来源不代表外部正文获准公开。
- 修改后运行npm run check和npm test；修改peiiii-ui-best-practices时另运行python3 skills/peiiii-ui-best-practices/scripts/validate.py。源码修改只在owner进行，全局入口使用符号链接。
