import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import './itemsCard-styles.scss';
import { PJButton } from '@components';
import { MoreOptionsIcon } from '@assets';
import { IItem } from '@types';
import PJModal from 'components/modal/PJModal';
import { EditItemModal } from '..';
import { API_KEY, API_PATHS } from '@constants';

interface ItemsCardProps {
  item: IItem;
  onItemUpdate: (updatedItem: IItem) => void;
  onItemDelete: (item: IItem) => void;
}

const ItemsCard: React.FC<ItemsCardProps> = ({ item, onItemUpdate, onItemDelete }) => {
  const [areOptionsVisible, setAreOptionsVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    setAreOptionsVisible(false);
  };

  const handleEditItem = async (updatedItem: IItem) => {
    setError(null);
    if (updatedItem.title.trim() === '') {
      setError('Title is required');
      return;
    }
    if (updatedItem.amount === '') {
      setError('Please enter a valid price.');
      return;
    }
    if (updatedItem.description.trim() === '') {
      setError('Description is required');
      return;
    }
    if (updatedItem.imageNames.length === 0) {
      setError('Please add at least one image.');
      return;
    }

    const formData = new FormData();
    formData.append('title', updatedItem.title);
    formData.append('description', updatedItem.description);
    formData.append('amount', updatedItem.amount.toString());
    formData.append('category', updatedItem.category.toString());
    formData.append('gender', updatedItem.gender);
    formData.append('metalType', updatedItem.metalType);

    updatedItem.imageNames.forEach((image) => {
      if (image instanceof File) {
        formData.append('images', image);
      } else {
        formData.append('existingImages', image);
      }
    });

    try {
      const response = await fetch(`${API_PATHS.BASE_URL}/api/v1/product/${updatedItem._id}`, {
        method: 'PUT',
        headers: {
          'X-API-Key': API_KEY
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      onItemUpdate({
        ...updatedItem,
        title: result.data.title,
        amount: result.data.amount,
        description: result.data.description,
        gender: result.data.gender,
        metalType: result.data.metalType,
        imageNames: result.data.imageNames || updatedItem.imageNames
      });
      
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating product:', error);
      setError(error instanceof Error ? error.message : 'Failed to update product. Please try again.');
    }
  };
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_PATHS.BASE_URL}/api/v1/product/${item._id}`, {
        method: 'DELETE',
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      onItemDelete(item);
    } catch (error) {
      console.error("Failed to delete item:", error);
      setError("Failed to delete item. Please try again later.");
    }
  };

  const handleReadMore = () => {
    navigate(`/items/${item._id}`, { state: { item } });
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
        <img
          className="itemsCard__image"
          src={
            item.imageNames && item.imageNames.length > 0 
              ? (typeof item.imageNames[0] === 'string' 
                  ? item.imageNames[0] 
                  : URL.createObjectURL(item.imageNames[0] as File))
              : 'path/to/default/image.jpg'
          }
          alt={item.title}
        />
      </div>
      <div className="itemsCard__contentContainer">
        <div className="itemsCard__titleContainer">
          <Typography className="itemsCard__title">{item.title}</Typography>
          <Typography className="itemsCard__subTitle">{item.amount}</Typography>
        </div>
        <div className="itemsCard__descriptionContainer">
          <p className="itemsCard__description">{item.description.slice(0, 150)}</p>
          <PJButton handleClick={handleReadMore} title="Read More" buttonClass="itemsCard__description" />
        </div>
      </div>
      {isEditModalOpen && (
        <PJModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          headerTitle="Edit Item"
          subHeaderTitle="Update item details below"
        >
          <EditItemModal 
            item={item} 
            onEditItem={handleEditItem} 
            onClose={() => setIsEditModalOpen(false)} 
          />
        </PJModal>
      )}
    </div>
  );
};

export default ItemsCard;