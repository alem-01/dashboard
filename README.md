## dashboard.alem.school

### Description

Dashboard service for https://alem.school.

Stack:
- sapper
- svelte

### Usage

Install dependencies
```console
$> npm install
```

Run development environment
```console
$> npm run dev
```

### Structure

All main code is inside `src` folder.

Files and dirs in src:
- components (Reusable svelte components)
- routes (dashboard endpoints with logic in each file)
- service (GateService: refreshToken)
- tools (usefull functions and variables for auth, formatting, config)
- client.js, server.js, serive-worker.js, template.html - auto-generated files from sapper.