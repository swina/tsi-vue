/**
 * General usage functions
 */
import Vue from 'vue'
import store from '../store'

export default {
    install: function (Vue) {
    
    Vue.prototype.$mapState = () => {
        
        let mp = {
            desktop: store.state.desktop,
            datastore: store.state.datastore,
            editor: store.state.editor,
            moka: store.state.moka,
        }
        return mp
    }

    

    Vue.prototype.$message = ( msg => {
        store.dispatch ( 'message' , msg )
    })

    Vue.prototype.$action = ( (action = null) =>{
        store.dispatch('setAction',action)
    })
    Vue.prototype.$subaction = ( (action = null) =>{
        store.dispatch('setSubAction',action)
    })

    Vue.prototype.$loading = ( status = false ) => {
        store.dispatch ( 'loading' , status )
    }


    Vue.prototype.$clean = function ( str = '' ){
        if ( !str ) return ''
        str = str.replace(/\s\s+/g, ' ')
        return [...new Set(str.split(' '))].join(' ')
    }

    Vue.prototype.$trim = function ( str = '' ){
        if ( !str ) return ''
        return str.replace(/\s\s+/g, ' ')
    }

    Vue.prototype.$cleanImage = ( img ) => {
        return {
            id: img.id,
            name: img.name,
            url: img.url,
            width: img.width,
            height: img.height,
            size: img.size,
            ext: img.ext,
            alternative_text: img.alternative_text,
            caption: img.caption
        }
    }

    
    Vue.prototype.$imageURL = ( image ) => {
        if ( !image ) return ''
        let url = ''
        if ( image.hasOwnProperty('uri') ){
            return image.uri
        }
        
        image.hasOwnProperty('url') ? 
            image.url.includes('data:image') ? url = image.url :
            image.url.includes('http') ? 
                url = image.url : 
                    url = ( window.localStorage.getItem('moka-strapiurl') || process.env.VUE_APP_API_URL ) + image.url.replace('/','') :
                        image.includes ( 'http' ) ? 
                            url = image : 
                                url = ( window.localStorage.getItem('moka-strapiurl') || process.env.VUE_APP_API_URL ) + image.substring(1) 
        return url
        
    }

    Vue.prototype.$imagePreviewURL = ( image ) => {
        if ( !image ) return ''
        let url = ''
            image.previewUrl ? 
                image.previewUrl.includes('http') ? 
                    url = image.previewUrl : 
                        url = ( window.localStorage.getItem('moka-strapiurl') || process.env.VUE_APP_API_URL ) + image.previewUrl.replace('/','') :
                            image.url.includes('http') ? url = image.url : 
                                url =  ( window.localStorage.getItem('moka-strapiurl') || process.env.VUE_APP_API_URL ) + image.url.replace('/','') 
        
        return url
        
    }

    Vue.prototype.$imageToDataURI = ( image ) => {
        return async (image) => {
            let blob = await fetch(image).then(r => r.blob());
            let dataUrl = await new Promise(resolve => {
                let reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
            return dataUrl
        }
    }

    Vue.prototype.$imageFromURL = ( image ) => {
        async (image) => {
            let blob = await fetch(image).then(r => r.blob());
            let dataUrl = await new Promise(resolve => {
                let reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
            return dataUrl
        }
    }

    Vue.prototype.$layer = (element)=>{
            
        let classe = ''
        
        if ( element.css.length ){
            let cl = element.css.split(' ')
            cl.forEach ( z => {
                z.indexOf('z-') > -1 ? classe += z : null
            })
        }
        return classe
    },
    Vue.prototype.$isExtLink = ( link ) => {
        return link && link.indexOf('http') > -1 ? true : false
    }

    Vue.prototype.$widget = function ( widgets , id ){
        return id ? widgets.filter ( w => { return w.id === parseInt(id) })[0] : null
    }

    Vue.prototype.$hasTimer = function ( classe ){
        if ( !classe ) return false
        let a = classe.split(' ')
        let timer = false
        a.forEach ( c => {
            if ( c.indexOf ( 'nuxpresso-timer') > -1 ){
                console.log ( c )
                timer = c.split('-').length > 2 ? c.split('-')[2] : 1000
            }
        })
        return timer
    }

    Vue.prototype.$icons = function(){
        return icons.split(',')
    }

    Vue.prototype.$moment = function ( d= new Date , format = 'MM-DD-YYYY' ) {
        return moment ( d ).format ( format )
    }

    Vue.prototype.$slugify = function ( text = '' ){
        return text.toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'') 
    }

    Vue.prototype.$twColor = function ( field ){
        let classe = ''
        if ( field ){
            classe += field.color ?
                field.tw_color : ''
            classe += field.css ? ' ' + field.css : ''
        }
        return classe
    }

    Vue.prototype.$colorClass = function ( pref = 'bg' , color , tone ){

        if ( color != 'transparent' && color != 'black' && color != 'white' ) {

            return pref + '-' + color + '-' + tones[tone]
        } else {
            return pref + '-' + color
        }

    }

    Vue.prototype.$colorize = function ( theme , element  ){
        return theme[element] ? colorTones ( element.split('_')[1] , theme[element].color , theme[element].density ) : ''
    }

    
    Vue.prototype.$nuxpColor = function ( pref = 'bg' , color , tone ){
        if ( color != 'transparent' && color != 'black' && color != 'white' ) {
            return pref + '-' + color + tone ? '-' + tone : ''
        } else {
            return pref + '-' + color
        }
    }

    

    Vue.prototype.$menuLink = function ( item ){
        if ( !item ) return null
        return item.article ?
            '/articles/' + item.article.slug :
                item.category ? '/categories/' + item.category.slug :
                    item.link_url ? item.link_url : false
    }

    Vue.prototype.$btnClass = function ( theme ){
        let classe = theme.buttons_fg ? ' ' + theme.buttons_fg.tw_color : ' '
            classe += theme.buttons_bg ? ' ' + theme.buttons_bg.tw_color : ' '
            classe += ' ' + theme.buttons_bg.css +  ' ' + theme.buttons_fg.css
            return classe
    }

    Vue.prototype.$cookie = function(cname){
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return ''
    }

    Vue.prototype.$setCookie = function(cname,days){
        let d = new Date()
        d.setTime(d.getTime() + (parseInt(days) * 24 * 60 * 60 * 1000))
        let expiration = 'expires=' + d.toUTCString()
        document.cookie = cname + '=gpdr;' + expiration + ';path=/'
    }

    /* used for vue-here-map */
    Vue.prototype.$loadMapScript = function ( ) { // eslint-disable-line no-param-reassign
        return new Promise(function (resolve, reject) {
            if (document.querySelector('script[src="' + baseURL + src + '"]')) {
                resolve();
                return;
            }

            const el = document.createElement('SCRIPT');

            el.src = baseURL + src;
            el.defer = true
            el.async = true;
            el.type = 'module';

            el.addEventListener('load', resolve);
            el.addEventListener('error', reject);
            el.addEventListener('abort', reject);

            document.head.appendChild(el);
            let hereMapStyle = document.createElement('LINK')
            let url = baseURL + styles
            hereMapStyle.setAttribute('href' , url )
            hereMapStyle.setAttribute( 'rel' , 'stylesheet' )
            hereMapStyle.setAttribute( 'type' , 'text/css' )
            document.head.appendChild(hereMapStyle)
        });
    };

    Vue.prototype.$randomID = () => {
        return 'moka-' + Math.random().toString(36).substr(2, 5)
    }

    Vue.prototype.$randomKey = (length=6) => {
        return Math.random().toString(16).substr(2, length);
    }

    Vue.prototype.$debounce = (callback, duration) => {
        var timer;
        return function(event) {
        clearTimeout(timer);
        timer = setTimeout(function(){
            callback(event);
        }, duration);
        };
    }

    Vue.prototype.$arrayGroup = function ( arr , key , summ = {} ){
        /**
         @arr = array of objects (required)
         @key = key to group (required)
         @summ = key to sum
         group array of objects on given key, sum on key , count for given key
         return object grouped
            keys = grouped keys
            values = values for the each grouped keys
            sums = sum of values of field x for each grouped keys
            counters = counter for each grouped key
         */
        if ( arr != 'undefined' ){
          let counter = 0
          let sums = []
          let counters = []
          let sum_field = summ
          let total = 0
          let grouped = arr.reduce((h, item) => Object.assign(h, { [item[key]]:( h[item[key]] || [] ).concat(item) }), {})
          let keys = Object.keys(grouped)
          if ( summ ){
            Object.values(grouped).map(item=>{
              total = 0
              counter = 0
              item.map(i=>{
                counter++
                total += parseFloat(i[sum_field])
              })
              sums.push(total)
              counters.push(counter)
            })
          }
          return {
            keys: Object.keys(grouped),
            values: Object.values(grouped),
            sums: sums,
            counters: counters
          }
        }
        return null
      }

      Vue.prototype.$csvjson = ( csv = '' , sep= ',' ) => {
        if ( !csv ) return {}
        var lines=csv.split("\n");
        var errors = []
        var result = [];
        
        var headers=lines[0].split(sep);
        headers = headers.map ( h => {
            return h.replace(/"/g,'')
        })
        for(var i=1;i<lines.length;i++){
            var obj = {};
            var currentline=lines[i].split(sep);
            if ( currentline.length != headers.length ){
                errors.push ( 'row ' + i + ' incomplete fields mapping => ' + currentline )
            } else {
                for(var j=0;j<headers.length;j++){
                    obj[headers[j]] = currentline[j];
                }
                result.push(obj);
            }
        
        }
        console.log ( result )
        return {
            data: JSON.parse(JSON.stringify(result) ),
            meta: headers,
            errors: errors
        }
        //return result; //JavaScript object
        //return JSON.stringify(result); //JSON
    
    }
    }

   
}
