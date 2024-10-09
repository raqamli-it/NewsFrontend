import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

export const NewsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;

export const LatestNewsSection = styled.div`
  flex: 2;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
`;

export const OtherNewsContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two news per row */
  grid-gap: 20px;
`;

export const NewsItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  text-align: center;
  background-color: #fff;
  transition: transform 0.3s ease;
  flex: 1;
  margin: 10px;

  h3 {
    font-size: 15px;
    margin: -5px 5px;
    color: white;
    position: absolute;
    bottom: 15px;
    /* left: 10px; */
    background-color: rgba(0, 0, 0, 0.7);
    padding: 5px 5px;
    border-radius: 5px;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

export const BigNewsItem = styled.div`
  position: relative;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;

  &:hover h2 {
    opacity: 1;
  }
`;

export const NewsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  
`;

export const BigNewsTitle = styled.h2`
  position: absolute;
  bottom: 20px;
  left: 20px;
  margin: 0;
  font-size: 32px;
  color: white;
  background-color: rgba(0, 0, 0, 0.7); /* Dark background for readability */
  padding: 10px 20px;
  border-radius: 5px;
  opacity: 0.9;
  transition: opacity 0.3s ease;
`;

export const NewsSubtitle = styled.p`
  font-size: 18px;
  color: #777;
  display: none;
`;
export const LastConta =styled.div`
  width: 100%;
  display: flex;
  margin-top: 25px;
`
export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px; 
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 449px; /* Set a fixed width for each card */
  position: relative;
  transition: .5s all;
  &:hover{
    transform: scale(1.04);
    transition: .5s all;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CardTitle = styled.h3`
    font-size: 15px;
    margin: -5px 5px;
    color: white;
    position: absolute;
    bottom: 15px;
    /* left: 10px; */
    background-color: rgba(0, 0, 0, 0.7);
    padding: 5px 5px;
    border-radius: 5px;
`;