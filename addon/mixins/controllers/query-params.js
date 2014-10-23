import Ember from 'ember';

var queryParamsMixin;

queryParamsMixin = Ember.Mixin.create({
  queryParams: ['page', 'perPage', 'q'],
  page: 1,
  perPage: 25,
  q: '',
  sort: '',
  sortType: ''
});

export default queryParamsMixin;