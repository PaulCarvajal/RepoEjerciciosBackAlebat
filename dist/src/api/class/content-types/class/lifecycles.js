module.exports = {
    async afterUpdate(event) {
        const { params } = event;
        const classSelect = await strapi.db.query("api::class.class").findOne({
            where: { id: params.where.id },
            populate: { teachers: true },
        });
        console.log("PARAMS TEACHERS DATA LENGTH");
        console.log(classSelect.teachers);
        if (classSelect.teachers.length > 0) {
            console.log("CLASE SELECT");
            console.log(classSelect);
            const countTeacher = classSelect.teachers.length;
            console.log("LENGHT DE LOS TEACHERS");
            console.log(countTeacher);
            const newTeacherCount = countTeacher + 1;
            console.log("NUEVO LENGHT DE LOS TEACHERS");
            console.log(newTeacherCount);
            try {
                const actuCountTeacher = await strapi.db
                    .query("api::class.class")
                    .update({
                    where: { id: params.where.id },
                    data: {
                        CountTeachers: newTeacherCount,
                    },
                });
                console.log("ACTUALIZATION COUNT TEACHER");
                console.log(actuCountTeacher);
            }
            catch (error) {
                console.log("Error updating CountTeachers:", error);
                console.log(error);
            }
            // Asegurarnos de que teachers sea un arreglo (por si solo es un objeto o una cadena)
            const teachersToUpdate = params.data.teachers;
            console.log("LISTA TEACHERS COUNT");
            console.log(teachersToUpdate);
            // Ahora actualizamos el NumberClass de cada profesor asignado
            for (const teacher of teachersToUpdate) {
                if (teacher.id) {
                    await strapi.db.query("api::teacher.teacher").update({
                        where: { id: teacher.id },
                        data: {
                            NumberClass: countTeacher + 1, // Aquí puedes hacer el cálculo necesario
                        },
                    });
                    console.log(`Profesor ${teacher.id} actualizado con NumberClass: ${countTeacher + 1}`);
                }
            }
        }
    },
};
