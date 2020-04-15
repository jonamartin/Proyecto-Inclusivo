import React, { useState, useEffect } from "react";
import Plato from "../Plato/Plato";
import Bpl from "../Resources/btns/NuevoPlato.png";
import "./pagina.css";

const Pagina = (props) => {
    const [ infoPagina, setInfoPagina] = useState(props.infoPag);
    useEffect(() => {
        props.updateInfo(infoPagina, props.index);
    }, [infoPagina]);

    const newPlato = () => {
        setInfoPagina(
            {
                platos: [ ...infoPagina.platos,
                    {
                        picPlato: "",
                        idIngredientes: [],
                        picsIngredientes: [],
                    },
                ],
            },
        );
    }
    const updateInfoPlato = (a, b) => {
        const newInfo = infoPagina;
        newInfo.platos[b] = a
        setInfoPagina(newInfo)
    }
    return (
        <React.Fragment>
            <div id={"Pagina " + props.id} className="Pagina" style={{ display: "flex", flexDirection: "column" }}>
                <div className="row">
                    <input
                        className="secciones mt-2 text-center"
                        placeholder="Nombre de sección (click para editar)"
                    />
                </div>
                <div className="row mt-2" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    {infoPagina.platos.map( (plato, index) => {
                    return <Plato updateInfo={updateInfoPlato} id={index+""} index={index} infoPlato={plato} key={index+1} />
                    })}
                </div>
                <div className="row">
                    {infoPagina.platos.length < 10 ? (
                        <button
                            id="newPlatoButton"
                            data-html2canvas-ignore="true"
                            onClick={newPlato}
                            style={{ margin: "auto" }}
                        >
                            <img src={Bpl} className="bimg " alt="No se pudo cargar imagen" />
                        </button>
                    ) : null}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Pagina;
