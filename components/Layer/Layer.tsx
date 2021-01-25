import { PropsWithChildren } from "react";

interface LayerProps {}

const Layer = (props: PropsWithChildren<LayerProps>) => {
  return <div>{props.children}</div>;
};

export default Layer;
