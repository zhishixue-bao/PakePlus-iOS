/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Lock, FileDown, ShieldAlert, Clock, ArrowRight, History, Landmark } from 'lucide-react';

interface SealedViewProps {
  onNavigateScreen: (screen: 'export' | 'logs' | 'permissions') => void;
}

export default function SealedView({ onNavigateScreen }: SealedViewProps) {
  return (
    <div className="relative font-sans text-on-background animate-in zoom-in-95 duration-500 max-w-md mx-auto pt-8 pb-16">
      <div className="ambient-glow" style={{ transform: 'translate(-50%, -48%)' }}></div>

      {/* Sealed Padlock Animation Circle */}
      <div className="flex flex-col items-center text-center space-y-6 mb-12">
        <div className="relative w-28 h-28 rounded-full bg-primary/5 flex items-center justify-center border border-outline-variant/30 text-[#162839]">
          {/* Animated pulsing ripple elements */}
          <div className="absolute inset-0 border border-primary rounded-full animate-ping opacity-15"></div>
          <div className="absolute -inset-4 border border-primary rounded-full animate-pulse opacity-10"></div>
          
          <Lock size={38} className="text-primary active:scale-95 duration-500" />
        </div>

        <div className="space-y-2 px-4">
          <h2 className="font-serif text-2xl lg:text-3xl text-primary font-bold tracking-tight">封存仪式已完成</h2>
          <p className="text-xs text-secondary leading-relaxed max-w-sm">
            您的生命底稿、私密照片底片与数字遗嘱已落锁加密。神龛正式转换为【静默守候状态】。
          </p>
        </div>
      </div>

      {/* Grid Status Details */}
      <section className="space-y-4 mb-10">
        <h3 className="text-xs font-semibold text-secondary uppercase tracking-widest px-1">
          当前守护状态明细
        </h3>

        <div className="space-y-3">
          {/* Status Row 1 */}
          <div className="p-4 bg-white/45 glass-card rounded-xl border border-outline-variant/15 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
              <ShieldAlert size={14} />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary">AI 代理人格：冷启等待中</p>
              <p className="text-[11px] text-secondary leading-normal mt-0.5">
                外部对话通道完全静默。仅在心跳中断触发多签授权签署后启动。
              </p>
            </div>
          </div>

          {/* Status Row 2 */}
          <div className="p-4 bg-white/45 glass-card rounded-xl border border-outline-variant/15 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
              <Lock size={14} />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary">记忆库档案：多锁密码封底</p>
              <p className="text-[11px] text-secondary leading-normal mt-0.5">
                存储库使用3层多签钥对隔离托管。任何未带身份秘钥的查询都将被安全剥离。
              </p>
            </div>
          </div>

          {/* Status Row 3 */}
          <div className="p-4 bg-white/45 glass-card rounded-xl border border-outline-variant/15 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
              <Clock size={14} />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary">心跳校验：周期签到模式</p>
              <p className="text-[11px] text-secondary leading-normal mt-0.5">
                当前活跃，离检测时限 90 天剩余 90 天。欢迎按期签到以维持锁屏。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Actions buttons */}
      <div className="space-y-3.5 px-1">
        <button 
          onClick={() => onNavigateScreen('export')}
          className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-sm tracking-widest shadow-lg shadow-primary/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <FileDown size={16} />
          导出终极留念备份包
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button 
            type="button"
            onClick={() => onNavigateScreen('logs')}
            className="py-3.5 border border-outline-variant rounded-xl text-xs font-semibold hover:bg-surface-container-low transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-secondary"
          >
            <History size={14} />
            查看封存记录
          </button>
          
          <button 
            type="button"
            onClick={() => onNavigateScreen('permissions')}
            className="py-3.5 border border-outline-variant rounded-xl text-xs font-semibold hover:bg-surface-container-low transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-secondary"
          >
            <Landmark size={14} />
            返回控制面板
          </button>
        </div>
      </div>
    </div>
  );
}
