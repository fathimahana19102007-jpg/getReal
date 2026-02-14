import React, { useState } from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import EducationPage from './pages/EducationPage';
import CareerDirectionPage from './pages/CareerDirectionPage';
import AnalysisPage from './pages/AnalysisPage';

function App() {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({
    education: '',
    careerMode: '', // 'known' or 'unsure'
    careerName: '',
    interests: '',
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const resetApp = () => {
    setUserData({
      education: '',
      careerMode: '',
      careerName: '',
      interests: '',
    });
    setStep(0);
  };

  const updateData = (newData) => {
    setUserData((prev) => ({ ...prev, ...newData }));
  };

  const renderPage = () => {
    switch (step) {
      case 0:
        return <LandingPage onNext={nextStep} />;
      case 1:
        return <EducationPage onNext={nextStep} data={userData} updateData={updateData} />;
      case 2:
        return <CareerDirectionPage onNext={nextStep} data={userData} updateData={updateData} />;
      case 3:
        return <AnalysisPage data={userData} onReset={resetApp} />;
      default:
        return <LandingPage onNext={nextStep} />;
    }
  };

  return (
    <div className="app-container">
      {renderPage()}
    </div>
  );
}

export default App;

