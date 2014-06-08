/*************************************************************
 * 
 * jQuery formReady Plugin - Formulario de validaciÃ³n
 --------------------------------------------- 
 * Version 0.1 - 26. May 2013
 * Document   : jQuery.formReady.js
 * Created on : 26-may-2013
 * Author     : Yonatan Alexis Quintero Rodriguez
 * Copyright (c) 2012 by Yonatan Alexis Quintero Rodriguez 
 * yonatanalexis22@hotmail.com
 **************************************************************/
(function($) {
    $.formReady = {
        defaults: {
            cssError: {
                border: '1px solid #ff3333',
                outline: 'none'
            },
            cssValidated: {
                border: '1px solid #00cc33',
                outline: 'none'
            }
        },
        showMessage: function(input, message) {

            var id = $(input).attr('id').concat('Span');
            $('#'.concat(id)).remove(":contains('" + message + "')");
            $(input).css($.formReady.defaults.cssError);
            $(input).parent().append('<span id=' + id + '><img src="../../img/FormReady/formReadyErrorIcon.png" />' + message + '</span>').addClass('formReadyError');
            $('#'.concat(id)).addClass('formReadyError').animate({'opacity': '1'}, 400);

        },
        hideMessage: function(input, message) {
            var id = $(input).attr('id').concat('Span');
            $(input).css($.formReady.defaults.cssValidated);
            $('#'.concat(id)).remove(":contains('" + message + "')").removeClass('formReadyError');

        },
        checkExpressionRegular: function(input, message, expression) {
            if (!expression.test($(input).val())) {                
                $.formReady.showMessage(input, message);
                return false;
            } else {
                $.formReady.hideMessage(input, message);
                return true;
            }
        },
        checkLength: function(input, min, max) {
            if ($(input).val().length > max || $(input).val().length < min) {
                $.formReady.showMessage(input, ' El tamaño debe estar entre  ' + min + ' y ' + max + ' caracteres');
                return false;
            } else {
                $.formReady.hideMessage(input, ' El tamaño debe estar entre  ' + min + ' y ' + max + ' caracteres');
                return true;
            }
        },
        checkMinLength: function(input, min) {
            if ($(input).val().length < min) {
                $.formReady.showMessage(input, ' Debe tener al menos  ' + min + ' caracteres');
                return false;
            } else {
                $.formReady.hideMessage(input, ' Debe tener al menos  ' + min + ' caracteres');
                return true;
            }
        },
        checkMaxLength: function(input, max) {
            if ($(input).val().length > max) {
                $.formReady.showMessage(input, ' No puede ser mayor que  ' + max + ' caracteres');
                return false;
            } else {
                $.formReady.hideMessage(input, ' No puede ser mayor que  ' + max + ' caracteres');
                return true;
            }
        },
        checkboxValidate: function(group, max) {
            var checks = $(group + ' :checkbox');
            var count = 0;
            for (var i = 0; i < $(checks).size(); i++) {
                var idCheckbox = $(checks[i]).attr('id');
                if ($('#' + idCheckbox).is(':checked')) {
                    count++;
                }
            }
            if (count === 0) {
                $.formReady.hideMessage(group, 'Seleccione como máximo ' + max + '  opción(es) !');
                $.formReady.showMessage(group, 'Seleccione al menos una opción !');
                return false;
            } else if (count > max) {
                $.formReady.hideMessage(group, 'Seleccione al menos una opción !');
                $.formReady.showMessage(group, 'Seleccione como máximo ' + max + '  opción(es) !');
                return false;
            } else {
                $.formReady.hideMessage(group, 'Seleccione como máximo ' + max + '  opción(es) !');
                $.formReady.hideMessage(group, 'Seleccione al menos una opción !');
                return true;
            }
        },
        radioValidate: function(group) {
            var radios = $(group + ' :radio');
            var count = 0;
            for (var i = 0; i < $(radios).size(); i++) {
                var idRadio = $(radios[i]).attr('id');
                if ($('#' + idRadio).is(':checked')) {
                    count++;
                }
            }
            if (count === 0) {
                $.formReady.showMessage(group, 'Seleccione  una opción !');
                return false;
            } else {
                $.formReady.hideMessage(group, 'Seleccione  una opción !');
                return true;
            }
        },
        selectValidated: function(select) {
            var s = $(select + ' :selected').val();
            if (s === '') {
                $.formReady.showMessage(select, 'Seleccione  una opción !');
                return false;
            } else {
                $.formReady.hideMessage(select, 'Seleccione  una opción !');
                return true;
            }
        },
        compareField: function(input, inputCompare) {
            if ($(input).val() === $(inputCompare).val()) {
                $.formReady.hideMessage(input, 'El contenido es diferente !');
                return true;
            } else {
                $.formReady.showMessage(input, 'El contenido es diferente !');
                return false;
            }
        },
        isName: function(input) {
            return  $.formReady.checkExpressionRegular(input, 'Debe ser un nombre valido !', /^[a-zA-Z Ã¡Ã©Ã­Ã³ÃºAÃ‰Ã�Ã“ÃšÃ‘Ã±]+$/);
        },
        isNumber: function(input) {
            return  $.formReady.checkExpressionRegular(input, 'Debe ser un número !', /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/);
        },
        isEmail: function(input) {
            return $.formReady.checkExpressionRegular(input, 'Email Incorrecto  !', /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        },
        isUrl: function(input) {
            return $.formReady.checkExpressionRegular(input, 'Url Incorrecto !', /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i);
        },
        isUserName: function(input) {
            return  $.formReady.checkExpressionRegular(input, 'Debe ser un usuario valido !', /^([a-zA-Z])[a-zA-Z_-]*[\w_-]*[\S]$|^([a-zA-Z])[0-9_-]*[\S]$|^[a-zA-Z]*[\S]$/);
        },
        isDate: function(input) {
            return  $.formReady.checkExpressionRegular(input, 'Debe ser una fecha valida !', /^\d{1,2}\/|-\d{1,2}\/|-\d{2,4}$|\d{2,4}\/|-\d{1,2}\/|-  \d{1,2}$/);
        },
        isHour: function(input) {
            return  $.formReady.checkExpressionRegular(input, 'Debe ser una hora valida !', /^(0[1-9]|1\d|2[0-3]):([0-5]\d):([0-5]\d)$/);
        },
        isCreditCard: function(input) {
            return  $.formReady.checkExpressionRegular(input, 'Debe ser una tarjeta de credito valida !', /^((67\d{2})|(4\d{3})|(5[1-5]\d{2})|(6011))(-?\s?\d{4}){3}|(3[4,7])\ d{2}-?\s?\d{6}-?\s?\d{5}$/);
        },
        isNumberPhone: function(input) {
            return  $.formReady.checkExpressionRegular(input, 'Debe ser una número de teléfono valido !', /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/);
        },
        isFieldEmpty: function(input) {
            return  $.formReady.checkExpressionRegular(input, 'El campo es requerido !', /^[a-z]|[0-9]/i);
        },
        isPasswordSafe: function(input) {
            return  $.formReady.checkExpressionRegular(input, 'Debe ser una contraseña segura !', /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,100})$/);
        },
        validateRules: function(input, rules, e) {
            for (var k = 0; k < $(rules).size(); k++) {
                    if (rules[k].trim().toLowerCase() === 'required') {
                    if (!$.formReady.isFieldEmpty(input)) {
                        e.preventDefault();
                    }
                }
                if (rules[k].trim().toLowerCase() === 'number') {
                    if (!$.formReady.isNumber(input)) {
                        e.preventDefault();
                    }
                }
                if (rules[k].trim().toLowerCase() === 'name') {
                    if (!$.formReady.isName(input)) {
                        e.preventDefault();
                    }
                }
                if (rules[k].trim().toLowerCase() === 'email') {
                    if (!$.formReady.isEmail(input)) {
                        e.preventDefault();
                    }
                }
                if (rules[k].trim().toLowerCase() === 'url') {
                    if (!$.formReady.isUrl(input)) {
                        e.preventDefault();
                    }
                }
                if (rules[k].trim().toLowerCase() === 'username') {
                    if (!$.formReady.isUserName(input)) {
                        e.preventDefault();
                    }
                }
                if (rules[k].trim().toLowerCase() === 'date') {
                    if (!$.formReady.isDate(input)) {
                        e.preventDefault();
                    }
                }
                if (rules[k].trim().toLowerCase() === 'hour') {
                    if (!$.formReady.isHour(input)) {
                        e.preventDefault();
                    }
                }
                if (rules[k].trim().toLowerCase() === 'creditcard') {
                    if (!$.formReady.isCreditCard(input)) {
                        e.preventDefault();
                    }
                }
                if (rules[k].trim().toLowerCase() === 'numberphone') {
                    if (!$.formReady.isNumberPhone(input)) {
                        e.preventDefault();
                    }
                }
                if (rules[k].trim().toLowerCase() === 'passwordsafe') {
                    if (!$.formReady.isPasswordSafe(input)) {
                        e.preventDefault();
                    }
                }

                if (rules[k].trim().toLowerCase().substring(0, 11) === 'rangelength') {
                    var exp = rules[k].trim().toLowerCase().substring(12, rules[k].trim().length - 1);
                    var numbers = exp.split(',');
                    var min = numbers[0];
                    var max = numbers[1];
                    if (!$.formReady.checkLength(input, min, max)) {
                        e.preventDefault();
                    }
                }
                if (rules[k].trim().toLowerCase().substring(0, 9) === 'minlength') {
                    var exp = rules[k].trim().toLowerCase().substring(10, rules[k].trim().length - 1);
                    var numbers = exp.split(',');
                    var min = numbers[0];
                    if (!$.formReady.checkMinLength(input, min)) {
                        e.preventDefault();
                    }
                }
                if (rules[k].trim().toLowerCase().substring(0, 9) === 'maxlength') {
                    var exp = rules[k].trim().toLowerCase().substring(10, rules[k].trim().length - 1);
                    var numbers = exp.split(',');
                    var max = numbers[0];
                    if (!$.formReady.checkMaxLength(input, max)) {
                        e.preventDefault();
                    }
                }
                if (rules[k].trim().toLowerCase().substring(0, 11) === 'validatecbx') {
                    var max = rules[k].trim().toLowerCase().substring(12, rules[k].trim().length - 1);
                    if (!$.formReady.checkboxValidate(input, max)) {
                        e.preventDefault();
                    }
                }
                if (rules[k].trim().toLowerCase() === 'validateradio') {
                    if (!$.formReady.radioValidate(input)) {
                        e.preventDefault();
                    }
                }
                if (rules[k].trim().toLowerCase() === 'validateselect') {
                    if (!$.formReady.selectValidated(input)) {
                        e.preventDefault();
                    }
                }
                if (rules[k].trim().toLowerCase().substring(0, 12) === 'comparefield') {
                    var inputCompare = rules[k].trim().substring(13, rules[k].trim().length - 1);
                    if (!$.formReady.compareField(input, inputCompare)) {
                        e.preventDefault();
                    }
                }
            }
        }
    };
    $.fn.formReady = function(rules, events) {
        try {
            this.submit(function(e) {
                var r = rules;
                var f = $(r).size();
                var c = $(r[0]).size();
                for (var i = 0; i < f; i++) {
                    for (var j = 0; j < c; j++) {
                        if (j > 0) {
                            var vald = r[i][j].split(';');
                            $.formReady.validateRules(r[i][0], vald, e);
                        }
                    }
                }
            });

            eventAssociated = function() {
                var r = rules;
                var f = $(r).size();
                var c = $(r[0]).size();
                for (var i = 0; i < f; i++) {
                    for (var j = 0; j < c; j++) {
                        if (j > 0) {
                            var vald = r[i][j].split(';');
                            $(r[i][0]).data('key', vald);
                            $(r[i][0]).on(events, function(e) {
                                var actual = '#'.concat($(this).attr('id'));
                                $.formReady.validateRules(actual, $(actual).data('key'), e);
                            });
                        }
                    }
                }
            };
            switch (events) {
                case 'blur':
                    eventAssociated();
                    break;
                case 'keyup':
                    eventAssociated();
                    break;
                default:
                    break;
            }
            return this;
        } catch (ex) {
            alert(ex);
        }
    };
})(jQuery);
