/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ScreenType, 
  Memory, 
  LinkedAccount, 
  SealedLog, 
  initialAccounts, 
  initialMemories, 
  initialLogs 
} from './types';

// Importing all modular screen components
import WelcomeView from './components/WelcomeView';
import LoginView from './components/LoginView';
import VisitorView from './components/VisitorView';
import UserHomeView from './components/UserHomeView';
import MemoriesView from './components/MemoriesView';
import MemoryDetailView from './components/MemoryDetailView';
import PermissionsView from './components/PermissionsView';
import SealedView from './components/SealedView';
import ExportView from './components/ExportView';
import IdentityView from './components/IdentityView';
import LinkedAccountsView from './components/LinkedAccountsView';
import HistoryLogsView from './components/HistoryLogsView';
import MemorialView from './components/MemorialView';

import { 
  Home, 
  FileText, 
  Key, 
  Users, 
  ArrowLeft, 
  LogOut, 
  Sparkles, 
  ShieldCheck, 
  Menu, 
  History, 
  BookOpen,
  X
} from 'lucide-react';

export default function App() {
  // Routing & Session states
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('landing');
  const [username, setUsername] = useState<string | null>(null);

  // Core Data States
  const [memories, setMemories] = useState<Memory[]>(initialMemories);
  const [accounts, setAccounts] = useState<LinkedAccount[]>(initialAccounts);
  const [logs, setLogs] = useState<SealedLog[]>(initialLogs);
  const [selectedMemoryId, setSelectedMemoryId] = useState<string | null>(null);

  // Miscellaneous settings
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // State update handlers passed down to modular components
  const handleAddMemory = (newMem: Memory) => {
    setMemories([newMem, ...memories]);
    // Also push a record log to the logging system!
    const newLog: SealedLog = {
      id: `log-${Date.now()}`,
      title: `上传记忆 [${newMem.title}]`,
      timestamp: new Date().toLocaleString('zh-CN'),
      operator: '用户 (签名锁环)',
      status: 'success',
      statusLabel: '签署完成',
      type: 'audit'
    };
    setLogs([newLog, ...logs]);
  };

  const handleUpdateMemoryAccess = (id: string, newAccess: 'public' | 'family' | 'private' | 'sealed') => {
    setMemories(memories.map(m => m.id === id ? { ...m, access: newAccess } : m));
    // Also log this change
    const newLog: SealedLog = {
      id: `log-${Date.now()}`,
      title: `篡改授权级 [${id}] -> ${newAccess}`,
      timestamp: new Date().toLocaleString('zh-CN'),
      operator: '核心智能防卫盾',
      status: 'success',
      statusLabel: '安全核验',
      type: 'auto'
    };
    setLogs([newLog, ...logs]);
  };

  const handleDeleteMemory = (id: string) => {
    setMemories(memories.filter(m => m.id !== id));
    triggerToast('该记忆块已从物理层脱编完全销毁。');
  };

  const handleUpdateAccountStatus = (id: string, status: 'active' | 'disconnected') => {
    setAccounts(accounts.map(a => a.id === id ? { ...a, status } : a));
  };

  const handleAddAccount = (newAcct: LinkedAccount) => {
    setAccounts([newAcct, ...accounts]);
  };

  const handleRemoveAccount = (id: string) => {
    setAccounts(accounts.filter(a => a.id !== id));
    triggerToast('关联平台多签协议解散成功。');
  };

  const handleLoginSuccess = (name: string) => {
    setUsername(name);
    setCurrentScreen('user-home');
    triggerToast(`欢迎开启神龛，您的数字公私钥在 33 个节点运行正常。`);
  };

  const handleLogout = () => {
    setUsername(null);
    setCurrentScreen('landing');
    triggerToast('已清除访问特征痕迹，安全退出神龛。');
  };

  // Safe callback when saving permissions settings (Redirects to Sealed Ceremonies success screen)
  const handleSaveSealedSuccess = () => {
    setCurrentScreen('sealed');
    // Log
    const newLog: SealedLog = {
      id: `log-${Date.now()}`,
      title: '主权契约封锁重编结印',
      timestamp: new Date().toLocaleString('zh-CN'),
      operator: '安全托管执行官',
      status: 'success',
      statusLabel: '上链核签',
      type: 'auto'
    };
    setLogs([newLog, ...logs]);
  };

  // Helper selectors
  const activeMemory = memories.find(m => m.id === selectedMemoryId);

  // Render Core Screen Switcher
  const renderScreenContent = () => {
    switch (currentScreen) {
      case 'landing':
        return (
          <WelcomeView 
            onNavigate={(screen) => {
              if (screen === 'visitor') {
                setCurrentScreen('visitor');
              } else {
                setCurrentScreen(screen);
              }
            }} 
          />
        );
      case 'login':
        return (
          <LoginView 
            initialMode="login"
            onNavigateHome={handleLoginSuccess}
            onBack={() => setCurrentScreen('landing')}
          />
        );
      case 'register':
        return (
          <LoginView 
            initialMode="register"
            onNavigateHome={handleLoginSuccess}
            onBack={() => setCurrentScreen('landing')}
          />
        );
      case 'visitor':
        return (
          <VisitorView 
            onNavigateLogin={(mode) => setCurrentScreen(mode)}
            onNavigateMemorial={() => setCurrentScreen('memory-detail')} // redirects to specific public memorial hall view
          />
        );
      case 'user-home':
        return (
          <UserHomeView 
            username={username || '林安然'}
            onNavigateScreen={(screen) => setCurrentScreen(screen)}
          />
        );
      case 'memories':
        return (
          <MemoriesView 
            memoriesList={memories}
            onSelectMemory={(id) => {
              setSelectedMemoryId(id);
              setCurrentScreen('memory-detail');
            }}
            onAddMemory={handleAddMemory}
          />
        );
      case 'memory-detail':
        // If no selection but visited, let's treat as Zhang Weiming memorial hall showcase to user!
        if (!selectedMemoryId && activeMemory === undefined) {
          return (
            <MemorialView 
              showBackButton={username === null}
              onBack={() => setCurrentScreen('visitor')}
            />
          );
        }
        return activeMemory ? (
          <MemoryDetailView 
            memory={activeMemory}
            onBack={() => {
              setSelectedMemoryId(null);
              setCurrentScreen('memories');
            }}
            onUpdateMemoryAccess={handleUpdateMemoryAccess}
            onDeleteMemory={handleDeleteMemory}
          />
        ) : (
          <div className="p-8 text-center text-secondary">
            未发现记忆。
            <button onClick={() => setCurrentScreen('memories')} className="text-primary hover:underline ml-1">返回</button>
          </div>
        );
      case 'permissions':
        return (
          <PermissionsView 
            onSaveSealedSuccess={handleSaveSealedSuccess}
          />
        );
      case 'sealed':
        return (
          <SealedView 
            onNavigateScreen={(screen) => setCurrentScreen(screen)}
          />
        );
      case 'export':
        return (
          <ExportView 
            onBack={() => setCurrentScreen('permissions')}
          />
        );
      case 'identity':
        return (
          <IdentityView 
            onBack={() => setCurrentScreen('user-home')}
          />
        );
      case 'linked-accounts':
        return (
          <LinkedAccountsView 
            accountsList={accounts}
            onBack={() => setCurrentScreen('user-home')}
            onUpdateAccountStatus={handleUpdateAccountStatus}
            onAddAccount={handleAddAccount}
            onRemoveAccount={handleRemoveAccount}
          />
        );
      case 'logs':
        return (
          <HistoryLogsView 
            logsList={logs}
            onBack={() => {
              if (username) {
                setCurrentScreen('user-home');
              } else {
                setCurrentScreen('visitor');
              }
            }}
          />
        );
      default:
        return <WelcomeView onNavigate={(scr) => setCurrentScreen(scr)} />;
    }
  };

  // Determine if application sidebar navigation should layout
  const showNavFrame = !['landing', 'login', 'register'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-primary-fixed block relative antialiased leading-normal">
      {/* Dynamic Background subtle grid and auroral blobs */}
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#e8eff0] to-transparent shrink-0 pointer-events-none opacity-40"></div>
      
      {/* Top Brand Header Bar inside navigation frame */}
      {showNavFrame && (
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-outline-variant/15 select-none shadow-[0_2px_15px_rgba(22,40,57,0.015)]">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <div 
              onClick={() => {
                if (username) {
                  setCurrentScreen('user-home');
                } else {
                  setCurrentScreen('landing');
                }
              }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <img 
                alt="AfterLink Logo" 
                className="w-10 h-10 object-contain rounded-lg shadow-sm border border-outline-variant/10 group-hover:rotate-12 duration-300"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDSKbM_1wbjO5Vyzeuu4cQRVaoBg636dDSqcoy0sJCiXkHvsOXjkXyb3-fozXl4V6EHPk3357QGSoMK9f8yp1JwtI_dKdqMDzDy9Gyd0TDoPlUgnFtb8sntjgT6OlPEROPsdCGAMivD4Ame9n05WoX_0AVy8prEgQZ17z7tyyJuTdn7KH3JA--ZpAPe7WjW3RqEuTAcssEcB3ToYp4oNshGYD0tTwNjEIxy9Kw7ds8Fx3BqXtNmjtBuXjszSMfGU5ZepAjUai-loZvtA"
              />
              <div>
                <h1 className="font-serif text-base font-bold text-primary tracking-tight">
                  Echo Vault
                </h1>
                <span className="text-[9px] uppercase tracking-widest text-[#595f63] font-semibold block -mt-0.5 opacity-80">
                  By AfterLink
                </span>
              </div>
            </div>

            {/* Desktop Center Links (Visitor view redirects or profile statuses) */}
            <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-secondary">
              {username ? (
                <>
                  <button onClick={() => setCurrentScreen('user-home')} className={`hover:text-blue-600 hover:-translate-y-0.5 duration-200 transition-all cursor-pointer ${currentScreen === 'user-home' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : ''}`}>安全面板</button>
                  <button onClick={() => setCurrentScreen('memories')} className={`hover:text-blue-600 hover:-translate-y-0.5 duration-200 transition-all cursor-pointer ${currentScreen === 'memories' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : ''}`}>记忆归档</button>
                  <button onClick={() => setCurrentScreen('permissions')} className={`hover:text-blue-600 hover:-translate-y-0.5 duration-200 transition-all cursor-pointer ${currentScreen === 'permissions' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : ''}`}>封锁规则</button>
                  <button onClick={() => { setSelectedMemoryId(null); setCurrentScreen('memory-detail'); }} className={`hover:text-blue-600 hover:-translate-y-0.5 duration-200 transition-all cursor-pointer ${currentScreen === 'memory-detail' && !selectedMemoryId ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : ''}`}>陈列纪念馆</button>
                </>
              ) : (
                <div className="flex items-center gap-2 text-blue-600 font-medium bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 status-glow animate-pulse"></span>
                  <span>公共游客深度瞻仰模式</span>
                </div>
              )}
            </div>

            {/* User credentials corner */}
            <div className="flex items-center gap-3">
              {username ? (
                <div className="flex items-center gap-3 bg-[#e4edf5]/30 border border-slate-200/50 rounded-full pl-3 pr-2.5 py-1.5 shadow-sm">
                  <div className="text-right hidden sm:block select-none">
                    <p className="text-xs font-bold text-primary leading-tight">{username}</p>
                    <p className="text-[9px] font-mono text-slate-500 leading-none">活跃中</p>
                  </div>
                  
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-white">
                    <img 
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyolQS9Dp2j5wq6dtSA699wsbvo7NZ9vBzoOoRFHRIWEdB2WjgUVnvmb2kelRA6oG68Ov8-XlJmeVshjfHN8AkEJ1Zk7ukltGQ6BBM6iu4_1WMOQZPWiUstzDlsoVtdR3KbYgheBCIdYuU8WURroKlwfJbxh3pK9cD23O7pSVTjt0NK3FEYOV-YExYviahQv20zKfKkMfwG2dHavlX5XijvVrignSS-01OjiXTjNu_NVM00cZ_oXeLGEz064CP7Vn3aJjkBFFEgUw" 
                      alt="U" 
                    />
                  </div>

                  <button 
                    onClick={handleLogout}
                    title="安全注销"
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors ml-1 cursor-pointer hover:bg-white rounded-full shadow-sm"
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setCurrentScreen('login')}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer shadow-lg shadow-blue-500/10 transition-transform active:scale-[0.98]"
                >
                  验证身份 / 登录
                </button>
              )}
            </div>
          </div>
        </header>
      )}

      {/* Main Container Wrapper */}
      <div className="max-w-7xl mx-auto px-6 py-6 min-h-[85vh]">
        <div className="w-full">
          {renderScreenContent()}
        </div>
      </div>

      {/* Mobile Sticky Float Navigation Tab Bar */}
      {showNavFrame && username && (
        <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full w-[90%] max-w-sm z-40 bg-white/80 backdrop-blur-2xl border border-slate-200/60 shadow-2xl flex justify-around items-center px-4 py-3.5 select-none">
          {/* Tab 1: Home */}
          <button 
            onClick={() => setCurrentScreen('user-home')} 
            className={`flex flex-col items-center justify-center transition-colors px-2 py-1 ${
              ['user-home', 'identity', 'linked-accounts'].includes(currentScreen) ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-blue-600'
            }`}
          >
            <Home size={18} />
            <span className="text-[9px] uppercase tracking-wider font-bold mt-1">面板</span>
          </button>

          {/* Tab 2: Memories */}
          <button 
            onClick={() => setCurrentScreen('memories')} 
            className={`flex flex-col items-center justify-center transition-colors px-2 py-1 ${
              ['memories', 'memory-detail'].includes(currentScreen) && selectedMemoryId !== null ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-blue-600'
            }`}
          >
            <FileText size={18} />
            <span className="text-[9px] uppercase tracking-wider font-bold mt-1">记忆</span>
          </button>

          {/* Tab 3: Permissions */}
          <button 
            onClick={() => setCurrentScreen('permissions')} 
            className={`flex flex-col items-center justify-center transition-colors px-2 py-1 ${
              ['permissions', 'sealed', 'export'].includes(currentScreen) ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-blue-600'
            }`}
          >
            <Key size={18} />
            <span className="text-[9px] uppercase tracking-wider font-bold mt-1">权限</span>
          </button>

          {/* Tab 4: Memorial Hall */}
          <button 
            onClick={() => {
              setSelectedMemoryId(null);
              setCurrentScreen('memory-detail');
            }} 
            className={`flex flex-col items-center justify-center transition-colors px-2 py-1 ${
              currentScreen === 'memory-detail' && selectedMemoryId === null ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-blue-600'
            }`}
          >
            <BookOpen size={18} />
            <span className="text-[9px] uppercase tracking-wider font-bold mt-1">纪念馆</span>
          </button>

          {/* Tab 5: Logs */}
          <button 
            onClick={() => setCurrentScreen('logs')} 
            className={`flex flex-col items-center justify-center transition-colors px-2 py-1 ${
              currentScreen === 'logs' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-blue-600'
            }`}
          >
            <History size={18} />
            <span className="text-[9px] uppercase tracking-wider font-bold mt-1">日志</span>
          </button>
        </nav>
      )}

      {/* Dynamic system feedback toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-slate-900 text-white text-xs subtle-shadow flex items-center gap-2 border border-slate-800 tracking-wider">
          <ShieldCheck size={14} className="text-blue-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
