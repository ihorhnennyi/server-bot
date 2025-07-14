<h1 align="center">🤖 Server Bot</h1>

<p align="center">
  <b>Telegram bot for managing remote servers and projects via SSH</b><br/>
  <sub>Built with Node.js + TypeScript | Telegraf | SSH2 | Admin Access Control</sub>
</p>

---

## 🚀 Features

- ✅ Retrieve server status (`uptime`)
- 🔄 Reboot and shut down remote servers
- ⚙️ Manage server-side projects (PM2, Docker, custom deploy commands)
- 🧠 Admin-only access via `ADMIN_ID`
- 🔐 Secure SSH-based connection and execution

---

## 🧠 Technologies

| Technology | Description                             |
| ---------- | --------------------------------------- |
| Node.js    | JavaScript runtime environment          |
| TypeScript | Typed JavaScript for safer development  |
| Telegraf   | Framework for creating Telegram bots    |
| SSH2       | SSH client for remote command execution |
| Docker     | (optional) Deploy project in container  |

---

## 🛠️ Installation

```bash
git clone https://github.com/ihorhnennyi/server-bot.git
cd server-bot

# Install dependencies
npm install

# Run the bot
npm run start
```
