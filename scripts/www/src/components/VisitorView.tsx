/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, FileText, Lock, ArrowRight, Shield, Info, X, Zap } from 'lucide-react';

interface VisitorViewProps {
  onNavigateLogin: (mode: 'login' | 'register') => void;
  onNavigateMemorial: () => void;
}

export default function VisitorView({ onNavigateLogin, onNavigateMemorial }: VisitorViewProps) {
  const [showExplanation, setShowExplanation] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleTabClick = (tabName: string) => {
    if (tabName === '纪念馆') {
      onNavigateMemorial();
    } else {
      triggerToast(`当前处于【访客模式】，不可查看个人私密【${tabName}】。请立即“创建档案”解锁。`);
    }
  };

  return (
    <div className="relative min-h-[90vh] pb-32 flex flex-col items-center justify-center font-sans text-on-background bg-background overflow-hidden relative selection:bg-primary-fixed">
      {/* Ambient background blur */}
      <div className="ambient-glow" style={{ transform: 'translate(-50%, -50%)' }}></div>

      <main className="w-full max-w-md px-6 mx-auto z-10 flex flex-col items-center pt-8">
        {/* Top: Avatar */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center mb-6 subtle-shadow transition-transform hover:scale-105 duration-300">
            <User size={38} className="text-secondary/60" />
          </div>
          <h1 className="font-serif text-2xl text-primary font-medium tracking-tight">访客模式</h1>
          <p className="text-xs text-secondary mt-1">您正以未实名访客身份游览神龛</p>
        </div>

        {/* Center: Status Cards */}
        <div className="w-full space-y-4 mb-12">
          {/* Card 1 */}
          <div className="glass-card rounded-xl p-5 flex items-center gap-4 border border-outline-variant/20 hover:border-primary/20 transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-secondary shrink-0">
              <FileText size={18} />
            </div>
            <div>
              <p className="font-semibold text-[#181c1d] text-base leading-snug">尚未创建数字遗产档案</p>
              <p className="text-xs text-on-surface-variant font-medium mt-1">您的数字资产目前未受保护</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-card rounded-xl p-5 flex items-center gap-4 border border-outline-variant/20 hover:border-primary/20 transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-secondary shrink-0">
              <Lock size={18} />
            </div>
            <div>
              <p className="font-semibold text-[#181c1d] text-base leading-snug">尚未设置记忆权限</p>
              <p className="text-xs text-on-surface-variant font-medium mt-1">未指定任何第二代解密继承人</p>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="w-full space-y-4 flex flex-col items-center">
          <button 
            onClick={() => onNavigateLogin('register')}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all text-sm tracking-wide cursor-pointer shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2"
          >
            创建数字遗产档案
            <ArrowRight size={16} />
          </button>
          
          <button 
            type="button"
            onClick={() => setShowExplanation(true)}
            className="w-full border border-blue-600/30 text-blue-600 py-4 rounded-xl font-semibold hover:bg-blue-50/50 transition-all text-sm cursor-pointer"
          >
            了解数字遗产
          </button>
          
          <div className="pt-4">
            <button 
              onClick={() => onNavigateLogin('login')}
              className="text-xs font-semibold text-secondary hover:text-primary transition-colors underline underline-offset-4 cursor-pointer"
            >
              拥有数字账户？ 登录 / 注册
            </button>
          </div>
        </div>
      </main>

      {/* Explanation Dialog sliding overlay */}
      {showExplanation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-inverse-surface/30 backdrop-blur-md" onClick={() => setShowExplanation(false)}></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-outline-variant/20 animate-fade-in space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-2 text-primary font-semibold font-serif text-lg">
                <Shield size={20} />
                <span>什么是数字遗产 (Digital Legacy)?</span>
              </div>
              <button onClick={() => setShowExplanation(false)} className="text-secondary hover:text-primary p-1 rounded-full hover:bg-surface-container cursor-pointer">
                <X size={18} />
              </button>
            </div>
            
            <div className="space-y-3 font-sans text-xs text-secondary leading-relaxed">
              <p>数字遗产指您死后留下的全部<strong>数字资产和虚拟痕迹</strong>，包括互联网账户、云端私人照片、著作权文档、数字信托、聊天记录等。</p>
              <p>在<strong>「Echo Vault」</strong>数字神龛中，您可以通过区块链密码学签署自己的数字遗嘱，并在遭遇静默失效、或预设解封日启动时，将保管在冷钱包或云盾的数字资产多签授权并移交给指定的守护信托人。</p>
              <p className="flex items-center gap-1.5 text-primary bg-primary-fixed/30 p-2.5 rounded-lg border border-primary/10">
                <Zap size={14} className="animate-bounce" />
                <span>点击<strong>「创建数字遗产档案」</strong>即刻开始，为您的数字意识点亮永不熄灭的数字神龛，庇佑您的下一代。</span>
              </p>
            </div>
            
            <div className="pt-2 flex justify-end gap-2">
              <button onClick={() => { setShowExplanation(false); onNavigateLogin('register'); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 cursor-pointer">构建档案</button>
              <button onClick={() => setShowExplanation(false)} className="px-4 py-2 border border-slate-200 text-secondary rounded-lg text-xs font-semibold hover:bg-slate-50 cursor-pointer">我知道了</button>
            </div>
          </div>
        </div>
      )}

      {/* Float tab bar for visitor mode */}
      <nav className="md:hidden fixed bottom-0 w-full rounded-t-3xl z-40 bg-white/70 backdrop-blur-2xl border-t border-slate-200/50 shadow-[0_-8px_30px_rgba(15,23,42,0.03)] pb-[safe-area-inset-bottom] flex justify-around items-center px-4 pt-2.5 pb-6">
        <button onClick={() => handleTabClick('首页')} className="flex flex-col items-center justify-center text-secondary hover:text-blue-600 transition-all py-1 px-3">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 0" }}>home</span>
          <span className="text-[10px] uppercase font-bold tracking-wider mt-1">首页</span>
        </button>
        <button onClick={() => handleTabClick('记忆')} className="flex flex-col items-center justify-center text-secondary hover:text-blue-600 transition-all py-1 px-3">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 0" }}>history_edu</span>
          <span className="text-[10px] uppercase font-bold tracking-wider mt-1">记忆</span>
        </button>
        <button onClick={() => handleTabClick('权限')} className="flex flex-col items-center justify-center text-secondary hover:text-blue-600 transition-all py-1 px-3">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 0" }}>key</span>
          <span className="text-[10px] uppercase font-bold tracking-wider mt-1">权限</span>
        </button>
        <button onClick={() => handleTabClick('纪念馆')} className="flex flex-col items-center justify-center text-blue-600 group transition-all py-1 px-3">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
          <span className="text-[10px] uppercase font-bold tracking-wider mt-1">纪念馆</span>
        </button>
        <button onClick={() => handleTabClick('更多')} className="flex flex-col items-center justify-center text-secondary hover:text-blue-600 transition-all py-1 px-3">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 0" }}>more_horiz</span>
          <span className="text-[10px] uppercase font-bold tracking-wider mt-1">更多</span>
        </button>
      </nav>

      {/* Mini notification list */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-slate-900 text-white text-xs subtle-shadow flex items-center gap-1.5 border border-slate-800 text-center tracking-wide animate-fade-in max-w-sm">
          <Info size={14} className="text-slate-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
