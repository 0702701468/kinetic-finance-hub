import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  ArrowRightLeft, 
  Building2, 
  Truck, 
  Briefcase, 
  PiggyBank, 
  HandCoins, 
  CheckCircle2, 
  MessageSquare,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Smartphone,
  CreditCard,
  PieChart as ChartIcon,
  ShieldCheck
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";

// --- TYPES & MOCK DATA ---

type View = "dashboard" | "mpesa" | "expenses" | "income" | "transfers" | "banks" | "delivery" | "projects" | "savings" | "loans" | "reports" | "feedback" | "verification";

interface Transaction {
  id: string;
  type: "income" | "expense" | "transfer";
  category: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  account: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "1", type: "expense", category: "Delivery Fee", amount: 250, date: "2024-05-20", status: "completed", account: "M-Pesa" },
  { id: "2", type: "income", category: "Salary", amount: 45000, date: "2024-05-19", status: "completed", account: "Bank" },
  { id: "3", type: "transfer", category: "Transfer to Savings", amount: 5000, date: "2024-05-18", status: "completed", account: "M-Pesa" },
  { id: "4", type: "expense", category: "Loan Repayment", amount: 1200, date: "2024-05-17", status: "completed", account: "Bank" },
];

const REVENUE_DATA = [
  { name: "Jan", income: 4000, expenses: 2400 },
  { name: "Feb", income: 3000, expenses: 1398 },
  { name: "Mar", income: 2000, expenses: 9800 },
  { name: "Apr", income: 2780, expenses: 3908 },
  { name: "May", income: 1890, expenses: 4800 },
  { name: "Jun", income: 2390, expenses: 3800 },
];

const COLORS = ["#22D3EE", "#F59E0B", "#A855F7", "#10B981"];

// --- COMPONENTS ---

const Card = ({ children, title, icon: Icon, className = "" }: { children: React.ReactNode; title?: string; icon?: any; className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 ${className}`}
  >
    {title && (
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-cyan-400" />}
          {title}
        </h3>
        <button className="text-slate-400 hover:text-white transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    )}
    {children}
  </motion.div>
);

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <Card className="relative overflow-hidden group">
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
      <Icon className="w-16 h-16" style={{ color }} />
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-slate-400 text-sm font-medium">{title}</span>
      <span className="text-2xl font-bold text-white">{value}</span>
      <div className={`flex items-center gap-1 text-xs mt-2 ${change > 0 ? "text-emerald-400" : "text-rose-400"}`}>
        {change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {Math.abs(change)}% from last month
      </div>
    </div>
  </Card>
);

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      active 
        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.1)]" 
        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
    }`}
  >
    <Icon className={`w-5 h-5 ${active ? "text-cyan-400" : "text-slate-400"}`} />
    <span className="font-medium">{label}</span>
  </button>
);

// --- MAIN PAGES ---

const DashboardOverview = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="M-Pesa Balance" value="KES 12,450.00" change={12} icon={Smartphone} color="#22D3EE" />
      <StatCard title="Bank Balance" value="KES 245,000.00" change={-2} icon={Building2} color="#F59E0B" />
      <StatCard title="Total Savings" value="KES 85,300.00" change={8} icon={PiggyBank} color="#A855F7" />
      <StatCard title="Total Loans" value="KES 15,000.00" change={-5} icon={HandCoins} color="#E11D48" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card title="Money Flow" icon={ChartIcon} className="lg:col-span-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_DATA}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22D3EE" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="name" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{ backgroundColor: "#0F172A", border: "1px solid #1E293B", borderRadius: "12px" }}
                itemStyle={{ color: "#22D3EE" }}
              />
              <Area type="monotone" dataKey="income" stroke="#22D3EE" fillOpacity={1} fill="url(#colorIncome)" />
              <Area type="monotone" dataKey="expenses" stroke="#F59E0B" fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      <Card title="Quick Verification" icon={ShieldCheck}>
        <div className="space-y-4">
          <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
            <label className="text-xs text-slate-400 mb-1 block uppercase tracking-wider font-bold">Transaction Code</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="QE23RF..." 
                className="bg-transparent border-none outline-none text-white w-full font-mono"
              />
              <button className="p-2 bg-cyan-500 rounded-lg text-white hover:bg-cyan-600 transition-colors">
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-500 italic">Enter your M-Pesa transaction code to verify instant status.</p>
        </div>
      </Card>
    </div>

    <Card title="Recent Transactions" icon={ArrowRightLeft}>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 border-b border-slate-800">
              <th className="pb-4 font-medium">Category</th>
              <th className="pb-4 font-medium">Account</th>
              <th className="pb-4 font-medium">Date</th>
              <th className="pb-4 font-medium">Status</th>
              <th className="pb-4 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {MOCK_TRANSACTIONS.map((tx) => (
              <tr key={tx.id} className="text-slate-300 hover:bg-slate-800/30 transition-colors">
                <td className="py-4 font-medium text-white">{tx.category}</td>
                <td className="py-4">{tx.account}</td>
                <td className="py-4">{tx.date}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    tx.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {tx.status}
                  </span>
                </td>
                <td className={`py-4 text-right font-bold ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {tx.type === 'income' ? '+' : '-'}KES {tx.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const LoanManagement = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSTKPush = () => {
    if (!amount) return toast.error("Please enter repayment amount");
    setLoading(true);
    toast.info("Initiating M-Pesa STK Push...");
    
    setTimeout(() => {
      setLoading(false);
      toast.success("PIN prompt sent to 2547****123. Please check your phone.");
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Loan Repayment (M-Pesa STK)" icon={Smartphone}>
        <div className="space-y-6">
          <div className="p-6 bg-cyan-500/5 rounded-2xl border border-cyan-500/20">
            <h4 className="text-cyan-400 font-semibold mb-2">Loan Summary</h4>
            <div className="flex justify-between items-end">
              <div>
                <span className="text-3xl font-bold text-white">KES 15,000</span>
                <p className="text-slate-400 text-sm">Outstanding Balance</p>
              </div>
              <div className="text-right">
                <span className="text-rose-400 font-medium">Due in 12 days</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-slate-400 text-sm mb-2 block font-medium">Amount to Pay</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">KES</span>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-500 outline-none transition-all"
                />
              </div>
            </div>
            <button 
              onClick={handleSTKPush}
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
            >
              {loading ? "Processing..." : <>Pay with M-Pesa <Smartphone className="w-5 h-5" /></>}
            </button>
          </div>
        </div>
      </Card>

      <Card title="Active Loans" icon={HandCoins}>
        <div className="space-y-4">
          {[
            { id: 1, lender: "KingTech Capital", amount: 10000, interest: "5%", status: "Active" },
            { id: 2, lender: "Equity Bank", amount: 5000, interest: "12%", status: "Active" }
          ].map(loan => (
            <div key={loan.id} className="p-4 bg-slate-800/30 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <p className="text-white font-bold">{loan.lender}</p>
                <p className="text-slate-400 text-xs">Interest: {loan.interest}</p>
              </div>
              <div className="text-right">
                <p className="text-cyan-400 font-bold">KES {loan.amount.toLocaleString()}</p>
                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">{loan.status}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback) return toast.error("Please enter your message");
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setFeedback("");
      toast.success("Feedback submitted! Thank you for helping us improve.");
    }, 1500);
  };

  return (
    <Card title="Feedback & New Features" icon={MessageSquare} className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <p className="text-slate-400 text-sm">
          We're constantly improving KingTech Technologies. Let us know if you want a specific feature or if you've encountered any issues.
        </p>
        <div>
          <label className="text-slate-400 text-sm mb-2 block font-medium">Your Message</label>
          <textarea 
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={5}
            placeholder="Share your thoughts or suggest a new feature..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:border-cyan-500 outline-none transition-all resize-none"
          />
        </div>
        <button 
          type="submit"
          disabled={submitting}
          className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          {submitting ? "Sending..." : "Submit Feedback"}
        </button>
      </form>
    </Card>
  );
};

const AuthPage = ({ setAuth }: { setAuth: (val: boolean) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill in all fields");
    
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: isLogin ? 'Signing in...' : 'Creating account...',
        success: () => {
          setAuth(true);
          return isLogin ? "Welcome back to KingTech!" : "Account created successfully! Check your email for safety details.";
        },
        error: 'Authentication failed',
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/30 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-cyan-500/20 rounded-full blur-[128px]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-slate-900/40 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">KingTech Technologies</h1>
          <p className="text-slate-400 text-sm mt-1">{isLogin ? "Manage your money with precision" : "Join the future of finance"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs text-slate-400 uppercase tracking-widest font-bold ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400 uppercase tracking-widest font-bold ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-12 text-white focus:border-cyan-500 outline-none transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/25 active:scale-95"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-400 text-sm hover:text-white transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </button>
          
          <div className="flex items-center gap-4 text-slate-600">
            <div className="h-px flex-1 bg-slate-800" />
            <span className="text-[10px] uppercase tracking-widest font-bold">Secure Access</span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>
          
          <p className="text-[10px] text-slate-500 px-4">
            By signing in, you agree to KingTech's terms of service and security policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// --- APP COMPONENT ---

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isAuthenticated) return (
    <>
      <AuthPage setAuth={setIsAuthenticated} />
      <Toaster position="top-right" theme="dark" richColors />
    </>
  );

  const renderContent = () => {
    switch (currentView) {
      case "dashboard": return <DashboardOverview />;
      case "loans": return <LoanManagement />;
      case "feedback": return <FeedbackForm />;
      default: return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <LayoutDashboard className="w-10 h-10 text-slate-600" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">{currentView.charAt(0).toUpperCase() + currentView.slice(1)} Feature</h2>
          <p className="text-slate-400 max-w-sm">This section is currently being updated with real-time data integration. Check back soon!</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans flex">
      <Toaster position="top-right" theme="dark" richColors />
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#020617] border-r border-slate-800 transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">KingTech</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Technologies</p>
            </div>
          </div>

          <nav className="space-y-2">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold px-4 mb-2">Core Features</p>
            <SidebarItem icon={LayoutDashboard} label="Overview" active={currentView === "dashboard"} onClick={() => setCurrentView("dashboard")} />
            <SidebarItem icon={Smartphone} label="M-Pesa Tracker" active={currentView === "mpesa"} onClick={() => setCurrentView("mpesa")} />
            <SidebarItem icon={TrendingUp} label="Income/Expenses" active={currentView === "expenses"} onClick={() => setCurrentView("expenses")} />
            <SidebarItem icon={ArrowRightLeft} label="Transfers" active={currentView === "transfers"} onClick={() => setCurrentView("transfers")} />
            
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold px-4 mb-2 mt-6">Financials</p>
            <SidebarItem icon={Building2} label="Bank Accounts" active={currentView === "banks"} onClick={() => setCurrentView("banks")} />
            <SidebarItem icon={HandCoins} label="Loans & Repay" active={currentView === "loans"} onClick={() => setCurrentView("loans")} />
            <SidebarItem icon={PiggyBank} label="Savings" active={currentView === "savings"} onClick={() => setCurrentView("savings")} />
            <SidebarItem icon={Briefcase} label="Projects" active={currentView === "projects"} onClick={() => setCurrentView("projects")} />
            
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold px-4 mb-2 mt-6">System</p>
            <SidebarItem icon={FileText} label="Reports" active={currentView === "reports"} onClick={() => setCurrentView("reports")} />
            <SidebarItem icon={MessageSquare} label="Feedback" active={currentView === "feedback"} onClick={() => setCurrentView("feedback")} />
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-800">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-400/10 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="sticky top-0 z-40 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              <LayoutDashboard className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-white capitalize">{currentView === 'dashboard' ? 'Welcome Back, User!' : currentView}</h2>
              <p className="text-slate-400 text-xs">Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2">
              <Search className="w-4 h-4 text-slate-500" />
              <input type="text" placeholder="Search data..." className="bg-transparent border-none outline-none text-sm w-40" />
            </div>
            <button className="p-2 text-slate-400 hover:text-white relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full border-2 border-[#020617]" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
              <User className="w-6 h-6 text-slate-300" />
            </div>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}