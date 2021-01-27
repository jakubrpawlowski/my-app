import { PropsWithChildren } from "react";

export interface LayerProps {}

export const Layer = (props: PropsWithChildren<LayerProps>) => {
  return (
    <div>
      {props.children}
      chuj
    </div>
  );
};
