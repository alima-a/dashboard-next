import * as React from 'react';

export const Line = (props: any) => {
  // We save the last props to the global so that tests can read them
  (window as any).__lastLineProps = props;
  return <div data-testid="mock-line" />;
};
