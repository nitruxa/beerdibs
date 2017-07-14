import React, {Component, PropTypes} from 'react';

class BeerPourOverlay extends Component {

    getBeerTapInfo() {
        const {beerTaps, taps} = this.props;

        return Object.keys(beerTaps).map(beerTap => {
            const tap = taps.find(({position}) => position === Number(beerTap));
            return (
                <div key={beerTap} className="tap-puored" style={{fontSize: '2em'}}>
                    {beerTaps[beerTap]} ml

                    <div style={{fontSize: '0.5em'}}>
                        {tap && tap.beerKeg && tap.beerKeg.beerBrand.name}
                    </div>
                </div>
            );
        });
    }

    getPourInfo() {
        const {fingerPrint, beerTaps} = this.props;

        if (Object.keys(beerTaps).length) {
            return (
                <div>
                    {fingerPrint.displayName} has poured
                    {this.getBeerTapInfo()}
                </div>
            );
        } else {
            return (
                <div>
                    {fingerPrint.displayName}<br />is about to get drunk!
                </div>
            );
        }
    }

    render() {
        const {fingerPrint} = this.props;

        if (fingerPrint) {
            return (
                <div className="overlay" style={{display: 'flex', alignItems: 'center', fontSize: '60px', background: 'rgba(0, 0, 0, 0.7)'}}>
                    <div className="tap-notification" style={{margin: '0 auto', display: 'flex', alignItems: 'center'}}>
                        <div className="beer-tap">
                            <div className="beer-tap-pic" style={{width: '290px', height: '615px'}} />
                            {/*<div className="beer-tap-name">Kronenbourg Blanc</div>*/}
                        </div>
                        <div className="tap-user" style={{color: 'white', textAlign: 'center', paddingLeft: '50px'}}>
                        {this.getPourInfo()}
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    }
}

BeerPourOverlay.propTypes = {
    fingerPrint: PropTypes.object,
    beerTaps: PropTypes.object,
    taps: PropTypes.array
};

export default BeerPourOverlay;
