import { useEffect, useState } from 'react'
import './App.css'
import Question from './components/Question'
import Reponse from './components/Reponses'


function App() {
  const questions = ["Quelle est la capitale de la France ?", "2 +2 font ?", "Quelle est la capitale de la France ?", "2 +2 font ?"]
  const reponses = [["Paris", "Berlin", "Lyon"], ["1", "4"], ["Paris", "Berlin", "Lyon"], ["1", "4"]]
  const bonneRep = [0, 1, 0, 1]
  const [nbrQuestionsRep, setNbrQuestionsRep] = useState(0); //nbr de questions répondues
  const [reponseValidee, setreponseValidee] = useState(-1);
  const [points, setPoints] = useState(0);
  const time = [15, 10, 15, 10];
  const [timer, setTimer] = useState(time[nbrQuestionsRep]);


  const valider = () =>{
    if(reponseValidee >= 0){
      if(bonneRep[nbrQuestionsRep]=== reponseValidee){
        setPoints(points+1);
      }
      setNbrQuestionsRep(nbrQuestionsRep+1)
      setreponseValidee(-1);
    }else{
      alert("Veuillez sélectionner une réponse")
    }
  }

  useEffect(() => {
    let timerInt;
    if (nbrQuestionsRep < questions.length) {
      setTimer(time[nbrQuestionsRep]);
      timerInt = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 0) {
            clearInterval(timerInt);
            setNbrQuestionsRep(prev => prev + 1);
            return time[nbrQuestionsRep + 1];
          } else {
            return prevTimer - 1
          }
        });
      }, 1000);
    }
  
    return () => clearInterval(timerInt);
  }, [nbrQuestionsRep]);
  
  return (
    <>
      <h1>Quiz</h1>
      {nbrQuestionsRep != questions.length ? (
          <>
          <p>Temps restant : {timer} secondes</p>
      <Question key={nbrQuestionsRep}>Question {nbrQuestionsRep+1} : {questions[nbrQuestionsRep]}</Question>
      <div className="divReponses">
      {reponses[nbrQuestionsRep].map((valueR, indexR)=> (
        <Reponse isSelected={reponseValidee === indexR} handleClick={()=> setreponseValidee(indexR)}key={indexR}> {valueR}</Reponse>
        ))} 
        </div>
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
