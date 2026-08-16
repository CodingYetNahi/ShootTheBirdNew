import React from 'react';
import {
  Play,
  Trophy,
  HelpCircle,
  Settings as SettingsIcon,
  Music,
  Volume2,
  Sparkles
} from 'lucide-react';
import { BirdMascot } from '../App';

export interface GameSettings {
  sound: boolean;
  music: boolean;
  musicVolume: number;
  soundVolume: number;
  vibration: boolean;
  fps: boolean;
}

export function MainMenuModal({
  playerName,
  onRequestStart,
  onOpenRanks,
  onOpenHow,
  onOpenSettings,
  onOpenMultiplayer,
  dailyChallenge,
}: {
  playerName: string;
  onRequestStart: () => void;
  onOpenRanks: () => void;
  onOpenHow: () => void;
  onOpenSettings: () => void;
  onOpenMultiplayer: () => void;
  dailyChallenge: {
    date: string;
    timeLimit: number;
    reward: number;
    claimed: boolean;
    targets: { label: string; progress: number; target: number }[];
  };
}) {
  return (
    <div className="absolute inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-[460px] max-h-[94vh] overflow-y-auto bg-white/95 rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/60">
        <div className="text-center mb-5">
          <div className="flex justify-center items-center gap-3 mb-2 animate-bounce">
            <BirdMascot size={64} />
            
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f283d] tracking-tight">
            Shoot The Bird
          </h2>
          <p className="text-xs text-[#475569] mt-1 font-medium">
            Dynamic weather, power-up capsules, and UFO precision encounters!
          </p>
          {playerName && (
            <div className="mt-2 text-xs font-bold text-emerald-600 bg-emerald-50 py-1 px-3 rounded-full inline-block">
              Welcome back, {playerName} 👋
            </div>
          )}
        </div>

        <section className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-3" aria-label="Today's Daily Challenge">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div>
              <h3 className="text-xs font-black text-amber-950">🏆 DAILY CHALLENGE</h3>
              <p className="text-[9px] font-bold text-amber-700">{dailyChallenge.date} · {dailyChallenge.timeLimit}s limit</p>
            </div>
            <span className={`rounded-full px-2 py-1 text-[9px] font-black ${dailyChallenge.claimed ? 'bg-emerald-600 text-white' : 'bg-amber-200 text-amber-950'}`}>
              {dailyChallenge.claimed ? 'COMPLETED' : `+${dailyChallenge.reward} PTS`}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {dailyChallenge.targets.map(target => (
              <div key={target.label} className="rounded-lg bg-white px-2 py-1.5 text-center border border-amber-100">
                <div className="text-[9px] font-bold text-slate-600">{target.label}</div>
                <div className={`text-xs font-black ${target.progress >= target.target ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {target.progress}/{target.target}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-1.5 text-[9px] text-amber-800">Progress is saved automatically and continues across games.</p>
        </section>

        <div className="grid grid-cols-1 gap-2.5">
          <button
            onClick={onRequestStart}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-[#f97316] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white font-black rounded-2xl shadow-lg flex items-center justify-center gap-2 text-base active:scale-98 transition-transform"
          >
            <Play className="w-5 h-5 fill-current" /> PLAY NOW (SOLO)
          </button>

          <button
            onClick={onOpenMultiplayer}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black rounded-2xl shadow-md flex items-center justify-center gap-2 text-sm active:scale-98 transition-transform"
          >
            ⚔️ MULTIPLAYER 1V1 DUELS
          </button>

          <button
            onClick={onOpenRanks}
            className="w-full py-2.5 px-4 bg-white hover:bg-gray-50 text-[#0f172a] font-bold rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center gap-2 text-xs active:scale-98 transition-transform"
          >
            <Trophy className="w-4 h-4 text-amber-500" /> LEADERBOARD & RANKS
          </button>

          <button
            onClick={onOpenHow}
            className="w-full py-2.5 px-4 bg-white hover:bg-gray-50 text-[#0f172a] font-bold rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center gap-2 text-xs active:scale-98 transition-transform"
          >
            <HelpCircle className="w-4 h-4 text-sky-600" /> HOW TO PLAY & POWER-UPS
          </button>

          <button
            onClick={onOpenSettings}
            className="w-full py-2.5 px-4 bg-white hover:bg-gray-50 text-[#0f172a] font-bold rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center gap-2 text-xs active:scale-98 transition-transform"
          >
            <SettingsIcon className="w-4 h-4 text-slate-600" /> SETTINGS & AUDIO
          </button>
        </div>
      </div>
    </div>
  );
}

export function HowToPlayModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-[540px] max-h-[88vh] overflow-y-auto bg-white/95 rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/60">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg sm:text-xl font-black text-[#0f283d] flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-sky-600" /> Targets, Scoring & Power-Ups
          </h2>
          <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
            Guide
          </span>
        </div>

        {/* Target Species Gallery */}
        <div className="mb-4">
          <div className="text-xs font-black text-slate-800 mb-2 flex items-center gap-1.5">
            <span>🎯 Target Species & Score Values (5:1 Scaled)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2 bg-sky-50 rounded-xl border border-sky-200 flex flex-col items-center text-center">
              <span className="text-lg">🐦</span>
              <span className="font-bold text-sky-950 text-[11px]">Sky Bluebird</span>
              <span className="text-[10px] font-black text-sky-600">+10 PTS</span>
            </div>
            <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col items-center text-center">
              <span className="text-lg">🦜</span>
              <span className="font-bold text-emerald-950 text-[11px]">Forest Swift</span>
              <span className="text-[10px] font-black text-emerald-600">+20 PTS</span>
            </div>
            <div className="p-2 bg-purple-50 rounded-xl border border-purple-200 flex flex-col items-center text-center">
              <span className="text-lg">🪶</span>
              <span className="font-bold text-purple-950 text-[11px]">Hummingbird</span>
              <span className="text-[10px] font-black text-purple-600">+35 PTS</span>
            </div>
            <div className="p-2 bg-amber-50 rounded-xl border border-amber-200 flex flex-col items-center text-center">
              <span className="text-lg">🦅</span>
              <span className="font-bold text-amber-950 text-[11px]">Armored Falcon</span>
              <span className="text-[10px] font-black text-amber-600">+25 PTS (2 Hits)</span>
            </div>
            <div className="p-2 bg-yellow-50 rounded-xl border border-yellow-300 flex flex-col items-center text-center">
              <span className="text-lg">✨</span>
              <span className="font-bold text-yellow-950 text-[11px]">Golden Phoenix</span>
              <span className="text-[10px] font-black text-yellow-600">+60 PTS (Capsule)</span>
            </div>
            <div className="p-2 bg-pink-50 rounded-xl border border-pink-200 flex flex-col items-center text-center">
              <span className="text-lg">💎</span>
              <span className="font-bold text-pink-950 text-[11px]">Prism Kingfisher</span>
              <span className="text-[10px] font-black text-pink-600">+120 PTS (Capsule)</span>
            </div>
            <div className="p-2 bg-slate-100 rounded-xl border border-slate-300 flex flex-col items-center text-center">
              <span className="text-lg">✈️</span>
              <span className="font-bold text-slate-900 text-[11px]">Supersonic Jet</span>
              <span className="text-[10px] font-black text-blue-600">+100 PTS</span>
            </div>
            <div className="p-2 bg-cyan-50 rounded-xl border border-cyan-300 flex flex-col items-center text-center">
              <span className="text-lg">🛸</span>
              <span className="font-bold text-cyan-950 text-[11px]">Alien Saucer</span>
              <span className="text-[10px] font-black text-cyan-700">+200 PTS & EMP</span>
            </div>
          </div>
        </div>

        {/* Temporary Power-Ups Section */}
        <div className="p-3.5 bg-gradient-to-r from-sky-50 via-indigo-50 to-emerald-50 rounded-2xl border border-indigo-200 mb-4">
          <div className="text-xs font-black text-indigo-900 flex items-center gap-1.5 mb-2">
            <span>⚡ Temporary Power-Up Drops (from Rare Birds)</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-white/80 rounded-xl border border-sky-200">
              <div className="text-lg mb-0.5">⏱️</div>
              <div className="font-black text-sky-900 text-[11px]">Chrono Slow-Mo</div>
              <div className="text-[9px] text-gray-500 mt-0.5">Slows birds by 55% for 6s</div>
            </div>
            <div className="p-2 bg-white/80 rounded-xl border border-orange-200">
              <div className="text-lg mb-0.5">🎯</div>
              <div className="font-black text-orange-900 text-[11px]">Triple Shot</div>
              <div className="text-[9px] text-gray-500 mt-0.5">Fires 3 spread blasts for 8s</div>
            </div>
            <div className="p-2 bg-white/80 rounded-xl border border-emerald-200">
              <div className="text-lg mb-0.5">🛡️</div>
              <div className="font-black text-emerald-900 text-[11px]">Guardian Shield</div>
              <div className="text-[9px] text-gray-500 mt-0.5">Blocks 1 hazard hit for 10s</div>
            </div>
          </div>
        </div>

        {/* UFO Mechanics */}
        <div className="p-3 bg-cyan-50 rounded-2xl border border-cyan-300 flex items-start gap-2.5 mb-3 text-xs">
          <span className="text-2xl">🛸</span>
          <div>
            <strong className="text-cyan-950 font-black">Alien UFO Saucer (20% Smaller Target)</strong>:
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-cyan-900 text-[11px]">
              <li><strong>Hit UFO</strong>: Awards a +200 point bonus with no life or local EMP penalty.</li>
              <li><strong>Miss UFO (Escapes)</strong>: Deducts <strong>-5% score penalty</strong>!</li>
            </ul>
          </div>
        </div>

        {/* Dangerous Birds & Predators */}
        <div className="space-y-2 text-xs text-[#334155] mb-4">
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 flex items-start gap-2.5">
            <span className="text-xl">⚠️</span>
            <div>
              <strong className="text-amber-900 font-black">Hazard Bird (-1 ❤️)</strong>: Spiky yellow hazard bird. Shooting it takes <strong>1 Heart</strong>, but never reduces score. Let it pass safely.
            </div>
          </div>

          <div className="p-3 bg-red-50 rounded-2xl border border-red-300 flex items-start gap-2.5">
            <span className="text-xl">☠️</span>
            <div>
              <strong className="text-red-900 font-black">Cursed Raven (-1 ❤️)</strong>: Devours innocent scoring birds in mid-air. Shooting it takes <strong>1 Heart</strong>, but never reduces score!
            </div>
          </div>
        </div>

        {/* Extra Life Milestone */}
        <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-950 mb-4 flex items-center gap-2.5">
          <span className="text-xl">💖</span>
          <div>
            <strong>Extra Lives</strong>: Earn +1 Extra Life for every <strong>40,000 Points</strong> milestone (40k, 80k, 120k...)!
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#f97316] hover:bg-[#ea580c] text-white font-black rounded-2xl shadow-md active:scale-98 transition-transform"
        >
          GOT IT, LET'S PLAY!
        </button>
      </div>
    </div>
  );
}

export function SettingsModal({
  settings,
  playerName,
  onSaveSettings,
  onMusicVolChange,
  onSoundVolChange,
  onChangeName,
  onClose,
}: {
  settings: GameSettings;
  playerName: string;
  onSaveSettings: (s: Partial<GameSettings>) => void;
  onMusicVolChange: (v: number) => void;
  onSoundVolChange: (v: number) => void;
  onChangeName: () => void;
  onClose: () => void;
}) {
  return (
    <div className="absolute inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-[440px] bg-white/95 rounded-3xl p-6 shadow-2xl border border-white/60">
        <h2 className="text-xl font-black text-[#0f283d] mb-3 flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-slate-700" /> Settings & Audio
        </h2>

        <div className="space-y-3.5 text-xs text-gray-700">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold flex items-center gap-2">
                <Music className="w-4 h-4 text-indigo-600" /> Reliever Background Music
              </span>
              <input
                type="checkbox"
                checked={settings.music}
                onChange={(e) => onSaveSettings({ music: e.target.checked })}
                className="w-4 h-4 text-[#f97316] rounded"
              />
            </div>
            {settings.music && (
              <div className="pl-6">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={settings.musicVolume}
                  onChange={(e) => onMusicVolChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <span className="text-[10px] text-gray-500">Volume: {Math.round(settings.musicVolume * 100)}%</span>
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-600" /> Sound Effects
              </span>
              <input
                type="checkbox"
                checked={settings.sound}
                onChange={(e) => onSaveSettings({ sound: e.target.checked })}
                className="w-4 h-4 text-[#f97316] rounded"
              />
            </div>
            {settings.sound && (
              <div className="pl-6">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={settings.soundVolume}
                  onChange={(e) => onSoundVolChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <span className="text-[10px] text-gray-500">Volume: {Math.round(settings.soundVolume * 100)}%</span>
              </div>
            )}
          </div>

          <label className="flex justify-between items-center cursor-pointer pt-1">
            <span className="font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> FPS Counter
            </span>
            <input
              type="checkbox"
              checked={settings.fps}
              onChange={(e) => onSaveSettings({ fps: e.target.checked })}
              className="w-4 h-4 text-[#f97316] rounded"
            />
          </label>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <button
            onClick={onChangeName}
            className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs"
          >
            👤 Change Player Name ({playerName || 'None'})
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#f97316] hover:bg-[#ea580c] text-white font-black rounded-xl shadow-md text-sm active:scale-98"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

export function LeaderboardModal({
  globalRanks,
  localScores,
  playerName,
  onClose,
}: {
  globalRanks: { name: string; score: number }[];
  localScores: { name: string; score: number }[];
  playerName: string;
  onClose: () => void;
}) {
  return (
    <div className="absolute inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-[480px] bg-white/95 rounded-3xl p-6 shadow-2xl border border-white/60">
        <h2 className="text-xl font-black text-[#0f283d] mb-1 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" /> Global Leaderboard
        </h2>
        <p className="text-xs text-gray-500 mb-3">Live top high scores across all marksmen</p>

        <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-2xl divide-y divide-gray-100 bg-white">
          {globalRanks.length > 0 ? (
            globalRanks.map((r, i) => (
              <div
                key={i}
                className={`flex justify-between items-center px-4 py-2.5 text-xs font-semibold ${
                  r.name === playerName ? 'bg-amber-50 text-amber-900 font-bold' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 text-center font-bold text-gray-500">
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                  </span>
                  <span className="text-gray-800">{r.name}</span>
                </div>
                <span className="font-mono font-black text-[#f97316]">{Number(r.score).toLocaleString()} pts</span>
              </div>
            ))
          ) : localScores.length > 0 ? (
            localScores.map((r, i) => (
              <div key={i} className="flex justify-between items-center px-4 py-2.5 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-6 text-center font-bold text-gray-500">#{i + 1}</span>
                  <span className="text-gray-800">{r.name}</span>
                </div>
                <span className="font-mono font-black text-[#f97316]">{Number(r.score).toLocaleString()} pts</span>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-xs text-gray-400">No scores recorded yet. Play a game!</div>
          )}
        </div>

        <div className="mt-4">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#f97316] hover:bg-[#ea580c] text-white font-black rounded-2xl shadow-md text-sm active:scale-98"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
