import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchAPI, API_ENDPOINTS } from '../api/config';

const Container = styled.div`
  padding: 24px 0 0 0;
`;
const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
`;
const CountryHeader = styled.div`
  display: flex;
  align-items: center;
  background: #d3d3d3;
  border-radius: 32px;
  margin: 0 5% 24px 5%;
  padding: 16px 24px;
  font-size: 24px;
  font-family: serif;
`;
const Flag = styled.span`
  font-size: 36px;
  margin-right: 24px;
`;
const ItineraryCard = styled.div`
  background: #eceaf1;
  border-radius: 18px;
  margin: 12px 5%;
  padding: 16px 20px;
  font-size: 18px;
  font-family: serif;
  box-shadow: 0 2px 8px #0001;
  position: relative;
`;
const ItineraryTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;
const ItineraryDates = styled.div`
  color: #444;
  font-size: 16px;
`;
const ActionButtons = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 8px;
`;
const ActionButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  background: ${props => props.$delete ? '#ffebee' : '#e3f2fd'};
  color: ${props => props.$delete ? '#c62828' : '#1565c0'};
  &:hover {
    background: ${props => props.$delete ? '#ffcdd2' : '#bbdefb'};
  }
`;
const AddButton = styled.button`
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border: 3px solid #d3d3d3;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  font-size: 32px;
  color: #222;
  box-shadow: 0 2px 8px #0002;
  cursor: pointer;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #0008;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const Modal = styled.div`
  background: #fff;
  border-radius: 24px;
  padding: 32px 24px;
  min-width: 320px;
  box-shadow: 0 4px 24px #0002;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const ModalTitle = styled.h3`
  margin: 0 0 8px 0;
  text-align: center;
`;
const Input = styled.input`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
`;
const ModalButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;
const ModalButton = styled.button`
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  background: #ede9f6;
  font-size: 16px;
  cursor: pointer;
`;

const Itineraries = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCountry = location.state?.selectedCountry;
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingItinerary, setEditingItinerary] = useState(null);
  const [form, setForm] = useState({ title: '', dates: '' });

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        let data;
        if (selectedCountry) {
          data = await fetchAPI(`${API_ENDPOINTS.itineraries}?countryId=${selectedCountry._id}`);
        } else {
          data = await fetchAPI('/itineraries/all');
        }
        setItineraries(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch itineraries');
        setLoading(false);
      }
    };
    fetchItineraries();
  }, [selectedCountry]);

  const formatDateToDDMM = (dateString) => {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '';
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}.`;
  };

  const handleEdit = (itinerary) => {
    setEditingItinerary(itinerary);
    setForm({
      title: itinerary.title,
      dates: `${formatDateToDDMM(itinerary.startDate)} - ${formatDateToDDMM(itinerary.endDate)}`
    });
    setShowModal(true);
  };

  const handleDelete = async (itineraryId) => {
    if (!window.confirm('Are you sure you want to delete this itinerary?')) return;
    try {
      await fetchAPI(`${API_ENDPOINTS.itineraries}/${itineraryId}`, { method: 'DELETE' });
      setItineraries(prev => prev.filter(i => i._id !== itineraryId));
    } catch (err) {
      setError('Failed to delete itinerary');
    }
  };

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>{error}</Container>;

  return (
    <Container>
      <Title>Itineraries</Title>
      {selectedCountry && (
        <CountryHeader>
          <Flag>{selectedCountry.flag || '🏳️'}</Flag>
          {selectedCountry.name}
        </CountryHeader>
      )}
      {itineraries.map(itinerary => (
        <ItineraryCard key={itinerary._id}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, cursor: 'pointer' }} onClick={() => navigate(`/itineraries/${itinerary._id}`, { state: { itinerary } })}>
            <Flag>{itinerary.countryFlag || '🏳️'}</Flag>
            <div>
              <ItineraryTitle>{itinerary.title}</ItineraryTitle>
              <ItineraryDates>
                {itinerary.startDate && itinerary.endDate
                  ? `${formatDateToDDMM(itinerary.startDate)} - ${formatDateToDDMM(itinerary.endDate)}`
                  : ''}
              </ItineraryDates>
            </div>
          </div>
          <ActionButtons>
            <ActionButton onClick={() => handleEdit(itinerary)}>Edit</ActionButton>
            <ActionButton $delete onClick={() => handleDelete(itinerary._id)}>Delete</ActionButton>
          </ActionButtons>
        </ItineraryCard>
      ))}
      <AddButton title="Add new itinerary" onClick={() => setShowModal(true)}>+</AddButton>
      {showModal && (
        <ModalOverlay>
          <Modal>
            <ModalTitle>{editingItinerary ? 'Edit Itinerary' : 'Add New Itinerary'}</ModalTitle>
            <form onSubmit={async (e) => {
              e.preventDefault();
              if (!form.title || !form.dates) {
                setError('Please provide itinerary name and dates.');
                return;
              }
              try {
                const [startDateStr, endDateStr] = form.dates.split(' - ').map(date => date.trim());
                const [startDay, startMonth] = startDateStr.split('.').map(Number);
                const [endDay, endMonth] = endDateStr.split('.').map(Number);
                const currentYear = new Date().getFullYear();
                const startDate = new Date(currentYear, startMonth - 1, startDay);
                const endDate = new Date(currentYear, endMonth - 1, endDay);
                if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || startDate > endDate) {
                  setError('Invalid date range. Use DD.MM. - DD.MM. format (e.g., 09.06. - 11.06.).');
                  return;
                }
                const itineraryData = {
                  title: form.title,
                  startDate: startDate.toISOString().split('T')[0],
                  endDate: endDate.toISOString().split('T')[0],
                  ...(selectedCountry ? { country: selectedCountry._id } : {}),
                };
                if (editingItinerary) {
                  const updatedItinerary = await fetchAPI(`${API_ENDPOINTS.itineraries}/${editingItinerary._id}`, {
                    method: 'PUT',
                    body: JSON.stringify(itineraryData),
                  });
                  setItineraries(prev => prev.map(i => i._id === editingItinerary._id ? updatedItinerary : i));
                } else {
                  const newItinerary = await fetchAPI(API_ENDPOINTS.itineraries, {
                    method: 'POST',
                    body: JSON.stringify(itineraryData),
                  });
                  setItineraries(prev => [...prev, newItinerary]);
                }
                setShowModal(false);
                setForm({ title: '', dates: '' });
                setEditingItinerary(null);
              } catch (err) {
                setError(editingItinerary ? 'Failed to update itinerary' : 'Failed to create itinerary');
              }
            }}>
              <Input
                name="title"
                placeholder="Itinerary title"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                required
              />
              <Input
                name="dates"
                placeholder="Dates (e.g., 09.06. - 11.06.)"
                value={form.dates}
                onChange={e => setForm(f => ({ ...f, dates: e.target.value }))}
                required
              />
              <ModalButtonRow>
                <ModalButton type="button" onClick={() => { setShowModal(false); setEditingItinerary(null); setForm({ title: '', dates: '' }); }}>Cancel</ModalButton>
                <ModalButton type="submit">{editingItinerary ? 'Save' : 'Add'}</ModalButton>
              </ModalButtonRow>
            </form>
            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Itineraries;