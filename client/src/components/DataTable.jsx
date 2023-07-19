import React from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";

const DataTable = ({ columns, data, title, actions }) => {
	const defaultTheme = createTheme();
	return (
		<div>
			<ThemeProvider theme={defaultTheme}>
				<MaterialTable title={title} columns={columns} data={data} actions={actions} />
			</ThemeProvider>
		</div>
	);
};

export default DataTable;
