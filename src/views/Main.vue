<template>
  <div class="bg-gray-400 min-h-screen h-screen flex flex-col justify-center items-center bg-center bg-cover bg-no-repat" style="background-image:url(https://res.cloudinary.com/moodgiver/image/upload/v1614180176/smartphone-925758_1280_zl87ir.jpg)">
    <div class="m-auto w-64">
       
      <div class="m-auto text-center font-thin bg-white bg-opacity-75 p-2 rounded shadow">
        <img src="https://mk0wwwindualitpb534w.kinstacdn.com/wp-content/uploads/2021/02/Logo-Dual-default.png" class="w-64 m-auto grayscale"/>
        <div class="text-gray-300 bg-gray-600 text-xl text-center font-hairline">TSI Manager</div>
        <button class="my-4 mx-auto text-xl rounded" @click="$router.push('/desktop')" v-if="!login">Gestione</button>
      </div>
    </div>
        <div v-if="login" class="z-1 fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50"></div>
    <transition name="fade">
            <div class="modal z-2 bg-white w-full md:w-1/4 text-lg flex flex-col rounded" v-if="login">
                  <div class="w-full p-1 bg-black text-white rounded-tl rounded-tr">Login</div>
              <div class="p-4 flex flex-col">
                  <label>Email</label>
                  <input type="email" v-model="userLogin.email"/>
                  <label>Password</label>
                  <input type="password" v-model="userLogin.password"/>
                  <button class="my-4 mx-auto text-xl rounded" @click="doLogin()">Login</button>
               </div> 
            </div>
    </transition>
    <div class="absolute bottom-0 right-0 m-3 text-gray-500 flex flex-row items-center">
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
      this.$message ( 'Autenticazione richiesta' )
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