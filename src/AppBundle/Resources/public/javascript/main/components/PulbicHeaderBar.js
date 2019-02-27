import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { goTo } from "../actions/utils";
import HeaderNotifications from "./HeaderNotifications";

class PublicHeaderBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className="manager-header" style={{ marginBottom: 0 }}>
				<div className="logo" onClick={() => goTo("")} style={{ margin: "0 auto" }}>
					<img src={`${assetsBaseDir}app/images/logo.svg`} alt="" />
				</div>
			</div>
		);
	}
}

PublicHeaderBar.contextTypes = {
	t: PropTypes.func.isRequired,
};


export default PublicHeaderBar;
