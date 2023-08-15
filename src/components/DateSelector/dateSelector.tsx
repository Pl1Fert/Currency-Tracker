import { PureComponent, SyntheticEvent } from "react";
import { connect, ConnectedProps } from "react-redux";

import { DateService } from "@/services";
import { RootState } from "@/store";
import { combineClassNames } from "@/utils";

import { IProps, IState } from "./dateSelector.interfaces";

import styles from "./dateSelector.module.scss";

class DateSelector extends PureComponent<Props, IState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            dates: DateService.getPreviousDates(),
        };
    }

    handleDateChange = (e: SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;
        const { handleChange } = this.props;
        handleChange(target.value);
    };

    override render() {
        const { dates } = this.state;
        const { name, defaultValue, darkTheme } = this.props;

        return (
            <select
                name={name}
                defaultValue={dates.at(defaultValue)}
                onChange={this.handleDateChange}
                className={combineClassNames(
                    styles.dateSelector!,
                    styles.dateSelectorDarkTheme!,
                    darkTheme
                )}>
                {dates.map((date) => (
                    <option value={date} key={date}>
                        {date}
                    </option>
                ))}
            </select>
        );
    }
}

const mapStateToProps = (state: RootState, ownProps: IProps) => ({
    darkTheme: state.theme.darkTheme,
    ...ownProps,
});

const connected = connect(mapStateToProps);

type Props = ConnectedProps<typeof connected>;

const connector = connected(DateSelector);

export { connector as DateSelector };
