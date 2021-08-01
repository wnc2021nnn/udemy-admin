import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect } from "react";
import clsx from "clsx";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import AppTheme from "../../constants/theme";
import { Box, Button } from "@material-ui/core";
import { Add, Edit } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeacherThunk } from "../../store/slices/userSlice";
import CreateTeacherButton from "../widgets/buttons/CreateTeacherButton";

export function LecturersContainer(props) {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.user.teachers.users);
  const rows = teachers.map((teacher) => {
    return createData(
      teacher.user_id,
      teacher.email,
      teacher.first_name,
      teacher.last_name
    );
  });

  useEffect(() => {
    dispatch(getAllTeacherThunk());
  }, [dispatch]);

  return (
    <Box>
      <Box display="flex" justifyContent="flex-start" mb={2}>
        <CreateTeacherButton />
      </Box>
      <LecturersTable rows={rows} />
    </Box>
  );
}

const rows = [
  createData(1, "nhinlechi@gmail.com", "Nhin", "Le"),
  createData(2, "nhinlechi@gmail.com", "Nhin", "Le"),
  createData(3, "nhinlechi@gmail.com", "Nhin", "Le"),
  createData(4, "nhinlechi@gmail.com", "Nhin", "Le"),
  createData(5, "nhinlechi@gmail.com", "Nhin", "Le"),
  createData(6, "nhinlechi@gmail.com", "Nhin", "Le"),
  createData(7, "nhinlechi@gmail.com", "Nhin", "Le"),
  createData(8, "nhinlechi@gmail.com", "Nhin", "Le"),
  createData(9, "nhinlechi@gmail.com", "Nhin", "Le"),
  createData(10, "nhinlechi@gmail.com", "Nhin", "Le"),
];

function createData(id, email, firstName, lastName) {
  return { id, email, firstName, lastName };
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
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  {
    id: "firstName",
    numeric: false,
    disablePadding: false,
    label: "First Name",
  },
  { id: "lastName", numeric: false, disablePadding: false, label: "Last Name" },
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
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const toolBar = (
    <Toolbar>
      <Tooltip title="Delete">
        <Box display="flex">
          <IconButton>
            <Edit style={{ color: AppTheme.black }}></Edit>
          </IconButton>
          <IconButton>
            <DeleteIcon style={{ color: AppTheme.red }} />
          </IconButton>
        </Box>
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
        Lecturers
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

function LecturersTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    if (selected[0] === id) {
      setSelected([]);
    } else {
      setSelected([id]);
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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.rows?.length ?? -page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer className={classes.container}>
          <Table className={classes.table} size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={props.rows?.length ?? 0}
            />
            <TableBody>
              {stableSort(props.rows ?? [], getComparator(order, orderBy))
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
                        padding="default"
                        align="center"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.firstName}</TableCell>
                      <TableCell align="left">{row.lastName}</TableCell>
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
          count={props.rows?.length ?? 0}
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
