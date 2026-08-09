/**
 * Força a perda de foco do campo ativo antes de uma transição de ecrã.
 *
 * O Safari em iOS, ao focar um campo de texto, dá zoom automático se o
 * texto for pequeno. Normalmente desfaz esse zoom sozinho quando o campo
 * perde o foco — mas numa SPA, se o campo for removido do DOM (por troca
 * de ecrã) sem um evento de "blur" limpo antes disso, o Safari por vezes
 * não recebe essa deixa e o zoom fica preso. Chamar isto explicitamente
 * antes de navegar dá ao Safari essa oportunidade.
 */
export function desfocarCampoAtivo(): void {
  const ativo = document.activeElement;
  if (ativo instanceof HTMLElement && typeof ativo.blur === "function") {
    ativo.blur();
  }
}
