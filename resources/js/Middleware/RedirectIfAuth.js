export default function RedirectIfAuth(to, from, next) {
    if (localStorage.getItem('token')) {
        return next({ name: "Listposts" });
    }
    return next();
}
