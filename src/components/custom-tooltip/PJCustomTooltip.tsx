import React from 'react';

import './pjCustomTooltip-styles.scss';

interface ICustomTooltipProps {
  /** children: is a required prop which render children components */
  children: React.ReactNode;
  /** isError: is an optional prop which states whether the tooltip is for error or not */
  isError?: boolean;
  /** message: is a required prop which is for the tooltip message */
  message: string;
}

const PJCustomTooltip = (props: ICustomTooltipProps) => {
  const { children, isError = false, message } = props;
  return (
    <div className={`tooltip__container ${isError ? 'tooltip__error' : ''}`} title={message}>
      {children}
    </div>
  );
};

export default PJCustomTooltip;
