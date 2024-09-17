import fs from 'fs';
import path from 'path';
import trataErros from './erros/funcoesErro.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander';
import chalk from 'chalk';

// Cria uma nova instância do Command para criar a interface de linha de comando
const program = new Command();

// Define a versão do programa e as opções de linha de comando
program
  .version('0.0.1')
  .option('-t,--texto <string>', 'Path of the text file to be processed')
  .option('-d, --destino <string>', 'Path to the folder where you want to save the results file')
  .action((options) => {
    // Desestrutura as opções passadas pela linha de comando
    const { texto, destino } = options;

    // Verifica se os caminhos foram fornecidos
    if (!texto || !destino) {
      console.error(chalk.red('error: Please enter the source and destination path'));
      program.help();
      return;
    }

    // Resolve os caminhos para garantir compatibilidade entre sistemas operacionais
    const caminhoTexto = path.resolve(texto);
    const caminhoDestino = path.resolve(destino);

    // Tenta processar o arquivo
    try {
      processaArquivo(caminhoTexto, caminhoDestino);
      console.log(chalk.green('text processed successfully'));
    } catch (erro) {
      console.log('a processing error occurred', erro);
    }
  });

program.parse();

// Função principal para processar o arquivo
function processaArquivo(texto, destino) {
  // Lê o arquivo de texto de forma assíncrona
  fs.readFile(texto, 'utf-8', (erro, texto) => {
    try {
      // Verifica se ocorreu algum erro durante a leitura
      if (erro) throw erro;

      // Conta as palavras no texto
      const resultado = contaPalavras(texto);

      // Cria e salva o arquivo com os resultados
      criaESalvaArquivo(resultado, destino);
    } catch (erro) {
      // Chama a função de tratamento de erros
      trataErros(erro);
    }
  });
}

// Função para criar e salvar o arquivo com os resultados
async function criaESalvaArquivo(listaPalavras, endereco) {
  // Constrói o nome do arquivo de saída
  const arquivoNovo = `${endereco}/result.txt`;

  // Formata os resultados para o formato de saída (assumindo que montaSaidaArquivo faz isso)
  const textoPalavras = montaSaidaArquivo(listaPalavras);

  try {
    // Escreve os resultados no arquivo de forma assíncrona
    await fs.promises.writeFile(arquivoNovo, textoPalavras);
    console.log('Arquivo criado');
  } catch (erro) {
    throw erro;
  }
}