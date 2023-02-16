import React, { useState } from 'react';
import {QrScanner} from '@yudiel/react-qr-scanner';


function QrReaderComponent() {
    const [webcamResult, setWebcamResult] = useState();
    const [error,setError] = useState(false)
    const webcamError = (error) => {
    if (error) {
      setWebcamResult(error?.message)
      setError(true)
      if(error?.message==="Requested device not found"){
        setWebcamResult("No hay camara web disponible")
    }
    }
  };
  const webcamScan = (result) => {
    if (result) {
      setError(false)
      setWebcamResult(result);
    }
    
}
const previewStyle = {
    height: 240,
    width: 320,
  }
    return (
        <>
          {
            !error ? (
              <QrScanner
                onDecode={(result) => webcamScan(result)}
                onError={(error) => webcamError(error)}
              />
            ):(<></>)
          }
          
          <p>Resultado del lector: {webcamResult}</p>
        </>
    )
}

export default QrReaderComponent