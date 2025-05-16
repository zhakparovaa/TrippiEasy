import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const mockItineraries = [
  { country: 'France', flag: '🇫🇷', name: 'Trip to Paris', dates: '7.5. - 12.5.' },
  { country: 'United Kingdom', flag: '🇬🇧', name: 'Trip to London', dates: '5.6. - 11.6.' },
  { country: 'Italy', flag: '🇮🇹', name: 'Trip to Rome', dates: '1.7. - 7.7.' },
];

const Container = styled.div`
  padding: 24px 0 0 0;
`;
const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
`;
const CountryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 16px;
  gap: 12px;
`;
const ItineraryCard = styled.div`
  display: flex;
  align-items: center;
  background: #d3d3d3;
  border-radius: 32px;
  margin: 16px 5%;
  padding: 16px 32px;
  font-size: 22px;
  font-family: serif;
  justify-content: flex-start;
`;
const Flag = styled.span`
  font-size: 36px;
  margin-right: 24px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
const Name = styled.div`
  font-size: 22px;
  font-weight: 500;
`;
const Dates = styled.div`
  font-size: 16px;
  color: #444;
  margin-top: 4px;
  font-style: italic;
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
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCountry = location.state?.country;

  const [itineraries, setItineraries] = useState(mockItineraries);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', dates: '' });

  const filteredItineraries = selectedCountry
    ? itineraries.filter(it => it.country === selectedCountry.name)
    : itineraries;

  const handleItineraryClick = (itinerary, idx) => {
    navigate(`/itinerary/${idx}`, { state: { itinerary } });
  };

  const handleAdd = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setForm({ name: '', dates: '' });
  };
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.dates) return;
    setItineraries(its => [
      ...its,
      {
        country: selectedCountry ? selectedCountry.name : 'Unknown',
        flag: selectedCountry ? selectedCountry.flag : '🏳️',
        name: form.name,
        dates: form.dates,
      },
    ]);
    handleClose();
  };

  return (
    <Container>
      <Title>Itineraries</Title>
      {selectedCountry && (
        <CountryHeader>
          <span style={{ fontSize: 32 }}>{selectedCountry.flag}</span>
          <span>{selectedCountry.name}</span>
        </CountryHeader>
      )}
      {filteredItineraries.map((it, idx) => (
        <ItineraryCard key={idx} onClick={() => handleItineraryClick(it, idx)} style={{cursor: 'pointer'}}>
          <Flag>{it.flag}</Flag>
          <Info>
            <Name>{it.name}</Name>
            <Dates>{it.dates}</Dates>
          </Info>
        </ItineraryCard>
      ))}
      {filteredItineraries.length === 0 && (
        <div style={{ textAlign: 'center', color: '#888', marginTop: 32 }}>
          No itineraries for this country yet.
        </div>
      )}
      <AddButton title="Add new itinerary" onClick={handleAdd}>+</AddButton>
      {showModal && (
        <ModalOverlay>
          <Modal>
            <ModalTitle>Add New Itinerary</ModalTitle>
            <form onSubmit={handleSubmit}>
              <Input
                name="name"
                placeholder="Trip name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <Input
                name="dates"
                placeholder="Dates (e.g. 1.7. - 7.7.)"
                value={form.dates}
                onChange={handleChange}
                required
              />
              <ModalButtonRow>
                <ModalButton type="button" onClick={handleClose}>Cancel</ModalButton>
                <ModalButton type="submit">Add</ModalButton>
              </ModalButtonRow>
            </form>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Itineraries; 