const desktop =  {
    state: {
        filter: '',
        tabs: [],
        cloudinary_image: null,
        error: null,
        currentTab: -1
    },
    mutations: {
        filter ( state , payload ){
            state.filter = payload
        },
        tabs( state , payload ){
            state.tabs = payload
        },
        add_tab ( state , payload ){
            state.tabs.push ( payload )
        },
        cloudinary_image ( state , payload ){
            state.cloudinary_image = payload
        },
        error ( state , error ){
            state.error = error 
        },
        tab ( state , payload ){
            state.currentTab = payload
        }
    },
    actions : {
        filter ( { commit } , payload ){
            commit ( 'filter' , payload )
        },
        tabs ( { commit } , payload ){
            commit ( 'tabs' , payload )
        },
        add_tab ( { commit } , payload  ){
            commit ( 'add_tab' , payload )
        },
        cloudinary_image ( { commit } , payload ){
            commit ( 'cloudinary_image' , payload )
        },
        error ( { commit } , payload ){
            commit ( 'error' , payload )
        },
        tab ( { commit }  , payload ){
            commit ( 'tab' , payload )
        }

    }
}

export default desktop