import React, { ReactElement } from "react";

type ContainerProps = {
  children: ReactElement;
};
export const Container = ({ children }: ContainerProps) => {
  return (
    <>
      <div className={["container", "lg:max-w-[680px]", "h-full"].join(" ")}>
        {children}
      </div>
    </>
  );
};
