/*jslint node: true */
/*global $, angular */
"use strict";

// Configuring the Articles module
angular.module('dogs').run(['Menus',
    function (Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Dogs', 'dogs', 'dropdown', '/dog(/create)?');
        Menus.addSubMenuItem('topbar', 'dogs', 'List Dogs', 'dogs');
        Menus.addSubMenuItem('topbar', 'dogs', 'New Dog', 'dogs/create');
    }
    ]);
