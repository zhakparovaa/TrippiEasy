import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const mockCountries = [
  { name: 'United States', flag: '🇺🇸' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'Turkey', flag: '🇹🇷' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'Thailand', flag: '🇹🇭' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'China', flag: '🇨🇳' },
  { name: 'Mexico', flag: '🇲🇽' },
  { name: 'Greece', flag: '🇬🇷' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Portugal', flag: '🇵🇹' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'Austria', flag: '🇦🇹' },
  { name: 'Switzerland', flag: '🇨🇭' },
  { name: 'Egypt', flag: '🇪🇬' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'South Africa', flag: '🇿🇦' },
  { name: 'Argentina', flag: '🇦🇷' },
  { name: 'New Zealand', flag: '🇳🇿' },
  { name: 'Morocco', flag: '🇲🇦' },
  { name: 'Indonesia', flag: '🇮🇩' },
  { name: 'Singapore', flag: '🇸🇬' },
  { name: 'Malaysia', flag: '🇲🇾' },
  { name: 'South Korea', flag: '🇰🇷' },
  { name: 'United Arab Emirates', flag: '🇦🇪' },
  { name: 'Vietnam', flag: '🇻🇳' },
  { name: 'Czech Republic', flag: '🇨🇿' },
  { name: 'Hungary', flag: '🇭🇺' },
  { name: 'Croatia', flag: '🇭🇷' },
  { name: 'Poland', flag: '🇵🇱' },
  { name: 'Russia', flag: '🇷🇺' },
  { name: 'Belgium', flag: '🇧🇪' },
  { name: 'Sweden', flag: '🇸🇪' },
  { name: 'Norway', flag: '🇳🇴' },
  { name: 'Denmark', flag: '🇩🇰' },
  { name: 'Finland', flag: '🇫🇮' },
  { name: 'Ireland', flag: '🇮🇪' },
  { name: 'Iceland', flag: '🇮🇸' },
  { name: 'Israel', flag: '🇮🇱' },
  { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'Philippines', flag: '🇵🇭' },
  { name: 'Chile', flag: '🇨🇱' },
  { name: 'Peru', flag: '🇵🇪' },
  { name: 'Colombia', flag: '🇨🇴' },
  { name: 'Albania', flag: '🇦🇱' },
  { name: 'Bulgaria', flag: '🇧🇬' },
  { name: 'Romania', flag: '🇷🇴' },
  { name: 'Slovakia', flag: '🇸🇰' },
  { name: 'Slovenia', flag: '🇸🇮' },
  { name: 'Turkey', flag: '🇹🇷' },
  { name: 'Ukraine', flag: '🇺🇦' },
  { name: 'Estonia', flag: '🇪🇪' },
  { name: 'Latvia', flag: '🇱🇻' },
  { name: 'Lithuania', flag: '🇱🇹' },
];

const Container = styled.div`
  padding: 24px 0 0 0;
`;
const SearchBar = styled.input`
  width: 90%;
  margin: 0 5% 16px 5%;
  padding: 12px 16px;
  border-radius: 24px;
  border: none;
  background: #f4f4f4;
  font-size: 18px;
`;
const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
`;
const FilterButton = styled.button`
  background: #ede9f6;
  border: none;
  border-radius: 12px;
  padding: 12px 32px;
  font-size: 18px;
  box-shadow: 0 2px 6px #0001;
  cursor: pointer;
`;
const CountryItem = styled.div`
  display: flex;
  align-items: center;
  background: #d3d3d3;
  border-radius: 32px;
  margin: 12px 5%;
  padding: 8px 24px;
  font-size: 24px;
  font-family: serif;
`;
const Flag = styled.span`
  font-size: 36px;
  margin-right: 24px;
`;

const CountryList = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState(mockCountries);
  const navigate = useNavigate();

  const filtered = countries.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCountryClick = (country) => {
    navigate('/itineraries', { state: { country } });
  };

  return (
    <Container>
      <SearchBar
        type="text"
        placeholder="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ButtonRow>
        <FilterButton>Filter</FilterButton>
        <FilterButton>Sort</FilterButton>
      </ButtonRow>
      {filtered.map((country, idx) => (
        <CountryItem key={country.name} onClick={() => handleCountryClick(country)} style={{cursor: 'pointer'}}>
          <Flag>{country.flag}</Flag>
          {country.name}
        </CountryItem>
      ))}
    </Container>
  );
};

export default CountryList; 