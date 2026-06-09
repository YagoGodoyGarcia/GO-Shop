import { useState } from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import emailjs from "@emailjs/browser";
import { Spinner } from "@chakra-ui/react";
import {
  ButtonSend,
  FormSection,
  FormSectionTitle,
  InputText,
  ServiceCheckbox,
  ServiceGrid,
  ServiceItem,
  ServiceItemLabel,
  SuccessMessage,
  SuccessImage,
  TextArea,
  TitleCheckError,
  ProductGrid,
  ProductItem,
  ProductLabel,
  InputNumber,
} from "../styles/modalStyle";
import imgSucces from "../assets/success.png";

const SERVICES = [
  { id: "posts",      label: "Posts & Reels",         desc: "Conteúdo para redes sociais" },
  { id: "identidade", label: "Identidade Visual",      desc: "Logo, marca e branding" },
  { id: "produtos",   label: "Produtos Personalizados", desc: "Merch com sua arte" },
  { id: "ia",         label: "Criação com IA",         desc: "Upscale, GPT Images e +" },
  { id: "marketing",  label: "Marketing Digital",       desc: "Estratégia e campanhas" },
];

const PRODUCTS = [
  { id: "camiseta", label: "Camiseta" },
  { id: "polo",     label: "Polo" },
  { id: "caneca",   label: "Caneca" },
  { id: "caderno",  label: "Caderno" },
];

const MODEL_NAMES = {
  tshirt: "Camiseta",
  poloShirt: "Polo",
  mug: "Caneca",
  diary: "Caderno",
};

export const Form = () => {
  const snap = useSnapshot(state);

  const [customerName, setCustomerName]   = useState("");
  const [whatsapp, setWhatsapp]           = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [empresa, setEmpresa]             = useState("");
  const [briefing, setBriefing]           = useState("");

  const [selectedServices, setSelectedServices] = useState(new Set());
  const [quantities, setQuantities] = useState({ camiseta: 0, polo: 0, caneca: 0, caderno: 0 });

  const [sendStatus, setSendStatus] = useState("");
  const [loading, setLoading]       = useState(false);
  const [errors, setErrors]         = useState({});

  const hasMerch = selectedServices.has("produtos");

  const toggleService = (id) => {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const validate = () => {
    const e = {};
    if (!customerName.trim())      e.name     = true;
    if (!whatsapp.trim() && !customerEmail.trim()) e.contact = true;
    if (selectedServices.size === 0) e.service = true;
    if (hasMerch && Object.values(quantities).every((q) => q <= 0)) e.products = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const servicesText = SERVICES
    .filter((s) => selectedServices.has(s.id))
    .map((s) => s.label)
    .join(", ");

  const productsText = hasMerch
    ? PRODUCTS
        .filter((p) => quantities[p.id] > 0)
        .map((p) => `${p.label}: ${quantities[p.id]}`)
        .join(" | ")
    : "—";

  function SendEmail(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const templateParams = {
      from_name:      customerName,
      email:          customerEmail || "(não informado)",
      endereco:       `WhatsApp: ${whatsapp || "—"} | Empresa: ${empresa || "—"}`,
      input_camiseta: servicesText,
      input_polo:     briefing || "(sem briefing)",
      input_caneca:   productsText,
      input_caderno:  `Modelo 3D: ${MODEL_NAMES[snap.model] || snap.model} | Cor: ${snap.color}`,
    };

    emailjs
      .send("service_a7dc5nf", "template_xslbbyo", templateParams, "nEjcVQLiNZkymWacF")
      .then(
        (res) => { if (res.status === 200) { setLoading(false); setSendStatus("success"); } },
        ()    => { setLoading(false); setSendStatus("error"); }
      );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="xl" w="60px" h="60px" color="#B721FF" />
      </div>
    );
  }

  if (sendStatus === "success") {
    return (
      <SuccessMessage>
        <SuccessImage src={imgSucces} alt="sucesso" />
        <p style={{ fontWeight: 700, fontSize: 18, color: '#B721FF', marginTop: 12 }}>
          Solicitação enviada!
        </p>
        <p style={{ color: 'rgba(255,255,255,0.55)', marginTop: 6, fontSize: 14 }}>
          Entraremos em contato em breve. Obrigado por escolher a Ruisu Studio!
        </p>
      </SuccessMessage>
    );
  }

  if (sendStatus === "error") {
    return (
      <SuccessMessage>
        <p style={{ color: '#ff4d6d', fontWeight: 700, marginBottom: 8 }}>
          Não foi possível enviar.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>
          Fale com a gente diretamente:
        </p>
        <a
          href="https://www.instagram.com/ruisustudio"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#B721FF', fontWeight: 700, marginTop: 8 }}
        >
          @ruisustudio ↗
        </a>
      </SuccessMessage>
    );
  }

  return (
    <form className="space-y-5 mt-4" onSubmit={SendEmail}>

      {/* ── Serviços ── */}
      <FormSection>
        <FormSectionTitle>
          O que você precisa?{' '}
          {errors.service && (
            <span style={{ color: '#ff4d6d', fontWeight: 400, fontSize: 11 }}>
              — selecione ao menos um
            </span>
          )}
        </FormSectionTitle>
        <ServiceGrid>
          {SERVICES.map((s) => {
            const active = selectedServices.has(s.id);
            return (
              <ServiceItem
                key={s.id}
                active={active}
                onClick={() => toggleService(s.id)}
                type="button"
              >
                <ServiceCheckbox active={active} />
                <div>
                  <ServiceItemLabel active={active}>{s.label}</ServiceItemLabel>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', display: 'block' }}>
                    {s.desc}
                  </span>
                </div>
              </ServiceItem>
            );
          })}
        </ServiceGrid>
      </FormSection>

      {/* ── Produtos (só aparece se Merch selecionado) ── */}
      {hasMerch && (
        <FormSection>
          <FormSectionTitle>
            Produtos desejados
            {errors.products && (
              <span style={{ color: '#ff4d6d', fontWeight: 400, fontSize: 11 }}>
                {' '}— informe ao menos uma quantidade
              </span>
            )}
          </FormSectionTitle>
          {/* Mockup context */}
          <div
            className="text-xs px-3 py-2 rounded-lg mb-2"
            style={{ background: 'rgba(183,33,255,0.08)', border: '1px solid rgba(183,33,255,0.2)', color: 'rgba(255,255,255,0.5)' }}
          >
            Você visualizou: <strong style={{ color: '#B721FF' }}>{MODEL_NAMES[snap.model]}</strong>
            {' '}·{' '}
            <span
              className="inline-block w-3 h-3 rounded-full align-middle mr-0.5"
              style={{ background: snap.color }}
            />
            <strong style={{ color: snap.color }}>{snap.color}</strong>
          </div>
          <ProductGrid>
            {PRODUCTS.map((p) => (
              <ProductItem key={p.id}>
                <ProductLabel>{p.label}</ProductLabel>
                <InputNumber
                  type="number"
                  min={0}
                  value={quantities[p.id] || ""}
                  placeholder="0"
                  onChange={(e) =>
                    setQuantities((prev) => ({ ...prev, [p.id]: Number(e.target.value) }))
                  }
                />
              </ProductItem>
            ))}
          </ProductGrid>
        </FormSection>
      )}

      {/* ── Dados de contato ── */}
      <FormSection>
        <FormSectionTitle>
          Seus dados
          {errors.contact && (
            <span style={{ color: '#ff4d6d', fontWeight: 400, fontSize: 11 }}>
              {' '}— informe WhatsApp ou e-mail
            </span>
          )}
        </FormSectionTitle>

        <div className="space-y-3">
          <div>
            <label className="block text-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Nome *
            </label>
            <InputText
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Seu nome completo"
              error={errors.name}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                WhatsApp
              </label>
              <InputText
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="(11) 99999-9999"
                error={errors.contact}
              />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                E-mail
              </label>
              <InputText
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="seu@email.com"
                error={errors.contact}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Empresa / Marca
            </label>
            <InputText
              type="text"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              placeholder="Nome da sua empresa ou marca"
            />
          </div>
        </div>
      </FormSection>

      {/* ── Briefing ── */}
      <FormSection>
        <FormSectionTitle>Briefing do projeto</FormSectionTitle>
        <TextArea
          value={briefing}
          onChange={(e) => setBriefing(e.target.value)}
          placeholder="Conte sobre seu projeto: referências, objetivos, prazos, estilo visual..."
          rows={3}
        />
      </FormSection>

      {Object.keys(errors).length > 0 && (
        <TitleCheckError>Corrija os campos destacados acima.</TitleCheckError>
      )}

      <ButtonSend type="submit" value="Enviar Solicitação →" />
    </form>
  );
};
