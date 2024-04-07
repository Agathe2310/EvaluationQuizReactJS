import React, { useState } from 'react';
import Question from './Question';
import { time, bonneRep, reponses, questions } from './Variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Admin() {
    const mdp = "123456789"; //le bon mdp pour l'admin
    const [inputMdp, setinputMdp] = useState(""); 
    const [connecte, setConnecte] = useState(false); //savoir si on est co
    //Ajouter des variables
    const [newQuestion, setNewQuestion] = useState("");
    const [newAnswers, setNewAnswers] = useState(["", ""]);
    const [newbonneRep, setNewbonneRep] = useState(0);
    const [newTime, setNewTime] = useState(10);
    //Pour savoir si on est en train de faire une question
    const [addingQuestion, setAddingQuestion] = useState(false);
    const [enEdit, setenEdit] = useState(null);

    //Ajouter une question
    const addQuestion = () => {
        if (newQuestion && newAnswers.every(answer => answer !== "") && newbonneRep >= 0 && newTime > 0) {
            questions.push(newQuestion);
            reponses.push(newAnswers.slice(0, newAnswers.length)); 
            bonneRep.push(newbonneRep);
            time.push(newTime);
            setNewQuestion("");
            setNewAnswers(["", ""]);
            setNewbonneRep(0);
            setNewTime(10);
            setAddingQuestion(false);
        } else {
            alert("Veuillez remplir tous les champs correctement.");
        }
    };

    //Pour se connecter
    const login = () => {
        if (inputMdp === mdp) {
            setConnecte(true);
        } else {
            alert("Mot de passe incorrect.");
        }
    };

    //Pour modifier une question
    const editQuestion = (index) => {
        if (newQuestion && newAnswers.every(answer => answer !== "") && newbonneRep >= 0 && newTime > 0) {
            questions[index] = newQuestion;

            reponses[index] = newAnswers.slice(0, newAnswers.length); 
            // console.log(reponses[index]);
            bonneRep[index] = newbonneRep;
            time[index] = newTime;
            setNewQuestion("");
            setNewAnswers(["", ""]);
            setNewbonneRep(0);
            setNewTime(10);
            setenEdit(null);
        } else {
            alert("Veuillez remplir tous les champs correctement.");
        }
    };

    //Valider la modif
    const modifier = (index) => {
        setNewQuestion(questions[index]);
        setNewAnswers(reponses[index].slice(0, reponses[index].length)); 
        setNewTime(time[index]);
        setenEdit(index);
    };

    //Annuler 
    const cancel = () => {
        setNewQuestion("");
        setNewAnswers(["", ""]);
        setNewbonneRep(0);
        setNewTime(10);
        setAddingQuestion(false);
        setenEdit(null);
    };

    //le "form" pour ajouter ou modif une question
    const renderQuestionForm = () => {
        if (addingQuestion || enEdit !== null) {
            return (
                <div>
                    <h2>{enEdit !== null ? "Modifier la question" : "Ajouter une nouvelle question"}</h2>
                    <p>Question : <input type="text" value={newQuestion} onChange={e => setNewQuestion(e.target.value)} placeholder="Nouvelle question" /></p>
                    <p>Réponses : </p>
                    {newAnswers.map((answer, i) => (
                        <div key={i}>
                            <input type="text" value={answer} onChange={e => changeAnswer(e.target.value, i)} placeholder={`Réponse ${i + 1}`} />
                            <button  onClick={() => removeAnswer(i)} disabled={newAnswers.length === 2}>
                            <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <br />
                        </div>
                    ))}
                    <button className='littleButton' onClick={addAnswer} disabled={newAnswers.length === 6}>
                        Ajouter une réponse
                    </button>
                    <p>Sélectionner la bonne réponse : </p>
                    <select value={newbonneRep} onChange={e => setNewbonneRep(parseInt(e.target.value))}>
                        {newAnswers.map((_, i) => (
                            <option key={i} value={i}>Réponse {i + 1}</option>
                        ))}
                    </select>
                    <p>Combien de temps doit durer cette question ?</p>
                    <p><input type="number" value={newTime} onChange={e => setNewTime(parseInt(e.target.value))} placeholder="Temps (en secondes)" /> secondes.</p>
                    
                    <button className='littleButton' onClick={enEdit !== null ? () => editQuestion(enEdit) : addQuestion}>{enEdit !== null ? "Valider les modifications" : "Ajouter la question"}</button>
                    <button  className='littleButton' onClick={cancel}>Annuler</button>
                </div>
            );
        } else {
            return null;
        }
    };

    //On change une réponse
    const changeAnswer = (answer, index) => {
        const updatedAnswers = [...newAnswers];
        updatedAnswers[index] = answer;
        setNewAnswers(updatedAnswers);
    };

    //On ajoute une réponse
    const addAnswer = () => {
        if (newAnswers.length < 6) {
            setNewAnswers([...newAnswers, ""]);
        }
    };

    //On supprime une réponse
    const removeAnswer = (index) => {
        if (newAnswers.length > 2) {
            setNewAnswers(newAnswers.filter((_, i) => i !== index));
        }
    };

    return(
        <div>
            {!connecte ? (
                <div>
                    <h1>Page d'administration du quiz</h1>
                    <p>Veuillez entrer le mot de passe pour accéder à la modification du quiz : </p>
                    <input type="password" value={inputMdp} onChange={(e) => setinputMdp(e.target.value)} placeholder="Mot de passe" />
                    <button className='littleButton' onClick={login}>Connexion</button>
                </div>
            ) : (
                <div>
                    <h1>Page d'administration du quiz</h1>
                    {!addingQuestion && enEdit === null && (
                        <button className='littleButton' onClick={() => setAddingQuestion(true)}>Ajouter une question</button>
                    )}
                    <hr />
                    {renderQuestionForm()}
                    {!addingQuestion && enEdit === null && (
                        questions.map((value, index) => (
                            <div key={index}>
                                <Question>Question {index + 1} : {value}</Question>
                                <p>Temps: {time[index]} secondes</p>
                                <button  className='littleButton' onClick={() => modifier(index)}>
                                    Modifier la question
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default Admin;
