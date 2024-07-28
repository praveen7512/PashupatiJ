import React from 'react';

import { CrossIcon } from '@assets';
import { Fade, IconButton, Modal, ModalOwnProps, Typography } from '@mui/material';

import './pjModal-styles.scss';

interface PJModalProps extends ModalOwnProps {
  /** open: is an required prop for modal open/closed state */
  open: boolean;
  /** onClose: is an callback function triggered on modal close */
  onClose: () => void;
  /** renderHeader:is an  optional prop for custom modal header component */
  renderHeader?: () => React.JSX.Element;
  /** headerClassName: is an optional prop that provides a class to the modal header */
  headerClassName?: string;
  /** headerTitle: is an optional prop for header title */
  headerTitle?: string;
  /** headerTitleClassName: is an optional prop that provides a class to the header title */
  headerTitleClassName?: string;
  /** closeIconClassName: is an optional prop that provides a class to the close icon */
  closeIconClassName?: string;
  /** subHeaderTitle: is an optional prop for subheading title */
  subHeaderTitle?: string;
  /** subHeaderTitleClassName: is an optional prop that provides a class to the subheader title */
  subHeaderTitleClassName?: string;
}

const PJModal: React.FC<PJModalProps> = ({
  open,
  onClose,
  children,
  className,
  renderHeader,
  headerTitle,
  headerClassName = '',
  headerTitleClassName = '',
  subHeaderTitle,
  subHeaderTitleClassName = '',
  closeIconClassName,
  ...rest
}) => {
  const getHeaderContent = () => {
    let Component: React.JSX.Element | null = null;

    if (renderHeader) {
      Component = renderHeader();
    } else if (headerTitle) {
      Component = (
        <div className="fmv-modal__left-header-container">
          <Typography className={`fmv-modal__header-title ${headerTitleClassName}`}>
            {headerTitle}
          </Typography>
          <Typography className={`fmv-modal__sub-header-title ${subHeaderTitleClassName}`}>
            {subHeaderTitle}
          </Typography>
        </div>
      );
    }

    return Component;
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition {...rest}>
      <>
        <Fade in={open}>
          <div className={`fmv-modal__container ${className}`}>
            {getHeaderContent() && ( // Render header only if content exists
              <div className={`fmv-modal__header ${headerClassName}`}>{getHeaderContent()}</div>
            )}
            <IconButton
              className={`fmv-modal__iconContainer ${closeIconClassName}`}
              onClick={onClose}>
              <CrossIcon />
            </IconButton>
            {children}
          </div>
        </Fade>
      </>
    </Modal>
  );
};

export default PJModal;
