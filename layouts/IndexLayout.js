import React from "react";
import TopNav from "../components/top-nav/top-nav";

function IndexLayout({children}) {
	return (
		<div>
			<TopNav />
			{children}
		</div>
	)
}

export default IndexLayout;