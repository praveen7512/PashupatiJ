import { useState } from "react";
import { PJButton, PJInput } from "@components";

import './addItemModal-styles.scss';

interface IAddItemModalProps {
    onAddItem: (item: { key: number, title: string, price: string, description: string }) => void;
}

const AddItemModal = (props: IAddItemModalProps) => {
    const { onAddItem } = props;
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [isTitleError, setIsTitleError] = useState(false);
    const [isPriceError, setIsPriceError] = useState(false);
    const [isDescriptionError, setIsDescriptionError] = useState(false);
    const [isImageError, setIsImageError] = useState(false);

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

    const handleImageInputChange = (value: string) => {
        setImage(value);
        setIsImageError(false);
    };

    const handleAddItem = () => {
        if (title.trim() === '') {
            setIsTitleError(true);
            return;
        }
        if (price.trim() === '') {
            setIsPriceError(true);
            return;
        }
        if (description.trim() === '') {
            setIsDescriptionError(true);
            return;
        }
        if (image.trim() === '') {
            setIsImageError(true);
            return;
        }
        const newItem = { key: Date.now(), title, price, description, image };
        onAddItem(newItem);
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
            <PJInput
                containerClass="addItemModal__inputFieldContainer"
                handleChange={handleImageInputChange}
                value={image}
                label="Add product image"
                placeholder="Enter the link of the product image here"
                isFullWidth
                isError={isImageError}
                errorMessage="This is a required field"
                hasBorder
            />
            <PJButton handleClick={handleAddItem} title="Add" buttonClass="addItemModal__button" isFullWidth />
        </div>
    );
};

export default AddItemModal;
