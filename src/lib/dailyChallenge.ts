export type ChallengeBird = 'normal' | 'fast' | 'small';

export interface DailyChallenge {
  date: string;
  timeLimit: number;
  reward: number;
  targets: Record<ChallengeBird, number>;
}

export const challengeLabels: Record<ChallengeBird, string> = {
  normal: 'Normal',
  fast: 'Swift',
  small: 'Humming',
};

// UTC makes the date boundary identical for every player worldwide.
export function getChallengeDate(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

function dateSeed(date: string) {
  let seed = 2166136261;
  for (const char of date) seed = Math.imul(seed ^ char.charCodeAt(0), 16777619);
  return seed >>> 0;
}

export function getDailyChallenge(date = getChallengeDate()): DailyChallenge {
  let seed = dateSeed(date);
  const next = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  return {
    date,
    timeLimit: 70 + Math.floor(next() * 3) * 5,
    reward: 1200 + Math.floor(next() * 5) * 100,
    targets: {
      normal: 4 + Math.floor(next() * 4),
      fast: 3 + Math.floor(next() * 3),
      small: 1 + Math.floor(next() * 3),
    },
  };
}

export function safePlayerId(playerName: string) {
  const storageKey = 'birdShooter_playerId_v1';
  try {
    let id = localStorage.getItem(storageKey);
    if (!id) {
      id = crypto.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(storageKey, id);
    }
    return id.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 80);
  } catch {
    // Stable fallback for restricted storage contexts; never place the raw name in a path.
    return `local-${dateSeed(playerName.trim().toLowerCase() || 'player').toString(36)}`;
  }
}
