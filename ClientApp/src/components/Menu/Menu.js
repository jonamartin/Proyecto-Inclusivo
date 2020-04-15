import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Logo from "../SubirLogo/SubirLogo";
import Pagina from "../Pagina/Pagina";
import ExportPDF from "./ExportPDF";
import "./menu.css";

const Menu = () => {
  
  const [infoMenu, setInfoMenu] = useState({
    paginas: [
      {
        platos: [
          {
            picPlato: "",
            idIngredientes: [],
            picsIngredientes: [],
          },
        ],
      },
    ],
  });
  useEffect(() => {
    console.log("InfoMenuActualizado")
    console.table(infoMenu);
  }, [infoMenu])
  const newPagina = () => {
    setInfoMenu(
      {
        paginas: [ ...infoMenu.paginas,
          {
            platos: [
              {
                picPlato: "",
                idIngredientes: [],
                picsIngredientes: ["", "", "", "", "", ""],
              },
            ],
          },
        ],
      }
    );
  };

  const updateInfoPage = (a, b) =>{
    console.log("InfoMenu")
    console.table(infoMenu);
    const newInfo = infoMenu;
    newInfo.paginas[b] = a;
    setInfoMenu(newInfo)
  }

  const guardarPagina = () => {
    Swal.fire({
      title: "<strong>¿Desea guardar los cambios?</strong>",
      icon: "question",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonColor: "#7d2998",
      confirmButtonText: "Si",
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: "No",
      cancelButtonAriaLabel: "Thumbs down",
    }).then( resultado => { 
      if(resultado.value){
        fetch("https://localhost:5001/guardado", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify(infoMenu),
        }).then((response) => {
          if (response.status === 200) {
            console.log("Guardado exitoso");
          }
          else{
            console.log("Ha ocurrido un error, no se guardó");
          }
        });
      } 
    });
  }

  return (
    <div className="container" style= {{display: "flex", flexDirection: "column"}}>
      <div
        id="menu"
        className="pagina p-2 col-xs-12"
      >
        <div className="row Logo">
          <Logo></Logo>
        </div>
        <div className="row Pagina" style= {{display: "flex", flexDirection: "column"}}>
        {infoMenu.paginas.map( (pag, index) => {
         return <Pagina updateInfo={updateInfoPage} infoPag={pag} key={index} index={index} id={index+""}/>
        })}
        </div>
        <div className="row NuevaPagina">
        {infoMenu.paginas.length <= 10 ? (
          <button
            data-html2canvas-ignore
            id="newPaginaButton"
            className="NpagBtn mt-2 col-xs-12"
            onClick={newPagina}
          >
            Nueva Pagina
          </button>
        ) : null}
        </div>
        <div className="arasaacCopyR">
          Autor pictogramas: Sergio Palao. Origen: ARASAAC
          (http://www.arasaac.org). Licencia: CC (BY-NC-SA). Propiedad: Gobierno
          de Aragon (España)
        </div>
      </div>
      <div className="row botones">
        <button type="button" className="button" id="bton" onClick={guardarPagina}>
          Guardar
        </button>
        <button type="button" className="button" id="bton" onClick={function () { ExportPDF(infoMenu.paginas.length) }}>
          Exportar a PDF
        </button>
        </div>
    </div>
  );
};
export default Menu;
