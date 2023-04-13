import {useState} from "react";
import {ethers} from "ethers";
import{utils} from "../utils/utils.js";


const ButtonState = { Normal: 0, Loading: 1, Disabled: 2 };


const Interface = () => {
    const [account, updateAccount] = useState(null);
    const [metamaskButtonState, updateMetamaskButtonState] = useState(ButtonState.Normal);


    const connectMetamask = async () => {
        try{
            updateMetamaskButtonState(ButtonState.Disabled);
            if(!window.ethereum){
                alert("Please install Metamask to use this app.");
                throw "no-metamask";
            }

            var accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            var chainId = window.ethereum.networkVersion;

            //if(chainId != "5"){
            //    alert("Please switch to Goerli Testnet");
            //    throw "wrong-chain";
            //}

            var activeAccount = accounts[0];
            var balance = await window.ethereum.request({ method: "eth_getBalance", params: [activeAccount, "latest"] });
            console.log(balance.toString())
            //balance = utils.moveDecimalLeft(ethers.BigNumber.from(balance).toString(), 18);

            var newAccountState = {
                chainId: chainId,
                address: activeAccount,
                balance: balance
            };
            updateAccount(newAccountState);
        }catch(e){
            console.log(e);
        }

        updateMetamaskButtonState(ButtonState.Normal);
    };
    
    return(
        <div>
            <nav className="navbar navbar-nav fixed-top bg-dark text-light">
                {
                    !!account ? (
                        <div className="container">
                            <div className="navbar-left">
                                <span><strong>ChainId:</strong></span>
                                <br/>
                                <span>{account.chainId}</span>
                            </div>
                            <div className="navbar-right">
                                <span><strong>{account.address.slice(0, 12) + "..."}</strong></span>
                                <br/>
                                <span className="small">{account.balance.slice(0, 10) + ((account.balance.length > 10) ? ("...") : (""))} ETH</span>
                            </div>
                        </div>
                    ) : (
                        <div className="container">
                            <div className="navbar-left"><h5>NFTA-Tornado</h5></div>
                            <div className="navbar-right">
                                <button 
                                    className="btn btn-primary" 
                                    onClick={connectMetamask}
                                    disabled={metamaskButtonState == ButtonState.Disabled}    
                                >Connect Metamask</button>
                            </div>
                        </div>
                    )
                }
                
            </nav>

        </div>
    )
};

export default Interface;