import React from 'react';
import { connect } from "react-redux";
import ReactTable from "react-table";
import cloneDeep from "lodash/cloneDeep";
import CountrySelector from '../../main/components/CountrySelector'
import {blueCheckIcon, cancelIcon, Spinner} from "../../main/components/Icons";
import {PropTypes} from "prop-types";
import Loader from '../../common/components/Loader';
import InviteUsers from "./InviteUsers";

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            updatingCompany : false,
            updatingUser : false,
            updatingPassword : false,
            loadingCompanyUsers : false,
            editPersonalInfo: false,
            editCompanyInfo : false,
            companyUsers : [],
            user : {}
        };
    }

    componentDidMount () {
        this.setState({loading:true});

        ContentArena.ContentApi.getUserInfo().done(user=>{
            this.originalUser = cloneDeep(user);
            this.setState({loading:false, user : user});
        });

        this.loadCompanyUsers();

    }

    loadCompanyUsers = () => {
        this.setState({loadingCompanyUsers: true});
        ContentArena.ContentApi.getCompanyUsers().done(companyUsers=>{
            this.setState({loadingCompanyUsers:false, companyUsers : companyUsers});
        });
    };

    updateCompany = () => {
        const {history} = this.props;
        this.setState({updatingCompany:true, editCompanyInfo: false});
        this.originalUser = cloneDeep(this.state.user);
        ContentArena.ContentApi.updateCompany(this.state.user.company).done(()=>{
            this.setState({updatingCompany: false});
        })
    };

    updateUser = () => {
        const {history} = this.props;
        this.setState({updatingUser:true, editPersonalInfo: false});
        this.originalUser = cloneDeep(this.state.user);
        ContentArena.ContentApi.updateUser(this.state.user).done(()=>{
            this.setState({updatingUser: false});
        })
    };

    updatePassword = () => {
        this.setState({updatingPassword:true});
        ContentArena.ContentApi.updatePassword({
            id : this.state.user.id,
            password : this.state.password
        }).done(()=>{
            this.setState({
                updatingPassword:false,
                password :null,
                passwordCheck : null,
                passwordUpdated : true
            });
        })
    };

    onChangeReceiveNotifications= ( e ) => {
        let user  = this.state.user;
        user.receivePreferenceNotifications = e.target.checked;
        this.setState({user});
    };

    validate = (pass) => {
        return {
            length : ( pass.length >= 8 ),
            digit : /\d/.test(pass),
            upper : /[A-Z]/.test(pass),
            special : /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass),
        };
    };

    invalidPassword = () => {
        const { oldPassword, password, passwordCheck } = this.state;

        if (!oldPassword || !password ||  !passwordCheck ) return true;

        let valid = this.validate(password);

        return  password !== passwordCheck ||
                !valid.length ||
                !valid.digit ||
                !valid.upper ||
                !valid.special;
    };

    render () {

        const {history, common} = this.props;

        const { editPersonalInfo, editCompanyInfo, loadingCompanyUsers, companyUsers,
            updatingCompany, updatingUser, updatingPassword, password, passwordCheck, passwordUpdated } = this.state;
        let user = this.state.user;

        let country = (user && user.company && user.company.country) ? {label: user.company.country.name, value: user.company.country.name} : null;

        document.title = "Content Arena - Settings";

        return (
            <div className={"settings-container"}>
                {user.company && <div className={"setting"}>
                    <div className={"title"}>
                        {this.context.t("SETTINGS_TITLE_COMPANY")}
                        {!editCompanyInfo && !updatingCompany &&
                        <div className={"edit-button"} onClick={e=>{
                            this.setState({
                                editCompanyInfo: true
                            })
                        }}>
                            <i className="fa fa-edit"/>
                        </div>}
                        {updatingCompany && <Loader loading={true} small/>}
                    </div>
                    <div className={"row"}>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_NAME")}
                            </label>
                            <input value={user.company.legalName} disabled={common.testStageMode || !editCompanyInfo} onChange={(e)=>{
                                user.company.legalName = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_REGISTRATION_NUMBER")}
                            </label>
                            <input value={user.company.registrationNumber} disabled={!editCompanyInfo} onChange={(e)=>{
                                user.company.registrationNumber = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_VAT")}
                            </label>
                            <input value={user.company.vat} disabled={!editCompanyInfo} onChange={(e)=>{
                                user.company.vat = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_ADDRESS")} 1
                            </label>
                            <input value={user.company.address} disabled={!editCompanyInfo} onChange={(e)=>{
                                user.company.address = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_ADDRESS")} 2
                            </label>
                            <input value={user.company.address2} disabled={!editCompanyInfo} onChange={(e)=>{
                                user.company.address2 = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_CITY")}
                            </label>
                            <input value={user.company.city} disabled={!editCompanyInfo} onChange={(e)=>{
                                user.company.city = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_ZIP")}
                            </label>
                            <input value={user.company.zip} disabled={!editCompanyInfo} onChange={(e)=>{
                                user.company.zip = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_COMPANY_COUNTRY")}
                            </label>
                            <CountrySelector multi={false} value={country} disabled={!editCompanyInfo} onChange={(e)=>{
                                user.company.country.name = e.value;
                                this.setState({user});
                            }}/>
                        </div>
                    </div>
                    <div>
                        <label>
                            {this.context.t("SETTINGS_LABEL_COMPANY_DESCRIPTION")}
                        </label>
                        <textarea value={user.company.description} disabled={!editCompanyInfo} onChange={(e)=>{
                            user.company.description = e.target.value;
                            this.setState({user});
                        }}/>
                    </div>
                    {editCompanyInfo && !updatingCompany && <div className={"buttons"}>
                        <div>
                            <button
                                onClick={() => {
                                    this.setState({
                                        user: { ...this.originalUser },
                                        editCompanyInfo: false
                                    });

                                }}
                                className={"cancel-button"}>Cancel
                            </button>
                            <button
                                onClick={this.updateCompany}
                                className={"yellow-button"}>Save
                            </button>
                        </div>
                    </div>}
                </div>}
                <div className={'setting'}>
                    {/*ACTIVE USERS*/}
                    <div className={'title'}>Active Users</div>

                    {!loadingCompanyUsers && companyUsers.length > 0 && <div>
                        <ReactTable
                            className="closed-deals-table"
                            defaultPageSize={30}
                            showPageSizeOptions={false}
                            showPagination={false}
                            minRows={0}
                            resizable={false}
                            data={companyUsers}
                            columns={[{
                                Header: this.context.t("SETTINGS_LABEL_USER_FAMILY_NAME"),
                                headerClassName: 'table-header',
                                className: 'table-header',
                                accessor: 'lastName',
                            }, {
                                accessor: 'firstName', // Required because our accessor is not a string
                                Header: this.context.t("SETTINGS_LABEL_USER_FIRST_NAME"),
                                headerClassName: 'table-header',
                                className: 'table-header',
                            }, {
                                Header: this.context.t("SETTINGS_LABEL_USER_EMAIL"),
                                accessor: 'email',
                                headerClassName: 'table-header',
                                className: 'table-header',
                                Cell: row => <span title={row.value}>{row.value}</span>,
                                width: 350
                            }, {
                                Header: this.context.t("SETTINGS_LABEL_USER_PHONE_NUMBER"),
                                accessor: 'phone',
                                headerClassName: 'table-header',
                                className: 'table-header',
                            }, {
                                Header: this.context.t("SETTINGS_LABEL_USER_COMPANY_POSITION"),
                                accessor: 'title',
                                headerClassName: 'table-header',
                                className: 'table-header',
                            }, {
                                Header: this.context.t("SETTINGS_LABEL_USER_STATUS"),
                                accessor: 'status',
                                headerClassName: 'table-header',
                                className: 'table-header d-flex justify-content-center',
                                Cell: props => {
                                    const user = props.original;

                                    if ( user.status && user.status.name === "Active" ) return (
                                        <i className="fa fa-check-circle setting-table-icon" style={{color: 'green'}} />
                                    );

                                    return (
                                        <i className="fa fa-minus-circle setting-table-icon" style={{color: 'orange'}} />
                                    )
                                }
                            }

                            ]}
                        />
                    </div>}
                    {loadingCompanyUsers && <Loader loading={true} small/>}
                </div>
                <div className={"setting"}>
                    <div className={"title"}>
                        {this.context.t("SETTINGS_LABEL_INVITE_COLLEAGUES")}
                    </div>
                    <InviteUsers onInvite={this.loadCompanyUsers} />
                </div>
                <div className={"setting"}>
                    <div className={"title"}>
                        {this.context.t("SETTINGS_LABEL_USER_TITLE_INFO")}
                        {!editPersonalInfo && !updatingUser &&
                        <div className={"edit-button"} onClick={e=>{
                            this.setState({
                                editPersonalInfo: true
                            })
                        }}>
                            <i className="fa fa-edit"/>
                        </div>}
                        {updatingUser && <Loader loading={true} small/>}
                    </div>
                    <div className={"row"}>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_USER_FIRST_NAME")}
                            </label>
                            <input value={user.firstName} disabled={common.testStageMode || !editPersonalInfo} onChange={(e)=>{
                                user.firstName = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_USER_FAMILY_NAME")}
                            </label>
                            <input value={user.lastName} disabled={common.testStageMode || !editPersonalInfo} onChange={(e)=>{
                                user.lastName = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_USER_TITLE")}
                            </label>
                            <input value={user.title} disabled={!editPersonalInfo} onChange={(e)=>{
                                user.title = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                    </div>
                    <div className={"row"} style={{marginBottom: 0}}>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_USER_EMAIL")}
                            </label>
                            <input value={user.email} disabled={!editPersonalInfo} onChange={(e)=>{
                                user.email = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                        <div className={"item"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_USER_PHONE_NUMBER")}
                            </label>
                            <input value={user.phone} disabled={!editPersonalInfo} onChange={(e)=>{
                                user.phone = e.target.value;
                                this.setState({user});
                            }}/>
                        </div>
                    </div>
                    {editPersonalInfo && !updatingUser && <div className={"buttons"}>
                        <div>
                            <button
                                onClick={() => {
                                    this.setState({
                                        user: { ...this.originalUser },
                                        editPersonalInfo: false
                                    });

                                }}
                                className={"cancel-button"}>Cancel
                            </button>
                            <button
                                onClick={this.updateUser}
                                className={"yellow-button"}>Save
                            </button>
                        </div>
                    </div>}
                </div>
                <div style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <div className={"setting"} style={{width: '48%'}}>
                        <div className={"title"} style={{marginBottom: 0}}>
                            {this.context.t("SETTINGS_LABEL_CHANGE_PASSWORD")}
                        </div>
                        <div className={"subtitle"}>
                            {this.context.t("SETTINGS_LABEL_CHANGE_PASSWORD_2")}
                        </div>
                        <div className={"password"}>
                            <label>
                                {this.context.t("SETTINGS_LABEL_TYPE_CURRENT_PASSWORD")}
                            </label>
                            <input type={"password"} onChange={(e)=>{
                                this.setState({
                                    oldPassword : e.target.value
                                })
                            }}/>

                            <label>
                                {this.context.t("SETTINGS_LABEL_TYPE_NEW_PASSWORD")}
                            </label>
                            <input type={"password"} onChange={(e)=>{
                                this.setState({
                                    password : e.target.value
                                })
                            }}/>

                            <label>
                                {this.context.t("SETTINGS_LABEL_RETYPE_NEW_PASSWORD")}
                            </label>
                            <input type={"password"} onChange={(e)=>{
                                this.setState({
                                    passwordCheck : e.target.value
                                })
                            }}/>

                            {!updatingPassword && !passwordUpdated &&
                            <button onClick={this.updatePassword}
                                    disabled={this.invalidPassword()}
                                    className={"yellow-button"}>
                                {this.context.t("SETTINGS_BUTTON_SAVE_PASSWORD")}
                            </button>}
                            {updatingPassword && <Loader loading={true} small/>}
                            {passwordUpdated && <div>
                                {this.context.t("SETTINGS_LABEL_PASSWORD_UPDATED")}
                            </div>}
                        </div>
                    </div>
                    <div className="setting" style={{width: '48%', marginBottom: 30}}>
                        <div className={"title"} style={{marginBottom: 0}}>
                            {this.context.t("SETTINGS_LINKS_HEADER")}
                        </div>
                        <div className={"subtitle"} style={{marginBottom: 0}}>
                            {this.context.t("SETTINGS_LINKS_TITLE")}
                        </div>

                        <div>
                            <a href="/generalterms"
                               target="_blank"
                               className="standard-button settings-link">
                                    {this.context.t("SETTINGS_LINKS_BUTTON_TERMS")}
                            </a>
                            <a href="https://contentarena.com/web/privacy-policy/"
                               target="_blank"
                               className="standard-button settings-link">
                                    {this.context.t("SETTINGS_LINKS_BUTTON_PRIVACY")}
                            </a>
                        </div>

                        <div className={"title"} style={{marginBottom: 0, marginTop: 50}}>
                            {this.context.t("SETTINGS_SUPPORT_HEADER")}
                        </div>
                        <div className={"subtitle"} style={{marginBottom: 0}}>
                            {this.context.t("SETTINGS_SUPPORT_TITLE")}
                        </div>

                        <div>
                            <a href="https://contentarena.com/web/faq/"
                               target="_blank"
                               className="standard-button settings-link">
                                {this.context.t("SETTINGS_LINKS_BUTTON_FAQ")}
                            </a>
                            <a href="/bundles/app/data/Content_Arena_Manual_1.0.pdf"
                               download
                               className="standard-button settings-link">
                                {this.context.t("SETTINGS_LINKS_BUTTON_MANUAL")}
                            </a>

                        </div>
                    </div>
                </div>
                {password && <div className={"password-validation"}>
                    <div>
                        {this.validate(password).length && <img src={blueCheckIcon}/>}
                        {!this.validate(password).length&& <img src={cancelIcon}/>}
                        {this.context.t("SETTINGS_LABEL_PASSWORD_VALIDATE_1")}
                    </div>
                    <div>
                        {this.validate(password).upper && <img src={blueCheckIcon}/>}
                        {!this.validate(password).upper&& <img src={cancelIcon}/>}
                        {this.context.t("SETTINGS_LABEL_PASSWORD_VALIDATE_2")}
                    </div>
                    <div>
                        {this.validate(password).digit && <img src={blueCheckIcon}/>}
                        {!this.validate(password).digit&& <img src={cancelIcon}/>}
                        {this.context.t("SETTINGS_LABEL_PASSWORD_VALIDATE_3")}
                    </div>
                    <div>
                        {this.validate(password).special && <img src={blueCheckIcon}/>}
                        {!this.validate(password).special&& <img src={cancelIcon}/>}
                        {this.context.t("SETTINGS_LABEL_PASSWORD_VALIDATE_4")}
                    </div>
                    {passwordCheck && <div>
                        {passwordCheck === password && <img src={blueCheckIcon}/>}
                        {passwordCheck !== password && <img src={cancelIcon}/>}
                        {this.context.t("SETTINGS_LABEL_PASSWORD_VALIDATE_5")}
                    </div>}
                </div>}

                <div style={{display: 'flex', marginBottom: 10, justifyContent: 'center', fontSize: 14}}
                     className="terms-and-condition-wrapper">
                    <input
                        type="checkbox"
                        className="ca-checkbox"
                        defaultChecked={user.receivePreferenceNotifications}
                        onChange={this.onChangeReceiveNotifications}
                        style={{marginRight: 10}}
                    />
                    <div>
                        {this.context.t("PREFERENCES_RECEIVE_NOTIFICATIONS_MESSAGE")}
                    </div>
                </div>

            </div>
        )
    }
}

Settings.contextTypes = {
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
)(Settings)