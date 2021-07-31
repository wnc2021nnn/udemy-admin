import { Box, Grid } from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import AppTheme from "../../constants/theme";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryThunk,
  fetchCategoriesList,
} from "../../store/slices/categoriesSlice";
import { Delete } from "@material-ui/icons";
import AddCategoryButton from "../widgets/dialogs/AddCategoryButton";
import ConfirmButton from "../widgets/buttons/ConfirmButton";
import UpdateCategoryButton from "../widgets/dialogs/UpdateCategoryButton";

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

  const deleteHandler = () => {
    dispatch(
      deleteCategoryThunk(categories[categorySelectedIndex].category_id)
    );
  };

  const topicItems = categories[categorySelectedIndex]?.topics?.map(
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
          <CategoryOption
            deleteHandler={deleteHandler}
            categoryId={categories[categorySelectedIndex]?.category_id}
            categoryTitle={categories[categorySelectedIndex]?.title}
          />
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
    </Box>
  );
}

function CategoryOption(props) {
  const { deleteHandler, categoryId, categoryTitle } = props;
  return (
    <Box
      border={0.5}
      borderTop={0}
      mx={3}
      borderColor="grey.500"
      maxWidth="true"
      display="flex"
      justifyContent="flex-end"
    >
      <AddCategoryButton />
      <UpdateCategoryButton
        categoryId={categoryId}
        categoryTitle={categoryTitle}
      />
      <ConfirmButton
        title={"Delete Category"}
        description={"Do you wanna delete this category?"}
        onConfirm={deleteHandler}
      >
        <Delete style={{ color: AppTheme.red }}></Delete>
      </ConfirmButton>
    </Box>
  );
}

function TopicOption(props) {
  const { deleteHandler } = props;
  return (
    <Box
      border={0.5}
      borderTop={0}
      mx={3}
      borderColor="grey.500"
      maxWidth="true"
      display="flex"
      justifyContent="flex-end"
    >
      <AddCategoryButton />
      <UpdateCategoryButton />
      <ConfirmButton
        title={"Delete Category"}
        description={"Do you wanna delete this category?"}
        onConfirm={deleteHandler}
      >
        <Delete style={{ color: AppTheme.red }}></Delete>
      </ConfirmButton>
    </Box>
  );
}

function CateItem(props) {
  const textColor = AppTheme.black;
  const backgroundColor = props.isSelected
    ? AppTheme.primaryLight
    : AppTheme.secondary;
  return (
    <Box display="flex" maxWidth="true" key={props.id}>
      <Box
        p={2}
        display="flex"
        flexGrow={1}
        justifyContent="center"
        style={{ backgroundColor: backgroundColor }}
        onClick={props.onClick}
      >
        <text style={{ color: textColor }}>{props.value ?? "Title"}</text>
      </Box>
    </Box>
  );
}
