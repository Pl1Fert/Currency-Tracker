import { Component } from "react";

import { MapComponent, Search } from "@/components";

import { IProps, IState } from "./bankCardPage.interfaces";

import styles from "./bankCardPage.module.scss";

// eslint-disable-next-line react/prefer-stateless-function
export default class BankCardPage extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            inputValue: "",
        };
    }

    setInputValue = (newValue: string): void => {
        this.setState((prevState) => ({ ...prevState, inputValue: newValue }));
    };

    override render() {
        const { inputValue } = this.state;
        return (
            <div className={styles.mapContainer}>
                <Search inputValue={inputValue} setInputValue={this.setInputValue} />
                <MapComponent inputValue={inputValue} />
            </div>
        );
    }
}
