import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";

const rowStyle = {
    borderBottom: '1px solid #EEF3F6',
    borderRight: '1px solid #EEF3F6',
    display: 'flex'
};

const titleStyle = {
    backgroundColor: '#F4F6F9',
    color: '#4F4F4F',
    fontSize: 14,
    fontWeight: 600,
    margin: '3px 0',
    padding: 10,
    width: '50%'
};

const valueStyle = {
    color: '#4F4F4F',
    fontSize: 14,
    fontWeight: 600,
    margin: '3px 0',
    padding: 10,
    width: '50%'
};

class Seller extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.noInfoText = "No information available";
    }

    render() {
        const { company } = this.props;
        return (
            <div style={{ padding:'20px 0'}}>
                <div style={{marginBottom: 20}}>
                    <div style={{
                        color: '#1A4B63',
                        fontSize: 20,
                        fontWeight: 600
                    }}>
                        {company.displayName}
                    </div>
                    {company.website && <div style={{
                        color: '#4F4F4F',
                        fontSize: 14,
                    }}>
                        {company.website}
                    </div>}

                </div>
                <div className="full-item-box" style={{width: '75%'}}>
                    <label>{company.displayName} DETAILS</label>
                    <div >
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                Legal name
                            </div>
                            <div style={valueStyle}>
                                {company.legalName}
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                Company address
                            </div>
                            <div style={valueStyle}>
                                {company.address}
                                {company.city && " " + company.city}
                                {company.zip && " " + company.zip}
                                {company.country && " " + company.country.name}
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                City
                            </div>
                            <div style={valueStyle}>
                                {company.city && company.city}
                                {!company.city && this.noInfoText}
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                Country
                            </div>
                            <div style={valueStyle}>
                                {company.country && company.country.name}
                                {!company.country && this.noInfoText}
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                ZIP
                            </div>
                            <div style={valueStyle}>
                                {company.zip && company.zip}
                                {!company.zip && this.noInfoText}
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                Company registration number
                            </div>
                            <div style={valueStyle}>
                                {company.registrationNumber && company.registrationNumber}
                                {!company.registrationNumber && this.noInfoText}
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={titleStyle}>
                                VAT ID number
                            </div>
                            <div style={valueStyle}>
                                {company.vat}
                            </div>
                        </div>


                    </div>
                </div>

                <div className="full-item-box">
                    <label>DESCRIPTION</label>
                    <div className="full-item-content">
                        {company.description && company.description}
                        {!company.description && this.noInfoText}
                    </div>
                </div>


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
)(Seller)