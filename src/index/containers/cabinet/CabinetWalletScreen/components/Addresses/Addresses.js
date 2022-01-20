import "./Addresses.less";

import React from "react";
import Lang from "components/Lang/Lang";
import { ContentBox, NumberFormat } from "ui";
import web3Backend from "services/web3-backend";

class Addresses extends React.PureComponent {

    state = {
        wallets: [],
        balances: {},
    };

    componentDidMount() {
        this._mounted = true;
        (async () => {
            try {
                const wallets = await web3Backend.getWallets();
                if (!this._mounted) return;
                this.setState({wallets});
                const walletsWithBalances = [];
                Promise.allSettled(
                    wallets.map(wallet => web3Backend.getBalances(wallet.address))
                ).then(data => {
                    if (!this._mounted) return;
                    const balances = {};
                    data.map((row, index) => {
                        const {address} = wallets[index];
                        if (row.status === 'fulfilled') {
                            balances[address] = row.value;
                        } else {
                            balances[address] = false;
                            console.warn('[Addresses]', "Can't get balances for", address, row);
                        }
                    });
                    this.setState({balances});
                });
            } catch (error) {
                console.error('[Addresses]', error);
            }
        })();
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    render() {
        const {wallets, balances} = this.state;
        return <ContentBox className="Addresses">
            {wallets.map(wallet => {
                const {address, network, isGenerated, isBalancesError} = wallet;
                const balance = balances[address];
                return <div className="Addresses__item" key={address}>
                    <div>
                        {address} {network} {isGenerated ? 'generated' : 'imported'}
                    </div>
                    <div>
                        {!!balance
                            ? Object.keys(balance).map(token => <span key={token}>
                                    {token}: {balance[token]}
                                </span>)
                            : 'Loading'}
                    </div>
                </div>
            })}
        </ContentBox>
    }
}

export default Addresses;
