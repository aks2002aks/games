import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
