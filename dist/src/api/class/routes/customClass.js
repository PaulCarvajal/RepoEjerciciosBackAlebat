"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
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
