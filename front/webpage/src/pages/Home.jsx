import TablaTarjetas from "../components/TablaTarjetas";
import { 
MDBContainer,
MDBRow,
MDBCol } from 'mdb-react-ui-kit';

function Home() {
  return (
    <MDBContainer className="my-2 text-center">
      <MDBRow>
        <MDBCol size='4' className="mb-5">
          aqui vendria el react qr scanner
        </MDBCol>
        <MDBCol size='8' className="mb-5">
          <TablaTarjetas/>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default Home