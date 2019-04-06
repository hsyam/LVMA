<template>
    <div class="container">
        <h3>Are You to deleted <strong> {{post.title}}</strong> </h3>
            <form v-on:submit.prevent="deletedPost">
                <input type="submit" class="btn btn-danger" value="Yes" />
                <router-link to="/" class="btn btn-xs btn-primary" >Cancel</router-link>
            </form>
    </div>

</template>

<script>
export default {

    data:function(){
        return{
            post : {
                title : '',
                body: ''
            }
        }
    },
    methods: {
        load:function(){
            let uri = 'post/' + this.$route.params.id;
            this.$vAxios.defaults.headers.common['Authorization'] = `Bearer `+localStorage.getItem('token');
            this.$vAxios.get(uri).then((res)=>{
                this.post = res.data;
                document.title = "Delete | "+this.post.title;
            })
        },
        deletedPost: function(){

            let uri = 'post/' + this.$route.params.id;
            this.$vAxios.get(uri).then((res)=>{
                 this.post = res.data ;
            })
            this.$vAxios.delete(uri , this.post ).then((res)=>{
                console.log('Yes');
                this.$router.push({name : 'Listposts'});
            }).catch((err)=>{
                console.log('no');
                this.$router.push({name : 'Listposts'})
                }
            )
        }
    },
    mounted() {
        this.load()
    },
}
</script>
