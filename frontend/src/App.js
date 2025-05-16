import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiMap, FiMapPin, FiUsers, FiUser } from 'react-icons/fi';
import CountryList from './pages/CountryList';
import Itineraries from './pages/Itineraries';
import ItineraryDetail from './pages/ItineraryDetail';
import ShareExperience from './pages/ShareExperience';
import Collaboration from './pages/Collaboration';
import Profile from './pages/Profile';

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
  color: #111;
`;
const Main = styled.main`
  padding-bottom: 80px;
`;

function App() {
  return (
    <Router>
      <Main>
        <Routes>
          <Route path="/" element={<Navigate to="/countries" />} />
          <Route path="/countries" element={<CountryList />} />
          <Route path="/itineraries" element={<Itineraries />} />
          <Route path="/itinerary/:id" element={<ItineraryDetail />} />
          <Route path="/share" element={<ShareExperience />} />
          <Route path="/collaborate" element={<Collaboration />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Main>
      <BottomNav>
        <NavIcon as="a" href="/countries"><FiMap /></NavIcon>
        <NavIcon as="a" href="/itineraries"><FiMapPin /></NavIcon>
        <NavIcon as="a" href="/collaborate"><FiUsers /></NavIcon>
        <NavIcon as="a" href="/profile"><FiUser /></NavIcon>
      </BottomNav>
    </Router>
  );
}

export default App;
