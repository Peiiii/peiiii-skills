# 个人Skill仓库与全局登记

用户要求开源个人Skill仓库，按探索项目建立；独立Skill归本仓库，项目专属Skill保留owner，任何项目均能定位源码、优化、验证并同步。flow:initialization；risk:L4；单阶段交付；retrospective_state:complete。

采用Node原生命令行、JSON登记、Markdown Skill，无运行依赖。集中复制全部正文会造成双owner；仅做链接列表无法验证归属和安装；选择唯一正文+可验证登记+安全符号链接。公开登记只含来源位置，不包含外部Skill正文；第三方包单独标记不冒称自有。无专属项目的clear-ui和drawing-system-architecture迁入，新增独立重复维护场景maintaining-personal-skills。安装器独立于模型判断，不执行外部代码或自动git发布；维护Skill指导模型按真实任务修改、验证和精确推送。

Required A01 官方探索脚本接入check通过；A02 通用Skill迁入且全局链接可用、无双正文；A03 项目Skill登记与跨cwd解析、资源归属；A04 安全安装拒绝覆盖目录/意外链接，失败恢复有原件；A05 登记结构/真实安装/相关Skill检查及自动测试；A06 GitHub公开仓库实际创建推送，源迁移提交同步；A07 开源可移植、无个人路径/秘密、第三方边界明确。

设计自审：本轮不迁移未经确认归属的物理安装目录，不复制第三方安装包，不引入平台/数据库或后台任务。项目专属正文不因登记而公开。维护入口不扩展外部平台执行权限。公开发布已由用户授权，无需重复确认。

## 验收与复盘

A01 passed：官方探索create完成，安装器check通过。A02 passed：clear-ui与drawing-system-architecture唯一正文迁入，本库共3个Skill；全局链接均指新源码，原项目移除clear-ui正文并更新历史评审链接；原实体安装已完整本地备份。A03 passed：19个外部入口登记，真实外部项目跨cwd解析与全局路径一致，ui-rules资源保持独立owner。A04 passed：测试覆盖拒绝实体目录、意外链接需显式替换、全目标预检查无部分安装、幂等及编辑实时生效。A05 passed：7项自动测试、3个Skill官方quick_validate、本库检查、clear-ui 30条索引/链接检查、22个本机doctor均通过。官方quick_validate初次因宿主缺PyYAML失败；使用uv隔离依赖重跑全部通过，没有改全局Python环境。A06 passed：GitHub仓库PUBLIC，默认main；00201cb已推送并fetch核对0/0，原项目迁移提交也已推送核对。A07 passed：公开文件审查无个人绝对路径或凭据；私有绑定不被跟踪，公开remote重新clone后无本机绑定，仍通过check、7测试和clear-ui检查。

方案和实现均由执行者自审，遵从用户不使用子代理，未宣称独立模型遵从性验证。新通用维护入口有稳定重复意图；相邻skild仅负责安装/发布包，不拥有本人跨项目源码登记。没有把所有物理安装目录推断为本人原创并批量公开。独立UI规则依旧原库唯一维护。全局新增1个维护入口，其余迁移保持原description；没有改其它项目常驻AGENTS或开发流程。

retrospective_decision: 已将唯一正文/跨项目登记/私有绑定边界落实在registry、维护Skill与CONTRIBUTING；复用确定性安装和校验，避免复制正文或后台自动改库。未设置自动任务。后续优化在本人实际指派时沿owner发生，不保证宿主离线仍执行。
