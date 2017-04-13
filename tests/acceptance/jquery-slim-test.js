import Ember from 'ember'
import $ from 'jquery'
import { test } from 'qunit'
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance'

moduleForAcceptance('Acceptance | jquery slim')

test('Comparing jQuery version', function(assert) {
  visit('/')

  andThen(function() {
    assert.equal(currentURL(), '/')
    assert.equal($.fn.jquery, '3.2.1 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-effects,-effects/Tween,-effects/animatedSelector')
    assert.equal(Ember.$.fn.jquery, $.fn.jquery)
  })
})
