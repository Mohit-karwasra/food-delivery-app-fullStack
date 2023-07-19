import React from "react";

const Spinner = () => {
	return (
		<div className="relative">
			<div class="w-10 h-10 border-red-200 border-2 rounded-full"></div>
			<div class="w-10 h-10 border-red-500 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
		</div>
	);
};

export default Spinner;
