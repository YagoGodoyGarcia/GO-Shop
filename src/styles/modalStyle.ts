import styled from "styled-components";

export const TitleCheck = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #000;
`;

export const TitleCheckError = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: red;
`;

export const CheckArea = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  justify-content: space-around;
  gap: 4px;
`;

export const CheckContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CheckItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputNumber = styled.input`
  border: 1px solid #c9c9c9;
  border-radius: 4px;
  width: 80px;
  -webkit-box-shadow: 0px 0px 2px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 2px -1px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 2px -1px rgba(0, 0, 0, 0.75);
`;

type BorderColor = {
  error: boolean;
};
export const InputText = styled.input<BorderColor>`
  border: 1px solid #c9c9c9;
  border-radius: 4px;
  width: 100%;
  padding: 8px;
  font-size: 14px;
  -webkit-box-shadow: 0px 0px 2px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 2px -1px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 2px -1px rgba(0, 0, 0, 0.75);

  border-color: ${(props) => (props.error ? "red" : "#c9c9c9")};
`;

export const TextArea = styled.textarea<BorderColor>`
  border: 1px solid #c9c9c9;
  border-radius: 4px;
  width: 100%;
  padding: 8px;
  font-size: 14px;
  -webkit-box-shadow: 0px 0px 2px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 2px -1px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 2px -1px rgba(0, 0, 0, 0.75);
  border-color: ${(props) => (props.error ? "red" : "#c9c9c9")};
`;

export const ButtonSend = styled.input`
  background-color: #3b82f6;
  width: 100px;
  height: 40px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  color: #fff;
  border-radius: 5px;
  &:hover,
  &:focus {
    background-color: #114aa8;
  }
`;
export const ButtonClose = styled.div`
  font-size: 24px;
  font-weight: 700;
  cursor: Pointer;
`;

export const HeaderModal = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SuccessImage = styled.img`
  width: 170px;
  height: 170px;
`;

export const SuccessMenssage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
