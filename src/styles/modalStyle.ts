import styled from "styled-components";

export const TitleCheck = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
`;

export const TitleCheckError = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #ff4d6d;
  background: rgba(255, 77, 109, 0.1);
  border: 1px solid rgba(255, 77, 109, 0.3);
  border-radius: 6px;
  padding: 8px 12px;
`;

export const CheckArea = styled.div`
  display: flex;
  align-items: center;
  width: 90px;
  justify-content: flex-start;
  gap: 8px;

  input[type="checkbox"] {
    accent-color: #B721FF;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

export const CheckContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

export const CheckItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const InputNumber = styled.input`
  border: 1px solid rgba(183, 33, 255, 0.4);
  border-radius: 6px;
  width: 70px;
  padding: 4px 8px;
  background: rgba(183, 33, 255, 0.08);
  color: #fff;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #B721FF;
    box-shadow: 0 0 0 2px rgba(183, 33, 255, 0.2);
  }
`;

type BorderColor = {
  error: boolean;
};

export const InputText = styled.input<BorderColor>`
  border: 1px solid ${(props) => (props.error ? "#ff4d6d" : "rgba(183,33,255,0.3)")};
  border-radius: 6px;
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  transition: border-color 0.2s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &:focus {
    outline: none;
    border-color: #B721FF;
    box-shadow: 0 0 0 2px rgba(183, 33, 255, 0.15);
  }
`;

export const TextArea = styled.textarea<BorderColor>`
  border: 1px solid ${(props) => (props.error ? "#ff4d6d" : "rgba(183,33,255,0.3)")};
  border-radius: 6px;
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  resize: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &:focus {
    outline: none;
    border-color: #B721FF;
    box-shadow: 0 0 0 2px rgba(183, 33, 255, 0.15);
  }
`;

export const ButtonSend = styled.input`
  background: linear-gradient(135deg, #B721FF 0%, #7B2FBE 100%);
  width: 100%;
  height: 44px;
  padding: 8px 24px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  color: #fff;
  border-radius: 8px;
  border: none;
  letter-spacing: 0.5px;
  transition: opacity 0.2s, box-shadow 0.2s;

  &:hover {
    opacity: 0.9;
    box-shadow: 0 0 20px rgba(183, 33, 255, 0.4);
  }
`;

export const ButtonClose = styled.div`
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1;
  padding: 4px 8px;
  border-radius: 4px;
  transition: color 0.2s;

  &:hover {
    color: #B721FF;
  }
`;

export const HeaderModal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const SuccessImage = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 16px;
`;

export const SuccessMenssage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px 0;
`;
