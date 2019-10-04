import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import cn from "classnames";
import ReactTooltip from "react-tooltip";
import Translate from "@components/Translator/Translate";
import Loader from "@components/Loader";
import { getTerritoriesFromRights } from "@utils/property";
import RightSelector from "@components/Right/RightSelector";
import AccordionContainer from "@components/Containers/AccordionContainer";
import { BUNDLE_TERRITORIES_METHOD, CMS_PROPERTY_TABS, ROUTE_PATHS } from "@constants";
import TerritorySelector from "@components/Territories/TerritorySelector";
import {
	getRightsString,
	getSeasonsYearString,
	sortSeasons,
	sortSeasonsOldToNew,
} from "../helpers/PropertyDetailsHelper";
import PropertyListingButtons from "../components/PropertyListingButtons";
import { updateListing } from "../../sell/actions/contentActions";
import { getListingName } from "../helpers/PropertyListingHelper";
import SeasonSelection from "./SeasonSelection";

class PropertyCreateListingStep1 extends React.Component {
	constructor(props) {
		super(props);

		let currentStep = 1;

		if (props.listing.customId) {
			currentStep = 4;
		}

		// currentStep = props.property.seasons && props.property.seasons.length === 0 ? 2 : 1;

		this.state = {
			seasons: props.listing.seasons,
			rights: [],
			territories: [],
			territoriesMode: BUNDLE_TERRITORIES_METHOD.SELECTED_TERRITORIES,
			currentStep,
		};

		this.seasonStep = React.createRef();
		this.rightsStep = React.createRef();
		this.territoriesStep = React.createRef();
	}

	componentWillReceiveProps(nextProps, nextContext) {
		const { listing: { seasons, customId } } = nextProps;

		this.setState({
			seasons,
		});
	}

	seasonsAreValid = () => {
		const { seasons } = this.state;
		return !!seasons.length;
	};

	rightsAreValid = () => {
		const { rights } = this.state;
		return !!rights.length && !rights.filter(right => right.exclusive === null).length;
	};

	territoriesAreValid = () => {
		const { territories } = this.state;
		return !!territories.length;
	};

	cancel = () => {
		const { history, property: { customId } } = this.props;
		history.push(`${ROUTE_PATHS.PROPERTIES}/${customId}/${CMS_PROPERTY_TABS.RIGHTS}`);
	};

	onSelectSeason = (seasons) => {
		this.setState({ seasons, currentStep: 1, rights: [] });
	};

	onExclusive = (right, exclusive) => {
		let { rights } = this.state;
		rights = rights.filter(element => element.id !== right.id);
		const newValue = Object.assign({}, right, { exclusive });
		rights.push(newValue);
		this.setState({
			rights,
			currentStep: 2,
		});
	};

	onSelectRight = (value) => {
		let { rights } = this.state;
		const selectedRight = rights.find(element => element.id === value.id);
		if (selectedRight) {
			rights = rights.filter(element => element.id !== value.id);
		} else {
			const newValue = Object.assign({}, value, { exclusive: null });
			rights.push(newValue);
		}
		this.setState({
			rights,
			currentStep: 2,
		});
	};

	onSelectTerritories = (territories, territoriesMode) => {
		console.log(territories);
		this.setState({
			territories,
			territoriesMode,
		});
	};

	onNext = (currentStep) => {
		this.setState({ currentStep });
	};

	updateListing = () => {
		const { seasons, rights } = this.state;
		const { property } = this.props;
		this.props.updateListing({
			seasons,
			rights,
			name: getListingName(property, seasons),
		});
		this.onNext(4);
	};

	render() {
		const {
			seasons,
			rights,
			territories,
			territoriesMode,
			currentStep,
		} = this.state;

		const {
			property: { seasons: availableSeasons, rights: availableRights },
			history,
		} = this.props;

		const seasonsValid = this.seasonsAreValid();
		const rightsValid = this.rightsAreValid();
		const territoriesValid = this.territoriesAreValid();
		const availableCountries = getTerritoriesFromRights(rights);
		const selectedSeasonsValue = getSeasonsYearString(seasons.sort(sortSeasonsOldToNew));
		const selectedRightsValue = getRightsString(rights);

		availableSeasons.sort(sortSeasons);
		seasons.sort(sortSeasons);

		return (
			<div className="property-create-tab">
				<AccordionContainer
					title={<Translate i18nKey="CMS_CREATE_LISTING_STEP1_TITLE" />}
					button={<Translate i18nKey="CMS_CREATE_LISTING_STEP1_BUTTON" />}
					disabled={!availableSeasons.length}
					enableNextStep={seasonsValid || !availableSeasons.length}
					onNext={() => {
						this.onNext(2);
						this.seasonStep.current.close();
						this.rightsStep.current.open();
					}}
					value={`(${selectedSeasonsValue})`}
					opened={currentStep === 1}
					ref={this.seasonStep}
				>
					<SeasonSelection
						availableSeasons={availableSeasons}
						selectedSeasons={seasons}
						onSelectSeason={this.onSelectSeason}
					/>

				</AccordionContainer>

				<AccordionContainer
					title={<Translate i18nKey="CMS_CREATE_LISTING_STEP2_TITLE" />}
					button={<Translate i18nKey="CMS_CREATE_LISTING_STEP2_BUTTON" />}
					disabled={currentStep < 2}
					enableNextStep={rightsValid}
					value={`(${selectedRightsValue})`}
					onNext={() => {
						this.onNext(3);
						this.rightsStep.current.close();
						this.territoriesStep.current.open();
					}}
					ref={this.rightsStep}
				>
					<RightSelector
						availableRights={availableRights}
						selectedRights={rights}
						onSelectRight={this.onSelectRight}
						onExclusive={this.onExclusive}
					/>
				</AccordionContainer>

				<AccordionContainer
					title={<Translate i18nKey="CMS_CREATE_LISTING_STEP3_TITLE" />}
					button={<Translate i18nKey="CMS_CREATE_LISTING_STEP3_BUTTON" />}
					disabled={currentStep < 3}
					enableNextStep={territoriesValid}
					onNext={() => this.updateListing()}
					ref={this.territoriesStep}
				>
					<TerritorySelector
						availableCountries={availableCountries.territories}
						selectedCountries={territories}
						onSelect={this.onSelectTerritories}
					/>
				</AccordionContainer>

				{currentStep > 3 && (
					<PropertyListingButtons history={history} />
				)}

			</div>
		);
	}
}

const mapStateToProps = state => ({
	property: state.propertyDetails.property,
	listing: state.content,
});

const mapDispatchToProps = dispatch => ({
	updateListing: listing => dispatch(updateListing(listing)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyCreateListingStep1);