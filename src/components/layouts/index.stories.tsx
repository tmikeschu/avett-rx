import * as React from "react";
import { Meta, Story } from "@storybook/react";

import AdminLayout from "./admin";
import AppLayout from "./app";

export default {
  title: "Components/Layouts",
} as Meta;

const AppTemplate: Story = () => <AppLayout />;

export const App = AppTemplate.bind({});

const AdminTemplate: Story = () => <AdminLayout />;
export const Admin = AdminTemplate.bind({});
