/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, Key, Eye, HelpCircle, Lock, Hammer, ShieldAlert, Cpu, Download, FileEdit, Calendar, CheckSquare } from 'lucide-react';

interface PermissionsViewProps {
  onSaveSealedSuccess: () => void;
}

export default function PermissionsView({ onSaveSealedSuccess }: PermissionsViewProps) {
  // Permission toggles
  const [access, setAccess] = useState(true);
  const [aiPersona, setAiPersona] = useState(true);
  const [allowEdit, setAllowEdit] = useState(false);
  const [allowDownload, setAllowDownload] = useState(true);

  // Expiry states
  const [silenceDays, setSilenceDays] = useState(90);
  const [sealingDate, setSealingDate] = useState('2075-06-15');
  const [isLgDeadline, setIsLgDeadline] = useState(true);

  // States for loaders
  const [savingLoader, setSavingLoader] = useState(false);
  const [forceCloseConfirm, setForceCloseConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveSettings = () => {
    setSavingLoader(true);
    setTimeout(() => {
      setSavingLoader(false);
      onSaveSealedSuccess();
    }, 2000);
  };

  return (
    <div className="relative font-sans text-on-background animate-in fade-in duration-500 pb-20">
      <div className="ambient-glow" style={{ transform: 'translate(-50%, -42%)' }}></div>

      {/* Header */}
      <header className="mb-10 text-left">
        <h2 className="font-serif text-2xl lg:text-3xl text-primary font-bold tracking-tight mb-2">权限与神龛守护配置</h2>
        <p className="font-sans text-sm text-secondary">在这里调控受托人、家庭AI克隆分身、以及外部审计节点的安全钥匙配给比例。</p>
      </header>

      {/* Core Permission Toggle Matrix Card */}
      <section className="mb-10 space-y-6">
        <h3 className="font-serif text-lg font-bold text-primary flex items-center gap-2">
          <Key size={18} className="text-secondary" />
          数字遗产解密授权矩阵
        </h3>

        <div className="glass-card rounded-2xl p-6 border border-outline-variant/15 space-y-5">
          {/* Toggle 1: Viewer access */}
          <div className="flex items-center justify-between gap-4 py-1.5">
            <div className="space-y-0.5">
              <div className="text-sm font-semibold text-[#181c1d] flex items-center gap-1.5">
                <Eye size={16} className="text-secondary/70" />
                访问权限 (查看神龛)
              </div>
              <p className="text-xs text-secondary max-w-sm">授权受托联系人解锁您的公开及家族限定记忆条目。</p>
            </div>
            <button 
              onClick={() => setAccess(!access)}
              className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer ${access ? 'bg-primary' : 'bg-surface-container-high'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${access ? 'left-6' : 'left-1'}`}></div>
            </button>
          </div>

          <hr className="border-outline-variant/10" />

          {/* Toggle 2: AI Personality calling */}
          <div className="flex items-center justify-between gap-4 py-1.5">
            <div className="space-y-0.5">
              <div className="text-sm font-semibold text-[#181c1d] flex items-center gap-1.5">
                <Cpu size={16} className="text-secondary/70" />
                AI遗志人格代理调用
              </div>
              <p className="text-xs text-secondary max-w-sm">允许家庭成员与托管在去中心化主机的「我的AI意识克隆分身」沟通陪伴。</p>
            </div>
            <button 
              onClick={() => setAiPersona(!aiPersona)}
              className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer ${aiPersona ? 'bg-primary' : 'bg-surface-container-high'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${aiPersona ? 'left-6' : 'left-1'}`}></div>
            </button>
          </div>

          <hr className="border-outline-variant/10" />

          {/* Toggle 3: Edit Authority */}
          <div className="flex items-center justify-between gap-4 py-1.5">
            <div className="space-y-0.5">
              <div className="text-sm font-semibold text-[#181c1d] flex items-center gap-1.5">
                <FileEdit size={16} className="text-secondary/70" />
                编辑/追加记忆权限
              </div>
              <p className="text-xs text-secondary max-w-sm">允许指定的遗志代理受托人在神龛追加编修或校正我的成长相册底片。</p>
            </div>
            <button 
              onClick={() => setAllowEdit(!allowEdit)}
              className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer ${allowEdit ? 'bg-primary' : 'bg-surface-container-high'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${allowEdit ? 'left-6' : 'left-1'}`}></div>
            </button>
          </div>

          <hr className="border-outline-variant/10" />

          {/* Toggle 4: Raw files downloads */}
          <div className="flex items-center justify-between gap-4 py-1.5">
            <div className="space-y-0.5">
              <div className="text-sm font-semibold text-[#181c1d] flex items-center gap-1.5">
                <Download size={16} className="text-secondary/70" />
                下载及导出原始无损底片
              </div>
              <p className="text-xs text-secondary max-w-sm">允许血亲及受信成员下载保存在去中心化Swarm冷备份中的RAW无损原件。</p>
            </div>
            <button 
              onClick={() => setAllowDownload(!allowDownload)}
              className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer ${allowDownload ? 'bg-primary' : 'bg-surface-container-high'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${allowDownload ? 'left-6' : 'left-1'}`}></div>
            </button>
          </div>
        </div>
      </section>

      {/* Expiry Settings */}
      <section className="mb-10 space-y-6">
        <h3 className="font-serif text-lg font-bold text-primary flex items-center gap-2">
          <Calendar size={18} className="text-secondary" />
          延审与周期约束设置
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Silent detection period bar */}
          <div className="glass-card rounded-2xl p-6 border border-outline-variant/15 flex flex-col justify-between">
            <div className="space-y-1 mb-4">
              <h4 className="text-sm font-semibold text-primary">终极静默期设置</h4>
              <p className="text-[11px] text-secondary leading-relaxed">定义在心跳信号（社交、物理设备活跃、网页签到）静默多少天后，自动触发解密判定。</p>
            </div>
            
            <div className="space-y-2 pt-2">
              <div className="flex justify-between font-mono font-bold text-xs text-primary bg-primary/5 p-2 rounded border border-primary/10">
                <span>连续失联静默天数:</span>
                <span>{silenceDays} 天</span>
              </div>
              <input 
                type="range" 
                min="30" 
                max="360" 
                step="30"
                value={silenceDays} 
                onChange={(e) => setSilenceDays(Number(e.target.value))}
                className="w-full h-1 bg-surface-container-high rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-secondary">
                <span>30天</span>
                <span>180天</span>
                <span>360天</span>
              </div>
            </div>
          </div>

          {/* Absolute Sealing Deadline and input date */}
          <div className="glass-card rounded-2xl p-6 border border-outline-variant/15 flex flex-col justify-between">
            <div className="space-y-1 mb-4">
              <h4 className="text-sm font-semibold text-primary">绝对封存期限</h4>
              <p className="text-[11px] text-secondary leading-relaxed">不论是否检测到心跳活动，超出此绝对公历纪元将强制对神龛部分冷库锁死保管。</p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5">
                <input 
                  type="date" 
                  value={sealingDate}
                  onChange={(e) => setSealingDate(e.target.value)}
                  className="bg-transparent border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-3 py-2 text-xs font-semibold text-primary w-full shadow-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox"
                  id="chk-longterm"
                  checked={isLgDeadline}
                  onChange={(e) => setIsLgDeadline(e.target.checked)}
                  className="w-4 h-4 text-primary border-outline-variant rounded bg-transparent focus:ring-primary cursor-pointer"
                />
                <label htmlFor="chk-longterm" className="text-[10px] text-secondary cursor-pointer select-none">
                  在绝对封存日，通过分布式零知识证明广播终结消息。
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Save Trigger buttons */}
      <section className="mb-12 flex justify-end">
        <button 
          onClick={handleSaveSettings}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-10 py-4 text-sm tracking-widest shadow-lg shadow-blue-500/10 transition-all cursor-pointer select-none active:scale-[0.99]"
        >
          保存矩阵设置
        </button>
      </section>

      {/* Extreme Override segment: Instant Sealing */}
      <section className="border border-red-200 bg-red-50/50 rounded-2xl p-6 md:p-8 space-y-4 relative overflow-hidden group">
        <div className="absolute -right-24 -bottom-24 w-60 h-60 bg-red-100/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-red-600 flex items-center gap-2">
              <ShieldAlert size={18} className="animate-pulse" />
              立即强制封存库
            </h4>
            <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
              这是用于突发安全威胁的紧急终极防御模块。点击将立刻锁死神龛。
            </p>
          </div>

          <button 
            onClick={() => setForceCloseConfirm(true)}
            className="px-5 py-3.5 bg-red-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-red-700 max-w-xs shrink-0 cursor-pointer shadow-lg shadow-red-200/50 select-none transition-transform active:scale-95 text-center"
          >
            立即执行数据冷封
          </button>
        </div>
      </section>

      {/* --- LOCK LOADING OVERLAY SCREEN --- */}
      {savingLoader && (
        <div className="fixed inset-0 z-[120] bg-white/70 backdrop-blur-md flex flex-col items-center justify-center space-y-6">
          <div className="relative w-16 h-16 rounded-full border-2 border-primary/20 flex items-center justify-center animate-spin">
            <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-primary rounded-full"></div>
          </div>
          <div className="text-center space-y-1.5 animate-pulse">
            <h3 className="font-serif text-lg font-bold text-primary">正在对神龛规则进行签名见证...</h3>
            <p className="font-sans text-xs text-secondary font-medium tracking-wide">
              生成多签新种子、部署智能安全守约至第 33856 节点
            </p>
          </div>
        </div>
      )}

      {/* --- CONFIRM DIALOG: CORE EMERGENCY SEAL --- */}
      {forceCloseConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setForceCloseConfirm(false)}></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-slate-200/60 text-center space-y-4 animate-fade-in z-20">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 mx-auto flex items-center justify-center">
              <Lock size={22} className="animate-bounce" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif text-lg font-bold text-slate-900">立即剥离运行并冷封一切内容？</h3>
              <p className="font-sans text-xs text-slate-500 leading-relaxed">
                警告：点击确认将立即关闭所有外部API、永久断开社交平台的同步镜像，并将记忆档案室及个人身份档案冻结冷备。
              </p>
            </div>
            <div className="pt-2 flex gap-2">
              <button onClick={() => setForceCloseConfirm(false)} className="flex-1 py-2.5 border border-slate-200 text-slate-500 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer">取消保留</button>
              <button onClick={onSaveSealedSuccess} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-red-200 cursor-pointer">瞬间执行冷封</button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-slate-900 text-white text-xs subtle-shadow flex items-center gap-2 border border-slate-800 tracking-wider">
          <Shield size={14} className="text-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
