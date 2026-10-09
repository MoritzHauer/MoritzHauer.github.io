import { DEFAULT_THEME } from './index';

// Timeline scenery, one drawer per theme. A new theme adds its drawer to `drawers` below.
// `G` is the road geometry from Timeline.astro: scene size S x H, column mapping toU/toX,
// road samples, yAt, slopeAt and the road path.
const f = (n) => n.toFixed(1);
// Stable pseudo-random number per integer, so scenery stays put when the window resizes.
const hash = (n) => {
  let t = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  t ^= t >>> 13; t = Math.imul(t, 0xc2b2ae35); t ^= t >>> 16;
  return (t >>> 0) / 4294967296;
};

export function drawScenery(look, G) {
  const stroke = (attrs) => `<path d="${G.road}" fill="none" ${attrs}/>`;
  const grid = (spacing, from, to) => {
    const out = [];
    for (let i = Math.floor(G.toU(from) / spacing); i <= Math.ceil(G.toU(to) / spacing); i++) out.push(i);
    return out;
  };
  const polyY = (P, x) => {
    for (let i = 1; i < P.length; i++) {
      if (P[i][0] >= x) { const [x0, y0] = P[i - 1], [x1, y1] = P[i]; return y0 + (y1 - y0) * ((x - x0) / (x1 - x0 || 1)); }
    }
    return P[P.length - 1][1];
  };
  function ridge(spacing, seed, peak, valley) {
    return grid(spacing, -80, G.S + 80).map((i) => {
      const [lo, hi] = i % 2 === 0 ? peak : valley;
      return [G.toX((i + (hash(i * 31 + seed) - 0.5) * 0.35) * spacing), G.H * (lo + hash(i * 17 + seed) * (hi - lo))];
    });
  }
  const area = (P) => `M${P.map(([x, y]) => `${f(x)},${f(y)}`).join(' L')} L${f(P[P.length - 1][0])},${G.H} L${f(P[0][0])},${G.H} Z`;

  function drawNature() {
    const { S, H } = G;
    const back = ridge(55, 101, [0.05, 0.24], [0.27, 0.36]);
    const front = ridge(38, 202, [0.4, 0.52], [0.56, 0.66]);
    const caps = back.map((p, i) => {
      const a = back[i - 1], b = back[i + 1];
      if (!a || !b || p[1] > H * 0.2 || p[1] > a[1] || p[1] > b[1]) return '';
      const to = (q) => [p[0] + (q[0] - p[0]) * 0.3, p[1] + (q[1] - p[1]) * 0.3];
      const [lx, ly] = to(a), [rx, ry] = to(b);
      return `<path d="M${f(p[0])},${f(p[1])} L${f(rx)},${f(ry)} L${f((p[0] + rx) / 2)},${f(ry - 5)} L${f(p[0])},${f(Math.max(ly, ry) - 4)} L${f((p[0] + lx) / 2)},${f(ly - 5)} L${f(lx)},${f(ly)} Z" fill="#FAFBF7"/>`;
    }).join('');
    const clouds = [[0.1, 0.09], [0.47, 0.05], [0.83, 0.12]].map(([fx, fy]) => {
      const x = S * fx, y = H * fy;
      return `<g fill="#FAFBF7" opacity="0.9"><ellipse cx="${f(x)}" cy="${f(y)}" rx="36" ry="10"/><ellipse cx="${f(x - 14)}" cy="${f(y - 6)}" rx="16" ry="9"/><ellipse cx="${f(x + 12)}" cy="${f(y - 8)}" rx="19" ry="11"/></g>`;
    }).join('');
    const pines = grid(16, 0, S)
      .filter((i) => hash(i * 7 + 303) > 0.45)
      .map((i) => {
        const x = G.toX(i * 16 + hash(i + 404) * 10), s = 0.7 + hash(i * 3 + 505) * 0.6;
        return [x, polyY(front, x) + 10 + hash(i * 5 + 606) * 45, s];
      })
      .filter(([, y]) => y < H)
      .sort((a, b) => a[1] - b[1])
      .map(([x, y, s]) => `<path d="M${f(x)},${f(y)} l${f(-7 * s)},0 l${f(7 * s)},${f(-22 * s)} l${f(7 * s)},${f(22 * s)} z" fill="#7C9670"/>`)
      .join('');
    return `<defs>
        <linearGradient id="tl-back" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C5D0BB"/><stop offset="1" stop-color="#C5D0BB" stop-opacity="0.2"/></linearGradient>
        <linearGradient id="tl-front" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#AEBDA2"/><stop offset="1" stop-color="#AEBDA2" stop-opacity="0"/></linearGradient>
      </defs>`
      + clouds + `<path d="${area(back)}" fill="url(#tl-back)"/>` + caps + `<path d="${area(front)}" fill="url(#tl-front)"/>` + pines
      + stroke('stroke="#CFC8BA" stroke-width="38"') + stroke('stroke="#7D6B58" stroke-width="26" stroke-dasharray="4 9"')
      + stroke('stroke="#4A5057" stroke-width="15"') + stroke('stroke="#CFC8BA" stroke-width="9"');
  }

  function drawRiver() {
    const { S, H, yAt, slopeAt } = G;
    const trees = grid(26, -20, S + 20)
      .filter((i) => hash(i * 11 + 707) > 0.35)
      .map((i) => {
        const x = G.toX(i * 26 + hash(i + 808) * 14), side = hash(i * 3 + 909) < 0.5 ? -1 : 1;
        return [x, yAt(x) + side * (48 + hash(i * 13 + 111) * 110), hash(i * 19 + 222), 0.75 + hash(i * 23 + 333) * 0.5];
      })
      .filter(([, y]) => y > 34 && y < H - 4)
      .sort((a, b) => a[1] - b[1])
      .map(([x, y, kind, s]) => kind < 0.55
        ? `<rect x="${f(x - 1.5)}" y="${f(y - 10 * s)}" width="3" height="${f(10 * s)}" fill="#7A4A26"/><circle cx="${f(x)}" cy="${f(y - 16 * s)}" r="${f(9 * s)}" fill="${kind < 0.3 ? '#8DBF6A' : '#6FA652'}"/>`
        : `<path d="M${f(x)},${f(y)} l${f(-7 * s)},0 l${f(7 * s)},${f(-24 * s)} l${f(7 * s)},${f(24 * s)} z" fill="#4F8A57"/>`)
      .join('');
    const reeds = grid(12, 0, S)
      .filter((i) => hash(i * 29 + 444) > 0.55)
      .map((i) => {
        const x = G.toX(i * 12), y = yAt(x) + (hash(i + 555) < 0.5 ? -1 : 1) * (27 + hash(i * 2 + 666) * 6);
        return `<path d="M${f(x)},${f(y)} l-3,-10 M${f(x)},${f(y)} l0,-13 M${f(x)},${f(y)} l3,-9" stroke="#7FA66A" stroke-width="1.5" stroke-linecap="round"/>`;
      }).join('');
    const blades = [0, 90, 180, 270].map((a) => `<rect x="-2.5" y="-34" width="5" height="31" rx="1" fill="#FFFFFF" stroke="#7A4A26" stroke-width="1.2" transform="rotate(${a})"/>`).join('');
    const mills = [-160, 120, 480, 1140].map((u) => {
      const x = G.toX(u);
      if (x < -40 || x > S + 40) return '';
      let ground = yAt(x) - 40;
      if (ground - 86 < 8) ground = Math.min(H - 6, yAt(x) + 120);
      return `<g transform="translate(${f(x)} ${f(ground)})"><path d="M-11,0 L-6,-46 L6,-46 L11,0 Z" fill="#F3E6D0" stroke="#7A4A26" stroke-width="1.5"/><path d="M-9,-45 L0,-56 L9,-45 Z" fill="#B5462F"/><rect x="-3" y="-12" width="6" height="12" rx="3" fill="#7A4A26"/><g transform="translate(0 -50)"><g class="sails">${blades}</g><circle r="3" fill="#7A4A26"/></g></g>`;
    }).join('');
    const dams = [300, 870].map((u, n) => {
      const x = G.toX(u), y = yAt(x), a = (Math.atan(slopeAt(x)) * 180) / Math.PI;
      const sticks = Array.from({ length: 8 }, (_, j) => {
        const yy = -15 + j * 4.3, tilt = (hash(n * 50 + j) - 0.5) * 5;
        return `<path d="M${f(-8 + hash(n * 70 + j) * 4)},${f(yy)} L${f(8 - hash(n * 90 + j) * 4)},${f(yy + tilt)}" stroke="#6B4226" stroke-width="2.6" stroke-linecap="round"/>`;
      }).join('');
      return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(a)})"><ellipse rx="7" ry="17" fill="#8A5A3C"/>${sticks}</g>`;
    }).join('');
    return stroke('stroke="#CFE3C8" stroke-width="54" stroke-linecap="round"') + stroke('stroke="#8EC3D8" stroke-width="34"')
      + stroke('stroke="#59A3C6" stroke-width="28"')
      // Current: thin, irregular streaks in three lanes, each drifting at its own slow speed.
      // Every dash pattern sums to 200px, the distance the ripple keyframes move.
      + stroke('class="ripple" style="animation-duration:13s" transform="translate(0 -6)" stroke="#D7EEF7" stroke-width="1.6" stroke-dasharray="24 76 12 88" stroke-linecap="round" opacity="0.85"')
      + stroke('class="ripple" style="animation-duration:10s" stroke="#E8F6FB" stroke-width="2.2" stroke-dasharray="44 156" stroke-linecap="round" opacity="0.6"')
      + stroke('class="ripple" style="animation-duration:17s" transform="translate(0 6)" stroke="#D7EEF7" stroke-width="1.4" stroke-dasharray="14 96 36 54" stroke-linecap="round" opacity="0.7"')
      + dams + reeds + trees + mills;
  }

  function drawDev() {
    const { S, H, yAt } = G;
    const traces = grid(30, 0, S)
      .filter((i) => hash(i * 13 + 121) > 0.45)
      .map((i) => {
        const x = G.toX(i * 30), dir = hash(i + 131) < 0.5 ? -1 : 1;
        const y0 = yAt(x) + dir * 12, y1 = y0 + dir * (20 + hash(i * 3 + 141) * 60), jog = (hash(i * 7 + 151) - 0.5) * 70;
        if (y1 < 8 || y1 > H - 8) return '';
        return `<path d="M${f(x)},${f(y0)} V${f(y1)} h${f(jog)}" fill="none" stroke="#1E3A5F" stroke-width="1.5"/><circle cx="${f(x + jog)}" cy="${f(y1)}" r="3" fill="#0B1020" stroke="#2F5A8A" stroke-width="1.5"/>`;
      }).join('');
    const chips = [-250, 150, 640, 1150].map((u) => {
      const x = G.toX(u);
      if (x < -30 || x > S + 30) return '';
      const ry = yAt(x), y = Math.max(20, Math.min(H - 20, ry > H / 2 ? ry - 110 : ry + 110));
      return `<g transform="translate(${f(x)} ${f(y)})"><rect x="-16" y="-11" width="32" height="22" rx="2" fill="#111A2E" stroke="#2A3F66" stroke-width="1.5"/><path d="M-9,-11 v-5 M0,-11 v-5 M9,-11 v-5 M-9,11 v5 M0,11 v5 M9,11 v5" stroke="#2A3F66" stroke-width="1.5"/><circle r="3" fill="#35D0E0" opacity="0.7"/></g>`;
    }).join('');
    return `<defs><filter id="tl-glow" x="-10%" y="-30%" width="120%" height="160%"><feGaussianBlur stdDeviation="5"/></filter></defs>`
      + traces + chips
      + stroke('stroke="#35D0E0" stroke-width="12" opacity="0.4" filter="url(#tl-glow)"') + stroke('stroke="#35D0E0" stroke-width="3.5"')
      + stroke('class="flow" stroke="#F472B6" stroke-width="6" stroke-dasharray="6 60" stroke-linecap="round"');
  }

  const drawers = { nature: drawNature, river: drawRiver, dev: drawDev };
  return (drawers[look] ?? drawers[DEFAULT_THEME])();
}
