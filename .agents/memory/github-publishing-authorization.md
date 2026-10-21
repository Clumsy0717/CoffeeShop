---
name: GitHub publishing authorization
description: GitHub authorization behavior observed when publishing this workspace.
---

Treat the GitHub integration's connected status as separate from the credentials available to Git commands or connector API calls. In this workspace, GitHub appeared connected and healthy, but `gh` was not signed in, connector calls had no connection, and HTTPS push authentication failed. Reconnect actions also did not resolve to a usable connector.

**Why:** The user had authorized GitHub, but the runtime did not expose that authorization to the push path; repeated pushes could not fix it.

**How to apply:** Before future GitHub pushes, verify the actual write path and confirm the remote branch afterward. If authentication is rejected and the integration flow cannot reconnect, stop, leave the remote unchanged, and ask the user to repair the project integration. Never request a personal access token in chat.
