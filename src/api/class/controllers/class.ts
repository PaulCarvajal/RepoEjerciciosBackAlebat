/**
 * class controller
 */

import { factories } from "@strapi/strapi";

const API_CONTROLLER = "api::class.class";

export default factories.createCoreController(API_CONTROLLER, () => ({
  async asignClassTeacher(ctx) {
    try {
      // Asegurarse de que los parámetros estén presentes
      const { Name, id } = ctx.params;
      if (!Name || !id) {
        return ctx.badRequest("Faltan parámetros necesarios: Name o id");
      }

      // Buscar la clase por su ID
      const classRecord = await strapi.db.query("api::class.class").findOne({
        where: { id: id }, // Buscar la clase por ID
      });

      if (!classRecord) {
        return ctx.notFound("Clase no encontrada");
      }

      // Buscar al profesor por su nombre
      const teacher = await strapi.db.query("api::teacher.teacher").findOne({
        where: { Name: Name }, // Buscar al profesor por su nombre
      });

      if (!teacher) {
        return ctx.notFound("Profesor no encontrado");
      }

      // Asignar el profesor a la clase
      await strapi.db.query("api::class.class").update({
        where: { id: classRecord.id }, // Utilizar el id de la clase para actualizarla
        data: { teacher: teacher.id }, // Asignar al profesor encontrado a la clase
      });

      return ctx.send({
        ok: true,
        mensaje: "Profesor asignado correctamente",
        clase: classRecord.Name, // Mostrar el nombre de la clase
        profesor: teacher.Name, // Mostrar el nombre del profesor
      });
    } catch (error) {
      console.error("Error al asignar el profesor:", error);
      return ctx.badRequest("Error al asignar profesor", {
        error: error.message,
      });
    }
  },
}));
