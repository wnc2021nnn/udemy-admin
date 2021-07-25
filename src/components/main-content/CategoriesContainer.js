import { Box, Grid, Button } from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import AppTheme from "../../constants/theme";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesList } from "../../store/slices/categoriesSlice";
import { Add, Delete, Edit } from "@material-ui/icons";

export function CategoriesContainer(props) {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.categories.listCategory.entities
  );

  const [categorySelectedIndex, setCategorySelected] = useState(0);
  const [topicSelectedIndex, setTopicSelected] = useState(-1);

  useEffect(() => {
    dispatch(fetchCategoriesList());
  }, [dispatch]);

  console.log(categories);
  const cateItems = categories.map((category, index) => (
    <CateItem
      id={category.category_id}
      value={category.title}
      isSelected={categorySelectedIndex === index ? true : false}
      onClick={() => {
        setCategorySelected(index);
        setTopicSelected(-1);
      }}
    />
  ));

  const topicItems = categories[categorySelectedIndex]?.topics.map(
    (topic, index) => (
      <CateItem
        id={topic.topic_id}
        value={topic.title}
        isSelected={topicSelectedIndex === index ? true : false}
        onClick={() => setTopicSelected(index)}
      />
    )
  );

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
    <Box>
      <Box
        border={0.5}
        mx={3}
        borderColor="grey.500"
        height="600px"
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
      <Box
        border={0.5}
        borderTop={0}
        mx={3}
        borderColor="grey.500"
        maxWidth="true"
        display="flex"
        justifyContent="flex-end"
      >
        <Button>
          <Add style={{ color: AppTheme.primary }}></Add>
        </Button>
        <Button>
          <Edit style={{ color: AppTheme.primary }}></Edit>
        </Button>
        <Button>
          <Delete style={{ color: AppTheme.red }}></Delete>
        </Button>
      </Box>
    </Box>
  );
}

function CateItem(props) {
  const textColor = AppTheme.black;
  const backgroundColor = props.isSelected
    ? AppTheme.primaryLight
    : AppTheme.secondary;
  return (
    <Box display="flex" maxWidth="true">
      <Box
        p={2}
        display="flex"
        flexGrow={1}
        style={{ backgroundColor: backgroundColor }}
        onClick={props.onClick}
      >
        <text style={{ color: textColor }}>{props.id ?? "ID"}</text>
      </Box>
      <Box
        p={2}
        display="flex"
        flexGrow={1}
        style={{ backgroundColor: backgroundColor }}
        onClick={props.onClick}
      >
        <text style={{ color: textColor }}>{props.value ?? "Title"}</text>
      </Box>
    </Box>
  );
}
