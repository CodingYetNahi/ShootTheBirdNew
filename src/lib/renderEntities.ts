// Highly polished canvas renderer for Birds, Aeroplanes, and Special Entities

export function drawDetailedAeroplane(
  ctx: CanvasRenderingContext2D,
  entity: any,
  elapsed: number
) {
  const r = entity.radius;
  const age = entity.age || 0;

  // 1. Supersonic Jet Afterburner & Exhaust Flames
  ctx.save();
  const flamePulse = 0.85 + Math.sin(age * 35) * 0.25;
  const flameLength = r * 1.35 * flamePulse;

  // Outer heat bloom
  const exhaustGrad = ctx.createLinearGradient(-r * 0.9, 0, -r * 0.9 - flameLength, 0);
  exhaustGrad.addColorStop(0, 'rgba(249, 115, 22, 0.95)');
  exhaustGrad.addColorStop(0.3, 'rgba(234, 179, 8, 0.85)');
  exhaustGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.6)');
  exhaustGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

  // Top and bottom jet engine exhausts
  const engineYPositions = [-r * 0.22, r * 0.22];
  for (const ey of engineYPositions) {
    ctx.fillStyle = exhaustGrad;
    ctx.beginPath();
    ctx.moveTo(-r * 0.85, ey - r * 0.12);
    ctx.lineTo(-r * 0.85 - flameLength, ey);
    ctx.lineTo(-r * 0.85, ey + r * 0.12);
    ctx.closePath();
    ctx.fill();

    // Inner bright supersonic blue core
    ctx.fillStyle = '#67e8f9';
    ctx.beginPath();
    ctx.moveTo(-r * 0.85, ey - r * 0.05);
    ctx.lineTo(-r * 0.85 - flameLength * 0.45, ey);
    ctx.lineTo(-r * 0.85, ey + r * 0.05);
    ctx.closePath();
    ctx.fill();
  }

  // Soft vapor contrail puff trails
  for (let i = 1; i <= 3; i++) {
    const puffDist = r * 0.85 + i * (r * 0.65);
    const puffSize = (r * 0.18) * (1 + i * 0.4);
    const puffAlpha = Math.max(0, 0.35 - i * 0.1);
    ctx.fillStyle = `rgba(241, 245, 249, ${puffAlpha})`;
    for (const ey of engineYPositions) {
      ctx.beginPath();
      ctx.arc(-puffDist - (age * 18 % 12), ey + Math.sin(age * 8 + i) * 2, puffSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();

  // 2. Main Wings (Swept-back Delta Wings with Aerodynamic Decals)
  ctx.save();
  // Under-wing shadow
  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  ctx.moveTo(r * 0.1, r * 0.05);
  ctx.lineTo(-r * 0.65, r * 1.15);
  ctx.lineTo(-r * 0.35, r * 1.15);
  ctx.lineTo(r * 0.45, r * 0.05);
  ctx.closePath();
  ctx.fill();

  // Top Wing Main Surface
  const wingGrad = ctx.createLinearGradient(-r * 0.5, -r * 1.1, r * 0.4, r * 1.1);
  wingGrad.addColorStop(0, '#f8fafc');
  wingGrad.addColorStop(0.5, '#e2e8f0');
  wingGrad.addColorStop(1, '#cbd5e1');
  ctx.fillStyle = wingGrad;

  // Lower Wing
  ctx.beginPath();
  ctx.moveTo(r * 0.15, 0);
  ctx.lineTo(-r * 0.6, r * 1.1);
  ctx.lineTo(-r * 0.32, r * 1.1);
  ctx.lineTo(r * 0.42, 0);
  ctx.closePath();
  ctx.fill();

  // Upper Wing
  ctx.beginPath();
  ctx.moveTo(r * 0.15, 0);
  ctx.lineTo(-r * 0.6, -r * 1.1);
  ctx.lineTo(-r * 0.32, -r * 1.1);
  ctx.lineTo(r * 0.42, 0);
  ctx.closePath();
  ctx.fill();

  // Wing Red & Blue Speed Stripes
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.moveTo(-r * 0.48, r * 0.9);
  ctx.lineTo(-r * 0.56, r * 1.05);
  ctx.lineTo(-r * 0.4, r * 1.05);
  ctx.lineTo(-r * 0.32, r * 0.9);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-r * 0.48, -r * 0.9);
  ctx.lineTo(-r * 0.56, -r * 1.05);
  ctx.lineTo(-r * 0.4, -r * 1.05);
  ctx.lineTo(-r * 0.32, -r * 0.9);
  ctx.closePath();
  ctx.fill();

  // Wingtip Navigation Strobe LEDs (Port Red, Starboard Cyan/Green)
  const isBlink = Math.sin(age * 14) > 0;
  ctx.fillStyle = isBlink ? '#22c55e' : '#15803d';
  ctx.beginPath();
  ctx.arc(-r * 0.45, r * 1.1, 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = isBlink ? '#ef4444' : '#991b1b';
  ctx.beginPath();
  ctx.arc(-r * 0.45, -r * 1.1, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // 3. Jet Engine Nacelle Cylinders
  for (const ey of engineYPositions) {
    const nacelleGrad = ctx.createLinearGradient(-r * 0.85, ey, -r * 0.1, ey);
    nacelleGrad.addColorStop(0, '#334155');
    nacelleGrad.addColorStop(0.5, '#64748b');
    nacelleGrad.addColorStop(1, '#94a3b8');
    ctx.fillStyle = nacelleGrad;
    ctx.beginPath();
    ctx.roundRect(-r * 0.85, ey - r * 0.14, r * 0.75, r * 0.28, 4);
    ctx.fill();

    // Intake Rim
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.ellipse(-r * 0.1, ey, r * 0.05, r * 0.13, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(-r * 0.1, ey, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // 4. Streamlined Metallic Fuselage
  const fuseGrad = ctx.createLinearGradient(0, -r * 0.4, 0, r * 0.4);
  fuseGrad.addColorStop(0, '#ffffff');
  fuseGrad.addColorStop(0.3, '#f1f5f9');
  fuseGrad.addColorStop(0.7, '#cbd5e1');
  fuseGrad.addColorStop(1, '#94a3b8');
  ctx.fillStyle = fuseGrad;
  ctx.beginPath();
  ctx.moveTo(r * 1.35, 0); // Sharp Nose cone
  ctx.quadraticCurveTo(r * 0.8, -r * 0.38, -r * 0.6, -r * 0.32);
  ctx.lineTo(-r * 1.1, -r * 0.18);
  ctx.lineTo(-r * 1.1, r * 0.18);
  ctx.lineTo(-r * 0.6, r * 0.32);
  ctx.quadraticCurveTo(r * 0.8, r * 0.38, r * 1.35, 0);
  ctx.closePath();
  ctx.fill();

  // Fuselage Racing Stripe
  ctx.fillStyle = '#2563eb';
  ctx.beginPath();
  ctx.moveTo(r * 1.1, 0);
  ctx.lineTo(-r * 0.85, -r * 0.08);
  ctx.lineTo(-r * 0.85, r * 0.08);
  ctx.lineTo(r * 1.1, 0);
  ctx.closePath();
  ctx.fill();

  // 5. Vertical Tail Stabilizer Fin
  const tailGrad = ctx.createLinearGradient(-r * 1.2, -r * 0.9, -r * 0.6, 0);
  tailGrad.addColorStop(0, '#2563eb');
  tailGrad.addColorStop(0.5, '#3b82f6');
  tailGrad.addColorStop(1, '#1d4ed8');
  ctx.fillStyle = tailGrad;
  ctx.beginPath();
  ctx.moveTo(-r * 0.55, 0);
  ctx.lineTo(-r * 1.25, -r * 0.92);
  ctx.lineTo(-r * 0.95, -r * 0.92);
  ctx.lineTo(-r * 0.85, 0);
  ctx.closePath();
  ctx.fill();

  // Tail Rudder Accent Line
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(-r * 1.1, -r * 0.8);
  ctx.lineTo(-r * 1.18, -r * 0.88);
  ctx.lineTo(-r * 1.05, -r * 0.88);
  ctx.lineTo(-r * 0.98, -r * 0.8);
  ctx.closePath();
  ctx.fill();

  // Horizontal Tail Elevators
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.moveTo(-r * 0.75, 0);
  ctx.lineTo(-r * 1.2, r * 0.45);
  ctx.lineTo(-r * 1.02, r * 0.45);
  ctx.lineTo(-r * 0.65, 0);
  ctx.closePath();
  ctx.fill();

  // 6. Cockpit Canopy with Pilot & Gleam Reflection
  const canopyGrad = ctx.createRadialGradient(r * 0.45, -r * 0.12, 1, r * 0.45, -r * 0.12, r * 0.45);
  canopyGrad.addColorStop(0, 'rgba(224, 242, 254, 0.98)');
  canopyGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.92)');
  canopyGrad.addColorStop(0.85, 'rgba(14, 116, 144, 0.95)');
  canopyGrad.addColorStop(1, 'rgba(15, 23, 42, 0.98)');
  ctx.fillStyle = canopyGrad;
  ctx.beginPath();
  ctx.ellipse(r * 0.42, -r * 0.08, r * 0.44, r * 0.22, 0.05, 0, Math.PI * 2);
  ctx.fill();

  // Pilot Silhouette with Aviator Goggles
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(r * 0.42, -r * 0.1, r * 0.11, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fbbf24'; // Goggles gold shine
  ctx.beginPath();
  ctx.ellipse(r * 0.46, -r * 0.1, r * 0.05, r * 0.035, 0, 0, Math.PI * 2);
  ctx.fill();

  // Crisp Curved Cockpit Glass Reflection Specular
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.arc(r * 0.42, -r * 0.08, r * 0.36, -Math.PI * 0.85, -Math.PI * 0.25);
  ctx.stroke();

  // 7. Shiny Metallic Nosecap Highlight
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(r * 1.25, 0, 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function drawDetailedBird(
  ctx: CanvasRenderingContext2D,
  entity: any,
  elapsed: number
) {
  const r = entity.radius;
  const key = entity.key;
  const config = entity.type;
  const isDying = entity.dying;
  const wingCycle = isDying ? 0.8 : Math.sin(entity.wingPhase || 0);

  ctx.save();

  // 1. Species-Specific Aura / Special Particle Streaks
  if (key === 'rare') {
    // Golden Phoenix Aura
    const aura = ctx.createRadialGradient(0, 0, r * 0.5, 0, 0, r * 1.6);
    aura.addColorStop(0, 'rgba(254, 240, 138, 0.35)');
    aura.addColorStop(0.6, 'rgba(234, 179, 8, 0.2)');
    aura.addColorStop(1, 'rgba(234, 179, 8, 0)');
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.6, 0, Math.PI * 2);
    ctx.fill();
  } else if (key === 'skull_50') {
    // Cursed Raven Dark Void Aura
    const aura = ctx.createRadialGradient(0, 0, r * 0.4, 0, 0, r * 1.5);
    aura.addColorStop(0, 'rgba(190, 24, 93, 0.3)');
    aura.addColorStop(0.7, 'rgba(76, 5, 25, 0.2)');
    aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Layered Tail Feathers
  ctx.save();
  if (key === 'rare') {
    // Golden Phoenix: 3 Majestic Flowing Ribbon Streamers
    const streamerWave = Math.sin(entity.wingPhase * 0.7) * 0.2;
    for (let k = -1; k <= 1; k++) {
      const tailGrad = ctx.createLinearGradient(-r * 0.6, 0, -r * 2.2, k * r * 0.6);
      tailGrad.addColorStop(0, '#eab308');
      tailGrad.addColorStop(0.5, '#f97316');
      tailGrad.addColorStop(1, '#ef4444');
      ctx.fillStyle = tailGrad;
      ctx.beginPath();
      ctx.moveTo(-r * 0.6, k * r * 0.15);
      ctx.quadraticCurveTo(
        -r * 1.4,
        k * r * 0.5 + streamerWave * r * 3,
        -r * 2.2 - Math.abs(k) * r * 0.3,
        k * r * 0.7 + streamerWave * r * 5
      );
      ctx.lineTo(-r * 1.9, k * r * 0.4 + streamerWave * r * 3);
      ctx.closePath();
      ctx.fill();

      // Golden Ruby Flame Tip
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(
        -r * 2.2 - Math.abs(k) * r * 0.3,
        k * r * 0.7 + streamerWave * r * 5,
        3.2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  } else if (key === 'fast') {
    // Swift Bird: Sharp Forked Swallow Tail
    const tailGrad = ctx.createLinearGradient(-r * 0.6, 0, -r * 1.7, 0);
    tailGrad.addColorStop(0, config.tail);
    tailGrad.addColorStop(1, '#881337');
    ctx.fillStyle = tailGrad;
    ctx.beginPath();
    ctx.moveTo(-r * 0.6, -r * 0.1);
    ctx.lineTo(-r * 1.75, -r * 0.6);
    ctx.lineTo(-r * 1.25, 0);
    ctx.lineTo(-r * 1.75, r * 0.6);
    ctx.lineTo(-r * 0.6, r * 0.1);
    ctx.closePath();
    ctx.fill();
  } else if (key === 'small') {
    // Hummingbird: Sleek Iridescent Fan Tail
    const tailGrad = ctx.createLinearGradient(-r * 0.5, 0, -r * 1.3, 0);
    tailGrad.addColorStop(0, '#059669');
    tailGrad.addColorStop(1, '#047857');
    ctx.fillStyle = tailGrad;
    ctx.beginPath();
    ctx.moveTo(-r * 0.5, -r * 0.15);
    ctx.lineTo(-r * 1.3, -r * 0.4);
    ctx.lineTo(-r * 1.15, 0);
    ctx.lineTo(-r * 1.3, r * 0.4);
    ctx.lineTo(-r * 0.5, r * 0.15);
    ctx.closePath();
    ctx.fill();
  } else if (key === 'large') {
    // Heavy Falcon: Wide Barred Predator Tail Fan
    const tailGrad = ctx.createLinearGradient(-r * 0.6, 0, -r * 1.6, 0);
    tailGrad.addColorStop(0, config.tail);
    tailGrad.addColorStop(1, '#4c1d95');
    ctx.fillStyle = tailGrad;
    ctx.beginPath();
    ctx.moveTo(-r * 0.6, -r * 0.25);
    ctx.lineTo(-r * 1.6, -r * 0.65);
    ctx.lineTo(-r * 1.45, -r * 0.2);
    ctx.lineTo(-r * 1.55, 0);
    ctx.lineTo(-r * 1.45, r * 0.2);
    ctx.lineTo(-r * 1.6, r * 0.65);
    ctx.lineTo(-r * 0.6, r * 0.25);
    ctx.closePath();
    ctx.fill();
  } else {
    // Normal / Armored / Hazard / Skull Tail Feathers
    ctx.fillStyle = config.tail;
    ctx.beginPath();
    ctx.moveTo(-r * 0.6, -r * 0.15);
    ctx.lineTo(-r * 1.5, -r * 0.55);
    ctx.lineTo(-r * 1.25, 0);
    ctx.lineTo(-r * 1.55, r * 0.55);
    ctx.lineTo(-r * 0.6, r * 0.15);
    ctx.closePath();
    ctx.fill();

    // Tail Feather Spine / Quill Highlight
    ctx.strokeStyle = config.light;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-r * 0.6, 0);
    ctx.lineTo(-r * 1.25, 0);
    ctx.stroke();
  }
  ctx.restore();

  // 3. Bird Body Plumage
  const bodyGrad = ctx.createRadialGradient(-r * 0.1, -r * 0.2, r * 0.2, 0, 0, r * 1.1);
  bodyGrad.addColorStop(0, config.light);
  bodyGrad.addColorStop(0.55, config.color);
  bodyGrad.addColorStop(1, config.tail);
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.ellipse(0, 0, r, r * 0.7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Soft Layered Belly Feathers
  const bellyGrad = ctx.createLinearGradient(0, 0, r * 0.4, r * 0.65);
  bellyGrad.addColorStop(0, config.light);
  bellyGrad.addColorStop(1, 'rgba(255, 255, 255, 0.4)');
  ctx.fillStyle = bellyGrad;
  ctx.beginPath();
  ctx.ellipse(r * 0.12, r * 0.18, r * 0.68, r * 0.42, 0.25, 0, Math.PI * 2);
  ctx.fill();

  // Armored Bird Metal Plates & Rivets
  if (key === 'armored') {
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.fillStyle = 'rgba(51, 65, 85, 0.85)';
    // Chest plate
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 0.72, r * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Rivet Dots
    ctx.fillStyle = '#fde047';
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 3) {
      const rx = Math.cos(angle) * r * 0.58;
      const ry = Math.sin(angle) * r * 0.34;
      ctx.beginPath();
      ctx.arc(rx, ry, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 4. Articulated Feathered Wing with Layered Flight Feathers
  ctx.save();
  ctx.translate(-r * 0.12, 0);
  ctx.rotate(wingCycle * 0.45);

  // Under-wing shadow
  ctx.fillStyle = 'rgba(15, 23, 42, 0.25)';
  ctx.beginPath();
  ctx.ellipse(-r * 0.1, r * 0.1, r * 0.7, r * 0.32, -0.2, 0, Math.PI * 2);
  ctx.fill();

  // Primary Wing Surface
  const wingGrad = ctx.createLinearGradient(-r * 0.5, -r * 0.6, r * 0.5, r * 0.6);
  wingGrad.addColorStop(0, config.wing);
  wingGrad.addColorStop(0.6, config.color);
  wingGrad.addColorStop(1, config.tail);
  ctx.fillStyle = wingGrad;
  ctx.beginPath();
  ctx.ellipse(0, 0, r * 0.72, r * 0.36, -0.22, 0, Math.PI * 2);
  ctx.fill();

  // Scalloped Feather Rows (Covert & Primary Feathers)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.lineWidth = 1.2;
  for (let f = -2; f <= 2; f++) {
    ctx.beginPath();
    ctx.arc(f * (r * 0.16), r * 0.05, r * 0.18, 0, Math.PI * 0.9);
    ctx.stroke();
  }

  // Hazard Bird Warning Chevrons on Wing
  if (key === 'hazard_25') {
    ctx.fillStyle = '#171717';
    for (let c = -1; c <= 1; c++) {
      ctx.beginPath();
      ctx.moveTo(c * 9 - 4, -4);
      ctx.lineTo(c * 9 + 4, 0);
      ctx.lineTo(c * 9 - 4, 4);
      ctx.closePath();
      ctx.fill();
    }
  }
  ctx.restore();

  // 5. Crown / Crest Feathers
  ctx.save();
  if (key === 'rare') {
    // 3 Golden Phoenix Solar Crown Plumes
    const crestColors = ['#f59e0b', '#fbbf24', '#ef4444'];
    for (let c = 0; c < 3; c++) {
      const ca = -0.3 + c * 0.3;
      ctx.fillStyle = crestColors[c];
      ctx.beginPath();
      ctx.moveTo(r * 0.4, -r * 0.45);
      ctx.quadraticCurveTo(r * 0.3 + c * 4, -r * 0.95 - c * 4, r * 0.65 + c * 5, -r * 1.15 - c * 2);
      ctx.lineTo(r * 0.48, -r * 0.5);
      ctx.closePath();
      ctx.fill();

      // Crown Ruby Gem
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(r * 0.65 + c * 5, -r * 1.15 - c * 2, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (key === 'large') {
    // Heavy Falcon Raptor Crown
    ctx.fillStyle = '#581c87';
    ctx.beginPath();
    ctx.moveTo(r * 0.35, -r * 0.45);
    ctx.lineTo(r * 0.2, -r * 0.85);
    ctx.lineTo(r * 0.55, -r * 0.5);
    ctx.closePath();
    ctx.fill();
  } else if (key === 'fast') {
    // Swift Bird Sleek Head Tuft
    ctx.fillStyle = '#be123c';
    ctx.beginPath();
    ctx.moveTo(r * 0.38, -r * 0.45);
    ctx.lineTo(r * 0.15, -r * 0.75);
    ctx.lineTo(r * 0.5, -r * 0.48);
    ctx.closePath();
    ctx.fill();
  } else if (key === 'hazard_25') {
    // Spiky Hazard Crown
    ctx.fillStyle = '#171717';
    ctx.beginPath();
    ctx.moveTo(r * 0.35, -r * 0.45);
    ctx.lineTo(r * 0.4, -r * 0.85);
    ctx.lineTo(r * 0.55, -r * 0.5);
    ctx.closePath();
    ctx.fill();
  } else {
    // Delicate Head Tuft
    ctx.fillStyle = config.tail;
    ctx.beginPath();
    ctx.moveTo(r * 0.4, -r * 0.4);
    ctx.quadraticCurveTo(r * 0.25, -r * 0.7, r * 0.45, -r * 0.65);
    ctx.lineTo(r * 0.52, -r * 0.45);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // 6. Bird Head
  const headGrad = ctx.createRadialGradient(r * 0.52, -r * 0.35, 1, r * 0.52, -r * 0.35, r * 0.5);
  headGrad.addColorStop(0, config.light);
  headGrad.addColorStop(0.7, config.head);
  headGrad.addColorStop(1, config.tail);
  ctx.fillStyle = headGrad;
  ctx.beginPath();
  ctx.arc(r * 0.5, -r * 0.3, r * 0.48, 0, Math.PI * 2);
  ctx.fill();

  // 7. Expressive Species-Specific Eyes
  const eyeX = r * 0.68;
  const eyeY = -r * 0.42;
  const eyeR = r * 0.16;

  if (key === 'skull_50') {
    // Sinister Glowing Crimson Eye with Dark Aura
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(eyeX, eyeY, eyeR + 2, 0, Math.PI * 2);
    ctx.fill();

    const evilEye = ctx.createRadialGradient(eyeX, eyeY, 1, eyeX, eyeY, eyeR);
    evilEye.addColorStop(0, '#fecdd3');
    evilEye.addColorStop(0.4, '#ef4444');
    evilEye.addColorStop(1, '#881337');
    ctx.fillStyle = evilEye;
    ctx.beginPath();
    ctx.arc(eyeX, eyeY, eyeR, 0, Math.PI * 2);
    ctx.fill();

    // Slit pupil
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.ellipse(eyeX, eyeY, eyeR * 0.25, eyeR * 0.85, 0.2, 0, Math.PI * 2);
    ctx.fill();
  } else if (key === 'large') {
    // Fierce Falcon Amber Raptor Eye
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(eyeX, eyeY, eyeR + 1.5, 0, Math.PI * 2);
    ctx.fill();

    const falconEye = ctx.createRadialGradient(eyeX, eyeY, 1, eyeX, eyeY, eyeR);
    falconEye.addColorStop(0, '#fef08a');
    falconEye.addColorStop(0.6, '#f59e0b');
    falconEye.addColorStop(1, '#b45309');
    ctx.fillStyle = falconEye;
    ctx.beginPath();
    ctx.arc(eyeX, eyeY, eyeR, 0, Math.PI * 2);
    ctx.fill();

    // Pupil & Brow
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(eyeX + 1, eyeY, eyeR * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(eyeX + 2, eyeY - 2, 1.4, 0, Math.PI * 2);
    ctx.fill();

    // Fierce Brow Ridge
    ctx.strokeStyle = '#4c1d95';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(eyeX - eyeR * 1.3, eyeY - eyeR * 1.1);
    ctx.lineTo(eyeX + eyeR * 1.3, eyeY - eyeR * 0.3);
    ctx.stroke();
  } else if (key === 'rare') {
    // Golden Phoenix Sun Eye
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(eyeX, eyeY, eyeR + 1, 0, Math.PI * 2);
    ctx.fill();

    const phxEye = ctx.createRadialGradient(eyeX, eyeY, 1, eyeX, eyeY, eyeR);
    phxEye.addColorStop(0, '#ffffff');
    phxEye.addColorStop(0.5, '#38bdf8');
    phxEye.addColorStop(1, '#0284c7');
    ctx.fillStyle = phxEye;
    ctx.beginPath();
    ctx.arc(eyeX, eyeY, eyeR, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(eyeX + 1, eyeY, eyeR * 0.45, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(eyeX + 2, eyeY - 2, 1.5, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Normal / Cute Big Glossy Eye with Double Catchlights
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(eyeX, eyeY, eyeR + 1, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(eyeX + 0.5, eyeY, eyeR * 0.75, 0, Math.PI * 2);
    ctx.fill();

    // Double Specular Catchlights (Anime Sparkle)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(eyeX + 1.8, eyeY - 2, eyeR * 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(eyeX - 1.2, eyeY + 1.5, eyeR * 0.18, 0, Math.PI * 2);
    ctx.fill();
  }

  // 8. Species-Specific Beaks
  if (key === 'small') {
    // Hummingbird: Long Needle Nectar Beak
    const beakGrad = ctx.createLinearGradient(r * 0.85, 0, r * 1.9, 0);
    beakGrad.addColorStop(0, '#1f2937');
    beakGrad.addColorStop(1, '#fbbf24');
    ctx.fillStyle = beakGrad;
    ctx.beginPath();
    ctx.moveTo(r * 0.85, -r * 0.3);
    ctx.lineTo(r * 1.95, -r * 0.18);
    ctx.lineTo(r * 0.85, -r * 0.12);
    ctx.closePath();
    ctx.fill();
  } else if (key === 'large') {
    // Heavy Falcon: Curved Raptor Beak
    const beakGrad = ctx.createLinearGradient(r * 0.85, -r * 0.3, r * 1.5, 0);
    beakGrad.addColorStop(0, '#f97316');
    beakGrad.addColorStop(0.7, '#fbbf24');
    beakGrad.addColorStop(1, '#111827');
    ctx.fillStyle = beakGrad;
    ctx.beginPath();
    ctx.moveTo(r * 0.85, -r * 0.4);
    ctx.quadraticCurveTo(r * 1.45, -r * 0.35, r * 1.55, r * 0.15);
    ctx.lineTo(r * 1.3, -r * 0.05);
    ctx.lineTo(r * 0.85, -r * 0.05);
    ctx.closePath();
    ctx.fill();
  } else {
    // Standard Crisp Golden Beak
    const beakGrad = ctx.createLinearGradient(r * 0.85, 0, r * 1.45, 0);
    beakGrad.addColorStop(0, '#fbbf24');
    beakGrad.addColorStop(1, config.beak);
    ctx.fillStyle = beakGrad;
    ctx.beginPath();
    ctx.moveTo(r * 0.85, -r * 0.32);
    ctx.lineTo(r * 1.45, -r * 0.15);
    ctx.lineTo(r * 0.85, 0.05);
    ctx.closePath();
    ctx.fill();

    // Beak centerline
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(r * 0.85, -r * 0.15);
    ctx.lineTo(r * 1.45, -r * 0.15);
    ctx.stroke();
  }

  // 9. Rosy Cheek Blush for friendly birds
  if (key === 'normal' || key === 'small' || key === 'fast') {
    ctx.fillStyle = 'rgba(244, 63, 94, 0.45)';
    ctx.beginPath();
    ctx.ellipse(r * 0.5, -r * 0.15, r * 0.14, r * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}
