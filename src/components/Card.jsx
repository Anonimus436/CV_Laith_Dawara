const Card = ({Img , Text , Description}) => {
  return (
        <div className="flex flex-col justify-between font-serif items-center text-center cursor-pointer border border-[#272727] p-5 rounded-2xl hover:bg-[#141414] duration-500">
          <img src={Img} className="w-12! h-12! rounded-2xl"/>
          <h1 className="text-[18px] font-medium my-2">{Text}</h1>
          <p className="text-[16px] font-medium text-gray-400">{Description}</p>
        </div>
  )
}

export default Card