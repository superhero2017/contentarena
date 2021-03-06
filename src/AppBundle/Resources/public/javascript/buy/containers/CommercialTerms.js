import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Moment from "moment/moment";
import test from "../actions";
import TerritoriesSalesPackages from "./TerritoriesSalesPackages";
import { pdfIcon } from "../../main/components/Icons";
import { DATE_FORMAT, TIME_FORMAT } from "@constants";
import { getSeasonDateString } from "../../common/utils/listing";

class CommercialTerms extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			seasons: props.seasons,
		};
		this.baseDir = `${assetsBaseDir}../`;
		this.textArea = React.createRef();
	}

	componentDidMount() {
		this.loadSchedule();
		this.setTextAreaHeight();
	}

	setTextAreaHeight = () => {
		if (this.textArea.current) {
			this.textArea.current.style.height = `${this.textArea.current.scrollHeight}px`;
		}
	};

	loadSchedule() {
		const _this = this;
		const { seasons, schedulesBySeason } = this.props;

		seasons.forEach((season, index) => {
			if (!season.schedules && !season.custom) {
				_this.setState({ loadingSchedule: true });
				ContentArena.Api.getSchedule(season.externalId).done((schedules) => {
					_this.setState({ loadingSchedule: false });
					let keys = [];
					if (schedulesBySeason && schedulesBySeason[index]) {
						keys = Object.keys(schedulesBySeason[index]);
						keys.forEach((k) => {
							schedulesBySeason[index][k].matches.forEach((m) => {
								if (m.selected) {
									schedules[k].matches.get(m.externalId).selected = true;
								}
							});
							schedules[k].selected = true;
						});
					}

					const tempSeasons = _this.state.seasons;
					tempSeasons[index].schedules = schedules;
					if (keys.length > 0) tempSeasons[index].showchedules = true;

					_this.setState({
						seasons: tempSeasons,
					});
				});
			}
		});
	}

	render() {
		const {
			website,
			attachments,
			description,
			programDetails,
		} = this.props;

		const { seasons } = this.state;

		return (
			<div>
				{description && !programDetails && (
					<div className="description-wrapper">
						<div className="spacer-bottom title">
							{this.context.t("LISTING_DETAILS_EVENT_DESCRIPTION")}
						</div>
						<div className="txt description-text">
							<textarea
								readOnly
								ref={this.textArea}
								value={description}
								className="representation-textarea"
							/>
						</div>
					</div>
				)}

				{programDetails && programDetails}

				{(website || (attachments && attachments.length > 0)) && (
					<div className="additional-items">
						{website && (
							<div className="item">
								<i className="fa fa-link icon" />
								<div className="cap">
									{this.context.t("LISTING_DETAILS_EVENT_TITLE_WEBSITE")}
								</div>
								<div className="d-flex">
									<b>
										{website && website.map(website => (
											<a
												href={ContentArena.Utils.getWebsiteURl(website)}
												target="_blank"
												rel="noopener noreferrer"
											>
												{website}
											</a>
										))}
									</b>
								</div>
							</div>
						)}

						{attachments && attachments.length > 0 && (
							<div className="item">
								<i className="fa fa-folder-open-o icon" />
								<div className="cap">
									{this.context.t("LISTING_DETAILS_EVENT_TITLE_ATTACHMENTS")}
								</div>
								<div className="d-flex">
									<b>
										{attachments.map(a => (
											<div className="attachment-item">
												<a download={a.name} target="_blank" href={this.baseDir + a.file} rel="noopener noreferrer">
													<img src={pdfIcon} alt="" />
													{a.name}
												</a>
											</div>
										))}
									</b>
								</div>
							</div>
						)}
					</div>
				)}

				{/* SEASON/FIXTURES */}
				{seasons && seasons.length > 0 && (
					<>
						<div className="spacer-bottom title">
							{this.context.t("LISTING_DETAILS_EVENT_TITLE_SEASON")}
						</div>
						{seasons.map((season, key) => (
							<div key={`season-${key}`} className="season-details">
								<div className="season-cap">
									{/* {season.name} {" "} */}
									{season.customStartDate && season.customEndDate && (
										getSeasonDateString(season)
									)}
								</div>
								<div>
									{season.fixtures && season.fixtures.length > 0 && season.fixtures.map((fixture, i) => (
										<div className="row-container" style={{ width: "45%" }} key={i}>
											<div className="name">
												{fixture.name}
											</div>
											<div className="actions" style={{ minWidth: 230 }}>
												<div
													className="item"
													style={{
														width: "50%",
														marginLeft: 0,
													}}
												>
													<i className="fa fa-calendar icon" />
													{!fixture.date && "Date N/A"}
													{fixture.date && Moment(fixture.date)
														.format(DATE_FORMAT)}
												</div>
												<div
													className="item"
													style={{
														width: "50%",
														marginLeft: 0,
													}}
												>
													<i className="fa fa-clock-o icon" />
													{!fixture.date && "Time N/A"}
													{fixture.date && Moment(fixture.date)
														.format(`${TIME_FORMAT} [UTC]`)}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						))}
					</>
				)}

				<TerritoriesSalesPackages {...this.props} />
			</div>
		);
	}
}

CommercialTerms.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
	onClick: id => dispatch(test(id)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CommercialTerms);
