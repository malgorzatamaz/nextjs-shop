import React from "react";

import { Header } from "./Header";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
