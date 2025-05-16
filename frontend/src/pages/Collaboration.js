import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 24px 0 0 0;
`;
const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
`;
const TripCard = styled.div`
  background: #d3d3d3;
  border-radius: 32px;
  margin: 0 5% 32px 5%;
  padding: 24px 32px;
  font-size: 20px;
  font-family: serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FriendsRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 18px;
  gap: 24px;
`;
const Friend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  position: relative;
`;
const FriendIcon = styled.div`
  font-size: 32px;
  margin-bottom: 4px;
`;
const RemoveBtn = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #fff8;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 14px;
  cursor: pointer;
`;
const AddFriendRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 18px;
  width: 100%;
  justify-content: center;
`;
const AddInput = styled.input`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
`;
const AddBtn = styled.button`
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  background: #ede9f6;
  font-size: 16px;
  cursor: pointer;
`;
const UpdatesTitle = styled.h3`
  font-size: 18px;
  margin: 32px 0 12px 0;
  text-align: left;
`;
const Update = styled.div`
  font-size: 16px;
  color: #333;
  margin: 8px 5%;
`;

const mockTrip = {
  name: 'Trip to Paris',
  dates: '7.5. - 12.5.',
};

const Collaboration = () => {
  const [friends, setFriends] = useState([
    { name: 'Friend 1', icon: '👤' },
    { name: 'Friend 2', icon: '👤' },
  ]);
  const [updates, setUpdates] = useState([
    'Friend 1 edited itinerary',
    'Friend 2 joined the collaboration',
  ]);
  const [newFriend, setNewFriend] = useState('');

  const handleAddFriend = () => {
    if (!newFriend.trim()) return;
    setFriends(f => [...f, { name: newFriend, icon: '👤' }]);
    setUpdates(u => [
      `${newFriend} joined the collaboration`,
      ...u,
    ]);
    setNewFriend('');
  };

  const handleRemoveFriend = idx => {
    const removed = friends[idx];
    setFriends(f => f.filter((_, i) => i !== idx));
    setUpdates(u => [
      `${removed.name} left the collaboration`,
      ...u,
    ]);
  };

  return (
    <Container>
      <Title>Collaborating</Title>
      <TripCard>
        <div>{mockTrip.name}</div>
        <div style={{ fontSize: 16, color: '#444', marginBottom: 12 }}>{mockTrip.dates}</div>
        <FriendsRow>
          {friends.map((f, idx) => (
            <Friend key={idx}>
              <FriendIcon>{f.icon}</FriendIcon>
              {f.name}
              <RemoveBtn type="button" onClick={() => handleRemoveFriend(idx)}>&times;</RemoveBtn>
            </Friend>
          ))}
        </FriendsRow>
        <AddFriendRow>
          <AddInput
            placeholder="Add friend..."
            value={newFriend}
            onChange={e => setNewFriend(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleAddFriend(); }}
          />
          <AddBtn type="button" onClick={handleAddFriend}>Add</AddBtn>
        </AddFriendRow>
      </TripCard>
      <UpdatesTitle>Last updates</UpdatesTitle>
      {updates.map((u, idx) => (
        <Update key={idx}>{u}</Update>
      ))}
    </Container>
  );
};

export default Collaboration; 