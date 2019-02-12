import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";

class TerritorySelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    showTab = (tab) => {
        this.setState({tab});
    };

    render() {

        return (
            <div className="">
                {this.props.salesPackage.id}

            </div>
        );
    }
}

const mapStateToProps = state => {
    return state
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: id => dispatch(test(id))
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TerritorySelector)