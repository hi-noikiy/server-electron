let routers = [{
  path: '/person',
  name: 'person',
  components: {
    default: require('@/components/person/center-content').default,
    right: require('@/components/person/right-content').default
  }
}];
module.exports = routers;