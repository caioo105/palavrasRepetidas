function filtraOcorrencias(paragrafo) {
    // Itera sobre as chaves do objeto (as palavras) e filtra aquelas cujo valor (frequência) é maior que 1.
    return Object.keys(paragrafo).filter(chave => paragrafo[chave] > 1);
  }
  
  /**
   * Monta a saída final com as palavras duplicadas em cada parágrafo.
   *
   * @param {Array} listaPalavras - Um array de objetos, onde cada objeto representa um parágrafo.
   * @returns {string} Uma string com a saída formatada.
   */
  function montaSaidaArquivo(listaPalavras) {
    let textoFinal = '';
  
    // Itera sobre cada parágrafo da lista
    listaPalavras.forEach((paragrafo, indice) => {
      // Obtém as palavras duplicadas do parágrafo
      const duplicadas = filtraOcorrencias(paragrafo).join(', ');
  
      // Adiciona uma linha à saída final apenas se houver palavras duplicadas
      if (duplicadas) {
        textoFinal += `Words duplicate in paragraph: ${indice + 1}: ${duplicadas}\n`;
      }
    });
  
    // Retorna a string com a saída final
    return textoFinal;
  }
  
  // Exporta a função para ser utilizada em outros módulos
  export { montaSaidaArquivo };