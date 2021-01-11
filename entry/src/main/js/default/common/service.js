// abilityType: 0-Ability; 1-Internal Ability
const ABILITY_TYPE_EXTERNAL = 0;
const ABILITY_TYPE_INTERNAL = 1;
// syncOption(Optional, default sync): 0-Sync; 1-Async
const SYNC = 0;
const ASYNC = 1;
const BUNDLE_NAME = 'io.itrunner.heroes';
const ABILITY_NAME_EXTERNAL = 'io.itrunner.heroes.HeroServiceAbility'
const ABILITY_NAME_INTERNAL = 'io.itrunner.heroes.HeroServiceInternalAbility'
const MESSAGE_CODE_INSERT = 1001;
const MESSAGE_CODE_UPDATE = 1003;
const MESSAGE_CODE_DELETE = 1004;
const MESSAGE_CODE_QUERY_TOP4 = 10021;
const MESSAGE_CODE_QUERY_ALL = 10022;
const MESSAGE_CODE_GET_ONE = 10023;
const MESSAGE_CODE_QUERY_BY_NAME = 10024;
const USING_INTERNAL = true;

function queryTop4() {
    let param = createParam(MESSAGE_CODE_QUERY_TOP4, {});
    return FeatureAbility.callAbility(param);
}

function queryAll() {
    let param = createParam(MESSAGE_CODE_QUERY_ALL, {});
    return FeatureAbility.callAbility(param);
}

function getOne(id) {
    let param = createParam(MESSAGE_CODE_GET_ONE, {
        'id': id
    });
    return FeatureAbility.callAbility(param);
}

function queryByName(name) {
    let param = createParam(MESSAGE_CODE_QUERY_BY_NAME, {
        'name': name
    });
    return FeatureAbility.callAbility(param);
}

function addHero(hero) {
    let param = createParam(MESSAGE_CODE_INSERT, hero);
    return FeatureAbility.callAbility(param);
}

function updateHero(hero) {
    let param = createParam(MESSAGE_CODE_UPDATE, hero);
    return FeatureAbility.callAbility(param);
}

function deleteHero(id) {
    let param = createParam(MESSAGE_CODE_DELETE, {
        'id': id
    });
    return FeatureAbility.callAbility(param);
}

function createParam(messageCode, data) {
    let param = {};

    param.bundleName = BUNDLE_NAME;
    param.messageCode = messageCode;
    param.data = data;
    param.syncOption = SYNC;

    if (USING_INTERNAL) {
        param.abilityName = ABILITY_NAME_INTERNAL;
        param.abilityType = ABILITY_TYPE_INTERNAL;
    } else {
        param.abilityName = ABILITY_NAME_EXTERNAL;
        param.abilityType = ABILITY_TYPE_EXTERNAL;
    }

    return param;
}

export default {
    queryTop4,
    queryAll,
    getOne,
    queryByName,
    addHero,
    updateHero,
    deleteHero,
}