import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import './dashboardPage-styles.scss';
import { AddCategoryModal, AddItemModal, EditCategoryModal, EmptyCard, ItemsCard, NavBar } from './components';
import PJModal from 'components/modal/PJModal';
import { IItem, IItemsState } from '@types';
import { DeleteIcon, EditIcon } from '@assets';

const DashboardPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState(['Best Sellers']);
  const [selectedCategory, setSelectedCategory] = useState('Best Sellers');
  const [items, setItems] = useState<IItemsState>({'Best Sellers':[]});
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);

  useEffect(() => {
    if (!categories.includes(selectedCategory)) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleToggleItemModal = () => {
    setIsItemModalOpen(!isItemModalOpen);
  }

  const handleToggleEditCategoryModal = () => {
    setIsEditCategoryModalOpen(!isEditCategoryModalOpen);
  }

  const handleAddCategory = (categoryName: string) => {
    if (categoryName.trim() === '') {
      alert('Category name cannot be empty! Please enter a category name.');
      return;
    }
    setCategories([...categories, categoryName.trim()]);
    setItems({ ...items, [categoryName.trim()]: [] });
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleAddItem = (item: IItem) => {
    setItems({
      ...items,
      [selectedCategory]: [...items[selectedCategory], item],
    });
    handleToggleItemModal();
  };

  const handleUpdateItem = (updatedItem: IItem) => {
    const updatedItems = items[selectedCategory].map((item) =>
      item.key === updatedItem.key ? updatedItem : item
    );
    setItems({
      ...items,
      [selectedCategory]: updatedItems,
    });
  };

  const handleEditCategory = (updatedCategory: string) => {
    const updatedCategories = categories.map(category =>
      category === selectedCategory ? updatedCategory : category
    );

    const updatedItems = Object.keys(items).reduce((acc, key) => {
      if (key === selectedCategory) {
        acc[updatedCategory] = items[key];
      } else {
        acc[key] = items[key];
      }
      return acc;
    }, {} as IItemsState);

    setCategories(updatedCategories);
    setItems(updatedItems);
    setSelectedCategory(updatedCategory);
    setIsEditCategoryModalOpen(false);
  };

  const handleDeleteItem = (itemKey: number) => {
    const updatedItems = items[selectedCategory].filter(item => item.key !== itemKey);
    setItems({
      ...items,
      [selectedCategory]: updatedItems,
    });
  };

  const handleDeleteCategory = () => {
    const confirmed = window.confirm(`Are you sure you want to delete the category "${selectedCategory}"?`);
    if (!confirmed) return;

    const updatedCategories = categories.filter(category => category !== selectedCategory);
    const { [selectedCategory]: removedCategory, ...updatedItems } = items;
    setCategories(updatedCategories);
    setItems(updatedItems);
    if (selectedCategory === categories[0]) {
      setSelectedCategory(updatedCategories.length > 0 ? updatedCategories[0] : '');
    } else {
      setSelectedCategory(updatedCategories[0]);
    }
  };

  return (
    <div className="dashboardPage__container">
      <div className="dashboardPage__header">
        <Typography className="dashboardPage__title">Pashupati Jewellers</Typography>
      </div>
      <div className="dashboardPage__subContainer">
        <NavBar categories={categories} handleOpenModal={handleToggleModal} handleCategoryClick={handleCategoryClick} selectedCategory={selectedCategory} />
        {selectedCategory && (
          <div className="dashboardPage__cardsContainer">
            <div className="dashboardPage__cardsTitleContainer">
              <Typography className="dashboardPage__cardsContainerTitle">{selectedCategory}</Typography>
              <div className="dashboardPage__cardsIconsContainer">
                <div onClick={handleToggleEditCategoryModal}> <EditIcon /> </div>
                <div onClick={handleDeleteCategory}> <DeleteIcon /> </div>
              </div>
            </div>
            <div className="dashboardPage__cardsSubContainer">
              {items[selectedCategory]?.map((item, index) => (
                <ItemsCard key={index} item={item} onItemUpdate={handleUpdateItem} onItemDelete={handleDeleteItem} />
              ))}
              <EmptyCard handleClick={handleToggleItemModal} />
            </div>
          </div>
        )}
      </div>
      <PJModal open={openModal} onClose={handleToggleModal} headerTitle="Add New Category" subHeaderTitle="Add details of the new category below">
        <AddCategoryModal onAddCategory={handleAddCategory} onClose={handleToggleModal} />
      </PJModal>
      <PJModal open={isItemModalOpen} onClose={handleToggleItemModal} headerTitle="Add New Item" subHeaderTitle="Add details of the new item below">
        <AddItemModal onAddItem={handleAddItem} />
      </PJModal>
      <PJModal open={isEditCategoryModalOpen} onClose={handleToggleEditCategoryModal} headerTitle="Edit category" subHeaderTitle="Add details of the new item below">
        <EditCategoryModal category={selectedCategory} onClose={handleToggleEditCategoryModal} onEditCategory={handleEditCategory} />
      </PJModal>
    </div>
  );
};

export default DashboardPage;
