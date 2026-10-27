* {
  box-sizing: border-box;
}

:root {
  --bg: #0b1020;
  --bg-alt: #121b2e;
  --panel: rgba(17, 24, 39, 0.9);
  --panel-soft: #1a2540;
  --primary: #7c9cff;
  --primary-strong: #5a7cff;
  --dark: #0f172a;
  --text: #e5eefc;
  --muted: #aebed8;
  --accent: #7ef0d2;
  --shadow: 0 30px 60px rgba(7, 10, 20, 0.45);
}

html, body {
  margin: 0;
  min-height: 100%;
  font-family: 'Inter', sans-serif;
  background:
    radial-gradient(circle at top left, rgba(124, 156, 255, 0.28), transparent 30%),
    linear-gradient(135deg, var(--bg), var(--bg-alt));
  color: var(--text);
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px;
}

.page-shell {
  width: min(1200px, 100%);
  min-height: 780px;
  background: rgba(11, 16, 32, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  box-shadow: var(--shadow);
  overflow: hidden;
  backdrop-filter: blur(14px);
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(15, 23, 42, 0.7);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.brand-mark {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: #091322;
  font-weight: 800;
}

.ghost-button {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text);
  padding: 10px 16px;
  border-radius: 999px;
  cursor: pointer;
  transition: 0.2s ease;
}

.ghost-button:hover {
  background: rgba(255, 255, 255, 0.06);
}

.chat-container {
  display: grid;
  grid-template-columns: 320px 1fr;
  min-height: 720px;
}

.sidebar {
  background: rgba(17, 24, 39, 0.9);
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  padding: 28px 20px;
}

.eyebrow {
  margin: 0 0 10px;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 12px;
  font-weight: 700;
}

.sidebar h1 {
  margin: 0;
  font-size: 2rem;
}

.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
}

.chip {
  border: 1px solid rgba(124, 156, 255, 0.3);
  background: rgba(124, 156, 255, 0.08);
  color: var(--text);
  border-radius: 999px;
  cursor: pointer;
  padding: 10px 14px;
  transition: transform 0.18s ease, background 0.18s ease;
}

.chip:hover {
  transform: translateY(-1px);
  background: rgba(124, 156, 255, 0.16);
}

.status-card {
  margin-top: 32px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: rgba(126, 240, 210, 0.08);
  border: 1px solid rgba(126, 240, 210, 0.2);
  border-radius: 14px;
  color: var(--text);
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 16px rgba(126, 240, 210, 0.9);
}

.chat-panel {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.messages {
  flex: 1;
  padding: 28px 30px 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.message {
  display: flex;
  align-items: flex-end;
  gap: 14px;
}

.message.user {
  flex-direction: row-reverse;
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #08121d;
  background: linear-gradient(135deg, var(--accent), #d5ffef);
  flex-shrink: 0;
}

.message.user .avatar {
  background: linear-gradient(135deg, var(--primary), #c7d7ff);
}

.bubble {
  max-width: min(720px, 78%);
  padding: 14px 18px;
  border-radius: 18px;
  line-height: 1.55;
  white-space: pre-wrap;
}

.message.bot .bubble {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: var(--text);
}

.message.user .bubble {
  background: linear-gradient(135deg, var(--primary-strong), var(--primary));
  color: white;
}

.composer {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 14px;
  padding: 20px 30px 28px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(10, 14, 24, 0.6);
}

.composer input {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text);
  border-radius: 14px;
  padding: 16px 18px;
  font-size: 1rem;
}

.composer input:focus {
  outline: 2px solid rgba(124, 156, 255, 0.4);
  border-color: transparent;
}

.composer button {
  border: none;
  border-radius: 14px;
  padding: 16px 22px;
  background: linear-gradient(135deg, var(--primary), var(--primary-strong));
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.composer button:hover {
  transform: translateY(-1px);
  box-shadow: 0 20px 35px rgba(90, 124, 255, 0.3);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 860px) {
  .chat-container {
    grid-template-columns: 1fr;
  }

  .sidebar {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .composer {
    grid-template-columns: 1fr;
  }

  .bubble {
    max-width: 90%;
  }
}
