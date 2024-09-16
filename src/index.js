export function contaPalavras(texto) {
    // Divide o texto em parágrafos, convertendo para minúsculas
    const paragrafos = extrairParagrafos(texto);
  
    // Itera sobre cada parágrafo e conta as palavras duplicadas
    const contagem = paragrafos.flatMap((paragrafo) => {
      // Se o parágrafo estiver vazio, retorna um array vazio
      if (!paragrafo) return [];
  
      // Conta as palavras duplicadas no parágrafo
      return verificarPalavrasDuplicadas(paragrafo);
    });
  
    // Retorna o resultado final
    return contagem;
  }
  
  /**
   * Extrai os parágrafos de um texto.
   *
   * @param {string} texto - O texto completo.
   * @returns {Array} Um array de strings, onde cada string representa um parágrafo.
   */
  function extrairParagrafos(texto) {
    // Divide o texto em parágrafos usando a quebra de linha como delimitador
    return texto.toLowerCase().split('\n');
  }
  
  /**
   * Limpa uma palavra, removendo pontuação e caracteres especiais.
   *
   * @param {string} palavra - A palavra a ser limpa.
   * @returns {string} A palavra limpa.
   */
  function limpaPalavras(palavra) {
    // Remove caracteres não alfanuméricos da palavra
    return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
  }
  
  /**
   * Verifica as palavras duplicadas em um texto e retorna um objeto com a contagem de cada palavra.
   *
   * @param {string} texto - O texto a ser analisado.
   * @returns {Object} Um objeto onde as chaves são as palavras e os valores são as suas frequências.
   */
  function verificarPalavrasDuplicadas(texto) {
    // Divide o texto em palavras
    const listaPalavras = texto.split(' ');
    const resultado = {};
  
    // Itera sobre cada palavra, limpando-a e incrementando a contagem no objeto resultado
    listaPalavras.forEach(palavra => {
      if (palavra.length >= 3) { // Considera apenas palavras com 3 ou mais caracteres
        const palavraLimpa = limpaPalavras(palavra);
        resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1;
      }
    });
  
    // Retorna o objeto com a contagem das palavras
    return resultado;
  }