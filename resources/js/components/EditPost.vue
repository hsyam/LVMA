<template>
    <div class="container">

        <div>
            <h3>Edit post</h3>
            <div v-if="sussess" class="alert alert-success" role="alert">
                    <h5>Post Edited</h5>
            </div>

            <div v-if="err" class="alert alert-danger" role="alert">
                <h5>Cant Edit Post</h5>
            </div>
            <form v-on:submit.prevent="EditPost">
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
    data:function(){
        return {
            post:"" ,
            user: this.crUser(),
            sussess : false,
            err : false,
        }
    },
    methods: {
        load:function(){
            let uri = 'post/' + this.$route.params.id;
            this.$vAxios.defaults.headers.common['Authorization'] = `Bearer `+localStorage.getItem('token');
            this.$vAxios.get(uri).then((res)=>{
                this.post = res.data;
                document.title = "Edit | "+this.post.title;
                if(this.post.user_id != this.user.id){
                    return this.$router.push({name : 'Listposts'});
                }
            })

        },
        EditPost: function(){
            let uri = 'post/' + this.$route.params.id;

            this.$vAxios.patch(uri , this.post).then((res)=>{
                this.sussess = true;
                this.err = false;

                // this.$router.push({name : 'Listposts'});
            }).catch((err)=>{
                this.err = true;
                this.sussess = false;
            }
            )
        },
        crUser:function () {
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
                }
                return {name :"" , email : ""}
        }
    },
    mounted(){
         this.load()

    }

}
</script>
