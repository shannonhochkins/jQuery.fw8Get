jQuery - fw8Get
===============

Repository for framework automating the ajax calls for modules.



Usage
--------------

```javascript
$('.element').fw8Get({
    format: 'json',
    module: '',
    reference: '',
    type: '',
    subTemplate: '',
    tags: '',
    loadingHTML: '<div class="sprite loading"></div>',
    onSuccess: null,
    onError: null,
});
```


Options
--------------


| Options         | Type                                        | Description |
| ------------- |:-------------:|:-----|
| format                | string                                | The main format of the request |
| module                | string                                | The module name |
| reference             | string                                | The reference name of an item in the module. |
| type                  | string                                | The type of the reference. |
| subTemplate           | string                                | The subtemplate of the reference. |
| tags                  | string                                | Get the references by tags |
| loadingHTML           | string                                | The default html used to add to the container. |
| custom                | string                                | A custom url format option. The module also has to be set to 'custom'. |
| onSuccess             | function() {elem, data, plugin}       | Callback if the ajax call was successful. |
| onError               | function() {elem, data, plugin}       | Callback if the ajax call failed. |



## How to get module content
===============

All Modules have the following options, some modules don't allow certain parameters but these are allowed in all.

```javascript

$('.element').fw8Get({
    format: 'json',
    module: 'moduleName',
    loadingHTML: 'loading...',
    onSuccess: null,
    onError: null,
}); 
```

Not all modules are set up yet, but here's a list of the available modules currently setup with fw8Get


##### Get Products By Tag - Available Options
---------------

```javascript

$('.element').fw8Get({
    module: 'productsByTag',
    tags: 'tag~another+tag', // Note: ~ seperates multiple tags.
    subTemplate: 'categorySubtemplateName',
});
```

##### Get Blogs By Tag - Available Options
---------------

```javascript

$('.element').fw8Get({
    module: 'blogsByTag',
    reference: 'blogGroupName',
    tags: 'tag~another+tag', // Note: ~ seperates multiple tags.
    subTemplate: 'blogSubtemplate',
});
```

##### Get Gallery - Available Options
---------------

```javascript

$('.element').fw8Get({
    module: 'gallery',
    reference: 'galleryName',
    subTemplate: 'gallerySubtemplateName',
});
```

##### Get Listings - Available Options
---------------

```javascript

$('.element').fw8Get({
    module: 'listings',
    reference: 'listingsGroupName',
    type: 'mapbubble', // Type can be:  mapbubble,recent,user,geosearchbox,searchbox,geosearch,search                    
    subTemplate: 'lisitingOfItemsSubtemplateName',
});
```

##### Get Template Block - Available Options
---------------

```javascript

$('.element').fw8Get({
    module: 'blocks',
    reference: 'blockName',
});
```

##### Get Category - Available Options
---------------

```javascript

$('.element').fw8Get({
    module: 'category',
    reference: 'categoryName',
    subTemplate: 'categorySubtemplate',
});
```

##### Getting custom content or creating your own URL format to request custom content from any allowed module.
---------------

```javascript

$('.element').fw8Get({
    module: 'custom',
    custom: 'menu, menuname'
    // The actual request will look like this: /_get/json/menu,menuname
});
```



