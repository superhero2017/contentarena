import React from "react";
import PropTypes from "prop-types";
import CmsTabElement from "./CmsTabElement";

const CmsStepSelector = ({
	title, button, enableNextStep, onNext, children, disabled, style,
}) => (
	<CmsTabElement
		label={title}
		opened
		noBorder
		style={style}
	>
		{children}
		{button && !disabled && (
			<button className="ca-btn primary" disabled={!enableNextStep} onClick={onNext}>
				{button}
			</button>
		)}
	</CmsTabElement>
);

CmsStepSelector.contextTypes = {
	t: PropTypes.func.isRequired,
};

CmsStepSelector.propTypes = {
	title: PropTypes.node.isRequired,
	button: PropTypes.node,
	enableNextStep: PropTypes.bool.isRequired,
	onNext: PropTypes.func,
};

CmsStepSelector.defaultProps = {
	button: "",
	onNext: null,
};

export default CmsStepSelector;
