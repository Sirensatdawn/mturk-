import * as React from 'react';
import { TextField, Select } from '@shopify/polaris';

interface Props {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

interface SortTypeProps extends Props {
  options: string[];
}

const SearchDelayField = ({ value, onChange }: Props) => {
  return (
    <TextField
      label="Search Delay"
      type="number"
      suffix="seconds"
      min={10}
      autoComplete={false}
      value={value}
      onChange={onChange}
    />
  );
};

const MinimumRewardField = ({ value, onChange }: Props) => {
  return (
    <TextField
      label="Minimum Reward"
      type="number"
      prefix="$"
      autoComplete={false}
      value={value}
      onChange={onChange}
    />
  );
};

const SortTypeField = ({ options, onChange }: SortTypeProps) => {
  return (
    <Select
      label="Sort By"
      options={options.map((option: string) => ({
        label: option,
        value: option
      }))}
      onChange={onChange}
    />
  );
};

export { SearchDelayField, MinimumRewardField, SortTypeField };