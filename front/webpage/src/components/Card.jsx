
import { useEffect, useRef, useState } from 'react';
var QRCode = require('qrcode')

function Card({codigo,grupo,maestro,domEl,color}) {
    const [text, setText] = useState(`Grupo: ${grupo}\nMaestro: ${maestro}`);
    const canvasRef = useRef();

    useEffect(() => {
        QRCode.toCanvas(
          canvasRef.current,
          text || " ",
          (error) => error && console.error(error)
        );
    }, [text]);

  return (
    <div id="domEl" ref={domEl} className="tarjeta hidden" style={{borderColor:color, borderStyle:'solid',borderWidth:'10px'}}>
        <section>
            <h1>ICTHUS</h1>
            <canvas ref={canvasRef} />
            <h3>{codigo}</h3>
        </section>
    </div>
  )
}

export default Card