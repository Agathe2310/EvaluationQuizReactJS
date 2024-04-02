function Reponse({handleClick, children}) {
    return (
        <div>
        <button className="rep" onClick={handleClick}> 
        {children}</button>
        </div>
    )}

export default Reponse;