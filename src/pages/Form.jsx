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
        (err) => {
          if (err.status === 200) {
            setLoading(false);
            setSendStatus("error");
          }
        }
      );
  }

  return (
    <>
      {loading ? (
        <Spinner size="xl" w="60px" h="60px" display="flex" m="0 auto" />
      ) : sendStatus === "" ? (
        <form className="space-y-4" onSubmit={SendEmail}>
          {errorAddress || errorEmail || errorName ? (
            <TitleCheckError>
              Por favor preencha todos os campos com *:
            </TitleCheckError>
          ) : errorProduct ? (
            <TitleCheckError>
              Por favor selecione e quantifique pelo menos um de nossos
              produtos:
            </TitleCheckError>
          ) : (
            ""
          )}
          <div>
            <TitleCheck>Nome *</TitleCheck>
            <InputText
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              name="from_name"
              error={errorName}
            />
          </div>
          <div>
            <TitleCheck>Email *</TitleCheck>
            <InputText
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              name="email"
              error={errorEmail}
            />
          </div>
          <div>
            <TitleCheck>Endereço *</TitleCheck>
            <TextArea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              name="endereco"
              error={errorAddress}
            />
          </div>
          <TitleCheck>
            Por favor selecione quais itens deseja e adicione a quantidade para
            cada item selecionado...
          </TitleCheck>
          <CheckContainer>
            <CheckItem>
              <CheckArea>
                <input
                  type="checkbox"
                  name="camiseta"
                  id="camiseta"
                  className="checkCamiseta"
                  checked={checkCamiseta}
                  onChange={() => setCheckCamiseta(!checkCamiseta)}
                />

                <TitleCheck>Camiseta</TitleCheck>
              </CheckArea>
              {checkCamiseta ? (
                <InputNumber
                  type="number"
                  name="input_camiseta"
                  min={0}
                  onChange={(e) => setQntdCamiseta(e.target.value)}
                />
              ) : (
                ""
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
              {checkPolo ? (
                <InputNumber
                  type="number"
                  name="input_polo"
                  min={0}
                  onChange={(e) => setQntdPolo(e.target.value)}
                />
              ) : (
                ""
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
              {checkCaneca ? (
                <InputNumber
                  type="number"
                  name="input_caderno"
                  min={0}
                  onChange={(e) => setQntdCaneca(e.target.value)}
                />
              ) : (
                ""
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
              {checkCaderno ? (
                <InputNumber
                  type="number"
                  name="input_caneca"
                  onChange={(e) => setQntdCaderno(e.target.value)}
                  min={0}
                />
              ) : (
                ""
              )}
            </CheckItem>
          </CheckContainer>

          <ButtonSend type="submit" value="Confirmar" />
        </form>
      ) : sendStatus === "success" ? (
        <SuccessMenssage>
          <p>Seu pedido foi enviado com sucesso!</p>
          <SuccessImage src={imgSucces} alt="sucesso" />
          <p>
            Logo entraremos em contato com você para prosseguir com seu pedido,
            obrigado!
          </p>
        </SuccessMenssage>
      ) : (
        <p>
          Tivemos um pequeno emprevisto com seu pedido, por favor entre em
          contato através do nosso whatsaap: yago coloca seu numero aqui
        </p>
      )}
    </>
  );
};
