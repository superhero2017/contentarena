import React from "react";
import Textarea from "react-textarea-autosize";
import { PropTypes } from "prop-types";
import Round from "./Round";
import StaticRound from "./StaticRound";

export const Description = ({
	value, onChange, title = "Enter a description", placeholder = "Provide a short description of your content listing",
}) => (
	<div className="textarea-input">
		<label>{title}</label>
		<textarea onChange={onChange} value={value} placeholder={placeholder} />
	</div>
);

export const RepresentationTextArea = ({ value = "" }) => (
	<Textarea
		value={value}
		readOnly
		className="representation-textarea"
	/>
);

export const TitleBar = ({ title, subtitle, infoText }) => (
	<div className="title-bar">
		<hr />
		<div className="title">{title}</div>
		<div className="subtitle">{subtitle}</div>
		{infoText && (
			<i className="fa fa-info-circle tooltip-icon" title={infoText} />
		)}
	</div>
);

export const SummaryText = ({ name }) => <span className="summary-text">{name}</span>;

export const NewCategory = ({
	onClick, showClose, onBlur, value,
}) => (
	<div className="base-input">
		<label>Country/Category</label>
		<input
			className="new-category"
			type="text"
			placeholder="Enter Country/Category"
			onBlur={onBlur}
			defaultValue={value}
		/>
		{showClose && <button onClick={onClick} className="standard-button"><i className="fa fa-close" /></button>}
	</div>
);

export const NewTournament = ({
	onClick, showClose, onBlur, value,
}) => (
	<div className="base-input">
		<label>Competition</label>
		<input
			className="new-category"
			type="text"
			onBlur={onBlur}
			defaultValue={value}
			placeholder="Enter competition name"
		/>
		{showClose && <button onClick={onClick} className="standard-button"><i className="fa fa-close" /></button>}
	</div>
);

export const Schedules = ({ season, seasons }) => (
	<div className="schedule">
		{seasons && seasons[season] && seasons[season].schedules && Object.keys(seasons[season].schedules).map((number, i) => <Round seasons={seasons} key={i} round={number} season={season} />)}
	</div>
);


export const StaticSchedules = ({ season, seasons }) => (
	<div className="schedule">
		{seasons && seasons[season] && seasons[season].schedules && Object.keys(seasons[season].schedules).map((number, i) => <StaticRound seasons={seasons} key={i} round={number} season={season} />)}
	</div>
);


export class SportSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handle = (e) => {
		const { onUpdateNew } = this.props;

		if (onUpdateNew) onUpdateNew(e.target.value);
	};

	render() {
		const {
			sports, index, value, isInvalid,
		} = this.props;

		return (
			<div className="base-container">
				<div className="base-input">
					<label>
						{this.context.t("CL_STEP1_LABEL_SPORT")}
					</label>
					{
						!this.props.isCustom
						&& (
							<input
								type="text"
								value={value}
								readOnly
								onClick={this.props.onClick}
								placeholder={isInvalid ? this.context.t("SPORT_EMPTY") : "e.g. Soccer"}
								className={isInvalid ? "is-invalid" : ""}
							/>
						)
					}

					{
						this.props.isCustom
						&& (
							<input
								className="new-sport"
								type="text"
								value={sports[index].value}
								onChange={this.handle}
								placeholder="Enter sport"
							/>
						)
					}

					{(this.props.isCustom || this.props.showClose)
					&& (
						<button className="standard-button" onClick={this.props.remove}>
							<i className="fa fa-close" />
						</button>
					)
					}
				</div>
				{this.props.showAddNew && (
					<button
						style={{ marginBottom: "20px", marginLeft: "auto" }}
						className="standard-button link-button"
						onClick={this.props.addSportSelector}
					>
						{this.context.t("CL_STEP1_SELECTOR_ADD_SPORT")}
					</button>
				)}
			</div>
		);
	}
}

SportSelector.contextTypes = {
	t: PropTypes.func.isRequired,
};
