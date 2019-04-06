require("./bootstrap");

/**
 * load modules
 */
window.Vue = require("vue");

window.VueRouter = require("vue-router").default;
window.VueAxios = require("vue-axios").default;
window.Axios = require("axios").default;

/**
 * Init component
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
 * Base API URI
 */
const base = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})

/**
 * inject all dependencies
 */
Vue.prototype.$vAxios = base
Vue.use(VueRouter, VueAxios, Axios);



/**
 * MiddleWares
 * Auth and Redirect if user already logedin
 */
const auth = function (to, from, next) {
    if (!localStorage.getItem('token')) {
        return console.log(router.push({name : "Login"}));
    }
    return next();
}
const redirectIfAuth = function (to, from, next) {
    if (localStorage.getItem('token')) {
        return console.log(router.push({ name: "Listposts" }));
    }
    return next();
}


/**
 * Init routes list
 */

const routes = [
    {
        name: "Listposts",
        path: "/",
        component: ListPosts,
        beforeEnter: auth

    },
    {
        name: "Addpost",
        path: "/add-post",
        component: AddPost,
        beforeEnter: auth
    },
    {
        name: "EditPost",
        path: "/edit/:id",
        component: EditPost,
        beforeEnter: auth
    },
    {
        name: "DeletePost",
        path: "/delete/:id",
        component: DeletePost,
        beforeEnter: auth
    },
    {
        name: "ViewPost",
        path: "/view/:id",
        component: ViewPost,
        beforeEnter: auth
    },
    {
        name: "Login",
        path: "/login",
        component: Login,
        beforeEnter: redirectIfAuth
    },
    {
        name: "Register",
        path: "/register",
        component: Register,
        beforeEnter: redirectIfAuth
    },
    {
        name: "Logout" ,
        path: "/logout" ,
        component: Logout ,
        beforeEnter: auth,
    }
];
/**
 * Init Vue Router
 */
const router = new VueRouter({
    routes: routes
});

/**
 * init App
 */
new Vue({
    router
}).$mount("#app");
