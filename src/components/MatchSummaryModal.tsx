import React from 'react';
import {
  RotateCcw,
  Trophy,
  Share2,
  Zap,
  Target,
  Shield,
  Clock,
  Sparkles,
  Flame,
  Award,
  Crown,
  Heart
} from 'lucide-react';
import { MatchPerformanceStats } from '../types';
import { BirdMascot } from '../App';

interface MatchSummaryModalProps {
  stats: MatchPerformanceStats;
  playerName: string;
  onPlayAgain: () => void;
  onOpenLeaderboard: () => void;
  onShare: () => void;
  onMainMenu: () => void;
}

export function MatchSummaryModal({
  stats,
  playerName,
  onPlayAgain,
  onOpenLeaderboard,
  onShare,
  onMainMenu,
}: MatchSummaryModalProps) {
  // Compute performance grade
  const getGrade = () => {
    if (stats.accuracy >= 92 && stats.avgReactionTimeMs <= 550) return { grade: 'S+', color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/30', desc: 'Sharpshooter Elite' };
    if (stats.accuracy >= 80 && stats.avgReactionTimeMs <= 700) return { grade: 'S', color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/30', desc: 'Master Marksman' };
    if (stats.accuracy >= 65) return { grade: 'A', color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/30', desc: 'Aviation Ace' };
    if (stats.accuracy >= 45) return { grade: 'B', color: 'text-purple-500', bg: 'bg-purple-500/10 border-purple-500/30', desc: 'Sky Hunter' };
    return { grade: 'C', color: 'text-slate-500', bg: 'bg-slate-500/10 border-slate-500/30', desc: 'Apprentice' };
  };

  const gradeInfo = getGrade();
  const isNewBest = stats.score >= stats.bestScore && stats.score > 0;

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-[480px] my-auto bg-white/95 rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/60 animate-in fade-in zoom-in-95">
        {/* Header with Mascot & Winner / Game Over Banner */}
        <div className="text-center mb-4">
          <div className="flex justify-center mb-1">
            <BirdMascot size={52} />
          </div>

          {stats.gameMode === 'MULTIPLAYER' && stats.winnerName ? (
            <div className="mb-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs">
                <Crown className="w-4 h-4 text-amber-600" />
                {stats.winnerName === playerName ? '🏆 DUEL VICTORY!' : '🥈 DUEL FINISHED'}
              </span>
              <h2 className="text-2xl font-black text-[#0f283d] mt-1">
                {stats.winnerName === playerName ? 'You Defeated Rival!' : `${stats.winnerName} Won`}
              </h2>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-black text-[#0f283d] tracking-tight">MATCH SUMMARY</h2>
              <p className="text-xs text-gray-500 font-semibold">Performance & Precision Analysis</p>
            </div>
          )}

          {/* Primary Score & Best */}
          <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 shadow-sm flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wider block">FINAL SCORE</span>
              <span className="text-2xl sm:text-3xl font-black text-[#0f283d] leading-none">
                {stats.score.toLocaleString()}
              </span>
              {isNewBest && (
                <span className="inline-block mt-1 text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  ✨ NEW PERSONAL BEST!
                </span>
              )}
            </div>

            <div className={`px-3 py-2 rounded-xl border flex flex-col items-center justify-center ${gradeInfo.bg}`}>
              <span className={`text-2xl font-black leading-none ${gradeInfo.color}`}>{gradeInfo.grade}</span>
              <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wider mt-0.5">{gradeInfo.desc}</span>
            </div>
          </div>
        </div>

        {/* Detailed Performance Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-4">
          {/* Lifetime Headshots / Bullseyes */}
          <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Bullseye Hits</div>
              <div className="text-sm sm:text-base font-black text-slate-800 leading-tight">
                {stats.headshots} <span className="text-[10px] text-gray-400 font-semibold">({stats.lifetimeHeadshots} lifetime)</span>
              </div>
            </div>
          </div>

          {/* Birds Saved from Predators */}
          <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Birds Saved</div>
              <div className="text-sm sm:text-base font-black text-slate-800 leading-tight">
                {stats.birdsSaved} <span className="text-[10px] text-gray-400 font-semibold">({stats.lifetimeBirdsSaved} lifetime)</span>
              </div>
            </div>
          </div>

          {/* Average Reaction Time */}
          <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Avg Reaction</div>
              <div className="text-sm sm:text-base font-black text-slate-800 leading-tight">
                {stats.avgReactionTimeMs > 0 ? `${Math.round(stats.avgReactionTimeMs)} ms` : '--'}
              </div>
            </div>
          </div>

          {/* Birds Hunted */}
          <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 flex-shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Birds Hunted</div>
              <div className="text-sm sm:text-base font-black text-slate-800 leading-tight">
                {stats.birdsHunted} <span className="text-[10px] text-gray-400 font-semibold">({stats.lifetimeBirdsHunted} total)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Stats Row: Accuracy, Highest Combo, UFOs */}
        <div className="p-2.5 rounded-2xl bg-gray-50 border border-gray-200/80 grid grid-cols-3 text-center mb-4 text-xs divide-x divide-gray-200">
          <div>
            <div className="text-[9px] font-bold text-gray-400 uppercase">Accuracy</div>
            <div className="font-black text-slate-800 mt-0.5">{stats.accuracy}%</div>
          </div>
          <div>
            <div className="text-[9px] font-bold text-gray-400 uppercase">Max Combo</div>
            <div className="font-black text-indigo-600 mt-0.5">x{stats.highestCombo}</div>
          </div>
          <div>
            <div className="text-[9px] font-bold text-gray-400 uppercase">UFOs Hit</div>
            <div className="font-black text-emerald-600 mt-0.5">{stats.ufoKills} 🛸</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={onPlayAgain}
            className="w-full py-3 bg-[#f97316] hover:bg-[#ea580c] text-white font-black rounded-2xl shadow-md flex items-center justify-center gap-2 text-sm active:scale-98 transition-transform"
          >
            <RotateCcw className="w-4 h-4" /> PLAY AGAIN
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onShare}
              className="py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 border border-sky-200"
            >
              <Share2 className="w-4 h-4" /> SHARE STATS
            </button>

            <button
              onClick={onOpenLeaderboard}
              className="py-2.5 bg-white hover:bg-gray-50 text-[#0f172a] font-bold rounded-2xl border border-gray-200 text-xs flex items-center justify-center gap-1.5"
            >
              <Trophy className="w-4 h-4 text-amber-500" /> LEADERBOARD
            </button>
          </div>

          <button
            onClick={onMainMenu}
            className="w-full py-2 text-gray-500 hover:text-gray-800 font-bold text-xs"
          >
            Back to Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}
