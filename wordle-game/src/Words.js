//import wordBank from './wordle-bank.txt'

export const boardwordle = [
  ["","","","",""],
  ["","","","",""],
  ["","","","",""],
  ["","","","",""],
  ["","","","",""],
  ["","","","",""],
]

export const generateWords = async () => {
  try {
    const response = await fetch("https://challenge.trio.dev/api/v1/wordle-words");
    const wordArr = await response.json();

    console.log("API Response:", wordArr);

    if (!Array.isArray(wordArr) || wordArr.length === 0) {
      console.error("Respuesta de la API no válida", wordArr);
      throw new Error("Respuesta de la API no válida");
    }

    const todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];

    console.log("Random Word:", todaysWord);

    const wordSet = new Set(wordArr);

    return { wordSet, todaysWord };
  } catch (error) {
    console.error("Error fetching words:", error);
    throw error;
  }
};






