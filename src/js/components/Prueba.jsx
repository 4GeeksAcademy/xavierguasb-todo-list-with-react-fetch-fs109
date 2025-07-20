import React, { useEffect } from "react";


const Prueba = () => {
    
    function leerTareas(){
        console.log()
        fetch('https://playground.4geeks.com/todo/users/Xavier')
        .then( (response)=> response.json() )
        .then( (data) => console.log(data.todos) )
    }


    return (
        <>
            <h1>Prueba</h1>
            <button onClick={leerTareas}>Leer Tareas</button>
        </>
    );
};

export default Prueba;