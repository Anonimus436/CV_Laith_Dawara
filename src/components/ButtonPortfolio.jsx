const ButtonPortfolio = ({ Name, isActive, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        isActive
          ? "text-black bg-primary py-4 px-5 cursor-pointer text-[14px] rounded-2xl font-medium max-[1024px]:p-1.5! duration-300 max-[1024px]:px-5! max-[1024px]:py-4!"
          : "text-white bg-transparent py-4 px-5 cursor-pointer text-[14px] rounded-2xl font-medium border border-[#272727] max-[1024px]:p-1.5! hover:bg-primary hover:text-black duration-300 max-[1024px]:px-5! max-[1024px]:py-4!"
      }
    >
      {Name}
    </button>
  );
};

export default ButtonPortfolio;
