import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiMap, FiMapPin, FiUsers, FiUser } from 'react-icons/fi';
import CountriesPage from './pages/CountriesPage';
import Itineraries from './pages/Itineraries';
import ItineraryDetail from './pages/ItineraryDetail';
import ShareExperience from './pages/ShareExperience';
import Collaboration from './pages/Collaboration';
import Profile from './pages/Profile';
import logo from './assets/logo.png';

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 64px;
  z-index: 100;
`;
const NavIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 28px;
  color: ${props => (props.$active ? '#111' : '#888')};
  cursor: pointer;
`;
const Main = styled.main`
  padding-bottom: 80px;
`;

function App() {
  return (
    <Router>
      <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px 0' }}>
        <img src={logo} alt="TrippiEasy Logo" style={{ height: 80 }} />
      </header>
      <Main>
        <Routes>
          <Route path="/" element={<Navigate to="/countries" />} />
          <Route path="/countries" element={<CountriesPage />} />
          <Route path="/itineraries" element={<Itineraries />} />
          <Route path="/itineraries/:id" element={<ItineraryDetail />} />
          <Route path="/share" element={<ShareExperience />} />
          <Route path="/collaborate" element={<Collaboration />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Main>
      <BottomNav>
        <NavIcon as={Link} to="/countries" $active={window.location.pathname === '/countries'}><FiMap /></NavIcon>
        <NavIcon as={Link} to="/itineraries" $active={window.location.pathname === '/itineraries'}><FiMapPin /></NavIcon>
        <NavIcon as={Link} to="/collaborate" $active={window.location.pathname === '/collaborate'}><FiUsers /></NavIcon>
        <NavIcon as={Link} to="/profile" $active={window.location.pathname === '/profile'}><FiUser /></NavIcon>
      </BottomNav>
    </Router>
  );
}

export default App;