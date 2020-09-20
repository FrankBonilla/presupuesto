import React, {useState} from 'react';
import Error from './Error';
import shortid from 'shortid';
import PropTypes from 'prop-types';

const Formulario = ({guardarGasto, guardarCrearGasto}) => {
    
    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);


    //cuando el usuario agrega un gasto
    const agregarGasto = e => {
        e.preventDefault();

        //validar
        if(cantidad < 1 || isNaN(cantidad) || nombre === ''){
            guardarError(true);
            return;
        }
        guardarError(false)

        //construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }
        console.log(gasto);
        //pasar el gasto al componente principal
        guardarGasto(gasto);

        //rrsetear el form
        guardarNombre('')
        guardarCantidad(0)
        guardarCrearGasto(true)
    }
    return(
        <form
            onSubmit = {agregarGasto}
        >
            <h2>Agrega tus gastos aquí</h2>
        { error ? <Error mensaje="Ambos campos son obligatorios o presupuesto incorrecto" /> : null}
            <div className="campo">
                <label>Nombre del gasto</label>
                <input
                      type="text"
                      className="u-full-width"
                      placeholder="Ej. Transporte"
                      value = {nombre}
                      onChange = { e => guardarNombre(e.target.value)}
                />
            </div>
            <div className="campo">
                <label>Cantidad del gasto</label>
                <input
                      type="number"
                      className="u-full-width"
                      placeholder="Ej. 300"
                      value = {cantidad}
                      onChange = { e => guardarCantidad(parseInt(e.target.value))}
                      
                />
            </div>
            <input
                  type="submit"
                  className="button-primary u-full-width"
                  value="Agregar gasto"
            />
        </form>
    )
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}

export default Formulario;