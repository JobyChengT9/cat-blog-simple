import { React, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import QrReader from "../../QrCode/QRScanner";


const Scan = () => {
  return (
    <div>
      <QrReader />
    </div>
  )
}

export default Scan