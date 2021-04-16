/**
 * 
 * Lazy load component reference
 * __components : Object of components reference relative to:
 * 
 * !actions : component to load when a new action is fired using modal component
 * * component is loaded in modal window
 * @title : Modal window title
 * @size : Modal size 
 * @position: Modal position
 * @height: Modal height
 * @component: component path relative to @/components/
 */

const __components = {
    actions: {
        component_settings: {
            title: 'General settings',
            size: 'md',
            position: 'modal-bottom-right',
            component: 'moka/editor/components/whoobe.editor.component.settings'
        },
        component_export: {
            title: 'Export Blocks',
            size: 'sm',
            position: 'modal',
            component: 'moka/editor/components/whoobe.editor.export.component'
        },
        component_preview: {
            title: 'Preview',
            size: 'fullscreen',
            position: '',
            component: 'moka/editor/preview/whoobe.preview'
        },
        component_preview_html:{
            title: 'HTML',
            size: 'md',
            position: 'modal',
            component: 'moka/editor/preview/whoobe.preview.html'
        },
        block_edit : {
            title: 'Edit',
            size: 'lg',
            position: 'modal-top-right',
            component: 'moka/editor/components/whoobe.editor.block.edit'
        },
        block_menu : {
            title: 'Menu Edit',
            size: 'fullscreen',
            position: '',
            component: 'moka/editor/components/whoobe.editor.menus'
        },
        edit_css : {
            title: 'Edit CSS/Style',
            size: 'md',
            position: 'modal-bottom-right mb-10',
            component: 'moka/editor/components/whoobe.editor.css'
        },
        heading_selector :{
            title: 'Heading selector',
            size: 'sm',
            position: 'modal',
            component: 'moka/editor/components/whoobe.element.heading'
        },
        icon_selector: {
            title: 'Icon selector',
            size: 'md',
            position: 'modal-top-right',
            component: 'moka/editor/components/whoobe.editor.icons'
        },
        customize: {
            fullscreen: false,
            title: 'Customizer', 
            size: 'sm',
            position: 'modal-top-right',
            component: 'moka/editor/components/customize/whoobe.customizer.container'
        },
        grids: {
            size: 'md',
            title: 'Grid Templates',
            position: 'modal',
            component: 'moka/editor/components/whoobe.grids'
        },
        editor: null,
        addcomponent: {
            title: 'Add blocks element',
            size: 'md',
            position: 'modal-top-right',
            component: 'moka/editor/components/whoobe.editor.blocks.elements'
        },
        addreusable: {
            title: 'Add reusable block',
            size: 'md',
            position: 'modal-top-right',
            component: 'moka/editor/components/whoobe.editor.reusable'
        },
        replaceelement: null,
        error: {
            title: 'Error',
            component: 'error'
        },
        media : {
            title: 'Media',
            component: 'media/media',
            size: 'fullscreen',
            position: ''
        },
        media_edit : {
            title: 'Media Info',
            component: 'media/media.edit',
            size: 'md',
            position: 'modal-top-right'
        },
        media_from_url :{
            title: 'Media from URL',
            component: 'media/media.from.url',
            size: 'md',
            position: 'modal-top-right'
        },
        filerobot :{
            title: 'Image Editor by Filerobot',
            component: 'media/editor/whoobe.filerobot',
            size: 'fullscreen',
            fixed: true
        },
        //save current component 
        savecomponent: {
            size: 'sm',
            title: 'Save Component',
            component: 'moka/moka.save.component',
            position : 'modal'
        },
        //save current block as component
        saveasreusable: {
            size: 'md',
            position: 'modal',
            title: 'Save Blocks as Reusable',
            component: 'editor/actions/editor.save.as.reusable'
        },
        //create a new article from the blocks editor
        createpage: {
            size: 'sm',
            position: 'modal',
            title: 'Create article',
            component: 'editor/actions/editor.create.page'
        },
        editslides: {
            size: 'lg',
            title: 'Slider Editor',
            component: 'editor/render/moka.editor.slides'
        },
        addplugin: {
            size: 'lg',
            position: 'modal',
            title: 'Add Plugin',
            component: 'editor/render/moka.plugins',
        },
        animation: {
            size: 'md',
            title: 'Animation',
            component: 'moka/editor/components/editing/whoobe.editor.editing.animation',
            position: 'modal-bottom-left',
        },
        formsetting: {
            size: 'sm',
            title: 'Form settings',
            component: 'editor/settings/moka.editor.form.settings',
            position: '',
            height: ''
        },
        loopcontrol: {
            size: 'sm',
            title: 'Collection loop settings',
            component: 'editor/settings/moka.editor.loop.settings'
        },
        pluginsetting: {
            size: 'md',
            title: 'Plugin settings',
            component: 'editor/settings/moka.editor.plugin.settings'
        },
        popupsettings: {
            size: 'md',
            title: 'Modal/Popup settings',
            component: 'editor/settings/moka.editor.popup.settings',
        },
        slidersettings: {
            size: 'md',
            title: 'Slider settings',
            component: 'editor/settings/moka.editor.slider.settings'
        },
        tree: {
            size: 'sm', 
            title: 'Blocks tree',
            component: 'editor/settings/moka.tree.draggable',
            position: 'modal-top-right'
        },
        app_generate: {
            size: 'md',
            title: 'Website Generator',
            component: 'settings/whoobe.settings.build'
        },
        whoobe_templates: {
            size:'lg',
            title: 'Select a template',
            component: 'articles/moka.articles.templates'
        },
        whoobe_product: {
            size: 'lg',
            title: 'Edit product',
            component: 'shop/products/products.edit'
        }
    }
}

export default __components