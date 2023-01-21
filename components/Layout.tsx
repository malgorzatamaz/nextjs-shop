import React from "react";

import Header from "./Header";

interface Props {
  children?: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children ? children : null}
    </>
  );
};

export default Layout;
