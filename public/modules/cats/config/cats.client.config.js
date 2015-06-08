/*jslint node: true */
/*global $, angular */
'use strict';

// Configuring the Cats module
angular.module('cats').run(['Menus',
    function (Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Katten', 'cats', 'dropdown', '/cats(/create)?');
        Menus.addSubMenuItem('topbar', 'cats', 'Lijst van katten', 'cats');
        Menus.addSubMenuItem('topbar', 'cats', 'Nieuwe kat', 'cats/create');
    }
    ]);
