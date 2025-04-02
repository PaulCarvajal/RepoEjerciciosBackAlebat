/**
 * teacher service
 */

import { factories } from '@strapi/strapi';


const API_CONTROLLER = "api::teacher.teacher";

export default factories.createCoreService(API_CONTROLLER, () =>({
     countClass: async function(teacher)  {
        const {id, NumberClass} = teacher

        const limit = 2
        if (NumberClass == limit){
            return true
        }

        return false
    }

}));
    