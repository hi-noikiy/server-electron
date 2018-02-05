let routers = [{
  path: '/wechat',
  name: 'wechat',
  components: {
    default: require('@/components/wechat/center-content').default,
    right: require('@/components/wechat/right-content').default
  }
}];
module.exports = routers;