import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  padding: 24px 0 0 0;
`;
const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
`;
const Card = styled.div`
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
const DayTabs = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-start;
  align-items: center;
  margin: 24px 5% 16px 5%;
`;
const DayTab = styled.button`
  background: ${props => (props.active ? '#bdb7c6' : '#ede9f6')};
  color: #222;
  border: none;
  border-radius: 12px;
  padding: 10px 18px;
  font-size: 16px;
  font-weight: ${props => (props.active ? 600 : 400)};
  box-shadow: ${props => (props.active ? '0 2px 8px #0002' : 'none')};
  cursor: pointer;
`;
const ActivityCard = styled.div`
  background: #eceaf1;
  border-radius: 18px;
  margin: 12px 5%;
  padding: 16px 20px;
  font-size: 18px;
  font-family: serif;
  box-shadow: 0 2px 8px #0001;
`;
const ActivityTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;
const ActivityDesc = styled.div`
  color: #444;
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

// Mock daily activities for demonstration
const initialDays = [
  {
    date: 'Wed 7/5',
    activities: [
      { title: 'Flight', desc: 'PRG - CDG\n8:10 am - 9:55 am' },
      { title: 'Accommodation', desc: 'Hotel Plaza' },
    ],
  },
  {
    date: 'Thu 8/5',
    activities: [
      { title: 'Eiffel Tower', desc: 'Open 9:30 am - 11 pm • built in 1889 tower, with steps and elevator to observation desk' },
      { title: 'Champ-de-Mars', desc: 'Landscaped park with paths & trees, extensive lawns and a kid\'s area' },
    ],
  },
  {
    date: 'Fri 9/5',
    activities: [
      { title: 'Louvre Museum', desc: 'World-famous art museum, open 9 am - 6 pm' },
    ],
  },
  {
    date: 'Sat 10/5',
    activities: [
      { title: 'Montmartre', desc: 'Historic district with artists, cafes, and the Sacré-Cœur' },
    ],
  },
];

const ItineraryDetail = () => {
  const location = useLocation();
  const itinerary = location.state?.itinerary;
  const [selectedDay, setSelectedDay] = useState(0);
  const [days, setDays] = useState(initialDays);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', desc: '' });

  if (!itinerary) {
    return <Container><Title>No itinerary data found.</Title></Container>;
  }

  const handleAdd = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setForm({ title: '', desc: '' });
  };
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title || !form.desc) return;
    setDays(ds => ds.map((day, idx) =>
      idx === selectedDay
        ? { ...day, activities: [...day.activities, { title: form.title, desc: form.desc }] }
        : day
    ));
    handleClose();
  };

  return (
    <Container>
      <Title>Trip to {itinerary.name}</Title>
      <Card>
        <Flag>{itinerary.flag}</Flag>
        <Info>
          <Name>{itinerary.name}</Name>
          <Dates>{itinerary.dates}</Dates>
        </Info>
      </Card>
      <DayTabs>
        {days.map((day, idx) => (
          <DayTab
            key={day.date}
            active={selectedDay === idx}
            onClick={() => setSelectedDay(idx)}
          >
            {day.date}
          </DayTab>
        ))}
      </DayTabs>
      {days[selectedDay].activities.map((act, idx) => (
        <ActivityCard key={idx}>
          <ActivityTitle>{act.title}</ActivityTitle>
          <ActivityDesc>{act.desc}</ActivityDesc>
        </ActivityCard>
      ))}
      <AddButton title="Add new activity" onClick={handleAdd}>+</AddButton>
      {showModal && (
        <ModalOverlay>
          <Modal>
            <ModalTitle>Add New Activity</ModalTitle>
            <form onSubmit={handleSubmit}>
              <Input
                name="title"
                placeholder="Activity title"
                value={form.title}
                onChange={handleChange}
                required
              />
              <Input
                name="desc"
                placeholder="Description"
                value={form.desc}
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

export default ItineraryDetail; 