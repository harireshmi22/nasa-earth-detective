'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import {
  ENVIRONMENTAL_VARIABLES,
  NASA_DATA_RESOURCES
} from '@/lib/nasa/datasetRegistry';
import {
  GitCompare,
  Loader2,
  Sparkles,
  MapPin,
  ExternalLink,
  Database,
  Search
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export default function ComparePage() {
  const [variableId, setVariableId] = useState('T2M');
  const [startYear, setStartYear] = useState(2005);
  const [endYear, setEndYear] = useState(2024);
  const [regions, setRegions] = useState([
    { name: 'Lucknow, India', lat: 26.8467, lon: 80.9462, color: '#70a7ff' },
    { name: 'New Delhi, India', lat: 28.6139, lon: 77.2090, color: '#ffd899' },
    { name: 'Svalbard Arctic', lat: 78.2232, lon: 15.6267, color: '#a9c8ff' }
  ]);

  const [loading, setLoading] = useState(false);
  const [comparisonResults, setComparisonResults] = useState([]);
  const [combinedChartData, setCombinedChartData] = useState([]);
  const [resourceCategory, setResourceCategory] = useState('ALL');
  const [resourceSearch, setResourceSearch] = useState('');

  const activeVar = ENVIRONMENTAL_VARIABLES[variableId] || ENVIRONMENTAL_VARIABLES.T2M;

  const runComparison = async () => {
    setLoading(true);
    try {
      const fetchPromises = regions.map((reg) =>
        fetch(
          `/api/nasa/observations?variable=${variableId}&lat=${reg.lat}&lon=${reg.lon}&start=${startYear}&end=${endYear}&resolution=monthly`
        )
          .then((r) => r.json())
          .then((obsData) => ({
            name: reg.name,
            color: reg.color,
            coordinates: { lat: reg.lat, lon: reg.lon },
            observations: obsData.observations || []
          }))
      );

      const regionDataList = await Promise.all(fetchPromises);

      const statsPromises = regionDataList.map((item) =>
        fetch('/api/analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            variableId,
            observations: item.observations,
            alpha: 0.05
          })
        })
          .then((r) => r.json())
          .then((analysis) => {
            const vals = item.observations.map((o) => o.value);
            const meanVal = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
            return {
              name: item.name,
              color: item.color,
              coordinates: item.coordinates,
              mean: Number(meanVal.toFixed(2)),
              count: vals.length,
              trendClassification: analysis.results?.trendClassification || 'Unknown',
              isSignificant: analysis.results?.isSignificant,
              pValue: analysis.results?.mannKendall?.pValue,
              zScore: analysis.results?.mannKendall?.zScore,
              senSlopeYear: analysis.results?.senSlope?.slope !== undefined
                ? Number(
                    (analysis.results.senSlope.slopeUnit === 'value/year'
                      ? analysis.results.senSlope.slope
                      : analysis.results.senSlope.slope * 12
                    ).toFixed(4)
                  )
                : 0,
              totalChangePercent: analysis.results?.linearRegression?.totalChangePercent || 0,
              computedBy: analysis.computedBy,
              engineStatus: analysis.engineStatus,
              backendDiagnostics: analysis.backendDiagnostics,
              observations: item.observations
            };
          })
      );

      const statsResults = await Promise.all(statsPromises);
      setComparisonResults(statsResults);

      if (statsResults.length > 0 && statsResults[0].observations.length > 0) {
        const dateMap = new Map();
        statsResults.forEach((reg) => {
          reg.observations.forEach((obs) => {
            if (!dateMap.has(obs.date)) {
              dateMap.set(obs.date, { date: obs.date });
            }
            dateMap.get(obs.date)[reg.name] = obs.value;
          });
        });

        const merged = Array.from(dateMap.values()).sort((a, b) =>
          a.date.localeCompare(b.date)
        );
        setCombinedChartData(merged);
      }
    } catch (err) {
      console.error('Comparison error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runComparison();
  }, [variableId, startYear, endYear]);

  return (
    <div className="bg-[#070b13] text-[#f3f5f8] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 wrap py-12 max-w-[1280px] w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/[0.14]">
          <div>
            <div className="eyebrow">03 / Multi-Region Geospatial Comparison</div>
            <h1 className="font-display font-medium text-[clamp(28px,4vw,48px)] leading-tight tracking-[-0.04em] text-white mt-1">
              Cross-Regional Comparison
            </h1>
            <p className="text-sm text-[#a8b0bf] mt-2">
              Synchronized NASA satellite observation traces comparing climate trajectories across regions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={variableId}
              onChange={(e) => setVariableId(e.target.value)}
              className="bg-[#0a101a] border border-[#2c384b] text-[#edf1f7] p-3 text-xs font-sans rounded-none focus:outline-none focus:border-[#70a7ff]"
            >
              {Object.values(ENVIRONMENTAL_VARIABLES).map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.unit})
                </option>
              ))}
            </select>

            <button
              onClick={runComparison}
              disabled={loading}
              className="button text-xs py-3"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>Sync NASA Data</span>
            </button>
          </div>
        </div>

        {/* 3 Region Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {comparisonResults.map((reg, idx) => (
            <div
              key={idx}
              className="border border-white/[0.14] bg-gradient-to-br from-[#111a29] to-[#0b111c] p-6 flex flex-col justify-between space-y-4 relative"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: reg.color }} />
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#8492a8]">Region {idx + 1}</span>
                  <span
                    className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border ${
                      reg.isSignificant
                        ? 'border-[#70a7ff] text-[#70a7ff] bg-[#70a7ff]/10'
                        : 'border-white/10 text-[#8492a8]'
                    }`}
                  >
                    {reg.isSignificant ? 'Significant' : 'Non-Significant'}
                  </span>
                </div>

                <h3 className="font-display font-medium text-xl text-white">{reg.name}</h3>
                <span className="font-mono text-[11px] text-[#8492a8] block mt-1">
                  {reg.coordinates.lat}°N, {reg.coordinates.lon}°E
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/[0.1] text-xs font-mono">
                <div>
                  <span className="text-[#8492a8] text-[9px] uppercase tracking-wider block mb-0.5">Mean ({activeVar.unit})</span>
                  <span className="text-base text-white font-medium">{reg.mean}</span>
                </div>
                <div>
                  <span className="text-[#8492a8] text-[9px] uppercase tracking-wider block mb-0.5">Sen Rate / Yr</span>
                  <span className="text-base font-medium" style={{ color: reg.color }}>
                    {reg.senSlopeYear > 0 ? `+${reg.senSlopeYear}` : reg.senSlopeYear} {activeVar.unit}
                  </span>
                </div>
                <div>
                  <span className="text-[#8492a8] text-[9px] uppercase tracking-wider block mb-0.5">Mann-Kendall p</span>
                  <span className="text-white font-medium">
                    {reg.pValue !== undefined ? reg.pValue.toFixed(4) : '—'}
                  </span>
                </div>
                <div>
                  <span className="text-[#8492a8] text-[9px] uppercase tracking-wider block mb-0.5">Total Shift</span>
                  <span className="text-white font-medium">
                    {reg.totalChangePercent > 0 ? `+${reg.totalChangePercent}` : reg.totalChangePercent}%
                  </span>
                </div>
              </div>

              <div className="p-3 bg-[#080e18] border border-white/[0.08] text-[11px] font-mono text-[#a8b0bf]">
                Verdict: <span className="text-white font-medium">{reg.trendClassification}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Combined Comparative Chart */}
        <div className="border border-white/[0.14] bg-gradient-to-br from-[#111a29] to-[#0b111c] p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.1]">
            <div>
              <h3 className="font-display font-medium text-lg text-white">
                Synchronized Comparative Time Series ({startYear} – {endYear})
              </h3>
              <p className="font-mono text-[11px] text-[#8492a8] mt-1">
                Direct monthly NASA observation traces across all compared coordinates
              </p>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-white/20 text-[#a9c8ff]">
              {activeVar.unit}
            </span>
          </div>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={combinedChartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1d283a" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#5e6d82"
                  fontSize={10}
                  tickLine={false}
                  minTickGap={40}
                  fontFamily="IBM Plex Mono"
                />
                <YAxis stroke="#5e6d82" fontSize={10} tickLine={false} fontFamily="IBM Plex Mono" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#080e18',
                    borderColor: 'rgba(255,255,255,0.14)',
                    fontSize: '11px',
                    fontFamily: 'IBM Plex Mono'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'IBM Plex Mono', paddingTop: '10px' }} />

                {comparisonResults.map((reg) => (
                  <Line
                    key={reg.name}
                    type="monotone"
                    dataKey={reg.name}
                    stroke={reg.color}
                    strokeWidth={2}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ─── NASA DATA & RESOURCES SECTION (Space Apps Challenge) ─── */}
        <section className="pt-6 border-t border-white/[0.14] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="eyebrow text-[#70a7ff]">Space Apps Official Catalog</div>
              <h2 className="font-display font-medium text-2xl sm:text-3xl text-white mt-1">
                NASA Data &amp; Resources
              </h2>
              <p className="text-xs text-[#a8b0bf] mt-1 max-w-2xl">
                Official tools and archives recommended by NASA for time-series generation, environmental data retrieval, and statistical significance testing.
              </p>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 border border-[#70a7ff]/30 text-[#70a7ff] bg-[#70a7ff]/10 shrink-0">
              12 Resources &amp; Research Portals
            </span>
          </div>

          {/* Interactive Filters & Search Toolbar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#0a101a] border border-white/[0.1] p-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'ALL', label: 'All Portals', count: 12 },
                { id: 'NASA', label: 'NASA Tools', count: 3 },
                { id: 'NOAA', label: 'NOAA & Literature', count: 3 },
                { id: 'CSA', label: 'CSA & Satellites', count: 5 },
                { id: 'Methodology', label: 'Statistical Guide', count: 1 }
              ].map((tab) => {
                const active = resourceCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setResourceCategory(tab.id)}
                    className={`px-3 py-1 text-xs font-mono transition border flex items-center gap-1.5 ${
                      active
                        ? 'border-[#70a7ff] bg-[#70a7ff]/15 text-white font-medium'
                        : 'border-white/[0.08] text-[#8492a8] hover:text-white hover:border-white/20'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="text-[10px] opacity-60">({tab.count})</span>
                  </button>
                );
              })}
            </div>

            <div className="relative min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-[#8492a8] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search tools, sensors, topics..."
                value={resourceSearch}
                onChange={(e) => setResourceSearch(e.target.value)}
                className="w-full bg-[#070b13] border border-white/[0.12] text-xs font-mono text-white pl-8 pr-3 py-1.5 focus:outline-none focus:border-[#70a7ff] transition placeholder:text-[#55637a]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {NASA_DATA_RESOURCES.filter((item) => {
              const matchesCategory =
                resourceCategory === 'ALL' ||
                item.category.toLowerCase().includes(resourceCategory.toLowerCase()) ||
                item.agency.toLowerCase().includes(resourceCategory.toLowerCase()) ||
                (resourceCategory === 'NOAA' && (item.agency.includes('NOAA') || item.category.includes('Research') || item.category.includes('Station'))) ||
                (resourceCategory === 'CSA' && (item.agency.includes('CSA') || item.agency.includes('Canadian') || item.category.includes('Canadian'))) ||
                (resourceCategory === 'Methodology' && item.category.includes('Methodology'));

              const q = resourceSearch.toLowerCase().trim();
              const matchesSearch =
                !q ||
                item.name.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q) ||
                item.tagline.toLowerCase().includes(q) ||
                item.agency.toLowerCase().includes(q) ||
                item.capabilities.some((c) => c.toLowerCase().includes(q));

              return matchesCategory && matchesSearch;
            }).map((item) => (
              <div
                key={item.id}
                className="bg-[#0b111c] border border-white/[0.12] p-5 flex flex-col justify-between hover:border-[#70a7ff]/50 transition duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border"
                      style={{
                        borderColor: `${item.badgeColor}40`,
                        color: item.badgeColor,
                        backgroundColor: `${item.badgeColor}10`
                      }}
                    >
                      {item.agency}
                    </span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8492a8] group-hover:text-[#70a7ff] transition"
                      title="Open Official Resource"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <h3 className="font-display font-bold text-base text-white group-hover:text-[#70a7ff] transition">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                      {item.name}
                      <span className="text-xs opacity-0 group-hover:opacity-100 transition">↗</span>
                    </a>
                  </h3>
                  <p className="text-[11px] font-mono text-[#70a7ff] mt-0.5 mb-2">
                    {item.tagline}
                  </p>
                  <p className="text-xs text-[#c0cad8] leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.08] space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-[#8492a8] block">Capabilities:</span>
                  <div className="flex flex-wrap gap-1">
                    {item.capabilities.map((cap, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] text-[#a8b0bf]">
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
