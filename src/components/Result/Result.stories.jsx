import Result from './Result';

export default {
  title: 'Components/Result',
  component: Result,
};

export const Default = {
  args: { winner: 1, isTie: false, onClose: () => {} },
};

export const Tie = {
  args: { winner: null, isTie: true, onClose: () => {} },
};
