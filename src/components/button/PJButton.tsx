import React, { useCallback, useMemo } from 'react';

import { ButtonPreset, ButtonVariant } from '@constants';
import { Button, Typography } from '@mui/material';

import './pjButton-styles.scss';

interface PJButtonProps {
  /** buttonClass: is an optional prop that provides a class to button for styling */
  buttonClass?: string;
  /** buttonType: is an optional prop that states the button preset */
  buttonType?: ButtonPreset;
  /** buttonVariant: is an optional prop that states variant of the button */
  buttonVariant?: ButtonVariant;
  /** handleClick: is a required prop that handles the action on button click */
  handleClick: () => void;
  /** icon: is an optional prop that provides the icon when required */
  icon?: React.ReactNode;
  /** isDisabled: is an optional prop that states whether button is disabled or not */
  isDisabled?: boolean;
  /** isFullWidth: is an optional prop to provide full width to the button */
  isFullWidth?: boolean;
  /** title: is a required prop that states the button title */
  title: string;
}

const PJButton = (props: PJButtonProps) => {
  const {
    buttonClass = '',
    buttonType = ButtonPreset.RedBackground,
    buttonVariant = ButtonVariant.Contained,
    handleClick,
    icon,
    isDisabled = false,
    isFullWidth = true,
    title,
  } = props;

  const getStyles = useCallback(() => {
    let containerStyle = '';
    let textStyle = '';

    const buttonPreset = isDisabled ? ButtonPreset.Disable : buttonType;
    switch (buttonPreset) {
      case ButtonPreset.LeftRounded:
        containerStyle = 'fmvButton__leftRounded';
        textStyle = 'fmvButton__leftRoundedText';
        break;
      case ButtonPreset.RightRounded:
        containerStyle = 'fmvButton__rightRounded';
        textStyle = 'fmvButton__rightRoundedText';
        break;
      case ButtonPreset.Disable:
        containerStyle = 'fmvButton__disable';
        textStyle = 'fmvButton__disableText';
        break;
      case ButtonPreset.GreyBackground:
        containerStyle = 'fmvButton__greyContainer';
        break;
      case ButtonPreset.LightPurpleBackground:
        containerStyle = 'fmvButton__lightPurpleContainer';
        textStyle = 'fmvButton__lightPurpleContainerText';
        break;
      case ButtonPreset.PurpleBackground:
        containerStyle = 'fmvButton__purpleContainer';
        break;
      case ButtonPreset.RedBackground:
        containerStyle = 'fmvButton__redContainer';
        break;
      case ButtonPreset.Borders:
        containerStyle = 'fmvButton__borders';
        break;
    }
    return { containerStyle, textStyle };
  }, [buttonType, isDisabled]);

  const { containerStyle, textStyle } = useMemo(() => getStyles(), [buttonType, isDisabled]);

  return (
    <Button
      className={`fmvButton__container ${containerStyle} ${buttonClass}`}
      disableRipple={isDisabled}
      fullWidth={isFullWidth}
      onClick={handleClick}
      disabled={isDisabled}
      variant={buttonVariant}>
      <Typography className={`fmvButton__text ${textStyle}`}>
        {title}
        {icon}
      </Typography>
    </Button>
  );
};

export default React.memo(PJButton);
