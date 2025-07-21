import React, { useState, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const featureOptions = ['danceability', 'energy', 'valence'];

const CustomTooltip = ({ active, payload, xAxisKey, yAxisKey }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="tooltip-title">{data.track_name}</p>
        <p className="tooltip-item">{`${xAxisKey}: ${data[xAxisKey]}`}</p>
        <p className="tooltip-item">{`${yAxisKey}: ${data[yAxisKey]}`}</p>
      </div>
    );
  }
  return null;
};

function SongFeatureScatterPlot({ data, language, translations }) {
  const [xAxisKey, setXAxisKey] = useState('danceability');
  const [yAxisKey, setYAxisKey] = useState('energy');

  const chartTexts = translations[language] || translations.en;
  const definitionTexts = chartTexts.definitions;

  const sampleData = useMemo(() => {
    if (data.length <= 300) {
      return data;
    }
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 300);
  }, [data]);

  return (
    <div className="chart-card">
      <h3>{chartTexts.scatterPlotTitle}</h3>
      <p className="chart-description">{chartTexts.scatterPlotDescription}</p>

      <div className="interaction-panel">
        <label>{chartTexts.selectXAxis}
          <select value={xAxisKey} onChange={(e) => setXAxisKey(e.target.value)}>
            {featureOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </label>
        <label>{chartTexts.selectYAxis}
          <select value={yAxisKey} onChange={(e) => setYAxisKey(e.target.value)}>
            {featureOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </label>
      </div>

      <div className="definitions-panel">
        <div className="feature-definition">
          <strong>{xAxisKey}:</strong> {definitionTexts[xAxisKey]}
        </div>
        <div className="feature-definition">
          <strong>{yAxisKey}:</strong> {definitionTexts[yAxisKey]}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis type="number" dataKey={xAxisKey} name={xAxisKey} domain={[0, 1]}/>
          <YAxis type="number" dataKey={yAxisKey} name={yAxisKey} domain={[0, 1]}/>
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }} 
            content={<CustomTooltip xAxisKey={xAxisKey} yAxisKey={yAxisKey} />} 
          />
          <Scatter name="Songs" data={sampleData} fill="var(--chart-color-2)" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SongFeatureScatterPlot;