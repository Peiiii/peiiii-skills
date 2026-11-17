---
name: maintaining-personal-skills
description: 查询或维护本人自有Skill的全局登记、源码归属、跨项目优化与安装同步时使用；包括“个人Skill仓库”“把这个Skill沉淀起来”。第三方技能安装升级仍沿原包管理器。
---

# 维护个人 Skill

全局入口指向源码，登记不复制正文。自身所在仓库根目录的registry.json是唯一Skill登记表；先定位本Skill实际路径，再从仓库根调用scripts/skills.mjs，命令不依赖当前工作目录。

1. 查询归属：`node <仓库>/scripts/skills.mjs list`，然后`resolve <skill-id>`，共享依赖用`resource <id>`定位（如ui-rules）；只读目标Skill及目标仓库AGENTS，不加载所有技能正文。私有项目路径在被忽略的registry.local.json绑定，禁止把绑定写进公开登记。
2. 独立通用、自有且适合开源的Skill落到本仓库skills/<slug>/；专属项目Skill留在原仓库，仅登记owner与相对路径。来源不明不冒称自创，不批量搬迁第三方包。共享规则库等依赖保留原owner，只引用正文。
3. 用户指派优化时，进入resolve返回的ownerRoot，在source改唯一正文；先检查工作区，保留他人改动。upstream模式不直接改node_modules，沿依赖包原升级路径；没有修改授权或源码绑定则说明具体缺口，继续可做部分。
4. 沿目标仓库规则运行必要检查；通用Skill另运行本库npm run check、npm test及Skill自身检查。用当前实际任务验证改动，不把结构校验当作模型行为证明。维护本身不赋予产品部署、发帖、发信或账号操作授权。
5. 沿已有全托管授权只提交本次文件、普通推送原目标主线、fetch核对，不夹带或强推。原仓库有独立发布门则遵守。没有Git仓库或remote不伪造同步成功。
6. `install <skill-id>`建立全局符号链接；错误链接核对后可加--replace-link。安装器拒绝覆盖实体目录，先审查并完整备份原目录，迁移核验后再切换。`doctor`核对本机来源和全局链接；私有绑定缺失与源不可用不能算通过。

退出时交付真实源码入口、改动与验证、提交同步及全局安装结果。新增、迁移或撤销同步登记与原入口，不保留两套正文；不为普通任务自动升级所有Skill。
