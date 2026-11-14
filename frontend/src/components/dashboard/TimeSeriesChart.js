'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { AlertCircle } from 'lucide-react';

export default function TimeSeriesChart({
  data = [],
  fittedData = [],
  variableName = 'Air Temperature (2m)',
  unit = '°C',
  statsResult = {},
  isDeseasonalized = false,
  onToggleDeseasonalize
}) {
  const [viewMode, setViewMode] = useState('observed'); // 'observed' | 'anomaly'
  const [showLinearFit, setShowLinearFit] = useState(true);

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-80 flex flex-col items-center justify-center bg-[#080e18] border border-white/[0.14] p-6 text-center">
        <AlertCircle className="w-8 h-8 text-[#8492a8] mb-2 animate-pulse" />
        <p className="text-xs text-[#a8b0bf] font-mono">Awaiting NASA Earth observations...</p>
        <span className="text-[11px] text-[#8492a8] mt-1 font-mono">Select a target or click the 3D globe.</span>
      </div>
    );
  }

  const chartData = data.map((obs, idx) => {
    const fitted = fittedData[idx] || {};
    return {
      date: obs.date,
      observed: obs.value,
      anomaly: obs.anomaly,
      linearFit: fitted.linear !== undefined ? fitted.linear : null,
      senFit: fitted.sen !== undefined ? fitted.sen : null,
      deseasonalized: obs.deseasonalized !== undefined ? obs.deseasonalized : null
    };
  });

  const values = data.map(d => viewMode === 'observed' ? d.value : d.anomaly).filter(v => v !== null && !isNaN(v));
  const minVal = values.length > 0 ? Math.floor(Math.min(...values) * 0.95) : 0;
  const maxVal = values.length > 0 ? Math.ceil(Math.max(...values) * 1.05) : 10;

  const downloadCSV = () => {
    const headers = ['Date', `Observed (${unit})`, `Anomaly (${unit})`, 'Linear Fit', "Sen's Slope Fit"];
    const rows = chartData.map(d => [
      d.date,
      d.observed,
      d.anomaly,
      d.linearFit ?? '',
      d.senFit ?? ''
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NASA_${variableName.replace(/\s+/g, '_')}_TimeSeries.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const pObs = payload.find(p => p.dataKey === 'observed' || p.dataKey === 'anomaly');
      const pLinear = payload.find(p => p.dataKey === 'linearFit');
      const pSen = payload.find(p => p.dataKey === 'senFit');
      const pDeseas = payload.find(p => p.dataKey === 'deseasonalized');

      return (
        <div className="bg-[#080e18] p-3 border border-white/[0.14] text-xs font-mono shadow-xl">
          <p className="text-white font-bold mb-1.5 border-b border-white/[0.1] pb-1">{label}</p>
          {pObs && (
            <p className="text-[#f3f5f8] flex justify-between space-x-4">
              <span className="text-[#8492a8]">{viewMode === 'observed' ? 'Observed:' : 'Anomaly:'}</span>
              <span className="font-bold text-[#70a7ff]">{pObs.value} {unit}</span>
            </p>
          )}
          {pDeseas && (
            <p className="text-[#ffd899] flex justify-between space-x-4">
              <span className="text-[#8492a8]">Deseasonalized:</span>
              <span className="font-bold">{pDeseas.value} {unit}</span>
            </p>
          )}
          {pLinear && pLinear.value !== null && viewMode === 'observed' && (
            <p className="text-[#ffd899] flex justify-between space-x-4">
              <span className="text-[#8492a8]">Linear Fit:</span>
              <span>{pLinear.value} {unit}</span>
            </p>
          )}
          {pSen && pSen.value !== null && viewMode === 'observed' && (
            <p className="text-[#a9c8ff] flex justify-between space-x-4">
              <span className="text-[#8492a8]">Sen's Slope:</span>
              <span>{pSen.value} {unit}</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-[#080e18] border border-white/[0.14] p-5 flex flex-col">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.1]">
        <div>
          <h3 className="text-sm font-display font-medium text-white">
            {viewMode === 'observed' ? variableName : `${variableName} (Anomaly)`}
          </h3>
          <p className="text-[10px] font-mono text-[#8492a8] mt-0.5">
            NASA POWER &bull; 1981–2024 &bull; {unit}
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setViewMode('observed')}
            className={`px-2.5 py-1 text-[10px] font-mono border transition ${
              viewMode === 'observed'
                ? 'border-[#70a7ff] bg-[#70a7ff]/15 text-white'
                : 'border-white/[0.14] text-[#8492a8] hover:text-white'
            }`}
          >
            Observed
          </button>
          <button
            onClick={() => setViewMode('anomaly')}
            className={`px-2.5 py-1 text-[10px] font-mono border transition ${
              viewMode === 'anomaly'
                ? 'border-[#70a7ff] bg-[#70a7ff]/15 text-white'
                : 'border-white/[0.14] text-[#8492a8] hover:text-white'
            }`}
          >
            Anomaly
          </button>
          {onToggleDeseasonalize && (
            <button
              onClick={onToggleDeseasonalize}
              className={`px-2 py-1 text-[10px] font-mono border transition ${
                isDeseasonalized
                  ? 'border-[#70a7ff] bg-[#70a7ff]/20 text-[#a9c8ff]'
                  : 'border-white/[0.14] text-[#8492a8] hover:text-white'
              }`}
              title="Remove seasonal cycle"
            >
              Deseas
            </button>
          )}
          <button
            onClick={downloadCSV}
            className="px-2 py-1 text-[10px] font-mono border border-white/[0.14] text-[#8492a8] hover:text-white transition"
            title="Download CSV"
          >
            ↓ CSV
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center space-x-5 text-xs font-mono mb-2">
        <div className="flex items-center space-x-1.5 text-[#70a7ff]">
          <span className="w-3 h-[2px] bg-[#70a7ff]" />
          <span>{viewMode === 'observed' ? 'Observed' : 'Anomaly'}</span>
        </div>
        {viewMode === 'observed' && (
          <div className="flex items-center space-x-1.5 text-[#ffd899]">
            <span className="w-3 h-[2px] bg-[#ffd899] border-dashed" />
            <span>Trend line</span>
          </div>
        )}
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1d283a" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#5e6d82"
              fontSize={10}
              tickLine={false}
              fontFamily="IBM Plex Mono"
              minTickGap={40}
            />
            <YAxis
              stroke="#5e6d82"
              fontSize={10}
              tickLine={false}
              domain={[minVal, maxVal]}
              fontFamily="IBM Plex Mono"
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Observed line */}
            <Line
              type="monotone"
              dataKey={viewMode === 'observed' ? 'observed' : 'anomaly'}
              stroke="#70a7ff"
              strokeWidth={1.8}
              dot={false}
            />

            {/* OLS Linear Trend line */}
            {viewMode === 'observed' && showLinearFit && (
              <Line
                type="linear"
                dataKey="linearFit"
                stroke="#ffd899"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Meta Footer */}
      <div className="mt-2 pt-2 border-t border-white/[0.08] flex justify-between text-[10px] font-mono text-[#8492a8]">
        <span>Sampling: Monthly NASA Assimilation</span>
        <span>Confidence: 95% (Two-tailed)</span>
      </div>
    </div>
  );
}
