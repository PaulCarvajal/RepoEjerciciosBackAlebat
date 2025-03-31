export default {
    routes: [
       {
        method: 'PUT',
       path: '/class/:id/:Name',
        handler: 'class.asignClassTeacher',
        config: {
          policies: [],
          middlewares: [],
        },
       },
    ],
  };