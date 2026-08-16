// Lightweight, clean arcade renderers. Shapes intentionally avoid costly gradients and tiny details.
export function drawDetailedAeroplane(ctx: CanvasRenderingContext2D, entity: any, _elapsed: number) {
  const r = entity.radius;
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(r * 1.35, 0); ctx.lineTo(-r, r * 0.3); ctx.lineTo(-r, -r * 0.3); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#2563eb';
  ctx.beginPath();
  ctx.moveTo(r * 0.2, 0); ctx.lineTo(-r * 0.55, r * 0.85); ctx.lineTo(-r * 0.15, 0); ctx.lineTo(-r * 0.55, -r * 0.85); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.ellipse(r * 0.55, -r * 0.08, r * 0.28, r * 0.15, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ef4444'; ctx.fillRect(-r, -r * 0.28, r * 0.18, r * 0.56);
}

export function drawDetailedBird(ctx: CanvasRenderingContext2D, entity: any, elapsed: number) {
  const r = entity.radius;
  const flap = Math.sin(elapsed * 10 + entity.wingPhase) * r * 0.18;
  const palette: Record<string, [string, string]> = {
    normal: ['#2563eb', '#93c5fd'], fast: ['#f97316', '#fed7aa'], small: ['#22c55e', '#bbf7d0'],
    large: ['#7c3aed', '#ddd6fe'], rare: ['#ec4899', '#fbcfe8'], armored: ['#475569', '#cbd5e1'],
    hazard_25: ['#eab308', '#171717'], skull_50: ['#7f1d1d', '#111827'],
  };
  const [body, wing] = palette[entity.key] || ['#2563eb', '#bfdbfe'];
  ctx.fillStyle = body; ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.65, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = wing; ctx.beginPath(); ctx.ellipse(-r * 0.2, flap, r * 0.58, r * 0.3, -0.25, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = body; ctx.beginPath(); ctx.arc(r * 0.62, -r * 0.25, r * 0.43, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = entity.isDangerous ? '#ef4444' : '#fbbf24'; ctx.beginPath(); ctx.moveTo(r, -r * .25); ctx.lineTo(r * 1.4, -r * .08); ctx.lineTo(r, r * .04); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(r * .72, -r * .34, r * .12, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(r * .75, -r * .34, r * .06, 0, Math.PI * 2); ctx.fill();
  if (entity.isDangerous) { ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-r*.7,-r*.5); ctx.lineTo(-r*.45,-r*.9); ctx.moveTo(-r*.15,-r*.6); ctx.lineTo(0,-r); ctx.stroke(); }
}
