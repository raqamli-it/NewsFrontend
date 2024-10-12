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
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
   }
`;
export const LatestNewsSection = styled.div`
  flex: 2;
  position: relative;
  /* border-radius: 8px; */
  overflow: hidden;
  @media (max-width: 600px){
    border-top: 4px solid black;
    padding: 5px 0;
  }
`;

export const OtherNewsContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  flex-wrap: wrap;
  grid-gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 15px;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr); 
    margin-top: 20px; 
    border-bottom: 4px solid black;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
  }
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
   @media (max-width: 860px){
      font-size: 10px;
   }
   @media (max-width: 600px){
      font-size: 15px;
   }
   @media (max-width: 1280px){
      font-size: 10px;
   }
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
  @media (max-width: 600px){
    font-size: 18px;
  }
`;

export const NewsSubtitle = styled.p`
  font-size: 18px;
  color: #777;
  display: none;
`;
export const LastConta = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;

  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
export const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
  color: #333;
  display: none;
  @media (max-width: 600px) {
    margin-bottom: 15px;
    display: block;
  }
`;
export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Uchta ustun */
  gap: 16px; 

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr); /* Kichik ekranlar uchun bitta ustun */
  }
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%; /* Set a fixed width for each card */
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