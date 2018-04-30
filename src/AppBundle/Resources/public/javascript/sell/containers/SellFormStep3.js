import React from 'react';
import { connect } from "react-redux";
import PackageSelector from "../containers/PackageSelector";
import Right from "../components/Right";

class SellFormStep3 extends React.Component {

    constructor(props) {
        super(props);

        let packages = JSON.parse(this.props.packages);

        this.state = {
            title : "Step 3",
            packagesConfirmed : false,
            rights : [],
            rightPackages : new Map(packages.map((i) => [i.id, i]))
        };
    }

    componentDidMount () {
    }

    componentWillReceiveProps(nextProps) {
        this.loadRights(nextProps.rightsPackage, "Production Standards");
    }

    loadRights = (rightsPackage, group) => {
        let _this = this;
        ContentArena.Api.getRights(rightsPackage.map((p)=> (p.id)), group).done((rights)=>{
            _this.setState({rights});
        });
    };

    render() {
        if ( this.props.step !== 3) return (null);

        return (
            <div className="step-content">
                <div>
                    {
                        this.state.rights.length > 0 && this.state.rights.map((right)=> {
                            return <Right key={right.id} data={right} rightPackages={this.state.rightPackages}/>
                        })
                    }
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.content
};

const mapDispatchToProps = dispatch => {
    return {
        removeNewSport : (index) => dispatch({
            type: 'REMOVE_NEW',
            index : index,
            selectorType : "sports",
        }),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormStep3)