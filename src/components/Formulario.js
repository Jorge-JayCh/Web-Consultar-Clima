import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Error from './Error';


const Formulario = ({ busqueda, guardarBusqueda, guardarConsultar }) => {

    // state para el Error
    const [ error, guardarError ] = useState(false);

    // extraer ciudad y pais
    const { ciudad, pais } = busqueda;

    // funcion que coloca los elemetos en el state
    const handleChange = e => {
        // actualizar el state
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }
    
    // Cuando el usuario presiona el boton de submit
    const handleSubmit = e => {
        e.preventDefault();
        //validar
        if ( ciudad.trim() === '' || pais.trim === '' ) {
            guardarError(true);
            return;
        }
        guardarError(false);
        // pasarlo al componente principal
        guardarConsultar(true);
    }
    return (
        <form
            onSubmit={ handleSubmit }
        >
            { error 
                ? <Error mensaje="Todos los campos son obligatorios" /> 
                : null
            }

            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ ciudad }
                    onChange={ handleChange }
                />
                <label htmlFor="ciudad">Ciudad : </label>
            </div>
            
            <div className="input-field col s12">
                    <select
                        name="pais"
                        id="pais"
                        value={ pais }
                        onChange={ handleChange }
                    >
                        <option value="" disabled >-- Seleccione un país --</option>
                        <option value="US">Estados Unidos</option>
                        <option value="MX">México</option>
                        <option value="AR">Argentina</option>
                        <option value="CO">Colombia</option>
                        <option value="CR">Costa Rica</option>
                        <option value="ES">España</option>
                        <option value="PE">Perú</option>
                    </select>
                <label htmlFor="pais" >País : </label>
            </div>
            <div className="input-field col s12">
                <button
                    type="submit"
                    className="waves-effect waves-light btn-large btn-block yellow darken-3 col s12"
                >Buscar Clima</button>
            </div>
        </form>
    );
}

Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    guardarBusqueda: PropTypes.func.isRequired,
    guardarConsultar: PropTypes.func.isRequired
}

export default Formulario;