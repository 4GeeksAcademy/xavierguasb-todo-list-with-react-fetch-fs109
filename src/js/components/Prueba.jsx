import React, { useEffect, useState } from "react";

const prueba = ()=>{

    const [cosas, setCosas] = useState(['trabajo', 'coche', 'comida'])
    const [tareas, setTareas] = useState([ ])

    useEffect( ()=>{
        console.log('se cargo el componente')
        leerTareas()
    },[])

    function leerTareas(){
        console.log('leerTareas')
        fetch('https://playground.4geeks.com/todo/users/Xavier')
        .then( (response)=> response.json() )
        .then( (data)=> setTareas(data.todos) )
        // .then( (data)=> console.log(data.todos) )
    }

    function agregarTareas(){
        console.log('agregarTareas')
        setCosas([...cosas, 'hola'])
    }

    function eliminarTarea(idToDelete){
        console.log('eliminarTarea' + idToDelete)

        const requestOptions = {
                method: 'DELETE',
                redirect: "follow"
            };

        fetch('https://playground.4geeks.com/todo/todos/' + idToDelete, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                leerTareas()
            });
    }

    function crearTarea (){
        console.log('crearTarea')

        const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    "label": "Desde react",
                    "is_done": false,
                 })
            };
        fetch('https://playground.4geeks.com/todo/todos/Xavier', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                leerTareas()
            });
    }


    function eliminarTodasLasTareas(){
        setCosas([])
    }

    return(
        <>
            <h1>Hola</h1>
            <button onClick={leerTareas}>leer tareas</button>
            <h3>Tareas de Xavier:</h3>
            <button onClick={crearTarea}>Crear tareas</button>
            {tareas.map( (tarea)=>
                <p key={tarea.id}>
                    tarea {tarea.id}: {tarea.label} 
                    <button onClick={()=>eliminarTarea(tarea.id)}>eliminar tarea</button>
                </p> )}
            <h3>cosas: </h3>
            {cosas.map( (cosa, index)=> <p key={index}>cosa {index}: {cosa} </p> )}
            <button onClick={agregarTareas}>agregar tareas</button>
            <button onClick={eliminarTodasLasTareas}>Eliminar Todas Las Tareas</button>
        </>
    )
}

export default prueba;