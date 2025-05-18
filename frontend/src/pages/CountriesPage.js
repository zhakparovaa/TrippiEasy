import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { fetchAPI, API_ENDPOINTS } from '../api/config';

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
  cursor: pointer;
`;
const Flag = styled.span`
  font-size: 36px;
  margin-right: 24px;
`;

const CountryList = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await fetchAPI(API_ENDPOINTS.countries);
        setCountries(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch countries');
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const filtered = countries.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCountryClick = (country) => {
    navigate('/itineraries', { state: { selectedCountry: country } });
  };

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>{error}</Container>;

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
      {filtered.map((country) => (
        <CountryItem key={country._id} onClick={() => handleCountryClick(country)}>
          <Flag>{country.flag || '🏳️'}</Flag>
          {country.name}
        </CountryItem>
      ))}
    </Container>
  );
};

export default CountryList;