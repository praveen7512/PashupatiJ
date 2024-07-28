import './addButton-styles.scss';

const AddButton = (props) => {
    const { handleClick } = props;
  return (
    <button className="learn-more" onClick={handleClick}>
        <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
        </span>
        <span className="button-text">Add Category</span>
    </button>
  )
}

export default AddButton
