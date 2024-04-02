import { useEffect, useState } from 'react'
import './App.css'
import Question from './components/Question'
import Reponse from './components/Reponses'


function App() {
  const questions = ["Quelle est la capitale de la France ?", "2 +2 font ?"]
  const reponses = [["Paris", "Berlin", "Lyon"], ["1", "4"]]
  const bonneRep = [0, 1, 2]
  const [nbrQuestionsRep, setNbrQuestionsRep] = useState(0); //nbr de questions répondues
  let questionValidee = 0; 
  const [points, setPoints] = useState(0);


  const valider = () =>{
    if(bonneRep[nbrQuestionsRep]=== questionValidee){
      setPoints(points+1);
      console.log(bonneRep[nbrQuestionsRep]);
      console.log(questionValidee);
    }
    setNbrQuestionsRep(nbrQuestionsRep+1)
    console.log(nbrQuestionsRep)
  }
  
  return (
    <>
      <h1>Quiz</h1>
      {nbrQuestionsRep != questions.length ? (
          <>
      <p>Timer : </p>
      <Question key={nbrQuestionsRep}>Question {nbrQuestionsRep+1} : {questions[nbrQuestionsRep]}</Question>
      {reponses[nbrQuestionsRep].map((valueR, indexR)=> (
        <Reponse handleClick={()=> (questionValidee = indexR, console.log(questionValidee))}key={indexR}> {valueR}</Reponse>
        ))} 
        <button className ="button" onClick={valider}> Valider</button>
        </>
            ):(
              <>
              <p>Quiz terminé</p>
              <h2>Vous avez un total de {points}/{questions.length}</h2>
              <h3>Les bonnes réponses</h3>
              {questions.map((value, index)=> (
                <>
                <Question key={index}>Question {index+1} : {value}</Question>
                <Question>La bonne réponse est : {reponses[index][bonneRep[index]]}</Question>
                  </>
        ))}
              </>
              )
            }
    </>
  )
}

export default App
