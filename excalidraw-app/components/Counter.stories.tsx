import type { Meta, StoryObj } from "@storybook/react-vite";
import Counter from "./Counter";

const meta: Meta<typeof Counter> = {
  title: "Components/Counter",
  component: Counter,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Counter>;

export const Default: Story = {
  args: {
    initialCount: 0,
    step: 1,
    label: "Counter",
  },
};

export const WithCustomStart: Story = {
  args: {
    initialCount: 10,
    step: 5,
    label: "Step by 5",
  },
};
