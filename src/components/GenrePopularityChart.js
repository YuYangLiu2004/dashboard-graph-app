import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function GenrePopularityChart({ data, language, translations }) {
  const [sliderValue, setSliderValue] = useState(65);
  const [appliedThreshold, setAppliedThreshold] = useState(65);
  const [topN, setTopN] = useState(15);

  const processedData = useMemo(() => {
    const genreStats = {};
    data.forEach(song => {
      if (song.track_genre && song.popularity) {
        const genre = song.track_genre;
        const popularity = parseFloat(song.popularity);
        if (!genreStats[genre]) {
          genreStats[genre] = { totalPopularity: 0, count: 0 };
        }
        genreStats[genre].totalPopularity += popularity;
        genreStats[genre].count++;
      }
    });
    return Object.keys(genreStats)
      .map(genre => ({
        genre: genre,
        averagePopularity: genreStats[genre].totalPopularity / genreStats[genre].count,
      }))
      .filter(item => item.averagePopularity >= appliedThreshold)
      .sort((a, b) => b.averagePopularity - a.averagePopularity)
      .slice(0, topN);
  }, [data, appliedThreshold, topN]);

  const chartTexts = translations[language] || translations.en;

  const handleSliderChange = (event) => {
    setSliderValue(parseFloat(event.target.value));
  };

  const handleSliderRelease = () => {
    setAppliedThreshold(sliderValue);
  };

  return (
    <div className="chart-card">
      <h3>{chartTexts.genreChart.title}</h3>
      <p className="chart-description">{chartTexts.genreChart.description}</p>
      
      <div className="interaction-panel">
        <label>
          {chartTexts.genreChart.filterLabel} {sliderValue}
          <input 
            type="range" 
            min="50" 
            max="85" 
            value={sliderValue}
            onChange={handleSliderChange}
            onMouseUp={handleSliderRelease}
            onTouchEnd={handleSliderRelease}
          />
        </label>
        <div className="top-n-selector">
          <span>Show:</span>
          <button onClick={() => setTopN(10)} className={topN === 10 ? 'active' : ''}>Top 10</button>
          <button onClick={() => setTopN(15)} className={topN === 15 ? 'active' : ''}>Top 15</button>
          <button onClick={() => setTopN(25)} className={topN === 25 ? 'active' : ''}>Top 25</button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart 
          data={processedData} 
          margin={{ top: 5, right: 30, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="genre" 
            angle={-45}
            textAnchor="end"
            interval={0}
          />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }} />
          <Bar dataKey="averagePopularity" fill="var(--chart-color-1)" name={chartTexts.genreChart.tooltipLabel} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GenrePopularityChart;