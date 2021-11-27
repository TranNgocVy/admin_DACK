const Handlebars = require('handlebars');


module.exports = {
    sum: (a, b) => a + b,
    select : ( value , options ) => {
        var $el = $('<select />').html( options.fn(this) );
        $el.find('[value="' + value + '"]').attr({'selected':'selected'});
        return $el.html();
    },
    option : (value, label, selectedValue) => {
        var selectedProperty = value == selectedValue ? 'selected="selected"' : '';
        return new Handlebars.SafeString('<option value="' + value + '"' +  selectedProperty + '>' + label + " </option>");
      }
}