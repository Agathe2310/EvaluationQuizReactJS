import Quiz from './components/Quiz';
import Admin from './components/Admin';
import './App.css'
import { useState } from 'react';


function App() {
  const [page, setPage] = useState("Accueil");
  const BasculerAdmin = () => {
    setPage("Admin")
  }

  const BasculerUser = () => {
    setPage("User")
  }

  const BasculerAccueil = () => {
    setPage("Accueil")
  }

  return(
    <div id='body'>
      <h1 className='title'>Bienvenue sur le QUIZ</h1>
        {page === "User" ? (
          <Quiz />
        ) : page === "Admin" ? (
          <Admin />
        ) : null}
        {page === "Accueil" ? (
          <>
          <p>Voulez-vous modifier le quiz ?</p>
            <button onClick={BasculerAdmin} className='button'>Administration</button>
            <p>Voulez-vous participer au quiz ?</p>
            <button onClick={BasculerUser}  className='button'>Quiz</button>
          </>
        ) : (
          <button onClick={BasculerAccueil}  className='endButton'>Revenir à la page d'accueil</button>
        )}
      </div>
  )
}

export default App
