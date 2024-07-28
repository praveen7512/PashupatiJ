import React, { useState } from 'react';

import { ErrorIcon } from '@assets';

import {
  INPUT_LABELS,
  InputAdornmentPosition,
  InputIconPosition,
  InputPresets,
  InputSizes,
  InputType,
  NO_SPACE_REGEX,
  ONLY_NUMBER_REGEX,
  VariantTypes,
} from '@constants';
import { translate } from '@locales';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Container,
  IconButton,
  InputAdornment,
  InputLabel,
  InputProps,
  TextField,
  TextFieldProps,
} from '@mui/material';

import './pjInput-styles.scss'
import { PJCustomTooltip } from '@components';

interface IPJInputProps {
  /** containerClass: is an optional prop which contains the class name for styling the container */
  containerClass?: string;
  /** errorMessage: is an optional prop and it dictates the error message */
  errorMessage?: string;
  /** handleChange: is a required prop and it handles the change of text in input field */
  handleChange: (value: string) => void;
  /** handleCountryCodeChange:*/
  handleCountryCodeChange?: (event: React.SyntheticEvent<Element, Event>, value: any) => void;
  /** hasBorder: is an optional prop and it dictates whether input border will appear or not */
  hasBorder?: boolean;
  /** icon: is an optional prop and it dictates the name of the icon */
  icon?: React.ReactNode;
  /** iconPosition: is an optional prop and it dictates the position of the icon */
  iconPosition?: InputIconPosition;
  /** inputFieldClass: is an optional prop and it dictates the classes for input field */
  inputFieldClass?: string;
  /** inputLabelClass: is an optional prop and it dictates the class of the input label */
  inputLabelClass?: string;
  /** isError: is an optional prop and it dictates whether the input field is in error state or not*/
  isError?: boolean;
  /** isErrorBorder: is an optional prop and it dictates whether to show border on all sides of input field when error occurs */
  isErrorBorder?: boolean;
  /** isCountryCodeRequired : is an optional prop and it dictates whether the country code is shown or not  */
  isCountryCodeRequired?: boolean;
  /** isFullWidth: is an optional prop and it whether input field takes full width  */
  isFullWidth?: boolean;
  /** isLabelError: is an optional prop and it dictates whether to show label error or not */
  isLabelError?: boolean;
  /** isRequired: is an optional prop and it dictates whether the input field is required */
  isRequired?: boolean;
  /** label: is an optional prop and  it dictates the label of the input field */
  label?: string;
  /** placeholder: is an optional prop and  it dictates the placeholder text */
  placeholder?: string;
  /** preset: is an optional prop and it dictates the input preset  */
  preset?: InputPresets;
  /** size: is an optional prop and it dictates the size of the input field */
  size?: InputSizes;
  /** value: is an optional prop and it dictates the value of the input field */
  value?: string;
  /** variant: is an optional prop and it dictates the variant of the input field */
  variant?: VariantTypes;
}

const PJInput = (props: IPJInputProps) => {
  const {
    containerClass = '',
    errorMessage = translate('common.invalid-input'),
    handleChange,
    hasBorder = false,
    icon,
    iconPosition,
    inputFieldClass = '',
    inputLabelClass = '',
    isCountryCodeRequired = false,
    isError = false,
    isErrorBorder = true,
    isFullWidth = true,
    isLabelError = false,
    isRequired,
    label,
    placeholder,
    preset = InputPresets.Text,
    size = InputSizes.Small,
    value = '',
    variant = VariantTypes.Outlined,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const commonInputProps = {
    fullWidth: isFullWidth,
    placeholder: placeholder,
    required: isRequired,
    size: size,
    variant: variant,
  };
  const errorClass = isErrorBorder ? 'fmvInput__valueErrorWithBorder' : 'fmvInput__valueError';
  const inputContainerClass = `fmvInput__container ${containerClass} ${label === INPUT_LABELS.CONTACT_NUMBER && isCountryCodeRequired ? 'fmvInput__wrapper' : ''}`;
  const textFieldClass = `fmvInput__field ${inputFieldClass} ${hasBorder ? 'fmvInput__fieldWithBorder' : ''} ${isError ? errorClass : ''}`;
  const labelClass = `fmvInput__label ${inputLabelClass} ${hasBorder ? 'fmvInput__labelWithBorder' : 'fmvInput__labelWithoutBorder'} ${isLabelError ? 'fmvInput__labelError' : ''}`;

  const handleShowPasswordClick = () => setShowPassword(show => !show);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event;
    const { value } = target;
    if (label === INPUT_LABELS.CONTACT_NUMBER && !value.match(ONLY_NUMBER_REGEX)) {
      return;
    }
    !NO_SPACE_REGEX.test(value) && handleChange(value);
  };

  const getTextFieldComponent = (extraProps: Partial<TextFieldProps>) => {
    const errorText =
      isError && isErrorBorder ? errorMessage || translate('common.invalid-input') : '';

    return (
      <TextField
        {...extraProps}
        {...commonInputProps}
        className={textFieldClass}
        helperText={errorText}
        onChange={handleInputChange}
        value={value}
      />
    );
  };

  const renderComponent = () => {
    let component: React.JSX.Element;
    const inputProps: InputProps =
      variant === VariantTypes.Outlined ? {} : { disableUnderline: true };
    const iconPositionProp =
      iconPosition === InputIconPosition.Left
        ? {
            startAdornment: (
              <InputAdornment position={InputAdornmentPosition.Start}>{icon}</InputAdornment>
            ),
          }
        : {
            endAdornment: (
              <InputAdornment position={InputAdornmentPosition.End}>{icon}</InputAdornment>
            ),
          };

    switch (preset) {
      case InputPresets.Text:
        component = getTextFieldComponent({ InputProps: inputProps });
        break;
      case InputPresets.Password:
        inputProps.endAdornment = (
          <IconButton
            aria-label={translate('components.input.aria-label')}
            className="fmvInput__passwordIcon"
            onClick={handleShowPasswordClick}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        );
        component = getTextFieldComponent({
          InputProps: inputProps,
          type: showPassword ? InputType.Text : InputType.Password,
        });
        break;
      case InputPresets.Icon:
        component = getTextFieldComponent({
          InputProps: { ...inputProps, ...iconPositionProp },
        });
        break;
      default:
        component = <></>;
    }
    return component;
  };

  return (
    <Container className={inputContainerClass}>
      {!!label && (
        <div className={`fmvInput__labelContainer ${containerClass}`}>
          <InputLabel className={labelClass}>{label}</InputLabel>
          {isError && !isErrorBorder && (
            <PJCustomTooltip isError message={errorMessage}>
              <IconButton className="fmvInput__errorIconButton">
                <ErrorIcon />
              </IconButton>
            </PJCustomTooltip>
          )}
        </div>
      )}
      <div className="fmvInput__row">
        {renderComponent()}
      </div>
    </Container>
  );
};

export default React.memo(PJInput);
