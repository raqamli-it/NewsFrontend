import styled from "styled-components";

export const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px;
 .subT{
  text-align: center;
 }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
`;

export const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-bottom: 20px;
`;

export const SmallText = styled.small`
  font-size: 14px;
  color: #888;
  display: block;
  text-align: center;
  margin-bottom: 30px;
`;

export const ContentWrapper = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  small{
    width: 100%;
    text-align: right;
    font-size: 16px;
  }
`;
export const UpperContentWrapper = styled.div`
  margin-bottom: 20px; /* Space below upper content */
`;
export const LowerContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content */
`;
export const LiveBadge = styled.span`
  display: inline-block;
  background-color: #ff4c4c;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const VideoSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  
  iframe {
    width: 100%;
    height: 500px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const WatchLiveButton = styled.button`
  background-color: #4a90e2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px 0;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357abd;
  }
`;

export const CommentInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

export const CommentButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

export const CommentList = styled.div`
  margin-top: 20px;

  p {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    font-size: 14px;
    color: #333;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
  margin-top: -10px;
  display: block;
`;
export const CommentIcon =styled.div`
  cursor: pointer;
  font-size: 28px;
`