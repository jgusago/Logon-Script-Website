//daterangepicker
(function( $, DataTable ) {
    'use strict';


    if ( ! DataTable.ext.editorFields ) {
        DataTable.ext.editorFields = {};
    }

    var _fieldTypes = DataTable.Editor ?
            DataTable.Editor.fieldTypes :
            DataTable.ext.editorFields;

    _fieldTypes.daterangepicker = {
        create: function ( conf ) {

            conf._input = $('<input/>')
                    .attr( $.extend( {
                        id: conf.id,
                        type: 'text'
                    }, conf.attr || {} ) )
                    .daterangepicker( conf.opts || {} );

            return conf._input[0];
        },

        get: function ( conf ) {
            $(conf._input).data('daterangepicker').elementChanged(); //Update dates of the picker from input
            return conf._input.val();
        },

        set: function ( conf, val ) {
            conf._input.val( val );
        }

    };

})(jQuery, jQuery.fn.dataTable);****
