"use client";

import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ClientLayout({ children }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return <>{children}</>;
}
