// Clean 2D arcade renderers: bold silhouettes, flat colors and a small number of paths.
function fillAndStroke(ctx: CanvasRenderingContext2D, fill: string, stroke = '#172033') {
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1.6;
  ctx.stroke();
}

export function drawDetailedAeroplane(ctx: CanvasRenderingContext2D, entity: any, _elapsed: number) {
  const r = entity.radius;
  ctx.save();
  ctx.shadowColor = 'rgba(15, 23, 42, .22)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetY = 3;

  // Tail fin and broad wings make the bonus plane readable at phone size.
  ctx.beginPath();
  ctx.moveTo(-r * .72, -r * .2); ctx.lineTo(-r * 1.05, -r * .72); ctx.lineTo(-r * .45, -r * .35);
  ctx.lineTo(-r * .45, r * .35); ctx.lineTo(-r * 1.05, r * .72); ctx.lineTo(-r * .72, r * .2);
  fillAndStroke(ctx, '#ef4444');

  ctx.beginPath();
  ctx.moveTo(r * .28, 0); ctx.lineTo(-r * .5, r * .9); ctx.lineTo(-r * .12, r * .12);
  ctx.lineTo(-r * .12, -r * .12); ctx.lineTo(-r * .5, -r * .9); ctx.closePath();
  fillAndStroke(ctx, '#2563eb');

  ctx.beginPath();
  ctx.moveTo(r * 1.35, 0); ctx.quadraticCurveTo(r * .75, -r * .3, -r * .9, -r * .23);
  ctx.lineTo(-r * .9, r * .23); ctx.quadraticCurveTo(r * .75, r * .3, r * 1.35, 0); ctx.closePath();
  fillAndStroke(ctx, '#f8fafc');

  ctx.shadowColor = 'transparent';
  ctx.beginPath(); ctx.ellipse(r * .48, -r * .1, r * .3, r * .16, 0, 0, Math.PI * 2);
  fillAndStroke(ctx, '#38bdf8', '#075985');
  ctx.restore();
}

export function drawDetailedBird(ctx: CanvasRenderingContext2D, entity: any, elapsed: number) {
  const r = entity.radius;
  const flap = Math.sin(elapsed * 10 + entity.wingPhase) * r * .16;
  const palette: Record<string, { body: string; wing: string; belly: string }> = {
    normal: { body: '#2583db', wing: '#75bdf2', belly: '#dff3ff' },
    fast: { body: '#f97316', wing: '#fdba74', belly: '#fff1dc' },
    small: { body: '#16a96b', wing: '#6ee7b7', belly: '#dcfce7' },
    large: { body: '#7c3aed', wing: '#b99af7', belly: '#f1eaff' },
    rare: { body: '#db2777', wing: '#f9a8d4', belly: '#fce7f3' },
    armored: { body: '#526277', wing: '#94a3b8', belly: '#e2e8f0' },
    hazard_25: { body: '#eab308', wing: '#fde047', belly: '#fff7c2' },
    skull_50: { body: '#7f1d1d', wing: '#111827', belly: '#d1d5db' },
  };
  const colors = palette[entity.key] || palette.normal;

  ctx.save();
  ctx.shadowColor = 'rgba(15, 23, 42, .25)'; ctx.shadowBlur = 4; ctx.shadowOffsetY = 2;
  // Two-feather tail.
  ctx.beginPath();
  ctx.moveTo(-r * .65, -r * .1); ctx.lineTo(-r * 1.3, -r * .52); ctx.lineTo(-r * 1.02, 0);
  ctx.lineTo(-r * 1.3, r * .52); ctx.lineTo(-r * .62, r * .2); ctx.closePath();
  fillAndStroke(ctx, colors.wing);

  ctx.beginPath(); ctx.ellipse(0, 0, r, r * .65, 0, 0, Math.PI * 2); fillAndStroke(ctx, colors.body);
  ctx.beginPath(); ctx.ellipse(r * .22, r * .2, r * .55, r * .32, -.12, 0, Math.PI * 2); fillAndStroke(ctx, colors.belly, colors.body);
  ctx.beginPath(); ctx.ellipse(-r * .2, flap, r * .62, r * .32, -.28, 0, Math.PI * 2); fillAndStroke(ctx, colors.wing, colors.body);
  ctx.beginPath(); ctx.arc(r * .61, -r * .25, r * .43, 0, Math.PI * 2); fillAndStroke(ctx, colors.body);

  ctx.shadowColor = 'transparent';
  ctx.beginPath(); ctx.moveTo(r * .98, -r * .28); ctx.lineTo(r * 1.42, -r * .1); ctx.lineTo(r * .98, r * .02); ctx.closePath();
  fillAndStroke(ctx, entity.isDangerous ? '#ef4444' : '#fbbf24', '#9a3412');
  ctx.beginPath(); ctx.arc(r * .72, -r * .35, r * .13, 0, Math.PI * 2); fillAndStroke(ctx, '#fff');
  ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(r * .76, -r * .35, r * .065, 0, Math.PI * 2); ctx.fill();

  if (entity.key === 'small') { // Iconic hummingbird needle bill.
    ctx.strokeStyle = '#172033'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(r * 1.25, -r * .1); ctx.lineTo(r * 1.75, -r * .12); ctx.stroke();
  }
  if (entity.isDangerous) { // Clear hazard crest without small decorative clutter.
    ctx.fillStyle = '#ef4444';
    for (const x of [-.55, -.15, .25]) { ctx.beginPath(); ctx.moveTo(x*r, -r*.5); ctx.lineTo((x+.18)*r, -r*1.02); ctx.lineTo((x+.35)*r, -r*.48); ctx.fill(); }
  }
  if (entity.key === 'armored') {
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(-r*.1, 0, r*.52, -.8, .8); ctx.stroke();
  }
  ctx.restore();
}
