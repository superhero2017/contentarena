import React from 'react';
import ReactTable from 'react-table';
import {PropTypes} from "prop-types";

class SearchCompetition extends  React.Component {
    constructor(props){
        super(props);

        this.state = {
            pageSize :20,
            input: "",
            valid : false,
            searching : false,
            searchDone : false,
            results: [],
            resultMessage : ""
        }
    }

    search = () =>{
        let _this = this;

        this.setState({
            searching : true
        });

        ContentArena.Api.searchCompetition(this.state.input).done((results)=>{
            _this.setState({
                results : results,
                searching : false,
                searchDone : true,
            });
            _this.setState({
                resultMessage : _this.getResultMessage(0)
            });
        }).always(()=>{
            _this.setState({
                searching : false,
                searchDone : true,
            });
        });

    };

    handleInput = (e) =>{

        let input = e.target.value;

        this.setState((prevState) =>({
            valid : input.length > 2,
            input : input,
            searchDone : ( input.length > 0 ) ? prevState.searchDone : false
        }));
    };

    handleKeyPress = (e) => {
        const { searching, valid } = this.state;
        if (e.key === 'Enter' && !searching && valid) {
            this.search();
        }
    };

    getResultMessage = (page) => {
        page++;
        let total = this.state.results.length;
        let pageTotal = this.state.pageSize * page;
        let pageQuantity = (page === 1) ? 1 : (this.state.pageSize * (page  - 1)) + 1;

        if ( pageTotal > total ) pageTotal = total;

        return pageQuantity + "-"+pageTotal+" of "+ total +" results for '"+this.state.input+"'";
    };

    onPageChange = (page) => {
        let resultMessage = this.getResultMessage(page);
        this.setState(() =>({
            resultMessage : resultMessage
        }));
    };

    render(){
        return(
            <div className="step-content-container">
                <div className="step-item-description">
                    {this.context.t("CL_STEP1_SEARCH_TITLE")}
                </div>
                <div className={"base-input"}>
                    <label>
                        {this.context.t("Competition")}
                    </label>
                    <input type="text"
                           onKeyPress={this.handleKeyPress}
                           onChange={this.handleInput}
                           placeholder={this.context.t("CL_STEP1_SEARCH_PLACEHOLDER")} />
                    <button className="standard-button" disabled={!this.state.valid || this.state.searching} onClick={this.search}>Search</button>
                </div>

                {this.state.searching && <div><i className="fa fa-cog fa-spin"/></div>}

                {this.state.searchDone && this.state.results.length > 0 && <div>
                    {this.state.resultMessage}
                </div>}

                {this.state.results.length > 0 && <div>
                    <ReactTable
                        defaultPageSize={this.state.pageSize}
                        showPageSizeOptions={false}
                        onPageChange={this.onPageChange}
                        minRows={0}
                        data={this.state.results}
                        select={this.props.select}
                        className="ca-table"
                        columns={[{
                            Header: this.context.t("CL_STEP1_SEARCH_HEADER_COMPETITION"),
                            accessor: 'name' // String-based value accessors!
                        }, {
                            Header: this.context.t("CL_STEP1_SEARCH_HEADER_COUNTRY"),
                            accessor: 'sportCategory.name',
                        }, {
                            accessor: 'sport.name', // Required because our accessor is not a string
                            Header: this.context.t("CL_STEP1_SEARCH_HEADER_SPORT"),
                        }, {
                            Header: '', // Custom header components!
                            Cell: props => <button className={"blue-button"} onClick={() =>{ this.props.select(props.original) }}>
                                {this.context.t("CL_STEP1_SEARCH_BUTTON_SELECT")}
                            </button>
                        }]}
                    />
                </div>}

                <div style={{ display: "inline-flex" }} >
                    {this.state.searchDone && this.state.results.length === 0 && <div>
                        {this.context.t("CL_STEP1_SEARCH_NO_RESULTS", {n: this.state.input })}
                    </div>}

                    {!this.state.searchDone &&<div className="step-item-description">
                        {this.context.t("CL_STEP1_SEARCH_CANT_FIND_2")}
                    </div>}

                    {this.state.searchDone && this.state.results.length > 0 && <div className="step-item-description">
                        {this.context.t("CL_STEP1_SEARCH_CANT_FIND")}
                    </div>}

                    {this.state.searchDone && this.state.results.length === 0 && <div className="step-item-description">
                        {this.context.t("CL_STEP1_SEARCH_TRY")}
                    </div>}

                    <button className={"standard-button standard-button-big"} onClick={this.props.close}>
                        {this.context.t("CL_STEP1_ENTER_MANUALLY")}
                    </button>
                </div>
            </div>
        )
    }
}
SearchCompetition.contextTypes = {
    t: PropTypes.func.isRequired
};

export default SearchCompetition;

