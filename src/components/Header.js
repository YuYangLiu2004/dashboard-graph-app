import React from 'react';

function Header({ onLanguageChange, language, portfolioLink }) {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-light shadow-sm">
                <div className="container">
                    <a className="navbar-brand fs-4" href={portfolioLink}>
                        <i className="bi bi-music-note-beamed me-2"></i> Spotify Data
                    </a>
                    <div className="ms-auto d-flex align-items-center">
                        <div className="language-selector nav-item me-3">
                            <button 
                                className={`btn btn-sm ${language === 'en' ? 'btn-primary' : 'btn-outline-secondary'}`}
                                onClick={() => onLanguageChange('en')} 
                                disabled={language === 'en'}
                            >
                                English
                            </button>
                            <button 
                                className={`btn btn-sm ${language === 'fr' ? 'btn-primary' : 'btn-outline-secondary'}`}
                                onClick={() => onLanguageChange('fr')} 
                                disabled={language === 'fr'}
                            >
                                Français
                            </button>
                        </div>
                        <a href={portfolioLink} className="btn btn-outline-primary" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-person-circle me-2"></i>
                            My Portfolio
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;