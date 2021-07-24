import { Box } from "@material-ui/core";
import { Fragment } from "react";
import { AdminLayout } from "./components/layout/AdminLayout";
import { NavigationBar } from "./components/navigation/NavigationBar";

export function App(props) {
  return (
    <Fragment>
      <NavigationBar />
      <main>
        <AdminLayout />
      </main>
    </Fragment>
  );
}
