import { useState, useEffect, useRef } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [words, setWords] = useState([])
  const [currentWords, setCurrentWords] = useState([])
  const countRef = useRef(count); // Add this line

  useEffect(() => {
    (async function(){
      try {
        const res = await axios.get('/french.txt');
        const wordList = res.data.split('\n');
        setWords(wordList);
        console.log(wordList);
      }
      catch (err) {
        console.error(err);
      }
    })()
  }, []);

  useEffect(() => {

    countRef.current = count; // And this line
    let text = words.slice(count*30-30,count*30)
    console.log(text);
    speak(text, 0)
    return () => {
      window.speechSynthesis.cancel()
    }
  },[count, words])
  
  const speak = (text, index = 0) => {
    if (index >= text.length){
      index = 0
    }
    if(countRef.current !== count) {
      return
    }
    const speech = new SpeechSynthesisUtterance(text[index]);
    speech.lang = "fr-FR"; // Set the language to French
    let voices = window.speechSynthesis.getVoices();
    speech.voice = voices.find(voice => voice.lang.includes('fr'));
    window.speechSynthesis.speak(speech);

    speech.onend = () => {
      setTimeout(()=> {
        speak(text, index + 1)
      },500)
    }
  }
  // const handleClick = (ind) => {
  //   setCurrentWords(currentWords.filter((word) => word !== ind))
  // }
  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        
        <div className = "flex">
        {words.slice(count*30-30, count*30).map((word, idx) => {
          return (
            <p onClick={() => console.log(word)} key={idx}>{word}</p>
            )
          })}
          </div>
      </div>
    </>
  )
}

export default App


// set value of index in words to empty
  // if hash.has() put the value back
  // if hash !.has() value add the value and remove from words

// hash of words that are xed out stored with their index


// on next click words updated with old indexes
  // put value in index of words

// possible useRef if issue
// set the length of words. if the value is !== current return


// highlight index of word its on
// skip the index if its in an array

const stateless = (word, index, currentIndex) => {
  const highlight = index === currentIndex
  return (
    <p className="">{word}</p>
  )
}