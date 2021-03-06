import React from "react";
import { goTo } from "../actions/utils";

const PublicHeaderBar = () => (
	<div className="manager-header" style={{ marginBottom: 0 }}>
		<div className="logo" onClick={() => goTo("")} style={{ margin: "0 auto" }}>
			<img src={`${assetsBaseDir}app/images/logo.svg`} alt="" />
		</div>
	</div>
);

export default PublicHeaderBar;
