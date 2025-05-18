import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchAPI, API_ENDPOINTS } from '../api/config';

const Container = styled.div`
  padding: 24px 0 0 0;
  text-align: center;
`;
const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
`;
const UserInfo = styled.div`
  font-size: 18px;
  color: #333;
  margin: 16px 5%;
`;
const Avatar = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 16px auto;
  display: block;
  background: #ede9f6;
`;
const EditBtn = styled.button`
  margin: 12px 0 24px 0;
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  background: #ede9f6;
  font-size: 16px;
  cursor: pointer;
`;
const SectionTitle = styled.h3`
  font-size: 20px;
  margin: 32px 0 12px 0;
`;
const PlaceCard = styled.div`
  background: #eceaf1;
  border-radius: 18px;
  margin: 12px 5%;
  padding: 16px 20px;
  font-size: 16px;
  text-align: left;
`;
const AddPlaceBtn = styled.button`
  margin: 16px 0;
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  background: #ede9f6;
  font-size: 16px;
  cursor: pointer;
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
const Input = styled.input`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
`;
const Textarea = styled.textarea`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  min-height: 60px;
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
const PlaceActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;
const ActionButton = styled.button`
  padding: 4px 10px;
  border-radius: 6px;
  border: none;
  background: #ede9f6;
  font-size: 14px;
  cursor: pointer;
`;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', avatar: '' });
  const [places, setPlaces] = useState([]);
  const [showPlaceModal, setShowPlaceModal] = useState(false);
  const [placeForm, setPlaceForm] = useState({ name: '', tips: '' });
  const [editingPlaceIdx, setEditingPlaceIdx] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchAPI('/profile');
        setUser(data);
        setEditForm({ name: data.name || '', avatar: data.avatar || '' });
        setPlaces(data.placesVisited || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const persistProfile = async (newProfile) => {
    try {
      const updated = await fetchAPI('/profile', {
        method: 'PATCH',
        body: JSON.stringify(newProfile),
      });
      setUser(updated);
      setEditForm({ name: updated.name || '', avatar: updated.avatar || '' });
      setPlaces(updated.placesVisited || []);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleEditProfile = () => setShowEditModal(true);
  const handleEditChange = e => setEditForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleEditSave = async () => {
    const newProfile = { ...user, name: editForm.name, avatar: editForm.avatar };
    await persistProfile(newProfile);
    setShowEditModal(false);
  };

  const handleAddPlace = () => {
    setPlaceForm({ name: '', tips: '' });
    setEditingPlaceIdx(null);
    setShowPlaceModal(true);
  };
  const handlePlaceChange = e => setPlaceForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handlePlaceSave = async () => {
    let newPlaces;
    if (editingPlaceIdx !== null) {
      newPlaces = places.map((p, idx) => idx === editingPlaceIdx ? { ...placeForm } : p);
    } else {
      newPlaces = [...places, { ...placeForm }];
    }
    setPlaces(newPlaces);
    setShowPlaceModal(false);
    setPlaceForm({ name: '', tips: '' });
    setEditingPlaceIdx(null);
    await persistProfile({ ...user, placesVisited: newPlaces });
  };
  const handleEditPlace = idx => {
    setPlaceForm(places[idx]);
    setEditingPlaceIdx(idx);
    setShowPlaceModal(true);
  };
  const handleDeletePlace = async idx => {
    const newPlaces = places.filter((_, i) => i !== idx);
    setPlaces(newPlaces);
    await persistProfile({ ...user, placesVisited: newPlaces });
  };

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>{error}</Container>;
  if (!user) return <Container><Title>No profile data available.</Title></Container>;

  return (
    <Container>
      <Title>Profile</Title>
      <Avatar src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=ede9f6&color=222`} alt="avatar" />
      <UserInfo style={{ fontWeight: 600, fontSize: 22 }}>{user.name || 'No name'}</UserInfo>
      <UserInfo>{user.email || 'No email'}</UserInfo>
      <EditBtn onClick={handleEditProfile}>Edit Profile</EditBtn>
      <SectionTitle>Places I Visited</SectionTitle>
      {places.length === 0 && <div style={{ color: '#888' }}>No places added yet.</div>}
      {places.map((place, idx) => (
        <PlaceCard key={idx}>
          <div style={{ fontWeight: 600 }}>{place.name}</div>
          <div style={{ color: '#444', marginTop: 6 }}>{place.tips}</div>
          <PlaceActions>
            <ActionButton onClick={() => handleEditPlace(idx)}>Edit</ActionButton>
            <ActionButton onClick={() => handleDeletePlace(idx)}>Delete</ActionButton>
          </PlaceActions>
        </PlaceCard>
      ))}
      <AddPlaceBtn onClick={handleAddPlace}>Add Place</AddPlaceBtn>
      {showEditModal && (
        <ModalOverlay>
          <Modal>
            <h3>Edit Profile</h3>
            <Input
              name="name"
              placeholder="Name"
              value={editForm.name}
              onChange={handleEditChange}
            />
            <Input
              name="avatar"
              placeholder="Avatar URL (optional)"
              value={editForm.avatar}
              onChange={handleEditChange}
            />
            <ModalButtonRow>
              <ModalButton type="button" onClick={() => setShowEditModal(false)}>Cancel</ModalButton>
              <ModalButton type="button" onClick={handleEditSave}>Save</ModalButton>
            </ModalButtonRow>
          </Modal>
        </ModalOverlay>
      )}
      {showPlaceModal && (
        <ModalOverlay>
          <Modal>
            <h3>{editingPlaceIdx !== null ? 'Edit Place' : 'Add Place'}</h3>
            <Input
              name="name"
              placeholder="Place Name"
              value={placeForm.name}
              onChange={handlePlaceChange}
            />
            <Textarea
              name="tips"
              placeholder="Tips & Experience"
              value={placeForm.tips}
              onChange={handlePlaceChange}
            />
            <ModalButtonRow>
              <ModalButton type="button" onClick={() => setShowPlaceModal(false)}>Cancel</ModalButton>
              <ModalButton type="button" onClick={handlePlaceSave}>Save</ModalButton>
            </ModalButtonRow>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Profile;