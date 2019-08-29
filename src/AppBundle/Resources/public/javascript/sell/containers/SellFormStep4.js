import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Prompt } from "react-router-dom";
import Translate from "@components/Translator/Translate";
import FileSelector from "../../main/components/FileSelector";
import SalesPackageForm from "../components/SalesPackageForm";
import SalesPackageEdit from "../components/SalesPackageEdit";
import ExpirationDateSelector from "../components/ExpirationDateSelector";
import JurisdictionSelector from "../components/JurisdictionSelector";
import CompanyInformation from "../components/CompanyInformation";
import { SummaryText, TitleBar } from "../components/SellFormItems";
import ApplicableLaw from "../components/ApplicableLaw";
import CurrencySelector from "../components/CurrencySelector";
import RightsLegend from "../../main/components/RightsLegend";
import RightsList from "../../main/components/RightsList";
import { listingEdited, updateStep } from "../actions/contentActions";
import ProductionStandardsDefinitions from "../components/ProductionStandardsDefinitions";

class SellFormStep4 extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "Step 4",
			name: "",
			salesPackages: [],
		};
	}

	componentDidMount() {
		window.addEventListener("beforeunload", this.beforeunload);
	}

	componentWillUnmount() {
		window.removeEventListener("beforeunload", this.beforeunload);
	}

	componentWillReceiveProps(nextProps, context) {
		if (nextProps.step === 4 && this.props.step !== 4) this.props.updateStep(4);
	}

	beforeunload = (e) => {
		if (this.props.edited) {
			e.preventDefault();
			e.returnValue = true;
		}
	};

	selectCurrency = (currency) => {
		this.props.listingEdited();
		this.props.updateContentValue("currency", currency);
	};

	editSalesPackage = (index) => {
		this.setState({
			salesPackageToEdit: index,
			editOpen: true,
		});
	};

	addSalesPackage = (salesPackages) => {
		const { currency } = this.props;
		salesPackages.forEach((sp) => {
			sp.currency = { code: currency };
			return sp;
		});
		this.props.listingEdited();
		this.props.addSalesPackages(salesPackages);
	};

	updateSalesPackage = (salesPackage, index) => {
		this.props.listingEdited();
		this.props.updateSalesPackages("save", salesPackage, index);
	};

	removeSalesPackage = (index) => {
		this.props.listingEdited();
		this.props.updateSalesPackages("remove", null, index);
	};

	removeAllSalesPackage = () => {
		this.props.listingEdited();
		this.props.updateSalesPackages("removeAll");
	};

	/**
	 *
	 * @returns {boolean}
	 */
	exclusivity = () => {
		const { rightsPackage } = this.props;
		return rightsPackage.filter(rp => rp.exclusive).length > 0;
	};

	addFile = (response) => {
		const { annex } = this.props;
		const index = annex.length;
		this.props.listingEdited();
		this.props.updateAnnex("save", index, { file: response.file, name: response.name });
	};

	removeFile = (index) => {
		this.props.listingEdited();
		this.props.updateAnnex("remove", index, null);
	};

	render() {
		const {
			step,
			annex,
			salesPackages,
			currency,
			sports,
			sportCategory,
			tournament,
			seasons,
			edited,
			PROGRAM_NAME,
		} = this.props;

		if (step !== 4) return (null);
		return (

			<div className="step-content step-4">

				<Prompt
					when={edited}
					message="Are you sure you want to leave? Changes you made may not be saved."
				/>

				{(sports.length || sportCategory.length || tournament.length || seasons.length) && (
					<div className="listing-summary">
						<div>
							<SummaryText {...this.props} />
							<RightsList rightsPackage={this.props.rightsPackage} name={PROGRAM_NAME} />
						</div>
						<div>
							<RightsLegend />
						</div>
					</div>
				)}
				<CurrencySelector onClick={this.selectCurrency} selected={currency} />
				<div className="step-content-container">
					<SalesPackageForm
						currency={currency}
						exclusivity={this.exclusivity()}
						salesPackages={salesPackages}
						onAdd={this.addSalesPackage}
						onUpdate={this.updateSalesPackage}
						onRemove={this.removeSalesPackage}
						onEdit={this.editSalesPackage}
						onRemoveAll={this.removeAllSalesPackage}
						selectCurrency={this.selectCurrency}
					/>

					{this.state.editOpen && (
						<SalesPackageEdit
							isOpen={this.state.editOpen}
							onClose={() => {
								this.setState({
									editOpen: false,
								});
							}}
							currency={currency}
							exclusivity={this.exclusivity()}
							onUpdate={this.updateSalesPackage}
							salesPackageId={this.state.salesPackageToEdit}
							salesPackages={salesPackages}
						/>
					)}

					<TitleBar title="CL_STEP4_TITLE_INFO" />

					<CompanyInformation />

					<ApplicableLaw />

					<JurisdictionSelector />

					<TitleBar title="CL_STEP4_ANNEX_INFO" />
					<div>
						<Translate i18nKey="CL_STEP4_LABEL_ANNEX_DESCRIPTION" />
					</div>

					<FileSelector
						label={<Translate i18nKey="CL_STEP4_LABEL_ANNEX" />}
						target="annex"
						selected={annex}
						onSelect={this.addFile}
						onRemove={this.removeFile}
						accept={[".pdf"]}
						acceptType={[
							"application/pdf",
						]}
						tmp
					/>

					<div className="row">
						<ExpirationDateSelector />
						<div className="clearfix" />
					</div>
				</div>
			</div>
		);
	}
}

SellFormStep4.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.content;

const mapDispatchToProps = dispatch => ({
	updateStep: step => dispatch(updateStep(step)),
	listingEdited: () => dispatch(listingEdited()),
	updateContentValue: (key, value) => dispatch({
		type: "UPDATE_CONTENT_VALUE",
		key,
		value,
	}),
	updateSalesPackages: (name, salesPackage, index) => dispatch({
		type: "UPDATE_SALES_PACKAGES",
		index,
		salesPackage,
		name,
	}),
	addSalesPackages: salesPackages => dispatch({
		type: "ADD_SALES_PACKAGES",
		salesPackages,
	}),
	updateAnnex: (name, index, value) => dispatch({
		type: "UPDATE_ANNEX",
		name,
		index,
		value,
	}),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SellFormStep4);
