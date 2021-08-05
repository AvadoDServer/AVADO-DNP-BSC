import React from "react";
import "./Dashboard.css";
import Web3 from "web3";
import spinner from "../../../assets/spinner.svg";
import checkmark from "../../../assets/green-checkmark-line.svg";

const Comp = () => {
    const [isSynced, setIsSycned] = React.useState(false);
    const [clockTick, setClockTick] = React.useState(0);

    const web3 = new Web3('https://bsc.avadopackage.com');

    React.useEffect(() => {
        const timer = setInterval(() => {
            setClockTick(c => c + 1);
        }, 1000 * 15);
        return (() => {
            console.log("Clean up timer");
            clearInterval(timer);
        });
    }, []);

    React.useEffect(() => {
        const checkIfSyncing = async () => {
            const isSyncing = await web3.eth.isSyncing();
            setIsSycned(!isSyncing);
        }

        checkIfSyncing();
    }, [clockTick]);


    return (
        <div className="dashboard">
            <section className="is-medium has-text-white">
                <div className="columns is-mobile">
                    <div className="column is-8-desktop is-10">
                        <h1 className="title is-1 is-spaced has-text-white">BSC node</h1>
                    </div>
                </div>
                <p className="">A node for interacting with the BSC network</p>
            </section>
            <br />
            <div className="setting">
                <h3 className="is-size-3 has-text-white">Node status</h3>

                <section className="is-medium has-text-white">

                    <table className="table-profile">
                        <tbody>
                            <tr>
                                <th colSpan="1"></th>
                                <th colSpan="2"></th>
                            </tr>
                            <tr>
                                <td>RPC URL:</td>
                                <td>https://bsc.avadopackage.com</td>
                            </tr>
                        </tbody>
                    </table>

                    <br/>
                    {!isSynced ? (
                        <div className="level">
                            <div className="level-left">
                                <span class="icon is-medium ">
                                    <img alt="spinner" src={spinner} />
                                </span>
                                <p className="has-text-white is-size-5 has-text-weight-bold">Waiting for BSC node to finish syncing</p>
                            </div>
                        </div>
                    ) : (
                        <div className="level">
                            <div className="level-left">
                                <img className="icon is-medium" alt="checkmark" src={checkmark} />
                                <p className="has-text-white is-size-5 has-text-weight-bold">BSC node is ready</p>
                            </div>
                        </div>
                    )
                    }
                </section>
                <br/>
                <a href="http://my.avado/#/Packages/bsc.avado.dnp.dappnode.eth/detail" target="_blank">show node logs</a>
            </div>
        </div>
    )

    return null;
};

export default Comp;