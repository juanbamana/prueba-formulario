import { useState } from "react"
import Swal from "sweetalert2";

export const Formulario = ({ addTodo }) => {

    const [todo, setTodo] = useState({
        title: 'Todo1',
        description: 'Description1',
        state: 'pendiente',
        priority: true
    })

    const { title, description, state, priority } = todo

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title.trim() || !description.trim()) {

            Swal.fire({
                title: "Error!",
                text: "Título y descripción son obligatorios",
                icon: "error",
            });
            return

        }
        addTodo({
            id: Date.now(),
            ...todo,
            state: state === 'completado'
        })
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Tarea agregada con éxito",
            showConfirmButton: false,
            timer: 1500,
        });

    }

    const handleChange = (e) => {

        const { type, name, checked, value } = e.target

        setTodo({
            ...todo,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    return (
        <form onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Ingrese Todo"
                className="form-control mb-2"
                name="title"
                value={title}
                onChange={handleChange}
            />
            <textarea
                className="form-control mb-2"
                placeholder="Ingrese descripcion"
                name="description"
                value={description}
                onChange={handleChange}
            />
            <div className="form-check mb-2">
                <input type="checkbox" name='priority' className='form-chech-input' id='imputCheck' checked={priority} onChange={handleChange}
                />
                <label htmlFor="imputCheck">Dar Prioridad</label>
            </div>
            <select className="form-select mb-2" name="state" onChange={handleChange}
                value={state}
            >

                <option value='pendiente'>Pendiente</option>
                <option value='completado'>Completado</option>

            </select>
            <button className="btn btn-primary" type="submit">Agregar Todo</button>


        </form>
    )
}
