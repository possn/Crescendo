import { CONTACTOS, CATEGORIAS_CONTACTO } from "../../data/contactos/contactos";
import "./ContactosScreen.css";

export function ContactosScreen() {
  return (
    <div className="contactos-screen">
      <header className="contactos-screen__header">
        <h1>Contactos Úteis</h1>
        <p className="contactos-screen__subtitle">
          Números e organizações que vale a pena ter à mão — de preferência, guardados nos
          contactos do telemóvel antes de precisar.
        </p>
      </header>

      {CATEGORIAS_CONTACTO.map((cat) => {
        const doGrupo = CONTACTOS.filter((c) => c.categoria === cat.id);
        return (
          <section key={cat.id} className="contactos-screen__grupo">
            <h2 style={{ color: cat.cor }}>{cat.label}</h2>
            <div className="contactos-screen__lista">
              {doGrupo.map((c) => (
                <div key={c.id} className="contactos-screen__card">
                  <span className="contactos-screen__nome">{c.nome}</span>
                  <span className="contactos-screen__descricao">{c.descricao}</span>
                  {c.horario && <span className="contactos-screen__horario">{c.horario}</span>}
                  <div className="contactos-screen__acoes">
                    {c.telefone && (
                      <a className="contactos-screen__btn" href={`tel:${c.telefone}`}>
                        📞 {c.telefoneExibicao}
                      </a>
                    )}
                    {c.site && (
                      <a
                        className="contactos-screen__btn contactos-screen__btn--secundario"
                        href={c.site}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        🌐 Site
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <p className="contactos-screen__disclaimer">
        Números verificados em fontes oficiais (gov.pt, SNS, APSI) antes de incluir — mas serviços
        públicos podem mudar de número. Em caso de dúvida, confirme em gov.pt.
      </p>
    </div>
  );
}
