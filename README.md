fw8Get
===============

This plugin is built for framework, it takes advantage of ajax and makes the process a whole lot more simple.



Usage
--------------

```javascript
$('.element').fw8Get({
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


| Options         | Type                                        | Description  |
| ------------- |:-------------:| -----:|
| module                | string                                | The module name |
| reference             | string                                | The reference name of an item in the module. |
| type                  | string                                | The type of the reference. |
| subTemplate           | string                                | The subtemplate of the reference. |
| tags                  | string                                | Get the references by tags |
| loadingHTML           | string                                | The default html used to add to the container. |
| onSuccess             | function() {elem, data, plugin}       | Callback if the ajax call was successful. |
| onError               | function() {elem, data, plugin}       | Callback if the ajax call failed. |


Url Formats
--------------

So far I believe I cover the following url formats that can be parsed to the urlOrID option. It may handle more than this! :)


How to get module content
===============

All Modules have the following options working for everything.

```javascript

$('.element').fw8Get({
    module: '',
    loadingHTML: '',
    onSuccess: null,
    onError: null,
}); 
```


Get Products By Tag - Available Options
---------------

```javascript

$('.element').fw8Get({
    module: 'productsByTag',
    tags: 'tag~another+tag', // Note: ~ seperates multiple tags.
    subTemplate: 'categorySubtemplateName',
});
```

Get Blogs By Tag - Available Options
---------------

```javascript

$('.element').fw8Get({
    module: 'blogsByTag',
    reference: 'blogGroupName',
    tags: 'tag~another+tag', // Note: ~ seperates multiple tags.
    subTemplate: 'blogSubtemplate',
});
```

Get Gallery - Available Options
---------------

```javascript

$('.element').fw8Get({
    module: 'gallery',
    reference: 'galleryName',
    subTemplate: 'gallerySubtemplateName',
});
```

Get Listings - Available Options
---------------

```javascript

$('.element').fw8Get({
    module: 'listings',
    reference: 'listingsGroupName',
    type: 'mapbubble', // Type can be:  mapbubble,recent,user,geosearchbox,searchbox,geosearch,search                    
    subTemplate: 'lisitingOfItemsSubtemplateName',
});
```

Get Template Block - Available Options
---------------

```javascript

$('.element').fw8Get({
    module: 'blocks',
    reference: 'blockName',
});
```

Get Category - Available Options
---------------

```javascript

$('.element').fw8Get({
    module: 'category',
    reference: 'categoryName',
    subTemplate: 'categorySubtemplate',
});
```





