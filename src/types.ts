export type WeatherType = 'clear' | 'rain' | 'snow' | 'drizzle';

export type PowerUpType = 'slow_mo' | 'multi_shot' | 'shield';

export interface PowerUpEntity {
  id: string;
  type: PowerUpType;
  x: number;
  y: number;
  vy: number;
  radius: number;
  life: number;
  maxLife: number;
  bobPhase: number;
  collected: boolean;
}

export interface ActivePowerUp {
  type: PowerUpType;
  duration: number;
  maxDuration: number;
}

export interface MatchPerformanceStats {
  score: number;
  bestScore: number;
  birdsHunted: number;
  lifetimeBirdsHunted: number;
  headshots: number;
  lifetimeHeadshots: number;
  birdsSaved: number;
  lifetimeBirdsSaved: number;
  avgReactionTimeMs: number;
  shotsFired: number;
  shotsHit: number;
  accuracy: number;
  highestCombo: number;
  ufoKills: number;
  powerUpsCollected: number;
  gameMode: 'SOLO' | 'MULTIPLAYER';
  winnerName?: string | null;
  rivalName?: string;
  rivalScore?: number;
}

export interface LifetimeStats {
  lifetimeHeadshots: number;
  lifetimeBirdsSaved: number;
  lifetimeBirdsHunted: number;
  totalGamesPlayed: number;
  bestAccuracy: number;
  fastestReactionMs: number;
}
