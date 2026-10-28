// What a room made from this template changes, in one place (README, "Making a room from this
// template"): its door's id in the Hallway, its name and description, where it is published, its
// size and colours, the wall its window is in and how the sky turns through it, its dev server's
// port, and its doorway's glow. index.html says the title and the description again, for link
// previews (a test keeps them the same). Pure, for the page, the tests and the tools.
//
// What a room adds stays out of here, in the rest of public/js/. One thing to know about: on a TV
// (README, "On a TV"), the remote's Back while walking goes back a page, to the room's door in the
// Hallway, unless the room has a step back of its own first (stand up, put a picture back, close a
// text). An empty room has none; a room with one takes it in main.js's stepBack, which returns true
// when it took one.

/** @satisfies {{ window: 'left' | 'right' | 'far', [key: string]: unknown }} the walls layoutRoom (room.js) takes */
export const ROOM = {
  /** Its door's id in the Hallway (?from=<id> leads back to it) and its page in a shared session: 1–32 of a–z, 0–9 and '-'. */
  id: 'art',
  /** Its name: the page's <title> and the card's heading. */
  title: 'art',
  /** The page's <meta name="description">, word for word: the Hallway's plaque by its door shows it. */
  description: "An empty room behind the Hallway's door, soon a gallery of art.",
  /** What kind of place it is, on the sign over its door in the Hallway. */
  sign: 'Art Room',
  /** Where it is published, on GitHub Pages: https://ariamokr.github.io/<repository>/. */
  url: 'https://ariamokr.github.io/art/',
  /** The room inside, in metres: across (x), in from the doorway's wall to the far wall (z), and floor to ceiling. */
  size: { width: 6, depth: 7, height: 3.2 },
  /** Its colours, as #rrggbb: the floor, the walls, the ceiling, the wood (skirting, casings), and the lamps' light. */
  colors: { floor: '#9a7350', walls: '#d8ccb3', ceiling: '#eee7d9', trim: '#5e3f28', light: '#ffe8cc' },
  /** The wall the window is in, facing in from the doorway: 'left', 'right' or 'far'. */
  window: 'right',
  /**
   * How far the sky outside the window is turned (radians, as three.js's rotation.y; common's
   * README, "A room's yaw"). The garden's view down its length through a window that looks toward
   * w is Math.atan2(-w.x, -w.z): a window in the left wall looks toward -x, so π/2; in the right
   * wall -π/2; in the far wall 0. Here the sun is behind the room instead, toward -x, so the right
   * window has a painter's north light: SUN_AZ - Math.atan2(-1, 0), with common's sky.js
   * SUN_AZ = Math.atan2(-0.72, 0.55).
   */
  skyYaw: 0.652,
  /** The dev server's port (npm start), clear of the other sites': the hallway 8088–8089, outside 8090–8091, layersharedsession 8092, music 8093, RoomTemplateEmpty 8094. */
  port: 8096,
  /** The doorway's glow when the Hallway's link gives none: the colour of this room's door there. */
  glow: '#e08fb0',
};

/** The colours' form, and the ids'. */
export const HEX = /^#[0-9a-f]{6}$/;
export const ID = /^[a-z0-9-]{1,32}$/;
/** The walls a window can be in. */
export const WINDOW_WALLS = ['left', 'right', 'far'];

/**
 * This room's door in the Hallway: its entry for the Hallway's environments.js (its README, "Adding
 * a door"): the title its repository's name (the url's first path segment, on GitHub Pages), the
 * subtitle the page's description word for word, the preview the picture tools/preview.mjs renders.
 */
export function hallwayDoor(room = ROOM) {
  return {
    id: room.id,
    title: decodeURIComponent(new URL(room.url).pathname.split('/')[1] || room.id),
    subtitle: room.description,
    sign: room.sign,
    url: room.url,
    preview: new URL('hallway-preview.jpg', room.url).href,
    color: room.glow,
  };
}
