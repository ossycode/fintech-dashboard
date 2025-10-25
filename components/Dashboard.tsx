"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Wallet2,
  Bot,
  Cpu,
  ShieldCheck,
  Lock,
  BadgeCheck,
  Activity,
  LogOut,
  MessageCircle,
  Heart,
  Share2,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// --- Mock Data ---
const market = [
  { sym: "BTC/USD", price: 67950, chg: 1.8 },
  { sym: "ETH/USD", price: 3510, chg: -0.6 },
  { sym: "EUR/USD", price: 1.086, chg: 0.2 },
  { sym: "XAU/USD", price: 2370, chg: 0.4 },
];

const balanceCards = [
  {
    key: "main",
    label: "Main Balance",
    value: 45230.12,
    delta: 2.3,
    icon: Wallet2,
  },
  {
    key: "trading",
    label: "Trading Balance",
    value: 18210.55,
    delta: -0.8,
    icon: Activity,
  },
  {
    key: "ai",
    label: "AI Trading Balance",
    value: 12150.0,
    delta: 4.1,
    icon: Bot,
  },
  {
    key: "mining",
    label: "Mining Balance",
    value: 9640.88,
    delta: 0.9,
    icon: Cpu,
  },
];

const perfData = Array.from({ length: 20 }, (_, i) => ({
  t: `W${i + 1}`,
  trading: 2000 + Math.sin(i / 2) * 700 + i * 80,
  ai: 1800 + Math.cos(i / 2) * 600 + i * 85,
  mining: 900 + Math.sin(i / 3) * 300 + i * 40,
}));

const portfolio = [
  { name: "Crypto", value: 55 },
  { name: "Forex", value: 20 },
  { name: "AI Bots", value: 15 },
  { name: "Mining", value: 10 },
];

const pieColors = ["#0ea5e9", "#9333ea", "#22c55e", "#eab308"]; // neon accents

const feed = [
  {
    user: "Nova Trader",
    tag: "Pro",
    text: "Scaled into BTC after a liquidity sweep. Stop tightened, targeting 68.8k.",
    likes: 128,
    comments: 14,
  },
  {
    user: "QuantCat",
    tag: "AI",
    text: "Deployed mean-reversion bot v2.1 on ETH/USDT, Sharpe 2.4 in backtest.",
    likes: 86,
    comments: 9,
  },
  {
    user: "PipsPilot",
    tag: "FX",
    text: "EUR/USD reacting to CPI. Watching 1.0850 as intraday pivot.",
    likes: 64,
    comments: 11,
  },
];

const bots = [
  {
    name: "Orion Grid",
    roi: 18.4,
    risk: "Low",
    theme: "from-cyan-500 to-emerald-500",
  },
  {
    name: "Nebula Alpha",
    roi: 32.1,
    risk: "Medium",
    theme: "from-fuchsia-500 to-violet-500",
  },
  {
    name: "Vortex Scout",
    roi: 51.3,
    risk: "High",
    theme: "from-amber-400 to-rose-500",
  },
];

const mining = {
  hash: "86.4 TH/s",
  uptime: "99.7%",
  reward: "0.0034 BTC / 24h",
};

// --- Small UI helpers ---
function Delta({ v }: { v: number }) {
  const up = v >= 0;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs ${
        up ? "text-emerald-400" : "text-rose-400"
      }`}
    >
      <Icon className="h-3 w-3" /> {Math.abs(v).toFixed(2)}%
    </span>
  );
}

function Sparkline({ dataKey, data }: { dataKey: string; data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={36}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke="#22c55e"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// --- Page ---
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur supports-backdrop-filter:bg-slate-950/60 py-6">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            {/* <div className="h-8 w-8 rounded-lg bg-linear-to-br from-sky-500 to-violet-600" /> */}
            <Image src={"/logo.png"} alt="logo" width={40} height={40} />
            <span className="font-semibold tracking-tight">Trading App</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            {["Home", "Trading", "AI Bots", "Mining", "About", "Help"].map(
              (i) => (
                <a
                  key={i}
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  {i}
                </a>
              )
            )}
            <Button variant="secondary" className="h-8 px-3 text-xs">
              Logout <LogOut className="ml-1 h-3.5 w-3.5" />
            </Button>
          </nav>
        </div>
        {/* Market Ticker */}
        <div className="border-t border-white/5">
          <div className="mx-auto flex max-w-7xl overflow-hidden px-4">
            <motion.div
              className="flex gap-8 py-2 text-xs text-slate-300"
              initial={{ x: 0 }}
              animate={{ x: [0, -400] }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            >
              {[...market, ...market, ...market].map((m, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <span className="text-slate-400">{m.sym}</span>
                  <span className="text-slate-100">{m.price}</span>
                  {m.chg >= 0 ? (
                    <span className="text-emerald-400 inline-flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {m.chg}%
                    </span>
                  ) : (
                    <span className="text-rose-400 inline-flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" />
                      {m.chg}%
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        {/* Balances */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {balanceCards.map((b, idx) => (
            <motion.div
              key={b.key}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="bg-slate-900/60 border-white/10 hover:border-white/20 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">
                    {b.label}
                  </CardTitle>
                  <div className="rounded-lg bg-white/5 p-2">
                    {React.createElement(b.icon, {
                      className: "h-4 w-4 text-slate-200",
                    })}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-2xl font-semibold text-slate-300">
                        ${b.value.toLocaleString()}
                      </div>
                      <Delta v={b.delta} />
                    </div>
                    <div className="w-24">
                      <Sparkline dataKey="trading" data={perfData} />
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="px-3 py-1.5 text-xs rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30">
                      Deposit
                    </button>
                    <button className="px-3 py-1.5 text-xs rounded-lg border border-white/10 text-slate-200 hover:bg-white/5">
                      Withdraw
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </section>

        {/* Performance & Allocation */}
        <section className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2 bg-slate-900/60 border-white/10">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-200">Profit & Loss</CardTitle>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Button variant="secondary" size="sm" className="h-7">
                    Today
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7">
                    Week
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7">
                    Month
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7">
                    Custom
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={perfData} margin={{ left: 8, right: 8 }}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="t"
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 8,
                    }}
                    labelStyle={{ color: "#e2e8f0" }}
                    itemStyle={{ color: "#e2e8f0" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="trading"
                    stroke="#0ea5e9"
                    fill="url(#g1)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/60 border-white/10 ">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-200">
                Portfolio Allocation
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie
                    data={portfolio}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {portfolio.map((_, i) => (
                      <Cell key={i} fill={pieColors[i % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 8,
                    }}
                    labelStyle={{ color: "#e2e8f0" }}
                    itemStyle={{ color: "#e2e8f0" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
                {portfolio.map((p, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span
                      className="inline-block h-2 w-2 rounded-sm"
                      style={{ background: pieColors[i] }}
                    />
                    {p.name} — {p.value}%
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Feed + Sidebar */}
        <section className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {feed.map((post, idx) => (
              <Card key={idx} className="bg-slate-900/60 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>NT</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-300">
                          {post.user}
                        </span>
                        <Badge className="border-white/10 text-slate-300">
                          {post.tag}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-slate-300">{post.text}</p>
                      <div className="mt-3 flex items-center gap-4 text-slate-400">
                        <button className="inline-flex items-center gap-1 hover:text-rose-400">
                          <Heart className="h-4 w-4" /> {post.likes}
                        </button>
                        <button className="inline-flex items-center gap-1 hover:text-sky-400">
                          <MessageCircle className="h-4 w-4" /> {post.comments}
                        </button>
                        <button className="inline-flex items-center gap-1 hover:text-emerald-400">
                          <Share2 className="h-4 w-4" /> Share
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="space-y-4">
            <Card className="bg-slate-900/60 border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-200">Top Traders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["AuroraX", "DeFiWhale", "QuantCat"].map((n, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{n.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium text-slate-300">
                          {n}
                        </div>
                        <div className="text-[11px] text-emerald-400 inline-flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" /> ROI{" "}
                          {Math.round(20 + i * 10)}%
                        </div>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" className="h-7">
                      Follow
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="bg-slate-900/60 border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-200">
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 text-xs">
                {[
                  "#BTC",
                  "#AI",
                  "#Scalping",
                  "#GridBot",
                  "#Mining",
                  "#Forex",
                ].map((t) => (
                  <Badge
                    key={t}
                    className="bg-white/5 hover:bg-white/10"
                    variant="default"
                  >
                    {t}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* AI Bots Preview */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">AI Trading Bots</h2>
            <Button variant="ghost" className="text-slate-300">
              View all <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {bots.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ y: 12, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="relative overflow-hidden border-white/10 bg-slate-900/60">
                  <div
                    className={`pointer-events-none absolute inset-0 bg-linear-to-br ${b.theme} opacity-20`}
                  />
                  <CardContent className="relative p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-slate-300">Bot</div>
                        <div className="text-lg font-semibold text-slate-100">
                          {b.name}
                        </div>
                      </div>
                      <div className="rounded-xl bg-white/5 p-3">
                        <Bot className="h-5 w-5 text-slate-100" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-slate-300">ROI</div>
                      <div className="text-emerald-400 font-semibold">
                        {b.roi}%
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-slate-300">
                      Risk: <span className="text-slate-100">{b.risk}</span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button className="flex-1">Run Bot</Button>
                      <Button variant="secondary" className="flex-1">
                        Subscribe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mining */}
        <section className="grid gap-4 md:grid-cols-3 ">
          <Card className="md:col-span-2 bg-slate-900/60 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-200">
                Mining Operations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3 text-slate-100">
                <Metric label="Hash Rate" value={mining.hash} />
                <Metric label="Uptime" value={mining.uptime} />
                <Metric label="Current Reward" value={mining.reward} />
              </div>
              <div className="mt-4 flex gap-2">
                <Button>Buy Mining Machine</Button>
                <Button variant="secondary">Invest in Pool</Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/60 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-200">Security & Trust</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm text-slate-100">
              <TrustItem icon={BadgeCheck} text="KYC/AML Compliant" />
              <TrustItem icon={Lock} text="Cold Wallet Custody" />
              <TrustItem icon={ShieldCheck} text="Insurance Protection" />
              <TrustItem icon={Activity} text="Real-Time Auditing" />
            </CardContent>
          </Card>
        </section>

        {/* CTA / Footer */}
        <section className="rounded-2xl border border-white/10 bg-linear-to-br from-slate-900 to-slate-950 p-6 text-center">
          <div className="text-lg font-semibold">Build your edge.</div>
          <p className="mx-auto mt-1 max-w-xl text-sm text-slate-300">
            Trade crypto & forex, deploy AI strategies, and grow with mining —
            all in one unified, real‑time platform.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Button>Open Trading</Button>
            <Button variant="secondary">Explore Bots</Button>
          </div>
        </section>

        <footer className="py-8 text-xs text-slate-400">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            <div className="space-x-3">
              <a href="#" className="hover:text-white">
                About
              </a>
              <a href="#" className="hover:text-white">
                Careers
              </a>
              <a href="#" className="hover:text-white">
                Legal
              </a>
              <a href="#" className="hover:text-white">
                Terms
              </a>
              <a href="#" className="hover:text-white">
                Privacy
              </a>
              <a href="#" className="hover:text-white">
                Support
              </a>
            </div>
            <div className="text-center md:text-left">© 2025 ApexX Finance</div>
            <div className="text-right space-x-3">
              <a href="#" className="hover:text-white">
                X
              </a>
              <a href="#" className="hover:text-white">
                Discord
              </a>
              <a href="#" className="hover:text-white">
                Telegram
              </a>
              <a href="#" className="hover:text-white">
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-slate-300">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}

function TrustItem({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-lg bg-white/5 p-2">
        <Icon className="h-4 w-4" />
      </div>
      <span>{text}</span>
    </div>
  );
}
