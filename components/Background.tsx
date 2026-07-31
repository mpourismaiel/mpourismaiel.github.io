import { useCallback, useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
  vx: number;
  p: number;
  tw: number;
  ts: number;
  spike: boolean;
  warm: boolean;
};

type Galaxy = {
  img: HTMLCanvasElement;
  x: number;
  y: number;
  tilt: number;
  squash: number;
  spin: number;
  sp: number;
  par: number;
  alpha: number;
};

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  len: number;
};

const TAU = Math.PI * 2;
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

/**
 * A 2D canvas deep field: baked spiral galaxies, a milky band, nebula clouds,
 * parallax stars and the occasional meteor. Replaces the three.js point cloud —
 * no WebGL context, no sprite textures, and the whole scene is baked once per
 * resize so the per-frame cost is a handful of drawImage calls.
 */
export const Background = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number>(0);

  const setCanvas = useCallback((el: HTMLCanvasElement) => {
    canvas.current = el;
  }, []);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let scroll = 0;
    let stars: Star[] = [];
    let gals: Galaxy[] = [];
    let meteors: Meteor[] = [];
    let bg: HTMLCanvasElement | null = null;
    let nextMeteor = 2200;

    // One baked star sprite, cheaper than a gradient per star per frame.
    const sprite = document.createElement("canvas");
    sprite.width = 32;
    sprite.height = 32;
    const sg = sprite.getContext("2d");
    if (sg) {
      const rg = sg.createRadialGradient(16, 16, 0, 16, 16, 16);
      rg.addColorStop(0, "rgba(255,255,255,1)");
      rg.addColorStop(0.16, "rgba(232,236,255,0.8)");
      rg.addColorStop(0.42, "rgba(165,180,252,0.24)");
      rg.addColorStop(1, "rgba(99,102,241,0)");
      sg.fillStyle = rg;
      sg.fillRect(0, 0, 32, 32);
    }

    // A face-on spiral, baked once; tilt, squash and spin happen at draw time.
    const bakeGalaxy = (R: number, outerRGB: string) => {
      const size = Math.max(8, Math.ceil(R * 2));
      const cv = document.createElement("canvas");
      cv.width = size;
      cv.height = size;
      const g = cv.getContext("2d");
      if (!g) return cv;

      g.translate(R, R);
      g.globalCompositeOperation = "lighter";

      const haze = g.createRadialGradient(0, 0, R * 0.08, 0, 0, R);
      haze.addColorStop(0, "rgba(150,140,245,0.13)");
      haze.addColorStop(0.5, "rgba(120,112,220,0.06)");
      haze.addColorStop(1, "rgba(99,102,241,0)");
      g.fillStyle = haze;
      g.beginPath();
      g.arc(0, 0, R, 0, TAU);
      g.fill();

      const core = g.createRadialGradient(0, 0, 0, 0, 0, R * 0.36);
      core.addColorStop(0, "rgba(255,249,238,0.62)");
      core.addColorStop(0.22, "rgba(255,226,192,0.26)");
      core.addColorStop(0.62, "rgba(168,150,240,0.11)");
      core.addColorStop(1, "rgba(99,102,241,0)");
      g.fillStyle = core;
      g.beginPath();
      g.arc(0, 0, R * 0.36, 0, TAU);
      g.fill();

      const arms = 2;
      const per = Math.round(1500 * Math.min(1.4, R / 220 + 0.5));
      for (let a = 0; a < arms; a++) {
        for (let i = 0; i < per; i++) {
          const t = Math.pow(i / per, 0.6);
          const th = t * 3.05 + a * Math.PI + rnd(-0.16, 0.16);
          const rr = R * (0.1 + 0.86 * t) + rnd(-R * 0.045, R * 0.045);
          const fade = (1 - t) * 0.85 + 0.15;
          g.fillStyle =
            t < 0.32
              ? "rgba(255,238,216," + 0.5 * fade + ")"
              : t < 0.68
                ? "rgba(200,200,255," + 0.4 * fade + ")"
                : "rgba(" + outerRGB + "," + 0.34 * fade + ")";
          g.beginPath();
          g.arc(Math.cos(th) * rr, Math.sin(th) * rr, rnd(0.45, 1.5), 0, TAU);
          g.fill();
        }
      }

      return cv;
    };

    const build = () => {
      w = c.clientWidth;
      h = c.clientHeight;
      if (!w || !h) return;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Deep field: nebula clouds plus a milky band, baked taller than the
      // viewport so it can drift with the scroll position.
      bg = document.createElement("canvas");
      bg.width = w;
      bg.height = Math.round(h * 1.3);
      const bh = bg.height;
      const b = bg.getContext("2d");
      if (!b) return;
      b.globalCompositeOperation = "lighter";

      const clouds: [number, number, string, number][] = [
        [0.84, 0.06, "99,102,241", 0.13],
        [0.18, 0.26, "139,92,246", 0.085],
        [0.6, 0.72, "244,114,182", 0.045],
        [0.04, 0.94, "56,189,248", 0.04],
        [0.72, 0.46, "129,140,248", 0.055],
      ];
      clouds.forEach(([fx, fy, rgb, al]) => {
        const x = fx * w;
        const y = fy * bh;
        const R = Math.max(w, bh) * rnd(0.3, 0.52);
        const g = b.createRadialGradient(x, y, 0, x, y, R);
        g.addColorStop(0, "rgba(" + rgb + "," + al + ")");
        g.addColorStop(0.5, "rgba(" + rgb + "," + al * 0.34 + ")");
        g.addColorStop(1, "rgba(" + rgb + ",0)");
        b.fillStyle = g;
        b.fillRect(0, 0, w, bh);
      });

      const ang = -0.4;
      const bx = w * 0.5;
      const by = bh * 0.54;
      const span = Math.hypot(w, bh);
      const grains = Math.round((w * bh) / 780);
      for (let i = 0; i < grains; i++) {
        const u = rnd(-0.62, 0.62) * span;
        const v =
          (Math.random() + Math.random() + Math.random() - 1.5) * bh * 0.15;
        const x = bx + Math.cos(ang) * u - Math.sin(ang) * v;
        const y = by + Math.sin(ang) * u + Math.cos(ang) * v;
        if (x < 0 || x > w || y < 0 || y > bh) continue;
        const a = rnd(0.05, 0.34) * Math.max(0, 1 - Math.abs(v) / (bh * 0.34));
        b.fillStyle =
          Math.random() < 0.14
            ? "rgba(255,228,202," + a + ")"
            : "rgba(216,222,255," + a + ")";
        b.fillRect(x, y, rnd(0.6, 1.5), rnd(0.6, 1.5));
      }

      const m = Math.min(w, h);
      gals = [
        {
          img: bakeGalaxy(m * 0.46, "176,158,255"),
          x: w * 0.79,
          y: h * 0.26,
          tilt: -0.52,
          squash: 0.34,
          spin: rnd(0, TAU),
          sp: 0.000045,
          par: 0.05,
          alpha: 0.95,
        },
        {
          img: bakeGalaxy(m * 0.19, "255,196,182"),
          x: w * 0.14,
          y: h * 0.8,
          tilt: 0.72,
          squash: 0.26,
          spin: rnd(0, TAU),
          sp: -0.00008,
          par: 0.13,
          alpha: 0.7,
        },
      ];

      const count = Math.round((w * h) / 6400);
      stars = Array.from({ length: count }, () => {
        const depth = Math.random();
        const bright = Math.random() > 0.965;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: bright ? rnd(1.6, 2.4) : depth > 0.5 ? rnd(0.3, 0.75) : rnd(0.7, 1.3),
          a: bright ? rnd(0.75, 1) : depth > 0.5 ? rnd(0.16, 0.4) : rnd(0.34, 0.7),
          vx: (depth > 0.5 ? 0.006 : 0.016) * (Math.random() > 0.5 ? 1 : -1),
          p: depth > 0.5 ? 0.025 : 0.085,
          tw: Math.random() * TAU,
          ts: rnd(0.0006, 0.0018),
          spike: bright,
          warm: Math.random() < 0.16,
        };
      });
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      if (bg) {
        const range = bg.height - h;
        ctx.globalAlpha = 1;
        ctx.drawImage(bg, 0, -Math.min(range, scroll * 0.05));
      }

      for (const g of gals) {
        ctx.save();
        ctx.globalAlpha = g.alpha;
        ctx.translate(g.x, g.y - scroll * g.par);
        ctx.rotate(g.tilt);
        ctx.scale(1, g.squash);
        ctx.rotate(g.spin + (reduce ? 0 : t * g.sp));
        ctx.drawImage(g.img, -g.img.width / 2, -g.img.height / 2);
        ctx.restore();
      }

      for (const s of stars) {
        if (!reduce) {
          s.x += s.vx;
          if (s.x < -3) s.x = w + 3;
          if (s.x > w + 3) s.x = -3;
        }
        const y = (((s.y - scroll * s.p) % (h + 6)) + h + 6) % (h + 6) - 3;
        const flick = reduce ? 1 : 0.72 + 0.28 * Math.sin(t * s.ts + s.tw);
        const d = s.r * 8;
        ctx.globalAlpha = Math.min(1, s.a * flick);
        ctx.drawImage(sprite, s.x - d / 2, y - d / 2, d, d);
        if (s.spike) {
          const len = s.r * 7 * flick;
          ctx.globalAlpha = Math.min(1, s.a * flick * 0.5);
          ctx.strokeStyle = s.warm
            ? "rgba(255,232,208,1)"
            : "rgba(226,232,255,1)";
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(s.x - len, y);
          ctx.lineTo(s.x + len, y);
          ctx.moveTo(s.x, y - len);
          ctx.lineTo(s.x, y + len);
          ctx.stroke();
        }
      }

      if (!reduce) {
        if (t > nextMeteor) {
          nextMeteor = t + rnd(4200, 11000);
          const dir = Math.random() > 0.5 ? -1 : 1;
          meteors.push({
            x: dir < 0 ? rnd(w * 0.35, w * 1.05) : rnd(-w * 0.05, w * 0.6),
            y: rnd(-h * 0.05, h * 0.55),
            vx: dir * rnd(5.5, 9),
            vy: rnd(1.8, 3.6),
            life: 0,
            max: rnd(70, 130),
            len: rnd(70, 170),
          });
        }
        meteors = meteors.filter(mt => {
          mt.x += mt.vx;
          mt.y += mt.vy;
          mt.life++;
          const k = Math.sin((mt.life / mt.max) * Math.PI);
          const scale = mt.len / Math.hypot(mt.vx, mt.vy);
          const nx = mt.x - mt.vx * scale;
          const ny = mt.y - mt.vy * scale;
          const g = ctx.createLinearGradient(mt.x, mt.y, nx, ny);
          g.addColorStop(0, "rgba(255,255,255," + 0.85 * k + ")");
          g.addColorStop(0.25, "rgba(199,210,254," + 0.45 * k + ")");
          g.addColorStop(1, "rgba(129,140,248,0)");
          ctx.globalAlpha = 1;
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.6;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(mt.x, mt.y);
          ctx.lineTo(nx, ny);
          ctx.stroke();
          return mt.life < mt.max && mt.x > -w * 0.2 && mt.x < w * 1.2 && mt.y < h * 1.2;
        });
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      if (!reduce) raf.current = requestAnimationFrame(draw);
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        if (reduce) draw(0);
      }, 160);
    };
    const onScroll = () => {
      scroll = window.scrollY;
      if (reduce) draw(0);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    build();
    if (reduce) draw(0);
    else raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="fixed z-0 w-screen h-screen top-0 left-0 pointer-events-none">
      <canvas className="w-full h-full" ref={setCanvas} />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 600px at 78% -10%, rgba(99,102,241,0.16), transparent 62%), radial-gradient(700px 520px at -5% 100%, rgba(0,0,0,0.55), transparent 60%)",
        }}
      />
    </div>
  );
};
