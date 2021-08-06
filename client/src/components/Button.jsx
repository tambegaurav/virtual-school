import React from "react";
import styled from "styled-components";
import globalStyles from "../utils/globalStyles";
import Spinner from "./Spinner";

const StyledButton = styled.button`
  width: 100%;
  font-size: 22px;
  max-width: 400px;
  padding: 10px;
  outline: none;
  border-radius: 10px;
  background-color: ${globalStyles.buttonColor};
  color: #f0f0f0;
  box-sizing: content-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;

  :hover,
  :active {
    background-color: ${globalStyles.buttonHover};
  }
`;

const Button = ({ title, onClick, loading }) => {
  return (
    <StyledButton onClick={onClick}>
      {loading ? <Spinner /> : title}
    </StyledButton>
  );
};

export default Button;
