import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Container from "../../components/Container";
import { useBrandLogos } from "../../context/BrandLogosContext";

const Brands = () => {
  const { items } = useBrandLogos();
  const duplicatedItems = [...items, ...items];

  return (
    <Container>
      <div className="flex justify-between max-[1024px]:flex-col max-[1024px]:gap-5 max-[700px]:items-center">
        <h1 className="text-[2rem] text-white font-bold font-serif max-w-150 max-[700px]:text-center">
          Endorsed by Leading Experts in Digital Marketing
        </h1>
        <Button text={"Contact me"} link={"/contact"} typebutton={"button"} size={"h-12!"} />
      </div>

      <div className="mt-8 overflow-hidden border-y border-[#2a2a2a] bg-[#0d0d0d] py-4">
        <div className="brands-marquee flex min-w-max gap-0">
          {duplicatedItems.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex h-20 w-48 sm:w-56 md:w-64 shrink-0 items-center justify-center bg-[#121212] border-r border-[#2a2a2a]"
            >
              <img src={logo.src} alt={logo.alt} className="h-14 w-full object-contain" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Link
          to="/admin-login?redirect=%2Fmanage-brands"
          className="inline-flex items-center gap-2 rounded-2xl border border-primary bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-black"
        >
          Manage displayed images
        </Link>
      </div>
    </Container>
  )
}

export default Brands