import React from 'react';
import { connect } from "react-redux";
import {PropTypes} from "prop-types";
import TermItem from "../components/TermItem";
import DefinitionItem from "../components/DefinitionItem";
import Loader from "../../common/components/Loader";

class Terms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            updating: false,
            terms : [],
            definitions: []
        };

    }

    componentDidMount () {
        this.setState({loading:true, loadingDefinitions: true });

        ContentArena.Api.getCompanyTerms().done(terms=>{
            this.setState({
                loading:false,
                terms
            });
        });

        ContentArena.Api.getCompanyDefinitions().done(definitions=>{
            this.setState({
                loadingDefinitions:false,
                definitions
            });
        });
    }

    onUpdateDefinition = (index, content, name, edited) => {

        let definitions = this.state.definitions;
        definitions[index].content = content;
        definitions[index].name = name;
        definitions[index].edited = edited;
        this.setState({definitions});
    };

    onRemoveDefinition = (index) => {

        let definitions = this.state.definitions;
        definitions[index].removed = true;
        this.setState({definitions});
    };

    onUpdateTermItem = (termIndex, termItemIndex, content, edited) => {

        let terms = this.state.terms;
        terms[termIndex].items[termItemIndex].content = content;
        terms[termIndex].items[termItemIndex].edited = edited;
        this.setState({terms});
    };

    onRemoveTerm = (termIndex, termItemIndex) => {

        let terms = this.state.terms;
        terms[termIndex].items[termItemIndex].removed = true;
        terms[termIndex].items[termItemIndex].content = "";
        //terms[termIndex].items[termItemIndex].isEdited = false;
        this.setState({terms});
    };

    restoreDefaultTerms = () => {
        this.setState({restoring:true });

        ContentArena.Api.restoreCompanyTerms().done(terms=>{
            this.setState({
                restoring:false,
                terms
            });
        });
    };

    restoreDefaultDefinitions = () => {
        this.setState({restoringDefinitions:true });

        ContentArena.Api.restoreDefinitions().done(definitions=>{
            this.setState({
                restoringDefinitions:false,
                definitions
            });
        });
    };

    updateTerms = () => {
        this.setState({updating:true });

        ContentArena.Api.updateTerms(this.state.terms, this.state.definitions).done(()=>{
            this.setState({
                updating:false
            });
        });
    };

    addDefinition = () => {
        let { definitions } = this.state;
        let definition = {
            name: "",
            content : "",
            custom:true,
            editable : true,
            editing: true,
            edited: false,
            position : definitions.length + 1
        };

        definitions.push(definition);
        this.setState({definitions});
    };

    render () {
        const { loading, terms,restoring, updating, definitions, restoringDefinitions } = this.state;

        document.title = "Content Arena - Terms";

        if (loading) return <Loader loading={true} small/>;

        return (
            <div className="settings-container terms-edit-container">

                <div className="terms-edit-header">
                    <div className="terms-edit-header-title">
                        {this.context.t("TERMS_EDIT_HEADER")}
                        <div className="subtitle">
                            {this.context.t("TERMS_EDIT_HEADER_TWO")}
                        </div>
                    </div>
                    <button
                        onClick={this.restoreDefaultDefinitions}
                        disabled={restoringDefinitions}
                        className="standard-button license-agreement-button terms-restore-button"
                    >
                        {this.context.t("TERMS_EDIT_BUTTON_RESTORE_DEFINITIONS")}
                        {restoringDefinitions && <Loader loading={true} xSmall />}
                        {!restoringDefinitions && <div><i className="fa fa-refresh"/></div>}
                    </button>
                    <button
                        onClick={this.restoreDefaultTerms}
                        disabled={restoring}
                        className="standard-button license-agreement-button terms-restore-button"
                    >
                        {this.context.t("TERMS_EDIT_BUTTON_RESTORE")}
                        {restoring && <Loader loading={true} xSmall />}
                        {!restoring && <div><i className="fa fa-refresh"/></div>}
                    </button>

                </div>
                <div className="terms-edit-title">
                    {this.context.t("TERMS_EDIT_TITLE_DEFINITIONS")}
                </div>
                <div className="terms-edit-box">
                    {definitions.map((definition, i) => {
                        return (
                            <div>
                                {!definition.removed && <DefinitionItem
                                    onUpdate={(content, name, edited) => this.onUpdateDefinition(i, content, name, edited)}
                                    onRemove={() => this.onRemoveDefinition(i)}
                                    {...definition}
                                />}
                            </div>
                        )})
                    }

                    <button
                        onClick={this.addDefinition}
                        className="standard-button terms-add-definition-button"
                    >
                        {this.context.t("TERMS_EDIT_BUTTON_ADD_DEFINITIONS")}
                    </button>
                </div>
                <div className="terms-edit-title" style={{borderTop: "none"}}>
                    {this.context.t("TERMS_EDIT_TITLE_TERMS")}
                </div>
                <div className="terms-edit-box">
                    {terms.map((term, i) => {
                        return (
                            <div>
                                { term.items.map((item,k) => {
                                    if (item.removed) return undefined;
                                    return <TermItem
                                        onUpdate={(content, edited) => this.onUpdateTermItem(i,k,content, edited)}
                                        onRemove={() => this.onRemoveTerm(i, k)}
                                        {...item}
                                        termPosition={term.position}
                                    />
                                }) }
                            </div>
                        )})
                    }
                </div>
                <div className="buttons">
                    <button
                        onClick={this.updateTerms}
                        disabled={updating}
                        className={"standard-button"}>
                        {this.context.t("TERMS_EDIT_BUTTON_UPDATE")}
                    </button>
                </div>
            </div>
        )
    }
}

Terms.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = ( state, ownProps) => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Terms)