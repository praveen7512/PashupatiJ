import { useState, useRef } from "react";
import { PJButton, PJInput, PJRadioInput } from "@components";
import './editItemModal-styles.scss';
import { IItem } from '@types';
import { API_KEY, API_PATHS } from '@constants';
import CollectionsIcon from '@mui/icons-material/Collections';
import { Typography } from "@mui/material";

interface EditItemModalProps {
  item: IItem;
  onEditItem: (updatedItem: IItem) => void;
  onClose: () => void;
}

const EditItemModal = (props: EditItemModalProps) => {
  const { item, onEditItem, onClose } = props;
  const [editedItem, setEditedItem] = useState<IItem>(item);
  const [existingImages] = useState<File[]>(
    Array.isArray(item.imageNames) 
      ? item.imageNames.map(img => img instanceof File ? img : new File([], img))
      : []
  );
  const [newImages, setNewImages] = useState<File[]>([]);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isPriceError, setIsPriceError] = useState(false);
  const [isDescriptionError, setIsDescriptionError] = useState(false);
  let [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof IItem, value: string) => {
    setEditedItem({ ...editedItem, [field]: value });
    switch (field) {
      case 'title':
        setIsTitleError(false);
        break;
      case 'amount':
        setIsPriceError(false);
        break;
      case 'description':
        setIsDescriptionError(false);
        break;
    }
  };

  const handleImageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setNewImages(prevImages => [...prevImages, ...Array.from(files)]);
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleSaveChanges = async () => {
    if (editedItem.title.trim() === '') {
      setIsTitleError(true);
      return;
    }
    if (editedItem.amount.toString().trim() === '') {
      setIsPriceError(true);
      return;
    }
    const numericPrice = parseFloat(editedItem.amount.toString());
    if (isNaN(numericPrice) || numericPrice <= 0) {
      setIsPriceError(true);
      errorMessage = "Please enter a valid positive number for the price.";
      setErrorMessage(errorMessage);
      return;
    }
    if (editedItem.description.trim() === '') {
      setIsDescriptionError(true);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('title', editedItem.title);
    formData.append('description', editedItem.description);
    formData.append('amount', numericPrice.toString());
    formData.append('category', editedItem.category.toString());
    formData.append('gender', editedItem.gender);
    formData.append('metalType', editedItem.metalType);

    existingImages.forEach((image) => {
      formData.append('existingImages', image.name);
    });

    newImages.forEach((image) => {
      formData.append('newImages', image);
    });

    try {
      const response = await fetch(`${API_PATHS.BASE_URL}/api/v1/product/${editedItem._id}`, {
        method: 'PUT',
        headers: {
          'X-API-Key': API_KEY,
        },
        body: formData,
      });

      const result = await response.json();
      if (result && result.data) {
        const updatedItem: IItem = {
          ...editedItem,
          title: result.data.title,
          amount: result.data.amount,
          description: result.data.description,
          gender: result.data.gender,
          metalType: result.data.metalType,
          imageNames: [...existingImages, ...newImages],
        };
        onEditItem(updatedItem);
        onClose();
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="editItemModal__container">
      <PJInput
        containerClass="editItemModal__inputFieldContainer"
        handleChange={(value) => handleInputChange('title', value)}
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
        handleChange={(value) => handleInputChange('amount', value)}
        value={editedItem.amount.toString()}
        label="Price of the product"
        placeholder="Enter the product price here"
        isError={isPriceError}
        errorMessage="Please enter a valid price"
        isFullWidth
        hasBorder
      />
      <PJInput
        containerClass="editItemModal__inputFieldContainer"
        handleChange={(value) => handleInputChange('description', value)}
        value={editedItem.description}
        label="Description of the product"
        placeholder="Enter the product description here"
        isError={isDescriptionError}
        errorMessage="This is a required field"
        isFullWidth
        hasBorder
      />
      <PJRadioInput
        selectedValue={editedItem.gender}
        handleChange={(value) => handleInputChange('gender', value)}
        label="Select Gender"
        options={[
          { value: 'female', label: 'Female' },
          { value: 'male', label: 'Male' },
          { value: 'unisex', label: 'Unisex' },
        ]}
      />
      <PJRadioInput
        selectedValue={editedItem.metalType}
        handleChange={(value) => handleInputChange('metalType', value)}
        label="Select Material"
        options={[
          { value: 'gold', label: 'Gold' },
          { value: 'silver', label: 'Silver' },
          { value: 'platinum', label: 'Platinum' },
          { value: 'other', label: 'Other' },
        ]}
      />
      <div className="editItemModal__imageContainer">
        <Typography className="editItemModal__imageContainerTitle">Add new product images</Typography>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          multiple 
          onChange={handleImageInputChange}
        />
        <CollectionsIcon style={{ fontSize: 40, cursor: 'pointer' }} onClick={handleIconClick} />
      </div>
      <PJButton
        handleClick={handleSaveChanges}
        title={isSubmitting ? "Saving..." : "Save Changes"}
        buttonClass="editItemModal__button"
        isFullWidth
      />
    </div>
  );
};

export default EditItemModal;