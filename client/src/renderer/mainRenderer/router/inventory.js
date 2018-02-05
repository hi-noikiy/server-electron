let routers = [{
  path: '/inventory',
  name: 'inventory',
  components: {
    default: require('@/components/inventory/center-content').default,
    right: require('@/components/inventory/right-content').default
  }
}];
module.exports = routers;