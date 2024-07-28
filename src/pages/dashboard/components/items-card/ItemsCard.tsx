import { Typography } from '@mui/material';
import './itemsCard-styles.scss';
import { PJButton } from '@components';
import { MoreOptionsIcon } from '@assets';
import { useState } from 'react';
import { IItem } from '@types';
import PJModal from 'components/modal/PJModal';
import { EditItemModal } from '..';

interface ItemsCardProps {
  item: IItem;
  onItemUpdate: (updatedItem: IItem) => void;
  onItemDelete: (itemKey: number) => void;
}

const ItemsCard = (props: ItemsCardProps) => {
  const { item, onItemUpdate, onItemDelete } = props;
  const [areOptionsVisible, setAreOptionsVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    setAreOptionsVisible(false);
  };

  const handleEditItem = (updatedItem: IItem) => {
    // Logic to handle item edit (API call or state update)
    console.log("Updated Item:", updatedItem);
    onItemUpdate(updatedItem); // Update item in parent component's state
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    onItemDelete(item.key); 
  };

  return (
    <div className="itemsCard__container">
      <div className="itemsCard__imageContainer">
        <div className="itemsCard__icon" onClick={() => setAreOptionsVisible(!areOptionsVisible)}>
          <MoreOptionsIcon />
        </div>
        {areOptionsVisible && (
          <div className="itemsCard__optionsContainer">
            <div className="itemsCard__option" onClick={handleEditClick}>
              <Typography className="itemsCard__optionText">Edit</Typography>
            </div>
            <div className="itemsCard__option" onClick={handleDelete}>
              <Typography className="itemsCard__optionText">Delete</Typography>
            </div>
          </div>
        )}
        <img className="itemsCard__image" src={item.image} alt={item.title} />
      </div>
      <div className="itemsCard__contentContainer">
        <div className="itemsCard__titleContainer">
          <Typography className="itemsCard__title">{item.title}</Typography>
          <Typography className="itemsCard__subTitle">{item.price}</Typography>
        </div>
        <div className="itemsCard__descriptionContainer">
          <p className="itemsCard__description">{`${item.description.slice(0, 150)}`}</p>
          <PJButton handleClick={() => {}} title="Read More" buttonClass="itemsCard__description" />
        </div>
      </div>
      {isEditModalOpen && (
        <PJModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          headerTitle="Edit Item"
          subHeaderTitle="Update item details below"
        >
          <EditItemModal item={item} onEditItem={handleEditItem} onClose={() => setIsEditModalOpen(false)} />
        </PJModal>
      )}
    </div>
  );
};

export default ItemsCard;
