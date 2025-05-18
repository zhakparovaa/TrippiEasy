import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import { fetchAPI, API_ENDPOINTS, BASE_URL } from '../api/config';
import { FaRegCalendarAlt, FaMap, FaMapMarkerAlt, FaUsers, FaUser } from 'react-icons/fa';

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
  flex: 1;
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
const EditButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: #e3f2fd;
  color: #1565c0;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #bbdefb;
  }
`;
const DayTabs = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-start;
  align-items: center;
  margin: 24px 5% 16px 5%;
  overflow-x: auto;
  padding-bottom: 8px;
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
  }
`;
const DayTab = styled.button`
  background: ${({ $active }) => ($active ? '#bdb7c6' : '#ede9f6')};
  color: #222;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  box-shadow: ${({ $active }) => ($active ? '0 2px 8px #0002' : 'none')};
  cursor: pointer;
  white-space: nowrap;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;
const DayNumber = styled.span`
  font-size: 18px;
  font-weight: 600;
`;
const DayDate = styled.span`
  font-size: 14px;
  color: #666;
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
const ActivityActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  justify-content: flex-end;
`;
const ActionButton = styled.button`
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
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
const BottomNav = styled.div`
  position: fixed;
  left: 0; right: 0; bottom: 0;
  height: 64px;
  background: #fff;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
`;
const NavIcon = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  color: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const CalendarIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 12px 0 5%;
  font-size: 36px;
`;

const ItineraryDetail = () => {
  const location = useLocation();
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(location.state?.itinerary);
  const [selectedDay, setSelectedDay] = useState(0);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [form, setForm] = useState({ title: '', desc: '' });
  const [editForm, setEditForm] = useState({ title: '', dates: '' });
  const [activities, setActivities] = useState([]);
  const [editingActivity, setEditingActivity] = useState(null);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) {
      console.error('Invalid date provided to formatDate:', dateString);
      return 'Invalid Date';
    }
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  const formatDateToDDMM = (dateString) => {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) {
      console.error('Invalid date provided to formatDateToDDMM:', dateString);
      return 'Invalid Date';
    }
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}.`;
  };

  useEffect(() => {
    const fetchItineraryDetails = async () => {
      try {
        let currentItinerary = itinerary;
        if (!currentItinerary) {
          console.log('Fetching itinerary details for ID:', id);
          const data = await fetchAPI(`${API_ENDPOINTS.itineraries}/${id}`);
          setItinerary(data);
          currentItinerary = data;
          console.log('Fetched Itinerary object:', currentItinerary);
        }

        console.log('Itinerary dates and duration:', {
          startDate: currentItinerary?.startDate,
          endDate: currentItinerary?.endDate,
          duration: currentItinerary?.duration
        });

        const activitiesData = await fetchAPI(`${API_ENDPOINTS.activities}/${id}`);
        setActivities(activitiesData);

        const startDate = new Date(currentItinerary?.startDate || Date.now());
        const duration = Math.max(1, currentItinerary?.duration || 1);

        console.log('Generating days array with start date and duration:', { startDate: startDate.toISOString(), duration });

        const daysArray = Array.from({ length: duration }, (_, index) => {
          const date = new Date(startDate);
          date.setDate(date.getDate() + index);
          return {
            date: formatDate(date),
            activities: []
          };
        });

        activitiesData.forEach(activity => {
          const dayIndex = activity.day - 1;
          if (dayIndex >= 0 && dayIndex < daysArray.length) {
            if (!daysArray[dayIndex].activities) {
              daysArray[dayIndex].activities = [];
            }
            daysArray[dayIndex].activities.push(activity);
          } else {
            console.warn(`Activity with day ${activity.day} is outside itinerary duration of ${duration} days.`, activity);
          }
        });

        console.log('Final generated days array:', daysArray);

        setDays(daysArray);
        setLoading(false);

        if (currentItinerary) {
          setEditForm({
            title: currentItinerary.title || '',
            dates: `${formatDateToDDMM(currentItinerary.startDate)} - ${formatDateToDDMM(currentItinerary.endDate)}`
          });
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch itinerary details or activities');
        setLoading(false);
      }
    };
    fetchItineraryDetails();
  }, [id]);

  const handleAdd = () => {
    setEditingActivity(null);
    setForm({ title: '', desc: '' });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setForm({ title: '', desc: '' });
    setEditingActivity(null);
  };

  const handleEditOpen = () => {
    setShowEditModal(true);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    setEditForm({
      title: itinerary?.title || '',
      dates: itinerary?.startDate && itinerary?.endDate
        ? `${formatDateToDDMM(itinerary.startDate)} - ${formatDateToDDMM(itinerary.endDate)}`
        : ''
    });
  };

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleEditChange = e => setEditForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleEdit = async (activityId) => {
    try {
      console.log('Attempting to edit activity:', activityId);
      const activityToEdit = activities.find(activity => activity._id === activityId);
      if (activityToEdit) {
        setEditingActivity(activityToEdit);
        setForm({
          title: activityToEdit.title,
          desc: activityToEdit.description
        });
        setShowModal(true);
      }
    } catch (err) {
      console.error('Error preparing edit:', err);
      setError('Failed to prepare activity for editing');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editForm.title || !editForm.dates) {
      setError('Please provide itinerary name and dates.');
      return;
    }

    try {
      const [startDateStr, endDateStr] = editForm.dates.split(' - ').map(date => date.trim());
      const [startDay, startMonth] = startDateStr.split('.').map(Number);
      const [endDay, endMonth] = endDateStr.split('.').map(Number);
      const currentYear = new Date().getFullYear();
      
      // Create dates with the current year
      const startDate = new Date(currentYear, startMonth - 1, startDay);
      const endDate = new Date(currentYear, endMonth - 1, endDay);

      // Validate dates
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        setError('Invalid date format. Use DD.MM. - DD.MM. format (e.g., 09.06. - 11.06.).');
        return;
      }

      if (startDate > endDate) {
        setError('Start date must be before end date.');
        return;
      }

      const response = await fetch(`${BASE_URL}${API_ENDPOINTS.itineraries}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editForm.title,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          country: itinerary.country?._id || itinerary.country
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const updatedItinerary = await response.json();
      setItinerary(updatedItinerary);

      // Update days array with new dates
      const start = new Date(updatedItinerary.startDate);
      const duration = calculateDuration(updatedItinerary.startDate, updatedItinerary.endDate);
      const newDaysArray = Array.from({ length: duration }, (_, index) => {
        const date = new Date(start);
        date.setDate(date.getDate() + index);
        const existingDay = days[index] || { activities: [] };
        return {
          date: formatDate(date),
          activities: existingDay.activities
        };
      });

      setDays(newDaysArray);
      handleEditClose();
    } catch (err) {
      console.error('Error updating itinerary:', err);
      if (err.message.includes('Itinerary not found')) {
        setError('Itinerary not found. Please refresh and try again.');
      } else if (err.message.includes('Invalid date range')) {
        setError('Invalid date range. Please ensure dates are valid and start date is before end date.');
      } else {
        setError('Failed to update itinerary. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.desc) {
      setError('Please provide activity title and description.');
      return;
    }

    try {
      if (editingActivity) {
        // Update existing activity
        const response = await fetch(`${BASE_URL}${API_ENDPOINTS.activities}/${editingActivity._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: form.title,
            description: form.desc,
            day: selectedDay + 1,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const updatedActivity = await response.json();
        setActivities(prevActivities =>
          prevActivities.map(activity =>
            activity._id === editingActivity._id ? updatedActivity : activity
          ));

        setDays(prevDays => prevDays.map(day => ({
          ...day,
          activities: day.activities.map(activity =>
            activity._id === editingActivity._id ? updatedActivity : activity
          )
        })));
      } else {
        // Create new activity
        const response = await fetch(`${BASE_URL}${API_ENDPOINTS.activities}/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: form.title,
            description: form.desc,
            day: selectedDay + 1,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const newActivity = await response.json();
        setActivities(prevActivities => [...prevActivities, newActivity]);
        setDays(prevDays => prevDays.map((day, idx) =>
          idx === selectedDay
            ? { ...day, activities: [...day.activities, newActivity] }
            : day
        ));
      }
      handleClose();
    } catch (err) {
      console.error('Error saving activity:', err);
      setError(editingActivity ? 'Failed to update activity' : 'Failed to add activity');
    }
  };

  const handleDelete = async (activityId) => {
    if (!window.confirm('Are you sure you want to delete this activity?')) {
      return;
    }

    try {
      console.log('Attempting to delete activity:', activityId);
      const url = `${API_ENDPOINTS.activities}/${activityId}`;
      console.log('Delete URL:', `${BASE_URL}${url}`);

      const response = await fetch(`${BASE_URL}${url}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Delete response status:', response.status);
      const responseText = await response.text();
      console.log('Delete response text:', responseText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${responseText}`);
      }

      setActivities(prevActivities => prevActivities.filter(activity => activity._id !== activityId));
      setDays(prevDays => prevDays.map(day => ({
        ...day,
        activities: day.activities.filter(activity => activity._id !== activityId)
      })));
    } catch (err) {
      console.error('Error deleting activity:', err);
      console.error('Error details:', {
        message: err.message,
        stack: err.stack
      });
      setError('Failed to delete activity. Please try again.');
    }
  };

  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>{error}</Container>;
  if (!itinerary) return <Container><Title>No itinerary data found.</Title></Container>;

  return (
    <Container>
      <Title>{itinerary.title}</Title>
      <Card>
        <Flag>{itinerary.country?.flag || '🏳️'}</Flag>
        <Info>
          <Name>{itinerary.title}</Name>
          <Dates>
            {itinerary.startDate && itinerary.endDate
              ? `${formatDateToDDMM(itinerary.startDate)} - ${formatDateToDDMM(itinerary.endDate)}`
              : 'Dates not available'}
          </Dates>
        </Info>
        <EditButton onClick={handleEditOpen}>Edit</EditButton>
      </Card>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <CalendarIconWrapper>
          <FaRegCalendarAlt />
        </CalendarIconWrapper>
        <DayTabs style={{ flex: 1 }}>
          {days.map((day, idx) => (
            <DayTab
              key={idx}
              $active={idx === selectedDay}
              onClick={() => setSelectedDay(idx)}
            >
              <DayNumber>Day {idx + 1}</DayNumber>
              <DayDate>{day.date}</DayDate>
            </DayTab>
          ))}
        </DayTabs>
      </div>
      {days[selectedDay]?.activities && days[selectedDay].activities.map((activity, idx) => (
        <ActivityCard key={activity._id || idx}>
          <ActivityTitle>{activity.title}</ActivityTitle>
          <ActivityDesc>{activity.description}</ActivityDesc>
          <ActivityActions>
            <ActionButton onClick={() => handleEdit(activity._id)}>
              Edit
            </ActionButton>
            <ActionButton $delete onClick={() => handleDelete(activity._id)}>
              Delete
            </ActionButton>
          </ActivityActions>
        </ActivityCard>
      ))}
      <AddButton title="Add new activity" onClick={handleAdd} style={{ bottom: 90 }}>+</AddButton>
      {showModal && (
        <ModalOverlay>
          <Modal>
            <ModalTitle>{editingActivity ? 'Edit Activity' : 'Add New Activity'}</ModalTitle>
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
                placeholder="Activity description"
                value={form.desc}
                onChange={handleChange}
                required
              />
              <ModalButtonRow>
                <ModalButton type="button" onClick={handleClose}>Cancel</ModalButton>
                <ModalButton type="submit">{editingActivity ? 'Save' : 'Add'}</ModalButton>
              </ModalButtonRow>
            </form>
            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
          </Modal>
        </ModalOverlay>
      )}
      {showEditModal && (
        <ModalOverlay>
          <Modal>
            <ModalTitle>Edit Itinerary</ModalTitle>
            <form onSubmit={handleEditSubmit}>
              <Input
                name="title"
                placeholder="Itinerary title"
                value={editForm.title}
                onChange={handleEditChange}
                required
              />
              <Input
                name="dates"
                placeholder="Dates (e.g., 09.06. - 11.06.)"
                value={editForm.dates}
                onChange={handleEditChange}
                required
              />
              <ModalButtonRow>
                <ModalButton type="button" onClick={handleEditClose}>Cancel</ModalButton>
                <ModalButton type="submit">Save</ModalButton>
              </ModalButtonRow>
            </form>
            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
          </Modal>
        </ModalOverlay>
      )}
      <BottomNav>
        <NavIcon><FaMap /></NavIcon>
        <NavIcon><FaMapMarkerAlt /></NavIcon>
        <NavIcon><FaUsers /></NavIcon>
        <NavIcon><FaUser /></NavIcon>
      </BottomNav>
    </Container>
  );
};

export default ItineraryDetail;