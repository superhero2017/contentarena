import React from "react";
import DatePicker from "@components/DatePicker";
import { SERVER_DATE_TIME_FORMAT, DATE_FORMAT } from "@constants";
import moment from "moment";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

class ExpirationDateSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleStartDate = (date) => {
		this.props.updateContentValue("expiresAt", date.set({
			hour: 23,
			minute: 59,
		})
			.format(SERVER_DATE_TIME_FORMAT));
	};

	render() {
		const { expiresAt, validation } = this.props;
		const isInvalid = !expiresAt && validation;
		const currentDate = (expiresAt) ? moment(expiresAt) : undefined;

		return (
			<div className="base-input">
				<label>
					{this.context.t("CL_STEP4_TITLE_EXPIRY")}
				</label>
				<DatePicker
					className={`date-picker ${isInvalid ? "is-invalid" : ""}`}
					selected={currentDate}
					onChange={this.handleStartDate}
					minDate={moment()}
					fixedHeight
					dateFormat={DATE_FORMAT}
					placeholderText={DATE_FORMAT.toLowerCase()}
				/>
				{isInvalid && (
					<span className="is-invalid" style={{ marginLeft: 15 }}>
						{this.context.t("LISTING_EXPIRY_EMPTY")}
					</span>
				)}
			</div>
		);
	}
}

ExpirationDateSelector.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	...state.content,
	validation: state.validation,
});

const mapDispatchToProps = dispatch => ({
	updateContentValue: (key, value) => dispatch({
		type: "UPDATE_CONTENT_VALUE",
		key,
		value,
	}),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ExpirationDateSelector);
