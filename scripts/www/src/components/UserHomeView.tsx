/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, ShieldAlert, Award, ArrowUpRight, Fingerprint, Key, FileText, LayoutGrid, Gavel, UserCheck, X, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface UserHomeViewProps {
  username: string;
  onNavigateScreen: (screen: 'identity' | 'linked-accounts' | 'memories' | 'permissions') => void;
}

export default function UserHomeView({ username, onNavigateScreen }: UserHomeViewProps) {
  const [showContactsPanel, setShowContactsPanel] = useState(false);
  const [showWillPanel, setShowWillPanel] = useState(false);
  
  // Custom states for keepers simulation
  const [keepers, setKeepers] = useState([
    { name: '林静秋', relation: '长女 / 第一顺位受托人', status: 'verified', keysGranted: 2 },
    { name: '陈文石', relation: '外孙 / 数字托管执行官', status: 'verified', keysGranted: 1 },
    { name: '张智深', relation: '核心法务代理团队', status: 'verified', keysGranted: 1 },
    { name: '陆平川', relation: '技术合伙人 / 多签保管者', status: 'pending', keysGranted: 1 }
  ]);
  const [newKeeperName, setNewKeeperName] = useState('');
  const [newKeeperRelation, setNewKeeperRelation] = useState('');
  const [addingKeeper, setAddingKeeper] = useState(false);

  // Digital will configurations
  const [willExpiryDays, setWillExpiryDays] = useState(90);
  const [hasCryptoRule, setHasCryptoRule] = useState(true);
  const [hasSocialDeletion, setHasSocialDeletion] = useState(false);
  const [hasWrittenWill, setHasWrittenWill] = useState(true);

  const addKeeper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeeperName || !newKeeperRelation) return;
    setKeepers([...keepers, {
      name: newKeeperName,
      relation: newKeeperRelation,
      status: 'pending',
      keysGranted: 1
    }]);
    setNewKeeperName('');
    setNewKeeperRelation('');
    setAddingKeeper(false);
  };

  const removeKeeper = (idx: number) => {
    setKeepers(keepers.filter((_, i) => i !== idx));
  };

  return (
    <div className="relative font-sans text-on-background animate-in fade-in duration-500">
      <div className="ambient-glow" style={{ transform: 'translate(-50%, -45%)' }}></div>

      <header className="mb-10 text-left">
        <h2 className="font-serif text-2xl lg:text-3xl text-primary font-bold tracking-tight mb-2">个人档案面板</h2>
        <p className="font-sans text-sm text-secondary">管理、配置及追踪您的终极数字资产。点此开启守护状态并更新您的第二代多锁合约。</p>
      </header>

      {/* Main Profile Overview Section */}
      <section className="mb-12">
        <div className="glass-card rounded-2xl p-6 md:p-8 subtle-shadow relative overflow-hidden group">
          {/* Decorative background radial blur */}
          <div className="absolute -right-24 -top-24 w-72 h-72 bg-primary-fixed/20 rounded-full blur-3xl group-hover:bg-primary-fixed/35 transition-colors duration-1000"></div>

          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            {/* User Profile Avatar block */}
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="relative">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white/80 shadow-md relative z-10 transition-transform duration-500 hover:rotate-3">
                  <img 
                    alt="Lin Anran Avatar" 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyolQS9Dp2j5wq6dtSA699wsbvo7NZ9vBzoOoRFHRIWEdB2WjgUVnvmb2kelRA6oG68Ov8-XlJmeVshjfHN8AkEJ1Zk7ukltGQ6BBM6iu4_1WMOQZPWiUstzDlsoVtdR3KbYgheBCIdYuU8WURroKlwfJbxh3pK9cD23O7pSVTjt0NK3FEYOV-YExYviahQv20zKfKkMfwG2dHavlX5XijvVrignSS-01OjiXTjNu_NVM00cZ_oXeLGEz064CP7Vn3aJjkBFFEgUw"
                  />
                </div>
                {/* Status Breathing Circle */}
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center z-20 shadow-sm border border-outline-variant/30">
                  <div className="w-3 h-3 bg-[#4ade80] rounded-full status-glow"></div>
                </div>
              </div>

              <div className="space-y-1.5 flex-1">
                <h3 className="font-serif text-2xl text-primary font-bold">{username}</h3>
                <p className="font-mono text-xs text-secondary tracking-widest uppercase">ID: EV-2045-8A9F</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="inline-flex items-center px-3 py-1 rounded-full border border-primary-fixed-dim/20 bg-primary-fixed/20 text-primary font-label-caps text-label-caps backdrop-blur-sm">
                    活跃守护中
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full border border-[#ffe082]/20 bg-[#fff8e1]/50 text-[#f57c00] font-label-caps text-label-caps backdrop-blur-sm">
                    创世节点
                  </span>
                </div>
              </div>
            </div>

            {/* Assets Completion Progress bar */}
            <div className="w-full md:flex-1 md:border-l md:border-outline-variant/20 md:pl-8 flex flex-col justify-center">
              <div className="mb-2 flex justify-between items-end">
                <span className="font-sans text-sm font-semibold text-[#181c1d]">数字资产完整度</span>
                <span className="font-sans text-base font-bold text-primary">82%</span>
              </div>
              
              {/* Progress bar container */}
              <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden mb-3 relative shadow-inner">
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all duration-1000 w-[82%]"
                ></div>
              </div>
              <p className="text-secondary text-xs leading-relaxed">
                您的数字遗嘱正在逐步完善。剩余待补充项目：社交平台授权及金融密钥。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Bento Grid Section */}
      <section className="space-y-6">
        <h3 className="font-serif text-lg font-bold text-primary flex items-center gap-2">
          <LayoutGrid size={18} className="text-blue-600" />
          档案架构
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Identity */}
          <button 
            onClick={() => onNavigateScreen('identity')}
            className="text-left glass-card rounded-2xl p-6 hover:bg-surface-container-high/30 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden h-44 cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <User size={64} className="text-primary" />
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant/30 text-primary group-hover:scale-105 transition-transform duration-300">
              <Fingerprint size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-primary text-base mb-1">身份档案</h4>
              <p className="text-xs text-secondary mb-2">生物识别与法律凭证</p>
            </div>
          </button>

          {/* Card 2: Accounts */}
          <button 
            onClick={() => onNavigateScreen('linked-accounts')}
            className="text-left glass-card rounded-2xl p-6 hover:bg-surface-container-high/30 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden h-44 cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Key size={64} className="text-primary" />
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant/30 text-primary group-hover:scale-105 transition-transform duration-300">
              <FileText size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-primary text-base mb-1">关联账号</h4>
              <p className="text-xs text-secondary mb-2">32 个社交与工作矩阵</p>
            </div>
          </button>

          {/* Card 3: Trusted Contacts */}
          <div 
            onClick={() => setShowContactsPanel(true)}
            className="text-left glass-card rounded-2xl p-6 hover:bg-surface-container-high/30 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden h-44 cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity animate-pulse">
              <UserCheck size={64} className="text-primary" />
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant/30 text-primary group-hover:scale-105 transition-transform duration-300">
              <UserCheck size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-primary text-base mb-1 flex items-center justify-between">
                <span>信任联系人</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-green-500/10 text-green-600 rounded border border-green-500/20">
                  已备灾
                </span>
              </h4>
              <p className="text-xs text-secondary mb-2">4 位多签解密守护者</p>
            </div>
          </div>

          {/* Card 4: Digital Will (Spans 2 columns on tablet/desktop) */}
          <div 
            onClick={() => setShowWillPanel(true)}
            className="text-left glass-card rounded-2xl p-6 hover:bg-slate-50 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden md:col-span-3 min-h-[140px] bg-blue-50/10 border border-blue-100 cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Gavel size={110} className="text-blue-600" />
            </div>
            <div className="flex items-center justify-between w-full mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600 group-hover:scale-105 transition-transform duration-300">
                <Gavel size={20} />
              </div>
              <span className="px-3 py-1 bg-blue-500/10 text-blue-700 rounded font-label-caps text-label-caps border border-blue-500/20 text-xs font-semibold">
                生效条件：静默{willExpiryDays}天
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-primary text-base mb-1 flex items-center gap-1.5">
                <span>数字遗嘱</span>
                <ArrowUpRight size={14} className="text-secondary/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </h4>
              <p className="text-xs text-secondary max-w-2xl">
                定义数字遗产的分配规则、数据销毁指令及核心密码资产移交协议，让您的数据遗志受主权保护。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SUB-PANEL 1: TRUSTED CONTACTS MANAGE --- */}
      {showContactsPanel && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-inverse-surface/30 backdrop-blur-md" onClick={() => setShowContactsPanel(false)}></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-outline-variant/15 animate-fade-in flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-4 shrink-0">
              <div className="flex items-center gap-2 text-primary font-semibold font-serif text-lg">
                <UserCheck size={20} />
                <span>信任联系人 (数字多签守护者)</span>
              </div>
              <button onClick={() => setShowContactsPanel(false)} className="text-secondary hover:text-primary p-1 rounded-full hover:bg-surface-container cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="overflow-y-auto space-y-4 pr-1 flex-1 py-1 hide-scrollbar">
              <p className="text-xs text-secondary leading-relaxed">
                这些联系人是您的「记忆解密多签证明人」。当触发静默机制后，他们需要提供数字签名私钥。本系统采用 3-of-4 多签名合约。
              </p>

              <div className="space-y-3">
                {keepers.map((k, idx) => (
                  <div key={idx} className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
                        {k.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primary flex items-center gap-1.5">
                          <span>{k.name}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            k.status === 'verified' ? 'bg-primary-container/20 text-on-primary-container' : 'bg-surface-container-high text-secondary'
                          }`}>
                            {k.status === 'verified' ? '已核验' : '待核签'}
                          </span>
                        </div>
                        <div className="text-[11px] text-on-surface-variant font-medium mt-0.5">关系: {k.relation}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] font-mono select-none text-secondary">配钥点权: {k.keysGranted}</span>
                      </div>
                      <button 
                        onClick={() => removeKeeper(idx)}
                        className="text-secondary hover:text-error transition-colors p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {addingKeeper ? (
                <form onSubmit={addKeeper} className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      required
                      placeholder="姓名 / 铭刻名"
                      value={newKeeperName}
                      onChange={(e) => setNewKeeperName(e.target.value)}
                      className="border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded px-3 py-1.5 text-xs text-primary bg-white"
                    />
                    <input 
                      type="text" 
                      required
                      placeholder="如: 长子 / 遗照受托人"
                      value={newKeeperRelation}
                      onChange={(e) => setNewKeeperRelation(e.target.value)}
                      className="border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded px-3 py-1.5 text-xs text-primary bg-white"
                    />
                  </div>
                  <div className="flex justify-end gap-2 text-xs">
                    <button type="button" onClick={() => setAddingKeeper(false)} className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-100 cursor-pointer">取消</button>
                    <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 cursor-pointer">确认添加</button>
                  </div>
                </form>
              ) : (
                <button 
                  onClick={() => setAddingKeeper(true)}
                  className="w-full py-2.5 border border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-1.5 text-xs text-secondary hover:text-blue-600 transition-colors hover:bg-slate-50 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>添加守护人门罗节点</span>
                </button>
              )}
            </div>
            
            <div className="pt-3 border-t border-slate-200/50 pt-4 flex justify-end shrink-0">
              <button onClick={() => setShowContactsPanel(false)} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-lg shadow-blue-500/10">保存多签配置</button>
            </div>
          </div>
        </div>
      )}

      {/* --- SUB-PANEL 2: DIGITAL WILL SETTINGS --- */}
      {showWillPanel && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-inverse-surface/30 backdrop-blur-md" onClick={() => setShowWillPanel(false)}></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-slate-200/50 animate-fade-in flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/50 mb-4 shrink-0">
              <div className="flex items-center gap-2 text-primary font-semibold font-serif text-lg">
                <Gavel size={20} className="text-blue-600" />
                <span>编辑数字遗嘱 (Digital Will)</span>
              </div>
              <button onClick={() => setShowWillPanel(false)} className="text-secondary hover:text-primary p-1 rounded-full hover:bg-slate-50 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="overflow-y-auto space-y-5 pr-1 flex-1 py-1 hide-scrollbar">
              {/* Trigger delay input slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider">静默判断延迟</span>
                  <span className="text-xs font-bold text-blue-600 font-mono">{willExpiryDays} 天</span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="360" 
                  step="30"
                  value={willExpiryDays} 
                  onChange={(e) => setWillExpiryDays(Number(e.target.value))}
                  className="w-full h-1 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>30天 (最短周期)</span>
                  <span>360天</span>
                </div>
              </div>

              {/* Will rule toggles */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-secondary uppercase tracking-wider block">分配规则清单</span>
                
                {/* Rule Item 1 */}
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <div>
                    <div className="text-xs font-semibold text-primary">多链数字秘钥转移智能合约</div>
                    <div className="text-[10px] text-secondary mt-0.5">将存留的 Ethereum / Bitcoin 地址自动解锁继承给大女儿</div>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={hasCryptoRule}
                    onChange={(e) => setHasCryptoRule(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded bg-transparent focus:ring-blue-500 cursor-pointer"
                  />
                </div>

                {/* Rule Item 2 */}
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <div>
                    <div className="text-xs font-semibold text-primary">社媒账号自动指令：永久彻底销毁</div>
                    <div className="text-[10px] text-secondary mt-0.5">静默到期后，自动触发注销 Instagram 与 Twitter 账号</div>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={hasSocialDeletion}
                    onChange={(e) => setHasSocialDeletion(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded bg-transparent focus:ring-blue-500 cursor-pointer"
                  />
                </div>

                {/* Rule Item 3 */}
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <div>
                    <div className="text-xs font-semibold text-primary">附带亲笔文字申言与祝福</div>
                    <div className="text-[10px] text-secondary mt-0.5">解锁后允许家庭成员在「纪念馆」中公开浏览我的影像底片与书信</div>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={hasWrittenWill}
                    onChange={(e) => setHasWrittenWill(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded bg-transparent focus:ring-blue-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-3 border-t border-slate-200/50 pt-4 flex justify-end shrink-0">
              <button onClick={() => setShowWillPanel(false)} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-lg shadow-blue-500/10">保存遗嘱配置</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
