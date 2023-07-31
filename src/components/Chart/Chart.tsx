import React from "react";

import { IProps, IState } from "./Chart.interfaces";

// import styles from "./Chart.module.scss";

// eslint-disable-next-line react/prefer-stateless-function
export class Chart extends React.Component<IProps, IState> {
    override render() {
        const { card } = this.props;

        return (
            <div>
                <div>
                    <div>
                        <img src={card?.icon ?? ""} alt={card?.symbol} />
                        <h1>{card?.title}</h1>
                        <p>{card?.symbol}</p>
                    </div>
                </div>
            </div>
        );
    }
}
