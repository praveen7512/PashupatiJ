// api.ts
import { API_KEY, API_PATHS, ApiMethods } from '@constants';
import { Category, IItem } from '@types';

const apiHeaders = {
  'x-api-key': API_KEY,
  'Content-Type': 'application/json',
};

// Fetch categories
export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_PATHS.BASE_URL}/api/v1/category/`, {
    method: ApiMethods.Get,
    headers: apiHeaders,
  });

  if (!response.ok) {
    throw new Error(`Error fetching categories: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data.map((category: any) => ({
    id: category._id,
    name: category.name,
  }));
};

// Fetch products by category ID
export const fetchProductsByCategoryId = async (categoryId: string): Promise<IItem[]> => {
  const response = await fetch(`${API_PATHS.BASE_URL}/api/v1/product/bycategory/${categoryId}`, {
    method: ApiMethods.Get,
    headers: apiHeaders,
  });

  if (!response.ok) {
    if (response.status === 404) {
      return [];
    }
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const result = await response.json();
  return result.data;
};

// Add category
export const addCategory = async (categoryName: string): Promise<Category> => {
  const newCategory = { name: categoryName.trim() };

  const response = await fetch(`${API_PATHS.BASE_URL}${API_PATHS.POST_CATEGORY}`, {
    method: ApiMethods.Post,
    headers: apiHeaders,
    body: JSON.stringify(newCategory),
  });

  if (!response.ok) {
    throw new Error(`Error adding category: ${response.statusText}`);
  }

  const result = await response.json();
  return { id: result.data.id, name: result.data.name };
};

// Update category
export const updateCategory = async (categoryId: string, updatedName: string): Promise<Category> => {
  const response = await fetch(`${API_PATHS.BASE_URL}/api/v1/category/${categoryId}`, {
    method: ApiMethods.Put,
    headers: apiHeaders,
    body: JSON.stringify({ name: updatedName.trim() }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update category: ${response.statusText}`);
  }

  const result = await response.json();
  return { id: categoryId, name: result.data.name };
};

// Delete category
export const deleteCategory = async (categoryId: string): Promise<void> => {
  const response = await fetch(`${API_PATHS.BASE_URL}/api/v1/category/${categoryId}`, {
    method: ApiMethods.Delete,
    headers: apiHeaders,
  });

  if (!response.ok) {
    throw new Error(`Failed to delete category: ${response.statusText}`);
  }
};

// Delete item
export const deleteItem = async (itemId: number): Promise<void> => {
  const response = await fetch(`${API_PATHS.BASE_URL}/api/v1/product/${itemId}`, {
    method: ApiMethods.Delete,
    headers: apiHeaders,
  });

  if (!response.ok) {
    throw new Error(`Error deleting item: ${response.statusText}`);
  }
};