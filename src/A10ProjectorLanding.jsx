import { useState, useEffect, useRef } from "react";
import {
  Wifi, MonitorSmartphone, CheckCircle2, Star, Bluetooth,
  Shield, Truck, RotateCcw, ExternalLink, ChevronDown,
  Play, Tv, Smartphone, Zap, Volume2, Sun, Eye
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

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      transition: `opacity 0.7s cubic-bezier(.4,0,.2,1) ${delay}ms, transform 0.7s cubic-bezier(.4,0,.2,1) ${delay}ms`,
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(36px)",
    }}>
      {children}
    </div>
  );
}

/* ─── Video Player Component ─── */
function VideoSection() {
  const videoRef          = useRef(null);
  const wrapRef           = useRef(null);
  const hideTimer         = useRef(null);
  const [secRef, inView]  = useInView(0.12);

  const [playing,  setPlaying]  = useState(true);   // autoplay starts muted
  const [muted,    setMuted]    = useState(true);    // must start muted for autoplay
  const [progress, setProgress] = useState(0);       // 0–100
  const [duration, setDuration] = useState(0);
  const [current,  setCurrent]  = useState(0);
  const [showCtrl, setShowCtrl] = useState(false);
  const [loaded,   setLoaded]   = useState(false);

  const fmt = (s) => isNaN(s) || s === 0 ? "0:00" : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  /* ── wire up real video events ── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onMeta  = () => setDuration(v.duration);
    const onTime  = () => { setCurrent(v.currentTime); setProgress(v.currentTime / v.duration * 100); };
    const onPlay  = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onLoad  = () => setLoaded(true);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("timeupdate",     onTime);
    v.addEventListener("play",           onPlay);
    v.addEventListener("pause",          onPause);
    v.addEventListener("canplay",        onLoad);
    return () => {
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("timeupdate",     onTime);
      v.removeEventListener("play",           onPlay);
      v.removeEventListener("pause",          onPause);
      v.removeEventListener("canplay",        onLoad);
    };
  }, []);

  const togglePlay = (e) => {
    e?.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.paused ? v.play() : v.pause();
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const seek = (e) => {
    e.stopPropagation();
    const rect  = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    videoRef.current.currentTime = ratio * videoRef.current.duration;
  };

  const fullscreen = (e) => {
    e.stopPropagation();
    const el = wrapRef.current;
    if (!el) return;
    if (!document.fullscreenElement) el.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  const revealControls = () => {
    setShowCtrl(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowCtrl(false), 3000);
  };

  return (
    <section id="video" ref={secRef} style={{ padding: "0 0 120px", position: "relative", overflow: "hidden" }}>

      {/* Section ambient background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "10%", left: "-5%", width: "50%", height: "80%", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "-5%", width: "45%", height: "70%", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 24px", position: "relative" }}>

        {/* ── Section header ── */}
        <div style={{
          textAlign: "center", paddingTop: 100, marginBottom: 56,
          transition: "opacity 0.7s ease, transform 0.7s ease",
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(32px)",
        }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, marginBottom: 20, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#a78bfa", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
            <span style={{ fontSize: 12, color: "#c4b5fd", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>Проектор в действии</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, margin: "0 0 14px", letterSpacing: "-0.03em" }}>
            Смотри как это работает
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.42)", maxWidth: 400, margin: "0 auto" }}>
            Картинка до 150 дюймов на любой стене — готово за 30 секунд
          </p>
        </div>

        {/* ── TV MOCKUP ── */}
        <div style={{
          transition: "opacity 0.9s ease 150ms, transform 0.9s ease 150ms",
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(56px)",
        }}>

          {/* Ambient screen glow (floor) */}
          <div style={{
            position: "absolute", left: "10%", right: "10%",
            height: 120, bottom: -30, zIndex: 0,
            background: playing
              ? "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.32) 0%, rgba(59,130,246,0.18) 45%, transparent 80%)"
              : "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.14) 0%, transparent 70%)",
            filter: "blur(32px)",
            transition: "background 1.2s ease",
          }} />

          {/* TV frame outer glow */}
          <div style={{
            position: "relative", borderRadius: 22,
            boxShadow: playing
              ? "0 0 0 1px rgba(139,92,246,0.35), 0 32px 80px rgba(99,102,241,0.28), 0 0 120px rgba(139,92,246,0.12)"
              : "0 0 0 1px rgba(255,255,255,0.08), 0 24px 60px rgba(0,0,0,0.55)",
            transition: "box-shadow 1.2s ease",
          }}>

            {/* TV bezel */}
            <div style={{
              background: "linear-gradient(180deg, #1a1a2a 0%, #111120 100%)",
              borderRadius: 22,
              padding: "10px 10px 0",
              border: "1px solid rgba(255,255,255,0.07)",
            }}>

              {/* ── SCREEN ── */}
              <div
                ref={wrapRef}
                onClick={togglePlay}
                onMouseMove={revealControls}
                onMouseLeave={() => { clearTimeout(hideTimer.current); setShowCtrl(false); }}
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16/9",
                  borderRadius: "14px 14px 0 0",
                  overflow: "hidden",
                  background: "#000",
                  cursor: playing ? "none" : "pointer",
                  display: "block",
                }}
              >
                {/* ── Real video ── */}
                <video
                  ref={videoRef}
                  src="/video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    zIndex: 1,
                    opacity: loaded ? 1 : 0,
                    transition: "opacity 0.6s ease",
                  }}
                />

                {/* Animated bg — shown while video loads or as fallback */}
                <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(155deg, #0a0520 0%, #070415 40%, #030210 100%)" }} />
                  <div className="vid-orb1" style={{ position: "absolute", width: "60%", height: "90%", top: "-20%", left: "-10%", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)", filter: "blur(50px)" }} />
                  <div className="vid-orb2" style={{ position: "absolute", width: "55%", height: "80%", bottom: "-20%", right: "-10%", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)", filter: "blur(60px)" }} />
                  <div className="vid-orb3" style={{ position: "absolute", width: "40%", height: "55%", top: "25%", left: "32%", borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 65%)", filter: "blur(40px)" }} />
                  {[...Array(14)].map((_, i) => (
                    <div key={i} className={`vid-p${(i % 4) + 1}`} style={{ position: "absolute", width: i % 3 === 0 ? 2.5 : 1.5, height: i % 3 === 0 ? 2.5 : 1.5, borderRadius: "50%", background: i % 2 === 0 ? "rgba(167,139,250,0.7)" : "rgba(147,197,253,0.5)", top: `${8 + (i * 19.3 % 78)}%`, left: `${4 + (i * 23.7 % 91)}%` }} />
                  ))}
                </div>

                {/* Screen sheen/glare */}
                <div style={{ position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none", background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.12) 100%)" }} />

                {/* Vignette */}
                <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", background: "radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,0.45) 100%)" }} />

                {/* ── Muted badge (top-right) ── */}
                {muted && (
                  <div
                    onClick={toggleMute}
                    style={{ position: "absolute", top: 14, right: 14, zIndex: 8, display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer", transition: "opacity 0.3s", opacity: showCtrl || !playing ? 1 : 0 }}>
                    <Volume2 style={{ width: 13, height: 13, color: "rgba(255,255,255,0.6)", opacity: 0.4 }} />
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", fontWeight: 600 }}>Нажми для звука</span>
                  </div>
                )}

                {/* ── PLAY BUTTON (center, shows when paused) ── */}
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 7, pointerEvents: "none", opacity: !playing ? 1 : 0, transition: "opacity 0.25s ease" }}>
                  <div className="play-ring play-ring-1" style={{ position: "absolute", width: 130, height: 130, borderRadius: "50%", border: "1.5px solid rgba(139,92,246,0.2)" }} />
                  <div className="play-ring play-ring-2" style={{ position: "absolute", width: 100, height: 100, borderRadius: "50%", border: "1.5px solid rgba(139,92,246,0.3)" }} />
                  <div className="play-btn" style={{ width: 76, height: 76, borderRadius: "50%", background: "linear-gradient(135deg, rgba(139,92,246,0.92), rgba(79,70,229,0.88))", border: "1.5px solid rgba(167,139,250,0.45)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(12px)", boxShadow: "0 0 36px rgba(139,92,246,0.6), 0 0 72px rgba(99,102,241,0.25), inset 0 1px 0 rgba(255,255,255,0.18)" }}>
                    <Play style={{ width: 28, height: 28, fill: "#fff", color: "#fff", marginLeft: 5 }} />
                  </div>
                </div>

                {/* ── CONTROLS BAR (glassmorphism, auto-hide) ── */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 8,
                    padding: "40px 18px 16px",
                    background: "linear-gradient(to top, rgba(3,2,12,0.92) 0%, rgba(3,2,12,0.6) 55%, transparent 100%)",
                    backdropFilter: "blur(0px)",
                    transition: "opacity 0.35s ease",
                    opacity: showCtrl || !playing ? 1 : 0,
                  }}
                >
                  {/* Progress track */}
                  <div
                    onClick={seek}
                    style={{ width: "100%", height: 3, borderRadius: 3, background: "rgba(255,255,255,0.18)", cursor: "pointer", position: "relative", marginBottom: 12 }}
                  >
                    <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${Math.min(100, progress + 8)}%`, borderRadius: 3, background: "rgba(255,255,255,0.12)" }} />
                    <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${progress}%`, borderRadius: 3, background: "linear-gradient(to right, #a78bfa, #6366f1)" }} />
                    <div style={{ position: "absolute", top: "50%", left: `${progress}%`, transform: "translate(-50%,-50%)", width: 11, height: 11, borderRadius: "50%", background: "#fff", boxShadow: "0 0 8px rgba(167,139,250,0.9)" }} />
                  </div>

                  {/* Row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      {/* Play/Pause */}
                      <button onClick={togglePlay} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 2, display: "flex" }}>
                        {playing
                          ? <span style={{ display:"flex",gap:3 }}><span style={{width:3,height:14,borderRadius:1,background:"#fff",display:"block"}} /><span style={{width:3,height:14,borderRadius:1,background:"#fff",display:"block"}} /></span>
                          : <Play style={{ width: 15, height: 15, fill: "#fff" }} />}
                      </button>
                      {/* Mute */}
                      <button onClick={toggleMute} style={{ background: "none", border: "none", cursor: "pointer", color: muted ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.75)", padding: 2, display: "flex" }}>
                        <Volume2 style={{ width: 15, height: 15 }} />
                      </button>
                      {/* Time */}
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "monospace", letterSpacing: "0.05em" }}>
                        {fmt(current)} / {fmt(duration)}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", padding: "2px 6px", borderRadius: 3, border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.55)" }}>HD</span>
                      <button onClick={fullscreen} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.65)", padding: 2, display: "flex" }}>
                        <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    </div>
                  </div>
                </div>

              </div>{/* /screen */}

              {/* TV bottom bar */}
              <div style={{ height: 14, background: "linear-gradient(180deg, #14142a 0%, #0e0e1e 100%)", borderRadius: "0 0 4px 4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 40, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.06)" }} />
              </div>
            </div>{/* /TV bezel */}

            {/* TV stand neck */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: 80, height: 18, background: "linear-gradient(180deg, #111120 0%, #0c0c1a 100%)", borderRadius: "0 0 6px 6px", boxShadow: "0 4px 12px rgba(0,0,0,0.5)" }} />
            </div>
            {/* TV stand base */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: 180, height: 8, borderRadius: "0 0 12px 12px", background: "linear-gradient(180deg, #0e0e1e 0%, #090915 100%)", boxShadow: "0 6px 20px rgba(0,0,0,0.4)" }} />
            </div>

          </div>{/* /TV frame outer glow */}

          {/* ── Below-player info row ── */}
          <div style={{ marginTop: 32, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, padding: "0 2px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399", display: "inline-block", boxShadow: "0 0 6px rgba(52,211,153,0.85)", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.38)" }}>
                {playing ? "Автовоспроизведение · A10 Projector" : "Нажми для воспроизведения"}
              </span>
            </div>
            <div style={{ display: "flex", gap: 18 }}>
              {["Full HD", "Smart TV", "Автофокус"].map(t => (
                <span key={t} style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ color: "rgba(139,92,246,0.55)" }}>✦</span>{t}
                </span>
              ))}
            </div>
          </div>

        </div>{/* /TV mockup */}
      </div>
    </section>
  );
}

/* ─── Data ─── */
const WB_LINK = "https://www.wildberries.ru/catalog/454435141/detail.aspx";

const advantages = [
  {
    icon: <Tv className="w-7 h-7" />,
    title: "Smart TV без телефона",
    desc: "YouTube, Кинопоиск, VK Video и ещё тысячи приложений — прямо в проекторе. Никаких приставок и кабелей.",
    color: "#8b5cf6",
    tag: "Встроен Android",
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Автофокус — картинка за секунду",
    desc: "Включил, навёл на стену — уже смотришь в чёткой картинке. Никакой ручной настройки.",
    color: "#6366f1",
    tag: "Умный автофокус",
  },
  {
    icon: <Eye className="w-7 h-7" />,
    title: "Экран до 150 дюймов",
    desc: "Проецируй на белую стену, потолок или рулонный экран. Размер изображения — как в настоящем кинозале.",
    color: "#3b82f6",
    tag: "Full HD 1920×1080",
  },
  {
    icon: <Volume2 className="w-7 h-7" />,
    title: "Встроенный динамик",
    desc: "Мощный встроенный динамик — звук не просто есть, он громкий и чистый. Внешние колонки — опционально.",
    color: "#8b5cf6",
    tag: "Встроенный звук",
  },
  {
    icon: <Smartphone className="w-7 h-7" />,
    title: "Трансляция с телефона",
    desc: "Подключи Android или iPhone по Wi-Fi — экран телефона сразу на стене. Работает без проводов.",
    color: "#6366f1",
    tag: "Miracast / AirPlay",
  },
  {
    icon: <Sun className="w-7 h-7" />,
    title: "Кино на потолке",
    desc: "Поверни объектив вверх, ляг на диван и смотри над головой. Идеально для вечернего просмотра лёжа.",
    color: "#3b82f6",
    tag: "Проекция 360°",
  },
];

const specs = [
  { label: "Разрешение",        value: "Full HD · 1920×1080" },
  { label: "Контрастность",     value: "2000:1" },
  { label: "Формат экрана",     value: "16:9" },
  { label: "Встроенная память", value: "16 ГБ" },
  { label: "Smart TV",          value: "YouTube, VK Video, Кинопоиск" },
  { label: "Подключение",       value: "Wi-Fi · Bluetooth · HDMI" },
  { label: "Автофокус",         value: "Есть — автоматически" },
  { label: "Напряжение",        value: "220 В" },
  { label: "Гарантийный срок",  value: "1 год" },
  { label: "Артикул WB",        value: "454435141" },
];

const connectSteps = [
  {
    step: "01",
    icon: <Wifi className="w-7 h-7" />,
    title: "Трансляция экрана",
    sub: "Android · Windows",
    desc: "Открой «Трансляция экрана» в настройках телефона, выбери проектор A10 из списка — соединение за 10 секунд.",
    color: "#8b5cf6",
  },
  {
    step: "02",
    icon: <Smartphone className="w-7 h-7" />,
    title: "iPhone / iPad",
    sub: "AirPlay · DLNA",
    desc: "Используй AirPlay или DLNA-приложение. Смотри видео, фото и презентации прямо со своего iPhone.",
    color: "#3b82f6",
  },
  {
    step: "03",
    icon: <Tv className="w-7 h-7" />,
    title: "HDMI-кабель",
    sub: "ПК · PlayStation · Xbox",
    desc: "Подключи ноутбук или приставку через HDMI — экран на полстены для игр или работы.",
    color: "#6366f1",
  },
];

const reviews = [
  {
    name: "Алёна Ш.",
    city: "Москва",
    rating: 5,
    date: "5 апр 2025",
    text: "Я эту штуку теперь безумно обожаю. Даже на светлых обоях всё ярко. Звук отличный — за 6к громыхает нормально! Шуршание проектора перестаёшь замечать почти сразу, просмотру не мешает совсем. Это потрясающий проектор за копейки!",
  },
  {
    name: "Мила А.",
    city: "СПб",
    rating: 5,
    date: "13 апр 2025",
    text: "Качество бомба, настроила очень быстро. Ещё положили в подарок попкорн — очень мило! Картинка чёткая, цвета яркие. Рекомендую всем, кто хочет домашний кинотеатр без огромных затрат.",
  },
  {
    name: "Ульяна К.",
    city: "Краснодар",
    rating: 5,
    date: "10 мая 2025",
    text: "Классный проектор, очень удобный и многофункциональный. Единственный минус — небольшой шум (как вентилятор ноутбука), но при нормальной громкости совсем не слышно. Качество, компактность, цена — всё на высоте!",
  },
];

const faq = [
  {
    q: "Нужен ли VPN для YouTube?",
    a: "Да, официальный YouTube требует VPN. Многие покупатели успешно используют бесплатные VPN-приложения (например, 1.1.1.1 или Windscribe). Установка занимает 2 минуты — и YouTube работает в полном экране без ограничений.",
  },
  {
    q: "Работает ли проектор при дневном свете?",
    a: "Лучше всего в затемнённой комнате — так картинка самая яркая и насыщенная. При задёрнутых шторах днём работает отлично. Несколько покупателей отметили, что даже на светлых обоях при дневном свете картинка видна нормально.",
  },
  {
    q: "Нужен ли отдельный экран или достаточно стены?",
    a: "Отдельный экран не нужен. Проектор отлично работает на белой или светлой стене. Для максимального качества подойдёт светло-серая или белая поверхность. Рулонный экран можно докупить при желании.",
  },
  {
    q: "Шумит ли проектор во время работы?",
    a: "Небольшой шум вентилятора есть — как у работающего ноутбука. При нормальной громкости просмотра (50–70%) вентилятор практически не слышно. Это стандартная особенность проекторов начального уровня.",
  },
  {
    q: "Как подключить телефон без проводов?",
    a: "На Android: Settings → «Трансляция» или «Беспроводной дисплей» → выбери A10. На iPhone: AirPlay или DLNA-приложение. Соединение занимает около 10 секунд. Подробная инструкция есть в комплекте.",
  },
  {
    q: "Какая реальная гарантия и можно ли вернуть?",
    a: "Официальная гарантия 1 год от производителя. Возврат через Wildberries в течение 14 дней без объяснения причин. Продавец Wild Firms известен быстрым одобрением возвратов — несколько покупателей это подтверждают в отзывах.",
  },
];

/* ─── Main component ─── */
export default function A10ProjectorLanding() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: "#07070f", color: "#fff", minHeight: "100vh" }}>

      {/* ══════════ HERO ══════════ */}
      <section style={{ minHeight: "100svh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>

        {/* Ambient glows */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", top: "-15%", right: "-10%",
            width: "65vw", height: "65vw", maxWidth: 780, maxHeight: 780,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 65%)",
          }} />
          <div style={{
            position: "absolute", bottom: "-10%", left: "-5%",
            width: "55vw", height: "55vw", maxWidth: 650, maxHeight: 650,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.16) 0%, transparent 65%)",
          }} />
          <div style={{
            position: "absolute", inset: 0, opacity: 0.033,
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </div>

        {/* Hero content */}
        <div style={{
          position: "relative", zIndex: 10,
          maxWidth: 1200, margin: "0 auto", width: "100%",
          padding: "100px 24px 80px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64, alignItems: "center",
          transition: "opacity 0.8s ease, transform 0.8s ease",
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "none" : "translateY(30px)",
        }} className="hero-grid">

          {/* Left copy */}
          <div>
            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "8px 16px", borderRadius: 100, marginBottom: 28,
              background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.28)",
            }}>
              <div style={{ display: "flex", gap: 1 }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} style={{ width: 12, height: 12, color: "#a78bfa", fill: "#a78bfa" }} />
                ))}
              </div>
              <span style={{ fontSize: 13, color: "#c4b5fd", fontWeight: 600 }}>4.8 · 261 отзыв · Wildberries</span>
            </div>

            {/* Heading */}
            <h1 style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 900, lineHeight: 1.06, letterSpacing: "-0.03em",
              margin: 0, color: "#fff",
            }}>
              Домашний<br />
              <span style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #60a5fa 55%, #818cf8 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>кинотеатр</span><br />
              на любой стене
            </h1>

            {/* Subheading */}
            <p style={{
              marginTop: 22, fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              lineHeight: 1.7, color: "rgba(255,255,255,0.55)", maxWidth: 460,
            }}>
              Проектор A10 — Smart TV, автофокус, Full HD и трансляция с телефона.
              YouTube, Кинопоиск, VK Video прямо в проекторе — без телефона и приставки.
            </p>

            {/* App logos strip */}
            <div style={{
              marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8,
            }}>
              {["YouTube", "Кинопоиск", "VK Video", "Smart TV"].map(app => (
                <span key={app} style={{
                  padding: "5px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.65)",
                }}>
                  {app}
                </span>
              ))}
            </div>

            {/* Price */}
            <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <span style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900, color: "#fff" }}>6 098 ₽</span>
              <span style={{ fontSize: "1.2rem", textDecoration: "line-through", color: "rgba(255,255,255,0.22)" }}>29 000 ₽</span>
              <span style={{
                padding: "5px 12px", borderRadius: 10, fontSize: 13, fontWeight: 800,
                background: "rgba(52,211,153,0.15)", color: "#34d399",
              }}>−79%</span>
            </div>

            {/* CTAs */}
            <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a
                href={WB_LINK}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "16px 28px", borderRadius: 16,
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  color: "#fff", fontWeight: 700, fontSize: 15, textDecoration: "none",
                  boxShadow: "0 8px 32px rgba(124,58,237,0.4)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 14px 44px rgba(124,58,237,0.55)"; }}
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
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.11)",
                  color: "#fff", fontWeight: 600, fontSize: 15, cursor: "pointer",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.45)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.11)"; }}
              >
                Характеристики
              </button>
            </div>

            {/* Trust row */}
            <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 18 }}>
              {[
                { icon: <Truck style={{ width: 14, height: 14 }} />, text: "Бесплатная доставка" },
                { icon: <Shield style={{ width: 14, height: 14 }} />, text: "Гарантия 1 год" },
                { icon: <RotateCcw style={{ width: 14, height: 14 }} />, text: "Возврат 14 дней" },
              ].map(({ icon, text }) => (
                <span key={text} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                  <span style={{ color: "#60a5fa" }}>{icon}</span>{text}
                </span>
              ))}
            </div>
          </div>

          {/* Right — screen + projector mockup */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
            {/* Glow */}
            <div style={{
              position: "absolute", width: "60%", maxWidth: 460, aspectRatio: "1/1",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)",
              filter: "blur(50px)", pointerEvents: "none",
            }} />

            {/* Screen */}
            <div style={{
              width: "100%", maxWidth: 500, aspectRatio: "16/9",
              borderRadius: 18, overflow: "hidden", position: "relative",
              border: "1px solid rgba(139,92,246,0.22)",
              boxShadow: "0 0 90px rgba(99,102,241,0.18), 0 40px 80px rgba(0,0,0,0.65)",
            }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(155deg, #0d0921 0%, #0a0f2e 45%, #030818 100%)" }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse at 25% 35%, rgba(139,92,246,0.5) 0%, transparent 50%), radial-gradient(ellipse at 75% 55%, rgba(59,130,246,0.4) 0%, transparent 50%)",
              }} />
              {/* Cinematic bars */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "9%", background: "rgba(0,0,0,0.9)", zIndex: 2 }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "9%", background: "rgba(0,0,0,0.9)", zIndex: 2 }} />
              {/* Horizon */}
              <div style={{ position: "absolute", bottom: "9%", left: 0, right: 0, height: "32%", background: "linear-gradient(to top, rgba(4,4,18,0.92), transparent)", zIndex: 1 }} />
              <div style={{ position: "absolute", bottom: "9%", left: "8%", right: "8%", height: "20%", background: "linear-gradient(to top, #020210, transparent)", borderRadius: "120% 120% 0 0", opacity: 0.75, zIndex: 1 }} />
              {/* Stars */}
              {[...Array(22)].map((_, i) => (
                <div key={i} style={{
                  position: "absolute",
                  top: `${5 + (i * 11.7 % 45)}%`, left: `${(i * 17.3 % 98)}%`,
                  width: i % 4 === 0 ? 2.5 : 1.5, height: i % 4 === 0 ? 2.5 : 1.5,
                  borderRadius: "50%", background: "#fff",
                  opacity: 0.25 + (i % 6) * 0.1, zIndex: 1,
                }} />
              ))}
              {/* Badge */}
              <div style={{ position: "absolute", bottom: "12%", right: 14, display: "flex", gap: 5, fontSize: 10, fontFamily: "monospace", color: "rgba(167,139,250,0.65)", zIndex: 3 }}>
                <span>Full HD</span><span>·</span><span>Smart TV</span><span>·</span><span>Автофокус</span>
              </div>
              {/* Play icon center */}
              <div style={{
                position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 2,
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: "rgba(139,92,246,0.3)", border: "1.5px solid rgba(167,139,250,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)",
                }}>
                  <Play style={{ width: 20, height: 20, fill: "#fff", color: "#fff", marginLeft: 3 }} />
                </div>
              </div>
            </div>

            {/* Beam */}
            <div style={{
              width: 100, height: 16,
              background: "linear-gradient(to bottom, rgba(139,92,246,0.2), transparent)",
              clipPath: "polygon(28% 0%, 72% 0%, 100% 100%, 0% 100%)",
            }} />

            {/* Projector body */}
            <div style={{
              position: "relative", width: 240, height: 72,
              background: "linear-gradient(160deg, #1c1c2e, #0f0f1e)",
              border: "1px solid rgba(139,92,246,0.18)", borderRadius: 20,
              boxShadow: "0 20px 60px rgba(0,0,0,0.75)",
              display: "flex", alignItems: "center", gap: 14, padding: "0 16px",
            }}>
              {/* Lens */}
              <div style={{ flexShrink: 0, position: "relative" }}>
                <div style={{ width: 50, height: 50, borderRadius: "50%", background: "linear-gradient(145deg, #28283e, #181828)", border: "3px solid rgba(99,102,241,0.28)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(0,0,0,0.6)" }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(145deg, #0d1a3a, #04040f)", border: "2px solid rgba(59,130,246,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, rgba(147,197,253,0.35), #030810 65%)" }} />
                  </div>
                </div>
                <div style={{ position: "absolute", top: 3, right: 3, width: 7, height: 7, borderRadius: "50%", background: "#8b5cf6", boxShadow: "0 0 7px rgba(139,92,246,0.9)" }} />
              </div>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 8, letterSpacing: "0.18em", color: "rgba(255,255,255,0.28)", fontWeight: 700, marginBottom: 7 }}>A10 PROJECTOR · WILD FIRMS</div>
                <div style={{ display: "flex", gap: 2, marginBottom: 7 }}>
                  {[...Array(10)].map((_, i) => <div key={i} style={{ flex: 1, height: 1.5, borderRadius: 1, background: "rgba(139,92,246,0.18)" }} />)}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 5px rgba(52,211,153,0.8)" }} />
                  <span style={{ fontSize: 8, color: "rgba(255,255,255,0.25)" }}>ON · SMART TV</span>
                </div>
              </div>
              {/* Vents */}
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 10, borderRadius: "0 20px 20px 0", display: "flex", flexDirection: "column", justifyContent: "center", gap: 3, padding: "0 2px" }}>
                {[...Array(6)].map((_, i) => <div key={i} style={{ height: 1.5, borderRadius: 1, background: "rgba(0,0,0,0.5)" }} />)}
              </div>
            </div>

            {/* Shadow */}
            <div style={{ width: 160, height: 8, borderRadius: "50%", background: "rgba(0,0,0,0.55)", filter: "blur(8px)", marginTop: 5 }} />
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.22)", fontSize: 12, cursor: "pointer", animation: "bounce 2.2s ease-in-out infinite" }} onClick={() => scrollTo("advantages")}>
          <span>Прокрутить вниз</span>
          <ChevronDown style={{ width: 16, height: 16 }} />
        </div>
      </section>

      {/* ══════════ VIDEO ══════════ */}
      <VideoSection />

      {/* ══════════ STRIP ══════════ */}
      <div style={{ borderTop: "1px solid rgba(139,92,246,0.1)", borderBottom: "1px solid rgba(139,92,246,0.1)", background: "rgba(139,92,246,0.04)", padding: "18px 24px", overflowX: "auto" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 36, justifyContent: "center", minWidth: "max-content" }}>
          {[
            { icon: <MonitorSmartphone style={{ width: 14, height: 14 }} />, label: "Smart TV" },
            { icon: <Wifi style={{ width: 14, height: 14 }} />, label: "Wi-Fi" },
            { icon: <Bluetooth style={{ width: 14, height: 14 }} />, label: "Bluetooth" },
            { icon: <Zap style={{ width: 14, height: 14 }} />, label: "Автофокус" },
            { icon: <Volume2 style={{ width: 14, height: 14 }} />, label: "Встроенный динамик" },
            { icon: <Shield style={{ width: 14, height: 14 }} />, label: "Гарантия 1 год" },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
              <span style={{ color: "#a78bfa" }}>{icon}</span>{label}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ ADVANTAGES ══════════ */}
      <section id="advantages" style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontSize: 12, letterSpacing: "0.22em", color: "#a78bfa", fontWeight: 700, textTransform: "uppercase", marginBottom: 14 }}>Почему выбирают A10</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.9rem)", fontWeight: 900, margin: 0, letterSpacing: "-0.03em" }}>6 причин купить<br />этот проектор</h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 18 }}>
            {advantages.map((item, i) => (
              <Reveal key={item.title} delay={i * 65}>
                <div
                  style={{
                    padding: "30px 28px", borderRadius: 22,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    height: "100%", boxSizing: "border-box",
                    transition: "background 0.3s, border-color 0.3s, transform 0.3s",
                    cursor: "default",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${item.color}0d`; e.currentTarget.style.borderColor = `${item.color}40`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 15, background: `${item.color}18`, border: `1px solid ${item.color}28`, display: "flex", alignItems: "center", justifyContent: "center", color: item.color }}>
                      {item.icon}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 8, background: `${item.color}14`, color: item.color, letterSpacing: "0.05em" }}>
                      {item.tag}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 10px", color: "#fff" }}>{item.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.72, color: "rgba(255,255,255,0.5)", margin: 0 }}>{item.desc}</p>
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
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <p style={{ fontSize: 12, letterSpacing: "0.22em", color: "#60a5fa", fontWeight: 700, textTransform: "uppercase", marginBottom: 14 }}>Технические данные</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.9rem)", fontWeight: 900, margin: 0, letterSpacing: "-0.03em" }}>Характеристики</h2>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 12 }}>
              {specs.map((s) => (
                <div key={s.label}
                  style={{ padding: "20px 22px", borderRadius: 18, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", transition: "border-color 0.25s, background 0.25s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.32)"; e.currentTarget.style.background = "rgba(139,92,246,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                >
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.33)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{s.value}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Disclaimer */}
          <Reveal delay={120}>
            <p style={{ marginTop: 24, textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.25)", lineHeight: 1.6 }}>
              Характеристики актуальны на дату публикации. Уточняйте детали на странице товара на Wildberries.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════ HOW TO CONNECT ══════════ */}
      <section id="connect" style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontSize: 12, letterSpacing: "0.22em", color: "#60a5fa", fontWeight: 700, textTransform: "uppercase", marginBottom: 14 }}>Подключение</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.9rem)", fontWeight: 900, margin: 0, letterSpacing: "-0.03em" }}>Как подключить телефон</h2>
              <p style={{ marginTop: 14, fontSize: "1rem", color: "rgba(255,255,255,0.44)", maxWidth: 420, margin: "14px auto 0" }}>
                Три простых способа — выбери удобный
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {connectSteps.map((s, i) => (
              <Reveal key={s.step} delay={i * 90}>
                <div style={{
                  padding: 34, borderRadius: 26,
                  background: `linear-gradient(135deg, ${s.color}0d 0%, rgba(255,255,255,0.02) 100%)`,
                  border: `1px solid ${s.color}20`, position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: -12, right: 18, fontSize: 88, fontWeight: 900, lineHeight: 1, color: `${s.color}0f`, userSelect: "none" }}>{s.step}</div>
                  <div style={{ width: 54, height: 54, borderRadius: 16, background: `${s.color}18`, border: `1px solid ${s.color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, marginBottom: 22 }}>{s.icon}</div>
                  <div style={{ fontSize: 11, color: s.color, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{s.sub}</div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0 0 12px", color: "#fff" }}>{s.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.72, color: "rgba(255,255,255,0.5)", margin: 0 }}>{s.desc}</p>
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
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <p style={{ fontSize: 12, letterSpacing: "0.22em", color: "#a78bfa", fontWeight: 700, textTransform: "uppercase", marginBottom: 14 }}>Настоящие отзывы</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.9rem)", fontWeight: 900, margin: "0 0 14px", letterSpacing: "-0.03em" }}>Что говорят покупатели</h2>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <div style={{ display: "flex" }}>
                  {[...Array(5)].map((_, i) => <Star key={i} style={{ width: 16, height: 16, color: "#a78bfa", fill: "#a78bfa" }} />)}
                </div>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.42)" }}>4.8 из 5 · 261 отзыв на Wildberries</span>
              </div>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 18 }}>
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={i * 75}>
                <div
                  style={{ padding: 30, borderRadius: 22, height: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", transition: "border-color 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(139,92,246,0.28)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
                >
                  <div style={{ display: "flex", gap: 2, marginBottom: 18 }}>
                    {[...Array(r.rating)].map((_, j) => <Star key={j} style={{ width: 14, height: 14, color: "#a78bfa", fill: "#a78bfa" }} />)}
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.76, color: "rgba(255,255,255,0.7)", margin: "0 0 auto", flex: 1, paddingBottom: 22 }}>
                    "{r.text}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>
                        {r.name[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>{r.name}</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)" }}>{r.city} · Wildberries</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.22)" }}>{r.date}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div style={{ marginTop: 36, textAlign: "center" }}>
              <a
                href={WB_LINK}
                target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#a78bfa"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
              >
                Читать все 261 отзыв на Wildberries <ExternalLink style={{ width: 13, height: 13 }} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section id="faq" style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <p style={{ fontSize: 12, letterSpacing: "0.22em", color: "#60a5fa", fontWeight: 700, textTransform: "uppercase", marginBottom: 14 }}>Вопросы и ответы</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.9rem)", fontWeight: 900, margin: "0 0 12px", letterSpacing: "-0.03em" }}>Частые вопросы</h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.42)", margin: 0 }}>Собрали ответы на вопросы реальных покупателей</p>
            </div>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {faq.map((item, i) => (
              <Reveal key={i} delay={i * 55}>
                <div style={{
                  borderRadius: 18,
                  border: `1px solid ${openFaq === i ? "rgba(139,92,246,0.32)" : "rgba(255,255,255,0.07)"}`,
                  background: openFaq === i ? "rgba(139,92,246,0.07)" : "rgba(255,255,255,0.03)",
                  overflow: "hidden", transition: "border-color 0.25s, background 0.25s",
                }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: "100%", padding: "20px 26px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", color: "#fff", textAlign: "left", gap: 14 }}
                  >
                    <span style={{ fontSize: 15, fontWeight: 700, flex: 1, lineHeight: 1.4 }}>{item.q}</span>
                    <ChevronDown style={{ width: 17, height: 17, flexShrink: 0, color: "#a78bfa", transition: "transform 0.3s", transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }} />
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: "0 26px 22px", fontSize: 14, lineHeight: 1.78, color: "rgba(255,255,255,0.6)" }}>
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
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.16) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 25% 80%, rgba(59,130,246,0.09) 0%, transparent 55%)" }} />

        <Reveal>
          <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            {/* Social proof mini */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 18px", borderRadius: 100, marginBottom: 30, background: "rgba(139,92,246,0.11)", border: "1px solid rgba(139,92,246,0.28)" }}>
              <div style={{ display: "flex" }}>
                {[...Array(5)].map((_, i) => <Star key={i} style={{ width: 11, height: 11, color: "#a78bfa", fill: "#a78bfa" }} />)}
              </div>
              <span style={{ fontSize: 13, color: "#c4b5fd", fontWeight: 600 }}>261 покупатель уже доволен</span>
            </div>

            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, margin: "0 0 18px", letterSpacing: "-0.03em" }}>
              Готов смотреть<br />по-новому?
            </h2>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.48)", marginBottom: 32, lineHeight: 1.7 }}>
              Заказывай на Wildberries — доставка 1–2 дня, гарантия 1 год
            </p>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 14, marginBottom: 32 }}>
              <span style={{ fontSize: "clamp(2.4rem, 5vw, 3.4rem)", fontWeight: 900 }}>6 098 ₽</span>
              <span style={{ fontSize: "1.3rem", textDecoration: "line-through", color: "rgba(255,255,255,0.2)" }}>29 000 ₽</span>
              <span style={{ padding: "5px 12px", borderRadius: 10, fontSize: 14, fontWeight: 800, background: "rgba(52,211,153,0.15)", color: "#34d399" }}>−79%</span>
            </div>

            <a
              href={WB_LINK}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "20px 44px", borderRadius: 18,
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                color: "#fff", fontWeight: 800, fontSize: 17, textDecoration: "none",
                boxShadow: "0 12px 48px rgba(124,58,237,0.42)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 18px 60px rgba(124,58,237,0.58)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 12px 48px rgba(124,58,237,0.42)"; }}
            >
              <ExternalLink style={{ width: 18, height: 18 }} />
              Купить на Wildberries →
            </a>

            <div style={{ marginTop: 30, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 22 }}>
              {[
                { icon: <Truck style={{ width: 13, height: 13 }} />, text: "Бесплатная доставка" },
                { icon: <Shield style={{ width: 13, height: 13 }} />, text: "Гарантия 1 год" },
                { icon: <RotateCcw style={{ width: 13, height: 13 }} />, text: "Возврат 14 дней" },
                { icon: <CheckCircle2 style={{ width: 13, height: 13 }} />, text: "261 отзыв · 4.8 ★" },
              ].map(({ icon, text }) => (
                <span key={text} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "rgba(255,255,255,0.32)" }}>
                  <span style={{ color: "rgba(167,139,250,0.6)" }}>{icon}</span>{text}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "22px 24px", textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.18)" }}>
        © 2025 Проектор A10 · Wild Firms · Артикул WB: 454435141
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; }

        /* ── Hero scroll bounce ── */
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(7px); }
        }

        /* ── Video orb animations ── */
        @keyframes orb1 {
          0%   { transform: translate(0,    0)    scale(1); }
          33%  { transform: translate(6%,  -8%)   scale(1.08); }
          66%  { transform: translate(-4%,  5%)   scale(0.94); }
          100% { transform: translate(0,    0)    scale(1); }
        }
        @keyframes orb2 {
          0%   { transform: translate(0,   0)   scale(1); }
          33%  { transform: translate(-7%, 6%)  scale(1.06); }
          66%  { transform: translate(5%, -4%)  scale(0.96); }
          100% { transform: translate(0,   0)   scale(1); }
        }
        @keyframes orb3 {
          0%   { transform: translate(0,   0)   scale(1)    rotate(0deg); }
          50%  { transform: translate(-8%, 6%)  scale(1.12) rotate(180deg); }
          100% { transform: translate(0,   0)   scale(1)    rotate(360deg); }
        }

        .vid-orb1 { animation: orb1 14s ease-in-out infinite; }
        .vid-orb2 { animation: orb2 17s ease-in-out infinite; }
        .vid-orb3 { animation: orb3 22s ease-in-out infinite; }

        /* ── Floating particles ── */
        @keyframes p1 { 0%,100%{transform:translate(0,0)opacity:.6}50%{transform:translate(8px,-12px)opacity:1} }
        @keyframes p2 { 0%,100%{transform:translate(0,0)opacity:.4}50%{transform:translate(-10px,8px)opacity:.9} }
        @keyframes p3 { 0%,100%{transform:translate(0,0)opacity:.7}50%{transform:translate(6px,10px)opacity:.4} }
        @keyframes p4 { 0%,100%{transform:translate(0,0)opacity:.5}50%{transform:translate(-7px,-9px)opacity:1} }

        .vid-p1 { animation: p1 4.2s ease-in-out infinite; }
        .vid-p2 { animation: p2 5.8s ease-in-out infinite 0.7s; }
        .vid-p3 { animation: p3 3.9s ease-in-out infinite 1.4s; }
        .vid-p4 { animation: p4 6.3s ease-in-out infinite 2.1s; }

        /* ── Play button pulse ── */
        @keyframes play-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        .play-ring-1 { animation: play-ring 2.2s ease-out infinite; }
        .play-ring-2 { animation: play-ring 2.2s ease-out infinite 0.7s; }

        @keyframes play-glow {
          0%,100% { box-shadow: 0 0 32px rgba(139,92,246,.55), 0 0 64px rgba(99,102,241,.22), inset 0 1px 0 rgba(255,255,255,.15); }
          50%     { box-shadow: 0 0 52px rgba(139,92,246,.75), 0 0 96px rgba(99,102,241,.35), inset 0 1px 0 rgba(255,255,255,.15); }
        }
        .play-btn { animation: play-glow 2.4s ease-in-out infinite; }
        .play-btn:hover {
          transform: scale(1.1) !important;
          box-shadow: 0 0 60px rgba(139,92,246,.85), 0 0 110px rgba(99,102,241,.4) !important;
        }

        /* ── Status dot ── */
        @keyframes pulse-dot {
          0%,100% { opacity:1; }
          50%     { opacity:0.4; }
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; padding-top: 88px !important; }
        }
      `}</style>
    </div>
  );
}
