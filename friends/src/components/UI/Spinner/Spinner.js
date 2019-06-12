import React from "react";
import SpinnerWrapper from "./SpinnerStyle";

export default function Spinner() {
  /** Got from https://loading.io/css/ */
  return (
    <SpinnerWrapper>
      <div className="lds-spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </SpinnerWrapper>
  );
}
