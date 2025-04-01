/**
 * class controller
 */

import { factories } from "@strapi/strapi";

const API_CONTROLLER = "api::class.class";

export default factories.createCoreController(API_CONTROLLER, () => ({
  async asignClassTeacher(ctx) {
    try {
      const { Name, id } = ctx.params; // 'Name' es el nombre del profesor, 'id' es el id de la clase.

      // Buscar la clase por su ID
      const classRecord = await strapi.db.query(API_CONTROLLER).findOne({
        where: { id: id },
      });
      if (!classRecord) {
        return ctx.notFound(`Id  ${id} of class not found`);
      }

      // Buscar al profesor por su nombre
      const teacher = await strapi.db.query("api::teacher.teacher").findOne({
        where: { Name: Name },
      });
      if (!teacher) {
        return ctx.notFound(`Teacher ${Name} does not exist`);
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
      // Paso 2: Añadir el nuevo profesor (suponiendo que `teacher.id` es el id del nuevo profesor)
      const updatedTeachers = [...teachers, { id: teacher.id }];

      // Paso 3: Actualizar la clase con la lista de profesores actualizada
      await strapi.db.query(API_CONTROLLER).update({
        where: { id: classRecord.id },
        data: { teachers: updatedTeachers.map((t) => t.id) }, // Aquí asignamos solo los ids de los profesores
      });

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
