import React from "react";

class CmsNumberInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value || 0,
		};
	}

	increaseValue = () => {
		const { value } = this.state;
		this.setState({ value: Number(value) + 1 }, () => {
			this.props.onChange(this.state.value);
		});
	};

	decreaseValue = () => {
		const { value } = this.state;
		this.setState({ value: (value <= 1) ? 0 : Number(value) - 1 }, () => {
			this.props.onChange(this.state.value);
		});
	};

	setValue = (value) => {
		this.setState({ value: Number(value) }, () => {
			this.props.onChange(this.state.value);
		});
	};

	render() {
		return (
			<div className="input-stepper">
				<input
					className="input-stepper-content"
					type="number"
					value={this.state.value}
					onFocus={e => e.target.select()}
					onChange={e => this.setValue(e.target.value)}
					min={0}
				/>
				<div className="input-stepper-control">
					<div
						className="input-stepper-control-item"
						onClick={this.increaseValue}
					>
						+
					</div>
					<div
						className="input-stepper-control-item"
						onClick={this.decreaseValue}
					>
						-
					</div>
				</div>
			</div>
		);
	}
}
export default CmsNumberInput;