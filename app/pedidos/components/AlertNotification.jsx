"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, PaperPlaneTilt, Wrench } from "@phosphor-icons/react";
import { Money } from "@phosphor-icons/react/dist/ssr";

export function AlertNotification({
  title = "Heads up!",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum eaque eligendi dolorem magni illo consequatur vero suscipit autem sint ducimus! Incidunt laudantium dolorem nulla numquam et error ab excepturi quidem!",
  icon,
  href = undefined,
  ...props
}) {
  return (
    <Alert {...props}>
      {getIcon(icon)}
      <AlertTitle className="w-fit">{title}</AlertTitle>
      <AlertDescription className="w-fit uppercase">
        {description}
      </AlertDescription>
    </Alert>
  );
}

function getIcon(name = "info") {
  switch (name) {
    case "wrench":
      return <Wrench className="fill-slate-600" size={24} />;
    case "paper-plane":
      return <PaperPlaneTilt className="fill-yellow-600" size={24} />;
    case "money":
      return <Money className="fill-green-600" size={24} />;
    default:
      return <Info size={24} />;
  }
}
