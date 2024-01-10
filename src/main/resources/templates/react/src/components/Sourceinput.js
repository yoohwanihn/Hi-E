import React, { useState } from 'react'
import styled from 'styled-components';

export default function Sourceinput(props) {
    const {text, setText} = props;

    const handleTextChange = (e) => {
      const inputValue = e.target.value;
        setText(inputValue);
    };
  
    return (
      <InputWrapper>
        <TextInput type="text" placeholder="텍스트를 입력하세요." value={text} onChange={handleTextChange} />
        <TextCounterWrapper>
        </TextCounterWrapper>
      </InputWrapper>
    );
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TextInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  background: #FFFFFF;
  border: 1px solid #E9EAEE;
  border-radius: 5px;
`;

const TextCounterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextCounter = styled.div`
  display: flex; /* 추가 */
  justify-content: center; /* 추가 */
  align-items: center; /* 추가 */
  height: 40px;
  width: 100px;
  background: #F5F5F5;
  border-width: 1px 1px 1px 0px;
  border-style: solid;
  border-color: #E9EAEE;
  color: #4674FE;
`;
