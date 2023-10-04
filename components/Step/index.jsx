"use client";

import React, { useState, useRef } from "react";
import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";

export default function Step() {
  const [activeIndex, setActiveIndex] = useState(1);
  const toast = useRef(null);
  const items = [
    {
      label: "Personal",
      command: (event) => {
        toast.current.show({
          severity: "info",
          summary: "First Step",
          detail: event.item.label,
        });
      },
    },
    {
      label: "Seat",
      command: (event) => {
        toast.current.show({
          severity: "info",
          summary: "Second Step",
          detail: event.item.label,
        });
      },
    },
    {
      label: "Payment",
      command: (event) => {
        toast.current.show({
          severity: "info",
          summary: "Third Step",
          detail: event.item.label,
        });
      },
    },
    {
      label: "Confirmation",
      command: (event) => {
        toast.current.show({
          severity: "info",
          summary: "Last Step",
          detail: event.item.label,
        });
      },
    },
  ];

  return (
    <div className="card">
      <Toast ref={toast}></Toast>
      <Steps
        model={items}
        activeIndex={activeIndex}
        onSelect={(e) => setActiveIndex(e.index)}
        readOnly={false}
      />
    </div>
  );
}
