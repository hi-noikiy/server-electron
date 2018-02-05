let routers = [{
    path: '/statistical',
    name: 'statistical',
    components: {
        default: require('@/components/statistical/center-content').default,
        right: require('@/components/statistical/right-content').default
    },
    children: [{
        path: '', component: require('@/components/statistical/today').default
    }, {
        path: 'today',
        components: {
            default: require('@/components/statistical/today').default
        }
    }, {
        path: 'teacher',
        components: {
            default: require('@/components/statistical/teacher').default
        }
    }, {
        path: 'class',
        components: {
            default: require('@/components/statistical/class').default
        }
    }, {
        path: 'awaitDo',
        components: {
            default: require('@/components/statistical/awaitDo').default
        }
    }, {
        path: 'awaitDeal',
        components: {
            default: require('@/components/statistical/awaitDeal').default
        }
    }]
}];
module.exports = routers;