import React from 'react';
import { connect } from "react-redux";
import {
    addRight, clearFilter, removeRight, updateCountries, updateExclusive,
    updateIncludedCountries
} from "../actions/filterActions";
import CountrySelector from "../../main/components/CountrySelector";
import {PropTypes} from "prop-types";
import PopupCountrySelector from "../../main/components/PopupCountrySelector";
import {cancelIcon} from "../../main/components/Icons";

class RightsFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };

        this.worldwideCountries = 242;
    }

    componentWillReceiveProps(nextProps) {
        console.log("RightsFilter", nextProps)
    }

    selectTerritory = (countries) => {
        let includeAllCountries = (this.refs.countrySelector.state.selectedOption === "multiple");
        this.props.updateCountries(countries);
        this.props.updateIncludedCountries(includeAllCountries);
    };

    render() {
        const {rights,rightsPackage,countries, onFilter, exclusive, clearFilter, includeAllCountries} = this.props;
        return (
            <div className="box">
                <div className="title">
                    {this.context.t("Rights")}
                </div>
                <div className="content">
                    <div style={{display: 'flex'}}>

                        {countries.length <= 1 &&
                        <CountrySelector
                            multi={false}
                            className={"base-input-select"}
                            value={{label: countries[0], value: countries[0]}}
                            onChange={(c)=>{
                                this.selectTerritory([c])
                            }}/>
                        }

                        {countries.length > 1 && countries.length !== this.worldwideCountries &&
                            <div className="territories-placeholder">
                                {countries.length} territories
                            </div>
                        }

                        {countries.length === this.worldwideCountries &&
                        <div className="territories-placeholder">
                            Worldwide
                        </div>
                        }

                        {countries.length > 1 &&
                            <img className="territories-icon" src={cancelIcon}
                                 onClick={()=>{
                                this.selectTerritory([])
                            }}/>
                        }

                        <PopupCountrySelector ref="countrySelector"
                            value={countries}
                            includeAllCountries={includeAllCountries}
                            onSelect={this.selectTerritory}
                        />

                    </div>

                    <div id="rights-packages" className={"filter-rights"} style={{marginTop: 20}}>
                        {
                            rightsPackage && rightsPackage.map(right => {
                                return <div key={right.id} className="filter-right">
                                    <input
                                        className='ca-checkbox checkbox-item'
                                        type='checkbox'
                                        checked={rights.indexOf(right.id) !== -1}
                                        onChange={(e) => {
                                            if ( e.target.checked ) {
                                                this.props.addRight(right.id)
                                            } else {
                                                this.props.removeRight(right.id)
                                            }
                                        }}
                                        id={right.id}
                                    /> {right.name}
                                </div>
                            })
                        }

                    </div>
                    <hr />
                    <div style={{
                        display:'flex',
                        marginBottom: 20
                    }}>
                        <input
                            type="checkbox"
                            checked={exclusive}
                            className="ca-checkbox checkbox-item"
                            onChange={(e) => {
                                this.props.updateExclusive(e.target.checked)
                            }}
                        />
                        {this.context.t("Contains exclusive rights")}
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <button className="standard-button" style={{margin:5}} onClick={onFilter}>
                            {this.context.t("Apply")}
                        </button>
                        <button className="standard-button transparent" style={{margin:5}} onClick={clearFilter}>
                            {this.context.t("Clear")}
                        </button>
                    </div>

                </div>
            </div>
        );
    }
}

RightsFilter.contextTypes = {
    t: PropTypes.func.isRequired
};


const mapStateToProps = state => {
    return state.filter
};

const mapDispatchToProps = dispatch => {
    return {
        addRight: id => dispatch(addRight(id)),
        removeRight: id => dispatch(removeRight(id)),
        updateCountries: countries => dispatch(updateCountries(countries)),
        updateExclusive: exclusive => dispatch(updateExclusive(exclusive)),
        updateIncludedCountries: includeAllCountries => dispatch(updateIncludedCountries(includeAllCountries)),
        clearFilter : () => dispatch(clearFilter())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RightsFilter)