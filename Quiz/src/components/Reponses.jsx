function Reponse({handleClick, children, isSelected}) {
    return (
        <button className={isSelected ? "selected rep " : "rep"} onClick={handleClick}> 
        {children}</button>
    )}

export default Reponse;