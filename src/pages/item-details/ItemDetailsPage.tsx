import { useLocation } from 'react-router-dom';

import './itemDetails-styles.scss'

const ItemDetailsPage = () => {
  const location = useLocation();
  const item = location.state?.item;

  return (
    <div className="itemsDetails__container">
      {item ? (
        <>
          <h1 className="itemsDetails__title">{item.title}</h1>
          <p className="itemsDetails__price">{item.price}</p>
          <img src={item.image} alt={item.title} className="itemsDetails__image" />
          <p className="itemsDetails__description">{item.description}</p>
        </>
      ) : (
        <p>No item details found.</p>
      )}
    </div>
  );
};

export default ItemDetailsPage;
