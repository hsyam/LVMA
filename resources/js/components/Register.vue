<template>
    <div class="container">

        <div>
            <h3>Login</h3>


            <form v-on:submit.prevent="register">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" id="email" v-model="user.email" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" v-model="user.name" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="title">password</label>
                    <input type="password" for="password" v-model="user.password" class="form-control"  required >
                </div>
                <input type="submit" class="btn btn-success" />
                <router-link to="/" class="btn btn-xs btn-primary" >Cancel</router-link>
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
                name : "" ,
            } ,

        }
    },
    methods: {
        register: function(){

            let uri = 'register';

            this.$vAxios.post(uri , this.user ).then((res)=>{
                console.log(res.data);
            }).catch((err)=>{
                console.log(err.data) ;
            }
            )
        }
    },
}
</script>
