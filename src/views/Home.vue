<template>
  <div :id="$randomID()" class="min-h-screen h-screen flex flex-col p-4">
    <div>
        <img src="../assets/whoobe-logo-2-colors.svg" class="w-64 m-auto grayscale opacity-25"/>
        <div class="text-gray-400 text-sm -mt-4 text-right font-hairline">S T U D I O</div>
        <div class="absolute top-0 left-0 bottom-0 right-0 p-10"><quickstart></quickstart></div>
    </div>
    <!--
    <h2>Dashboard</h2>
    <moka-loading v-if="isLoading"/>
    
    <div v-if="library" class="border mx-12 my-4 border-t-8 border-blue-400 flex flex-col p-2 justify-start items-start text-base bg-blue-100">
      <label>Import MOKAStudio sample library <span @click="viewLibrary=!viewLibrary">View</span></label>
      <div class="flex flex-col text-base pl-4" v-if="sampleLibrary && viewLibrary">
      <template v-for="block in sampleLibrary">
        <div class="capitalize">{{ block.category }} - {{ block.name }}</div>
      </template>
      </div>
      <button @click="importLibrary=!importLibrary">Import</button>
    </div>
    <div class="w-full grid grid-cols-4 justify-around" v-if="components && grouped">
      <div class="border mr-4 border-t-8 border-blue-400 flex flex-col">
        <div class="bg-gray-300 p-1">PROJECT</div>
        <template v-for="project in moka.e_data.projects">
          <div class="text-sm capitalize flex flex-col justify-between p-2 border-b">
            <div class="text-lg">{{ project.name }}</div>
            <div class="text-xs">Description</div>
            <div>{{ project.description}}</div>

          </div>
        </template>
      </div>

      <div class="border mr-4 border-t-8 border-blue-400 flex flex-col">
      <div class="bg-gray-300 p-1">BLOCKS</div>
      <template v-for="(group,index) in grouped.keys">
        <div class="capitalize flex flex-row justify-between p-2 border-b">
          <div>{{ group }}s </div>
          <div>{{grouped.counters[index]}}</div>
        </div>
      </template>
      </div>

      <div class="border mr-4 flex flex-col border-t-8 border-orange-400">
        
        <div class="capitalize flex flex-row justify-between p-2 border-b">
          <div>Media  </div>
          <div v-if="media">{{ media.length }}</div>
        </div>
        <div class="capitalize flex flex-row justify-between p-2 border-b">
          <div>Space  </div>
          <div v-if="total">{{ total }}</div>
        </div>
      </div>

      <div v-if="moka.articles" class="border flex flex-col border-t-8 border-green-400 p-2">
        <div>Last articles</div>
        <template v-for="(article,row) in moka.articles">
          <div class="flex flex-col p-2" v-if="row < 3">
            <div class="text-xs">{{ $moment ( article.update_at ) }}</div>
            <div class="text-sm font-bold border-b">{{ article.title }}</div>
            <div class="text-xs">{{ article.excerpt}}</div>
          </div>
        </template>
        
      </div>
    </div>
    <div class="w-full flex mt-4 flex-row justify-around" v-if="user.login">
      
      <div class="border w-1/4 mr-4 border-t-8 border-gray-400 flex flex-col p-2 justify-center items-center">
        <label>Production Host</label>
        <button :class="production?'success rounded-full h-10 w-10':'danger rounded-full rounded-full h-10 w-10'">{{ production ? 'ON' : 'OFF' }}</button>
      </div>
      <div class="border w-1/4 mr-4 border-t-8 border-gray-400 flex flex-col p-2 justify-center items-center">
        <label>Website Deploy Hook</label>
        <button :class="build?'success rounded-full h-10 w-10':'danger rounded-full h-10 w-10'">{{ build ? 'ON' : 'OFF' }}</button>
      </div>
      <div class="w-1/4 flex flex-col">
        
      </div>
    </div>
    <div v-if="!devMode" class="w-full flex-col p-2 border">
      Welcome to MOKAStudio Playground.
      <br/><br/>
      This a demo and many options are available only in development mode.
      <br/><br/>
      Save is disabled.
    </div>
    <div class="fixed bottom-0 left-0 p-2 text-sm w-full text-center bg-gray-600 text-white" v-if="isLoading">
      Loading data ...
    </div>

    <transition name="fade">
        <div v-if="importLibrary" class="nuxpresso-modal w-full md:w-1/3 bg-gray-800 rounded border-4 border-gray-500  shadow-xl p-2 text-gray-600 text-sm">
            <moka-import-library @close="importLibrary=!importLibrary" :library="sampleLibrary"/>
        </div>
    </transition>
    -->
  </div>
</template>

<script>
// @ is an alias to /src
import MokaImportLibrary from '@/components/moka/moka.import.json'
import Quickstart from './Quickstart'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    Quickstart,
    MokaImportLibrary
  },
  data:()=>({
    isLoading: false,
    viewLibrary: false,
    importLibrary: false,
    sampleLibrary: null,
    blocks: null
  }),
  computed:{
    ...mapState ( [ 'moka' , 'user' , 'electron' ] ),
    devMode(){
      return true // process.env.NODE_ENV === 'development' ? true : false
    },
    media(){
      return this.electron.dataset.media
    },
    grouped(){
      return this.$arrayGroup(this.blocks,'category','id')
    },
    total(){
      let size = 0
      this.media.forEach( m => {
        size += parseFloat(m.size)
      })
      return Math.round(size/1000,2) + ' MB'
    },
    production(){
      return this.user.production ? true : false
    },
    build(){
      return this.user.build ? true : false
    },
    library(){
      /*
      let imported = window.localStorage.getItem('nuxpresso-import')
      if ( imported ) return
      const library = require.context(
        '@/assets/blocks',
        true,
        /^.*\.json$/
      )
      this.sampleLibrary = require ( '@/assets/blocks/' + library.keys()[0].replace('./',''))
      return library.keys()
      */
      return null
    }
  },
  mounted(){
    let vm = this
    this.$api.service('components').find( { query: { $limits:200 , $skip: 0} } ).then ( res => {
      this.blocks = res.data 
    })
  },
  methods:{
    
  }
  
}
</script>