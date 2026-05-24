import { useState, useEffect, useRef } from "react";
import {
  Play, Wifi, MonitorSmartphone, Gamepad2, Sparkles, CheckCircle2,
  Star, Bluetooth, Sun, ChevronDown, Smartphone, Tv, Zap, Volume2,
  Shield, Truck, RotateCcw, ExternalLink
} from "lucide-react";

/* ─── Animation hook ─── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "", from = "bottom" }) {
  const [ref, inView] = useInView();
  const transforms = {
    bottom: inView ? "translateY(0)" : "translateY(40px)",
    left:   inView ? "translateX(0)" : "translateX(-40px)",
    right:  inView ? "translateX(0)" : "translateX(40px)",
  };
  return (
    <div ref={ref} className={className} style={{
      transition: `opacity 0.7s cubic-bezier(.4,0,.2,1) ${delay}ms, transform 0.7s cubic-bezier(.4,0,.2,1) ${delay}ms`,
      opacity: inView ? 1 : 0,
      transform: transforms[from],
    }}>
      {children}
    </div>
  );
}

/* ─── Data ─── */
const specs = [
  { label: "Разрешение",   value: "4K UHD · 3840×2160",    icon: "✦" },
  { label: "Яркость",      value: "800 ANSI лм",             icon: "☀" },
  { label: "Контрастность",value: "3000:1",                  icon: "◑" },
  { label: "Срок службы",  value: "30 000 часов",            icon: "⏱" },
  { label: "ОС",           value: "Android 13",              icon: "⬡" },
  { label: "Wi-Fi",        value: "2.4 / 5 ГГц (802.11ac)", icon: "⌁" },
  { label: "Bluetooth",    value: "5.0",                     icon: "⋈" },
  { label: "Макс. экран",  value: "150 дюймов",              icon: "⬜" },
  { label: "Автофокус",    value: "Есть · 1.5–5 м",          icon: "◎" },
  { label: "Аудио",        value: "2×5 Вт · Dolby",          icon: "♬" },
  { label: "Порты",        value: "HDMI 2.0, USB-A, 3.5 мм", icon: "⊟" },
  { label: "Размер",       value: "168×120×95 мм",           icon: "⬡" },
];

const whyCards = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "4K на любой стене",
    desc: "Кристально чёткое изображение до 150 дюймов — проектируй прямо на стену без экрана.",
    color: "#8b5cf6",
  },
  {
    icon: <MonitorSmartphone className="w-6 h-6" />,
    title: "Android 13 встроен",
    desc: "Netflix, YouTube, Кинопоиск — всё прямо на устройстве. Никаких приставок.",
    color: "#3b82f6",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Автофокус за 1 сек",
    desc: "Включил — уже смотришь. Никакой ручной настройки, чёткость с первой секунды.",
    color: "#6366f1",
  },
  {
    icon: <Volume2 className="w-6 h-6" />,
    title: "Dolby Audio 10 Вт",
    desc: "Встроенные стереодинамики с Dolby — полноценный кинозвук без внешних колонок.",
    color: "#8b5cf6",
  },
  {
    icon: <Bluetooth className="w-6 h-6" />,
    title: "Bluetooth 5.0",
    desc: "Подключай наушники, колонки, геймпад — провода не нужны.",
    color: "#3b82f6",
  },
  {
    icon: <Sun className="w-6 h-6" />,
    title: "Кино на потолке",
    desc: "Поверни объектив вверх, ляг и расслабься. Кино над головой — реальность.",
    color: "#6366f1",
  },
];

const connectSteps = [
  {
    step: "01",
    title: "Miracast / WiDi",
    subtitle: "Android и Windows",
    desc: "Открой «Трансляция экрана» на телефоне, выбери A10 — готово за 10 секунд. Без кабелей.",
    icon: <Wifi className="w-7 h-7" />,
    color: "#8b5cf6",
  },
  {
    step: "02",
    title: "AirPlay / DLNA",
    subtitle: "iPhone и iPad",
    desc: "Зеркало с iPhone через AirPlay или запусти видео напрямую через DLNA-приложение.",
    icon: <Smartphone className="w-7 h-7" />,
    color: "#3b82f6",
  },
  {
    step: "03",
    title: "HDMI-кабель",
    subtitle: "Ноутбук, PlayStation, Xbox",
    desc: "Подключи HDMI — экран на полстены для игр, презентаций или большого кино.",
    icon: <Tv className="w-7 h-7" />,
    color: "#6366f1",
  },
];

const reviews = [
  {
    name: "Алексей М.",
    city: "Москва",
    rating: 5,
    date: "12 апр 2025",
    text: "Брал для просмотра фильмов дома — качество потрясающее. Автофокус срабатывает за секунду, Android 13 работает шустро. Netflix, Кинопоиск — всё ставится прямо на устройство.",
  },
  {
    name: "Марина К.",
    city: "Санкт-Петербург",
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

const faq = [
  {
    q: "Нужен ли отдельный экран для проецирования?",
    a: "Нет. A10 отлично проецирует на белую стену, потолок или любую светлую поверхность. Для лучшей картинки можно использовать рулонный экран.",
  },
  {
    q: "Работает ли он при дневном свете?",
    a: "Лучше всего в затемнённом помещении. При закрытых шторах работает отлично. На открытом солнце — рекомендуем затемнение.",
  },
  {
    q: "Можно ли смотреть Netflix прямо с проектора?",
    a: "Да! Проектор работает на Android 13 — устанавливай Netflix, YouTube, Кинопоиск, ivi и любые другие приложения прямо из Play Market.",
  },
  {
    q: "Как быстро настраивается изображение?",
    a: "Автофокус срабатывает за 1–2 секунды. Просто включи, наведи на стену и нажми кнопку — чёткое изображение готово.",
  },
  {
    q: "Есть ли гарантия и возможность возврата?",
    a: "Да. Официальная гарантия 1 год + возврат в течение 14 дней без объяснения причин через Wildberries.",
  },
];

/* ─── Component ─── */
export default function A10ProjectorLanding() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: "#07070f", color: "#fff", minHeight: "100vh" }}>

      {/* ══════════ HERO ══════════ */}
      <section style={{ minHeight: "100svh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>

        {/* Ambient background */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", top: "-10%", right: "-5%",
            width: "70vw", height: "70vw", maxWidth: 800, maxHeight: 800,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 65%)",
          }} />
          <div style={{
            position: "absolute", bottom: "-10%", left: "-5%",
            width: "60vw", height: "60vw", maxWidth: 700, maxHeight: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 65%)",
          }} />
          {/* Subtle grid */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.035,
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </div>

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 10,
          maxWidth: 1200, margin: "0 auto",
          padding: "100px 24px 80px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
          transition: "opacity 0.8s ease, transform 0.8s ease",
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "none" : "translateY(30px)",
        }}
        className="hero-grid">

          {/* Left */}
          <div>
            {/* Rating badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "8px 16px", borderRadius: 100,
              background: "rgba(139,92,246,0.12)",
              border: "1px solid rgba(139,92,246,0.3)",
              marginBottom: 32,
            }}>
              <div style={{ display: "flex" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} style={{ width: 13, height: 13, color: "#a78bfa", fill: "#a78bfa" }} />
                ))}
              </div>
              <span style={{ fontSize: 13, color: "#c4b5fd", fontWeight: 500 }}>4.9 · 2 318 отзывов на Wildberries</span>
            </div>

            {/* Heading */}
            <h1 style={{
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: 0,
              color: "#fff",
            }}>
              Проектор A10 —<br />
              <span style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #60a5fa 60%, #818cf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                кинотеатр
              </span>{" "}
              у тебя дома
            </h1>

            <p style={{
              marginTop: 24,
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.55)",
              maxWidth: 480,
            }}>
              Android 13, 4K, Smart TV, Wi-Fi, Bluetooth и трансляция с телефона — всё в одном компактном устройстве.
            </p>

            {/* Price */}
            <div style={{ marginTop: 32, display: "flex", alignItems: "baseline", gap: 12 }}>
              <span style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900, color: "#fff" }}>9 990 ₽</span>
              <span style={{ fontSize: "1.25rem", textDecoration: "line-through", color: "rgba(255,255,255,0.25)" }}>14 990 ₽</span>
              <span style={{
                padding: "4px 10px", borderRadius: 8, fontSize: 13, fontWeight: 700,
                background: "rgba(52,211,153,0.15)", color: "#34d399",
              }}>−33%</span>
            </div>

            {/* CTAs */}
            <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a
                href="https://www.wildberries.ru"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "16px 28px", borderRadius: 16,
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  color: "#fff", fontWeight: 700, fontSize: 15,
                  textDecoration: "none",
                  boxShadow: "0 8px 32px rgba(124,58,237,0.4)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(124,58,237,0.55)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(124,58,237,0.4)"; }}
              >
                <ExternalLink style={{ width: 16, height: 16 }} />
                Смотреть на Wildberries
              </a>
              <button
                onClick={() => scrollTo("specs")}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "16px 28px", borderRadius: 16,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#fff", fontWeight: 600, fontSize: 15,
                  cursor: "pointer",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
              >
                Характеристики
              </button>
            </div>

            {/* Trust */}
            <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 20 }}>
              {[
                { icon: <Truck style={{ width: 15, height: 15 }} />, text: "Бесплатная доставка" },
                { icon: <Shield style={{ width: 15, height: 15 }} />, text: "Гарантия 1 год" },
                { icon: <RotateCcw style={{ width: 15, height: 15 }} />, text: "Возврат 14 дней" },
              ].map(({ icon, text }) => (
                <span key={text} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                  <span style={{ color: "#60a5fa" }}>{icon}</span>
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Right — cinematic screen mockup */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Glow halo */}
            <div style={{
              position: "absolute",
              width: "55%", maxWidth: 480, aspectRatio: "1/1",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }} />

            {/* Screen */}
            <div style={{
              width: "100%", maxWidth: 500,
              aspectRatio: "16/9",
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid rgba(139,92,246,0.25)",
              boxShadow: "0 0 80px rgba(99,102,241,0.2), 0 40px 80px rgba(0,0,0,0.6)",
              position: "relative",
            }}>
              {/* Cinematic gradient background */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(160deg, #0d0921 0%, #0a0f2e 40%, #030818 100%)",
              }} />
              <div style={{
                position: "absolute", inset: 0,
                background: `
                  radial-gradient(ellipse at 25% 35%, rgba(139,92,246,0.5) 0%, transparent 50%),
                  radial-gradient(ellipse at 75% 55%, rgba(59,130,246,0.4) 0%, transparent 50%),
                  radial-gradient(ellipse at 55% 15%, rgba(99,102,241,0.25) 0%, transparent 40%)
                `,
              }} />

              {/* Cinematic bars */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "9%", background: "rgba(0,0,0,0.85)", zIndex: 2 }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "9%", background: "rgba(0,0,0,0.85)", zIndex: 2 }} />

              {/* Subtle mountain silhouette */}
              <div style={{
                position: "absolute", bottom: "9%", left: 0, right: 0, height: "35%",
                background: "linear-gradient(to top, rgba(5,5,20,0.9) 0%, transparent 100%)",
                zIndex: 1,
              }} />
              <div style={{
                position: "absolute", bottom: "9%", left: "5%", right: "5%", height: "22%",
                background: "linear-gradient(to top, rgba(3,3,15,1), transparent)",
                borderRadius: "120% 120% 0 0",
                opacity: 0.7,
                zIndex: 1,
              }} />

              {/* Stars */}
              {[...Array(20)].map((_, i) => {
                const top = 5 + (i * 13.7 % 45);
                const left = (i * 17.3 % 98);
                const size = i % 4 === 0 ? 2.5 : 1.5;
                return (
                  <div key={i} style={{
                    position: "absolute",
                    top: `${top}%`, left: `${left}%`,
                    width: size, height: size,
                    borderRadius: "50%",
                    background: "#fff",
                    opacity: 0.3 + (i % 5) * 0.12,
                    zIndex: 1,
                  }} />
                );
              })}

              {/* Bottom overlay badge */}
              <div style={{
                position: "absolute", bottom: "12%", right: 16,
                display: "flex", gap: 6,
                fontSize: 10, fontFamily: "monospace",
                color: "rgba(167,139,250,0.7)",
                zIndex: 3,
              }}>
                <span>4K</span><span>·</span><span>HDR10</span><span>·</span><span>Dolby</span>
              </div>
            </div>

            {/* Projection beam */}
            <div style={{
              width: 110, height: 18,
              background: "linear-gradient(to bottom, rgba(139,92,246,0.22), transparent)",
              clipPath: "polygon(28% 0%, 72% 0%, 100% 100%, 0% 100%)",
            }} />

            {/* Projector body */}
            <div style={{
              position: "relative",
              width: 240, height: 74,
              background: "linear-gradient(160deg, #1e1e2e, #12121f)",
              border: "1px solid rgba(139,92,246,0.2)",
              borderRadius: 20,
              boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
              display: "flex", alignItems: "center",
              gap: 14, padding: "0 16px",
            }}>
              {/* Lens */}
              <div style={{ flexShrink: 0, position: "relative" }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: "linear-gradient(145deg, #2d2d4e, #1a1a30)",
                  border: "3px solid rgba(99,102,241,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.6)",
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "linear-gradient(145deg, #0d1a3a, #05050f)",
                    border: "2px solid rgba(59,130,246,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%",
                      background: "radial-gradient(circle at 35% 35%, rgba(147,197,253,0.4), #030810 65%)",
                    }} />
                  </div>
                </div>
                <div style={{
                  position: "absolute", top: 4, right: 4,
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#8b5cf6",
                  boxShadow: "0 0 8px rgba(139,92,246,0.9)",
                }} />
              </div>

              {/* Body info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 8, letterSpacing: "0.18em", color: "rgba(255,255,255,0.3)", fontWeight: 700, marginBottom: 8 }}>A10 PROJECTOR</div>
                <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>
                  {[...Array(9)].map((_, i) => (
                    <div key={i} style={{ flex: 1, height: 2, borderRadius: 1, background: "rgba(139,92,246,0.15)" }} />
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 6px rgba(52,211,153,0.8)" }} />
                  <span style={{ fontSize: 8, color: "rgba(255,255,255,0.28)" }}>ON · ANDROID 13</span>
                </div>
              </div>

              {/* Vents */}
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 12, borderRadius: "0 20px 20px 0", display: "flex", flexDirection: "column", justifyContent: "center", gap: 3, padding: "0 3px" }}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={{ height: 2, borderRadius: 1, background: "rgba(0,0,0,0.5)" }} />
                ))}
              </div>
            </div>

            {/* Shadow */}
            <div style={{ width: 180, height: 10, borderRadius: "50%", background: "rgba(0,0,0,0.5)", filter: "blur(8px)", marginTop: 6 }} />
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          color: "rgba(255,255,255,0.25)", fontSize: 12, cursor: "pointer",
          animation: "bounce 2s infinite",
        }} onClick={() => scrollTo("why")}>
          <span>Прокрутить</span>
          <ChevronDown style={{ width: 18, height: 18 }} />
        </div>
      </section>

      {/* ══════════ FEATURE STRIP ══════════ */}
      <div style={{
        borderTop: "1px solid rgba(139,92,246,0.12)",
        borderBottom: "1px solid rgba(139,92,246,0.12)",
        background: "rgba(139,92,246,0.04)",
        padding: "20px 24px",
        overflowX: "auto",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 40, justifyContent: "center", minWidth: "max-content" }}>
          {[
            { icon: <Sparkles style={{ width: 15, height: 15 }} />, label: "4K UHD" },
            { icon: <MonitorSmartphone style={{ width: 15, height: 15 }} />, label: "Android 13" },
            { icon: <Wifi style={{ width: 15, height: 15 }} />, label: "Wi-Fi 5 ГГц" },
            { icon: <Zap style={{ width: 15, height: 15 }} />, label: "Автофокус" },
            { icon: <Volume2 style={{ width: 15, height: 15 }} />, label: "Dolby Audio" },
            { icon: <Bluetooth style={{ width: 15, height: 15 }} />, label: "Bluetooth 5.0" },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
              <span style={{ color: "#a78bfa" }}>{icon}</span>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ WHY A10 ══════════ */}
      <section id="why" style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal className="text-center" style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontSize: 13, letterSpacing: "0.2em", color: "#a78bfa", fontWeight: 600, textTransform: "uppercase", marginBottom: 16 }}>Почему выбирают A10</p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, margin: 0, letterSpacing: "-0.03em" }}>Всё что нужно<br />для домашнего кино</h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {whyCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 70}>
                <div
                  style={{
                    padding: 32, borderRadius: 24,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    transition: "background 0.3s, border-color 0.3s, transform 0.3s",
                    cursor: "default",
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(139,92,246,0.07)";
                    e.currentTarget.style.borderColor = `${card.color}44`;
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 16,
                    background: `${card.color}18`,
                    border: `1px solid ${card.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: card.color, marginBottom: 20,
                  }}>
                    {card.icon}
                  </div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, margin: "0 0 10px", color: "#fff" }}>{card.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", margin: 0 }}>{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SPECS ══════════ */}
      <section id="specs" style={{ padding: "120px 24px", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(139,92,246,0.08)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontSize: 13, letterSpacing: "0.2em", color: "#a78bfa", fontWeight: 600, textTransform: "uppercase", marginBottom: 16 }}>Технические данные</p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, margin: 0, letterSpacing: "-0.03em" }}>Характеристики</h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              {specs.map((spec, i) => (
                <div key={spec.label} style={{
                  padding: "20px 24px",
                  borderRadius: 18,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "border-color 0.25s, background 0.25s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.35)"; e.currentTarget.style.background = "rgba(139,92,246,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                >
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>{spec.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{spec.value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ HOW TO CONNECT ══════════ */}
      <section id="connect" style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontSize: 13, letterSpacing: "0.2em", color: "#60a5fa", fontWeight: 600, textTransform: "uppercase", marginBottom: 16 }}>Подключение</p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, margin: 0, letterSpacing: "-0.03em" }}>Как подключить телефон</h2>
              <p style={{ marginTop: 16, fontSize: "1.05rem", color: "rgba(255,255,255,0.45)", maxWidth: 480, margin: "16px auto 0" }}>
                Три способа — выбирай тот, что удобнее
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {connectSteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 100}>
                <div style={{
                  padding: 36, borderRadius: 28,
                  background: `linear-gradient(135deg, ${step.color}0d 0%, rgba(255,255,255,0.02) 100%)`,
                  border: `1px solid ${step.color}22`,
                  position: "relative", overflow: "hidden",
                }}>
                  {/* Big step number */}
                  <div style={{
                    position: "absolute", top: -10, right: 20,
                    fontSize: 90, fontWeight: 900, lineHeight: 1,
                    color: `${step.color}10`, userSelect: "none",
                    fontVariantNumeric: "tabular-nums",
                  }}>
                    {step.step}
                  </div>

                  <div style={{
                    width: 56, height: 56, borderRadius: 18,
                    background: `${step.color}18`,
                    border: `1px solid ${step.color}35`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: step.color, marginBottom: 24, position: "relative",
                  }}>
                    {step.icon}
                  </div>

                  <div style={{ fontSize: 11, color: step.color, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{step.subtitle}</div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 800, margin: "0 0 12px", color: "#fff" }}>{step.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", margin: 0 }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ REVIEWS ══════════ */}
      <section id="reviews" style={{ padding: "120px 24px", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(139,92,246,0.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontSize: 13, letterSpacing: "0.2em", color: "#a78bfa", fontWeight: 600, textTransform: "uppercase", marginBottom: 16 }}>Покупатели о нас</p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, margin: "0 0 16px", letterSpacing: "-0.03em" }}>Отзывы</h2>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <div style={{ display: "flex" }}>
                  {[...Array(5)].map((_, i) => <Star key={i} style={{ width: 18, height: 18, color: "#a78bfa", fill: "#a78bfa" }} />)}
                </div>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.45)" }}>4.9 из 5 · 2 318 отзывов</span>
              </div>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={i * 80}>
                <div style={{
                  padding: 32, borderRadius: 24, height: "100%", boxSizing: "border-box",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  display: "flex", flexDirection: "column",
                  transition: "border-color 0.3s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
                >
                  <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                    {[...Array(r.rating)].map((_, j) => (
                      <Star key={j} style={{ width: 15, height: 15, color: "#a78bfa", fill: "#a78bfa" }} />
                    ))}
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.7)", margin: "0 0 auto", flex: 1, paddingBottom: 24 }}>
                    "{r.text}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: "50%",
                        background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontWeight: 800, fontSize: 14, flexShrink: 0,
                      }}>
                        {r.name[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>{r.name}</div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{r.city} · Wildberries</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>{r.date}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section id="faq" style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontSize: 13, letterSpacing: "0.2em", color: "#60a5fa", fontWeight: 600, textTransform: "uppercase", marginBottom: 16 }}>Вопросы и ответы</p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, margin: 0, letterSpacing: "-0.03em" }}>Частые вопросы</h2>
            </div>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faq.map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <div
                  style={{
                    borderRadius: 18,
                    border: `1px solid ${openFaq === i ? "rgba(139,92,246,0.35)" : "rgba(255,255,255,0.07)"}`,
                    background: openFaq === i ? "rgba(139,92,246,0.07)" : "rgba(255,255,255,0.03)",
                    overflow: "hidden",
                    transition: "border-color 0.25s, background 0.25s",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%", padding: "22px 28px",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      background: "none", border: "none", cursor: "pointer",
                      color: "#fff", textAlign: "left", gap: 16,
                    }}
                  >
                    <span style={{ fontSize: 16, fontWeight: 700, flex: 1 }}>{item.q}</span>
                    <ChevronDown style={{
                      width: 18, height: 18, flexShrink: 0,
                      color: "#a78bfa",
                      transition: "transform 0.3s",
                      transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                    }} />
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: "0 28px 24px", fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.6)" }}>
                      {item.a}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section style={{ padding: "120px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.18) 0%, transparent 65%)",
        }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 30% 80%, rgba(59,130,246,0.1) 0%, transparent 55%)" }} />

        <Reveal>
          <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "8px 18px", borderRadius: 100, marginBottom: 32,
              background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)",
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#a78bfa", boxShadow: "0 0 8px rgba(167,139,250,0.8)" }} />
              <span style={{ fontSize: 13, color: "#c4b5fd", fontWeight: 600 }}>Доступно на Wildberries</span>
            </div>

            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 900, margin: "0 0 20px", letterSpacing: "-0.03em" }}>
              Готов смотреть<br />по-новому?
            </h2>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.5)", marginBottom: 36, lineHeight: 1.7 }}>
              Заказывай сейчас — доставка 1–2 дня
            </p>

            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 14, marginBottom: 36 }}>
              <span style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 900 }}>9 990 ₽</span>
              <span style={{ fontSize: "1.4rem", textDecoration: "line-through", color: "rgba(255,255,255,0.2)" }}>14 990 ₽</span>
            </div>

            <a
              href="https://www.wildberries.ru"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "20px 44px", borderRadius: 18,
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                color: "#fff", fontWeight: 800, fontSize: 17,
                textDecoration: "none",
                boxShadow: "0 12px 48px rgba(124,58,237,0.45)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 16px 60px rgba(124,58,237,0.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 12px 48px rgba(124,58,237,0.45)"; }}
            >
              <ExternalLink style={{ width: 18, height: 18 }} />
              Купить на Wildberries →
            </a>

            <div style={{ marginTop: 32, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 24 }}>
              {["Бесплатная доставка", "Гарантия 1 год", "Возврат 14 дней"].map(t => (
                <span key={t} style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>✓ {t}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "24px",
        textAlign: "center",
        fontSize: 13,
        color: "rgba(255,255,255,0.2)",
      }}>
        © 2025 A10 Projector · Проектор для домашнего кинотеатра
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }

        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            padding-top: 90px !important;
          }
        }
      `}</style>
    </div>
  );
}
