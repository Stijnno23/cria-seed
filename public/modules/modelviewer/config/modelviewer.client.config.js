'use strict';

// Configuring the Articles module
angular.module('modelviewer').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Modelviewer', 'modelviewer', 'dropdown', '/modelviewer(/create)?');
        Menus.addSubMenuItem('topbar', 'modelviewer', 'modelviewerlist', 'modelviewer');
        Menus.addSubMenuItem('topbar', 'modelviewer', 'modelviewer create', ' modelviewer/create');
    }
]);
