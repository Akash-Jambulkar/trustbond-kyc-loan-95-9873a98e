
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('animate-page-in');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('animate-page-out');
      setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('animate-page-in');
      }, 300);
    }
  }, [location, displayLocation]);

  return (
    <div className={`${transitionStage} w-full`}>
      {children}
    </div>
  );
};

export default PageTransition;
