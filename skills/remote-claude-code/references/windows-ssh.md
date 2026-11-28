# Windows SSH / Claude Code 的已验证特例

仅在远端为 Windows 时使用。以下是真实故障的定位线索，不是预设当前机器一定有这些问题。具体会话、路径、PID、凭据与连接信息从任务私有检查点和当前机器解析。

## 非交互 SSH 环境

- SSH 启动的 PowerShell 可能缺用户 npm PATH。用 Machine 与 User 的 PATH 初始化，再 `Set-Location` 到原会话工作目录；用已核实的原生 `claude.exe` 路径可避开失效的别名/npx 包装。
- Claude 使用 Git Bash 时，按真实安装设置 `CLAUDE_CODE_GIT_BASH_PATH`。不能仅在本机改 PATH 就声称远端就绪。
- 复杂 PowerShell 启动代码可用 UTF-16LE 编码后传 `-EncodedCommand`，避免多层 shell 把 `$env`、引号或空格改写。参数仍须正确引用；编码不是凭据保护。
- 交互启动必须分配 PTY（`ssh -tt`）。Mac 用户要求独立终端时，可以复用经检查的 `.command` 启动器，由系统终端运行它；启动器实际执行的是 SSH 到远端再恢复 Claude。

## 原会话控制

- `~/.claude/sessions/*.json` 和项目 JSONL 曾可用于查会话 ID、状态、PID 与新日志；它们是版本相关内部格式，缺失时重新发现，不强行套旧结构。
- 元数据文件不证明进程存活。Windows 的桌面 Session 1 与 SSH ConPTY 的 Session 0 也不同；只枚举桌面进程可能漏掉真正的 SSH 会话。
- 如果已有授权的控制助手使用 Windows Console API，注入前同时核对会话 ID、实际进程创建时间和存活状态，避免 PID 复用后误控其他进程。没有兼容的读取/输入能力时，不盲目发送按键。
- 一次真实 ConPTY 连接中，文本连同回车一起注入被当作整段粘贴，最终只留下草稿。修复是：写入文本，短暂让粘贴完成，再单独发送 Enter；随后验证新工具调用。不能把这一特例当作所有终端都需要的固定延迟。
- 恢复会话可能出现 “Resume this conversation?” 对话框；先读当前画面再确认。看到历史限额提示不代表当前仍受限，看到已粘贴的续作文字也不代表已经开工。

## SSH 与 Git 故障分层

- 分别确认网络可达、TCP 22、SSH banner、认证及远端命令。Tailscale 显示在线不证明 SSH 可用；连接超时不证明需要换凭据。
- 每次探测有超时；连续失败先保存检查点，尝试已有授权的连接路径。不要反复启动终端制造重复进程，不盲目重置防火墙或放宽访问权限。
- 曾遇到 Git for Windows 在 MSYS 管道中调用原生 Windows OpenSSH 挂起；使用 Git 自带 SSH 与仓库专用包装后恢复正常。先核实实际 Git/SSH 来源与错误，再修该仓库配置，不把全机 SSH 一概替换。
- GitHub 和 Cloudflare 的本机登录不自动存在于远端。验证远端现有授权及长期刷新能力；需要迁移凭据时仍受用户原授权范围约束，不把秘密写进启动器、日志输出或 Git。

## 不属于本 Skill 的副作用

恢复 SSH 和会话不需要重置应用登录密码，不需要把生产站改成免登录，也不要求新开远端桌面窗口。GUI 能力被宿主拒绝时，不换另一种 GUI 自动化技术绕过拒绝；使用本来就获授权且可用的 CLI，或说明具体阻塞。
