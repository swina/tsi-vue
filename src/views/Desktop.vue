<template>
    <div class="w-screen min-w-screen" v-if="user.login">
        
        <nav :class="'desktop-nav ' + size" style="transition:all .4s linear;">
            <img src="logo.svg" class="pl-2 my-2 animate-pulse" title="TSI Manager by DUAL" @click="navOpen=!navOpen"/>
            <template v-if="menu && menu.items" v-for="item in menu.items">
                <div @click="newTab(item,null)" @mouseenter="submenu=item.label">
                    <i class="material-icons mr-2" :title="item.label">{{ item.icon }}</i>
                    
                        <div v-if="navOpen" >{{ item.label }}</div>
                        <div v-else>
                            
                            
                            <div class="desktop-nav-submenu capitalize" v-if="item.hasOwnProperty('items') && submenu === item.label && item.items.length" @mouseleave="submenu=''">
                                <div style="border:0;background:black;color:white">{{ item.label }}</div> 
                                <template v-for="sub in item.items">
                                    <div style="transition: all .5s linear;" @click="newTab(sub,item),submenu=''">{{ sub.label }}</div>
                                </template>
                            </div>
                            <div class="desktop-nav-submenu capitalize" v-if="item.hasOwnProperty('function') && submenu===item.label" @mouseleave="submenu=''">
                                <div style="border:0;background:black;color:white">{{ item.label }}</div> 
                                <template v-for="sub in datastore[item.function]">
                                    <div style="transition: all .5s linear;" @click="newTab(sub,item),submenu=''">{{ sub.label }}</div>
                                </template>
                            </div>
                            
                            
                        </div>
                </div>
            </template>
        </nav>
        <div class="flex flex-col w-screen">
            <!-- TABS -->
            <div class="desktop-tabs border-b-2 h-8 capitalize" v-if="desktop.tabs.length > 0">
                <template v-for="(tab,index) in desktop.tabs">
                    <div :key="'tab' + index" :class="'relative desktop-tab ' + active(index)" @click="setTab(index),$action()" :title="tab.name">
                        <span>
                            <i v-if="tab.icon" class="material-icons text-sm mr-1 text-orange-500">{{tab.icon}}</i> {{ tab.name }}
                        </span> 
                        <i class="desktop-tab-close material-icons" @click="removeTab(index)">close</i>
                        
                    </div> 
                        
                </template>
                
            </div>
            <div class="desktop-container" v-if="desktop.tabs.length > 0 && desktop.currentTab > -1">
                
                <!-- <div :class="activeTab(desktop.currentTab)"> -->
                
                    <div class="">
                        <component :id="$randomID()" v-if="desktop.tabs[desktop.currentTab]" :is="desktop.tabs[desktop.currentTab].component" :component="desktop.tabs[desktop.currentTab].component" :filter="desktop.tabs[desktop.currentTab].filter" :blocks="desktop.tabs[desktop.currentTab].blocks" @newtab="desktop.currentTab=desktop.tabs.length-1" :tab="desktop.currentTab"/>
                    </div>
                <!-- </div> -->
            </div>
            <div v-if="desktop.tabs.length === 0" class="desktop">
                <!-- <div>
                    <img src="../assets/whoobe-logo-2-colors.svg" class="w-64 m-auto grayscale opacity-25"/>
                    <div class="text-gray-400 text-sm -mt-4 text-right font-hairline">S T U D I O</div>
                    <div class="z-2xtop text-sm">Current CMS is : {{ server }} <button class="sm">Change</button></div>

                </div> -->
            </div>
            
        </div>
    </div>
</template>
<script>
import Menu from '../plugins/app'
import schema from '@/components/plugins/tsi/admin/schema'
import { mapState } from 'vuex'
export default {
    name: 'Desktop',
    data:()=>({
        navOpen: false,
        tabGroup: null,
        tabs: [],
        currentTab: -1,
        submenu: '',
        menu: {}
    }),
    watch:{
        //tabs(v){
        //    !this.tabs.length ? currentTab = -1 : null 
        //},
        currentTab(v){
            this.curentTab < 0 && this.desktop.tabs.length > 0 ?
                this.currentTab = 0 : null
            this.desktop.currentTab = this.currentTab
        },
        
    },
    computed: {
        ...mapState ( [ 'desktop','datastore','user'] ),
        server(){
            return window.localStorage.getItem ( 'moka-strapiurl' )
        },
        size(){
            return this.navOpen ? 'w-full md:w-1/4 lg:w-1/5' : 'w-10'
        },
        
    },
    methods:{
        active(index){
            return index === this.desktop.currentTab ? ' bg-blue-500 text-white ' : ' bg-gray-700 text-gray-100 '
        },
        activeTab(index){

            return index === this.desktop.currentTab ? '' : 'hidden'
        },
        setTab(index){
            this.$store.dispatch ( 'tab' , index )
            //this.desktop.currentTab = index
        },
        newTab ( item , parent ){
            if ( !item.path ) return
            if ( item.path === '/' ) {
                this.$router.push ( '/' ) 
                return
            }
            let compName = item.path
            this.$store.dispatch ( 'filter' , item.filter )
            this.desktop.tabs.push ( {
                component: () => import ( '@/components/' + compName ) ,
                name: item.label ,
                icon: item.icon ? item.icon : parent ? parent.icon : null,
                filter: item.filter,
                ref: this.$randomID(),
                resumeAction: null,
                blocks: null,
            })
            this.currentTab = this.desktop.tabs.length -1
            //this.component = () => import ( '@/components/' + compName )
            
            
        },
        removeTab(index){       
            this.desktop.tabs.splice(index,1)
            this.currentTab = index-1
            console.log ( this.currentTab )
        },
        dropwdownMenu ( label ){
            this.submenu = label
        },
    },
    beforeMount(){
        !this.user.login ? this.$router.push('/') : null
        this.menu = Menu
        this.$api.service ( 'surveys' ).find().then ( res => {
            this.$store.dispatch ( 'dataset' , { table: 'surveys' , data: res.data } )
        })
        this.$store.dispatch ( 'dataset' , { table: 'schema' , data: schema } )
    }
}
</script>
