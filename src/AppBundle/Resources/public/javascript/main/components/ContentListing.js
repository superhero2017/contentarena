import React, { Component } from 'react';
import Moment from "moment/moment";
import ContentListingEventDetails from "../../buy/components/ContentListingEventDetails";

class ContentListing extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            buyingMode : false
        };
        this.noImage = assetsBaseDir + "app/images/no-image.png";
        this.bidIcon = assetsBaseDir + "app/images/hammer.png";
        this.fixedIcon = assetsBaseDir + "app/images/bid.png";
        this.blueCheck = assetsBaseDir + "app/images/blue_check.png";
        this.yellowCheck = assetsBaseDir + "app/images/yellow_chech.png";
        this.bucketicon = assetsBaseDir + "app/images/bucket.png";
    }

    getFee = (salesPackage) => {

        const {currency} = this.props;
        let currencyCode = currency || salesPackage.currency.code;
        let currencySymbol = (currencyCode === "EUR" ? "€" : "$");
        return salesPackage.fee + " " + currencySymbol ;
    };

    onSelect = () => {
      const {onSelect, customId} = this.props;

      if ( onSelect ) onSelect(customId);

    };

    confirmRemoveFromWatchlist = (e) =>{
        this.setState({confirmWatchlistRemove : true});
        e.stopPropagation();
    };

    cancelRemoveFromWatchlist = (e) =>{
        this.setState({confirmWatchlistRemove : false});
        e.stopPropagation();
    };

    removeFromWatchlist = (e) => {
        const {customId, onWatchlistRemove} = this.props;
        ContentArena.Api.watchlist(customId);

        if ( onWatchlistRemove ) onWatchlistRemove(customId);
        e.stopPropagation();
    };

    sortSalesPackages = (a, b) => {
        return this.compareProperty(a.territories.length, b.territories.length) || this.compareProperty(b.name, a.name);
    };

    sortByFilter = (a, b) => {

        const { filter } = this.props;

        let territories = filter.countries.map(c => c.value);
        let aTerritories = a.territories.map(c => c.value);
        let bTerritories = b.territories.map(c => c.value);
        let aExcludedTerritories = a.excludedTerritories.map(c => c.value);
        let bExcludedTerritories = b.excludedTerritories.map(c => c.value);
        let aTotal = 0;
        let bTotal = 0;

        territories.forEach(t => {
            if ( aTerritories.indexOf(t) !== -1
                //|| a.territoriesMethod === "WORLDWIDE"
                || (a.territoriesMethod === "WORLDWIDE_EXCLUDING" && aExcludedTerritories.indexOf(t) === -1 )) aTotal++;
            if ( bTerritories.indexOf(t) !== -1
                //|| b.territoriesMethod === "WORLDWIDE"
                || (b.territoriesMethod === "WORLDWIDE_EXCLUDING" && bExcludedTerritories.indexOf(t) === -1 )) bTotal++;

        });

        return this.compareProperty(bTotal, aTotal);
    };

    compareProperty = (a, b) =>  {
        return (a > b) ? 1 : ((b > a) ? -1 : 0)
    };

    render(){
        const {
            name,
            expiresAt,
            salesPackages,
            programs,
            rightsPackage,
            onSelectName,
            imageBase64,
            image,
            filter,
            sortSalesPackages,
            watchlistRemove
        } = this.props;

        const {confirmWatchlistRemove} = this.state;

        let listingImage = (imageBase64) ? imageBase64 : image ? assetsBaseDir + "../" + image : this.noImage;
        salesPackages.sort(this.sortSalesPackages).reverse();

        if ( filter && filter.countries.length > 0 && sortSalesPackages) {
            salesPackages.sort(this.sortByFilter);
        }

        return (
            <div className="listing-list-view" onClick={this.onSelect}>
                <div className={"left"}  >
                    <div className={"image"}>
                        <img src={listingImage}/>
                    </div>
                    <div className={"date"}>Published <span>{Moment().format('DD/MM/YYYY')}</span></div>
                    <div className={"date"}>Expires <span>{Moment(expiresAt).format('DD/MM/YYYY')}</span></div>
                </div>
                <div className={"right"} >
                    <div className={"name"} onClick={() => { if (onSelectName) onSelectName() }}>{name}</div>

                    <div style={{display: "flex"}}>
                        <ContentListingEventDetails {...this.props}/>

                        {watchlistRemove && !confirmWatchlistRemove &&
                        <img style={{
                            cursor : 'pointer',
                            position: 'absolute',
                            right: 0,
                            top : 0,
                            margin: '0 5px'

                        }} src={this.bucketicon} onClick={this.confirmRemoveFromWatchlist}/>}

                        {confirmWatchlistRemove && <div style={{
                            position: 'absolute',
                            right: 0,
                            top : 0,
                            margin: '0 5px',
                            border : '1px solid lightgrey',
                            padding : 5,
                            fontSize: 13
                        }}>
                            <span>Remove from Watchlist?</span>
                            <span onClick={this.removeFromWatchlist} style={{
                                cursor : 'pointer',
                                margin: '0 15px',
                                color : 'red'
                            }}>
                                Yes
                            </span>
                            <span onClick={this.cancelRemoveFromWatchlist} style={{
                                cursor : 'pointer',
                                color : 'green'
                            }}>
                                Cancel
                            </span>
                        </div>}

                        <div style={{
                            flex: 2,
                            flexDirection: "column",
                            flexWrap: 'wrap',
                            maxHeight: 200,
                            display: 'flex'
                        }}>
                            {
                                rightsPackage.map(( sr,i )=>{
                                    return <div key={i}  style={{
                                        minHeight: 46,
                                        flexDirection: 'row',
                                        display: 'flex',
                                        alignItems: 'center',
                                        flex: '1 1 40px'
                                    }}>
                                        {!sr.exclusive &&
                                        <img style={{width: 23, height: 22, margin: '0 5px'}} src={this.blueCheck}/>}

                                        {sr.exclusive &&
                                        <img style={{width: 23, height: 22, margin: '0 5px'}} src={this.yellowCheck}/>}

                                        <div style={{display: 'flex', flexDirection: "row"  }}>
                                            { sr.shortLabel !== "PR" && sr.name }
                                            { sr.shortLabel === "PR" && programs[0] && programs[0].name &&
                                            "Program: " + programs[0].name
                                            }
                                            {sr.exclusive && <span style={{fontWeight: 600, marginLeft: 3}}> EX</span>}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>

                    <div className={"sales-bundles"}>
                        {
                            salesPackages.slice(0, 4).map( ( salesPackage, i) => {
                                return  <div className="sales-package" key={"sales-package-"+ i}>
                                    {salesPackage.bundleMethod === "SELL_AS_BUNDLE"
                                    &&<div style={{ margin: '0 10px 0 5px'}}>
                                        <img style={{width: 26, height: 23}} src={this.fixedIcon}/>
                                    </div>}

                                    <div style={{cursor: 'default'}}>
                                        {salesPackage.name}
                                    </div>
                                    {
                                        ( salesPackage.salesMethod !== "BIDDING" ||  ( salesPackage.salesMethod === "BIDDING" && salesPackage.fee > 0 ) )
                                        &&<div style={{margin: '0 10px', display: "flex", flex: '1 0 auto'}}>
                                            {this.getFee(salesPackage)}
                                        </div>
                                    }

                                    {salesPackage.salesMethod === "BIDDING"
                                    &&<div style={{ margin: '0 10px 0 5px'}}>
                                        <img style={{width: 23, height: 23}} src={this.bidIcon}/>
                                    </div>}



                                </div>
                            })
                        }
                        {
                            salesPackages.length > 4 && <div className="sales-package">
                                <div style={{color: '#2DA7E6', padding: '0 15px 0 0px'}}>
                                   + {salesPackages.length - 4}
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default ContentListing;
