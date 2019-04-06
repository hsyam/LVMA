export default function Auth(to, from, next) {
    if (!localStorage.getItem('token')) {
        return next({ name: "Login" });
    }
    return next();
}
