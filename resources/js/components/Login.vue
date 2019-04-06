<template>
    <div class="container">
    <title>sda</title>
        <div>
            <h3>Login</h3>

            <div v-if="inValid" class="alert alert-danger" role="alert">
                <h5>invalid Email or Password</h5>
            </div>

            <form v-on:submit.prevent="doLogin">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="user.email" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="title">password</label>
                    <input for="password" type="password" v-model="user.password" class="form-control"  required >
                </div>
                <input type="submit" class="btn btn-success" />
            </form>

        </div>
    </div>

</template>

<script>

export default {

    data:function(){
        return {
            user:{
                email : "" ,
                password : "" ,

            } ,
            inValid : false

        }
    },created : function(){
        document.title = "Login ";
    },
    methods: {
        doLogin: function(){
            let uri = 'login';
            this.$vAxios.post(uri , this.user ).then((res)=>{
                localStorage.setItem('token' , res.data.token);
                localStorage.setItem('user' , JSON.stringify(res.data.user));
                return this.$router.push({name : 'Listposts'})
            }).catch((err)=>{
                this.inValid = true
            }
            )
        }
    },
}
</script>
