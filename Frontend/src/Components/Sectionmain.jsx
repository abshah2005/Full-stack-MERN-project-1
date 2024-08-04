import React from "react";
// import "../"

const Sectionmain = () => {
  const gridItems = [
    {
      id: 1,
      title: "I prioritize client collaboration, fostering open communication ",
      description: "",
      className:
        "bg-white text-black lg:row-span-3 lg:col-span-3 md:row-span-3 md:col-span-3 col-span-10",
      imgClassName: "w-full h-full",
      titleClassName: "justify-end",
      img: "../public/brainwave.png",

      spareImg: "",
    },
    {
      id: 2,
      title: "I'm very flexible with time zone communications",
      description: "",
      className:
        "bg-white text-black lg:col-span-4 lg:row-span-1 md:col-span-4 md:row-span-1 col-span-10 ",

      imgClassName: "",
      titleClassName: "justify-start",
      img: "",
      spareImg: "",
    },
    {
      id: 3,
      title: "My tech stack",
      description: "I constantly try to improve",
      imgClassName: "",
      titleClassName: "justify-center",
      img: "",
      spareImg: "",
      className:
        "bg-white text-black lg:row-span-1 lg:col-span-3 col-span-10 md:row-span-1 md:col-span-3",
    },
    {
      id: 4,
      title: "Tech enthusiast with a passion for development.",
      description: "",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "/grid.svg",
      className:
        "bg-white text-black lg:row-span-2 lg:col-span-3 md:row-span-2 md:col-span-3 col-span-10",
      spareImg: "/b4.svg",
    },
    {
      id: 5,
      title: "Currently building a JS Animation library",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut quidem doloremque perspiciatis rerum enim laudantium cupiditate commodi ex porro, a error atque recusandae omnis vero necessitatibus pariatur. Facere deserunt, laudantium explicabo nam libero possimus doloribus nesciunt. Consequatur unde temporibus nostrum, veniam inventore quibusdam quos distinctio saepe quam aperiam non laudantium.",
      imgClassName: "absolute right-0 bottom-0 md:w-96 w-60 ",
      titleClassName: "justify-center md:justify-start lg:justify-center",
      img: "/b5.svg",
      className:
        "bg-white text-black lg:row-span-2 lg:col-span-4 md:row-span-2 md:col-span-4  col-span-10",
      spareImg: "/grid.svg",
    },
    {
      id: 6,
      title: "Do you want to start a project together?",
      description: "",
      // className: "bg-white text-black lg:col-span-2 w-full",
      imgClassName: "",
      titleClassName: "justify-center md:max-w-full max-w-60",
      className:
        "bg-white text-black lg:row-span-2 lg:col-span-3 col-span-10 md:row-span-2 md:col-span-3",
      img: "",
      spareImg: "",
    },
    {
      id: 7,
      title: "Do you want to start a project together?",
      description: "",
      className:
        "bg-white text-black lg:row-span-2 lg:col-span-7 col-span-10 md:row-span-2 md:col-span-7",
      imgClassName: "",
      titleClassName: "justify-center md:max-w-full max-w-60",
      img: "",
      spareImg: "",
    },
  ];
  return (
    <section className=" pt-2 pb-2   text-white p-3">
      <div
        className="grid grid-cols-10 grid-rows-4 w-full 
        h-screen gap-3"
      >
        {gridItems.map((item) => (
          <div key={item.id} className={`${item.className} rounded-md`}>
            <p>{item.description}</p>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sectionmain;
