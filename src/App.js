import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header.js';
import GenrePopularityChart from './components/GenrePopularityChart.js';
import SongFeatureScatterPlot from './components/SongFeatureScatterPlot.js';

const translations = {
  en: {
    dashboardTitle: 'Music Popularity Dashboard',
    genreChart: {
      title: 'Average Popularity by Genre',
      description: 'This chart visualizes the average popularity of songs across different genres in the dataset. It provides a quick way to compare which music styles are generally more popular. Use the interactive slider to focus on higher-ranking genres.',
      filterLabel: 'Minimum Average Popularity:',
      tooltipLabel: 'Avg. Popularity'
    },
    scatterPlotTitle: 'Song Feature Correlation',
    scatterPlotDescription: 'This tool allows you to explore the relationship between two different musical attributes, such as \'danceability\' and \'energy\'. Each dot represents a song. By selecting different axes, you can search for potential correlations in the music. Shows max of 300 songs, reload the page to show a different sample!',
    selectXAxis: 'Select X-Axis:',
    selectYAxis: 'Select Y-Axis:',
    definitions: {
      danceability: 'Describes how suitable a track is for dancing based on a combination of musical elements. A value of 1.0 is most danceable.',
      energy: 'Represents a perceptual measure of intensity and activity. Energetic tracks feel fast, loud, and noisy.',
      valence: 'A measure of the musical positiveness conveyed by a track. High valence tracks sound more positive (happy, cheerful).',
    }
  },
  fr: {
    dashboardTitle: 'Tableau de bord de popularité musicale',
    genreChart: {
      title: 'Popularité moyenne par genre',
      description: 'Ce graphique illustre la popularité moyenne des chansons selon les différents genres présents dans l\'ensemble de données. Il offre un moyen rapide de comparer les styles musicaux les plus populaires. Utilisez le curseur interactif pour vous concentrer sur les genres les mieux classés.',
      filterLabel: 'Popularité moyenne minimale :',
      tooltipLabel: 'Popularité moy.'
    },
    scatterPlotTitle: 'Corrélation entre les caractéristiques des chansons',
    scatterPlotDescription: 'Cet outil vous permet d\'explorer la relation entre deux attributs musicaux différents, comme la "dansabilité" et l\'énergie. Chaque point représente une chanson. En sélectionnant différents axes, vous pouvez rechercher d\'éventuelles corrélations dans les données musicales. Affiche un maximum de 300 chansons, rechargez la page pour afficher un échantillon différent !',
    selectXAxis: 'Sélectionnez l\'axe des X :',
    selectYAxis: 'Sélectionnez l\'axe des Y :',
    definitions: {
      danceability: 'Décrit à quel point un morceau est adapté à la danse en fonction d\'éléments musicaux. Une valeur de 1.0 est la plus dansante.',
      energy: 'Représente une mesure perceptuelle de l\'intensité et de l\'activité. Les morceaux énergiques sont rapides, bruyants et forts.',
      valence: 'Une mesure de la positivité musicale d\'un morceau. Les morceaux à valence élevée semblent plus positifs (joyeux, gais).',
    }
  }  
};

const PORTFOLIO_LINK = "https://yuyangliu2004.github.io/YuYangLiuPortfolio.github.io/";

function App() {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    fetch('/data/songs.json')
      .then(res => res.json())
      .then(data => {
        setSongs(data);
        setIsLoading(false);
      })
      .catch(error => console.error("Failed to load song data:", error));
  }, []);

  if (isLoading) {
    return <div>Loading Dashboard...</div>;
  }
  
  return (
    <div className="app-container">
      <Header 
        language={language}
        onLanguageChange={setLanguage}
        portfolioLink={PORTFOLIO_LINK}
      />
      <main className="charts-grid mt-4">
        <GenrePopularityChart 
          data={songs} 
          language={language}
          translations={translations}
        />
        <SongFeatureScatterPlot 
          data={songs}
          language={language}
          translations={translations}
        />
      </main>
    </div>
  );
}

export default App;