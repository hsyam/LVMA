require("./bootstrap");

/**
 * load modules
 */
window.Vue = require("vue");
window.VueRouter = require("vue-router").default;
window.VueAxios = require("vue-axios").default;
window.Axios = require("axios").default;
/**
 * inject all modules
 */
Vue.use(VueRouter, VueAxios, Axios);
/**
 * Init components
 */
const ListPosts = Vue.component(
    "Listposts",
    require("./components/ListPosts.vue").default
);
const AddPost = Vue.component(
    "AddPost",
    require("./components/AddPost.vue").default
);
const EditPost = Vue.component(
    "EditPost",
    require("./components/EditPost.vue").default
);
const DeletePost = Vue.component(
    "DeletePost",
    require("./components/DeletePost.vue").default
);
const ViewPost = Vue.component(
    "ViewPost",
    require("./components/viewPost.vue").default
);
const Login = Vue.component(
    "Login" ,
    require("./components/Login.vue").default
);
const Logout = Vue.component(
    "Logout",
    require("./components/Logout.vue").default
);
const Register = Vue.component(
    "Register",
    require("./components/Register.vue").default
);
/**
 * import MiddleWares
 * Auth and Redirect if user already logedin
 */
import Auth from "./Middleware/Auth.js";
import RedirectIfAuth from "./Middleware/RedirectIfAuth.js";
/**
 * Init routes list
 */
const routes = [
    {
        name: "Listposts",
        path: "/",
        component: ListPosts,
        beforeEnter: Auth
    },
    {
        name: "Addpost",
        path: "/add-post",
        component: AddPost,
        beforeEnter: Auth
    },
    {
        name: "EditPost",
        path: "/edit/:id",
        component: EditPost,
        beforeEnter: Auth
    },
    {
        name: "DeletePost",
        path: "/delete/:id",
        component: DeletePost,
        beforeEnter: Auth
    },
    {
        name: "ViewPost",
        path: "/view/:id",
        component: ViewPost,
        beforeEnter: Auth
    },
    {
        name: "Login",
        path: "/login",
        component: Login,
        beforeEnter: RedirectIfAuth
    },
    {
        name: "Register",
        path: "/register",
        component: Register,
        beforeEnter: RedirectIfAuth
    },
    {
        name: "Logout",
        path: "/logout",
        component: Logout,
        beforeEnter: Auth
    }
];
/**
 * Init Vue Router
 */
const router = new VueRouter({
    routes: routes
});
/**
 * Base API URI
 */
const base = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})
Vue.prototype.$vAxios = base;
/**
 * init App
 */
new Vue({
    router
}).$mount("#app");
