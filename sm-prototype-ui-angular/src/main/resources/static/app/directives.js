(function (angular) {
    var textField = function($compile) {
        var requiredEnableValues = ["", "true", "1"];
        return {
            restrict: 'E',
            transclude: true,
            link: function($scope, element, attrs) {
                var model = attrs['model'];
                if (!model) {
                    throw "You didn't provide model to text field. Check the form template";
                }
                var $form = $($(element).parents("form, sm-form")[0]);
                if ($form.length === 0) {
                    throw "Text field must be inside a form!";
                }
                var formName = $form.attr('name');
                if (!formName) {
                    throw "You must provide a form name the field is in";
                }
                var id = attrs['id'] || model;

                var parts =id.split(".");

                var guessedName = parts[parts.length - 1];
                var name = attrs['name'] || guessedName;
                var label = attrs['label'] || name;
                var placeholder = attrs['placeholder'] || name+"...";
                var requiredAttr = requiredEnableValues.indexOf(attrs['required']) !== -1 && " required" || "";
                var minLengthAttr = (attrs['minlength'] && ' ng-minlength="' + attrs['minlength'] + '"') || "";
                var maxLengthAttr = (attrs['maxlength'] && ' ng-maxlength="' + attrs['maxlength'] + '"') || "";
                var validationMessages = '';
                validationMessages += '<div ng-messages="'+formName+'.'+name+'.$error">';
                if (minLengthAttr) {
                    console.log("Min length enabled for " + model);
                    validationMessages += '<p ng-message="minlength">'+label+' is too short.</p>';
                }
                if (maxLengthAttr) {
                    console.log("Max length enabled for " + model);
                    validationMessages += '<p ng-message="maxlength">'+label+' is too long.</p>';
                }
                if (requiredAttr) {
                    console.log("Required enabled for " + model);
                    validationMessages += '<p ng-message="required">'+label+' is required.</p>';
                }
                validationMessages += '<p ng-message="serverMessage">{{'+formName+'.'+name+'.$error.serverMessage}}</p>';
                validationMessages += '</div>';
                var template = '<div class="form-group" ng-class="{\'has-error\': '+formName+'.'+name+'.$invalid}">' +
                    '<label class="col-sm-3 ">'+label+':</label>' +
                    '<div class="col-sm-9">' +
                        '<input type="text" class="form-control" ng-model="'+model+'" name="'+name+'" placeholder="'+placeholder+'" '+minLengthAttr+''+maxLengthAttr+''+requiredAttr+'/>' +
                        validationMessages +
                        '</div>' +
                    '</div>';
                element.html(template);
                var $result = $compile(element.contents())($scope);
                $($result).on('keyup', 'input', function(){
                    $scope[formName][name].$setValidity('serverMessage', true);
                });
            }
        };
    }
    var smForm = function($compile) {
        var defaultValues = {
              "class": "form-horizontal",
            "role": "form",
            "novalidate": null
        };
        return {
            restrict: 'E',
            transclude: false,
            link: function($scope, element, attrs) {
                var originalContent = $(element).html();
                var template = '<form';

                for (var key in attrs.$attr) {
                    var value = attrs.$attr[key];
                    template += ' '+key+'="'+value+'"';
                }
                for (var key in defaultValues) {
                    if (!(key in attrs.$attr)) {
                        var value = defaultValues[key];
                        template += ' '+key;
                        if (value !== null) {
                            template+='="'+ value+'"'
                        }
                    }
                }
                template += '>' + originalContent + '</form>';

                element.html(template);
                $compile(element.contents())($scope);
            }
        };
    }

    var saveButton = function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                onsave: "&onsave",
                saving: "=saving"
            },
            replace: true,
            template: '' +
            '<button class="btn btn-success" type="button" title="Save" ng-click="onsave()">' +
            '<span class="glyphicon glyphicon-ok" ng-transclude></span>' +
            '</button>',
            link: function($scope, element, attrs) {
                var savingText = attrs['saving-text'] || 'Saving...';
                savingText = " " + savingText;
                var $span = element.find('span');
                var originalText = $span.html();
                $scope.$watch('saving', function(newValue){
                    if (newValue) {
                        element.attr('disabled', true);
                        $span.html(savingText);
                    } else {
                        element.attr('disabled', false);
                        $span.html(originalText);
                    }
                });
            }
        };


    }
    var module = angular.module("myApp.directives");
    module.directive("textField", textField);
    module.directive("smForm", smForm);
    module.directive("saveButton", saveButton);
})(angular);