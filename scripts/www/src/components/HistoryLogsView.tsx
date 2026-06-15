/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SealedLog } from '../types';
import { Shield, Sparkles, CheckCircle2, History, AlertTriangle, ArrowLeft, RefreshCw, Layers } from 'lucide-react';

interface HistoryLogsViewProps {
  logsList: SealedLog[];
  onBack: () => void;
}

export default function HistoryLogsView({ logsList, onBack }: HistoryLogsViewProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'auto' | 'temp' | 'audit' | 'block'>('all');
  const [extraLogs, setExtraLogs] = useState<SealedLog[]>([]);
  const [loadingOlder, setLoadingOlder] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 size={14} className="text-[#22c55e]" />;
      case 'finished':
        return <CheckCircle2 size={14} className="text-primary" />;
      case 'passed':
        return <CheckCircle2 size={14} className="text-primary-fixed-dim" />;
      default:
        return <AlertTriangle size={14} className="text-error" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-[#4ade80]/10 text-[#22c55e] border-[#22c55e]/20';
      case 'finished':
        return 'bg-primary/5 text-primary border-primary/10';
      case 'passed':
        return 'bg-primary-container/10 text-on-primary-container border-primary-container/20';
      default:
        return 'bg-error-container-low text-error border-error-container-medium/20';
    }
  };

  const allLogs = [...logsList, ...extraLogs];

  const filteredLogs = allLogs.filter(log => {
    if (activeFilter === 'all') return true;
    return log.type === activeFilter;
  });

  const loadMoreLogs = () => {
    setLoadingOlder(true);
    setTimeout(() => {
      setLoadingOlder(false);
      setExtraLogs([
        {
          id: 'log-past1',
          title: '身份密钥验证通过',
          timestamp: '2024-05-10 18:22:10',
          operator: '智能指纹校验区',
          status: 'success',
          statusLabel: '通过',
          type: 'audit'
        },
        {
          id: 'log-past2',
          title: '强制冷密封锁定启动',
          timestamp: '2024-04-29 23:59:59',
          operator: '用户强制冷备份',
          status: 'finished',
          statusLabel: '签署完成',
          type: 'auto'
        }
      ]);
    }, 1200);
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
      <header className="mb-8">
        <h2 className="font-serif text-2xl lg:text-3xl text-primary font-bold tracking-tight mb-2">安全守护审计历史</h2>
        <p className="font-sans text-sm text-secondary">
          系统每隔一周期会自检守护密钥及外部心跳接口，并将每一次守护校验与封锁仪式进行不可逆加密上链。
        </p>
      </header>

      {/* Categories filter pills slider */}
      <div className="flex gap-2.5 overflow-x-auto pb-5 pt-1 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 mb-6">
        <button 
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${activeFilter === 'all' ? 'bg-primary text-white border-primary' : 'bg-white border-outline-variant/30 text-secondary hover:border-outline-variant'}`}
        >
          全部类型
        </button>
        <button 
          onClick={() => setActiveFilter('auto')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${activeFilter === 'auto' ? 'bg-primary text-white border-primary' : 'bg-white border-outline-variant/30 text-secondary hover:border-outline-variant'}`}
        >
          自动封存
        </button>
        <button 
          onClick={() => setActiveFilter('temp')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${activeFilter === 'temp' ? 'bg-primary text-white border-primary' : 'bg-white border-outline-variant/30 text-secondary hover:border-outline-variant'}`}
        >
          临时唤醒
        </button>
        <button 
          onClick={() => setActiveFilter('audit')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${activeFilter === 'audit' ? 'bg-primary text-white border-primary' : 'bg-white border-outline-variant/30 text-secondary hover:border-outline-variant'}`}
        >
          安全自审
        </button>
        <button 
          onClick={() => setActiveFilter('block')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${activeFilter === 'block' ? 'bg-primary text-white border-primary' : 'bg-white border-outline-variant/30 text-secondary hover:border-outline-variant'}`}
        >
          异常拦截
        </button>
      </div>

      {/* Timeline of Logs */}
      <section className="space-y-4 mb-10">
        {filteredLogs.length > 0 ? (
          <div className="glass-card rounded-2xl border border-outline-variant/15 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/20 bg-surface-container-low text-secondary tracking-wider font-semibold">
                    <th className="p-4">检查行为 / 事件名</th>
                    <th className="p-4">公历纪元时间</th>
                    <th className="p-4">证明签署主体</th>
                    <th className="p-4 text-center">审计凭证状态</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-surface-container-low/30 transition-colors">
                      {/* Name / Title */}
                      <td className="p-4">
                        <div className="font-semibold text-primary flex items-center gap-2">
                          <History size={13} className="text-secondary/70 shrink-0" />
                          <span>{log.title}</span>
                        </div>
                      </td>
                      
                      {/* Timestamp */}
                      <td className="p-4 font-mono text-secondary">{log.timestamp}</td>
                      
                      {/* Operator info */}
                      <td className="p-4 font-medium text-secondary">{log.operator}</td>
                      
                      {/* Status and badge */}
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-bold select-none ${getStatusColor(log.status)}`}>
                          {getStatusIcon(log.status)}
                          {log.statusLabel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-secondary border border-dashed border-outline-variant rounded-2xl bg-white/20">
            暂无此过滤类的校验审计历史记录。
          </div>
        )}
      </section>

      {/* Button to load older archived log entries */}
      {extraLogs.length === 0 && (
        <div className="flex justify-center">
          <button 
            type="button" 
            onClick={loadMoreLogs}
            disabled={loadingOlder}
            className="px-6 py-2.5 bg-white hover:bg-surface-container-low border border-outline-variant text-[11px] font-bold text-secondary rounded-lg flex items-center gap-1.5 cursor-pointer select-none transition-colors"
          >
            {loadingOlder ? (
              <RefreshCw size={12} className="animate-spin text-primary" />
            ) : (
              <Layers size={12} />
            )}
            <span>{loadingOlder ? '正在解封深空历史冷备元数据...' : '展开调阅更深公历纪元历史日志'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
