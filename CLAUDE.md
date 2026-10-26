# CLAUDE.md

Guidance for Claude Code in this repository.

## What this is

`art`: an empty WebXR room behind the Hallway's door, soon a gallery of art (three.js 0.186, plain
ES modules, no bundler or build step). For now it is exactly what AriaMoKr/RoomTemplateEmpty makes
(a checkout at `../RoomTemplateEmpty`): a floor, four walls, a ceiling with lamps, a window onto
common's afternoon sky, the doorway back to the Hallway, and the control panel beside it, walked in
VR, on a desktop, on a phone or with a TV's remote. The user asked for it to stay empty until it
becomes the art room,
so add no art until asked. What makes it this room is `config.js` (id `art`, the window in the right
wall with the sun behind the room, port 8096, glow `#e08fb0`), and `index.html`, `package.json`,
`.claude/launch.json` and the pictures to match. Like the template it follows the Hallway
(https://ariamokr.github.io/hallway/, AriaMoKr/hallway, a checkout at `../hallway`) and outside
(AriaMoKr/outside, `../outside`): much of the code here is outside's or the hallway's, said so at
the top of each such file. `public/` is the whole site. The user asked for the hallway to be left
alone, so change `../hallway` only when asked; its door to here (README, "The Hallway's door") is
the hallway's to add.

Published at https://ariamokr.github.io/art/ from `main` of AriaMoKr/art by
`.github/workflows/pages.yml`.

The template's fixes come here by merging it, never by copying files: art's history starts at the
template's first commit (`3504bd5`), and the remote `template` is AriaMoKr/RoomTemplateEmpty.

```bash
git fetch template
git merge template/main
```

In a merge, keep art's own: `config.js`'s values (the template's comments may come in),
`index.html`, `package.json`'s name and description, the two pictures, port 8096 and `main.js`'s
opening comment (a line the template adds to it may come in). What the template's README adds goes
into art's README in art's words; the template's checklist and its own door entry stay out. Then
`npm install` (the template may move common's tag), `npm test`, and check it in a browser.

## Commands

```bash
npm install          # postinstall: common's tools/vendor.mjs copies what vendor.json lists into public/vendor/ (gitignored)
npm start            # tools/serve.mjs (common's) on config.js's port, 8096
npm test             # node --test "test/*.test.js"
npm run preview      # tools/preview.mjs: public/hallway-preview.jpg and public/social.jpg (headless Chrome)
```

Node 22 or newer; CI runs Node 24 (common's Pages workflow). It runs under MSYS2 UCRT64 here
(`MSYSTEM=UCRT64 /c/msys64/usr/bin/bash -lc 'cd <this checkout> && …'`).

## Layout

- `config.js`: the one module a copy changes (`ROOM`: id, title, description, sign, url, size,
  colors, window, skyYaw, port, glow) and `hallwayDoor()`, the Hallway's door entry it implies.
  `index.html` and `package.json` repeat some of it; `test/config.test.js` keeps them the same.
- `room.js`: pure (no three, tested in Node). The layout from the config (`layoutRoom`: the doorway,
  shrunk to fit the link's size, the window, the panel, the lamps, the spawn), `doorSpawn`,
  `clampWalk` (the walls, `MARGIN` from them; the doorway between its jambs to its back),
  `doorCrossed`, `standable`, `castRay` (the box's planes: door, panel with u/v, window, wall,
  floor with `walkable`, ceiling), and the panel's buttons (`PANEL_BUTTONS`, `panelButtonAt`).
  Coordinates: metres, the doorway's wall at z = 0, the room along -z, the doorway at x = 0, yaw 0
  faces -z, left is -x.
- `scene.js` builds the room as a few merged meshes with light baked into vertex colours (`bake.js`
  and `builder.js`, the hallway's): the lamps, the window's daylight and the doorway's glow. The
  window's glass is common's `sky.js` (`skyMaterial`, turned by `skyYaw`); the doorway is common's
  `portal.js`, showing the Hallway's view of this door from its views.json (`loadView`), else
  `textures.js` `previewFallback`. `textures.js`: canvas textures, seeded, nearly white so the
  config's colours are the room's.
- `controls.js`: the hallway's and outside's controls for a box room: drag to look, keys, click or
  tap the floor (`walkTo`), the doorway (`onDoor`, `walkInto`), the panel (`onPanel`), a gamepad
  (common's `gamepad.js`), and in VR the sticks per common's `nav.js` (move smooth/teleport, turn
  snap/smooth), the trigger, a grip (`onSqueeze`); `reduceMotion` makes walks jumps, `setEyeLift`
  raises the rig in VR (seated), `moveSpeed`/`turnRate` feed the vignette. Keys go through common's
  `tv.js` `keyOf` (a TV remote's come with no `code`); `aimMiddle` makes the middle of the view the
  pointer (on a TV) and `useMiddle()` uses it (a gamepad's A, the remote's OK). Nothing allocated
  per frame.
- `panel.js`: the control panel on the wall (outside's), redrawn only on a change. `overlay.js`: the
  card (the page's `<nav>`: the title, ← Hallway, the description, Start / Leave shared session, in
  a session its status and the visitor's name (`onName`), and Settings with the panel's choices as
  radio buttons and checkboxes), the hint (`#hint`, kept clear of the buttons, `_placeHint`), Wave,
  Copy invite link, Fullscreen, Enter VR, the aiming dot, and toasts (`role="status"`, polite). With
  `tv`, Wave is in the card and the invite is text there (`inviteText`), and the hints are the
  remote's (`tv`, `tv-card`). `presence.js`: the session's status and notices in words.
- `preview.js`: the two pictures (`renderPreview`, hung as the hallway hangs its doorways', and
  `renderSocial`, from `socialView`).
- `main.js`: the visit and the way back (common's `door.js`; `<id>.visit` in sessionStorage),
  arrival, `go` (fade, then `location.assign`), fullscreen, VR (`sessiongranted`, noted as
  `window.roomXrGranted` by the inline script in index.html), the panel, the shared session
  (layersharedsession's `createTogether`, page `ROOM.id`), the accessibility settings (common's
  `access.js`: `applyAccess`, `setAccess`, re-read on `storage` and `pageshow`; the `reduce-motion`
  class on `<html>`), the TV (common's `tv.js`: `tvMode()`, the `tv` class on `<html>`, a `Remote`
  over the card and the canvas with `use` = `controls.useMiddle()` and `step` = `stepBack`, the
  room's own step back for Back, none in an empty room; `answerApp`; no fullscreen or XR), and the
  frame loop.
- `style.css`: the page over the view, and the 10-foot view under `html.tv` (the hallway's: 960 × 540
  at a pixel ratio of 2, 18 px text, 4 px focus rings, the TV's safe margins, the hint and toasts
  beside the card).

## Conventions

- Client URLs stay relative (tested). Quest 3 is the target: few draw calls, light baked,
  `MeshBasicMaterial`, nothing allocated per frame.
- Scripted testing: `window.__room` (THREE, renderer, scene, camera, rig, room, layout, controls,
  overlay, fade, vignette, xrDevice, go, enterVR, together, remote, tv, way, visit, setAccess, access,
  `preview()`, `social()`, `tick(dt, n)`, `ready`). A hidden browser pane gets no animation frames:
  drive it with `tick()`. XR frames under `?xr=emulate` need frames too; headless Chrome (below)
  has them.
- Headless Chrome is common's `tools/chrome.mjs` (`launchChrome`): it writes the fresh profile's
  `Local State` first, so Windows sees no failed logon. Start Chrome for a tool through it, never by
  hand on a new profile.
- Accessibility, as the other sites pass it: every 3D control also on the page, 2 px focus rings,
  targets at least 24 px, text over the view at 4.5:1 (the card and pills nearly opaque), the card
  scrolling at 320×568 and 667×375, state shown under forced colours, and less motion stilling the
  page's transitions. Check with axe (wcag2a/aa, wcag21aa, wcag22aa, best-practice) at a desktop
  size and at 320×568, and with `?tv=emulate` at 960×540.
- The TV (README, "On a TV"; common's README, "The TV app"): test with `?tv=emulate` and real key
  presses (OK is Enter with no `code`; `hallwayTV.menu()` / `.back()` for Menu and Back; Escape is
  Back in the card). On the TV, HallwayApp's `tools/tv-check.mjs --url <url>` needs its debug build
  (a localhost URL goes over adb reverse); the empty room holds 60 fps at 1080p at a pixel ratio of
  2, the budget a room's contents can spend. Other sessions may use the same TV: don't restart its
  app under them.
- Shared packages, pinned by tag in package.json: AriaMoKr/common (`v0.6.0`: the door contract,
  nav, access with the vignette, fade, gamepad, portal, sky, tv, and the tools `serve.mjs`,
  `vendor.mjs`, `chrome.mjs`, and the Pages workflow) and AriaMoKr/layersharedsession (`v0.3.0`).
  Change them there, then move the tag here and `npm install`.
- `.claude/launch.json`: `room` (8096) and `hallway` (`../hallway/public` on 8088).
