<template>
    <div class="container">
        <div v-if="post.id == null">
            404 NotFound
        </div>
        <div>
            <h3>{{post.title}}</h3>
        </div>
        <div>
            <p>{{post.body}}</p>
        </div>

        <span class="glyphicon glyphicon-chevron-left">

        </span>
        <router-link to="/" >Back to all posts </router-link>
    </div>

</template>

<script>
export default {

    data:function(){
        return {
            post : {
                title: "" ,
                body : "",
            }
        }
    },
    methods:{
        load:function(){
            let uri = 'post/' + this.$route.params.id;
            this.$vAxios.defaults.headers.common['Authorization'] = `Bearer `+localStorage.getItem('token');

            this.$vAxios.get(uri).then((res)=>{
                this.post = res.data;
                document.title = this.post.title;
            })
        }
    },
    mounted(){
         this.load()
        console.log(this.post.title);
    }



}
</script>
