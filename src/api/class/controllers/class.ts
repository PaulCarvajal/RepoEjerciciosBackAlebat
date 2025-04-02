/**
 * class controller
 */

import { factories } from "@strapi/strapi";
import { Console } from "console";

const API_CONTROLLER = "api::class.class";

export default factories.createCoreController(API_CONTROLLER, () => ({
  async asignClassTeacher(ctx) {
    try {
      const { Name, id } = ctx.params; // 'Name' es el nombre del profesor, 'id' es el id de la clase.

      // Buscar la clase por su ID
      const classRecord = await strapi.db.query(API_CONTROLLER).findOne({
        where: { id: id },
        populate: {
          teachers: true,
        },
      });

      if (!classRecord) {
        return ctx.notFound(`Id  ${id} of class not found`);
      }

      //servicio de clases
      const serviceClass = await strapi.service(API_CONTROLLER).countTeachers(classRecord)
      console.log("SERVICIE CLASS")
      console.log(serviceClass)

      if(serviceClass){
        return ctx.notFound(`The Class ${Name} has already assigned 3 teachers`);
      }

      // Buscar al profesor por su nombre
      const teacher = await strapi.db.query("api::teacher.teacher").findOne({
        where: { Name: Name },
      });

      console.log("TEACHER")
      console.log(teacher)

      if (!teacher) {
        return ctx.notFound(`Teacher ${Name} does not exist`);
      }

      //llamar al servicio
      const service = await strapi.service('api::teacher.teacher').countClass(teacher);
      console.log("SERVICIE TEACHER")
      console.log(service)

      if(service){
        return ctx.notFound(`Teacher ${Name} has already assigned 5 classes`);
      }
      
      //Hacer consulta a la bbdd para sacar los profes, y luego añadir los que hay + el que queremos
      const teachers = await strapi.db.query("api::teacher.teacher").findMany({
        where: {
          classes: {
            id: classRecord.id,
          },
        },
        populate: {
          classes: true,
        },
      });

      const updatedTeachers = [...teachers, teacher];

      console.log("UPDATE TEACHERS")
      console.log(updatedTeachers)


      console.log(classRecord)
      //Actualizar la clase con la lista de profesores actualizada
      const result = await strapi.db.query(API_CONTROLLER).update({
        where: { id: classRecord.id },
        data: {teachers: updatedTeachers} // Aquí asignamos solo los ids de los profesores
      });

      console.log("RESULT: ")
      console.log(result)
      return {
        ok: true,
        mensaje: `Teacher ${Name} joined correctly`,
        clase: classRecord.Name, // Mostrar clase
        profesor: teacher.Name, // Mostrar profesor
      };
    } catch (error) {
      return ctx.badRequest("Error joining teacher", { error: error.message });
    }
  },
}));




