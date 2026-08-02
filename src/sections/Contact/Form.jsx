import Container from "../../components/Container" ;
import Button from "../../components/Button" ;
import React, { useRef, useState } from 'react'; // أضفنا useState
import emailjs from '@emailjs/browser';

const Form = () => {

   const form = useRef();
    const [loading, setLoading] = useState(false); // حالة التحميل

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true); // نبدأ التحميل هنا

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setLoading(false);
      alert("مشكلة: متغيرات البيئة لـ EmailJS غير مهيّأة. راجع ملف .env وأعد تشغيل dev server.");
      console.log("env:", {
        SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      });
      return;
    }
    
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result) => {
                setLoading(false); // نوقف التحميل عند النجاح
                alert("تم إرسال الرسالة بنجاح!");
                e.target.reset();
            }, (error) => {
                setLoading(false); // نوقف التحميل عند الخطأ
                alert("فشل الإرسال، حاول مرة أخرى.");
            });
    };

  return (
    <div>
        <Container>
        <h1 className="text-3xl font-serif p-10 mt-16 max-[592px]:text-center">Let’s Engineer Your Digital Success!</h1>
        
        <div className="grid grid-cols-2 max-[1024px]:grid-cols-1 gap-16">

            <ul className="px-10 flex flex-col gap-10 max-[465px]:p-0!">
                <p className="font-medium font-serif max-[592px]:text-center">Ready to elevate your brand and drive sales? Let’s connect and explore the possibilities!</p>

                <li className="flex flex-row gap-5 max-[400px]:flex-col max-[400px]:text-center max-[400px]:items-center!">
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" className="bi bi-telephone text-primary bg-[#141414] p-5 rounded-2xl" viewBox="0 0 16 16">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                    </svg>
                    <div className="flex flex-col gap-2 max-[400px]:text-[10px]!">
                        <h2 className="text-2xl font-medium max-[400px]:max-w-full">Phone</h2>
                        <h2 className="text-2xl font-medium max-[400px]:max-w-full">+963 953 301 828</h2>
                    </div>
                </li>

                <li className="flex flex-row gap-5  max-[400px]:flex-col max-[400px]:text-center max-[400px]:items-center!">
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-envelope text-primary bg-[#141414] p-5 rounded-2xl" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                    </svg>
                    <div className="flex flex-col gap-2 max-[400px]:text-[10px]!">
                        <h2 className="text-2xl font-medium max-[400px]:max-w-full">Email</h2>
                        <h2 className="text-2xl font-medium max-[400px]:max-w-full">Laithdawara123@gmail.com</h2>
                    </div>
                </li>

                <li className="flex flex-row gap-5  max-[400px]:flex-col max-[400px]:text-center max-[400px]:items-center!">
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-geo-alt text-primary bg-[#141414] p-5 rounded-2xl" viewBox="0 0 16 16">
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg>
                    <div className="flex flex-col gap-2 max-[400px]:text-[10px]!">
                        <h2 className="text-2xl font-medium max-[400px]:max-w-full">Address</h2>
                        <h2 className="text-2xl font-medium max-[400px]:max-w-full">Syria | As Suwayda</h2>
                    </div>
                </li>
            </ul>


 <form
      ref={form}
      onSubmit={sendEmail}
      className="flex flex-col gap-5 bg-[#141414] p-8 rounded-3xl"
    >
      <input
        name="name"
        type="text"
        id="textsend"
        placeholder=" Your Name "
        className="border border-[#272727] rounded-2xl p-5 focus:outline-none focus:ring-1 focus:ring-primary focus:duration-300"
        required
      />

      <input
        name="email"
        type="email"
        placeholder=" Your Email "
        className="border border-[#272727] rounded-2xl p-5 focus:outline-none focus:ring-1 focus:ring-primary focus:duration-300"
        required
      />

      <input
        name="Subject"
        type="text"
        placeholder=" Subject "
        className="border border-[#272727] rounded-2xl p-5 focus:outline-none focus:ring-1 focus:ring-primary focus:duration-300"
        required
      />

      <textarea
        name="message"
        className="border border-[#272727] rounded-2xl p-5 h-36 focus:outline-none focus:ring-1 focus:ring-primary focus:duration-300"
        placeholder=" Message in  brief.. "
        required
      />
      {/* <button 
                type="submit" 
                disabled={loading} 
                className={loading ? "opacity-50 cursor-not-allowed" : ""}
            >
                {loading ? "Sending..." : "Send Message"}
            </button> */}
        <button type="submit" disabled={loading} 
         className={`main-btn cursor-pointer py-2.5 px-8 font-medium text-black bg-primary w-75
         rounded-4xl text-[1.2rem] relative overflow-hidden z-1 duration-300 hover:bg-white max-[400px]:w-60 max-[350px]:w-full!`}>
         <p className="flex items-center justify-center gap-4 group base">{loading ? "Sending..." : "Send Message"}<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle-fill groupClass" viewBox="0 0 16 16">
         <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
         </svg></span></p>
        </button>
    </form>
        </div>
   </Container>
    </div>
  )
 };

export default Form


