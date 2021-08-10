import { Box, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {
  enableCourseThunk,
  fetchCourses,
} from "../../store/slices/coursesSlice";
import React from "react";
import clsx from "clsx";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { CustomDropDown } from "../widgets/Dropdown";
import AppTheme from "../../constants/theme";
import { disableCourseThunk } from "../../store/slices/coursesSlice";
import { ToggleOff, ToggleOn } from "@material-ui/icons";
import Status from "../../constants/status-constants";
import { LoadingComponent } from "../LoadingComponent";
import { Autocomplete } from "@material-ui/lab";
import { getAllTeacherThunk } from "../../store/slices/userSlice";

export function CoursesContainer(props) {
  const dispatch = useDispatch();
  let categories = useSelector(
    (state) => state.categories.listCategory.entities
  );
  categories = [{ title: "Categories", topics: [] }, ...categories];

  // Selected Index
  const [categorySelectedIndex, setCategorySelected] = useState(0);
  const [topicSelectedIndex, setTopicSelected] = useState(0);

  // Filter
  const filterCourses = (courses) => {
    let rs = courses;
    const topics = categories[categorySelectedIndex]?.topics;
    if (categorySelectedIndex > 0) {
      rs = courses.filter((course) => {
        return (
          topics.findIndex((topic) => course.topic_id === topic.topic_id) >= 0
        );
      });
    }
    if (topicSelectedIndex > 0) {
      rs = rs.filter(
        (course) => course.topic_id === topics[topicSelectedIndex - 1].topic_id
      );
    }
    return rs;
  };

  // Courses
  const courses = useSelector((state) =>
    filterCourses(state.courses.listCourses.entities)
  );
  // Teachers
  const teachers = useSelector((state) => state.user.teachers.users);

  // Status
  const status = useSelector(
    (state) => state.courses.listCourses.status.status
  );
  const isLoading = status === Status.LOADING_STATUS;

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(getAllTeacherThunk());
  }, [dispatch]);

  const enableCourseHandler = (id) => {
    dispatch(enableCourseThunk(id));
  };

  const disableCourseHandler = (id) => {
    dispatch(disableCourseThunk(id));
  };

  const filterCoursesByCategory = (index) => {
    setCategorySelected(index);
    setTopicSelected(0);
  };

  const filterCoursesByTopic = (index) => {
    setTopicSelected(index);
  };

  const filterCourseByTeacherId = (teacherId) => {
    if (teacherId !== "") {
      dispatch(
        fetchCourses({
          teacher_id: teacherId,
        })
      );
    } else {
      dispatch(fetchCourses());
    }
  };

  return (
    <Box>
      <Box display="flex">
        <CustomDropDown
          options={[...categories?.map((category, index) => category.title)]}
          clickItemCallback={filterCoursesByCategory}
          selectedIndex={categorySelectedIndex}
        />
        <Box width="16px" />
        <CustomDropDown
          options={[
            ...["All"],
            ...categories[categorySelectedIndex]?.topics?.map(
              (topic, index) => topic.title
            ),
          ]}
          clickItemCallback={filterCoursesByTopic}
          selectedIndex={topicSelectedIndex}
        />
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <Autocomplete
            id="combo-box-demo"
            options={teachers}
            getOptionLabel={(option) => option.user_id}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Teacher ID"
                variant="outlined"
                size="small"
                onKeyDown={(e) => {
                  if (e.code === "Enter") {
                    filterCourseByTeacherId(e.target.value);
                  }
                }}
              />
            )}
          />
        </Box>
      </Box>
      <Box height="32px" />
      <EnhancedTable
        rows={courses?.map((course, index) =>
          createData(
            course.course_id,
            course.title,
            course.description,
            course.topic_id,
            course.lecturers_id,
            course.state === "DISABLED"
          )
        )}
        disableCourseHandler={disableCourseHandler}
        enableCourseHandler={enableCourseHandler}
      />
      <LoadingComponent isLoading={isLoading} />
    </Box>
  );
}

function createData(id, title, desc, topic, lecturers, isDisable) {
  return { id, title, desc, topic, lecturers, isDisable };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "id", numeric: false, disablePadding: true, label: "ID" },
  { id: "title", numeric: false, disablePadding: false, label: "Course Name" },
  { id: "desc", numeric: false, disablePadding: false, label: "Description" },
  { id: "topic", numeric: false, disablePadding: false, label: "Topic" },
  {
    id: "lecturers",
    numeric: false,
    disablePadding: false,
    label: "Lecturers",
  },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric || index === 0 ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight: {
    color: AppTheme.primaryLight,
    backgroundColor: AppTheme.primaryLight,
  },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const { onDisable, onEnable, isDisableMode } = props;
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const toolBar = (
    <Toolbar>
      <Tooltip>
        {isDisableMode ? (
          <IconButton onClick={onDisable}>
            <ToggleOn />
          </IconButton>
        ) : (
          <IconButton onClick={onEnable}>
            <ToggleOff />
          </IconButton>
        )}
      </Tooltip>
    </Toolbar>
  );

  return (
    <Box
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
      display="flex"
    >
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
        style={{ padding: "16px" }}
      >
        Courses
      </Typography>
      {numSelected > 0 ? toolBar : null}
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 480,
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
}));

function EnhancedTable(props) {
  const { enableCourseHandler, disableCourseHandler, rows } = props;

  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selectedId, setSelected] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    if (selectedId === id) {
      setSelected("");
    } else {
      setSelected(id);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selectedId === id;
  const isDisableMode = (id) => {
    const index = rows.findIndex((value) => value.id === id);
    return rows[index]?.isDisable ? false : true;
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, props.rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selectedId.length}
          onDisable={() => disableCourseHandler(selectedId)}
          onEnable={() => enableCourseHandler(selectedId)}
          isDisableMode={isDisableMode(selectedId)}
        />
        <TableContainer className={classes.container}>
          <Table className={classes.table} size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
            />
            <TableBody>
              {stableSort(props.rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                      className={classes}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="right"
                      >
                        <CustomText isDisable={row.isDisable}>
                          {row.id}
                        </CustomText>
                      </TableCell>
                      <TableCell align="left">
                        <CustomText isDisable={row.isDisable}>
                          {row.title}
                        </CustomText>
                      </TableCell>
                      <TableCell align="left">
                        <CustomText isDisable={row.isDisable}>
                          {row.desc}
                        </CustomText>
                      </TableCell>
                      <TableCell align="left">
                        <CustomText isDisable={row.isDisable}>
                          {row.topic}
                        </CustomText>
                      </TableCell>
                      <TableCell align="left">
                        <CustomText isDisable={row.isDisable}>
                          {row.lecturers}
                        </CustomText>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}

const CustomText = (props) => {
  const { children, isDisable } = props;
  return <text style={{ color: isDisable ? "red" : "black" }}>{children}</text>;
};
