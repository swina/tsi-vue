import Vue from 'vue'

const electron = {
    state: {
        preload:['settings','elements','components'],
        preloaded: [],
        tables:null,
        fields:{},
        dataset:{},
    },
    mutations:{
        preloaded ( state , table ){
            state.preload.splice(state.preload.indexOf(table),1)
        },
        tables ( state , tables ){
            state.tables = tables
        },
        dataset( state ,  dataset  ){
            state.dataset[dataset.table] = dataset.data
        },
        fields( state ,  data  ){
            state.fields[data.table] = data.fields
        },
        add_media ( state , payload ){
            state.dataset.media.unshift(payload)
        }
    },
    actions: {
        preloaded( { commit } , payload ){
            commit ( 'preloaded' , payload )
        },
        tables ( { commit } , payload ){
            commit ( 'tables' , payload )
        },
        dataset ( { commit } ,   dataset   ){
            commit ( 'dataset' ,  dataset  )
        },
        fields ( { commit } , payload ){
            commit ( 'fields' ,  payload  )
        },
        add_media ( { commit } , payload ){
            commit ( 'add_media' , payload )
        }
    }

}

export default electron