import React, { useEffect, useState } from 'react';
import Question from './Question';
import Reponse from './Reponses';
import { time, bonneRep, reponses, questions } from './Variables';

function Quiz() {
  const [nbrQuestionsRep, setNbrQuestionsRep] = useState(0); // Nombre de questions rep
  const [reponsesValidees, setReponsesValidees] = useState([]); 
  const [points, setPoints] = useState(0);
  const [timer, setTimer] = useState(time[nbrQuestionsRep]);

  const valider = () => {
    if (reponsesValidees.length === nbrQuestionsRep) {
      alert("Veuillez sélectionner une réponse");
      return;
    }

    const reponseIndex = reponsesValidees[nbrQuestionsRep];
    if (bonneRep[nbrQuestionsRep] === reponseIndex) {
      setPoints(points + 1);
    }

    setNbrQuestionsRep(nbrQuestionsRep + 1);
  };

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
            return prevTimer - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timerInt);
  }, [nbrQuestionsRep]);

  const selectReponses = (index) => {
    setReponsesValidees(prev => {
      const newReponses = [...prev];
      newReponses[nbrQuestionsRep] = index;
      return newReponses;
    });
  };

  return (
    <>
      {nbrQuestionsRep !== questions.length ? (
        <>
          <Question key={nbrQuestionsRep}>Question {nbrQuestionsRep + 1} : {questions[nbrQuestionsRep]}</Question>
          <p>Temps restant : {timer} secondes</p>
          <div className="divReponses">
            {reponses[nbrQuestionsRep].map((valueR, indexR) => (
              <Reponse
                isSelected={reponsesValidees[nbrQuestionsRep] === indexR}
                handleClick={() => selectReponses(indexR)}
                key={indexR}
              >
                {valueR}
              </Reponse>
            ))}
          </div>
          <button className="button" onClick={valider}>Valider</button>
        </>
      ) : (
        <>
          <p>Quiz terminé</p>
          <h2>Vous avez un total de {points}/{questions.length}</h2>
          <h3>Résultats du Quiz</h3>
          {questions.map((value, index) => (
            <div key={index}>
              <Question>Question {index + 1} : {value}</Question>

              <div style={{ color: reponsesValidees[index] === bonneRep[index] ? "green" : "red" }}>
                Votre réponse : {reponses[index][reponsesValidees[index]]}
              </div>
              <div style={{ color: "green" }}>
                Réponse correcte : {reponses[index][bonneRep[index]]}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default Quiz;
