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
  const [photos, setPhotos] = useState([]); // {file, url}

  const handlePhotoChange = e => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => ({ file, url: URL.createObjectURL(file) }));
    setPhotos(prev => [...prev, ...newPhotos]);
  };

  const handleRemovePhoto = idx => {
    setPhotos(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert('Experience shared! (mock)');
    setTip('');
    setPhotos([]);
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
            <RemoveBtn type="button" onClick={() => handleRemovePhoto(idx)}>&times;</RemoveBtn>
          </Photo>
        ))}
      </PhotoPreview>
      <form onSubmit={handleSubmit}>
        <TipInput
          placeholder="Add tip or experience..."
          value={tip}
          onChange={e => setTip(e.target.value)}
        />
        <SubmitButton type="submit">Add tip</SubmitButton>
      </form>
    </Container>
  );
};

export default ShareExperience; 