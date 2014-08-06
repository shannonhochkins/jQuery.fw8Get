// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
(function($, window, document, undefined) {

	// undefined is used here as the undefined global variable in ECMAScript 3 is
	// mutable (ie. it can be changed by someone else). undefined isn't really being
	// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
	// can no longer be modified.

	// window and document are passed through as local variable rather than global
	// as this (slightly) quickens the resolution process and can be more efficiently
	// minified (especially when both are regularly referenced in your plugin).

	// Create the defaults once
	var pluginName = "fw8Get";
	var defaults = {
		requestType: "GET",
		module: '',
		reference: '',
		type: '',
		subTemplate: '',
		tags: '',
		loadingHTML: '<div class="sprite loading"></div>',
		onSuccess: null,
		onError: null,
	};

	// The actual plugin constructor
	function Plugin(element, options) {
		this.element = element;
		// jQuery has an extend method which merges the contents of two or
		// more objects, storing the result in the first object. The first object
		// is generally empty as we don't want to alter the default options for
		// future instances of the plugin
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {
		init: function() {



			// Place initialization logic here
			// You already have access to the DOM element and
			// the options via the instance, e.g. this.element
			// and this.settings
			// you can add more functions like the one below and
			// call them like so: this.yourOtherFunction(this.element, this.settings).

			// Empty the container so that we have what we need.			
			var container = $(this.element).empty();

			// Fill the container with a loading attribute
			container.html(this.settings.loadingHTML);

			if (this.settings.module != '') {
				switch (this.settings.module) {
					case "productsByTag":
						// {store, productsByTag, tag(s), subTemplate}
						this.settings.p1 = 'store';
						this.settings.p2 = this.settings.module;
						this.settings.p3 = this.settings.tags;
						this.settings.p4 = this.settings.subTemplate;
						this.settings.url = this.module.generic(this, this.settings);
						break;
					case "blogsByTag":
						// {blog, reference, tags, settings.tags, subTemplate}
						this.settings.p1 = 'blog';
						this.settings.p2 = this.settings.reference;
						this.settings.p3 = 'tags';
						this.settings.p4 = this.settings.tags;
						this.settings.p5 = this.settings.subTemplate;
						this.settings.url = this.module.generic(this, this.settings);
						break;
					case "gallery":
						// {module, reference, sub}
						this.settings.module = 'module_gallery';
						this.settings.p1 = this.settings.module;
						this.settings.p2 = this.settings.reference;
						this.settings.p3 = this.settings.subTemplate;
						this.settings.url = this.module.generic(this, this.settings);
						break;
					case "listings":
						// {module, reference, type, sub}
						// {listing, listingName, type, subTemplateName}
						// Type can be:  mapbubble
						//               recent
						//               user
						//               geosearchbox
						//               searchbox
						//               geosearch
						//               search
						this.settings.p1 = this.settings.module;
						this.settings.p2 = this.settings.reference;
						this.settings.p3 = this.settings.type;
						this.settings.p4 = this.settings.subTemplate;
						this.settings.url = this.module.listings(this, this.settings);
						break;
					case "blocks":
						// {template_block, reference}
						this.settings.p1 = this.settings.module;
						this.settings.p2 = this.settings.reference;
						this.settings.url = this.module.generic(this, this.settings);
						break;
					case "store":
						// not setup yet
						// {category, reference, subTemplate}
						this.settings.url = this.module.generic(this, this.settings);
						break;
					case "category":
						// {category, reference, subTemplate}
						this.settings.p1 = this.settings.module;
						this.settings.p2 = this.settings.reference;
						this.settings.p2 = this.settings.subTemplate;
						this.settings.url = this.module.generic(this, this.settings);
						break;

					default:
						this.settings.url = false;
						break;
				}
			}
			if (this.settings.url != false) {
				this.settings.url = this.settings.url.replace(/\s/g, '');
				console.log('fw8Get url:' + this.settings.url);
				var self = this;
				$.ajax({
					url: self.settings.url,
					type: self.settings.requestType,
					dataType: 'json',
					async: true,
					success: function(data, status) {
						try {
							if ((data.status || status == "success") && data.content != '') {
								self.fillContent(data, container, self);
							} else if (data.content == '') {
								self.fillError("No content was found under: " + self.settings.url, container, self);
							} else {
								self.fillError("Bad request from " + self.settings.url, container, self);
							}
						} catch (err) {
							self.fillError(err.message, container, self);
						}
					},
					error: function(jqXHR, textStatus, errorThrown) {
						self.fillError(jqXHR.responseText, container, self);
					}
				});
			}
		},
		module: {
			base: '/_get/json/',
			blogsByTag: function(self, settings) {
				var sub = self.returnFlag(self.settings.subTemplate);
				return self.module.base + 'blog,' + self.settings.reference + ',tags,' + self.settings.tags + sub;
			},
			productsByTag: function(self, settings) {
				var sub = self.returnFlag(self.settings.subTemplate);
				var module = self.returnFlag(self.settings.module);
				var tags = self.returnFlag(self.settings.tags);
				return self.module.base + 'store' + module + tags + sub;
			},
			listings: function(self, settings) {
				var sub = self.returnFlag(settings.subTemplate);
				var type = self.returnFlag(settings.type);
				return self.module.base + 'listing,' + self.settings.reference + type + sub;
			},
			generic: function(self, settings) {
				var p1 = self.returnFlag(settings.p1, false);
				var p2 = self.returnFlag(settings.p2);
				var p3 = self.returnFlag(settings.p3);
				var p4 = self.returnFlag(settings.p4);
				var p5 = self.returnFlag(settings.p5);
				return self.module.base + p1 + p2 + p3 + p4 + p5;
			}

		},
		returnFlag: function(value, prependComma) {
			// If it's defined && not null && the value is not an empty string, return a comma and the string value
			// If it's NOT defined && is null, return empty string
			// If it's not defined && is not null, return just comma
			if (value != '' && typeof(value) != 'undefined' && value != null) {
				value = (prependComma != false ? ',' + value : value);
				return value;
			} else {
				return (value == null ? '' : ',');
			}
		},
		fillContent: function(data, container, self) {
			container.html(data.content).promise().done(function() {
				if (typeof(self.settings.onSuccess) == 'function') {
					self.settings.onSuccess.call(self, container, data, self);
				}
			});
		},
		fillError: function(data, container, self) {
			container.html('<p class="textAlignCenter">' + data.content + '</p>').promise().done(function() {
				if (typeof(self.settings.onError) == 'function') {
					self.settings.onError.call(self, container, data, self);
				}
			});
		}
	});

	// A really lightweight plugin wrapper around the constructor,
	$.fn[pluginName] = function(options) {
		this.each(function() {
			$.data(this, "plugin_" + pluginName, new Plugin(this, options));
		});
		return this;
	};

})(jQuery, window, document);