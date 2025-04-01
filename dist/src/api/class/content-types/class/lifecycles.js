module.exports = {
    async afterUpdate(event) {
        const { params } = event;
        if (params.data.teachers) {
            const currentClass = await strapi.db.query("api::class.class").findOne({
                where: { id: params.where.id },
                populate: { teachers: true },
            });
            const currentTeacherCount = currentClass.teachers.length;
            console.log(currentTeacherCount);
            const newTeacherCount = currentTeacherCount + 1;
            console.log(newTeacherCount);
            await strapi.db.query("api::class.class").update({
                where: { id: params.where.id },
                data: {
                    CountTeachers: newTeacherCount,
                },
            });
            // Asegurarnos de que teachers sea un arreglo (por si solo es un objeto o una cadena)
            const teachersToUpdate = Array.isArray(params.data.teachers) ? params.data.teachers : [params.data.teachers];
            console.log(teachersToUpdate);
            // Ahora actualizamos el NumberClass de cada profesor asignado
            for (const teacher of teachersToUpdate) {
                if (teacher.id) {
                    await strapi.db.query("api::teacher.teacher").update({
                        where: { id: teacher.id },
                        data: {
                            NumberClass: currentTeacherCount + 1, // Aquí puedes hacer el cálculo necesario
                        },
                    });
                    console.log(`Profesor ${teacher.id} actualizado con NumberClass: ${currentTeacherCount + 1}`);
                }
            }
        }
    },
};
