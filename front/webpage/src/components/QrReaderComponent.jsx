import React, { useState } from 'react';
import {QrScanner} from '@yudiel/react-qr-scanner';


function QrReaderComponent() {
    const [webcamResult, setWebcamResult] = useState();
  const webcamError = (error) => {
    if (error) {
      setWebcamResult(error?.message)
      if(error?.message==="Requested device not found"){
        setWebcamResult("No hay camara web")
    }
    }
  };
  const webcamScan = (result) => {
    if (result) {
      setWebcamResult(result);
    }
    
}
const previewStyle = {
    height: 240,
    width: 320,
  }
    return (
        <>
            <QrScanner
                onDecode={(result) => webcamScan(result)}
                onError={(error) => webcamError(error)}
            />
            <p>WebCam Result: {webcamResult}</p>
          </>
    )
}

export default QrReaderComponent