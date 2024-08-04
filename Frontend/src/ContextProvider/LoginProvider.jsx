import { useState, createContext, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const LoginContext = createContext(null);
export function LoginContextProvider({ children }) {
  const [isloading, setisLoading] = useState(false);
  const [isloggedin, setIsloggedin] = useState(false);
  const [isadmin, setIsadmin] = useState(false);

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
   const[Brands,setBrands]=useState([]);
   const [random,setRandom]=useState([]);
  const [user, setuser] = useState(() => {
    const storedUser = localStorage.getItem("User");
    try {
      return storedUser
        ? JSON.parse(storedUser)
        : {
            username: "guest",
            role: "customer",
            email: "guest@123.com",
          };
    } catch (error) {
      
      console.error("Error parsing stored user data:", error);
      return {
        username: "guest",
        role: "customer",
        email: "guest@123.com",
      };
    }
  });

  const [globalCat, setGloabalCat] = useState([
    {
      _id: "669809092c978b7d1222debc",
      name: "Beds",
      pic: "http://res.cloudinary.com/dvmccihlf/image/upload/v1721239515/fytopfwhy81ha1vsvfum.avif",
      createdAt: "2024-07-13T07:45:14.882Z",
      updatedAt: "2024-07-13T07:45:14.882Z",
      __v: 0,
    },
    {
      _id: "66923ce7d7d58d34dc1aaab6",
      name: "Side Tables",
      pic: "http://res.cloudinary.com/dvmccihlf/image/upload/v1720859582/bt9xuhbssfzgokwe5usz.jpg",
      createdAt: "2024-07-13T08:37:59.707Z",
      updatedAt: "2024-07-13T08:37:59.707Z",
      __v: 0,
    },
    {
      _id: "66923de7d7d58d34dc1aaabe",
      name: "Sofas",
      pic: "http://res.cloudinary.com/dvmccihlf/image/upload/v1720859838/pmchs7m6jj1d6rrw8grl.jpg",
      createdAt: "2024-07-13T08:42:15.589Z",
      updatedAt: "2024-07-13T08:42:15.589Z",
      __v: 0,
    },
    {
      _id: "66923edad7d58d34dc1aaac2",
      name: "Dining Tables",
      pic: "http://res.cloudinary.com/dvmccihlf/image/upload/v1720860081/wcuak5nyqoiypnfqypts.jpg",
      createdAt: "2024-07-13T08:46:18.785Z",
      updatedAt: "2024-07-13T08:46:18.785Z",
      __v: 0,
    },
    {
      _id: "66923f3fd7d58d34dc1aaac6",
      name: "Cupboards",
      pic: "http://res.cloudinary.com/dvmccihlf/image/upload/v1720860183/it18pbhcfbhcenp4peih.jpg",
      createdAt: "2024-07-13T08:47:59.929Z",
      updatedAt: "2024-07-13T08:47:59.929Z",
      __v: 0,
    },
    {
      _id: "66923fbfd7d58d34dc1aaaca",
      name: "Chairs",
      pic: "http://res.cloudinary.com/dvmccihlf/image/upload/v1720860309/qgmerkeqwkykgrzceapp.jpg",
      createdAt: "2024-07-13T08:50:07.956Z",
      updatedAt: "2024-07-13T08:50:07.956Z",
      __v: 0,
    },
  ]);
  const [quantity, setQuantity] = useState(1);
  const [role, setrole] = useState("");
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => {
      return item.id === product.id;
    });
    if (existingProduct) {
      setCart((prev) =>
        prev.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: product.quantity + item.quantity };
          } else {
            return item;
          }
        })
      );
    } else {
      return setCart([...cart, product]);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("User", JSON.stringify(user));
  }, [user]);

  return (
    <LoginContext.Provider
      value={{
        user,
        setuser,
        role,
        setrole,
        isadmin,
        setIsadmin,
        isloggedin,
        setIsloggedin,
        cart,
        addToCart,
        setCart,
        globalCat,
        setGloabalCat,
        Brands,
        setBrands,
        random,
        setRandom
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
