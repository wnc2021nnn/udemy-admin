import { Box, Grid } from "@material-ui/core";
import { fontWeight } from "@material-ui/system";
import { Fragment } from "react";
import AppTheme from "../../constants/theme";

export function CategoriesContainer(props) {
  return (
    <Fragment>
      <Grid container maxWidth="lg">
        <Grid item xs={6}>
          <CateTable title="Categories">
            <text>categories</text>
          </CateTable>
        </Grid>
        <Grid item xs={6}>
          <CateTable title="Topics">
            <text>topics</text>
          </CateTable>
        </Grid>
      </Grid>
    </Fragment>
  );
}

function CateTable(props) {
  return (
    <Box
      border={0.5}
      mx={3}
      borderColor="grey.500"
      height="700px"
      maxWidth="true"
    >
      <Box
        p={2}
        justifyContent="center"
        display="flex"
        style={{ backgroundColor: AppTheme.primary }}
      >
        <text style={{ color: AppTheme.secondary, fontWeight: "bold" }}>
          {props.title ?? "TITLE"}
        </text>
      </Box>
      {props.children}
    </Box>
  );
}
