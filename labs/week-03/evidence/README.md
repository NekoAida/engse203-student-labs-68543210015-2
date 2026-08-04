# LAB 03 Evidence

## Screenshots

- `mobile-375.png` — 375px mobile viewport
- `desktop-1280.png` — desktop two-column viewport
- `invalid-state.png` — submit empty form shows field errors and keeps form values
- `valid-state.png` — valid submit adds a submitted request and resets the form

## Verification Run

- Temporary PATH added for this Codex shell: Codex Node runtime and temp npm/pnpm command shims
- Dependency install completed with `pnpm --config.strict-ssl=false --dir source install --lockfile=false`
- `node --check source/src/app.js` passed
- Vite production build passed by running `node node_modules/vite/bin/vite.js build --outDir ../publish --emptyOutDir` from `source/`
- Build output exists in `publish/`
- Playwright UI evidence check passed with Microsoft Edge:
  - no horizontal scroll at 375px
  - desktop grid has two columns
  - live preview updates from input values
  - invalid submit does not add request and does not reset form
  - valid submit adds one request, shows success status and resets form
  - no browser console errors were reported during the check
- Final publish verification passed through a temporary HTTP server using `publish/index.html`

## Final Review Against Week 03 Requirements

- `header`, `main`, `section`, `aside`, `form` are present
- `label for` matches field `id`
- every form control has `name`
- errors are linked with `aria-describedby`
- focus state is visible
- live preview uses the `input` event
- submit uses `preventDefault()`
- user-provided values are rendered with `textContent`
- invalid and valid states match the LAB 03 checklist
- publish output exists in `publish/`
- `source/index.html`, `source/src/app.js`, and `source/src/style.css` contain comments identifying all TODO markers from `week-03-responsive-ui/lab3/starter`
- `node_modules`, `.env`, `source/dist`, and `pnpm-workspace.yaml` are not present

