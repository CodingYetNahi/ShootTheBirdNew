import normalBird from '../assets/game/bird-normal.webp';
import fastBird from '../assets/game/bird-fast.webp';
import smallBird from '../assets/game/bird-small.webp';
import largeBird from '../assets/game/bird-large.webp';
import rareBird from '../assets/game/bird-rare.webp';
import armoredBird from '../assets/game/bird-armored.webp';
import dangerBird from '../assets/game/bird-danger.webp';
import aeroplane from '../assets/game/aeroplane.webp';

const imageCache: Record<string, HTMLImageElement> = {};

function getImage(src: string) {
  if (!imageCache[src]) {
    const img = new Image();
    img.src = src;
    imageCache[src] = img;
  }

  return imageCache[src];
}

const birdSprites: Record<string, string> = {
  normal: normalBird,
  fast: fastBird,
  small: smallBird,
  large: largeBird,
  rare: rareBird,
  armored: armoredBird,
  hazard_25: dangerBird,
  skull_50: dangerBird,
};

export function drawDetailedAeroplane(
  ctx: CanvasRenderingContext2D,
  entity: any,
  _elapsed: number
) {
  const img = getImage(aeroplane);

  if (!img.complete) return;

  const r = entity.radius;

  ctx.save();

 if (entity.vx < 0) {
  ctx.scale(-1, 1);
}

  ctx.drawImage(
    img,
    -r * 1.6,
    -r * 0.8,
    r * 3.2,
    r * 1.6
  );

  ctx.restore();
}
export function drawDetailedBird(
  ctx: CanvasRenderingContext2D,
  entity: any,
  elapsed: number
) {
  const sprite =
    entity.isDangerous
      ? dangerBird
      : birdSprites[entity.key] || normalBird;

  const img = getImage(sprite);

  if (!img.complete) return;

  const r = entity.radius;

  // Wing beat animation
  const flap = Math.sin(
    elapsed * 12 + (entity.wingPhase || 0)
  );

  // Slight up/down flight movement
  const bob = flap * r * 0.10;

  // Compress/stretch vertically to simulate flapping wings
  const flapScaleY = 0.92 + Math.abs(flap) * 0.32;

  // Tiny body tilt makes flight feel less static
  const tilt = flap * 0.04;

  ctx.save();

  ctx.translate(0, bob);

// Sprites naturally face right.
// Flip them when travelling left.
  if (entity.vx > 0) {
  ctx.scale(-1, 1);
}

  ctx.rotate(tilt);

  ctx.scale(1, flapScaleY);

  ctx.drawImage(
    img,
    -r * 1.25,
    -r,
    r * 2.5,
    r * 2
  );

  ctx.restore();
}
