import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import './dashboardPage-styles.scss';
import { AddCategoryModal, AddItemModal, EditCategoryModal, EmptyCard, ItemsCard, NavBar } from './components';
import PJModal from 'components/modal/PJModal';
import { Category, IItem, IItemsState } from '@types';
import { DeleteIcon, EditIcon } from '@assets';
import { 
  fetchCategories, 
  fetchProductsByCategoryId, 
  addCategory, 
  updateCategory, 
  deleteCategory, 
  deleteItem 
} from '../../utils/api'; 

const DashboardPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [items, setItems] = useState<IItemsState>({ '': [] });
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [products, setProducts] = useState<IItem[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const fetchedCategories = await fetchCategories(); 
        console.log('Fetched categories:', fetchedCategories); 
  
        if (fetchedCategories.length > 0) {
          setCategories(fetchedCategories);
          setSelectedCategory(fetchedCategories[0].name); 
          setSelectedCategoryId(fetchedCategories[0].id);
          
          const fetchedProducts = await fetchProductsByCategoryId(fetchedCategories[0].id);
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchInitialData();
  }, []);      

  useEffect(() => {
    if (!categories.some((cat) => cat.name === selectedCategory) && categories.length > 0) {
      setSelectedCategory(categories[0].name);
    }
  }, [categories]);

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleToggleItemModal = () => {
    setIsItemModalOpen(!isItemModalOpen);
  };

  const handleToggleEditCategoryModal = () => {
    setIsEditCategoryModalOpen(!isEditCategoryModalOpen);
  };

  const handleAddCategory = async (categoryName: string) => {
    if (categoryName.trim() === '') {
      alert('Category name cannot be empty! Please enter a category name.');
      return;
    }

    try {
      const newCategory = await addCategory(categoryName); // Use the function here
      console.log('Category successfully added to the database:', newCategory);

      setCategories([...categories, newCategory]);
      setItems({ ...items, [newCategory.name]: [] });
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };

  const handleCategoryClick = async (category: string) => {
    setSelectedCategory(category);
    const selectedCat = categories.find(cat => cat.name === category);
    console.log('Selected category:', selectedCat?.id);
    
    if (selectedCat) {
      setSelectedCategoryId(selectedCat.id);
      setProducts([]);

      try {
        const fetchedProducts = await fetchProductsByCategoryId(selectedCat.id); // Use the function here
        console.log('Fetched products:', fetchedProducts);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  }; 

  const handleAddItem = (item: IItem) => {
    const selectedItems = items[selectedCategory] || [];
    setItems({
      ...items,
      [selectedCategory]: [...selectedItems, item],
    });
    handleToggleItemModal();
  };    

  const handleUpdateItem = (updatedItem: IItem) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product._id === updatedItem._id ? updatedItem : product
      )
    );
  };

  const handleEditCategory = async (updatedCategory: string) => {
    if (updatedCategory.trim() === '') {
      alert('Category name cannot be empty!');
      return;
    }
    const selectedCategoryObj = categories.find(category => category.name === selectedCategory);
  
    console.log('Selected Category Object:', selectedCategoryObj);
  
    if (!selectedCategoryObj) {
      alert('Category not found!');
      return;
    }
  
    try {
      const updatedCategoryData = await updateCategory(selectedCategoryObj.id, updatedCategory); // Use the function here
      console.log('Category successfully updated:', updatedCategoryData);
  
      const updatedCategories = categories.map(category =>
        category.id === selectedCategoryObj.id ? { ...category, name: updatedCategory } : category
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
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDeleteItem = async (item: IItem) => {
    try {
      await deleteItem(item._id); // Use the function here
      setProducts(prevProducts => prevProducts.filter(product => product._id !== item._id));
      console.log('Item successfully deleted');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    }
  };

  const handleDeleteCategory = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete the category "${selectedCategory}"?`);
    if (!confirmed) return;
  
    const selectedCategoryObj = categories.find(category => category.name === selectedCategory);
  
    if (!selectedCategoryObj) {
      alert('Category not found!');
      return;
    }
  
    try {
      await deleteCategory(selectedCategoryObj.id); // Use the function here
      console.log('Category successfully deleted:', selectedCategoryObj.name);
  
      const updatedCategories = categories.filter(category => category.id !== selectedCategoryObj.id);
      const { [selectedCategory]: removedCategory, ...updatedItems } = items;
  
      setCategories(updatedCategories);
      setItems(updatedItems);
      setSelectedCategory(updatedCategories.length > 0 ? updatedCategories[0].name : '');
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };  

  return (
    <div className="dashboardPage__container">
      <div className="dashboardPage__header">
        <Typography className="dashboardPage__title">Pashupati Jewellers</Typography>
      </div>
      <div className="dashboardPage__subContainer">
        <NavBar 
          categories={categories.map((category) => category.name)} 
          handleOpenModal={handleToggleModal}
          handleCategoryClick={handleCategoryClick}
          selectedCategory={selectedCategory}
        />
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
              {products.map((product, index) => (
                <ItemsCard key={index} item={product} onItemUpdate={handleUpdateItem} onItemDelete={handleDeleteItem} />
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
        <AddItemModal onAddItem={handleAddItem} categoryId={selectedCategoryId} />
      </PJModal>
      <PJModal open={isEditCategoryModalOpen} onClose={handleToggleEditCategoryModal} headerTitle="Edit category" subHeaderTitle="Add details of the new category below">
        <EditCategoryModal onEditCategory={handleEditCategory} selectedCategory={selectedCategory} />
      </PJModal>
    </div>
  );
};

export default DashboardPage;
