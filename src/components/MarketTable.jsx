import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, TableSortLabel, TablePagination, Box } from "@mui/material";
import Axios from "axios";
import { useState, useEffect } from "react";

function MarketTable({ data, title }) {
    const [headers, setHeaders] = useState([]);
    const [apiData, setApiData] = useState([]);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(data);
                if (Array.isArray(response.data.body) && response.data.body.length > 0) {
                    setHeaders(Object.keys(response.data.body[0]))
                    setApiData(response.data.body);
                } else {
                    console.warn("API returned an empty array or unexpected data format");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        console.log(headers);
        console.log(apiData);
    }, []);
    if (apiData.length === 0) return <p>Loading...</p>;
    // Sorting logic
    const handleSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);

        const sortedData = [...apiData].sort((a, b) => {
            if (a[property] < b[property]) return isAsc ? -1 : 1;
            if (a[property] > b[property]) return isAsc ? 1 : -1;
            return 0;
        });

        setApiData(sortedData);
    };

    // Filtered and paginated data
    const filteredData = apiData.filter((row) =>
        headers.some((header) =>
            String(row[header]).toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
        <>
            <h3>{title}</h3>
            <Paper sx={{ width: "100%", overflow: "hidden", padding: 2 }}>
                {/* Search Box */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
                <TextField
                    label="Search Table..."
                    variant="outlined"
                    size="small"
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ width: 250 }}
                />
                </Box>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table size="small" stickyHeader>
                        {/* Table Head */}
                        <TableHead>
                            <TableRow>
                                {headers.map((header) => (
                                    <TableCell key={header} align="left" sx={{ padding: "6px 12px", fontWeight:"bold", backgroundColor:"#f5f5f5" }}>
                                        <TableSortLabel
                                            active={orderBy === header}
                                            direction={orderBy === header ? order : "asc"}
                                            onClick={() => handleSort(header)}
                                        >
                                            {header}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        {/* Table Body */}
                        <TableBody>
                            {filteredData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <TableRow key={index} hover>
                                        {headers.map((header) => (
                                            <TableCell key={header} align="left">
                                                {row[header]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                />
            </Paper>
        </>
    );
}
export default MarketTable;