import type { EntityTypeConfig } from './gameLogic';

export interface RenderEntity {
  key: string;
  radius: number;
  dir: number;
  hp?: number;
  wingPhase?: number;
  isDangerous?: boolean;
  type: EntityTypeConfig;
}

function faceTravelDirection(ctx: CanvasRenderingContext2D, entity: RenderEntity) {
  // Shape artwork faces right. Mirror it only for leftward travel.
  if (entity.dir < 0) ctx.scale(-1, 1);
}

/** Lightweight arcade aeroplane built from a few readable canvas shapes. */
export function drawDetailedAeroplane(
  ctx: CanvasRenderingContext2D,
  entity: RenderEntity,
  _elapsed: number
) {
  const r = entity.radius;
  ctx.save();
  faceTravelDirection(ctx, entity);

  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = '#1e3a8a';
  ctx.lineWidth = Math.max(2, r * 0.09);
  ctx.beginPath();
  ctx.moveTo(-r * 1.45, r * 0.2);
  ctx.lineTo(r * 1.25, r * 0.2);
  ctx.quadraticCurveTo(r * 1.65, 0, r * 1.2, -r * 0.2);
  ctx.lineTo(-r * 1.2, -r * 0.2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#2563eb';
  ctx.beginPath();
  ctx.moveTo(-r * 0.35, -r * 0.12);
  ctx.lineTo(r * 0.25, -r * 0.95);
  ctx.lineTo(r * 0.65, -r * 0.08);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-r * 0.35, r * 0.12);
  ctx.lineTo(r * 0.2, r * 0.9);
  ctx.lineTo(r * 0.65, r * 0.08);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ef4444';
  ctx.fillRect(-r * 1.25, -r * 0.62, r * 0.28, r * 0.62);
  ctx.restore();
}

/** Simple, colorful bird silhouette that remains clear on small mobile canvases. */
export function drawDetailedBird(
  ctx: CanvasRenderingContext2D,
  entity: RenderEntity,
  elapsed: number
) {
  const r = entity.radius;
  const config = entity.type;
  const flap = Math.sin(elapsed * 11 + (entity.wingPhase || 0));

  ctx.save();
  faceTravelDirection(ctx, entity);
  ctx.rotate(flap * 0.035);

  // Tail.
  ctx.fillStyle = config.tail;
  ctx.beginPath();
  ctx.moveTo(-r * 0.72, 0);
  ctx.lineTo(-r * 1.35, -r * 0.48);
  ctx.lineTo(-r * 1.15, r * 0.42);
  ctx.closePath();
  ctx.fill();

  // Body and head.
  ctx.fillStyle = config.color;
  ctx.strokeStyle = entity.isDangerous ? '#7f1d1d' : 'rgba(15, 23, 42, 0.55)';
  ctx.lineWidth = Math.max(1.5, r * 0.08);
  ctx.beginPath();
  ctx.ellipse(-r * 0.08, 0, r, r * 0.65, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = config.head;
  ctx.beginPath();
  ctx.arc(r * 0.62, -r * 0.18, r * 0.48, 0, Math.PI * 2);
  ctx.fill();

  // One broad wing communicates motion without decorative detail.
  ctx.fillStyle = config.wing;
  ctx.beginPath();
  ctx.ellipse(-r * 0.2, flap * r * 0.15, r * 0.62, r * (0.25 + Math.abs(flap) * 0.18), -0.25, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = config.beak;
  ctx.beginPath();
  ctx.moveTo(r * 1.03, -r * 0.22);
  ctx.lineTo(r * 1.5, -r * 0.05);
  ctx.lineTo(r * 1.03, r * 0.05);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(r * 0.72, -r * 0.31, Math.max(2, r * 0.08), 0, Math.PI * 2);
  ctx.fill();

  if (entity.key === 'armored' && (entity.hp ?? 0) > 1) {
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = Math.max(3, r * 0.16);
    ctx.beginPath();
    ctx.arc(-r * 0.08, 0, r * 0.72, -1.1, 1.1);
    ctx.stroke();
  } else if (entity.isDangerous) {
    ctx.strokeStyle = '#fef2f2';
    ctx.lineWidth = Math.max(2, r * 0.1);
    ctx.beginPath();
    ctx.moveTo(-r * 0.35, -r * 0.3);
    ctx.lineTo(r * 0.15, r * 0.3);
    ctx.moveTo(r * 0.15, -r * 0.3);
    ctx.lineTo(-r * 0.35, r * 0.3);
    ctx.stroke();
  }

  ctx.restore();
}
