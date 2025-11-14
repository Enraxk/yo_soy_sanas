import React, { useState } from "react";

const nav = [
  { name: "masthead" },
  { name: "tiles" },
  { name: "two-columns" }
];

export default function AnimatedHeader() {
  const [burgerOpen, setBurgerOpen] = useState(false);

  return (
    <header>
      <label className="menu">
        <input
          id="burger"
          type="checkbox"
          checked={burgerOpen}
          onChange={() => setBurgerOpen(!burgerOpen)}
        />
        <svg className="burger" viewBox="0 0 100 100" width="64">
          <path
            className="top"
            d="m 30,33 h 40 c 13.100415,0 14.380204,31.80258 6.899646,33.421777 -24.612039,5.327373 9.016154,-52.337577 -12.75751,-30.563913 l -28.284272,28.284272"
          />
          <path
            className="middle"
            d="m 70,50 c 0,0 -32.213436,0 -40,0 -7.786564,0 -6.428571,-4.640244 -6.428571,-8.571429 0,-5.895471 6.073743,-11.783399 12.286435,-5.570707 6.212692,6.212692 28.284272,28.284272 28.284272,28.284272"
          />
          <path
            className="bottom"
            d="m 69.575405,67.073826 h -40 c -13.100415,0 -14.380204,-31.80258 -6.899646,-33.421777 24.612039,-5.327373 -9.016154,52.337577 12.75751,30.563913 l 28.284272,-28.284272"
          />
        </svg>
      </label>
      <nav style={{ display: burgerOpen ? "flex" : undefined }}>
        <ul className="animated-nav">
          {nav.map((l) => (
            <li key={l.name}>
              <a
                href={`#${l.name}`}
                title={l.name}
                style={{ '--an': `--${l.name}`, '--at': `--${l.name}-s` } as React.CSSProperties}
              >
                {l.name.replace('-', ' ')}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

