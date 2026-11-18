# GGClips

GGClips is a mobile-friendly, front-end MVP demo for discovering short gaming clips. It is a static site built with HTML, CSS, and JavaScript and has no package installation step.

## Run locally

From the project directory, start Python's built-in HTTP server:

```powershell
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in your browser. Stop the server with `Ctrl+C` in the terminal.

## Demo features

- **Clip feed:** browse six sample clips, search by title or streamer, and filter by category. One clip is marked as reserved for members.
- **Clip viewer:** open a vertical clip view with its title, streamer, fictional view and like counts, hashtags, and a report button.
- **Streamer profiles:** open a fictional streamer's profile to see their fictional platform and clips.
- **Demo sign-in:** use any valid-looking email and a non-empty fictional password. The site displays the name “Démo” and unlocks the reserved clip. The form is reset after sign-in; the demo sign-in state exists only in memory until the page is reloaded.
- **Review desk:** inspect three sample drafts and approve or reject them. Approved drafts appear in the feed for the current session; rejected drafts leave the queue.
- **Agent simulation:** click **Simuler l’agent** in the review desk to add a prepared fictional draft attributed to Moment finder. Each suggestion includes a fictional timestamp and a proposed reason, and can then be approved or rejected like any other draft.

## Demo only

All clips, streamers, platforms, accounts, statistics, timestamps, and draft proposals are fictional. No real video or stream is processed. Nothing is published to any external service. Sign-in, clip approvals, and rejections are local demonstration interactions only; their state is not saved to a backend.
