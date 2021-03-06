import React from "react";
import { editedProgramSelected } from "../../main/actions/utils";
import { PropTypes } from "prop-types";
import moment from "moment";
import {
	tournamentIcon,
	sportIcon,
	sportCategoryIcon,
	seasonReleaseIcon,
	fixturesEpisodeIcon,
} from "../../main/components/Icons";
import { getSeasonDateString } from "../../common/utils/listing";

import { DATE_FORMAT } from "@constants";

class ContentListingEventDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const { setRawContent } = this.props;

		if (setRawContent) setRawContent(this.getRawEventDetails());
	}

	componentDidUpdate() {
		const { setRawContent } = this.props;

		if (setRawContent) setRawContent(this.getRawEventDetails());
	}

	getRawEventDetails = () => {
		let rawContent = "";
		let content = [];
		const order = [
			"EVENT_SPORT",
			"EVENT_CATEGORY_COUNTRY",
			"EVENT_TOURNAMENT",
			"EVENT_SEASON_RELEASE",
			"EVENT_FIXTURES_EPISODES",
		];

		jQuery(".listing-attributes .event-text").each(function () {
			const title = $(this).attr("title");
			const text = $(this).text();
			const detail = {
				title,
				text,
			};

			content.push(detail);
		});

		content = content.concat().sort((a, b) => order.indexOf(a.title) - order.indexOf(b.title));

		content.forEach((el) => {
			if (el.title === "EVENT_FIXTURES_EPISODES") {
				rawContent += `${el.text}\n`;
			} else {
				rawContent += `${el.title}: ${el.text}\n`;
			}
		});

		return rawContent;
	}

	buildSeasonString = (season) => {
		const { showSeasonDuration } = this.props;

		return (showSeasonDuration && season.customStartDate && season.customEndDate)
			? `(${moment(season.customStartDate).format(DATE_FORMAT)} - ${moment(season.customEndDate).format(DATE_FORMAT)})`
			: "";
	};

	buildSeasonYear = (season) => {
		if (season.from !== undefined
			&& (season.to === undefined || season.to === "" || season.to === 0 || season.to === "Not applicable" || season.from === season.to)
		) {
			return season.from;
		}

		return season.year;
	};

	getFixtures = () => {
		const { seasons } = this.props;

		let fixtures = [];

		seasons.forEach((s) => {
			if (s.fixtures) {
				s.fixtures = s.fixtures.filter(fixture => fixture.name !== "");
				fixtures = [...fixtures, ...s.fixtures];
			}
		});

		return fixtures;
	};

	getSchedules = () => {
		const { seasons, schedulesBySeason } = this.props;
		const schedules = {
			rounds: [],
			matches: [],
		};
		seasons.forEach((s) => {
			if (s.schedules) {
				Object.entries(s.schedules).forEach((sh) => {
					if (sh[1].selected && schedules.rounds.indexOf(sh[0]) === -1) {
						schedules.rounds.push(sh[0]);
						sh[1].matches.forEach((m) => {
							if (m.selected) schedules.matches.push(m);
						});
					}
				});
			}
		});

		if (schedulesBySeason) {
			schedulesBySeason.forEach((s) => {
				if (s && Object.entries(s)) {
					Object.entries(s).forEach((sh) => {
						if (schedules.rounds.indexOf(sh[0]) === -1) {
							schedules.rounds.push(sh[0]);
							sh[1].matches.forEach((m) => {
								if (m.selected) schedules.matches.push(m);
							});
						}
					});
				}
			});
		}

		return schedules;
	};

	showProgramInfo = () => {
		const { rightsPackage, PROGRAM_NAME } = this.props;
		let show = false;

		if (rightsPackage.length > 1) return show;
		show = editedProgramSelected(rightsPackage);
		return show && PROGRAM_NAME;
	};

	getSeasonsYears = (seasons) => {
		if (!seasons || seasons.length === 0) {
			return [];
		}
		seasons.forEach((s) => {
			if (!s.to && !s.from && s.year) {
				const processedYears = s.year.split("/");
				s.from = processedYears.length === 1 ? processedYears[0] : 2000 + Number(processedYears[0]);
				s.to = processedYears.length === 1 ? false : 2000 + Number(processedYears[1]);
			}

			if (s.from) {
				if (!s.to || s.to === "Not applicable") {
					s.to = s.from;
					s.year = s.from;
				} else {
					s.year = `${s.from}/${s.to.toString().slice(-2)}`;
				}
			}
		});
		seasons = seasons.sort((a, b) => a.from - b.from);

		return seasons;
	};

	render() {
		const {
			sports,
			sportCategory,
			customTournament,
			customCategory,
			tournament,
			seasons,
			showFullSeasons,
			PROGRAM_YEAR,
			PROGRAM_EPISODES,
			setRawContent,
		} = this.props;

		const schedules = this.getSchedules();
		const episodesText = (PROGRAM_EPISODES > 1) ? "episodes" : "episode";
		const seasonsArray = this.getSeasonsYears(seasons);
		const seasonsWithYear = seasons.filter(season => (
			season.year !== undefined
			|| (season.customEndDate !== undefined && season.customStartDate !== undefined)
		));
		const tournamentArray = tournament ? Array.isArray(tournament) ? tournament : [tournament] : [];

		return (
			<div className="listing-attributes col">

				<div className="listing-item tournament">
					{/* Tournament name */}
					{tournamentArray && tournamentArray.length > 0 && tournamentArray[0].name !== "" && (
						<div className="event">
							<div className="event-icon">
								{tournamentIcon}
							</div>
							<div className="event-text" title={this.context.t("EVENT_TOURNAMENT")}>
								{tournamentArray[0].name}
							</div>
						</div>
					)}
					{customTournament && tournamentArray.length > 0 && tournamentArray[0].name === "" && (
						<div className="event">
							<div className="event-icon">
								{tournamentIcon}
							</div>
							<div className="event-text" title={this.context.t("EVENT_TOURNAMENT")}>
								{customTournament}
							</div>
						</div>
					)}
					{tournamentArray && tournamentArray.length === 0 && !customTournament && (
						<div className="event">
							<div className="event-icon">
								{tournamentIcon}
							</div>
							<div className="event-text" title={this.context.t("EVENT_TOURNAMENT")}>
								{this.context.t("LISTING_DETAILS_GENERAL_CONTENT")}
							</div>
						</div>
					)}
				</div>

				<div className="listing-item">
					{/* Sport name */}
					{sports && sports.length === 1 && (
						<div className="event">
							<div className="event-icon">
								{sportIcon}
							</div>
							<div className="event-text" title={this.context.t("EVENT_SPORT")}>
								{sports[0].name !== "" && sports[0].name}
								{sports[0].name === "" && sports[0].value !== "" && sports[0].value}
							</div>
						</div>
					)}
					{sports && sports.length > 1 && (
						<div className="event">
							<div className="event-icon">
								{sportIcon}
							</div>
							<div className="event-text" title={this.context.t("EVENT_SPORT")}>
								{this.context.t("LISTING_DETAILS_MULTIPLE_SPORTS")}
							</div>
						</div>
					)}

					{/* Sport category/Country */}
					{sportCategory && sportCategory.length > 0 && (
						<React.Fragment>
							{sportCategory[0].name !== "" && (
								<div className="event">
									<div className="event-icon">
										{sportCategoryIcon}
									</div>
									<div className="event-text" title={this.context.t("EVENT_CATEGORY_COUNTRY")}>
										{sportCategory[0].name}
									</div>
								</div>
							)}
							{sportCategory[0].name === "" && customCategory && (
								<div className="event">
									<div className="event-icon">
										{sportCategoryIcon}
									</div>
									<div className="event-text" title={this.context.t("EVENT_CATEGORY_COUNTRY")}>
										{customCategory}
									</div>
								</div>
							)}
						</React.Fragment>
					)}

				</div>

				<div className="listing-item">
					{/* Season/Release */}
					{seasonsArray.length > 0 && seasonsWithYear.length > 0 && (
						<div className="event">
							<div className="event-icon">
								{seasonReleaseIcon}
							</div>
							<div className="event-text" title={this.context.t("EVENT_SEASON_RELEASE")}>

								{seasons.map((season, i, list) => (
									<span key={i}>
										{getSeasonDateString(season, !showFullSeasons)}
										{!showFullSeasons && i < list.length - 1 && ","}
									</span>
								))}
							</div>
						</div>
					)}

					{this.showProgramInfo() && PROGRAM_YEAR && (
						<div className="event">
							<div className="event-icon">
								{seasonReleaseIcon}
							</div>
							<div className="event-text" title={this.context.t("EVENT_SEASON_RELEASE")}>
								Release year:
								{" "}
								{PROGRAM_YEAR === "Year" && "Not available"}
								{" "}
								{PROGRAM_YEAR !== "Year" && PROGRAM_YEAR}
							</div>
						</div>
					)}

					{/* Event time */}
					{/* <span>{eventTimeIcon} todo: event time</span> */}

					{/* Fixtures/Episodes */}
					{!this.showProgramInfo() && this.getFixtures().length > 1 && (
						<div className="event">
							<div className="event-icon">
								{fixturesEpisodeIcon}
							</div>
							{setRawContent ? (
								<div className="event-text" title={this.context.t("EVENT_FIXTURES_EPISODES")}>
									{this.getFixtures().map((f, i) => (
										<React.Fragment key={i}>
											{f.name}
											{" "}
											{f.date !== undefined && `(${moment(f.date).format(DATE_FORMAT)})`}
											{"\n"}
										</React.Fragment>
									))}
								</div>
							) : (
								<div className="event-text" title={this.context.t("EVENT_FIXTURES_EPISODES")}>
									{this.getFixtures().length}
									{" "}
									fixtures


								</div>
							)}
						</div>
					)}
					{!this.showProgramInfo() && this.getFixtures().length === 1 && this.getFixtures()[0].name && (
						<div className="event">
							<div className="event-icon">
								{fixturesEpisodeIcon}
							</div>
							<div className="event-text" title={this.context.t("EVENT_FIXTURES_EPISODES")}>
								{this.getFixtures()[0].name}
								{" "}
								{this.getFixtures()[0].date !== undefined && `(${moment(this.getFixtures()[0].date).format(DATE_FORMAT)})`}
							</div>
						</div>
					)}
					{this.showProgramInfo() && PROGRAM_EPISODES && (
						<div className="event">
							<div className="event-icon">
								{fixturesEpisodeIcon}
							</div>
							<div className="event-icon" title={this.context.t("EVENT_FIXTURES_EPISODES")}>
								{PROGRAM_EPISODES}
								{" "}
								{episodesText}
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

ContentListingEventDetails.contextTypes = {
	t: PropTypes.func.isRequired,
};


export default ContentListingEventDetails;
