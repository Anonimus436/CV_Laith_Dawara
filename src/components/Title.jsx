const Title = ({ title, text, align}) => {
    return (
        <div className={`${align} mb-2.5 mt-16`}>
            <h2 className="text-[1.5rem] font-medium font-serif text-[#737373] mb-2 max-[700px]:text-center">{title}</h2>
            {text && <h3>{text}</h3>}
        </div>
    )
}

export default Title