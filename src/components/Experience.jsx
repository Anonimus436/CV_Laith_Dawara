const Experience = ({Img , Text , Period}) => {
  return (
        <div className="flex flex-row gap-x-3.5 gap-y-2 font-serif max-[1024px]:gap-x-2! max-[768px]:flex-col max-[768px]:items-center max-[768px]:text-center">
          <img src={Img} className="w-12! h-12! rounded-2xl"/>
          <p className="flex flex-col text-[20px] font-medium pr-28 max-[768px]:pr-0! max-[768px]:pt-4">{Text}<span className="max-w-full! text-gray-400 max-[768px]:pt-2.5">{Period}</span></p>
        </div>
  )
}

export default Experience