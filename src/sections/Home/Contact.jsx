import Title from '../../components/Title';
import Container from '../../components/Container';
import Button from '../../components/Button' ;
import '../../assets/css/cube.css'
const Contact = () => {
    return (
        <div>
            <Container>
              <p className='flex justify-end'><div className="shadow-style3"></div></p>                 
              <p><Title title={"Contact us"} align={"text-start"}/></p>
              <p className='text-[1.2rem] max-w-full mb-5 font-bold max-[1065px]:text-center'>Ready to go viral? Let’s chat!</p>
              
              <div className='flex flex-row gap-70 items-center max-[1260px]:gap-50 max-[1065px]:flex-col max-[600px]:scale-[.7] mb-30'>

              <div className='bg-linear-to-r from-orange to-primary rounded-3xl p-8 max-[770px]:min-w-[90%]'>
              <form>
                <p>Name : <span className='text-red-600'>*</span></p>
                <input type='text' className='min-w-150 rounded-md bg-white text-black max-[770px]:min-w-[90%] h-10 my-2.5' placeholder=' E.g.Jhon Doe ' required/>
                <p>Email : <span className='text-red-600'>*</span></p>
                <input type='email' className='min-w-150 rounded-md bg-white text-black max-[770px]:min-w-[90%] h-10 my-2.5' placeholder=' E.g.Jhon Doe ' required/>
                <p>Phone : <span className='text-red-600'>*</span></p>
                <input type='number' className='min-w-150 rounded-md bg-white text-black max-[770px]:min-w-[90%] h-10 my-2.5' placeholder=' E.g.Jhon Doe ' required/>
                <p>Message</p>
                <textarea className='min-w-150 min-h-30 rounded-md bg-white text-black max-[770px]:min-w-[90%] my-2.5'></textarea>
                <p className='text-center my-2.5'><Button text={"Send Message"} typebutton={"submit"}/></p>
              </form>
              </div>

                <div className="">
                <div className="box3d">
                 <div className="scene">
        <div className="cube cube1">
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="ball"></div>
        </div>
        <div className="cube cube2">
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="ball"></div>
        </div>
        <div className="cube cube3">
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="ball"></div>
        </div>
        <div className="cube cube4">
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="ball"></div>
        </div>
        <div className="cube cube5">
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="ball"></div>
        </div>
        <div className="cube cube6">
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="ball"></div>
        </div>
        <div className="cube cube7">
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="ball"></div>
        </div>
        <div className="cube cube8">
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="cube__side"></div>
            <div className="ball"></div>
        </div>
    </div>
    </div>
    </div>
              

              </div>
            </Container>
        </div>
    )
}

export default Contact