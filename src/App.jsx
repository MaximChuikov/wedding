import { useEffect, useRef, useState } from "react";
import { wedding as w } from "./config";

/* Появление при прокрутке: kind = up | words | wipe | arch | circle */
function Reveal({ kind = "up", delay = 0, as: Tag = "div", className = "", children }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`rv rv-${kind} ${on ? "in" : ""} ${className}`} style={{ "--d": `${delay}ms` }}>
      {children}
    </Tag>
  );
}

const Words = ({ text }) =>
  text.split(" ").map((t, i) => (
    <span className="wd" key={i}>
      <span style={{ "--i": i }}>{t}</span>{" "}
    </span>
  ));

function Photo({ p, kind, delay, className = "" }) {
  return (
    <Reveal kind={kind} delay={delay} className={`photo ${className}`}>
      <img src={p.src} alt={p.alt} />
    </Reveal>
  );
}

function Hero() {
  return (
    <header className="hero">
      <div className="hero-text">
        <Reveal kind="up" delay={200} as="p" className="small">Приглашение на свадьбу</Reveal>
        <Reveal kind="words" as="h1" className="names">
          <span className="wd"><span style={{ "--i": 0 }}>{w.names[0]}</span></span>
          <span className="wd amp"><span style={{ "--i": 1 }}>&amp;</span></span>
          <span className="wd"><span style={{ "--i": 2 }}>{w.names[1]}</span></span>
        </Reveal>
        <Reveal kind="up" delay={1100} as="p" className="lead">{w.lead}</Reveal>
        <Reveal kind="up" delay={1400} className="hero-date">
          <span>{w.dateText}</span>
          <i />
          <span>{w.vanloft}, Челябинск</span>
        </Reveal>
      </div>
      <Photo p={w.photos[0]} kind="arch" delay={500} className="hero-photo" />
    </header>
  );
}

function Story() {
  const [p1, p2, p3, p4] = w.photos.slice(1);
  return (
    <section className="story">
      <Reveal kind="words" as="h2" className="h2">
        <Words text="Два человека и их семейный путь" />
      </Reveal>
      <Reveal kind="up" as="p" className="body narrow">
        Он начался 2.5 года назад и будет продолжаться до последнего вздоха. Теперь мы хотим, чтобы рядом были самые близкие.
      </Reveal>
      <div className="collage">
        <Photo p={p1} kind="wipe" className="c1" />
        <Photo p={p2} kind="circle" delay={150} className="c2" />
        <Photo p={p3} kind="arch" delay={100} className="c3" />
        <Photo p={p4} kind="wipe" delay={250} className="c4" />
      </div>
    </section>
  );
}

function Palette() {
  const [active, setActive] = useState(null);
  const n = w.palette.length;
  const SAG = 26; // провис веревки, px
  const heights = [168, 196, 176, 208, 184, 200, 172, 192];
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.3 });
    ref.current && io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section className="palette">
      <Reveal kind="words" as="h2" className="h2"><Words text="Цвета нашего дня" /></Reveal>
      <Reveal kind="up" as="p" className="body narrow">
        От сливок до горького шоколада. Будем рады, если ваши наряды отзовутся в этих оттенках.
      </Reveal>
      <div className={`line ${on ? "in" : ""}`} ref={ref}>
        <svg className="rope" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
          <path d={`M0,6 Q50,${6 + 2 * SAG} 100,6`} />
        </svg>
        {w.palette.map((c, i) => {
          const t = (i + 0.5) / n;
          const y = 6 + 4 * SAG * t * (1 - t);
          return (
            <div className="fab-w" key={c.hex} style={{ left: `${t * 100}%`, top: `${y}px`, "--dl": `${300 + i * 140}ms` }}>
              <button
                className={`fab ${active === i ? "is-active" : ""}`}
                style={{ "--c": c.hex, "--fg": c.dark ? "#F6EBD9" : "#45291C", "--h": `${heights[i]}px`, "--sw": `${5 + (i % 4)}s`, "--sd": `${-i * 0.9}s` }}
                onClick={() => setActive(i)}
                aria-label={`${c.name}, ${c.hex}`}
              >
                <span className="peg" />
                <span className="cloth"><b>{c.name}</b></span>
              </button>
            </div>
          );
        })}
      </div>
      <p className="swatch-cap" aria-live="polite">
        {active === null ? "Коснитесь ткани, чтобы узнать оттенок" : `${w.palette[active].name}, ${w.palette[active].hex}`}
      </p>
    </section>
  );
}

function useCountdown() {
  const target = new Date(w.dateISO).getTime();
  const calc = () => Math.max(0, target - Date.now());
  const [ms, setMs] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setMs(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  const s = Math.floor(ms / 1000);
  return [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
}

function Details() {
  const [d, h, m, s] = useCountdown();
  const cells = [[d, "дней"], [h, "часов"], [m, "минут"], [s, "секунд"]];
  return (
    <section className="details">
      <Reveal kind="words" as="h2" className="h2"><Words text="Когда и где" /></Reveal>
      <Reveal kind="up" className="when">
        <div className="big">04.12.2026</div>
        <p>{w.weekday}, начало в {w.time}</p>
      </Reveal>
      <Reveal kind="up" delay={100} className="count">
        {cells.map(([v, l]) => (
          <div key={l}><b>{String(v).padStart(2, "0")}</b><span>{l}</span></div>
        ))}
      </Reveal>
      <div className="two">
        <Reveal kind="up" className="venue">
          <h3>{w.vanloft}</h3>
          <p>{w.place}</p>
          <a className="btn ghost" href={w.mapUrl} target="_blank" rel="noreferrer">Открыть на карте</a>
        </Reveal>
        <Reveal kind="up" delay={150} className="sched">
          {w.schedule.map((s) => (
            <div className="row" key={s.t}><time>{s.t}</time><span>{s.text}</span></div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Rsvp() {
  const [name, setName] = useState("");
  const [ans, setAns] = useState("yes");
  const [note, setNote] = useState("");
  const send = (e) => {
    e.preventDefault();
    const text = `${name || "Гость"}: ${ans === "yes" ? "буду на свадьбе" : "не смогу прийти"}.${note ? " " + note : ""}`;
    window.open(`https://t.me/${w.telegram}?text=${encodeURIComponent(text)}`, "_blank");
  };
  return (
    <section className="rsvp">
      <Reveal kind="words" as="h2" className="h2"><Words text="Будете с нами?" /></Reveal>
      <Reveal kind="up" as="p" className="body narrow">Пожалуйста, ответьте до 20 ноября, чтобы мы успели всё подготовить.</Reveal>
      <Reveal kind="up" delay={100}>
        <form onSubmit={send} className="form">
          <label>Ваше имя<input value={name} onChange={(e) => setName(e.target.value)} required /></label>
          <div className="choice">
            <button type="button" className={ans === "yes" ? "on" : ""} onClick={() => setAns("yes")}>Приду</button>
            <button type="button" className={ans === "no" ? "on" : ""} onClick={() => setAns("no")}>Не смогу</button>
          </div>
          <label>Пожелания по меню или спутник<input value={note} onChange={(e) => setNote(e.target.value)} /></label>
          <button className="btn" type="submit">Отправить в Telegram</button>
        </form>
      </Reveal>
      <p className="foot">Ждём вас. {w.names[0]} и {w.names[1]}</p>
    </section>
  );
}

export default function App() {
  return (
    <main>
      <Hero />
      <Story />
      <Palette />
      <Details />
      <Rsvp />
    </main>
  );
}
