import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../types';
import { Caption } from '@shopify/polaris';

interface Props {
  readonly timeNextSearch: Date | null;
  readonly searchingActive: boolean;
}

interface State {
  readonly timeUntilNextSearch: number | null;
}

const mapState = (state: RootState): Props => ({
  timeNextSearch: state.timeNextSearch,
  searchingActive: state.searchingActive
});

class SearchTimer extends React.PureComponent<Props, State> {
  public readonly state = { timeUntilNextSearch: null };
  static readonly tickRate: number = 16.67;
  private timerId: number;
  private dateNumNextSearch: number;

  componentDidMount() {
    if (this.props.timeNextSearch && this.props.searchingActive) {
      this.dateNumNextSearch = this.props.timeNextSearch.valueOf();
      this.startTimer();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.timeNextSearch) {
      clearInterval(this.timerId);
      this.dateNumNextSearch = nextProps.timeNextSearch.valueOf();
      this.startTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  private startTimer = () => {
    this.timerId = window.setInterval(
      () => this.tick(),
      SearchTimer.tickRate
    );
  };

  static calculateTimeUntilNextSearch = (nextSearch: number): number => {
    return Math.max(nextSearch - Date.now(), 0);
  };

  private tick = () => {
    if (this.props.timeNextSearch && this.props.searchingActive) {
      this.setState({
        timeUntilNextSearch: SearchTimer.calculateTimeUntilNextSearch(
          this.dateNumNextSearch
        )
      });
    }
  };

  public render() {
    const { timeNextSearch, searchingActive } = this.props;
    return timeNextSearch && searchingActive ? (
      <Caption>Next search in: {this.state.timeUntilNextSearch}</Caption>
    ) : (
      <div />
    );
  }
}

export default connect(mapState)(SearchTimer);