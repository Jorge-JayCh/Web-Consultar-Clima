import React, { Fragment, useState, useEffect } from 'react';
import Clima from './components/Clima';
import Formulario from './components/Formulario';
import Header from './components/Header';
import Error from './components/Error';


function App() {

  // state de la busqueda
  const [ busqueda, guardarBusqueda ] = useState({
    ciudad: '',
    pais: ''
  });

  // state para controlar la consulta
  const [ consultar , guardarConsultar ] = useState(false);
  const [ resultado, guardarResultado ] = useState({});
  const [ error, guardarError ] = useState(false);


  const { ciudad, pais } = busqueda;

  useEffect(()=>{
  
    const consultarAPI = async () => {
      if ( consultar ) {

        const apiId = process.env.REACT_APP_APIKEY;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ ciudad },${ pais }&appid=${ apiId }`;
    
        const respuesta = await fetch( url );
        const resultado = await respuesta.json();
        
        // Validar si encontro un resultado correcto
        if ( resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }

        guardarResultado(resultado);
        guardarConsultar(false);

      }
    }
    consultarAPI();

  }, [ consultar, ciudad, pais ]);

  return (
    <Fragment>
      <Header
        titulo={ "Clima React App"}
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={ busqueda }
                guardarBusqueda={ guardarBusqueda }
                guardarConsultar={ guardarConsultar }
              />
            </div>
            <div className="col m6 s12">
              { error
                  ? <Error 
                      mensaje="No hay resultados para esa ciudad"
                    />
                  :<Clima
                      resultado={ resultado }
                    />
              }
            </div>
          </div>
        </div>
        
      </div>
    </Fragment>
  );
}

export default App;
