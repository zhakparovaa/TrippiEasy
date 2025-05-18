import React, { useState } from 'react';
import styled from 'styled-components';
import { fetchFileAPI, API_ENDPOINTS } from '../api/config';

const Container = styled.div`
  padding: 24px 0 0 0;
`;
const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
`;
const PhotoButton = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #d3d3d3;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 20px;
  margin: 0 auto 24px auto;
  cursor: pointer;
`;
const TipInput = styled.textarea`
  width: 90%;
  margin: 0 5% 24px 5%;
  min-height: 120px;
  border-radius: 24px;
  border: 2px solid #d3d3d3;
  font-size: 18px;
  padding: 18px;
  resize: vertical;
`;
const SubmitButton = styled.button`
  display: block;
  margin: 0 auto;
  background: #ede9f6;
  border: none;
  border-radius: 12px;
  padding: 12px 32px;
  font-size: 18px;
  box-shadow: 0 2px 6px #0001;
  cursor: pointer;
`;
const PhotoPreview = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 0 5% 16px 5%;
`;
const Photo = styled.div`
  width: 64px;
  height: 64px;
  background: #eee;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  overflow: hidden;
  position: relative;
`;
const RemoveBtn = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  background: #fff8;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 14px;
  cursor: pointer;
`;

const ShareExperience = () => {
  const [tip, setTip] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePhotoChange = e => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => ({ file, url: URL.createObjectURL(file) }));
    setPhotos(prev => [...prev, ...newPhotos]);
  };

  const handleRemovePhoto = idx => {
    setPhotos(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!tip.trim() && photos.length === 0) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('tip', tip);
    photos.forEach((p, idx) => formData.append(`photos[${idx}]`, p.file));
    
    try {
      await fetchFileAPI('/experiences', formData); // Adjust endpoint as needed
      setTip('');
      setPhotos([]);
      setError(null);
      alert('Experience shared successfully!');
    } catch (err) {
      setError('Failed to share experience');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Share Experience</Title>
      <PhotoButton>
        <span role="img" aria-label="camera">📷</span> Add photos
        <input
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={handlePhotoChange}
        />
      </PhotoButton>
      <PhotoPreview>
        {photos.map((p, idx) => (
          <Photo key={idx}>
            <img src={p.url} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <RemoveBtn type="button" onClick={() => handleRemovePhoto(idx)}>×</RemoveBtn>
          </Photo>
        ))}
      </PhotoPreview>
      <form onSubmit={handleSubmit}>
        <TipInput
          placeholder="Add tip or experience..."
          value={tip}
          onChange={e => setTip(e.target.value)}
        />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Add tip'}
        </SubmitButton>
        {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
      </form>
    </Container>
  );
};

export default ShareExperience;