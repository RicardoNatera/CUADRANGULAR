import { useState } from "react";
import TablaTarjetas from "../components/TablaTarjetas";
import QrReaderComponent from "../components/QrReaderComponent";
import { 
MDBContainer,
MDBRow,
MDBCol,
MDBSwitch,
MDBRadio, 
MDBBtnGroup } from 'mdb-react-ui-kit';


function Home() {
  const [action, setAction] = useState("BuscarTarjetas")
  return (
      <MDBContainer className="my-2 text-center" size='lg'>
        <MDBBtnGroup className="my-5">
        <MDBRadio btn btnColor='info' id='QrReader' name='options' wrapperTag='span' label='Lector QR' onClick={(e)=>{setAction(e.target.id);}} />
        <MDBRadio defaultChecked btn btnColor='info' id='BuscarTarjetas' name='options' wrapperTag='span' label='Tabla de tarjetas' onClick={(e)=>{setAction(e.target.id)}} />
      </MDBBtnGroup>
      <MDBRow>
        {action=="QrReader" ? (
        <MDBCol size='12' className="mb-5">
          <QrReaderComponent/>
        </MDBCol>):(
        <MDBCol size='12' className="mb-5">
          <TablaTarjetas/>
        </MDBCol>)}
        
        
      </MDBRow>
    </MDBContainer>
  )
}

export default Home