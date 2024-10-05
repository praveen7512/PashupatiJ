import { useState, useRef } from "react";
import { PJButton, PJInput, PJRadioInput } from "@components";
import './addItemModal-styles.scss';

import CollectionsIcon from '@mui/icons-material/Collections';
import { Typography } from "@mui/material";
import { API_KEY, API_PATHS } from "@constants";

  interface IAddItemModalProps {
    onAddItem: (item: { _id: number, title: string, amount: string, description: string, gender: string, metalType: string, imageNames: File[], category: number }) => void;
    categoryId: string;
}

const AddItemModal = (props: IAddItemModalProps) => {
    const { onAddItem, categoryId } = props;
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<File[]>([]); 
    const [isTitleError, setIsTitleError] = useState(false);
    const [isPriceError, setIsPriceError] = useState(false);
    const [isDescriptionError, setIsDescriptionError] = useState(false);
    const [gender, setGender] = useState('female');
    const [material, setMaterial] = useState('gold');
    let [errorMessage, setErrorMessage] = useState('');
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleTitleInputChange = (value: string) => {
        setTitle(value);
        setIsTitleError(false);
    };

    const handlePriceInputChange = (value: string) => {
        setPrice(value);
        setIsPriceError(false);
    };

    const handleDescriptionInputChange = (value: string) => {
        setDescription(value);
        setIsDescriptionError(false);
    };
   
    const handleImageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setImages(prevImages => [...prevImages, ...Array.from(files)]);
        }
    };

    const handleIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; 
            fileInputRef.current.click();
        }
    };

    const handleAddItem = async () => {
        if (title.trim() === '') {
            setIsTitleError(true);
            return;
        }
        if (price.trim() === '') {
            setIsPriceError(true);
            return;
        }
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice) || numericPrice <= 0) {
            setIsPriceError(true);
            setErrorMessage("Please enter a valid positive number for the price.");
            return;
        }
        if (description.trim() === '') {
            setIsDescriptionError(true);
            return;
        }
        if (images.length === 0) {
            errorMessage = "Add at least one image";
            setErrorMessage(errorMessage);
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('amount', numericPrice.toString()); 
        formData.append('category', categoryId);
        formData.append('gender', gender);
        formData.append('metalType', material);

        images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            const response = await fetch(API_PATHS.BASE_URL + '/api/v1/product/', {
                method: 'POST',
                headers: {
                    'X-API-Key': API_KEY
                },
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Full error response:', errorText);
                throw new Error(errorText || 'Failed to add product');
            }

            const result = await response.json();
            console.log('Product added successfully:', result);
            onAddItem({
                _id: result.data._id,
                title: result.data.title,
                amount: result.data.amount, 
                description: result.data.description,
                gender: result.data.gender,
                metalType: result.data.metalType,
                imageNames: images,
                category: result.data.category
            }); 
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="addItemModal__container">
            <PJInput
                containerClass="addItemModal__inputFieldContainer"
                handleChange={handleTitleInputChange}
                value={title}
                label="Name of the product"
                placeholder="Enter the product name here"
                isError={isTitleError}
                errorMessage="This is a required field"
                isFullWidth
                isRequired
                hasBorder
            />
            <PJInput
                containerClass="addItemModal__inputFieldContainer"
                handleChange={handlePriceInputChange}
                value={price}
                label="Price of the product"
                placeholder="Enter the product price here"
                isFullWidth
                isError={isPriceError}
                errorMessage="This is a required field"
                hasBorder
            />
            <PJInput
                containerClass="addItemModal__inputFieldContainer"
                handleChange={handleDescriptionInputChange}
                value={description}
                label="Description of the product"
                placeholder="Enter the product description here"
                isFullWidth
                isError={isDescriptionError}
                errorMessage="This is a required field"
                hasBorder
            />
            <PJRadioInput
                selectedValue={gender}
                handleChange={setGender}
                label="Select Gender"
                options={[
                    { value: 'female', label: 'Female' },
                    { value: 'male', label: 'Male' },
                    { value: 'unisex', label: 'Unisex' },
                ]}
            />
            <PJRadioInput
                selectedValue={material}
                handleChange={setMaterial}
                label="Select Material"
                options={[
                    { value: 'gold', label: 'Gold' },
                    { value: 'silver', label: 'Silver' },
                    { value: 'platinum', label: 'Platinum' },
                    { value: 'other', label: 'Other' },
                ]}
            />
            <div className="addItemModal__imageContainer">
                <Typography className="addItemModal__imageContainerTitle">Add product images</Typography>
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
            <PJButton handleClick={handleAddItem} title="Add" buttonClass="addItemModal__button" isFullWidth />
        </div>
    );
};

export default AddItemModal;
