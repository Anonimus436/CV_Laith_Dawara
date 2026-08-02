import { Link, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Title from "../../components/Title";
import Linkwork from "../../components/Linkwork";
import { useSelectWorks } from "../../context/SelectWorksContext";

const Select_Works = () => {
  const location = useLocation();
  const { items } = useSelectWorks();

  return (
    <div id="reference">
      <Container>
        <Title title={"SELECT WORKS"} />
        <div className="flex justify-between max-[1024px]:flex-col max-[1024px]:gap-5 max-[700px]:items-center">
          <h1 className="text-[2rem] text-white font-bold font-serif max-w-150 max-[700px]:text-center">
            Creative solutions that fuse marketing insight with strategic execution.
          </h1>
          <Button
            typebutton={"button"}
            text={"View All"}
            size={"h-full!"}
            alignsize={"max-[1024px]:max-w-50"}
            link={"/portfolio"}
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-3 gap-8 my-10 max-[1024px]:grid-cols-2 max-[600px]:grid-cols-1 max-[600px]:mx-8 max-[350px]:mx-0!">
          {items.map((item) => (
            <Linkwork
              key={item.slug}
              Text1={item.text}
              Img1={item.img}
              link1={item.link}
              editLink={`/edit-select-card/${item.slug}`}
              // imgHeight="h-80"
            />
          ))}
        </div>

        {/* Manage Select Works link */}
        <div className="flex justify-end pb-4 h-[80%]!">
          <Link
            to={`/admin-login?redirect=${encodeURIComponent("/manage-select-works")}&from=${encodeURIComponent(location.pathname)}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary border border-primary rounded-2xl px-5 py-2.5 hover:bg-primary hover:text-black transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
            </svg>
            Manage Select Works
          </Link>
        </div>

        <hr className="max-w-full h-2 text-[#272727] my-16" />
      </Container>
    </div>
  );
};

export default Select_Works;
