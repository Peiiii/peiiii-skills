# Peiiii Skills

Peiiii 的开源个人 Skill 库与跨项目登记入口。

**独立通用 Skill 在这里维护；有专属项目的 Skill 留在原仓库，全局统一登记。** 修改唯一源码，全局符号链接随之更新。

## 收录

| Skill | 用途 |
| --- | --- |
| [peiiii-ui-best-practices](skills/peiiii-ui-best-practices/SKILL.md) | 信息层级、组件选择与交互清晰度 |
| [drawing-system-architecture](skills/drawing-system-architecture/SKILL.md) | 用可编辑 SVG 表达系统架构 |
| [maintaining-personal-skills](skills/maintaining-personal-skills/SKILL.md) | 从任意项目定位、维护、验证与同步 Skill |

[registry.json](registry.json) 同时登记项目维护的 Skill 和上游包入口。登记不代表所有条目均由本人原创；`project` 表示原项目负责维护，`upstream` 沿原包管理器升级，不直接编辑安装产物。本文不镜像外部项目正文。第三方安装工具、来源未确认的技能不批量迁入。

[UI Rules](https://github.com/Peiiii/ui-rules) 继续独立维护原子 UI 规则，包含 `ui.layout.content-inset`；本库引用，不复制。

## 使用

需要 Node.js 22+；不需要安装运行依赖。克隆到任意目录：

```sh
git clone https://github.com/Peiiii/peiiii-skills.git
cd peiiii-skills
npm run check
npm test
node scripts/skills.mjs list
node scripts/skills.mjs resolve peiiii-ui-best-practices
node scripts/skills.mjs install peiiii-ui-best-practices
node scripts/skills.mjs install maintaining-personal-skills
```

全局默认安装到 `~/.codex/skills`。`SKILL_INSTALL_ROOT` 可改安装位置，`SKILL_PROJECTS_ROOT` 可改项目根目录（默认 `~/Projects`）。仓库自身位置自动解析，不依赖当前工作目录；从其他项目使用脚本的绝对路径即可。

私有项目仅公开逻辑 owner，不公开仓库地址和机器路径。在本机创建被 Git 忽略的 `registry.local.json`：

```json
{"repositories":{"content-studio":{"path":"/your/local/project","url":"https://github.com/your-account/your-private-repo"}}}
```

`resolve <id>` 输出真正的源码位置、所属仓库和是否可维护；随后读取原仓库规则，在原处优化、验证、精确提交推送。用户指派维护不会自动授权产品部署或外部账号操作。

```sh
node scripts/skills.mjs doctor
node scripts/skills.mjs install peiiii-ui-best-practices --replace-link
```

安装会先检查全部目标，拒绝覆盖实体目录；意外链接只有明确加 `--replace-link` 才替换。迁移实体目录前须完整备份。`install --all` 面向已有全部源码及私有绑定的本机，公共克隆不必安装外部 Skill。`doctor` 是本机诊断，未配置私有项目会明确失败；`check` 是可移植仓库校验，不要求私有源码存在。

## 维护

- [登记与迁移约定](CONTRIBUTING.md)
- [初始化设计与验收](docs/designs/2026-11-18-personal-skills.design.md)
- `npm run check && npm test`
- `python3 skills/peiiii-ui-best-practices/scripts/validate.py`
- `.agents/` 为探索项目脚本安装的 DevWeave 开发规范；发布 Skill 正文位于 `skills/`，不要将受管开发规范混作个人作品。

本库自有内容使用 [MIT License](LICENSE)。外部项目和引用资料沿各自许可；登记不改变其权属或许可。
