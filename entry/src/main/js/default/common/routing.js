import router from '@system.router';

function gotoDashboard() {
    router.push({
        uri: 'pages/dashboard/dashboard'
    });
}

function gotoHeroes() {
    router.push({
        uri: 'pages/heroes/heroes'
    });
}

function gotoDetails(id) {
    router.push({
        uri: 'pages/hero-detail/hero-detail',
        params: {
            id: id
        }
    });
}

function gotoComponents() {
    router.push({
        uri: 'pages/components/components'
    });
}

function back() {
    router.back();
}

export default {
    gotoDashboard,
    gotoHeroes,
    gotoDetails,
    gotoComponents,
    back
}