<template>
<div class="row">
    <div class="pull-left col-md-10">
        <router-link  v-bind:to="{name:'Addpost'}" class="btn btn-xs btn-primary" >
        <span class="glyphicon glyphicon-plus "></span>
        Add new Post

        </router-link>
    <br><br>
    </div>
    <div class="pull-right">
        <h5>Hello {{user.name}} </h5>
        <router-link v-bind:to="{name:'Logout'}" class="btn btn-xs btn-danger">Logout </router-link>
    <br><br>
    </div>

    <table class="table table-bordered">
        <thead>
            <tr>
                <td>#</td>
                <td>title</td>
                <td>body</td>
                <td>action</td>
            </tr>
        </thead>

        <tbody>
            <tr v-for="post in fillteredPosts" v-bind:key="post.id">
                <td>{{post.id}}</td>
                <td>{{post.title}}</td>
                <td>{{post.body}}</td>
                <td>
                    <router-link class="btn btn-xs btn-info" v-bind:to="{name : 'ViewPost' , params: {id:post.id} }">Show</router-link>
                    <router-link class="btn btn-xs btn-warning" v-bind:to="{name : 'EditPost' , params: {id:post.id} }">Edit</router-link>
                    <router-link class="btn btn-xs btn-danger" v-bind:to="{name : 'DeletePost' , params: {id:post.id} }">Delete</router-link>
                </td>

            </tr>
        </tbody>
    </table>
</div>

</template>

<script>
export default {
    mounted() {
        this.load()
        document.title = "Posts"
    },
    data:function(){
        return {
            posts : '',
            user : this.crUser()
            }
    },
    methods:{
        load : function(){

            let uri = 'post';
            this.$vAxios.defaults.headers.common['Authorization'] = `Bearer `+localStorage.getItem('token');
            this.$vAxios.get(uri , ).then((res)=>{
                this.posts = res.data;
            })


    },
        crUser :  function(){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
                }
                return {name :"" , email : ""}
            }

    }, computed: {
        fillteredPosts : function(){
            if(this.posts.length){
                return this.posts;
            }
        }
    }

}
</script>
