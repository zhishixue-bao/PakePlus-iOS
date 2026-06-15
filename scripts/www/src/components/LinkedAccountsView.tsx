/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LinkedAccount } from '../types';
import { ArrowLeft, RefreshCw, Plus, Trash2, ShieldCheck, Mail, Key, Globe, LayoutGrid, X, Loader2 } from 'lucide-react';

interface LinkedAccountsViewProps {
  accountsList: LinkedAccount[];
  onBack: () => void;
  onUpdateAccountStatus: (id: string, status: 'active' | 'disconnected') => void;
  onAddAccount: (newAcct: LinkedAccount) => void;
  onRemoveAccount: (id: string) => void;
}

export default function LinkedAccountsView({ accountsList, onBack, onUpdateAccountStatus, onAddAccount, onRemoveAccount }: LinkedAccountsViewProps) {
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlatform, setNewPlatform] = useState('gmail');
  const [newUsername, setNewUsername] = useState('');
  const [addingLoader, setAddingLoader] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReconnect = (id: string, name: string) => {
    setConnectingId(id);
    setTimeout(() => {
      onUpdateAccountStatus(id, 'active');
      setConnectingId(null);
      triggerToast(`【${name}】握手成功，多链备份节点状态切换为「正常同步中」。`);
    }, 1800);
  };

  const handleAddAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername) return;

    setAddingLoader(true);
    setTimeout(() => {
      setAddingLoader(false);
      setShowAddModal(false);

      const id = `${newPlatform}-${Date.now()}`;
      const name = newPlatform === 'gmail' ? 'Google Suite' : newPlatform === 'spotify' ? 'Spotify Music' : newPlatform === 'discord' ? 'Discord Node' : 'Steam Safe Vault';
      const meta = newPlatform === 'gmail' ? '存储: 15 GB / 15 GB' : newPlatform === 'spotify' ? '媒体库: 1,402 曲' : '状态: 正常同步';

      const newAcct: LinkedAccount = {
        id,
        name,
        username: newUsername,
        type: newPlatform === 'gmail' ? 'cloud' : 'social',
        status: 'active',
        meta
      };

      onAddAccount(newAcct);
      setNewUsername('');
      triggerToast(`多链授权矩阵已成功熔铸【${name}】！`);
    }, 1500);
  };

  return (
    <div className="relative font-sans text-on-background animate-in fade-in duration-500 pb-20">
      <div className="ambient-glow" style={{ transform: 'translate(-50%, -45%)' }}></div>

      {/* Back Header */}
      <button 
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-1.5 text-secondary hover:text-primary transition-colors text-sm font-semibold cursor-pointer"
      >
        <ArrowLeft size={16} />
        返回控制面板
      </button>

      {/* Heading */}
      <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl lg:text-3xl text-primary font-bold tracking-tight mb-2">数字主权关联账号</h2>
          <p className="font-sans text-sm text-secondary">在这里链接和多方多签名托管您生命痕迹中极其关键的社媒、代码仓库及链上资产。</p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-primary hover:bg-primary/95 text-white rounded-xl px-5 py-3 text-sm font-semibold tracking-wide shadow-lg shadow-primary/10 flex items-center justify-center gap-1.5 self-start cursor-pointer transition-all active:scale-[0.98]"
        >
          <Plus size={16} />
          <span>添加新账号关联</span>
        </button>
      </header>

      {/* Accounts List Container Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accountsList.map((acct) => (
          <div 
            key={acct.id}
            className="p-5 glass-card rounded-2xl border border-outline-variant/15 flex flex-col justify-between h-40 hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
          >
            {/* Handshake Loading Overlay */}
            {connectingId === acct.id && (
              <div className="absolute inset-0 bg-white/80 z-20 flex flex-col items-center justify-center space-y-2 animate-fade-in text-center p-3">
                <Loader2 size={24} className="text-primary animate-spin" />
                <p className="font-sans text-[11px] font-semibold text-primary">签署多端多签托管密钥中...</p>
              </div>
            )}

            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-primary flex items-center gap-2">
                  {acct.name}
                </h4>
                <p className="font-mono text-[11px] text-[#595f63]/80">{acct.username}</p>
              </div>

              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                acct.status === 'active' 
                  ? 'bg-primary-container/20 text-on-primary-container border border-primary/25' 
                  : 'bg-error-container-low text-error border border-error-container-medium/20'
              }`}>
                {acct.status === 'active' ? '自动同步中' : '失效/需要重签'}
              </span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
              <span className="text-[10px] text-secondary font-mono tracking-wider">{acct.meta}</span>
              
              <div className="flex items-center gap-2.5">
                {acct.status === 'disconnected' && (
                  <button 
                    onClick={() => handleReconnect(acct.id, acct.name)}
                    className="px-3 py-1 bg-primary text-white font-semibold text-[10px] rounded hover:bg-primary/95 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw size={10} />
                    重新绑定
                  </button>
                )}
                
                <button 
                  onClick={() => onRemoveAccount(acct.id)}
                  className="p-1.5 rounded bg-surface text-secondary hover:text-error hover:bg-error-container-low transition-colors"
                  title="解除委托"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* --- ADD NEW ACCOUNT DIALOG OVERLAY --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-inverse-surface/30 backdrop-blur-md" onClick={() => setShowAddModal(false)}></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-outline-variant/15 animate-fade-in flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-4 shrink-0">
              <div className="flex items-center gap-1.5 text-primary font-semibold font-serif text-base">
                <LayoutGrid size={16} />
                <span>授权新资产节点进入神龛</span>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-secondary p-1 rounded-full hover:bg-surface-container cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddAccountSubmit} className="space-y-4 pr-1 flex-1 py-1 hide-scrollbar">
              {/* Choosing platform type */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider">选择关联平台</label>
                <select 
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value)}
                  className="w-full border border-outline-variant rounded-xl px-3 py-2.5 text-xs text-on-surface bg-transparent focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="gmail">Google Suite Workspace (包含 Drive 资料库)</option>
                  <option value="spotify">Spotify (音乐歌单、播放足迹留存)</option>
                  <option value="discord">Discord (家族及社交频道足迹托管)</option>
                  <option value="steam">Steam Platform (数字遗产游戏资产托管)</option>
                </select>
              </div>

              {/* Username Input */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider">账号特征识符 / 账户信息</label>
                <input 
                  type="text" 
                  required
                  placeholder="例如: anran.digital@gmail.com"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full border border-outline-variant rounded-xl px-3 py-2.5 text-xs text-on-surface bg-transparent focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Loader info */}
              {addingLoader && (
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 flex items-center justify-center gap-2">
                  <Loader2 size={16} className="text-primary animate-spin" />
                  <span className="text-[10px] font-medium text-secondary">正在核查公钥可用性、生成多方签名哈希...</span>
                </div>
              )}
            </form>
            
            <div className="pt-3 border-t border-outline-variant/20 pt-4 flex justify-end gap-2 shrink-0">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-outline-variant text-secondary rounded-lg text-xs font-semibold">取消</button>
              <button onClick={handleAddAccountSubmit} className="px-5 py-2 bg-primary text-white rounded-lg text-xs font-semibold">确认并绑定</button>
            </div>
          </div>
        </div>
      )}

      {/* Floated notification toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-primary text-white text-xs subtle-shadow flex items-center gap-2 border border-outline-variant/20 tracking-wider">
          <ShieldCheck size={14} className="text-primary-fixed-dim" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
