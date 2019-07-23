import React, { Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Select from "react-select";
import first from "lodash/first";
import Translate from "@components/Translator/Translate";
import EmptyCommercialOverview from "../components/EmptyScreens/EmptyCommercialOverview";
import RightsLegend from "../../main/components/RightsLegend";
import CommercialBidsTable from "../components/CommercialBidsTable";
import PopupCountrySelector from "../../main/components/PopupCountrySelector";
import CountrySelector from "../../main/components/CountrySelector";
import { cancelIcon } from "../../main/components/Icons";

class CmsCommercialOverview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listings: [],
			selectedListings: null,
			openBids: true,
			closedBids: true,
			declinedBids: false,
			countries: [],
			includeAllCountries: false,
		};
	}

	componentDidMount() {
		const { property: { listings } } = this.props.propertyDetails;
		const { location: { search } } = this.props.history;
		if (search) {
			const params = search.replace("?", "").split("&");
			for (let i = 0; i < params.length; i++) {
				const key = params[i].split("=")[0];
				const values = params[i].split("=")[1].split(",");
				if (key === "customId") {
					const selectedItem = listings.find(element => values.indexOf(element.customId) !== -1);
					if (selectedItem) {
						const selectedListings = { value: selectedItem.customId, label: selectedItem.name };
						this.setState({
							selectedListings,
						});
					}
				}
				if (key === "country") {
					this.setState({ countries: values });
				}
				if (key === "include") {
					this.setState({ includeAllCountries: true });
				}
			}
		}
	}

	onSelectListing = (selectedItem) => {
		this.setState({ selectedListings: selectedItem });
		this.onApplyFilter();
	};

	onResetListingFilter = () => {
		const { location: { pathname } } = this.props.history;
		this.props.history.push(pathname);
		this.setState({ selectedListings: null });
	};

	toggleOpenBids = () => {
		this.setState(prevState => ({ openBids: !prevState.openBids }));
	};

	toggleClosedBids = () => {
		this.setState(prevState => ({ closedBids: !prevState.closedBids }));
	};

	toggleDeclinedBids = () => {
		this.setState(prevState => ({ declinedBids: !prevState.declinedBids }));
	};

	selectTerritory = (selectedCountry) => {
		selectedCountry = first(selectedCountry) ? selectedCountry : [];
		const countries = selectedCountry.map(c => c.value);
		this.setState({ countries });
		this.onApplyFilter();
	};

	updateIncludedCountries = (includeAllCountries) => {
		this.setState({ includeAllCountries });
		this.onApplyFilter();
	};

	onApplyFilter = () => {
		setTimeout(() => {
			const { selectedListings, countries, includeAllCountries } = this.state;
			const { location: { pathname } } = this.props.history;
			let search = [];
			if (selectedListings) {
				search.push(`customId=${selectedListings.value}`);
			}
			if (countries.length) {
				search.push(`country=${countries.join(",")}`);
			}
			if (includeAllCountries) {
				search.push("include=true");
			}
			if (search.length) {
				search = `?${search.join("&")}`;
			}
			this.props.history.push(`${pathname}${search}`);
		}, 1);
	};

	render() {
		const { history, propertyId, propertyDetails: { property: { listings } } } = this.props;
		const {
			selectedListings,
			openBids,
			closedBids,
			declinedBids,
		} = this.state;

		if (!listings.length) {
			return (
				<section className="commercial-overview-tab">
					<EmptyCommercialOverview history={history} propertyId={propertyId} />
				</section>
			);
		}

		const {
			countries,
			includeAllCountries,
		} = this.state;

		const countriesValue = first(countries) ? {
			label: first(countries),
			value: first(countries),
		} : "";

		const isWorldWideCountriesSelected = countries.length === this.worldwideCountries;
		const isMoreThanOneSelected = countries.length > 1 && countries.length !== this.worldwideCountries;
		const countriesInputValueObj = {
			isShown: isWorldWideCountriesSelected || isMoreThanOneSelected,
			value: isMoreThanOneSelected ? `${countries.length} territories`
				: isWorldWideCountriesSelected ? "Worldwide" : "",
			isDisabled: isMoreThanOneSelected && !isWorldWideCountriesSelected,
			isReadonly: isWorldWideCountriesSelected,
		};

		let allListings = listings;
		if (selectedListings) {
			allListings = allListings.filter(list => selectedListings.value === list.customId);
		}

		let openBidsList = [].concat.apply(
			[],
			allListings.map(list => [].concat.apply(
				[],
				list.bids.filter(b => b.status.name === "PENDING")
					.map(b => Object.assign({}, { list }, b)),
			)),
		);
		let closedBidsList = [].concat.apply(
			[],
			allListings.map(list => [].concat.apply(
				[],
				list.bids.filter(b => b.status.name === "APPROVED")
					.map(b => Object.assign({}, { list }, b)),
			)),
		);
		let declinedBidsList = [].concat.apply(
			[],
			allListings.map(list => [].concat.apply(
				[],
				list.bids.filter(b => b.status.name === "REJECTED")
					.map(b => Object.assign({}, { list }, b)),
			)),
		);

		if (countries.length) {
			openBidsList = openBidsList.filter((b) => {
				const territories = b.salesPackage.territories.filter(territory => countries.indexOf(territory.name) !== -1);
				return includeAllCountries && b.salesPackage.territories.length === territories.length || !includeAllCountries && territories.length;
			});
			closedBidsList = closedBidsList.filter((b) => {
				const territories = b.salesPackage.territories.filter(territory => countries.indexOf(territory.name) !== -1);
				return includeAllCountries && b.salesPackage.territories.length === territories.length || !includeAllCountries && territories.length;
			});
			declinedBidsList = declinedBidsList.filter((b) => {
				const territories = b.salesPackage.territories.filter(territory => countries.indexOf(territory.name) !== -1);
				return includeAllCountries && b.salesPackage.territories.length === territories.length || !includeAllCountries && territories.length;
			});
		}

		return (
			<section className="commercial-overview-tab">
				<div className="region-filter">
					<div className="d-flex">
						<div className="split-filter">
							<div className="region-filter-title">
								<div className="title-wrapper">
									{ <Translate i18nKey="CMS_PROPERTY_TAB_COMMERCIAL" />}
									<div className="subtitle">
										{ <Translate i18nKey="COMMERCIAL_ACTIVITY_FILTER_SUBTITLE" />}
									</div>
								</div>
							</div>

							<div className="manager-filter-container">
								<div className="listing-filter">
									<Select
										name="form-field-name"
										placeholder={this.context.t("COMMERCIAL_ACTIVITY_FILTER_SEARCH_PLACEHOLDER")}
										clearable={false}
										onChange={this.onSelectListing}
										multi={false}
										value={selectedListings}
										options={listings.map(b => ({ value: b.customId, label: b.name }))}
									/>
									<div className="reset-listing-filter" onClick={this.onResetListingFilter}>
										<span><Translate i18nKey="COMMERCIAL_ACTIVITY_FILTER_SEARCH_CLEAR" /></span>
									</div>
								</div>

								<div className="listing-filter territories-filter">
									{countriesInputValueObj.isShown ? (
										<Fragment>
											<input
												type="text"
												className="ca-form-control"
												value={countriesInputValueObj.value}
												disabled={countriesInputValueObj.isDisabled}
												readOnly={countriesInputValueObj.isReadonly}
											/>

											<img
												className="territories-icon"
												src={cancelIcon}
												onClick={() => {
													this.selectTerritory([]);
												}}
												alt=""
											/>

										</Fragment>
									) : (
										<CountrySelector
											multi={false}
											className="base-input-select"
											value={countriesValue}
											onChange={(c) => {
												this.selectTerritory([c]);
											}}
										/>
									)}

									<PopupCountrySelector
										ref="countrySelector"
										value={countries}
										includeAllCountries={includeAllCountries}
										onChangeRadio={(c) => {
											this.updateIncludedCountries(c);
										}}
										onSelect={this.selectTerritory}
									/>
								</div>
							</div>
						</div>
						<div className="split-filter">
							<div className="region-filter-title">
								{ <Translate i18nKey="CMS_RIGHT_LEGENDS_TITLE" />}
							</div>
							<RightsLegend isNew />
						</div>
					</div>
					<div className="region-filter-bids">
						<div className="region-filter-title toggle" onClick={openBidsList.length ? this.toggleOpenBids : null}>
							<div className="region-filter-title-text">
								<Translate i18nKey="COMMERCIAL_ACTIVITY_FILTER_OPEN_BIDS" />{ ` (${openBidsList.length})`}
							</div>
							<div className="region-filter-title-dropdown">
								<i className={`fa fa-angle-${openBids ? "down" : "up"}`} />
							</div>
						</div>
						<div className="region-filter-content">
							{openBidsList.length > 0 && openBids && <CommercialBidsTable listings={openBidsList} type="openBids" />}
						</div>
					</div>
					<div className="region-filter-bids">
						<div className="region-filter-title toggle" onClick={closedBidsList.length ? this.toggleClosedBids : null}>
							<div className="region-filter-title-text">
								<Translate i18nKey="COMMERCIAL_ACTIVITY_FILTER_CLOSED_DEALS" />{ ` (${closedBidsList.length})`}
							</div>
							<div className="region-filter-title-dropdown">
								<i className={`fa fa-angle-${closedBids ? "down" : "up"}`} />
							</div>
						</div>
						<div className="region-filter-content">
							{closedBidsList.length > 0 && closedBids && <CommercialBidsTable listings={closedBidsList} type="closedBids" />}
						</div>
					</div>
					<div className="region-filter-bids">
						<div className="region-filter-title toggle" onClick={declinedBidsList.length ? this.toggleDeclinedBids : null}>
							<div className="region-filter-title-text">
								<Translate i18nKey="COMMERCIAL_ACTIVITY_BID_STATUS_REJECTED" />{ ` (${declinedBidsList.length})`}
							</div>
							<div className="region-filter-title-dropdown">
								<i className={`fa fa-angle-${declinedBids ? "down" : "up"}`} />
							</div>
						</div>
						<div className="region-filter-content">
							{declinedBidsList.length > 0 && declinedBids && <CommercialBidsTable listings={declinedBidsList} type="declinedBids" />}
						</div>
					</div>
				</div>
			</section>
		);
	}
}

CmsCommercialOverview.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

export default connect(
	mapStateToProps,
	null,
)(CmsCommercialOverview);
