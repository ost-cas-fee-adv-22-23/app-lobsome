import React, { ReactElement } from "react";
import { Header } from "./header";

type LayoutProps = {
  children: ReactElement;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
    </>
  );
};
