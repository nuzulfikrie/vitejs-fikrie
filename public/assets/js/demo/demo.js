'use strict';
/*! main.js - v1.0.0
 * http://admindesigns.com/
 * Copyright (c) 2018 Admin Designs;*/

/* Demo theme functions. Required for
 * Settings Pane and misc functions */
var Demo = function(options) {

    // Default Settings
    var settings = {}
    var defaults = {
        disableLayout:          false,
        disableTopbar:          false,
        disableNavbar:          false,
        disableSidebar:         false,
        assignActiveSidebar:    true,
        assignActiveBreadcrumb: true,
    };

    // Shared Vars
    var breadcrumbs = $('#breadcrumb');
    var sidebarLeft = $('#sidebar_left');
    var sidebarMenu = sidebarLeft.find('.sidebar-menu');

    // Nano Scroller Vars
    var scrollerOptions = {
        paneClass:    'sidebar-pane',
        sliderClass:  'sidebar-slider',
        contentClass: 'sidebar-content',
        activeClass:  'has-scroller',
        sliderMaxHeight: 600,
        preventPageScrolling: true
    }

    var runDemoMenus = function() {

        // Find Active Left Sidebar Menu Item
        // var activeSidebar = $('#sidebar_left').find('.menu-open').siblings('.sub-nav').find('.active');
        // var activeSidebarLink = activeSidebar.children('a').attr('href');

        // Find Current URL page/slug
        var urlSlug = window.location.pathname;
        if (urlSlug.substring(0, 1) == '/') { urlSlug = urlSlug.substring(urlSlug.lastIndexOf("/") + 1); }

        // Find Sidebar link that matches the url slug
        var sidebarSlug = sidebarMenu.find('a[href="'+ urlSlug +'"]');

        // Assign Active Sidebar Menu Item
        if ( sidebarSlug.length && settings.assignActiveSidebar === true ) {
            sidebarSlug.parent('li').addClass('active').parents('ul').siblings('.accordion-toggle').addClass('menu-open');
        }

        // Assign Active Breadcrumb Item
        if ( sidebarSlug.length && settings.assignActiveBreadcrumb === true ) {
            var activeCrumb = breadcrumbs.find('.crumb-trail a');
            activeCrumb.attr('href', sidebarSlug.attr('href')).html(sidebarSlug.text());
        }
    }

    // Demo AdminForm Functions
    var runDemoForms = function() {

        // Prevents directory response when submitting a demo form
        $('.admin-form').on('submit', function(e) {
            e.preventDefault();

            if (Body.hasClass('timeline-page') || Body.hasClass('admin-validation-page')) {
                return;
            }
            alert('Your form has submitted!');
            return false;
        });

        // give file-upload preview onclick functionality
        var fileUpload = $('.fileupload');
        var previewFile = fileUpload.find('.fileupload-preview');
        if (fileUpload.length) {
            previewFile.on('click', function() {
                fileUpload.find('.btn-file > input').click()
            });
        }
    }

    // Demo Header Functions
    var runDemoSourceCode = function() {

        var bsElement = $(".bs-component");
        if (bsElement.length) {

            // allow caching of demo resources
            $.ajaxSetup({
                cache: true
            });

            // load highlight.js plugin script from admindesigns.com
            $.getScript("http://admindesigns.com/demos/admin/theme/vendor/plugins/highlight/highlight.pack.js");

            // Define Source code modal
            var modalSource = '<div class="modal fade" id="source-modal" tabindex="-1" role="dialog">  ' +
                '<div class="modal-dialog modal-lg"> ' +
                '<div class="modal-content"> ' +
                '<div class="modal-header"> ' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> ' +
                '<h4 class="modal-title" id="myModalLabel">Source Code HTML</h4> ' +
                '</div> ' +
                '<div class="modal-body"> ' +
                '<div class="highlight"> ' +
                '<pre> ' +
                '<code class="language-html" data-lang="html"></code> ' +
                '</pre> ' +
                '</div> </div> ' +
                '<div class="modal-footer"> ' +
                '<button type="button" class="btn btn-primary btn-clipboard">Highlight Source</button> ' +
                '</div> </div> </div> </div> </div>';


            // Append modal to body
            $(modalSource).appendTo('body');

            // Code btn definition
            var sourceModal = $('#source-modal');
            var codeBtn = $("<div id='source-button' class='btn btn-primary btn-xs'>&lt; &gt;</div>")
            codeBtn.on('click', function() {

                var html = cleanSource( $(this).parent().html() );
                var source = sourceModal.find('pre').text(html);

                source.end().modal();

                // Init Highlight.js plugin after delay
                // var source = $("#source-modal").find('pre');
                setTimeout(function() {
                    source.each(function(i, block) {
                        hljs.highlightBlock(block);
                    });
                }, 250);

                // Highlight code text on click
                $('.btn-clipboard').on('click', function() {
                    var selection = $(this).parents('.modal-dialog').find('pre').selectText();
                });

                // highlight source code if user preses "c" key
                $(document).keypress(function(e) {
                    if (e.which == 99) {
                        $('.btn-clipboard').click();
                    }
                });

            });

            bsElement.each(function(i,ele) {
            	$(this).append(codeBtn);
            })
            .hover(function() {
                codeBtn.appendTo($(this)).show();
            }, function() {
                codeBtn.hide();
            });


            // Clean HTML Helper
            var cleanSource = function(html) {
                var lines = html.split(/\n/);

                lines.shift();
                lines.splice(-1, 1);

                var indentSize = lines[0].length - lines[0].trim().length,
                    re = new RegExp(" {" + indentSize + "}");

                lines = lines.map(function(line) {
                    if (line.match(re)) {
                        line = line.substring(indentSize);
                    }
                    return line;
                });

                lines = lines.join("\n");
                return lines;
            }

            // Highlight Code Helper
            jQuery.fn.selectText = function() {
                var doc = document,
                    element = this[0],
                    range, selection;
                if (doc.body.createTextRange) {
                    range = document.body.createTextRange();
                    range.moveToElementText(element);
                    range.select();
                } else if (window.getSelection) {
                    selection = window.getSelection();
                    range = document.createRange();
                    range.selectNodeContents(element);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            };

        }
    }

    // DEMO FUNCTIONS - primarily trash
    var runDemoSettings = function() {

        if (settings.disableLayout === true) { return; }

    	var themeSettings = $('#skin-toolbox');
        if (themeSettings.length) {

            // Toggles Theme Settings Tray
            // themeSettings.find('.panel-heading').on('click', function() {
            //     themeSettings.toggleClass('toolbox-open');
            // }).disableSelection();

            // Cache component elements
            var Body = $('body');
            var Header = $('.navbar');
            var Branding = Header.children('.navbar-branding');
            var Logo = Branding.find('img');
            var Sidebar = $('#sidebar_left');
            var sidebarMenu = Sidebar.find('.sidebar-menu');
            var sidebarAuthor = Sidebar.find('.author-widget');
            var sidebarSearch = Sidebar.find('.search-widget');
            var Topbar = $('.content-topbar');
            var Breadcrumbs = $('#breadcrumb');

            // Possible Component Skins
            var headerSkins = "bg-primary bg-success bg-info bg-warning bg-danger bg-alert bg-system bg-dark bg-light navbar-gradient";
            var sidebarSkins = "sidebar-light light dark";
            var sidebarMenuOpts = "sidebar-menu-material sidebar-menu-border";
            var breadcrumbStyles = "breadcrumb-styled breadcrumb-trail";

            // Theme Settings
            var settingsObj = {
                'settingsMenu':     'open', // open/closed
                'settingsTab':      '#toolbox-header', // #toolbox-header/#toolbox-sidebar/#toolbox-topbar/#toolbox-settings
                'headerState':      'navbar-fixed-top',
                'headerSkin':       'bg-light',
                'headerBtnSkin':    '',
                'headerDuoTone':    false,
                'sidebarState':     'sidebar-relative',
                'sidebarAlign':     '',
                'sidebarSkin':      'sidebar-light',
                'sidebarMenu':      'sidebar-menu-border',
                'searchSize':       '',
                'searchBG':         'search-widget-light',
                'authorBG':         'author-widget-fill',
                'authorToggle':     '',
                'searchToggle':     '',
                'topbarStyle':      'basic', // fill/basic
                'topbarState':      'relative', // affix/relative
                'topbarHidden':     'visible', // hidden/relative
                'breadcrumbStyle':  'breadcrumb-styled', // breadcrumb-styled/breadcrumbs-trail
            };

            // Local Storage Theme Key
            var themeKey = 'admin-settings';

            // Local Storage Theme Get
            var themeGet = localStorage.getItem(themeKey);

            // Set new key if one doesn't exist
            if (themeGet === null) {
                localStorage.setItem(themeKey, JSON.stringify(settingsObj));
                themeGet = localStorage.getItem(themeKey);
            }

            // Restore Theme Settings onload from Local Storage Key
            (function() {

                // Parse Localstorage SettingsObj
                var settingsParse = JSON.parse(themeGet);
                settingsObj = settingsParse;


                // Update Hidden Panel Scrollbars on display toggle(popups, dropdowns, etc)
                var settingsDropdown = $('.settings-dropdown.dropdown');
                settingsDropdown.on('shown.bs.dropdown', function(i,e) {
                    $(this).addClass('settings-menu-open');
                    settingsObj['settingsMenu'] = 'open';
                    localStorage.setItem(themeKey, JSON.stringify(settingsObj));
                });
                settingsDropdown.on('hidden.bs.dropdown', function(i,e) {
                    $(this).removeClass('settings-menu-open');
                    settingsObj['settingsMenu'] = 'closed';
                    localStorage.setItem(themeKey, JSON.stringify(settingsObj));
                });

                // Store the active settings navigation tab. We restore it on page refresh
                themeSettings.on('click', '.nav-pills a', function(i,e) {
                    settingsObj['settingsTab'] = i.currentTarget.hash;
                    localStorage.setItem(themeKey, JSON.stringify(settingsObj));
                });

                // Activate the last viewed tab in the Settings dropdown
                if (settingsObj['settingsMenu']) {
                    $('#skin-toolbox').find('.nav-pills a[href="'+ settingsObj['settingsTab'] +'"]').tab('show') // Select tab by name
                }

                // If settings tab was never closed but page reloaded automatically open dropdown
                if (settingsObj['settingsMenu'] === 'open') {
                    $('.settings-dropdown.dropdown .dropdown-toggle').dropdown('toggle');
                }


                $.each(settingsParse, function(i, e) {
                    switch (i) {
                        case 'headerSkin':
                            Header.removeClass(headerSkins).addClass(e);
                            Branding.removeClass(headerSkins + ' dark');
                            if (e === "bg-light" || e === "navbar-gradient") {
                                Logo.attr('src', 'assets/img/logos/logo.png');
                            }
                            else {
                                Logo.attr('src', 'assets/img/logos/logo_white.png');
                            }

		                	if (settingsObj['headerDuoTone'] == true) {
			                	if (e != 'bg-light' && e != 'navbar-gradient' ) {
			                		Branding.addClass(e + ' dark');
			                	}
			 		        }

                            $('#toolbox-header-skin input[value="bg-light"]').prop('checked', false);
                            $('#toolbox-header-skin input[value="' + e + '"]').prop('checked', true);
                            break;
                        case 'headerDuoTone':
                        	var activeSkin = settingsObj['headerSkin'];
							Branding.removeClass(activeSkin + ' dark');
		                	if (settingsObj['headerDuoTone'] == true) {
			                	if (activeSkin != 'bg-light' && activeSkin != 'navbar-gradient' ) {
			                		Branding.addClass(activeSkin + ' dark');
			                	}
			                	$('#headerDuoTone').prop('checked', true);
		                	}
                        	else {
                        		$('#headerDuoTone').prop('checked', false);
                        	}
                            break;
                        case "headerBtnSkin":
                            Header.removeClass('navbar-gradient-btns').addClass(e);
                            if (e === 'navbar-gradient-btns') {
                                $('#toolbox-header-skin input[value="navbar-gradient-btns"]').prop('checked',true);
                            } else {
                                $('#toolbox-header-skin input[value="navbar-gradient-btns"]').prop('checked', false);
                            }
                            break;
                        case 'sidebarSkin':
                            Sidebar.removeClass(sidebarSkins).addClass(e);
                            $('#toolbox-sidebar-skin input[value="bg-light"]').prop('checked', false);
                            $('#toolbox-sidebar-skin input[value="' + e + '"]').prop('checked', true);
                            break;
                        case 'sidebarMenu':
                            sidebarMenu.removeClass(sidebarMenuOpts).addClass(e);
                            themeSettings.find('input[name="sidebarMenu"]').prop('checked', false);
                            themeSettings.find('input[value="'+ e +'"]').prop('checked', true);
                            break;
                        case 'searchSize':
                            if (e === "search-lg") {
                                sidebarSearch.addClass("search-lg");
                                $('#searchSize').prop('checked', true);
                            } else {
                                sidebarSearch.removeClass("search-lg");
                                $('#searchSize').prop('checked', false);
                            }
                            break;
                        case 'searchBG':
                            if (e === "search-widget-light") {
                                sidebarSearch.addClass("search-widget-light");
                                $('#searchBG').prop('checked', true);
                            } else {
                            	console.log(e);
                                sidebarSearch.removeClass("search-widget-light");
                                $('#searchBG').prop('checked', false);
                            }
                            break;
                        case 'authorBG':
                            if (e === "author-widget-fill") {
                                sidebarAuthor.addClass("author-widget-fill");
                                $('#authorSize').prop('checked', true);
                            } else {
                                sidebarSearch.removeClass("author-widget-fill");
                                $('#authorSize').prop('checked', false);
                            }
                            break;
                    	case "authorToggle":
	                    	if (e === "author-widget-hidden") {
	                    	    Body.addClass(e);
	                    	    $('#authorToggle').prop('checked', true);
	                    	} else {
	                    	    Body.removeClass(e);
	                    	    $('#authorToggle').prop('checked', false);
	                    	}
                    	    break;
	                	case "searchToggle":
	                    	if (e === "search-widget-hidden") {
	                    	    Body.addClass(e);
	                    	    $('#searchToggle').prop('checked', true);
	                    	} else {
	                    	    Body.removeClass(e);
	                    	    $('#searchToggle').prop('checked', false);
	                    	}
	                	    break;
                        case 'headerState':

                            if (settings.disableNavbar === true) { return; }

                            if (e === "navbar-fixed-top") {
                                Header.addClass('navbar-fixed-top');
                                $('#header-option').prop('checked', true);
                            } else {
                                Header.removeClass('navbar-fixed-top');
                                $('#header-option').prop('checked', false);

                                // Remove left over inline styles from nanoscroller plugin
                                // var Nano = Sidebar.add('.nano');
                                Sidebar.removeClass('affix');
                                // if ( Sidebar.attr('style')) { Sidebar.find('.sidebar-content').attr('style', ' '); }
                                Sidebar.find('.nano').nanoScroller({
                                    destroy: true
                                });

                                $('#sidebar-option').prop('checked', false);
                            }
                            break;
                        case 'sidebarState':
                            if (settings.disableSidebar === true) { return; }

                            if (e === "affix") {
                                Sidebar.addClass('affix');
                                $('#sidebar-option').prop('checked', true);
                            } else {
                                // Remove left over inline styles from nanoscroller plugin
                                Sidebar.removeClass('affix');
                                // if ( Sidebar.attr('style')) { Sidebar.find('.sidebar-content').attr('style', ' '); }
                                Sidebar.find('.nano').nanoScroller({
                                    destroy: true
                                });

                                $('#sidebar-option').prop('checked', false);
                            }
                            break;
                        case 'sidebarAlign':
                            if (e === "sb-top") {
                                Body.addClass('sb-top');
                                $('#sidebar-align').prop('checked', true);
                            } else {
                                Body.removeClass('sb-top');
                                $('#sidebar-align').prop('checked', false);
                            }
                            break;
                        case 'topbarState':

                            if (settings.disableTopbar === true) { return; }

                            // Make sure navbar is fixed otherwise topbar option is reset and disabled
                            if (settingsObj['headerState'] != "navbar-fixed-top") {
                                Topbar.removeClass('affix');
                                $('#topbarState').prop('checked', false).parent('.checkbox-custom').addClass('checkbox-disabled').end().prop('checked', false).attr('disabled', true);
                                settingsObj['topbarState'] = "relative";
                                localStorage.setItem(themeKey, JSON.stringify(settingsObj));
                                return
                            }

                            if (e === "affix") {
                                Topbar.addClass('affix');
                                $('#topbarState').prop('checked', true);
                            }
                            else {
                                Topbar.removeClass('affix');
                                $('#topbarState').prop('checked', false);
                            }

                            break;
                        case 'topbarStyle':

                            if (settings.disableTopbar === true) { return; }


                            if (e === "fill") {
                                Topbar.addClass('fill');
                                $('#topbarStyle').prop('checked', true);

                                // Toggle topbarState option off - only allow it when topbar is filled
                                $('#topbarState').prop('checked', true).parent('.checkbox-custom').removeClass('checkbox-disabled').end().attr('disabled', false);
                            }
                            else {
                                Topbar.removeClass('fill');

                                // Toggle topbarState option off - only allow it when topbar is filled
                                Topbar.removeClass('affix');
                                $('#topbarState').prop('checked', false).parent('.checkbox-custom').addClass('checkbox-disabled').end().prop('checked', false).attr('disabled', true);
                                settingsObj['topbarState'] = "relative";
                                localStorage.setItem(themeKey, JSON.stringify(settingsObj));
                            }
                            break;
                        case 'topbarHidden':
                            if (settings.disableTopbar === true) { return; }

                            if (Topbar.hasClass('hidden') || e === "hidden" ) {
                                Topbar.addClass('hidden');
                                $('#topbarHidden').prop('checked', true);
                            }
                            else {
                                Topbar.removeClass('hidden');
                                $('#topbarHidden').prop('checked', false);
                            }
                            break;
                        case 'breadcrumbStyle':
                            if (settings.disableTopbar === true) { return; }

                            Breadcrumbs.removeClass(breadcrumbStyles).addClass(e);
                            $('#toolbox-topbar-skin input[name="breadcrumbStyle"]').prop('checked', false);
                            $('#toolbox-topbar-skin input[value="' + e + '"]').prop('checked', true);
                            break;
                    }
                });

            })();

            // Header Skin Switcher
            $('#toolbox-header-skin input').on('click', function() {
                var This = $(this);
                var Val = This.val();
                var ID = This.attr('id');
                var activeSkin = settingsObj['headerSkin'];

                if (Val === "navbar-gradient-btns") {
                	if ( $('#headerGradientBtns').prop('checked') ) {
                		Header.addClass(Val);
	                	settingsObj['headerBtnSkin'] = Val;
                	}
                	else {
	                	Header.removeClass("navbar-gradient-btns")
                		settingsObj['headerBtnSkin'] = "";
	                }
                }
                else if (ID === "headerDuoTone") {
                	Branding.removeClass(headerSkins + ' dark');
                	if ($('#headerDuoTone').prop('checked')) {
	                	if (activeSkin != 'bg-light' && activeSkin != 'navbar-gradient' ) {
	                		Branding.addClass(activeSkin + ' dark');
	                	}
	                	settingsObj['headerDuoTone'] = true;
                	}
                	else {
	                	settingsObj['headerDuoTone'] = false;
	                }
                }
                else {

	                // Swap Header Skin
	                Header.removeClass(headerSkins).addClass(Val);
	                Branding.removeClass(headerSkins + ' dark');
	                if (Val === 'bg-light' || Val === 'navbar-gradient') {
	                    Logo.attr('src', 'assets/img/logos/logo.png');
	                }
	                else {
	                    Logo.attr('src', 'assets/img/logos/logo_white.png');
	                }

	                // DuoTone
                	if (settingsObj['headerDuoTone'] == true) {
	                	if (Val != 'bg-light' && Val != 'navbar-gradient' ) {
	                		Branding.addClass(Val + ' dark');
	                	}
	 		        }

	                // Save new Skin to Settings Key
	                settingsObj['headerSkin'] = Val;
            	}
            	localStorage.setItem(themeKey, JSON.stringify(settingsObj));
            });

            // Sidebar Skin Switcher
            $('#toolbox-sidebar-skin input').on('click', function() {
                var Val = $(this).val();
                var Name = $(this).attr('name');


                // if (Val === "sidebar-menu-border") {
                // 	if ( $('#sidebarBorder').prop('checked') ){
                // 		sidebarMenu.addClass(Val);
	               //  	settingsObj['sidebarBorder'] = Val;
                // 	}
                // 	else {
	               //  	sidebarMenu.removeClass("sidebar-menu-border")
                // 		settingsObj['sidebarBorder'] = "";
	               //  }
                // }
                if (Name === "sidebarMenu") {
                    sidebarMenu.removeClass(sidebarMenuOpts).addClass(Val);
                    themeSettings.find('input[name="sidebarMenu"]').prop('checked', false);
                    themeSettings.find('input[value="'+ Val +'"]').prop('checked', true);
                    settingsObj['sidebarMenu'] = Val;
                }

                else if (Val === "search-lg") {
                	if ( $('#searchSize').prop('checked') ){
                		sidebarSearch.addClass(Val);
	                	settingsObj['searchSize'] = Val;
                	}
                	else {
	                	sidebarSearch.removeClass("search-lg")
                		settingsObj['searchSize'] = "";
	                }
                }
                else if (Val === "search-widget-light") {
                	if ( $('#searchBG').prop('checked') ){
                		sidebarSearch.addClass(Val);
	                	settingsObj['searchBG'] = Val;
                	}
                	else {
	                	sidebarSearch.removeClass("search-widget-light")
                		settingsObj['searchBG'] = "";
	                }
                }
                else if (Val === "author-widget-fill") {
                    if ( $('#authorBG').prop('checked') ){
                        sidebarSearch.addClass(Val);
                        settingsObj['authorBG'] = Val;
                    }
                    else {
                        sidebarSearch.removeClass("author-widget-fill")
                        settingsObj['authorBG'] = "";
                    }
                }

                else {

	                // Swap Sidebar Skin
	                Sidebar.removeClass(sidebarSkins).addClass(Val);
	                settingsObj['sidebarSkin'] = Val;

            	}

                // Save new Skin to Settings Key
                localStorage.setItem(themeKey, JSON.stringify(settingsObj));
            });

            // Breadcrumb Skin Switcher
            $('#toolbox-topbar-skin input').on('click', function() {
                var Val = $(this).val();
                var Name = $(this).attr('name');

                if (Name === "breadcrumbStyle") {
                    Breadcrumbs.removeClass(breadcrumbStyles).addClass(Val);
                    themeSettings.find('input[name="breadcrumbStyle"]').prop('checked', false);
                    themeSettings.find('input[value="'+ Val +'"]').prop('checked', true);
                    settingsObj['breadcrumbStyle'] = Val;
                }

                // Save new Skin to Settings Key
                localStorage.setItem(themeKey, JSON.stringify(settingsObj));
            });

            // Sidebar Horizontal Setting Switcher
            $('#sidebar-align').on('click', function() {

                var sidebarAlign = "";

                if (Body.hasClass('sb-top')) {
                    Body.removeClass('sb-top');
                    sidebarAlign = "";
                } else {
                    Body.removeClass('sb-top');
                    sidebarAlign = "sb-top";
                }

                // Save new setting to Settings Key
                settingsObj['sidebarAlign'] = sidebarAlign;
                localStorage.setItem(themeKey, JSON.stringify(settingsObj));
            });

            // Header Fixed Switcher
            $('#header-option').on('click', function() {
                var headerState = "navbar-fixed-top";
                var Nano = Sidebar.add('.sidebar');

                if (Header.hasClass('navbar-fixed-top')) {
                    Header.removeClass('navbar-fixed-top');
                    headerState = "relative";


                    // Sidebar.removeClass('affix').find('.sidebar-content');
                    // if ( Sidebar.attr('style')) { Sidebar.find('.sidebar-content').attr('style', ' '); }
                    // Sidebar.nanoScroller({
                    //     destroy: true
                    // });

                    // Remove Fixed Sidebar option if navbar isnt fixed
                    Sidebar.removeClass('affix');

                    // Remove left over inline styles from nanoscroller plugin
                    // if ( Sidebar.attr('style')) { Sidebar.find('.sidebar-content').attr('style', ' '); }
                    Sidebar.find('.nano').nanoScroller({
                        destroy: true
                    });
                    $('#sidebar-option').prop('checked', false);

                    // Nano.find('.sidebar-content').attr('style', '');
                    // Nano.removeClass('affix');

                    $('#sidebar-option').parent('.checkbox-custom').addClass('checkbox-disabled').end().prop('checked', false).attr('disabled', true);
                    settingsObj['sidebarState'] = "";
                    localStorage.setItem(themeKey, JSON.stringify(settingsObj));

                    // Remove Fixed Topbar option if navbar isnt fixed
                    Topbar.removeClass('affix');
                    $('#topbarState').parent('.checkbox-custom').addClass('checkbox-disabled').end().prop('checked', false).attr('disabled', true);
                    settingsObj['topbarState'] = "";
                    localStorage.setItem(themeKey, JSON.stringify(settingsObj));

                } else {
                    Header.addClass('navbar-fixed-top');
                    headerState = "navbar-fixed-top";
                    // Enable fixed sidebar and breadcrumb options
                    $('#sidebar-option').parent('.checkbox-custom').removeClass('checkbox-disabled').end().attr('disabled', false);
                    $('#breadcrumb-option').parent('.checkbox-custom').removeClass('checkbox-disabled').end().attr('disabled', false);


                    if (settingsObj['topbarStyle'] === 'fill' ) {
                        $('#topbarState').parent('.checkbox-custom').removeClass('checkbox-disabled').end().attr('disabled', false);
                    }
                }

                // Save new setting to Settings Key
                settingsObj['headerState'] = headerState;
                localStorage.setItem(themeKey, JSON.stringify(settingsObj));
            });

            // Sidebar Fixed Switcher
            $('#sidebar-option').on('click', function() {
                var sidebarState = "";
                var Nano = Sidebar.add('.sidebar');

                if (Nano.hasClass('affix')) {

                    // Remove left over inline styles from nanoscroller plugin
                    Nano.nanoScroller({
                        destroy: true
                    });
                    Nano.find('.sidebar-content').attr('style', '');
                    Nano.removeClass('affix');

                    sidebarState = "";

                }
                else {


                    // Nano Scroller Vars
                    var scrollerOptions = {
                        // scroller:     'sidebar',
                        paneClass:    'sidebar-pane',
                        sliderClass:  'sidebar-slider',
                        contentClass: 'sidebar-content',
                        activeClass:  'has-scroller',
                        // sliderMaxHeight: 600,
                        preventPageScrolling: true
                    }


                	// If sidebar is fixed init nano scrollbar plugin
                    Nano.addClass('affix');
                    if (Nano.length) {
                        Nano.nanoScroller(scrollerOptions);
                    }
                    sidebarState = "affix";

                }

                // $(window).trigger('resize');

                // Save new setting to Settings Key
                settingsObj['sidebarState'] = sidebarState;
                localStorage.setItem(themeKey, JSON.stringify(settingsObj));
            });

            // Topbar Style Switcher
            $('#topbarStyle').on('click', function() {
                var topbarStyle = "";

                if (Topbar.hasClass('fill')) {
                    Topbar.removeClass('fill');
                    topbarStyle = "basic";

                    // Toggle topbarState option off - only allow it when topbar is filled
                    Topbar.removeClass('affix');
                    $('#topbarState').prop('checked', false);
                    $('#topbarState').parent('.checkbox-custom').addClass('checkbox-disabled').end().prop('checked', false).attr('disabled', true);
                    settingsObj['topbarState'] = "relative";
                    localStorage.setItem(themeKey, JSON.stringify(settingsObj));
                }
                else {
                    Topbar.addClass('fill');
                    topbarStyle = "fill";

                    // Allow topbarState option to be modified
                    if (settingsObj['headerState'] === 'navbar-fixed-top' ) {
                        $('#topbarState').parent('.checkbox-custom').removeClass('checkbox-disabled').end().attr('disabled', false);
                    }
                }



                // Save new setting to Settings Key
                settingsObj['topbarStyle'] = topbarStyle;
                localStorage.setItem(themeKey, JSON.stringify(settingsObj));
            });

            // Topbar Fixed Switcher
            $('#topbarState').on('click', function() {
                var topbarState = "";

                if (Topbar.hasClass('affix')) {
                    Topbar.removeClass('affix');
                    topbarState = "relative";
                } else {
                    Topbar.addClass('affix');
                    topbarState = "affix";
                }

                // Save new setting to Settings Key
                settingsObj['topbarState'] = topbarState;
                localStorage.setItem(themeKey, JSON.stringify(settingsObj));
            });

            // Topbar Hidden Switcher
            $('#topbarHidden').on('click', function() {
                var topbarHidden = "";

                if (Topbar.hasClass('hidden')) {
                    Topbar.removeClass('hidden');
                    topbarHidden = "";
                } else {
                    Topbar.addClass('hidden');
                    topbarHidden = "hidden";
                }

                // Save new setting to Settings Key
                settingsObj['topbarHidden'] = topbarHidden;
                localStorage.setItem(themeKey, JSON.stringify(settingsObj));
            });

            // Author Hidden Widget Toggle
            $('#authorToggle').on('click', function() {
            	var Val = $(this).val();
            	if (Val === "author-widget-hidden") {
            		if ( $('#authorToggle').prop('checked') ){
            			Body.addClass(Val);
            			settingsObj['authorToggle'] = Val;
            		}
            		else {
            			Body.removeClass("author-widget-hidden");
            			settingsObj['authorToggle'] = "";
            		}
            	}

            	localStorage.setItem(themeKey, JSON.stringify(settingsObj));
            });

            // Search Hidden Widget Toggle
            $('#searchToggle').on('click', function() {
            	var Val = $(this).val();
            	if (Val === "search-widget-hidden") {
            		if ( $('#searchToggle').prop('checked') ){
            			Body.addClass(Val);
            			settingsObj['searchToggle'] = Val;
            		}
            		else {
            			Body.removeClass("search-widget-hidden");
            			settingsObj['searchToggle'] = "";
            		}
            	}

            	localStorage.setItem(themeKey, JSON.stringify(settingsObj));
            });


            // Set bootbox default options
            bootbox.setDefaults({ backdrop: true, onEscape: true });

            // Clear local storage button and confirm dialog
            $("#clearLocalStorage").on('click', function() {

                // check for Bootbox plugin - should be in core
                if (bootbox.confirm) {
                    bootbox.confirm("Are You Sure?!", function(e) {

                        // e returns true if user clicks "accept"
                        // false if "cancel" or dismiss icon are clicked
                        if (e) {
                            // Timeout simply gives the user a second for the modal to
                            // fade away so they can visibly see the options reset
                            setTimeout(function() {
                                localStorage.clear();
                                location.reload();
                            }, 200);
                        } else {
                            return;
                        }
                    });

                }
            });

        }
    }

    // Run Demo Precache
    var runDemoPreCache = function() {

        // Preload Library:
        preload([
            'assets/img/logos/logo_white.png',
        ]);

        // Preload Function
        function preload(arrayOfImages) {
            $(arrayOfImages).each(function(){
                $('<img/>')[0].src = this; // (new Image()).src = this; // Alternatively you could use this
            });
        }
    }

    var runFullscreenDemo = function() {

        // If browser is IE we need to pass the fullsreen plugin the 'html' selector
        // rather than the 'body' selector. Fixes a fullscreen overflow bug
        var selector = $('html');

        var ua = window.navigator.userAgent;
        var old_ie = ua.indexOf('MSIE ');
        var new_ie = ua.indexOf('Trident/');
        if ((old_ie > -1) || (new_ie > -1)) { selector = $('body'); }

        // Fullscreen Functionality
        var screenCheck = $.fullscreen.isNativelySupported();

        // Attach handler to navbar fullscreen button
        $('.request-fullscreen').on('click', function() {

            // Check for fullscreen browser support
            if (screenCheck) {

                // If we are already in fullscreen unbind esc handler and exit fullscreen
                if ($.fullscreen.isFullScreen()) {
                    $.fullscreen.exit();
                    // $(document).unbind('keyup.request_fullscreen');
                }
                // If we are not fullscreen bind esc handler and enter fullscreen
                else {
                    selector.fullscreen({ overflow: 'auto' });
                    // $(document).one('keyup.request_fullscreen', function(e) {
                    //     if (e.keyCode == 27) { $.fullscreen.exit(); }
                    // });
                }
            }
            else {
                alert('Your browser does not support fullscreen mode.')
            }
        });

    }

    return {
        init: function(options) {

            // Extend Default Options and expose to Core for shared yet scoped use
            settings = $.extend({}, defaults, options);

            // Run Demo Init Functions
        	runDemoPreCache();
            runDemoMenus();
            runDemoForms();
            runDemoSourceCode();
            runDemoSettings();
            runFullscreenDemo();
        }
    }
}();