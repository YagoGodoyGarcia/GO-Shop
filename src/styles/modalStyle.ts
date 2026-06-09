import styled from "styled-components";

/* ── Layout ── */

export const HeaderModal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormSectionTitle = styled.p`
  font-size: 13px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

/* ── Services ── */

export const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

type ActiveProp = { active?: boolean };

export const ServiceItem = styled.button<ActiveProp>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
  transition: all 0.18s;
  background: ${(p) => (p.active ? 'rgba(183,33,255,0.15)' : 'rgba(255,255,255,0.03)')};
  border: 1px solid ${(p) => (p.active ? 'rgba(183,33,255,0.6)' : 'rgba(255,255,255,0.08)')};

  &:hover {
    border-color: rgba(183, 33, 255, 0.4);
    background: rgba(183, 33, 255, 0.08);
  }
`;

export const ServiceCheckbox = styled.div<ActiveProp>`
  width: 14px;
  height: 14px;
  min-width: 14px;
  border-radius: 3px;
  margin-top: 2px;
  border: 1.5px solid ${(p) => (p.active ? '#B721FF' : 'rgba(255,255,255,0.25)')};
  background: ${(p) => (p.active ? '#B721FF' : 'transparent')};
  transition: all 0.15s;

  &::after {
    content: ${(p) => (p.active ? '"✓"' : '""')};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    color: #fff;
    line-height: 14px;
  }
`;

export const ServiceItemLabel = styled.span<ActiveProp>`
  font-size: 12px;
  font-weight: 700;
  display: block;
  color: ${(p) => (p.active ? '#B721FF' : 'rgba(255,255,255,0.75)')};
  transition: color 0.15s;
`;

/* ── Products ── */

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

export const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ProductLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
`;

export const InputNumber = styled.input`
  border: 1px solid rgba(183, 33, 255, 0.3);
  border-radius: 6px;
  width: 100%;
  padding: 6px 4px;
  background: rgba(183, 33, 255, 0.06);
  color: #fff;
  font-size: 14px;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #B721FF;
    box-shadow: 0 0 0 2px rgba(183, 33, 255, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
`;

/* ── Inputs ── */

type ErrorProp = { error?: boolean };

export const InputText = styled.input<ErrorProp>`
  border: 1px solid ${(p) => (p.error ? '#ff4d6d' : 'rgba(183,33,255,0.25)')};
  border-radius: 6px;
  width: 100%;
  padding: 9px 12px;
  font-size: 13px;
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  transition: border-color 0.2s;

  &::placeholder { color: rgba(255, 255, 255, 0.25); }

  &:focus {
    outline: none;
    border-color: ${(p) => (p.error ? '#ff4d6d' : '#B721FF')};
    box-shadow: 0 0 0 2px ${(p) => (p.error ? 'rgba(255,77,109,0.15)' : 'rgba(183,33,255,0.15)')};
  }
`;

export const TextArea = styled.textarea<ErrorProp>`
  border: 1px solid ${(p) => (p.error ? '#ff4d6d' : 'rgba(183,33,255,0.25)')};
  border-radius: 6px;
  width: 100%;
  padding: 9px 12px;
  font-size: 13px;
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  resize: none;
  transition: border-color 0.2s;

  &::placeholder { color: rgba(255, 255, 255, 0.25); }

  &:focus {
    outline: none;
    border-color: #B721FF;
    box-shadow: 0 0 0 2px rgba(183, 33, 255, 0.15);
  }
`;

/* ── Errors & Buttons ── */

export const TitleCheckError = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: #ff4d6d;
  background: rgba(255, 77, 109, 0.08);
  border: 1px solid rgba(255, 77, 109, 0.25);
  border-radius: 6px;
  padding: 7px 12px;
`;

export const ButtonSend = styled.input`
  background: linear-gradient(135deg, #B721FF 0%, #7B2FBE 100%);
  width: 100%;
  height: 46px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  color: #fff;
  border-radius: 8px;
  border: none;
  letter-spacing: 0.3px;
  transition: opacity 0.2s, box-shadow 0.2s;

  &:hover {
    opacity: 0.9;
    box-shadow: 0 0 24px rgba(183, 33, 255, 0.45);
  }
`;

export const ButtonClose = styled.button`
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.4);
  background: none;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  line-height: 1;
  transition: color 0.2s;

  &:hover { color: #B721FF; }
`;

/* ── Success / Error screens ── */

export const SuccessMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px 0 8px;
`;

export const SuccessImage = styled.img`
  width: 100px;
  height: 100px;
  opacity: 0.85;
`;
