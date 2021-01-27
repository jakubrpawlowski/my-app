// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story } from "@storybook/react/types-6-0";
import { Layer as LayerComponent, LayerProps } from "components/Layer";

export default {
  title: "Example/Layer",
  component: LayerComponent,
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const Layer: Story<LayerProps> = (args) => <LayerComponent {...args} />;
