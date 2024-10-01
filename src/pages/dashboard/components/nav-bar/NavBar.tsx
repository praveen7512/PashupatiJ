import { AddButton } from "..";
import './navBar-styles.scss';

interface INavBarProps {
  categories: string[];
  handleOpenModal: () => void;
  handleCategoryClick: (category: string) => void;
  selectedCategory: string;
}

const NavBar = (props: INavBarProps) => {
  const { categories, handleOpenModal, handleCategoryClick, selectedCategory } = props;
  console.log(categories)

  return (
    <div className="navBar__container">
      <AddButton handleClick={handleOpenModal} />
      <ul className="navBar__list">
        {categories.map((category, index) => (
          <li
            key={index}
            className={`navBar__listItem ${category === selectedCategory ? 'navBar__selectedItem' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavBar;
