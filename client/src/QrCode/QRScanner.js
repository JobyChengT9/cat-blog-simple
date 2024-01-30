import React, { useEffect, useRef, useState } from "react";

// Styles
// import "./QrStyles.css";

// Qr Scanner
import QrScanner from "qr-scanner";



const QrReader = () => {
  const scanner = useRef();
  const videoEl = useRef(null)
  const [hasCamera, setHasCamera] = useState(false)

  useEffect(() => {
    scanner.current = new QrScanner(videoEl.current, (result) => console.log(result), {
      preferredCamera: "user",
      highlightScanRegion: true,
      highlightCodeOutline: true,
    });
    scanner.current.start();
  }, [])



  // QrScanner.hasCamera().then(has => setHasCamera(has));
  return (
    <div className="qr-reader">
      <video ref={videoEl}></video>
    </div>
  );
};

export default QrReader;