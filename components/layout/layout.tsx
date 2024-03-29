import React, { ReactElement } from 'react';
import { Header } from '../header';
import { Container } from '../container';

type LayoutProps = {
  children: ReactElement;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header></Header>
      <main className="bg-slate-100 flex justify-center h-full mt-20">
        <Container>{children}</Container>
      </main>
    </>
  );
};
