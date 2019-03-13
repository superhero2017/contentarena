import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { LISTING_SORT_OPTIONS } from "@constants";
import Translate from "@components/Translator/Translate";

class ListingSorting extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	getTranslatedLabels = () => ({
		[LISTING_SORT_OPTIONS.UPCOMING_EVENT]: <Translate i18nKey="MARKETPLACE_UPCOMING" />,
		[LISTING_SORT_OPTIONS.EXPIRY_DATE]: <Translate i18nKey="MARKETPLACE_EXPIRY" />,
		[LISTING_SORT_OPTIONS.PUBLISH_DATE]: <Translate i18nKey="MARKETPLACE_PUBLISH" />,
		[LISTING_SORT_OPTIONS.RELEVANCE]: <Translate i18nKey="MARKETPLACE_RELEVANCE" />,
	});

	render() {
		const sortOptions = Object.keys(LISTING_SORT_OPTIONS).map(key => LISTING_SORT_OPTIONS[key]);
		const labels = this.getTranslatedLabels();

		return (
			<div className="sort-by-wrapper">
				<span className="sort-by-title">Sort By</span>

				{sortOptions.map((sortItem, i) => (
					<Fragment key={i}>
						<input
							className="ca-radio"
							id={sortItem}
							type="radio"
							onChange={(e) => {
								this.props.onSelect(sortItem);
							}}
							checked={sortItem === this.props.sortBy}
						/>
						<label htmlFor={sortItem}>{labels[sortItem]}</label>
					</Fragment>
				))}
			</div>
		);
	}
}

ListingSorting.contextTypes = {
	t: PropTypes.func.isRequired,
};

ListingSorting.propTypes = {
	sortBy: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
};
ListingSorting.defaultProps = {};

export default ListingSorting;
