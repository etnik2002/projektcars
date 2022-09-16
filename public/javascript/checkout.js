// var stripe = Stripe(process.env.STRIPE_PUBLIC_KEY);

// var $form = $('checkout-form');

// $form.submit(function (event) {
//   $form.find('button').prop('disabled', true);

//   stripe.createToken(
//     {
//       number: $('#card-number').val(),
//       cvc: $('#card-cvc').val(),
//       exp_month: $('#card-expiry-month').val(),
//       year: $('#card-expiry-year').val(),
//       name: $('#card-name').val(),
//     },
//     stripeResponseHandler
//   );
//   return false;
// });

// function stripeResponseHandler(status, response) {
//   if (response.error) {
//     $form.find('#charge-error').text(response.error.message);
//     $form.find('#charge-error').removeClass('hidden');
//     $form.find('button').prop('disabled', false);
//   } else {
//     var token = response.id;
//     $form.append($('<input type="hidden" name="stripeToken" />').val(token));

//     $form.get(0).submit();
//   }
// }
