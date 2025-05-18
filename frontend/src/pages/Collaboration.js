import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import { fetchAPI, API_ENDPOINTS, BASE_URL } from '../api/config';

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
`;
const FriendIcon = styled.div`
  font-size: 32px;
  margin-bottom: 4px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fff;
  overflow: hidden;
`;
const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;
const CopyLinkBtn = styled.button`
  margin: 16px 0 0 0;
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
const CreateBtn = styled.button`
  margin: 0 5% 24px 5%;
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  background: #ede9f6;
  font-size: 18px;
  cursor: pointer;
  font-weight: 600;
  width: 90%;
  display: block;
`;
const Select = styled.select`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
`;
const ItineraryCard = styled.div`
  background: #eceaf1;
  border-radius: 18px;
  margin: 12px 0;
  padding: 16px 20px;
  font-size: 18px;
  font-family: serif;
  box-shadow: 0 2px 8px #0001;
  display: flex;
  align-items: center;
  gap: 24px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.2s;
  &:hover, &.selected {
    border: 2px solid #b39ddb;
    background: #ede9f6;
  }
`;
const Flag = styled.span`
  font-size: 36px;
  margin-right: 24px;
`;
const CardList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 16px;
`;

const Collaboration = () => {
  const location = useLocation();
  const params = useParams();
  const [trip, setTrip] = useState(null);
  const [friends, setFriends] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinName, setJoinName] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [allItineraries, setAllItineraries] = useState([]);
  const [selectedItinId, setSelectedItinId] = useState('');
  const [selectedShareLink, setSelectedShareLink] = useState('');

  const shareLink = location.state?.shareLink || params.shareLink;
  const itineraryId = location.state?.itineraryId || params.id;

  useEffect(() => {
    const fetchCollaboration = async () => {
      try {
        let data;
        if (shareLink) {
          data = await fetchAPI(`${API_ENDPOINTS.itineraries}/share/${shareLink}`);
        } else if (itineraryId) {
          data = await fetchAPI(`${API_ENDPOINTS.itineraries}/${itineraryId}`);
        } else {
          setLoading(false);
          return;
        }
        setTrip(data);
        setFriends(data?.collaborators || []);
        setUpdates(data?.updates || []);
        setLoading(false);
        if (shareLink && (!data?.collaborators || !data.collaborators.some(f => f.name === joinName))) {
          setShowJoinModal(true);
        }
      } catch (err) {
        setError('Failed to fetch collaboration data');
        setLoading(false);
      }
    };
    fetchCollaboration();
    // eslint-disable-next-line
  }, [shareLink, itineraryId]);

  const handleCopyLink = () => {
    if (!trip?.shareLink) return;
    navigator.clipboard.writeText(`${window.location.origin}/collaborate/${trip.shareLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleJoin = async () => {
    if (!joinName.trim()) return;
    try {
      await fetch(`${BASE_URL}${API_ENDPOINTS.itineraries}/${trip._id}/collaborators`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: joinName })
      });
      setFriends(prev => [...prev, { name: joinName, icon: '👤' }]);
      setShowJoinModal(false);
    } catch (err) {
      setError('Failed to join collaboration');
    }
  };

  const fetchAllItineraries = async () => {
    try {
      const data = await fetchAPI(API_ENDPOINTS.itineraries + '/all');
      setAllItineraries(data);
    } catch (err) {
      setError('Failed to fetch itineraries');
    }
  };

  const handleCreateCollab = () => {
    setShowCreateModal(true);
    fetchAllItineraries();
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setSelectedItinId('');
    setSelectedShareLink('');
  };

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>{error}</Container>;

  return (
    <Container>
      <Title>Collaborating</Title>
      <CreateBtn onClick={handleCreateCollab}>Create Collaboration</CreateBtn>
      {showCreateModal && (
        <ModalOverlay>
          <Modal>
            <ModalTitle>Select Itinerary</ModalTitle>
            {console.log('allItineraries', allItineraries)}
            <div>Itineraries count: {allItineraries.length}</div>
            <CardList>
              {allItineraries.length === 0 && <div>No itineraries found.</div>}
              {allItineraries.map(itin => (
                <ItineraryCard
                  key={itin._id}
                  className={selectedItinId === itin._id ? 'selected' : ''}
                  onClick={async () => {
                    setSelectedItinId(itin._id);
                    try {
                      const data = await fetchAPI(`/itineraries/${itin._id}`);
                      setSelectedShareLink(data.shareLink);
                    } catch {
                      setSelectedShareLink('');
                      setError('Failed to fetch share link');
                    }
                  }}
                >
                  <Flag>{itin.country?.flag || '🏳️'}</Flag>
                  <div>
                    <div style={{ fontWeight: 600 }}>{itin.title}</div>
                    <div style={{ color: '#444', fontSize: 16 }}>
                      {itin.country?.name}
                    </div>
                    <div style={{ color: '#888', fontSize: 14 }}>
                      {itin.startDate && itin.endDate
                        ? `${new Date(itin.startDate).getDate()}.${new Date(itin.startDate).getMonth() + 1}. - ${new Date(itin.endDate).getDate()}.${new Date(itin.endDate).getMonth() + 1}.`
                        : ''}
                    </div>
                  </div>
                </ItineraryCard>
              ))}
            </CardList>
            {selectedShareLink && (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 14, marginBottom: 8 }}>Collaboration Link:</div>
                <div style={{ wordBreak: 'break-all', background: '#f4f4f4', padding: 8, borderRadius: 8 }}>
                  {window.location.origin + '/collaborate/' + selectedShareLink}
                </div>
                <ModalButtonRow>
                  <ModalButton type="button" onClick={() => {navigator.clipboard.writeText(window.location.origin + '/collaborate/' + selectedShareLink)}}>Copy</ModalButton>
                  <ModalButton type="button" onClick={handleCloseCreateModal}>Close</ModalButton>
                </ModalButtonRow>
              </div>
            )}
            {!selectedShareLink && (
              <ModalButtonRow>
                <ModalButton type="button" onClick={handleCloseCreateModal}>Cancel</ModalButton>
              </ModalButtonRow>
            )}
          </Modal>
        </ModalOverlay>
      )}
      {trip ? (
        <>
          <TripCard>
            <div style={{ fontWeight: 600 }}>{trip.title}</div>
            <div style={{ fontSize: 16, color: '#444', marginBottom: 12 }}>
              {trip.startDate && trip.endDate
                ? `${new Date(trip.startDate).getDate()}.${new Date(trip.startDate).getMonth() + 1}. - ${new Date(trip.endDate).getDate()}.${new Date(trip.endDate).getMonth() + 1}.`
                : ''}
            </div>
            <FriendsRow>
              {friends.map((f, idx) => (
                <Friend key={idx}>
                  <FriendIcon>
                    {f.avatar ? (
                      <AvatarImg src={f.avatar} alt={f.name || 'avatar'} />
                    ) : f.icon ? (
                      f.icon
                    ) : f.name ? (
                      <AvatarImg src={`https://ui-avatars.com/api/?name=${encodeURIComponent(f.name)}&background=ede9f6&color=222`} alt={f.name} />
                    ) : (
                      '👤'
                    )}
                  </FriendIcon>
                  {f.name || f}
                </Friend>
              ))}
            </FriendsRow>
            <CopyLinkBtn onClick={handleCopyLink}>{copied ? 'Copied!' : 'Copy collaboration link'}</CopyLinkBtn>
          </TripCard>
          <UpdatesTitle>Last updates</UpdatesTitle>
          {updates.length === 0 && <Update>No updates yet.</Update>}
          {updates.map((u, idx) => (
            <Update key={idx}>{u}</Update>
          ))}
          {showJoinModal && (
            <ModalOverlay>
              <Modal>
                <ModalTitle>Join this trip?</ModalTitle>
                <Input
                  placeholder="Your name"
                  value={joinName}
                  onChange={e => setJoinName(e.target.value)}
                  autoFocus
                />
                <ModalButtonRow>
                  <ModalButton type="button" onClick={() => setShowJoinModal(false)}>Cancel</ModalButton>
                  <ModalButton type="button" onClick={handleJoin}>Join</ModalButton>
                </ModalButtonRow>
              </Modal>
            </ModalOverlay>
          )}
        </>
      ) : (
        <TripCard>
          <div style={{ textAlign: 'center', color: '#666' }}>
            No collaboration yet. Create one to start collaborating with friends!
          </div>
        </TripCard>
      )}
    </Container>
  );
};

export default Collaboration;