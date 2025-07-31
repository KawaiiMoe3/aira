import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import Swal from 'sweetalert2';
import ok from "../../assets/ok.png";

function getMuiThemeFromHtmlClass() {
    const isDark = document.documentElement.classList.contains('dark');
    return createTheme({
        palette: {
            mode: isDark ? 'dark' : 'light',
        },
    });
}

function createData(id, title, date, analysisReport) {
    return { id, title, date, analysisReport };
}

const initialRows = [
    createData(1, 'MyResume1', '07 Apr 2025, 13:28', 'MyResume1_report.pdf'),
    createData(2, 'MyResume2', '08 Apr 2025, 13:28', 'MyResume2_report.pdf'),
    createData(3, 'MyResume3', '09 Apr 2025, 13:28', 'MyResume3_report.pdf'),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
    { id: 'no', numeric: false, disablePadding: false, label: 'No.' },
    { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'analysisReport', numeric: false, disablePadding: false, label: 'Analysis Report' },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.id === 'no' ? (
                            headCell.label
                        ) : (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id && (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                )}
                            </TableSortLabel>
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar({ numSelected, onDelete }) {
    return (
        <Toolbar
            sx={[
                { pl: { sm: 2 }, pr: { xs: 1, sm: 1 } },
                numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                    Analyzed History
                </Typography>
            )}

            {numSelected > 0 && (
                <Tooltip title="Delete">
                    <IconButton onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default function TableHistory() {
    const [muiTheme, setMuiTheme] = useState(getMuiThemeFromHtmlClass());
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('no');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [localRows, setLocalRows] = useState(initialRows);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setMuiTheme(getMuiThemeFromHtmlClass());
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = localRows.map((n) => n.id);
            setSelected(newSelected);
        } else {
            setSelected([]);
        }
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleDeleteSelected = () => {
        Swal.fire({
            title: 'Delete',
            text: `Delete ${selected.length} item(s)?`,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            customClass: {
                title: 'custom-title',
                htmlContainer: 'custom-text',
                popup: 'custom-swal-bg',
                confirmButton: 'custom-confirm-button',
                cancelButton: 'custom-cancel-button',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const deletedRows = localRows.filter((row) => selected.includes(row.id));
                const remaining = localRows.filter((row) => !selected.includes(row.id));
                console.log("Deleted rows:", deletedRows);
                setLocalRows(remaining);
                setSelected([]);

                Swal.fire({
                    title: 'Deleted!',
                    text: 'Selected item(s) have been deleted.',
                    imageUrl: ok,
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: {
                        title: 'custom-title',
                        htmlContainer: 'custom-html',
                        popup: 'custom-swal-bg',
                    },
                });
            }
        })
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

    const visibleRows = React.useMemo(
        () =>
            [...localRows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, localRows]
    );

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - localRows.length) : 0;

    return (
        <ThemeProvider theme={muiTheme}>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2, borderRadius: 3 }}>
                    <EnhancedTableToolbar numSelected={selected.length} onDelete={handleDeleteSelected} />
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={localRows.length}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const isItemSelected = selected.includes(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.title}
                                            </TableCell>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>
                                                <a href="#" className="text-purple-500">
                                                    {row.analysisReport}
                                                </a>
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
                        count={localRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                    className="dark:text-white"
                />
            </Box>
        </ThemeProvider>
    );
}
