"use client";
import sliderWithInput from "./ui/sliderWithInput";
import { useSliderWithInput } from "@/components/hooks/use-slider-with-input";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import React, { useRef, useEffect } from "react";

function Component() {
const resetFunctionsRef = useRef([]);
const resetAll = () => {
  resetFunctionsRef.current.forEach((resetFn) => resetFn && resetFn());
};
const registerResetFunction = (resetFn, index) => {
  resetFunctionsRef.current[index] = resetFn;
};
  return (
    <div className="space-y-4 min-w-[300px]">
      <legend className="text-sm font-medium text-foreground">Object position</legend>
      <div className="space-y-2">
        <sliderWithInput
          minValue={-10}
          maxValue={10}
          initialValue={[-2]}
          defaultValue={[0]}
          label="X"
          onRegisterReset={(resetFn) => registerResetFunction(resetFn, 0)}
        />
        <sliderWithInput
          minValue={-10}
          maxValue={10}
          initialValue={[4]}
          defaultValue={[0]}
          label="Y"
          onRegisterReset={(resetFn) => registerResetFunction(resetFn, 1)}
        />
        <sliderWithInput
          minValue={-10}
          maxValue={10}
          initialValue={[2]}
          defaultValue={[0]}
          label="Z"
          onRegisterReset={(resetFn) => registerResetFunction(resetFn, 2)}
        />
      </div>
      <Button className="w-full" variant="outline" onClick={resetAll}>
        <RotateCcw className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
        Reset
      </Button>
    </div>
  );
}


export { Component };
