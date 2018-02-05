let routers = [{
  path: '/charge',
  name: 'charge',
  components: {
    default: require('@/components/charge/center-content').default,
    right: require('@/components/charge/right-content').default
  }
}];
module.exports = routers;