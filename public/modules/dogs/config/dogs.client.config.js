/*jslint node: true */
/*global $, angular */
'use strict';

// Configuring the Articles module
angular.module('dogs').run(['Menus',
    function (Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Honden', 'dogs', 'dropdown', '/dog(/create)?');
        Menus.addSubMenuItem('topbar', 'dogs', 'Lijst van honden', 'dogs');
        Menus.addSubMenuItem('topbar', 'dogs', 'Nieuwe hond', 'dogs/create');
    }
    ]);
