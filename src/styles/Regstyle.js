import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
  background-color: #f7f7f7;
  
`;

export const Wrapper = styled.div`
  width: 550px;
  display: flex;
  flex-direction: row;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 10px;
  overflow: hidden;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const LeftPanel = styled.div`
  flex: 1;
  padding: 40px;
  background-color: white;
`;

export const RightPanel = styled.div`
  flex: 1;
  background: linear-gradient(to right, #ff416c, #ff4b2b);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 15px;
    text-align: center;
  }
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 27px;
    text-align: center;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
  width: 110%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ff416c;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff4b2b;
  }
`;

export const SignUpButton = styled(Button)`
  background-color: transparent;
  border: 1px solid white;
  width: 60%;
  &:hover {
    background-color: white;
    color: #ff4b2b;
  }
`;

