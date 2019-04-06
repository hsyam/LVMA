<template>
    <div class="container">

        <div>
            <h3>Add new post</h3>
            <div v-if="sussess" class="alert alert-success" role="alert">
                    <h5>Post Added</h5>
            </div>

            <div v-if="err" class="alert alert-danger" role="alert">
                <h5>Cant add Post</h5>
            </div>
            <form v-on:submit.prevent="createPost">
                <div class="form-group">
                    <label for="title">Post title</label>
                    <input type="text" id="title" v-model="post.title" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="title">Post title</label>
                    <textarea name="body" id="body" cols="30" rows="10" v-model="post.body" class="form-control"  required></textarea>
                </div>
                <input type="submit" class="btn btn-success" />
                <router-link to="/" class="btn btn-xs btn-primary" >Cancel</router-link>
            </form>

        </div>
    </div>

</template>

<script>
export default {
    mounted() {
        console.log('Add post');
    },
    data:function(){
        return {
            post:{
                title : "" ,
                body : "" ,

            } ,
            sussess : false,
            err : false,
        }
    },
    methods: {
        createPost: function(){

            let uri = 'post';
            this.$vAxios.defaults.headers.common['Authorization'] = `Bearer `+localStorage.getItem('token');
            this.$vAxios.post(uri , this.post).then((res)=>{
                this.sussess = true;
                this.err = false;
                this.post.title = "";
                this.post.body = "";

                this.$router.push({name : 'Listposts'});
            }).catch((err)=>{
                this.err = true;
                this.sussess = false;
            }
            )
        }
    },
}
</script>
