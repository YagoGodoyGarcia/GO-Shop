/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  ButtonSend,
  CheckArea,
  CheckContainer,
  CheckItem,
  InputNumber,
  InputText,
  SuccessMenssage,
  TextArea,
  TitleCheck,
  TitleCheckError,
} from "../styles/modalStyle";
import emailjs from "@emailjs/browser";
import { Spinner } from "@chakra-ui/react";
import { SuccessImage } from "../styles/modalStyle";
import imgSucces from "../assets/success.png";

export const Form = () => {
  const [address, setAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const [checkCamiseta, setCheckCamiseta] = useState(false);
  const [checkPolo, setCheckPolo] = useState(false);
  const [checkCaneca, setCheckCaneca] = useState(false);
  const [checkCaderno, setCheckCaderno] = useState(false);

  const [qntdCamiseta, setQntdCamiseta] = useState(0);
  const [qntdPolo, setQntdPolo] = useState(0);
  const [qntdCaneca, setQntdCaneca] = useState(0);
  const [qntdCaderno, setQntdCaderno] = useState(0);

  const [sendStatus, setSendStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);
  const [errorProduct, setErrorProduct] = useState(false);

  function SendEmail(e) {
    setLoading(true);
    e.preventDefault();

    if (customerName === "") {
      setErrorName(true);
      setLoading(false);
      return;
    } else {
      setErrorName(false);
    }
    if (customerEmail === "") {
      setErrorEmail(true);
      setLoading(false);
      return;
    } else {
      setErrorEmail(false);
    }
    if (address === "") {
      setErrorAddress(true);
      setLoading(false);
      return;
    } else {
      setErrorAddress(false);
    }

    if (
      qntdCamiseta === 0 &&
      qntdPolo === 0 &&
      qntdCaneca === 0 &&
      qntdCaderno === 0
    ) {
      setErrorProduct(true);
      setLoading(false);
      return;
    }

    const templateParams = {
      from_name: customerName,
      email: customerEmail,
      endereco: address,
      input_camiseta: qntdCamiseta,
      input_polo: qntdPolo,
      input_caneca: qntdCaneca,
      input_caderno: qntdCaderno,
    };

    emailjs
      .send(
        "service_a7dc5nf",
        "template_xslbbyo",
        templateParams,
        "nEjcVQLiNZkymWacF"
      )
      .then(
        (response) => {
          if (response.status === 200) {
            setLoading(false);
            setSendStatus("success");
          }
        },
        () => {
          setLoading(false);
          setSendStatus("error");
        }
      );
  }

  return (
    <>
      {loading ? (
        <Spinner size="xl" w="60px" h="60px" display="flex" m="0 auto" color="#B721FF" />
      ) : sendStatus === "" ? (
        <form className="space-y-4" onSubmit={SendEmail}>
          {(errorAddress || errorEmail || errorName) ? (
            <TitleCheckError>
              Por favor preencha todos os campos com *
            </TitleCheckError>
          ) : errorProduct ? (
            <TitleCheckError>
              Selecione e quantifique pelo menos um produto
            </TitleCheckError>
          ) : null}

          <div>
            <TitleCheck>Nome *</TitleCheck>
            <InputText
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              name="from_name"
              placeholder="Seu nome completo"
              error={errorName}
            />
          </div>

          <div>
            <TitleCheck>E-mail *</TitleCheck>
            <InputText
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              name="email"
              placeholder="seu@email.com"
              error={errorEmail}
            />
          </div>

          <div>
            <TitleCheck>Endereço de entrega *</TitleCheck>
            <TextArea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              name="endereco"
              placeholder="Rua, número, bairro, cidade - UF"
              error={errorAddress}
              rows={2}
            />
          </div>

          <TitleCheck>
            Selecione os produtos e as quantidades:
          </TitleCheck>

          <CheckContainer>
            <CheckItem>
              <CheckArea>
                <input
                  type="checkbox"
                  name="camiseta"
                  id="camiseta"
                  checked={checkCamiseta}
                  onChange={() => setCheckCamiseta(!checkCamiseta)}
                />
                <TitleCheck>Camiseta</TitleCheck>
              </CheckArea>
              {checkCamiseta && (
                <InputNumber
                  type="number"
                  name="input_camiseta"
                  min={1}
                  defaultValue={1}
                  onChange={(e) => setQntdCamiseta(e.target.value)}
                />
              )}
            </CheckItem>

            <CheckItem>
              <CheckArea>
                <input
                  type="checkbox"
                  name="polo"
                  id="polo"
                  checked={checkPolo}
                  onChange={() => setCheckPolo(!checkPolo)}
                />
                <TitleCheck>Polo</TitleCheck>
              </CheckArea>
              {checkPolo && (
                <InputNumber
                  type="number"
                  name="input_polo"
                  min={1}
                  defaultValue={1}
                  onChange={(e) => setQntdPolo(e.target.value)}
                />
              )}
            </CheckItem>

            <CheckItem>
              <CheckArea>
                <input
                  type="checkbox"
                  name="caneca"
                  id="caneca"
                  checked={checkCaneca}
                  onChange={() => setCheckCaneca(!checkCaneca)}
                />
                <TitleCheck>Caneca</TitleCheck>
              </CheckArea>
              {checkCaneca && (
                <InputNumber
                  type="number"
                  name="input_caneca"
                  min={1}
                  defaultValue={1}
                  onChange={(e) => setQntdCaneca(e.target.value)}
                />
              )}
            </CheckItem>

            <CheckItem>
              <CheckArea>
                <input
                  type="checkbox"
                  name="caderno"
                  id="caderno"
                  checked={checkCaderno}
                  onChange={() => setCheckCaderno(!checkCaderno)}
                />
                <TitleCheck>Caderno</TitleCheck>
              </CheckArea>
              {checkCaderno && (
                <InputNumber
                  type="number"
                  name="input_caderno"
                  min={1}
                  defaultValue={1}
                  onChange={(e) => setQntdCaderno(e.target.value)}
                />
              )}
            </CheckItem>
          </CheckContainer>

          <ButtonSend type="submit" value="Confirmar Pedido" />
        </form>
      ) : sendStatus === "success" ? (
        <SuccessMenssage>
          <SuccessImage src={imgSucces} alt="sucesso" />
          <p style={{ fontWeight: 700, fontSize: 18, color: '#B721FF' }}>
            Pedido enviado com sucesso!
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: 8 }}>
            Entraremos em contato em breve. Obrigado por escolher a Ruisu Studio!
          </p>
        </SuccessMenssage>
      ) : (
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>
          Tivemos um problema ao enviar. Por favor entre em contato via WhatsApp ou Instagram: <strong style={{ color: '#B721FF' }}>@ruisustudio</strong>
        </p>
      )}
    </>
  );
};
