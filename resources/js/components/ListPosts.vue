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
                    <router-link v-if="post.user_id == user.id" class="btn btn-xs btn-warning" v-bind:to="{name : 'EditPost' , params: {id:post.id} }">Edit</router-link>
                    <!-- <router-link  v-if="post.user_id == user.id" class="btn btn-xs btn-danger" v-bind:to="{name : 'DeletePost' , params: {id:post.id} }">Delete</router-link> -->
                <button  v-if="post.user_id == user.id" type="button" class="btn btn-danger" data-toggle="modal" :data-target="'#item'+ '-' + post.id">
                Delete
                </button>
                <!-- Modal -->
                    <div  v-if="post.user_id == user.id" class="modal fade" :id="'item'+ '-' + post.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Delete Alert</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure to delete <strong>{{post.title}}</strong>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger" v-on:click="doDelete(post.id)" data-dismiss="modal">Yes</button>
                        </div>
                        </div>
                    </div>
                    </div>
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
    },
    data:function(){
        return {
            posts : '',
            user : this.crUser()
            }
    },
    methods:{
        load : function(){
        document.title = "Posts"

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
            },
            doDelete:function(id){
                let uri = 'post/'+id
                this.$vAxios.defaults.headers.common['Authorization'] = `Bearer `+localStorage.getItem('token');
                this.$vAxios.delete(uri).then((res)=>{
                    this.posts = this.$_.reject(this.posts , (post)=>{
                        return post.id == id
                    });
                }).catch((err)=>{
                    alert("cant delete")
                })



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
