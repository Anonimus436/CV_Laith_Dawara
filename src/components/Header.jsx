import React, { useState, useRef, useEffect } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import Container from "./Container"
import Logo from "./Logo"
import { FaBars, FaCaretDown, FaTimes } from "react-icons/fa";
import Button from "./Button";

const Links = [
  { link: "/", name: "Home" },
  { link: "/about", name: "About Me" },
  { 
    name: "Services",
    children: [
      { link: "/Hadaya", name: "Hadaya - Community Growth"},
      { link: "/EasySales", name: "Lead Generation - EasySales GmbH"},
      { link: "/HS", name: "HS.ORG"},
      { link: "/Tech", name: "Tech Education Lead Generation"}
    ]
  },
  { link: "/portfolio", name: "Portfolio" },
  { link: "/contact", name: "Contact" }
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null) 
  const [toogle , setToogle] = useState(false);
  const [drop , setDrop] = useState(false);
  const wrapperRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [location.pathname])

  return (
    <header ref={wrapperRef} className="bg-black sticky top-0 left-0 z-50 text-white">
      <Container className="flex items-center justify-between gap-6 py-6 max-[1024px]:flex-col! max-[768px]:flex-row!">
        <Logo />

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 text-[1.05rem] max-[1292px]:gap-2 max-[1292px]:p-0!">
            {Links.map(item => (
              <li
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => item.children && setOpenDropdown(null)}
              >
                {item.children ? (
                  <>
                    <button
                      onClick={(e) => { e.preventDefault(); setOpenDropdown(prev => prev === item.name ? null : item.name) }}
                      aria-expanded={openDropdown === item.name}
                      className="flex items-center gap-2 py-1.5 px-2 text-[20px] cursor-pointer duration-300 hover:text-primary transition-colors"
                    >
                      {item.name} <FaCaretDown className="text-[0.85rem]" />
                    </button>
                    <ul
                      className={`absolute top-full left-1/2 transform -translate-x-1/2 pt-4 w-60 bg-primary text-black font-medium rounded-3xl px-2.5 pb-4 shadow-lg z-50 transition-opacity 
                        ${openDropdown === item.name ? "block opacity-100 min-w-80!" : "hidden opacity-0"}`}
                      onClick={() => setOpenDropdown(null)}
                    >
                      {item.children.map(child => (
                        <li key={child.link}>
                          <Link to={child.link} className="block px-4 py-2">{child.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                 <NavLink to={item.link} className={({ isActive }) =>
    isActive ? 'text-primary font-semibold py-2 px-2 text-[20px] pr-8  max-[1024px]:p-1.5!' : 'text-white py-2 px-2 text-[20px] pr-8 max-[1024px]:p-1.5! hover:text-primary duration-300'}>{item.name}</NavLink>
                )}
              </li>
            ))}

            <li>
              <Button typebutton={"button"} text={"Get In Touch"} link={"/contact"}/>
            </li>
          </ul>
        </nav>

        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setToogle(!toogle)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="text-primary text-xl"
          >
            {toogle? <FaTimes /> : <FaBars />}
          </button>
         
        </div> 
      </Container>

       {toogle && 

<div className={"md:hidden bg-black w-full overflow-hidden transition-[max-height] duration-300 ${mobileOpen ? 'max-h-200' : 'max-h-0'} text-center pb-5"}
data-aos="fade-down"
data-aos-easing="linear"
data-aos-duration="1500"
>
        <div className="px-6 pb-6">
          <ul className="flex flex-col gap-1 text-[1rem]">
            {Links.map(item => (
              <li key={item.name} className="border-b border-gray-800 py-2">
                {item.children ? (
                  <>
                    
                     <button
                      onClick={() => setDrop(!drop)}
                      className="w-full flex items-center justify-center text-left py-2"
                      aria-expanded={openDropdown === item.name}
                    >
                      <FaCaretDown className={"transition-transform ${openDropdown === item.name ? 'rotate-180' : 'rotate-0'}"} />
                    <span>{item.name}</span>
                    </button>

                    {drop && 
                       <div className={"overflow-hidden transition-[max-height] duration-300 ${openDropdown === item.name ? 'max-h-60' : 'max-h-0'}"}>
                      <ul className="flex flex-col mt-2">
                        {item.children.map(child => (
                          <li key={child.link}>
                            <Link
                              to={child.link}
                              className="block px-4 py-2 text-gray-200 bg-primary hover:text-white"
                              onClick={() => { setMobileOpen(false); setOpenDropdown(null) ; setToogle(false)}}
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>                 
                    }
   
                  </>
                ) : (
                  <NavLink to={item.link} className={({ isActive }) =>
    isActive ? 'text-primary block py-2' : 'text-white block py-2 hover:text-primary'} onClick={() => {setMobileOpen(false) , setToogle(!toogle)}}>
                    {item.name}
                  </NavLink>
                )}
              </li>
            ))}

            <li className="pt-3">
              <Button typebutton={"button"} text={"Get In Touch"} />
            </li>
          </ul>
        </div>
      </div>

}

    </header>
  )
}

export default Header

