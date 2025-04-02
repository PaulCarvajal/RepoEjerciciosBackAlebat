"use strict";
/**
 * teacher service
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const API_CONTROLLER = "api::teacher.teacher";
exports.default = strapi_1.factories.createCoreService(API_CONTROLLER, () => ({
    countClass: async function (teacher) {
        const { id, NumberClass } = teacher;
        const limit = 2;
        if (NumberClass == limit) {
            return true;
        }
        return false;
    }
}));
