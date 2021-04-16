<template>
  <div class="bg-gray-400 min-h-screen h-screen flex flex-col justify-center items-center bg-center bg-cover bg-no-repat" style="background-image:url(https://res.cloudinary.com/moodgiver/image/upload/v1614180176/smartphone-925758_1280_zl87ir.jpg)">
    <div class="m-auto w-64">
       
      <div class="m-auto text-center font-thin bg-white bg-opacity-75 p-2 rounded shadow" @click="$router.push('desktop')">
        <img src="https://mk0wwwindualitpb534w.kinstacdn.com/wp-content/uploads/2021/02/Logo-Dual-default.png" class="w-64 m-auto"/>
        <div class="text-gray-700 text-sm -mt-4w-64 text-right font-hairline">TSI Manager</div>
      </div>
    </div>
    <transition name="fade">
        <moka-modal 
            size="sm"
            position="modal"
            v-if="login"
            @close="login=!login"
            @click_0="login=!login"
            @click_1="doLogin">
            <div slot="title">Login</div>
            <div slot="content" class="flex flex-col p-4">
                <label>Email</label>
                <input type="email" v-model="userLogin.email"/>
                <label>Password</label>
                <input type="password" v-model="userLogin.password"/>
            </div>
        </moka-modal>
    </transition>
    <div class="absolute bottom-0 right-0 m-3 text-gray-500 flex flex-row items-center" @click="$router.push('/desktop')">
      <i class="material-icons text-gray-500 mr-2" v-if="!login">lock</i>
      <!-- <span class="text-sm" v-if="user && !login">Utente: {{ user.user.user.email }}</span>
      <span class="text-sm" v-else>User: Guest</span> -->
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
  name: 'Main',
  data:()=>({
    userLogin: {
      email: '',
      password: '',
    },
    login: false,
  }),
  
  computed:{
    ...mapState ( [ 'moka' , 'user'] ),

  },
 
  mounted(){
    let vm = this
    this.$api.authenticate().then ( resp => {
      
      vm.login = false
      this.$store.dispatch('login',true)
      this.$store.dispatch('user',resp)
      //this.loadData()
    }).catch ( err => {
      alert ( err )
      this.login = true
      console.log ( err )
    })
  },
  methods:{
    doLogin(){
        this.$api.authenticate({
            email: this.userLogin.email,
            password: this.userLogin.password,
            strategy: 'local'
        }).then ( user => {
            this.$message ( 'Bentornato !')
            this.login = false
            this.$store.dispatch('login',true)
            this.$store.dispatch('user',user)
            //this.loadData()
        }).catch ( err => {
            console.log ( err )
            this.$message ( 'Email o password errati!')
        })
      }
  },
  
}
</script>
<style>
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
            background:rgb(45, 45, 72);
        }
        50% {
            opacity: .5;
            background:rgb(5, 223, 23);
        }
    }
</style>