/**
 * teacher controller
 */

import { createStrapi, factories } from '@strapi/strapi';
const API_CONTROLLER = 'api::teacher.teacher';

export default factories.createCoreController(API_CONTROLLER, ()=>({
    async createTeachers(ctx) {
        const { Name, Last_name, Email, Additional_Details} = ctx.request.body;
         
        const newTeacher = await strapi.documents(API_CONTROLLER).create({
            data: {
                Name,
                Last_name,
                Email,
                Additional_Details,
            },
            populate: {
                Additional_Details: true,
            },
            });
        return ctx.send(newTeacher);
    },

    async eventsTeachers(ctx) {
         
        const { id } = ctx.params;
 
        const teacher = await strapi.documents(API_CONTROLLER).findOne({
            documentId: id,          
            populate: ['events'],
          });
        
        const message = ctx.response.message
        console.log(message)
        return ctx.send(teacher)
    },
        
    

}));
