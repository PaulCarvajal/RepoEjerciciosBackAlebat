"use strict";
/**
 * class service
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const API_CONTROLLER = "api::class.class";
exports.default = strapi_1.factories.createCoreService(API_CONTROLLER, () => ({
    countTeachers: async function (classs) {
        const { teachers } = classs;
        const limit = 3;
        if (teachers.length == limit) {
            return true;
        }
        return false;
    }
}));
