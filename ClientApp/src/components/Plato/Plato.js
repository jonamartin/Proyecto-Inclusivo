import React, { useState, useEffect } from "react";
import BusquedaPic from "../BusquedaPic/BusquedaPic";
import Ingrediente from "../Ingredientes/Ingredientes.js";
import "./Plato.css";
import Bing from "../Resources/btns/btnIng.png";
import imgmarco from "../Resources/imgMarco.png";

const Plato = (props) => {
  const [imagenPlato, setImagenPlato] = useState(props.infoPlato.picPlato);
  const [imagenesIng, setImagenesIng] = useState(props.infoPlato.picsIngredientes);

  const [mostrarBusqueda, setMostrarBusqueda] = useState(false);
  const [agregarPicIng, setAgregarPicIng] = useState(false);
  const [ingredienteList, setIngredienteList] = useState(props.infoPlato.idIngredientes);
  const [Contador, setContador] = useState(0);

  useEffect(() => {
      props.updateInfo({
        picPlato: imagenPlato,
        idIngredientes: ingredienteList,
        picsIngredientes: imagenesIng,
    }, props.index);
  }, [imagenPlato])

  useEffect(() => {
      props.updateInfo({
        picPlato: imagenPlato,
        idIngredientes: ingredienteList,
        picsIngredientes: imagenesIng,
    }, props.index);
  }, [ingredienteList])

  useEffect(()=> {
    setImagenPlato(imgmarco);
  }, [])
  const newIngrediente = (e) => {
    e.preventDefault();
    setAgregarPicIng(true);
    setMostrarBusqueda(true);

    setContador(Contador + 1);
    setImagenesIng([...imagenesIng, ""]);
    setIngredienteList([...ingredienteList, Contador]);
  };

  function removerIngrediente(idIngrediente) {
    var newImagenesIng = [];
    const newList = ingredienteList.filter((e, index) => {
      if (e != idIngrediente) {
        newImagenesIng = [...newImagenesIng, imagenesIng[index]];
        return true;
      } else {
        return false;
      }
    });
    setImagenesIng(newImagenesIng);
    setIngredienteList(newList);
  }
  function updateImagenesIng(){
      props.updateInfo({
        picPlato: imagenPlato,
        idIngredientes: ingredienteList,
        picsIngredientes: imagenesIng,
    }, props.index);
  }
  function ExpandirBusqueda(e) {
    e.preventDefault();
    setAgregarPicIng(false);
    setMostrarBusqueda(true);
  }

  function seleccionarPic(e) {
    e.preventDefault();
    if (!agregarPicIng){
      setImagenPlato("https://api.arasaac.org/api/pictograms/" + e.target.id);
    }
    else {
      const newImagenesIng = imagenesIng;
      newImagenesIng[ingredienteList.length - 1] =
        "https://api.arasaac.org/api/pictograms/" + e.target.id;
      setImagenesIng(newImagenesIng);
      updateImagenesIng();
    }

    setMostrarBusqueda(false);
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 col-xs-12 d-flex flex-column align-items-center justify-content-center">

          <div className="Plato item1">
            {mostrarBusqueda ? <BusquedaPic seleccionarPic={seleccionarPic} /> : null}
          </div>


          <div className="text-center">
            <img
              onClick={ExpandirBusqueda}
              className="btn m-0 p-0"
              id="img"
              src={imagenPlato}
              style={{ borderRadius: "12px" }}
              alt="Añada su plato"
              width="156"
              height="156"
            />
          </div>

          <div className="Texto ml-2">
            <textarea
              className="bg-transparent"
              placeholder="Nombre del alimento"
            />
          </div>
        </div>
        <div className="col-sm-6 col-xs-12">
          <p>Precio</p>
          <div id="precioPlato" className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                $
                        </span>

              <input
                type="number"
                className="form-control2"
                placeholder="00.00"
                aria-label="Precio"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div id="SeccionIngredientes" className="mt-2">
          {ingredienteList.map((e, index) => {
            return (
              <Ingrediente
                key={e}
                id={e + ""}
                src={imagenesIng[index]}
                onclick={removerIngrediente}
              />
            );
          })}

          {ingredienteList.length < 6 ? (
            <button
              id="newIngredienteButton"
              data-html2canvas-ignore="true"
              onClick={newIngrediente}
            >
              <img src={Bing} className="bimg2" alt="" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Plato;
