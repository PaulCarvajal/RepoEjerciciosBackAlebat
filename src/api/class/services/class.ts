/**
 * class service
 */

import { factories } from '@strapi/strapi';


const API_CONTROLLER = "api::class.class";

export default factories.createCoreService(API_CONTROLLER, () =>({
     countTeachers: async function(classs)  {
        const {teachers} = classs
        
        const limit = 3
        if (teachers.length == limit){
            return true
        }

        return false
    }

}));
    