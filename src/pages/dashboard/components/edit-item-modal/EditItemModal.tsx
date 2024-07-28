import { useState } from "react";
import { PJButton, PJInput } from "@components";
import './editItemModal-styles.scss';
import { IItem } from '@types';

interface EditItemModalProps {
  item: IItem;
  onEditItem: (updatedItem: IItem) => void;
  onClose: () => void;
}

const EditItemModal = (props: EditItemModalProps) => {
  const { item, onEditItem, onClose } = props;
  const [editedItem, setEditedItem] = useState(item);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isPriceError, setIsPriceError] = useState(false);
  const [isDescriptionError, setIsDescriptionError] = useState(false);
  const [isImageError, setIsImageError] = useState(false);

  const handleTitleInputChange = (value: string) => {
    setEditedItem({ ...editedItem, title: value });
    setIsTitleError(false);
  };

  const handlePriceInputChange = (value: string) => {
    setEditedItem({ ...editedItem, price: value });
    setIsPriceError(false);
  };

  const handleDescriptionInputChange = (value: string) => {
    setEditedItem({ ...editedItem, description: value });
    setIsDescriptionError(false);
  };

  const handleImageInputChange = (value: string) => {
    setEditedItem({ ...editedItem, image: value });
    setIsImageError(false);
  };

  const handleSaveChanges = () => {
    if (editedItem.title.trim() === '') {
      setIsTitleError(true);
      return;
    }
    if (editedItem.price.trim() === '') {
      setIsPriceError(true);
      return;
    }
    if (editedItem.description.trim() === '') {
      setIsDescriptionError(true);
      return;
    }
    if (editedItem.image.trim() === '') {
      setIsImageError(true);
      return;
    }

    onEditItem(editedItem);
    onClose(); 
  };

  return (
    <div className="editItemModal__container">
      <PJInput
        containerClass="editItemModal__inputFieldContainer"
        handleChange={handleTitleInputChange}
        value={editedItem.title}
        label="Name of the product"
        placeholder="Enter the product name here"
        isError={isTitleError}
        errorMessage="This is a required field"
        isFullWidth
        hasBorder
      />
      <PJInput
        containerClass="editItemModal__inputFieldContainer"
        handleChange={handlePriceInputChange}
        value={editedItem.price}
        label="Price of the product"
        placeholder="Enter the product price here"
        isError={isPriceError}
        errorMessage="This is a required field"
        isFullWidth
        hasBorder
      />
      <PJInput
        containerClass="editItemModal__inputFieldContainer"
        handleChange={handleDescriptionInputChange}
        value={editedItem.description}
        label="Description of the product"
        placeholder="Enter the product description here"
        isError={isDescriptionError}
        errorMessage="This is a required field"
        isFullWidth
        hasBorder
      />
      <PJInput
        containerClass="editItemModal__inputFieldContainer"
        handleChange={handleImageInputChange}
        value={editedItem.image}
        label="Image of the product"
        placeholder="Enter the link of product image here"
        isError={isImageError}
        errorMessage="This is a required field"
        isFullWidth
        hasBorder
      />
      <PJButton handleClick={handleSaveChanges} title="Save Changes" buttonClass="editItemModal__button" isFullWidth />
    </div>
  );
};

export default EditItemModal;
