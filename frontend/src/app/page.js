'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

export default function HomePage() {
  const [variable, setVariable] = useState('Rainfall');
  const [region, setRegion] = useState('Amazon Basin');
  const [period, setPeriod] = useState('2001–2024');

  // Dynamic preview data based on selections
  const getMetrics = () => {
    if (variable === 'Temperature') {
      return {
        direction: 'Increasing ↗',
        rate: '+0.34 °C / decade',
        significance: 'p = 0.0042 (Significant)',
        chartTitle: 'Surface Temperature · ' + region,
        path: 'M42 150 C90 145 140 135 190 140 S270 120 340 115 S450 95 530 80 S630 70 748 40',
        area: 'M42 150 C90 145 140 135 190 140 S270 120 340 115 S450 95 530 80 S630 70 748 40 L748 165 L42 165Z'
      };
    } else if (variable === 'Vegetation') {
      return {
        direction: 'Declining ↘',
        rate: '-0.021 NDVI / decade',
        significance: 'p = 0.031 (Significant)',
        chartTitle: 'Vegetation Index (NDVI) · ' + region,
        path: 'M42 60 C90 65 150 75 220 70 S340 95 420 105 S520 110 600 130 S680 135 748 152',
        area: 'M42 60 C90 65 150 75 220 70 S340 95 420 105 S520 110 600 130 S680 135 748 152 L748 165 L42 165Z'
      };
    } else if (variable === 'Evaporation') {
      return {
        direction: 'Increasing ↗',
        rate: '+1.4 mm / decade',
        significance: 'p = 0.068 (Natural variability)',
        chartTitle: 'Evapotranspiration · ' + region,
        path: 'M42 135 C100 140 160 115 230 125 S350 95 430 100 S540 85 620 75 S700 80 748 55',
        area: 'M42 135 C100 140 160 115 230 125 S350 95 430 100 S540 85 620 75 S700 80 748 55 L748 165 L42 165Z'
      };
    } else {
      return {
        direction: 'Increasing ↗',
        rate: '+0.8 units / decade',
        significance: 'Analysis needed (95% CI)',
        chartTitle: 'Rainfall · ' + region,
        path: 'M42 142 C84 124 110 142 145 119 S203 138 240 107 S296 126 334 98 S395 119 435 90 S496 112 534 76 S594 101 632 67 S700 77 748 43',
        area: 'M42 142 C84 124 110 142 145 119 S203 138 240 107 S296 126 334 98 S395 119 435 90 S496 112 534 76 S594 101 632 67 S700 77 748 43 L748 165 L42 165Z'
      };
    }
  };

  const metrics = getMetrics();
  const years = period.split('–');

  return (
    <div className="bg-[#070b13] text-[#f3f5f8] min-h-screen">
      <Navbar />

      <main id="top">
        {/* ── HERO ────────────────────────────────────────────── */}
        <section className="relative min-h-[750px] h-[min(920px,100vh)] flex items-end overflow-hidden bg-[#080b13]">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, rgba(4, 8, 16, 0.88) 0%, rgba(4, 8, 16, 0.45) 44%, rgba(4, 8, 16, 0.05) 100%), linear-gradient(0deg, #070b13 0%, transparent 45%), url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2400&q=90') center 42%/cover`,
              transform: 'scale(1.015)'
            }}
          />

          <div className="wrap relative w-full pb-[74px] z-10">
            <div className="max-w-[720px]">
              <div className="flex items-center gap-3 mb-3">
                <img src="/nasa-logo.svg" alt="NASA Logo" className="h-10 w-auto object-contain" />
                <span className="eyebrow m-0">NASA Space </span>
              </div>
              <h1 className="font-display font-medium text-[clamp(44px,6.5vw,84px)] leading-[1.02] tracking-[-0.05em] my-[20px] text-white">
                Be An Earth System<br />
                <span className="text-[#e0684f]">Trend Detective</span>
              </h1>
              <p className="text-base leading-[1.7] text-[#ccd2dc] max-w-[480px] mb-[34px]">
                Explore long-term NASA satellite observations of our planet, follow the missions, and determine if environmental changes are statistically significant.
              </p>
              <Link href="/dashboard" className="button">
                <span>Begin exploring</span>
                <span className="text-[17px]">↗</span>
              </Link>
            </div>

            <div className="flex justify-between items-end mt-[60px] pt-[18px] border-t border-white/[0.14]">
              <p className="font-mono text-[10px] tracking-[0.1em] text-[#a6b0c0] m-0">
                THE NEXT CHAPTER IS OUT THERE.
              </p>
              <div className="hidden sm:flex items-center gap-3 font-mono text-[10px] tracking-[0.12em] text-[#a6b0c0]">
                <i className="block h-[34px] w-[1px] bg-[#7183a2]" />
                SCROLL TO EXPLORE
              </div>
              <p className="font-mono text-[10px] tracking-[0.1em] text-[#a6b0c0] m-0">
                34° 12′ 00″ N &nbsp; 118° 10′ 00″ W
              </p>
            </div>
          </div>
        </section>

        {/* ── TICKER ──────────────────────────────────────────── */}
        <div className="wrap ticker">
          <div><span>●</span> Artemis II · Crew training underway</div>
          <div><span>●</span> NASA POWER · 40+ Years of daily assimilation</div>
          <div><span>●</span> Webb · 3 years of deep space discovery</div>
          <div><span>●</span> Earth Detective · Non-parametric Mann-Kendall Engine</div>
        </div>

        {/* ── 01 / MISSIONS ────────────────────────────────────── */}
        <section id="missions" className="py-[112px]">
          <div className="wrap">
            <div className="flex justify-between items-end mb-[42px]">
              <div>
                <div className="eyebrow">01 / Out there, right now</div>
                <h2 className="font-display font-medium text-[clamp(34px,5vw,58px)] leading-none tracking-[-0.05em] mt-[14px]">
                  Every mission<br />moves us forward.
                </h2>
              </div>
              <Link href="/dashboard" className="text-link">
                All investigations &nbsp; ↗
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1.18fr_0.82fr] gap-[18px]">
              {/* Mission 1 */}
              <Link
                href="/dashboard?preset=amazon-deforestation"
                className="relative min-h-[420px] overflow-hidden bg-[#101827] group"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(5, 8, 14, 0.94), transparent 65%), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1500&q=85')`
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-[30px] z-10">
                  <div className="font-mono text-[10px] tracking-[0.12em] text-[#a9c8ff] uppercase">
                    Earth observation · Active
                  </div>
                  <h3 className="font-display font-medium text-[32px] tracking-[-0.04em] my-3 leading-tight">
                    Signals of a<br />changing planet.
                  </h3>
                  <p className="max-w-[480px] text-[#c4ccd8] text-[13px] leading-[1.55] m-0">
                    NASA sensors monitor vegetation loss, rainfall shifts, and thermal extremes across Earth's most critical biomes.
                  </p>
                  <span className="absolute right-[30px] bottom-[33px] text-[20px] text-white">↗</span>
                </div>
              </Link>

              {/* Mission 2 */}
              <Link
                href="/dashboard?preset=arctic-amplification"
                className="relative min-h-[420px] overflow-hidden bg-[#101827] group"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(5, 8, 14, 0.94), transparent 65%), url('https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=1200&q=85')`
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-[30px] z-10">
                  <div className="font-mono text-[10px] tracking-[0.12em] text-[#a9c8ff] uppercase">
                    Cryosphere · Continuous
                  </div>
                  <h3 className="font-display font-medium text-[32px] tracking-[-0.04em] my-3 leading-tight">
                    Worlds of<br />ocean and ice.
                  </h3>
                  <p className="max-w-[480px] text-[#c4ccd8] text-[13px] leading-[1.55] m-0">
                    Arctic warming outpaces the global average by 3×. Track real-time satellite anomalies in polar regions.
                  </p>
                  <span className="absolute right-[30px] bottom-[33px] text-[20px] text-white">↗</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ── 02 / FEATURE ────────────────────────────────────── */}
        <section className="pb-[84px]" id="discoveries">
          <div className="wrap grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] min-h-[430px] bg-[#111a29] border border-white/[0.14]">
            <div
              className="min-h-[300px] lg:min-h-[430px] bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=85')`
              }}
              role="img"
              aria-label="Earth seen from orbit"
            />
            <div className="p-8 sm:p-[60px] flex flex-col justify-center">
              <div className="eyebrow">02 / Earth, in motion</div>
              <h2 className="font-display font-medium text-[clamp(34px,4vw,52px)] leading-[1.02] tracking-[-0.05em] my-[18px]">
                Change has a<br />place and a pace.
              </h2>
              <p className="text-[#b9c2d0] leading-[1.7] text-sm max-w-[430px] m-0">
                Earth's land, atmosphere, and oceans are connected. Satellite observations and global assimilation models help scientists trace how variables like temperature, rainfall, evaporation, and vegetation change over time—and why the pattern can differ from one region to another.
              </p>
              <Link href="#trend-studio" className="text-link self-start mt-[22px]">
                Explore a trend &nbsp; ↗
              </Link>
            </div>
          </div>
        </section>

        {/* ── 03 / DATA STUDIO ─────────────────────────────────── */}
        <section className="pb-[112px]" id="trend-studio">
          <div className="wrap">
            <div className="flex justify-between items-end mb-[42px]">
              <div>
                <div className="eyebrow">03 / Become a data detective</div>
                <h2 className="font-display font-medium text-[clamp(34px,5vw,58px)] leading-none tracking-[-0.05em] mt-[14px]">
                  Find the signal<br />in a changing world.
                </h2>
              </div>
              <div className="eyebrow hidden sm:block">A system for exploring Earth science</div>
            </div>

            {/* Studio Box */}
            <div className="border border-white/[0.14] p-6 sm:p-9 bg-gradient-to-br from-[#111a29] to-[#0b111c]">
              <div className="flex justify-between items-start gap-5 mb-7">
                <div>
                  <div className="eyebrow">Trend explorer · Preview</div>
                  <h3 className="font-display font-medium text-[30px] tracking-[-0.04em] my-2.5">
                    Start with a question.
                  </h3>
                </div>
                <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-[#ffd899] border border-[#ffd899]/35 px-3 py-2 whitespace-nowrap">
                  Interactive explorer · Live NASA Logic
                </span>
              </div>

              {/* 3 Select Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-[22px]">
                <div>
                  <label className="block font-mono text-[9px] tracking-[0.12em] uppercase text-[#8492a8] mb-2">
                    What would you like to study?
                  </label>
                  <select
                    value={variable}
                    onChange={(e) => setVariable(e.target.value)}
                    className="w-full bg-[#0a101a] text-[#edf1f7] border border-[#2c384b] p-3.5 text-xs font-sans rounded-none focus:outline-none focus:border-[#70a7ff]"
                  >
                    <option value="Rainfall">Rainfall (Precipitation)</option>
                    <option value="Temperature">Temperature (2m Air)</option>
                    <option value="Vegetation">Vegetation (NDVI)</option>
                    <option value="Evaporation">Evaporation (Flux)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[9px] tracking-[0.12em] uppercase text-[#8492a8] mb-2">
                    Where should we look?
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-[#0a101a] text-[#edf1f7] border border-[#2c384b] p-3.5 text-xs font-sans rounded-none focus:outline-none focus:border-[#70a7ff]"
                  >
                    <option value="Amazon Basin">Amazon Basin</option>
                    <option value="Sahara Desert">Sahara Desert</option>
                    <option value="Indo-Gangetic Plain">Indo-Gangetic Plain</option>
                    <option value="Arctic Svalbard">Arctic Svalbard</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[9px] tracking-[0.12em] uppercase text-[#8492a8] mb-2">
                    How far back?
                  </label>
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="w-full bg-[#0a101a] text-[#edf1f7] border border-[#2c384b] p-3.5 text-xs font-sans rounded-none focus:outline-none focus:border-[#70a7ff]"
                  >
                    <option value="2001–2024">2001–2024 · monthly</option>
                    <option value="2010–2024">2010–2024 · monthly</option>
                    <option value="2015–2024">2015–2024 · monthly</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Chart Box matching ORBIT */}
              <div className="bg-[#080e18] border border-white/[0.08] p-5 sm:p-6 pb-4">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <strong className="font-display font-medium text-[17px] text-white">
                      {metrics.chartTitle}
                    </strong>
                    <div>
                      <span className="font-mono text-[9px] text-[#8996a9]">
                        Monthly view · {period}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-[#8996a9]">
                    NASA POWER ARCHIVE
                  </span>
                </div>

                {/* SVG Chart */}
                <svg
                  className="w-full h-[210px] block mt-[18px] overflow-visible"
                  viewBox="0 0 760 210"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="orbit-fade" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#81adff" stopOpacity="0.25" />
                      <stop offset="1" stopColor="#81adff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path className="stroke-[#273346] stroke-[1]" d="M42 24H748M42 68H748M42 112H748M42 156H748" />
                  <text x="2" y="27" fill="#8290a4" fontSize="9" fontFamily="IBM Plex Mono">High</text>
                  <text x="2" y="115" fill="#8290a4" fontSize="9" fontFamily="IBM Plex Mono">Avg.</text>
                  <text x="10" y="159" fill="#8290a4" fontSize="9" fontFamily="IBM Plex Mono">Low</text>
                  <text x="42" y="190" fill="#8290a4" fontSize="9" fontFamily="IBM Plex Mono">{years[0]}</text>
                  <text x="360" y="190" fill="#8290a4" fontSize="9" fontFamily="IBM Plex Mono">
                    {Math.round((Number(years[0]) + Number(years[1])) / 2)}
                  </text>
                  <text x="714" y="190" fill="#8290a4" fontSize="9" fontFamily="IBM Plex Mono">{years[1]}</text>
                  <path fill="url(#orbit-fade)" d={metrics.area} />
                  <path stroke="#81adff" strokeWidth="3" fill="none" strokeLinecap="round" d={metrics.path} />
                  <circle cx="748" cy="43" r="4" fill="#a9c8ff" />
                </svg>

                {/* Metrics 3-Col */}
                <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-white/[0.14] mt-[18px] pt-[17px] gap-3">
                  <div>
                    <span className="block font-mono text-[9px] tracking-[0.1em] uppercase text-[#8492a8] mb-[7px]">
                      Direction
                    </span>
                    <strong className="font-display font-medium text-[16px] text-white">
                      {metrics.direction}
                    </strong>
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] tracking-[0.1em] uppercase text-[#8492a8] mb-[7px]">
                      Rate of change
                    </span>
                    <strong className="font-display font-medium text-[16px] text-white">
                      {metrics.rate}
                    </strong>
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] tracking-[0.1em] uppercase text-[#8492a8] mb-[7px]">
                      Significance
                    </span>
                    <strong className="font-display font-medium text-[14px] text-[#ffd899]">
                      {metrics.significance}
                    </strong>
                  </div>
                </div>
              </div>

              <p className="text-[#8492a8] text-[11px] leading-[1.6] mt-[18px] mb-0">
                This interface links to verified NASA POWER and satellite observations. Open the full workspace to compute live Mann-Kendall rank tests, Sen's slope, and high-resolution NASA GIBS orbital imagery.
              </p>
            </div>

            {/* Steps 4-Col */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px] mt-[44px]">
              <div className="border-t border-white/[0.14] pt-[15px]">
                <b className="font-mono text-[10px] text-[#a9c8ff]">01 / Choose</b>
                <h4 className="font-display font-medium text-[17px] my-[9px]">Pick a variable</h4>
                <p className="text-[#9da9ba] text-[12px] leading-[1.6] m-0">
                  Start with familiar measures such as temperature and rainfall, or explore evaporation, soil moisture, and vegetation.
                </p>
              </div>

              <div className="border-t border-white/[0.14] pt-[15px]">
                <b className="font-mono text-[10px] text-[#a9c8ff]">02 / Locate</b>
                <h4 className="font-display font-medium text-[17px] my-[9px]">Set a region</h4>
                <p className="text-[#9da9ba] text-[12px] leading-[1.6] m-0">
                  Changes can point in opposite directions in different places, even when the same global process is at work.
                </p>
              </div>

              <div className="border-t border-white/[0.14] pt-[15px]">
                <b className="font-mono text-[10px] text-[#a9c8ff]">03 / Visualize</b>
                <h4 className="font-display font-medium text-[17px] my-[9px]">Follow the years</h4>
                <p className="text-[#9da9ba] text-[12px] leading-[1.6] m-0">
                  Build a daily or monthly time series long enough to reveal underlying climatic patterns across decades.
                </p>
              </div>

              <div className="border-t border-white/[0.14] pt-[15px]">
                <b className="font-mono text-[10px] text-[#a9c8ff]">04 / Evaluate</b>
                <h4 className="font-display font-medium text-[17px] my-[9px]">Test the trend</h4>
                <p className="text-[#9da9ba] text-[12px] leading-[1.6] m-0">
                  Estimate its rate with Sen's slope, then assess uncertainty with 95% confidence intervals and Mann-Kendall rank correlation.
                </p>
              </div>
            </div>

            {/* Sources Chips */}
            <div className="flex items-center flex-wrap gap-2.5 mt-[25px]">
              <span className="font-mono text-[9px] text-[#8794a7] tracking-[0.1em] uppercase mr-[5px]">
                Potential data sources
              </span>
              {['NASA POWER', 'MODIS', 'OMI', 'AIRS', 'GPM', 'MERRA-2', 'GLDAS'].map((src) => (
                <span
                  key={src}
                  className="border border-white/[0.14] px-[11px] py-[9px] font-mono text-[9px] tracking-[0.04em] text-[#c0cad8]"
                >
                  {src}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── 04 / NOTES / JOURNAL ────────────────────────────── */}
        <section id="journal" className="py-[112px]">
          <div className="wrap">
            <div className="flex justify-between items-end mb-[42px]">
              <div>
                <div className="eyebrow">04 / Notes from Earth science</div>
                <h2 className="font-display font-medium text-[clamp(34px,5vw,58px)] leading-none tracking-[-0.05em] mt-[14px]">
                  Read the changing planet.
                </h2>
              </div>
              <Link href="/investigate" className="text-link">
                Explore the method &nbsp; ↗
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <article className="border-t border-white/[0.14]">
                <div
                  className="h-[210px] bg-cover bg-center my-4 filter saturate-[0.85]"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=1000&q=80')`
                  }}
                />
                <div className="eyebrow text-[9px]">Earth system · 6 min read</div>
                <h3 className="font-display font-medium text-[22px] leading-[1.2] tracking-[-0.03em] my-3 text-white">
                  One planet, many different trends
                </h3>
                <p className="text-[13px] text-[#aeb8c8] leading-[1.6] mb-5">
                  A global average can hide regional shifts. Looking place by place reveals the true complexity of Earth's climate system.
                </p>
                <Link href="/compare" className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#b8d0ff]">
                  Compare Regions &nbsp; ↗
                </Link>
              </article>

              <article className="border-t border-white/[0.14]">
                <div
                  className="h-[210px] bg-cover bg-center my-4 filter saturate-[0.85]"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=1000&q=80')`
                  }}
                />
                <div className="eyebrow text-[9px]">Data methods · 4 min read</div>
                <h3 className="font-display font-medium text-[22px] leading-[1.2] tracking-[-0.03em] my-3 text-white">
                  When does a trend count as significant?
                </h3>
                <p className="text-[13px] text-[#aeb8c8] leading-[1.6] mb-5">
                  Trend size, record length, seasonal variance, and statistical confidence bounds (p &lt; 0.05) all shape whether a signal is real.
                </p>
                <Link href="/investigate" className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#b8d0ff]">
                  See the analysis steps &nbsp; ↗
                </Link>
              </article>

              <article className="border-t border-white/[0.14]">
                <div
                  className="h-[210px] bg-cover bg-center my-4 filter saturate-[0.85]"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1000&q=80')`
                  }}
                />
                <div className="eyebrow text-[9px]">Earth observations · 5 min read</div>
                <h3 className="font-display font-medium text-[22px] leading-[1.2] tracking-[-0.03em] my-3 text-white">
                  From satellite measurement to time series
                </h3>
                <p className="text-[13px] text-[#aeb8c8] leading-[1.6] mb-5">
                  Instruments and models offer many variables; a focused region and clear scientific inquiry make them actionable to investigate.
                </p>
                <Link href="/reports" className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#b8d0ff]">
                  Generate Dossiers &nbsp; ↗
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* ── QUOTE ───────────────────────────────────────────── */}
        <div className="border-t border-b border-white/[0.14] py-[78px] text-center">
          <div className="wrap">
            <p className="font-display font-medium text-[clamp(24px,4vw,42px)] leading-[1.25] tracking-[-0.03em] max-w-[850px] mx-auto mb-[22px]">
              “Somewhere, something incredible is waiting to be known.”
            </p>
            <div className="eyebrow text-[#a9c8ff]">— Carl Sagan</div>
          </div>
        </div>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer id="about" className="pt-[50px] pb-[28px] border-t border-white/[0.14]">
        <div className="wrap">
          <div className="flex flex-col sm:flex-row justify-between items-start pb-[42px] border-b border-white/[0.14] gap-8">
            <div>
              <Link href="#top" className="flex items-center gap-3 font-display font-bold text-lg tracking-[0.08em] text-[#f3f5f8]">
                <img src="/nasa-logo.svg" alt="NASA insignia" className="h-8 w-auto object-contain" />
                <span>NASA SPACE</span>
                <span className="font-mono text-[9px] font-normal tracking-[0.18em] text-[#9aa7bd]">EARTH DETECTIVE</span>
              </Link>
              <p className="text-[#a9b2c1] text-[12px] leading-[1.6] max-w-[300px] mt-[18px]">
                A window into the missions, discoveries, and long-term Earth system trends exploring our changing planet with NASA satellite observations.
              </p>
            </div>

            <div className="flex gap-[55px]">
              <div className="grid gap-[13px]">
                <div className="eyebrow">Explore</div>
                <Link href="/dashboard" className="text-[12px] text-[#c0c8d5] hover:text-white transition">Workspace</Link>
                <Link href="/investigate" className="text-[12px] text-[#c0c8d5] hover:text-white transition">Methodology</Link>
                <Link href="/compare" className="text-[12px] text-[#c0c8d5] hover:text-white transition">Data Sources</Link>
                <Link href="/reports" className="text-[12px] text-[#c0c8d5] hover:text-white transition">Reports</Link>
              </div>

              <div className="grid gap-[13px]">
                <div className="eyebrow">Data Archives</div>
                <a href="https://power.larc.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#c0c8d5] hover:text-white transition">NASA POWER ↗</a>
                <a href="https://gibs.earthdata.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#c0c8d5] hover:text-white transition">NASA GIBS ↗</a>
                <a href="https://earthdata.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#c0c8d5] hover:text-white transition">Earthdata ↗</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between pt-[22px] text-[#7f899a] font-mono text-[9px] tracking-[0.1em] uppercase gap-3">
            <span>© 2026 NASA Space Apps Challenge — Earth Detective</span>
            <span>Data sourced from NASA Earth Science Division Archives.</span>
            <a href="#top" className="hover:text-white transition">Made for the curious · ↑ Back to top</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
