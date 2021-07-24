import { Box, Grid, Container } from "@material-ui/core";
import { LeftNavigation } from "../navigation/LeftNavigation";
import { useState, Fragment } from "react";
import { CategoriesContainer } from "../main-content/CategoriesContainer";
import { CoursesContainer } from "../main-content/CoursesContainer";
import { LecturersContainer } from "../main-content/LecturersContainer";
import { StudentsContainer } from "../main-content/StudentsContainer";

export function AdminLayout(props) {
  const [tabIndex, setTabIndex] = useState(0);

  const tabViews = [
    <CategoriesContainer />,
    <CoursesContainer />,
    <LecturersContainer />,
    <StudentsContainer />,
  ];

  return (
    <Box borderRadius={8} borderColor="grey.500" mt={12} mx="32px">
      <Grid container maxWidth="lg">
        <Grid item xs={2}>
          <LeftNavigation currentTabIndex={tabIndex} onClickTab={setTabIndex} />
        </Grid>
        <Grid item xs={10}>
          <Fragment>
            <Box mx={3}>
              <Container>{tabViews[tabIndex]}</Container>
            </Box>
          </Fragment>
        </Grid>
      </Grid>
    </Box>
  );
}
