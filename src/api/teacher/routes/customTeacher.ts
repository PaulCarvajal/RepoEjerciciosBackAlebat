export default {
    routes: [
       {
        method: 'POST',
       path: '/teacher',
        handler: 'teacher.createTeachers',
        config: {
          policies: [],
          middlewares: [],
        },
       },

       {
        method: 'GET',
       path: '/teacher/:id',
        handler: 'teacher.eventsTeachers',
        config: {
          policies: [],
          middlewares: [],
        },
       },
    ],
  };