const schema = {
    plugins: {
        "general" : {
            "name": "",
            "description": "",
            "enabled": false,
            "editor": false,
            "global": false,
            "help": "",
            "author": "",
            "version": ""
        },
        "component": {
            "path": "",
            "config": "",
            "module": {
                "url": "",
                "css": "",
                "name": ""
            }
        },
        "editor":{}
    },
    products: {
        "_id": {
            type: "string",
            edit: false,
            list: false 
        },
        "name": {
            type: "string",
            edit: true,
            list: true
        },
        "excerpt": {
            type: "text",
            edit: true,
            list: false
        },
        "code": {
            type: "string",
            edit: true,
            list: true
        },
        "categories": {
            type: "array",
            edit: true,
            list: true
        },
        "variations": {
            type: "boolean",
            edit: false,
            list: true,
        },
        "price": {
            type: "currency",
            precision: 2,
            edit: true,
            list: true
        },
        "sale": {
            type: "currency",
            precision: 2,
            edit: true,
            list: true
        },
        "active": {
            type: "boolean",
            edit: true,
            list: true
        },
        "new": {
            type: "boolean",
            edit: true,
            list: false
        },
        "image_uri": {
            type: "image",
            edit: true,
            list: true
        }
        
    },
    projects: {
        url: {
            type: 'string',
            list: true,
            edit: true,
            label: 'Whoome CMS URL'
        },
        dist: {
            type: 'string',
            list: true,
            edit: true,
            label: 'Destination folder'
        },
        uploads: {
            type: 'boolean',
            list: true,
            edit: true,
            label: 'Copy assets to destination folder'
        },
        fonts: {
            type: 'array',
            list: true,
            edit: true,
            separator: '|',
            label: 'Used fonts'
        }
    },
    articles: { 
        "title": {
            "$id": "#root/title", 
            "title": "Title", 
            "type": "string",
            "default": "",
            "pattern": "^.*$"
        },
        "excerpt": {
            "$id": "#root/excerpt", 
            "title": "Excerpt", 
            "type": "string",
            "default": "",
            "pattern": "^.*$"
        },
        "content": {
            "$id": "#root/content", 
            "title": "Content", 
            "type": "string",
            "default": "",
            "pattern": "^.*$"
        },
        "slug": {
            "$id": "#root/slug", 
            "title": "Slug", 
            "type": "string",
            "default": "",
            "pattern": "^.*$"
        },
        "homepage": {
            "$id": "#root/homepage", 
            "title": "Homepage", 
            "type": "boolean",
            "default": true
        },
        "menu": {
            "$id": "#root/menu", 
            "title": "Menu", 
            "type": "boolean",
            "default": true
        },
        "random_image": {
            "$id": "#root/random_image", 
            "title": "Random_image", 
            "type": "boolean",
            "default": true
        },
        "list_exclude": {
            "$id": "#root/list_exclude", 
            "title": "List_exclude", 
            "type": "boolean",
            "default": true
        },
        "parent": {
            "$id": "#root/parent", 
            "title": "Parent", 
            "type": "null",
            "default": null
        },
        "tags": {
            "$id": "#root/tags", 
            "title": "Tags", 
            "type": "null",
            "default": null
        },
        "image_title": {
            "$id": "#root/image_title", 
            "title": "Image_title", 
            "type": "null",
            "default": null
        },
        "component": {
            "$id": "#root/component", 
            "title": "Component", 
            "type": "string",
            "default": "",
            "pattern": "^.*$"
        },
        "user": {
            "$id": "#root/user", 
            "title": "User", 
            "type": "null",
            "default": null
        },
        "lang": {
            "$id": "#root/lang", 
            "title": "Lang", 
            "type": "string",
            "default": "",
            "pattern": "^.*$"
        },
        "template_id": {
            "$id": "#root/template_id", 
            "title": "Template_id", 
            "type": "string",
            "default": "",
            "pattern": "^.*$"
        },
        "seo_title": {
            "$id": "#root/seo_title", 
            "title": "Seo_title", 
            "type": "string",
            "default": "",
            "pattern": "^.*$"
        },
        "seo_description": {
            "$id": "#root/seo_description", 
            "title": "Seo_description", 
            "type": "string",
            "default": "",
            "pattern": "^.*$"
        },
        "blocks": {
            "$id": "#root/blocks", 
            "title": "Blocks", 
            "type": "object",
            "required": [
            ],
            "properties": {
            }
        },
        "featured_img": {
            "$id": "#root/featured_img", 
            "title": "Featured_img", 
            "type": "null",
            "default": null
        },
        "image": {
            "$id": "#root/image", 
            "title": "Image", 
            "type": "null",
            "default": null
        },
        "gallery": {
            "$id": "#root/gallery", 
            "title": "Gallery", 
            "type": "array",
            "default": []
        },
        "categories": {
            "$id": "#root/categories", 
            "title": "Categories", 
            "type": "string",
            "default": "",
            "pattern": "^.*$"
        },
        "_id": {
            "$id": "#root/_id", 
            "title": "_id", 
            "type": "string",
            "default": "",
            "pattern": "^.*$"
        },
        "createdAt": {
            "$id": "#root/createdAt", 
            "title": "Createdat", 
            "type": "string",
            "default": "",
            "pattern": "^.*$"
        },
        "updatedAt": {
            "$id": "#root/updatedAt", 
            "title": "Updatedat", 
            "type": "string",
            "default": "",
            "pattern": "^.*$"
        }
    }
}

export default schema