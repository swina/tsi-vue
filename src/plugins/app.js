
/**
 * Main menu
 * @label       => Menu title
 * @icon        => Icon
 * @component   => Component invoked
 * @filter      => Default filter (if applicable)
 * @items       => Submenu items
 * Submenus
 * same as Main menu 
 */

const menu = {
    items : [
        { label: 'Home' , icon: 'home' , component: 'TSIPluginDashboard' , path: '/' , filter: '' },
    //     { label: 'Blocks' , icon: 'widgets' , component: 'MokaList' , path: '' , filter: '' , 
    //         function : 'components_categories'
    //         // [
    //         //     { label: 'Pages' , icon: '' , component: 'MokaList' , path: 'moka/moka.list' , filter: 'page' },
    //         //     { label: 'Widgets' , icon: '' , component: 'MokaList' , path: 'moka/moka.list' , filter: 'widget' },
    //         //     { label: 'Templates' , icon: '' , component: 'MokaList' , path: 'moka/moka.list' , filter: 'template' },
    //         //     { label: 'Sliders' , icon: '' , component: 'MokaList' , path: 'moka/moka.list' , filter: 'slider' },
    //         //     { label: 'Components' , icon: '' , component: 'MokaList' , path: 'moka/moka.list' , filter: 'component' },
    //         //     { label: 'Archive' , icon: '' , component: 'MokaList' , path: 'moka/moka.list' , filter: 'archive' },
    //         //     { label: 'Favorites' , icon: '' , component: 'MokaList' , path: 'moka/moka.list' , filter: 'starred' },
    //         // ] 
    //     },
    //     { label: 'CMS' , icon: 'article' , path: '', component: null , 
    //         items : [
    //             { label: 'Articles' , icon: 'article' , component: 'MokaArticles' , path:'articles/moka.articles' , filter: 'article' },
    //             { label: 'Categories' , icon: 'category' , component: 'MokaCategories' , path: 'articles/moka.categories', filter: 'category' }
    //         ]
    //     },
    //     //{ label: 'Themes' , icon: 'web' , component: 'MokaThemes' , path: 'moka/moka.themes' ,filter: ''},
    //     { label: 'Media' , icon: 'photo' , component: 'MokaMedia' , path: 'media/media' , filter: 'manager' },
    //     { label: 'Shop' , icon: 'shopping_cart' , component: null , path: '' , filter: 'manager' ,
    //     items: [
    //         { label: 'Products' , icon: 'article' , component: 'MokaProducts' , filter: 'products' , path: 'shop/products/products' },
    //         { label: 'Categories' , icon: 'category' , component: 'MokaCategory' , path: 'shop/products/products.categories', filter: 'categories' },
    //         { label: 'Configuration' , icon: 'settings' , component: 'MokaShop' , filter: 'configure' },
    //     ]
    // }, 
    // { label: 'Plugins' , icon: 'settings_input_component' , component: 'MokaPlugins' , path: 'plugins/plugins' , filter: 'plugins' }, 
    // { label: 'Collections' , icon: 'dynamic_feed' , component: 'MokaPlugins' , path: 'plugins/collections/collection.vue' , filter: 'collections' }, 
    // { label: 'Share'  , icon: 'share' , component: 'MokaMarketing' , path: 'tools/social/moka.social.post' , filter: '' },
    // { label: 'Publish' , icon: 'dynamic_form' , component: 'WhoobeSettingsBuild' , filter: 'publish' , path: 'settings/whoobe.settings.build' },
    { label: 'Questionari' , icon: 'list' , component: null , path: 'plugins/tsi/admin/surveys' , filter: 'tsi' 
    //,items: [
        //    { label: 'Questionari' , icon: 'list' , component: 'TSIPluginDashboard' , filter: 'dashboard' , path: 'plugins/tsi/admin/surveys' }
        
        //]
    }, 
    { label: 'Utenti' , icon: 'people' , component: null , path: 'plugins/tsi/admin/surveys' , filter: 'tsi' },
    { label: 'Settings' , icon: 'settings' , component: 'MokaSettings' , path: '' , filter: '' },
    /*
        { label: 'Remote' , icon: 'dynamic_form' , component: null , filter: 'remote' ,
            items: [
                { label: 'Staging' , icon: 'dns' , component: 'MokaStage' , filter: 'staging' },

            ]
        },
        //{ label: 'Build' , icon: 'dynamic_form' , component: 'MokaBuild' , filter: '' },
        { label: 'Grid Templates' , icon: 'grid_on' , component: 'MokaGrid' , filter: 'demo' },
        */      
        
    ]
}

export default menu