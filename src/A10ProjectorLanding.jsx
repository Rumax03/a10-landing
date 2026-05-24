import { useState, useEffect, useRef } from "react";
import {
  Play, Wifi, MonitorSmartphone, Gamepad2, Sparkles, CheckCircle2,
  Star, Package, Zap, Volume2, Bluetooth, Sun, ChevronRight
} from "lucide-react";

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
      }}
    >
      {children}
    </div>
  );
}

const specs = [
  { label: "Разрешение", value: "4K UHD (3840 × 2160)" },
  { label: "Яркость", value: "800 ANSI lm" },
  { label: "Контрастность", value: "3000:1" },
  { label: "Срок службы", value: "30 000 часов" },
  { label: "ОС", value: "Android 13" },
  { label: "Wi-Fi", value: "2.4 / 5 ГГц (802.11ac)" },
  { label: "Bluetooth", value: "5.0" },
  { label: "Макс. экран", value: "150 дюймов" },
  { label: "Автофокус", value: "Есть, 1.5–5 м" },
  { label: "Аудио", value: "2 × 5 Вт (Dolby)" },
  { label: "Порты", value: "HDMI 2.0, USB-A, 3.5 мм" },
  { label: "Размер", value: "168 × 120 × 95 мм" },
];

const reviews = [
  {
    name: "Алексей М.",
    city: "Москва",
    rating: 5,
    date: "12 апр 2025",
    text: "Брал для просмотра фильмов дома — качество потрясающее. Автофокус срабатывает за секунду, Android 13 работает шустро. Netflix, Кинопоиск — всё ставится прямо на устройство. Доволен на 100%!",
  },
  {
    name: "Марина К.",
    city: "СПб",
    rating: 5,
    date: "3 мар 2025",
    text: "Компактный и лёгкий — беру в поездки. Подключила телефон по Miracast и смотрю на стене отеля. Для цены — просто огонь. Уже посоветовала трём подругам.",
  },
  {
    name: "Дмитрий Р.",
    city: "Краснодар",
    rating: 4,
    date: "18 фев 2025",
    text: "Играю на PlayStation через HDMI — экран на полстены, ощущения как в кино. Единственный минус — при ярком дневном свете лучше занавесить окна. Вечером картинка отличная.",
  },
];

const useCases = [
  { icon: <Play className="w-5 h-5" />, title: "Кино и сериалы", desc: "Netflix, YouTube, Кинопоиск прямо с Android 13 — без лишней приставки" },
  { icon: <Gamepad2 className="w-5 h-5" />, title: "Игры", desc: "HDMI-вход для приставки или ПК. Экран 100"+ — другие ощущения" },
  { icon: <MonitorSmartphone className="w-5 h-5" />, title: "Зеркалирование", desc: "Miracast с телефона или HDMI с ноутбука — за 10 секунд" },
  { icon: <Sun className="w-5 h-5" />, title: "Проекция на потолок", desc: "Ляг поудобнее — поверни объектив и смотри лёжа" },
];

export default function A10ProjectorLanding() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeSpecGroup, setActiveSpecGroup] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center px-6 py-20 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, rgba(245,158,11,0.35) 0%, transparent 65%)", transform: "translate(20%, -20%)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 65%)", transform: "translate(-20%, 20%)" }} />
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(to right, #fff 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full"
          style={{ transition: "opacity 0.7s ease, transform 0.7s ease", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(28px)" }}>

          {/* Left copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)" }}>
              <div className="flex">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
              </div>
              <span className="text-sm text-amber-200 font-medium">4.9 · 2 318 отзывов на Wildberries</span>
            </div>

            <h1 className="text-5xl md:text-[4.25rem] font-black leading-[0.92] tracking-tight">
              Домашний<br />
              <span style={{ background: "linear-gradient(90deg, #fde68a, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                кинотеатр
              </span><br />
              у тебя дома
            </h1>

            <p className="mt-6 text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", maxWidth: "460px" }}>
              Проектор A10 — 4K, Android 13, автофокус и Smart TV в одном корпусе. Экран до 150" на любой стене за 30 секунд.
            </p>

            {/* Price */}
            <div className="mt-7 flex items-baseline gap-3">
              <span className="text-4xl font-black">9 990 ₽</span>
              <span className="text-xl line-through" style={{ color: "rgba(255,255,255,0.3)" }}>14 990 ₽</span>
              <span className="px-2.5 py-1 rounded-lg text-sm font-bold"
                style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80" }}>−33%</span>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="px-7 py-4 rounded-2xl font-bold text-base text-black transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "#fbbf24" }}>
                Купить на Wildberries
              </button>
              <button className="px-7 py-4 rounded-2xl font-medium text-base flex items-center gap-2 transition-all duration-200 hover:scale-[1.02]"
                style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)" }}>
                <Play className="w-4 h-4 fill-white" /> Видеообзор
              </button>
            </div>

            {/* Trust signals */}
            <div className="mt-8 flex flex-wrap gap-5 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-400" /> Бесплатная доставка</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-400" /> Гарантия 1 год</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-400" /> Возврат 14 дней</span>
            </div>
          </div>

          {/* Right — projector mockup */}
          <div className="relative flex flex-col items-center">
            {/* Glow */}
            <div className="absolute w-72 h-72 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(251,191,36,0.18) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

            {/* Screen */}
            <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl mb-3 relative"
              style={{ aspectRatio: "16/9", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 0 80px rgba(251,191,36,0.12)" }}>
              {/* Movie still simulation */}
              <div className="w-full h-full relative"
                style={{ background: "linear-gradient(135deg, #0f0c29, #1a1a3e, #24243e)" }}>
                <div className="absolute inset-0"
                  style={{ background: "radial-gradient(ellipse at 30% 40%, rgba(139,92,246,0.45) 0%, transparent 55%), radial-gradient(ellipse at 75% 60%, rgba(59,130,246,0.35) 0%, transparent 50%), radial-gradient(ellipse at 60% 20%, rgba(251,191,36,0.15) 0%, transparent 40%)" }} />
                {/* Cinematic landscape hint */}
                <div className="absolute bottom-0 left-0 right-0 h-2/5"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }} />
                <div className="absolute" style={{ bottom: "18%", left: "10%", right: "10%", height: "30%", background: "linear-gradient(to top, #1a0a00, transparent)", borderRadius: "100% 100% 0 0", opacity: 0.6 }} />
                {/* Stars */}
                {[...Array(18)].map((_, i) => (
                  <div key={i} className="absolute rounded-full bg-white"
                    style={{ width: i % 3 === 0 ? 2 : 1, height: i % 3 === 0 ? 2 : 1, top: `${5 + Math.random() * 50}%`, left: `${Math.random() * 100}%`, opacity: 0.4 + Math.random() * 0.5 }} />
                ))}
                {/* Film bar top/bottom */}
                <div className="absolute top-0 left-0 right-0 h-[8%]" style={{ background: "rgba(0,0,0,0.8)" }} />
                <div className="absolute bottom-0 left-0 right-0 h-[8%]" style={{ background: "rgba(0,0,0,0.8)" }} />
                {/* UI overlay - bottom right badge */}
                <div className="absolute bottom-[10%] right-4 flex gap-1.5 text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
                  <span>4K</span><span>·</span><span>HDR10</span><span>·</span><span>Dolby</span>
                </div>
              </div>
            </div>

            {/* Projection beam */}
            <div className="w-32 h-5 mb-0" style={{
              background: "linear-gradient(to bottom, rgba(251,191,36,0.18), transparent)",
              clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
            }} />

            {/* Projector body */}
            <div className="relative flex items-center gap-4 px-5 rounded-[22px] shadow-2xl"
              style={{ width: "260px", height: "80px", background: "linear-gradient(160deg, #52525b, #27272a)", border: "1px solid rgba(255,255,255,0.12)" }}>
              {/* Lens assembly */}
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(145deg, #71717a, #3f3f46)", border: "3px solid #52525b", boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(145deg, #1e3a5f, #0a0a0a)", border: "2px solid #3b82f6" }}>
                    <div className="w-5 h-5 rounded-full"
                      style={{ background: "radial-gradient(circle at 35% 35%, rgba(147,197,253,0.5), #0a0a0a 70%)" }} />
                  </div>
                </div>
                {/* Beam dot */}
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "#fbbf24", boxShadow: "0 0 6px #fbbf24" }} />
              </div>

              {/* Body detail */}
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-bold tracking-[0.2em] mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>A10 PROJECTOR</div>
                <div className="flex gap-1 mb-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex-1 h-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }} />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#4ade80", boxShadow: "0 0 5px rgba(74,222,128,0.8)" }} />
                  <span className="text-[8px]" style={{ color: "rgba(255,255,255,0.3)" }}>ON · ANDROID 13</span>
                </div>
              </div>

              {/* Port strip */}
              <div className="flex flex-col gap-1.5 flex-shrink-0">
                <div className="w-5 h-2.5 rounded-sm" style={{ background: "#1a1a1a", border: "1px solid #52525b" }} />
                <div className="w-5 h-2.5 rounded-sm" style={{ background: "#1a1a1a", border: "1px solid #52525b" }} />
                <div className="w-3.5 h-2 rounded-sm" style={{ background: "#1a1a1a", border: "1px solid #52525b" }} />
              </div>

              {/* Vents */}
              <div className="absolute right-0 top-0 bottom-0 w-3 rounded-r-[22px] flex flex-col justify-center gap-[3px] px-[3px]">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="w-full h-[2px] rounded-full" style={{ background: "rgba(0,0,0,0.5)" }} />
                ))}
              </div>
            </div>

            {/* Shadow under projector */}
            <div className="w-52 h-3 rounded-full mt-2" style={{ background: "rgba(0,0,0,0.5)", filter: "blur(8px)" }} />
          </div>
        </div>
      </section>

      {/* ── SPEC STRIP ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
        className="py-4 px-6 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex gap-8 md:justify-center" style={{ minWidth: "max-content" }}>
          {[
            { icon: <Sparkles className="w-4 h-4" />, label: "4K UHD" },
            { icon: <MonitorSmartphone className="w-4 h-4" />, label: "Android 13" },
            { icon: <Wifi className="w-4 h-4" />, label: "Wi-Fi 5 ГГц" },
            { icon: <Zap className="w-4 h-4" />, label: "Автофокус" },
            { icon: <Volume2 className="w-4 h-4" />, label: "Dolby Audio" },
            { icon: <Bluetooth className="w-4 h-4" />, label: "Bluetooth 5.0" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm whitespace-nowrap" style={{ color: "rgba(255,255,255,0.55)" }}>
              <span className="text-amber-400">{icon}</span>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ── USE CASES ── */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black">Для чего его берут</h2>
            <p className="mt-3 text-lg" style={{ color: "rgba(255,255,255,0.45)" }}>Один проектор — миллион сценариев</p>
          </FadeIn>
          <div className="grid md:grid-cols-4 gap-5">
            {useCases.map((uc, i) => (
              <FadeIn key={uc.title} delay={i * 80}>
                <div className="group h-full rounded-3xl p-7 transition-all duration-300 cursor-default"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(251,191,36,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}>
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 text-amber-300"
                    style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.2)" }}>
                    {uc.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{uc.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{uc.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section className="px-6 py-24" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <FadeIn>
            <div className="rounded-3xl p-10" style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.1), rgba(99,102,241,0.08))", border: "1px solid rgba(255,255,255,0.09)" }}>
              <h2 className="text-4xl font-black leading-tight">Не просто проектор.<br />Это атмосфера.</h2>
              <p className="mt-5 text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                A10 создан для уютных вечеров, игровых марафонов, совместных просмотров и даже кино на потолке — просто ляг и расслабься.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Экран до 150 дюймов на любой стене",
                  "HDMI, USB, Miracast и Bluetooth",
                  "Корпус 168 × 120 × 95 мм — влезает в рюкзак",
                  "Работает от розетки — никаких батарей, никаких сюрпризов",
                ].map(item => (
                  <div key={item} className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                    <CheckCircle2 className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🎬", title: "Фильмы", sub: "до 150 дюймов" },
                { icon: "🎮", title: "Игры", sub: "HDMI-вход" },
                { icon: "📺", title: "Smart TV", sub: "Android 13" },
                { icon: "🌙", title: "Потолок", sub: "поворот объектива" },
              ].map(item => (
                <div key={item.title} className="aspect-square rounded-3xl p-6 flex flex-col justify-between"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <div className="font-bold text-xl">{item.title}</div>
                    <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TECH SPECS ── */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black">Характеристики</h2>
          </FadeIn>
          <FadeIn delay={60}>
            <div className="rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              {specs.map((spec, i) => (
                <div key={spec.label} className="flex justify-between items-center px-8 py-5"
                  style={{
                    background: i % 2 === 0 ? "rgba(255,255,255,0.025)" : "transparent",
                    borderBottom: i < specs.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none"
                  }}>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{spec.label}</span>
                  <span className="text-sm font-semibold text-white">{spec.value}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="px-6 py-24" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black">Что говорят покупатели</h2>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />)}</div>
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>4.9 из 5 · 2 318 отзывов</span>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <FadeIn key={r.name} delay={i * 80}>
                <div className="h-full rounded-3xl p-7 flex flex-col" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(r.rating)].map((_, j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>"{r.text}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #fbbf24, #f97316)" }}>
                        {r.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-white">{r.name}</div>
                        <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{r.city} · Wildberries</div>
                      </div>
                    </div>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{r.date}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={100} className="mt-8 text-center">
            <button className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: "rgba(255,255,255,0.45)" }}
              onMouseEnter={e => e.currentTarget.style.color = "#fff"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}>
              Читать все отзывы на Wildberries <ChevronRight className="w-4 h-4" />
            </button>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.12), transparent 65%)" }} />
        <FadeIn className="relative max-w-3xl mx-auto text-center">
          <Package className="w-11 h-11 text-amber-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black">Готов смотреть по-новому?</h2>
          <p className="mt-4 text-lg" style={{ color: "rgba(255,255,255,0.5)" }}>
            A10 Projector — заказывай сейчас и получи за 1–2 дня
          </p>
          <div className="mt-6 flex items-baseline justify-center gap-3">
            <span className="text-5xl font-black">9 990 ₽</span>
            <span className="text-2xl line-through" style={{ color: "rgba(255,255,255,0.25)" }}>14 990 ₽</span>
          </div>
          <button className="mt-8 px-10 py-5 rounded-2xl font-bold text-lg text-black transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            style={{ background: "#fbbf24" }}>
            Купить на Wildberries →
          </button>
          <div className="mt-7 flex flex-wrap justify-center gap-6 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            <span>✓ Бесплатная доставка</span>
            <span>✓ Гарантия 1 год</span>
            <span>✓ Возврат 14 дней</span>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
