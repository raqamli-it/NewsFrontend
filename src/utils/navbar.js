import Home from "../pages/home/Home";
import Jurnalist from "../pages/jurnalist/Jurnalist";
import News from "../pages/news/News";
import Contents from "../pages/contents/Contents";
import Login from "../pages/login/Login";
import Register from "../pages/Register/Register";

export const data = [
  {
    id: 1,
    title: 'Sud',
    path: '/sud',
    Component: Home, // To'g'ri komponent nomi (JSX emas)
    hidden: false
  },
  {
    id: 2,
    title: 'Jurnalistik Jamiyat',
    path: '/jurnalistik',
    Component: Jurnalist, // To'g'ri nom bilan
    hidden: false
  },
  {
    id: 3,
    title: 'Yangiliklar',
    path: '/yangiliklar',
    Component: News,
    hidden: false
  },
  {
    id: 4,
    title: 'Contentlar',
    path: '/contentlar',
    Component: Contents,
    hidden: false
  },
  {
    id: 5,
    title: 'Login',
    path: '/login',
    Component: Login,
    hidden: false 
  },
  {
    id: 6, // ID'ni o'zgartirish
    title: 'Register',
    path: '/register',
    Component: Register,
    hidden: false 
  }
];
