
const questionario = {
        
        project : {
            label: 'progetto',
            type: 'string',
            edit: true,
            list: true,
            required: true,
            readonly: false,
            default: '',
            tab:0,
            format: (value)=>{
                return value
            }
        },
        date: {
            label: 'data',
            type: 'date',
            edit: true,
            list: true,
            required: true,
            readonly: false,
            default: '',
            tab:0,
            format: (value)=>{
                return value //value.slice(-2) + '/' + value.substr(4,2) + '/' + value.substr(0,4)
            },
        },
        keycode : {
            label: 'Chiave Accesso',
            type: 'string',
            edit: true,
            list: true,
            required: true,
            readonly: true,
            default: '',
            tab:0,
            format: (value)=>{
                return value
            }
        },
        coach: {
            label: 'coach',
            type: 'string',
            edit: true,
            list: true,
            required: true,
            readonly: false,
            default: '',
            tab:0,
            format: (value)=> { return value }
        },
        timeout: {
            label: 'Timeout questionario (min)',
            type: 'number',
            edit: true,
            list: true,
            required: true,
            readonly: false,
            default: 10,
            tab:2,
            format: (value)=> {
                return parseInt(value)
            }
        },
        pagination: {
            label: 'Domande per pagina',
            type: 'number',
            edit: true,
            list: false,
            required: true,
            readonly: false,
            default: 0,
            tab:2,
            format: (value)=>{
                return parseInt(value)
            }
        },
        group_pagination: {
            label: 'Paginazione per gruppo',
            type: 'boolean',
            edit: true,
            list: false,
            required: false,
            readonly: false,
            default: false,
            tab:2,
            format: (value)=>{
                return parseInt(value)
            }
        },
        answers_layout: {
            label: 'Layout risposte in linea',
            type: 'boolean',
            edit: true,
            list: false,
            required: false,
            readonly: false,
            default: true,
            tab:2,
            format: (value)=>{
                return parseInt(value)
            }
        },
        description: {
            label: 'descrizione',
            type: 'text',
            edit: true,
            list: false,
            required: true,
            readonly: false,
            default: '',
            tab:1,
            format: (value)=>{
                return value.substring(0,25)
            }
        },
        resume: {
            label: 'fine questionario',
            type: 'text',
            edit: true,
            list: false,
            required: true,
            readonly: false,
            default: '',
            tab:4,
            format: (value)=>{
                return value.substring(0,25)
            }
        },
        notes: {
            label: 'note',
            type: 'excerpt',
            edit: true,
            list: false,
            required: true,
            readonly: false,
            default: null,
            tab:0,
            format: (value)=>{
                return value.substring(0,25)
            }
        },
        answers: {
            label: 'risposte',
            type: 'array',
            edit: true,
            list: false,
            required: true,
            default: null,
            tab:2,
            format: (value)=>{
                return value.join('\n')
            }
        },
        active: {
            label: 'attivo',
            type: 'boolean',
            edit: true,
            list: true,
            required: true,
            default: true,
            tab:0,
            format:(value)=>{
                return value
            }
        }
    }
const persons = {
    firstname : {
        label: 'nome',
        type: 'string',
        edit: true,
        list: true,
        required: true,
        default: '',
        tab:0,
        format: (value)=>{
            return value
        }
    },
    lastname : {
        label: 'cognome',
        type: 'string',
        edit: true,
        list: true,
        required: true,
        default: '',
        tab:0,
        format: (value)=>{
            return value
        }
    },
    age : {
        label: 'età',
        type: 'number',
        edit: true,
        list: true,
        required: true,
        default: '',
        tab:0,
        format: (value)=>{
            return value
        }
    },
    country : {
        label: 'nazione',
        type: 'string',
        edit: true,
        list: true,
        required: true,
        default: '',
        tab:0,
        format: (value)=>{
            return value
        }
    },
    gender : {
        label: 'sesso',
        type: 'selection',
        edit: true,
        list: true,
        required: true,
        default: [ 'M' , 'F' , 'NA' ],
        tab:0,
        format: (value)=>{
            return value
        }
    },
    education : {
        label: 'istruzione',
        type: 'selection',
        edit: true,
        list: false,
        required: true,
        default: [ 'Post-laurea' , 'Laurea' , 'Scuola superiore' , 'Altro' , 'Nessuno' ],
        tab:0,
        format: (value)=>{
            return value
        }
    },
    email : {
        label: 'email',
        type: 'email',
        edit: true,
        list: true,
        required: true,
        default : null,
        tab:0,
        format: (value)=>{
            return value
        }
    },
    phone : {
        label: 'telefono',
        type: 'string',
        edit: true,
        list: false,
        required: true,
        default: '',
        tab:0,
        format: (value)=>{
            return value
        }
    },
    industry : {
        label: 'settore',
        type: 'selection',
        edit: true,
        list: false,
        required: true,
        default: '',
        tab:0,
        format: (value)=>{
            return value
        }
    },
    function : {
        label: 'funzione',
        type: 'selection',
        edit: true,
        list: false,
        required: true,
        default: '',
        tab:0,
        format: (value)=>{
            return value
        }
    },
    role : {
        label: 'ruolo',
        type: 'selection',
        edit: true,
        list: false,
        required: true,
        default: '',
        tab:0,
        format: (value)=>{
            return value
        }
    }
}

const answers = [ "in disaccordo" , "parzialmente in disaccordo", "nè d'accordo nè in disaccordo","parzialmente d'accordo","d'accordo",]
const schema = {
    questionario : questionario ,
    persons: persons,
    surveys: questionario,
    answers: answers
}

export default schema 
