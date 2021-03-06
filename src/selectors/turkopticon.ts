import { createSelector } from 'reselect';
import { RootState, SearchResults, SearchResult } from '../types';
import { calculateAverageScore, hasAValidScore } from '../utils/turkopticon';

const searchResultSelector = (state: RootState) => state.search;

export const minTopticonScoreEnabled = (state: RootState) =>
  state.topticonSettings.hideBelowThresholdEnabled;

export const hideNoToEnabled = (state: RootState) =>
  state.topticonSettings.hideNoToEnabled;

export const minWeightedTopticonScore = (state: RootState) =>
  state.topticonSettings.minimumWeightedTO;

export const filterNoTO = createSelector(
  [ searchResultSelector, hideNoToEnabled ],
  (hits: SearchResults, enabled: boolean) => {
    return enabled
      ? hits.filter(
          (hit: SearchResult) =>
            !!hit.requester.turkopticon &&
            hasAValidScore(hit.requester.turkopticon.attrs)
        )
      : hits;
  }
);

export const filterBelowTOThreshold = createSelector(
  [ filterNoTO, minWeightedTopticonScore, minTopticonScoreEnabled ],
  (hits: SearchResults, minScore: number, minToEnabled: boolean) => {
    /**
     * High complexity code. Todo: separate these into individual selectors and compose them instead of this.
     * Basically: does nothing if setting isn't enabled, but if it is...
     * Keeps HITs with TO above minimum score or if it has no reviews at all.
     */
    if (minToEnabled) {
      return hits.filter((hit: SearchResult): boolean => {
        if (!hit.requester.turkopticon) {
          return true;
        } else {
          const averageScore = calculateAverageScore(
            hit.requester.turkopticon.attrs
          );
          return averageScore ? averageScore >= minScore : true;
        }
      });
    } else {
      return hits;
    }
  }
);
