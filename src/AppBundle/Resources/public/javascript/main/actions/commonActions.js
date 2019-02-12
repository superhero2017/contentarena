import {commonTypes} from "../reducers/common";

export const getDefaultRightsPackage = () => {
    const dataContainer = document.getElementsByClassName('marketplace-container');
    let defaultRightsPackage = [];

    if (dataContainer && dataContainer.length) {
        try {
            defaultRightsPackage = JSON.parse( dataContainer[0].dataset.rights);
        } catch (e) {}
    }

    return {
        type: commonTypes.GET_DEFAULT_RIGHTS_PACKAGE,
        defaultRightsPackage
    };
};


export const setTotalCountries = totalCountries => {
    return {
        type: commonTypes.SET_TOTAL_COUNTRIES,
        totalCountries
    };
};

export const setTestStageMode = testStageMode => {
    return {
        type: commonTypes.SET_TEST_STAGE_MODE,
        testStageMode
    };
};

export const setEnvHostUrl = envHostUrl => ({
    type: commonTypes.SET_ENV_HOST_URL,
    envHostUrl
});