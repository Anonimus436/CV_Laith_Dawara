import Img from '../../public/logo.jpg'
const Logo = () => {
    return (
        <div className='w-[100px] h-[100px] rounded-lg'>
            <img src={Img} className='rounded-2xl pt-2' alt="Logo" />
        </div>
    )
}

export default Logo