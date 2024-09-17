const getOneRandomWord = (wordsList) => {
    const countWords = wordsList.length; // Conta quantas palavras existem
    const shuffleIndex = Math.floor(Math.random() * countWords); // Gera um índice aleatório
    return wordsList[shuffleIndex] // Retorna a palavra com o índice aleatório
}

const isTestEnviroment= () => {
    return typeof process !== 'undefined' && process.env.NODE_ENV === 'test'
}

const loadWords = async () => {
    return fetch("./resources/assets/json/database.json") // Faz a requisição do arquivo
      .then((response) => response.json()) // Converte o arquivo JSON em um objeto
      .then(({ words }) => words) // Extrai a lista de palavras
      .catch(() => []); // Se der erro, retorna uma lista vazia
}

const start = () => {
    if (isTestEnviroment()) {
        module.exports = {
            getOneRandomWord,
            isTestEnviroment,
            loadWords
        }

        return
    }

    window.onload = async () => {
        const database = await loadWords()
        console.log(database) // Mostra todas as palavras
        console.log('get one random word: ', getOneRandomWord(database)) // Mostra uma palavra aleatória
    }
}

start()