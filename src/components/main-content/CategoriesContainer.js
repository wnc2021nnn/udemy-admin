import { Box, Grid } from "@material-ui/core";
import { Fragment, useState } from "react";
import AppTheme from "../../constants/theme";

export function CategoriesContainer(props) {
  const categories = [
    "IT Operation",
    "IT Operation",
    "IT Operation",
    "IT Operation",
    "IT Operation",
    "IT Operation",
    "IT Operation",
    "IT Operation",
    "IT Operation",
    "IT Operation",
    "IT Operation",
    "IT Operation",
    "IT Operation",
    "IT Operation",
    "IT Operation",
    "IT Operation",
    "IT Operation",
    "IT Operation",
    "IT Operation",
    "IT Operation",
    "IT Operation",
  ];
  const topics = [
    "IT Operation",
    "IT Operation",
    "IT Operation",
    "IT Operation",
    "IT Operation",
    "IT Operation",
  ];

  const [categorySelectedIndex, setCategorySelected] = useState(0);
  const [topicSelectedIndex, setTopicSelected] = useState(0);

  const cateItems = categories.map((value, index) => (
    <CateItem
      value={value}
      isSelected={categorySelectedIndex === index ? true : false}
      onClick={() => setCategorySelected(index)}
    />
  ));
  const topicItems = topics.map((value, index) => (
    <CateItem
      value={value}
      isSelected={topicSelectedIndex === index ? true : false}
      onClick={() => setTopicSelected(index)}
    />
  ));

  return (
    <Fragment>
      <Grid container maxWidth="lg">
        <Grid item xs={6}>
          <CateTable title="Categories">{cateItems}</CateTable>
        </Grid>
        <Grid item xs={6}>
          <CateTable title="Topics">{topicItems}</CateTable>
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
      style={{
        overflowY: "scroll",
      }}
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

function CateItem(props) {
  const textColor = props.isSelected ? AppTheme.secondary : AppTheme.black;
  const backgroundColor = props.isSelected
    ? AppTheme.primary
    : AppTheme.secondary;
  return (
    <Box
      p={2}
      justifyContent="center"
      display="flex"
      style={{ backgroundColor: backgroundColor }}
      onClick={props.onClick}
    >
      <text style={{ color: textColor }}>{props.value}</text>
    </Box>
  );
}
