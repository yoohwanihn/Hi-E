import React from 'react';
import styled from 'styled-components';

export default function CustomButton(props) {
  const Button = styled.button`
    margin-left: 10px;
    padding: 5px 10px;
    box-shadow: none;
    background: rgba(255, 255, 255, 0.0001);
    border: 1px solid #4674FE;
    border-color: ${props.color&&props.color};
    color: #4674FE;
    color: ${props.color&&props.color};
    font-size: 16px;
    border-radius: 20px;
    cursor: pointer;
    height: 34px;
    width: 101px;
    border-radius: 20px;
  `;

  const handleClick = () => {
    props.onNavigate && props.onNavigate();
    props.onCoin && props.onCoin();
    props.onNotice && props.onNotice();
    props.onAnser && props.onAnser();
    props.onAdmin && props.onAdmin();
    props.onVersion && props.onVersion();
    props.onClick && props.onClick();
  };

  return (
    <Button 
    onClick={handleClick}
    >
      {props.title}
    </Button>
  );
}
