import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Typography } from '@mui/material';

import './emptyCard-styles.scss';

interface IEmptyCardProps {
  handleClick: () => void;
}

const EmptyCard = (props : IEmptyCardProps) => {
  const { handleClick } = props;
  return (
    <div className="emptyCard__container" onClick={handleClick}>
        <AddCircleRoundedIcon className="emptyCard__icon"/>
        <Typography className="emptyCard__text">Add New Item</Typography>
    </div>
  )
}

export default EmptyCard;
