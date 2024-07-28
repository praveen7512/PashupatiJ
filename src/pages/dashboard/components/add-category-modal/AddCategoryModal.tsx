import { useState } from 'react';
import { PJInput, PJButton } from '@components';
import './addCategoryModal-styles.scss';

interface IAddCategoryModalProps {
  onAddCategory: (categoryName: string) => void;
  onClose: () => void;
}

const AddCategoryModal = (props:IAddCategoryModalProps) => {
  const { onAddCategory, onClose } = props;
  const [categoryName, setCategoryName] = useState('');

  const handleInputChange = (value:string) => {
    setCategoryName(value);
  };

  const handleAddCategory = () => {
    if (!categoryName.trim()) {
      alert('Category name cannot be empty!');
      return;
    }
    onAddCategory(categoryName);
    setCategoryName('');
    onClose();
  };

  return (
      <div className="addItemModal__container">
        <PJInput
        containerClass="addItemModal__inputFieldContainer"
          handleChange={handleInputChange}
          value={categoryName}
          label="Category Name"
          placeholder="Enter the category name here"
          isFullWidth
          hasBorder
        />
        <PJButton handleClick={handleAddCategory} title="Add" buttonClass='addItemModal__button' isFullWidth />
      </div>
  );
};

export default AddCategoryModal;
