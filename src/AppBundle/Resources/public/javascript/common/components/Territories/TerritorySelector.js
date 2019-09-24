import React from "react";
import { connect } from "react-redux";
import Translate from "@components/Translator/Translate";
import { BUNDLE_TERRITORIES_METHOD } from "@constants";
import RegionSelector from "@components/Territories/RegionSelector";
import CountrySelector from "@components/Territories/CountrySelector";
import {
	getCountryData, listHas, listRemove, sortByName,
} from "../../../cms/helpers/PropertyDetailsHelper";

class TerritorySelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countryData: getCountryData(props.countries),
			selectedRegions: [],
			selectedTerritories: [],
			selectedCountries: [],
		};
	}

	onSelectRegion = (region) => {
		let { selectedRegions } = this.state;

		if (listHas(selectedRegions, region)) {
			selectedRegions = listRemove(selectedRegions, region);
		} else {
			selectedRegions.push(region);
		}

		this.setState({ selectedRegions }, () => {
			// this.props.onSelect(this.getCountriesFromSelectedRegions());
		});
	};

	onSelectTerritory = (territory) => {
		let { selectedTerritories } = this.state;

		if (listHas(selectedTerritories, territory)) {
			selectedTerritories = listRemove(selectedTerritories, territory);
		} else {
			selectedTerritories.push(territory);
		}

		this.setState({ selectedTerritories }, () => {
			// this.props.onSelect(this.getCountriesFromSelectedRegions());
		});
	};

	onSelectCountry = (country) => {
		let { selectedCountries } = this.state;

		if (listHas(selectedCountries, country)) {
			selectedCountries = listRemove(selectedCountries, country);
		} else {
			selectedCountries.push(country);
			selectedCountries.sort(sortByName);
		}

		this.setState({ selectedCountries }, () => {
			// this.props.onSelect(this.getCountriesFromSelectedRegions());
		});
	};

	getCountriesFromSelectedRegions = () => {
		const { selectedRegions, selectedTerritories } = this.state;
		const { availableCountries } = this.props;

		const regions = selectedRegions.map(region => region.id);
		const territories = selectedTerritories.map(territory => territory.id);

		return availableCountries.filter(country => country.regions.filter(region => regions.indexOf(region.id) !== -1).length
				|| country.territories.filter(territory => territories.indexOf(territory.id) !== -1).length);
	};

	render() {
		const {
			territories,
			regions,
			availableCountries,
			style,
		} = this.props;

		const {
			territoriesMode,
			selectedRegions,
			selectedTerritories,
			selectedCountries,
			countryData,
		} = this.state;

		const availableCountryData = getCountryData(availableCountries);
		const availableCountriesFromSelectedRegions = this.getCountriesFromSelectedRegions();
		const selectorCountries = (selectedRegions.length > 0 || selectedTerritories.length > 0)
			? availableCountriesFromSelectedRegions : availableCountries;

		return (
			<div className="territory-selector" style={style}>

				<div className="territory-selector-box">

					<RegionSelector
						countryData={countryData.territories}
						availableCountryData={availableCountryData.territories}
						regions={territories}
						worldwide
						selectedRegions={selectedTerritories}
						onSelect={this.onSelectTerritory}
						title={<Translate i18nKey="TERRITORY_SELECTOR_TITLE_CONTINENTS" />}
					/>

					<RegionSelector
						countryData={countryData.regions}
						availableCountryData={availableCountryData.regions}
						regions={regions}
						selectedRegions={selectedRegions}
						onSelect={this.onSelectRegion}
						title={<Translate i18nKey="TERRITORY_SELECTOR_TITLE_REGIONS" />}
					/>

					<CountrySelector
						availableCountries={selectorCountries}
						selectedCountries={selectedCountries}
						onSelect={this.onSelectCountry}
						onSelectAll={countries => this.setState({ selectedCountries: countries })}
						title={<Translate i18nKey="TERRITORY_SELECTOR_TITLE_COUNTRIES" />}
					/>

				</div>

				<div className="territory-selector-box flex-direction-column">

					<div className="territory-selector-selected-header">
						<h5>
							<Translate i18nKey="TERRITORY_SELECTOR_SELECTED_TITLE" />
						</h5>
						<a className="" onClick={() => this.setState({ selectedCountries: [] })}>
							<Translate i18nKey="TERRITORY_SELECTOR_CLEAR" />
						</a>
					</div>

					<div className="territory-selector-selected">
						{selectedCountries.map(country => (
							<span onClick={() => this.onSelectCountry(country)}>
								{country.name}<i className="icon-remove" />
							</span>
						))}
					</div>

				</div>

			</div>
		);
	}
}


const mapStateToProps = state => ({
	territories: state.property.territories,
	countries: state.property.countries,
	regions: state.property.regions,
});

export default connect(mapStateToProps, null)(TerritorySelector);
