# 个人Skill仓库与全局登记

用户要求开源个人Skill仓库，按探索项目建立；独立Skill归本仓库，项目专属Skill保留owner，任何项目均能定位源码、优化、验证并同步。flow:initialization；risk:L4；单阶段交付；retrospective_state:pending。

采用Node原生命令行、JSON登记、Markdown Skill，无运行依赖。集中复制全部正文会造成双owner；仅做链接列表无法验证归属和安装；选择唯一正文+可验证登记+安全符号链接。公开登记只含来源位置，不包含外部Skill正文；第三方包单独标记不冒称自有。无专属项目的clear-ui和drawing-system-architecture迁入，新增独立重复维护场景maintaining-personal-skills。安装器独立于模型判断，不执行外部代码或自动git发布；维护Skill指导模型按真实任务修改、验证和精确推送。

Required A01 官方探索脚本接入check通过；A02 通用Skill迁入且全局链接可用、无双正文；A03 项目Skill登记与跨cwd解析、资源归属；A04 安全安装拒绝覆盖目录/意外链接，失败恢复有原件；A05 登记结构/真实安装/相关Skill检查及自动测试；A06 GitHub公开仓库实际创建推送，源迁移提交同步；A07 开源可移植、无个人路径/秘密、第三方边界明确。

设计自审：本轮不迁移未经确认归属的物理安装目录，不复制第三方安装包，不引入平台/数据库或后台任务。项目专属正文不因登记而公开。维护入口不扩展外部平台执行权限。公开发布已由用户授权，无需重复确认。
