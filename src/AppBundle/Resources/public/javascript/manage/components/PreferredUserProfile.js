import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

class PreferredUserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: props.profile || "BOTH",
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.profile === nextProps.profile) return;

		this.setState({
			profile: nextProps.profile,
		});
	}

	handleRadioChange = (profile) => {
		const { onChange } = this.props;
		this.setState({ profile });
		if (onChange) onChange(profile);
	};

	render() {
		const { centered, style = {} } = this.props;
		const { profile } = this.state;

		return (
			<React.Fragment>
				<div className={cn("preferences-title", { "justify-content-center": centered })}>
					{this.context.t("PREFERENCES_PROFILE_TITLE")}
				</div>
				<div className="subtitle">
					{this.context.t("PREFERENCES_PROFILE_SUBTITLE")}
				</div>
				<div className={cn("row", { "justify-content-center": centered })} style={style}>
					<div className={cn({
						"row-content d-flex align-items-center": true,
						"justify-content-center": centered,
					})}
					>
						<div
							className={cn({ "font-weight-bold": profile === "BUYER" })}
							style={{ marginRight: 20 }}
						>
							<input
								className="ca-radio"
								type="radio"
								value="BUYER"
								onChange={() => {
									this.handleRadioChange("BUYER");
								}}
								checked={profile === "BUYER"}
								style={{ marginRight: 5, width: 20, padding: 0 }}
							/>
							{this.context.t("PREFERENCES_TERRITORIES_PROFILE_BUYER")}
						</div>
						<div className={cn({ "font-weight-bold": profile === "SELLER" })} style={{ marginRight: 20 }}>
							<input
								className="ca-radio"
								type="radio"
								value="SELLER"
								onChange={() => {
									this.handleRadioChange("SELLER");
								}}
								checked={profile === "SELLER"}
								style={{ marginRight: 5, width: 20, padding: 0 }}
							/>
							{this.context.t("PREFERENCES_TERRITORIES_PROFILE_SELLER")}
						</div>
						<div className={cn({ "font-weight-bold": profile === "BOTH" })}>
							<input
								className="ca-radio"
								type="radio"
								value="BOTH"
								onChange={() => {
									this.handleRadioChange("BOTH");
								}}
								checked={profile === "BOTH"}
								style={{ marginRight: 5, width: 20, padding: 0 }}
							/>
							{this.context.t("PREFERENCES_TERRITORIES_PROFILE_BOTH")}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

PreferredUserProfile.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default PreferredUserProfile;
